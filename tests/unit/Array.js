const { equal }             = require('assert');
const AmjsDataTypesArray    = require('../../src/Array');
const Factory               = require('@amjs/factory');

(function definition()
{
    const sut = Factory.create('Array');
    equal(sut instanceof AmjsDataTypesArray, true, 'AmjsDataTypesArray is registered as "Array"');
}());

(function arrayMethods()
{
    const sut = Factory.create('Array');
    [
        'map',
        'filter',
        'forEach',
        'find',
        'any',
        'every',
        'some',
        'reduce',
        'sort',
        'splice'
    ].forEach(fn => equal(sut[fn] instanceof Function, true, `AmjsDataTypesArray > ${fn} is a method of the instance`));
})();

(function length()
{
    const sut = Factory.create('Array');
    equal(sut.length === 0, true, 'AmjsDataTypesArray > length > By default is zero (0)');

    sut.value = [1, 2, 3];
    equal(sut.length === 3, true, 'AmjsDataTypesArray > length > Returns "value" length');
})();

(function _call()
{
    const sut = Factory.create('Array');
    equal(sut._call() === undefined, true, 'AmjsDataTypesArray > _call > By default returns undefined');

    sut.value = [1, 2, 3];
    equal((sut._call('map', n => n++)).length === 3, true, 'AmjsDataTypesArray > _call > Calls array method');
})();

(function Symbol()
{
    let counter = 0;
    let sut = Factory.create('Array', [1, 2, 3]);
    for (const _ of sut)
    {
        counter++;
    }
    equal(counter === sut.length, true, 'AmjsDataTypesArray > Symbol > Iterates over values');

    sut.value = null;
    counter = 0;
    for (const _ of sut)
    {
        counter++;
    }
    equal(counter === sut.length, true, 'AmjsDataTypesArray > Symbol > Iterates without values');
})();
