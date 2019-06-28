const AmjsDataTypesBoolean   = require('../../src/Boolean');
const AmjsDataTypesDate      = require('../../src/Date');
const AmjsDataTypesNumber   = require('../../src/Number');
const AmjsDataTypesString   = require('../../src/String');
const AmjsDataTypesBase     = require('../../src/Base');
const AmjsDataTypesObject   = require('../../src/Object');
const AmjsFactory           = require('@amjs/factory');
const assert                = require('assert');

(function()
{
    const sut = new AmjsDataTypesObject();
    assert.equal(sut instanceof AmjsDataTypesBase, true, 'Object is an instanceof Base');
}());

(function()
{
    const sut = AmjsFactory.create('Object');
    assert.equal(sut instanceof AmjsDataTypesObject, true, 'Is registered as "Object"');
}());

(function()
{
    const sut = AmjsFactory.create('Object');
    ['privateProperties', 'propertyMap', 'propertyTypes', 'useMap'].forEach(
        prop =>
        {
            assert.equal(sut.hasOwnProperty(`$${prop}`), true, `Has property $${prop}`);
        }
    )
}());

(function()
{
    const sut = AmjsFactory.create('Object');
    sut.bol = null;
    sut.dat = null;
    sut.num = null;
    sut.obj = null;
    sut.str = null;
    sut.oth = null;
    sut.$propertyTypes = {
        bol : 'Boolean',
        dat : 'Date',
        num : 'Number',
        obj : 'Object',
        str : 'String',
    };
    sut.$propertyMap = {
        'bool'      : 'bol',
        'date'      : 'dat',
        'number'    : 'num',
        'object'    : 'obj',
        'string'    : 'str'
    };
    sut.$useMap = true;
    sut._setProperties({
        'bool'      : true,
        'date'      : '2000-01-01T00:00:00.000',
        'number'    : 1,
        'object'    : {},
        'string'    : 'foo',
        'oth'       : 'as-it-goes'
    });
    assert.equal(sut.bol instanceof AmjsDataTypesBoolean, true, `Boolean property type is created as AmjsDataTypesBoolean`);
    assert.equal(sut.dat instanceof AmjsDataTypesDate, true, `Boolean property type is created as AmjsDataTypesDate`);
    assert.equal(sut.num instanceof AmjsDataTypesNumber, true, `Boolean property type is created as AmjsDataTypesNumber`);
    assert.equal(sut.obj instanceof AmjsDataTypesObject, true, `Boolean property type is created as AmjsDataTypesObject`);
    assert.equal(sut.str instanceof AmjsDataTypesString, true, `Boolean property type is created as AmjsDataTypesString`);
    assert.equal(sut.oth === 'as-it-goes', true, 'Property type mark as "*" is stored in raw value');
}());

(function()
{
    const sut = AmjsFactory.create('Object');
    sut.foo = null;
    sut.$propertyTypes = {
        'foo' : '*'
    };
    sut._setProperties({
        foo : {
            bar : {
                key : 'value'
            }
        }
    });

    assert.equal(sut.get('foo.bar.key') === 'value', true, 'get() returns valid reference value');

    sut.set('foo.bar.key', 'newValue');
    assert.equal(sut.get('foo.bar.key') === 'newValue', true, 'set() changes reference value');

    assert.equal(sut.get() === undefined, true, 'Empty get returns "undefined"');

    sut.set();
    assert.equal(sut.get('foo.bar.key') === 'newValue', true, 'Empty set does nothing');

    assert.equal(sut._dotProp() === undefined, true, 'Empty _dotProp returns undefined');
}());

(function()
{
    const sut = AmjsFactory.create('Object');
    sut.foo = null;
    sut.bar = null;
    sut.pri = null;
    sut.str = null;
    sut.obj = null;
    sut.$privateProperties = {
        pri : true
    };
    sut.$propertyTypes = {
        foo   : '*',
        bar   : '*',
        pri   : '*',
        str   : 'String',
        obj   : 'Object'
    };
    const values = {
        foo : 1,
        bar : 2,
        pri : 3,
        str : 'text',
        obj : {}
    };
    sut._setProperties(values);
    delete values.pri;
    assert.equal(JSON.stringify(sut.toJSON()) === JSON.stringify(values), true, 'toJSON() returns expected object');
}());
