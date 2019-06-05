const AmjsDataTypesBase = require('../../src/Base');
const AmjsFactory       = require('@amjs/factory');
const assert            = require('assert');

const sut = AmjsFactory.create('Base', {});
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

assert.equal(
    sut instanceof AmjsDataTypesBase,
    true,
    'Is registered as "Base"');
assert.equal(
    sut.$value === null,
    true,
    'By default, "$value" is "null"'
);
assert.equal(
    sut.$raw === null,
    true,
    'By default, "$raw" is "null"'
);

assert.equal(sut.value, null, 'value @getter returns "null" by default');
sut.value = 'foo';
assert.equal(sut.value, 'foo', 'value @setter works as expected');

values.forEach(
    value =>
    {
        sut._setPrivateProperties(value);
        const result = typeof value === 'string';
        assert.equal(sut[`${value}`], result ? undefined : null, `Value ${value} is set as private property: ${result}`);
    }
);

sut._setProperties();
assert.equal(sut.value, 'foo', '_setProperties() coverage');
sut._setProperties({ '$value' : 'foo', 'value' : 'bar' });
assert.equal(sut.value, 'bar', '_setProperties({}) don\'t set private properties values');

assert.equal(sut._parseValue(), undefined, '_parseValue() by default returns "undefined"');
assert.equal(sut._parseValue(1), 1, '_parseValue(1) by default returns arg value');

assert.equal(sut.raw(), sut.$raw, 'raw() returns the value of "$raw"');

sut.value = null;
assert.equal(sut.toString(), '[object Base]', 'toString() by default returns "[object Base]"');
values.forEach(
    value =>
    {
        sut.value = value;
        const result = value ? value.toString() : '[object Base]';
        assert.equal(sut.toString(), result, `Defining value as "${value}", toString() returns "${result}"`);
    }
);
