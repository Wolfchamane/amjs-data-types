const AmFactory         = require('@amjs/factory');
const AmDataTypeBase    = require('../../src/Base');
const AmDataTypeInteger = require('../../src/Integer');

describe('AmDataTypeInteger - General', () =>
{
    it('Extends AmDataTypeBase', () =>
        expect(new AmDataTypeInteger()).toBeInstanceOf(AmDataTypeBase));

    it('KEY returns "am.dataType.Integer"', () =>
        expect(AmDataTypeInteger.KEY).toEqual('am.dataType.Integer'));
});

describe('AmDataTypeInteger - Overrides', () =>
{
    let sut;
    beforeEach(() => sut = new AmDataTypeInteger());

    describe('_parseValue', () =>
    {
        [
            {
                value   : null,
                result  : null
            },
            {
                value   : undefined,
                result  : NaN
            },
            {
                value   : NaN,
                result  : NaN
            },
            {
                value   : 1,
                result  : 1
            },
            {
                value   : 1.99,
                result  : 1
            },
            {
                value   : -1,
                result  : -1
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
                value   : {},
                result  : NaN
            },
            {
                value   : [],
                result  : 0
            },
            {
                value   : [1, 2, 3, 4],
                result  : NaN
            },
            {
                value   : '',
                result  : 0
            },
            {
                value   : 'demo',
                result  : NaN
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

describe('AmDataTypeInteger - Methods', () =>
{
    let sut;
    beforeEach(() => sut = new AmDataTypeInteger());

    describe('isPositive', () =>
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
                value   : {},
                result  : false
            },
            {
                value   : [],
                result  : true
            },
            {
                value   : [1, 2, 3, 4],
                result  : false
            },
            {
                value   : '',
                result  : true
            },
            {
                value   : 'test',
                result  : false
            },
            {
                value   : 1,
                result  : true
            },
            {
                value   : 1.99,
                result  : true
            },
            {
                value   : 0,
                result  : true
            },
            {
                value   : -1,
                result  : false
            }
        ].forEach(
            config =>
            {
                it(`For value "${config.value}" returns "${config.result}`, () =>
                {
                    sut.value = config.value;
                    expect(sut.isPositive()).toEqual(config.result);
                });
            }
        );
    });
});

describe('AmDataTypeInteger - Factory', () =>
{
    it('Is registered as "Integer"', () =>
        expect(AmFactory.create('Integer')).toBeInstanceOf(AmDataTypeInteger));
});
