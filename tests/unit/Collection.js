const { equal }                 = require('assert');
const AmjsDataTypesArray        = require('../../src/Array');
const AmjsDataTypesCollection   = require('../../src/Collection');
const AmjsDataTypesObject       = require('../../src/Object');
const AmjsFactory               = require('@amjs/factory');

/**
 * Mock object class
 * @class   MyObject
 * @extends amjs.dataTypes.Object
 */
class MyObject extends AmjsDataTypesObject
{
    /**
     * @inheritDoc
     */
    constructor(values)
    {
        super();

        /**
         * @override
         */
        this.$propertyTypes = {
            key : '*'
        };

        this.key = null;

        this._setProperties(values);
    }
}

AmjsFactory.register('MyObject', MyObject);

/**
 * Mock collection class
 * @class   MyCollection
 * @extends amjs.dataTypes.Collection
 */
class MyCollection extends AmjsDataTypesCollection
{
    constructor(values)
    {
        super();
        this.$itemType = 'MyObject';
        this.value = values;
    }
}

(function()
{
    let sut = new AmjsDataTypesCollection();
    equal(sut instanceof AmjsDataTypesArray, true, 'AmjsDatatTypesCollection extends from AmjsDataTypesArray');

    sut = AmjsFactory.create('Collection', []);
    equal(sut instanceof AmjsDataTypesCollection, true, 'AmjsDataTypesCollection is registered as "Collection"');
}());

(function()
{
    let sut = new AmjsDataTypesCollection();
    equal(sut._parseValue(1) === 1, true, 'AmjsDataTypesCollection > _parseValue > by default returns value as itself');
}());

(function()
{
    const values = [{ key : 'value1' }, { key : 'value2' }, { key: 'value3' }];
    const sut = new MyCollection(values);
    equal(Array.isArray(sut.value), true, 'AmjsDataTypesCollection > value > is an array');
    equal(values.length === sut.value.length, true, 'AmjsDataTypesCollection > value > has expected length');
    sut.forEach(item => equal(item instanceof MyObject, true,
        'AmjsDataTypesCollection > value > is of expected type'));
}());

(function findBy()
{
    const values = [{ key : 'value1' }, { key : 'value2' }, { key: 'value3' }];
    const sut = new MyCollection(values);
    equal(typeof sut.findBy() === 'undefined', true, 'AmjsDataTypesCollection > findBy > By default, returns undefined');
    equal(sut.findBy('key', 'value2') instanceof MyObject, true, 'AmjsDataTypesCollection > findBy > returns an expected object');
    equal(typeof sut.findBy('key', 'valueN') === 'undefined', true, 'AmjsDataTypesCollection > findBy > returns undefined in other case');
})();
