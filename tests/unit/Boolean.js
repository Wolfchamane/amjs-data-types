const AmFactory         = require('@amjs/factory');
const AmDataTypeBase    = require('../../src/Base');
const AmDataTypeBoolean = require('../../src/Boolean');

describe('AmDataTypeBoolean - General', () =>
{
    it('Extends AmDataTypeBase', () =>
        expect(new AmDataTypeBoolean()).toBeInstanceOf(AmDataTypeBase));

    it('KEY returns "am.dataType.Integer"', () =>
        expect(AmDataTypeBoolean.KEY).toEqual('am.dataType.Boolean'));
});

describe('AmDataTypeBoolean - Overrides', () =>
{
    let sut;
    beforeEach(() => sut = new AmDataTypeBoolean());

    describe('_parseValue', () =>
    {
        [
            {
                value   : null,
                result  : false
            },
            {
                value   : undefined,
                result  : false
            },
            {
                value   : NaN,
                result  : false
            },
            {
                value   : 1,
                result  : true
            },
            {
                value   : 0,
                result  : false
            },
            {
                value   : true,
                result  : true
            },
            {
                value   : false,
                result  : false
            },
            {
                value   : {},
                result  : true
            },
            {
                value   : [],
                result  : true
            },
            {
                value   : [1, 2, 3, 4],
                result  : true
            },
            {
                value   : '',
                result  : false
            },
            {
                value   : 'demo',
                result  : true
            }
        ].forEach(
            config =>
            {
                it(`For value "${config.value}" return "${config.result}"`, () =>
                    expect(sut._parseValue(config.value)).toEqual(config.result));
            }
        );
    });
});

describe('AmDataTypeBoolean - Factory', () =>
{
    it('Is registered as "Boolean"', () =>
        expect(AmFactory.create('Boolean')).toBeInstanceOf(AmDataTypeBoolean));
});
