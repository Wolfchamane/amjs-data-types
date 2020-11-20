const AmjsDataTypesObject   = require('../../src/Object');
const AmjsDataTypesMoney    = require('../../src/Money');
const AmjsFactory           = require('@amjs/factory');
const assert                = require('assert');

(function extendsObject()
{
    const sut = new AmjsDataTypesMoney();
    assert.equal(sut instanceof AmjsDataTypesObject, true, 'AmjsDataTypesMoney extends AmjsDataTypesObject');
})();

(function isRegistered()
{
    const sut = AmjsFactory.create('Money');
    assert.equal(sut instanceof AmjsDataTypesMoney, true, 'Is registered as "Money"');
})();

(function toString()
{
    const amount = 1.50;
    const currency = 'EUR';
    const sut = AmjsFactory.create('Money', { amount, currency });
    assert.equal(sut.toString() === '1.50 €', true, 'Money as string is "1.50 €"');
})();

(function toHTML()
{
    const amount = 1.50;
    const currency = 'EUR';
    const sut = AmjsFactory.create('Money', { amount, currency });
    const expected = `<span class="money-integer">1</span>
<span class="money-sep"></span>
<span class="money-decimal">50</span>
<span class="money-currency">€</span>`;
    assert.equal(sut.toHTML() === expected, true, 'Returns expected HTML');
})();
