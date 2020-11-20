const AmjsDataTypesBase     = require('../../src/Base');
const AmjsDataTypesNumber   = require('../../src/Number');
const AmjsFactory           = require('@amjs/factory');
const assert                = require('assert');

(function extendsBase()
{
    const sut = new AmjsDataTypesNumber();
    assert.equal(sut instanceof AmjsDataTypesBase, true, 'AmjsDataTypesNumber extends AmjsDataTypesBase');
})();

(function isRegistered()
{
    const sut = AmjsFactory.create('Number');
    assert.equal(sut instanceof AmjsDataTypesNumber, true, 'Is registered as "Number"');
})();

(function parseValue()
{
    [
        {
            value   : null,
            result  : null
        },
        {
            value   : undefined,
            result  : undefined
        },
        {
            value   : NaN,
            result  : NaN
        },
        {
            value   : {},
            result  : NaN
        },
        {
            value   : [],
            result  : 0
        },
        {
            value   : [1, 2, 3],
            result  : NaN
        },
        {
            value   : true,
            result  : 1
        },
        {
            value   : false,
            result  : 0
        },
        {
            value   : '',
            result  : 0
        },
        {
            value   : 'any-string',
            result  : NaN
        },
        {
            value   : 0,
            result  : 0
        },
        {
            value   : 1,
            result  : 1
        },
        {
            value   : 1.99,
            result  : 1.99
        }
    ].forEach(
        item =>
        {
            const sut = AmjsFactory.create('Number');
            sut.value = item.value;
            const equals = isNaN(item.value)
                ? isNaN(sut.value)
                : sut.value === item.result;
            assert.equal(equals, true, `Value "${item.value}" is well parsed`);
        }
    );
})();

(function getters()
{
    const value = 1.50;
    const sut = AmjsFactory.create('Number');
    sut.value = value;
    assert.equal(sut.integer === '1', true, `Integer part of ${value} is "1"`);
    assert.equal(sut.decimal === '50', true, `Decimal part of ${value} is "50"`);
})();
