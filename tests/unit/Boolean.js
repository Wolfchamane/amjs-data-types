const AmjsDataTypesBoolean  = require('../../src/Boolean');
const AmjsFactory           = require('@amjs/factory');
const assert                = require('assert');

const sut = AmjsFactory.create('Boolean', {});
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
    sut instanceof AmjsDataTypesBoolean,
    true,
    'Is registered as "Boolean"'
);

values.forEach(
    value =>
    {
        const result = !!value;
        sut.value = value;
        assert.equal(sut.value, result, `Boolean value of "${value}" is: ${result}`);
    }
);
