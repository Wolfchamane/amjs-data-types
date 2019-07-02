const AmjsDataTypesString   = require('../../src/String');
const AmjsFactory           = require('@amjs/factory');
const assert                = require('assert');

/**
 * Asserts that class is registered as "String"
 */
function testRegistrationName()
{
    const sut = AmjsFactory.create('String');
    assert.equal(
        sut instanceof AmjsDataTypesString,
        true,
        'Is registered as "String"'
    );
}

/**
 * Asserts the override private method "_parseValue"
 */
function testParseValue()
{
    const values = [
        null,
        undefined,
        {},
        [],
        true,
        false,
        1,
        0,
        NaN,
        'foo'
    ];

    values.forEach(
        value =>
        {
            const sut = AmjsFactory.create('String');
            const result = String(value);
            sut.value = value;
            assert.equal(sut.value, result, `String value of "${value}" is: ${result}`);
        }
    );
}

testRegistrationName();
testParseValue();

(function()
{
    const sut = AmjsFactory.create('String');
    assert.equal(sut.toString() === '', true, 'By default, toString() returns ""');

    sut.value = 'My value';
    assert.equal(sut.toString() === 'My value', true, 'Returns string value');
}());
