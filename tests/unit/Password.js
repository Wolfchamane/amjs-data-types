const AmjsDataTypesPassword = require('../../src/Password');
const AmjsDataTypesString   = require('../../src/String');
const AmjsFactory           = require('@amjs/factory');
const assert                = require('assert');
const atob                  = require('atob');
const btoa                  = require('btoa');

if (!global.window)
{
    global.window = { atob, btoa };
}

(function ()
{
   const sut = new AmjsDataTypesPassword();
   assert.equal(sut instanceof AmjsDataTypesString, true, 'Password extends from String');
}());

(function()
{
    const sut = AmjsFactory.create('Password');
    assert.equal(sut instanceof AmjsDataTypesPassword, true, 'Is registered as "Password"');
}());

(function()
{
    const sut = AmjsFactory.create('Password');
    sut.value = '1234';
    assert.equal(sut.value !== atob('1234'), true, 'Password value is stores encoded');
}());

(function()
{
    const sut = AmjsFactory.create('Password');
    assert.equal(sut.toString() === '', true, 'Empty password returns ""');

    sut.value = '1234';
    assert.equal(sut.toString() === '1234', true, 'toString() returns value decoded');

}());

delete global.window;

