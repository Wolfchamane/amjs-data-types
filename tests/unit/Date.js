const AmjsDataTypesBase     = require('../../src/Base');
const AmjsDataTypesDate     = require('../../src/Date');
const AmjsFactory           = require('@amjs/factory');
const assert                = require('assert');

function isBaseInstance()
{
    const sut = new AmjsDataTypesDate();
    assert.equal(sut instanceof AmjsDataTypesBase, true, 'AmjsDataTypesDate is an instanceof AmjsDataTypesBase');
}

function isRegistered()
{
    const sut = AmjsFactory.create('Date');
    assert.equal(sut instanceof AmjsDataTypesDate, true, 'AmjsDataTypesDate is registered as "Date"');
}

function parseValue()
{
    const now = Date.now();
    [
        {
            value   : undefined,
            result  : null
        },
        {
            value   : null,
            result  : null
        },
        {
            value   : true,
            result  : null
        },
        {
            value   : false,
            result  : null
        },
        {
            value   : 0,
            result  : null
        },
        {
            value   : NaN,
            result  : null
        },
        {
            value   : 1,
            result  : (new Date(1)).getTime()
        },
        {
            value   : now,
            result  : (new Date(now)).getTime()
        },
        {
            value   : '2000-01-01',
            result  : Date.parse('2000-01-01')
        },
        {
            value   : new Date(now),
            result  : now
        }
    ].forEach(
        item =>
        {
            const sut = AmjsFactory.create('Date');
            sut.value = item.value;
            const current = sut.value instanceof Date
                ? sut.value.getTime()
                : sut.value;
            assert.equal(current === item.result, true, `Value "${item.value}" is right parsed`);
        }
    );
}

function toString()
{
    const sut = AmjsFactory.create('Date');
    sut.value = '2000-01-01T00:00:00.000';
    assert.equal(sut.toString() === '2000-01-01', true, 'toString() returns date formatted');
}

function leftPad()
{
    const sut = AmjsFactory.create('Date');
    assert.equal(sut._leftPad() === '00', true, 'Empty leftPad argument returns double zero');
}

function formatChange()
{
    const sut = AmjsFactory.create('Date');
    sut.value = '2000-01-01T00:00:00.000';
    sut.format = 'dd/MM/yyyy';
    assert.equal(sut.toString() === '01/01/2000', true, 'toString() applies specific format');

    sut.value = null;
    assert.equal(sut.toString() === '', true, 'toString() returns "" in case of null date');
}

function defaultFormatChange()
{
    const sut = AmjsFactory.create('Date');
    AmjsDataTypesDate.defaultFormat = 'Date and Time: dd/MM/yyyy HH:mm:ss';
    sut.value = '2000-01-01T00:00:00.000';
    assert.equal(sut.toString() === 'Date and Time: 01/01/2000 00:00:00', true, 'toString() applies default date format');
}

isBaseInstance();
isRegistered();
parseValue();
toString();
leftPad();
formatChange();
defaultFormatChange();
