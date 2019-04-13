const AmDataTypeBase    = require('../../src/Base');
const AmFactory         = require('@amjs/factory');

describe('AmDataTypeBase - General', () =>
{
    let sut;
    beforeEach(() => sut = new AmDataTypeBase());

    it('Extends AmFactory', () =>
        expect(sut).toBeInstanceOf(AmFactory));

    it('Has now public properties', () =>
        expect(Object.keys(sut).length).toBe(0));

    it('Has both $raw and $value private properties', () =>
        ['raw', 'value'].forEach(
            key =>
                expect(sut.hasOwnProperty(`$${key}`)).toBe(true)));

    it('KEY is "am.dataType.Base"', () => expect(sut.constructor.KEY).toEqual('am.dataType.Base'));

    it('factory is instance in use of AmFactory', () =>
        expect(sut.constructor.factory).toBeInstanceOf(AmFactory));
});

describe('AmDataTypeBase - Value', () =>
{
    let sut;
    beforeEach(() => sut = new AmDataTypeBase());

    it('Setting new value calls "_parseValue" method', () =>
    {
        const stub = jest.fn();
        sut._parseValue = stub;

        sut.value = 'foo';
        expect(stub).toHaveBeenCalled();
    });

    it('Setting new value saves itself into "$raw" private property', () =>
    {
        sut.value = 'foo';
        expect(sut.$raw).toEqual('foo');
    });

    it('Setting new value saves itself into "$value" private property', () =>
    {
        sut.value = 'foo';
        expect(sut.$value).toEqual('foo');
    });

    it('getter value returns current value', () =>
    {
        sut.value = 'foo';
        expect(sut.value).toEqual('foo');
    });

    it('_parseValue by default returns the new value as it is', () =>
        expect(sut._parseValue('foo')).toEqual('foo'));
});

describe('AmDataTypeBase - Methods', () =>
{
    let sut;
    beforeEach(() => sut = new AmDataTypeBase());

    it('raw() returns current raw value', () =>
    {
        sut.value = 'foo';
        expect(sut.raw()).toEqual('foo');
    });

    describe('toString()', () =>
    {
        it('By default returns "[object am.dataType.Base]"', () =>
            expect(sut.toString()).toEqual('[object am.dataType.Base]'));

        [
            {},
            1,
            true,
            [],
            null,
            undefined
        ].forEach(
            value =>
            {
                const expected = value ? value.toString() : `[object ${AmDataTypeBase.KEY}]`;
                it(`For value "${value}" returns "${expected}"`, () =>
                {
                    sut.value = value;
                    expect(sut.toString()).toEqual(expected);
                });
            }
        );
    });
});

describe('AmDataTypeBase - Factory', () =>
{
    it('Is registered as "Base"', () =>
        expect(AmFactory.i().constructor.create('Base')).toBeInstanceOf(AmDataTypeBase));
});
