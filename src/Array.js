const AmjsDataTypesBase = require('./Base');

/**
 * Array type base
 * @namespace   amjs.dataTypes
 * @class       amjs.dataTypes.Array
 * @extends     amjs.dataTypes.Base
 */
class AmjsDataTypesArray extends AmjsDataTypesBase
{
    /**
     * @constructor
     * @inheritDoc
     */
    constructor(values)
    {
        super();

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
        ].forEach(fn =>
            Object.defineProperty(this, fn, { value : (...args) => this._call(fn, ...args) }));

        this.value = values;
    }

    /**
     * @getter length
     * @return {Number} The length of current value
     */
    get length()
    {
        return (this.value || []).length;
    }

    /**
     * Tries to call an array method over collection
     * @param   {String}    fn      To be called
     * @param   {*}         args    Method arguments
     * @return  {*|undefined}   Result of method or undefined in other case
     * @private
     */
    _call(fn = '', ...args)
    {
        const value = this.value;

        return (value && Array.isArray(value) && value[fn] instanceof Function)
            ? value[fn](...args)
            : undefined;
    }

    /**
     * Allows to iterate over collection items
     *
     * @return {Object} Iterator
     */
    [Symbol.iterator]()
    {
        let _current  = 0;
        const _values = this.value || [];

        return {
            /**
             * @override
             */
            next()
            {
                const _value = _values[_current++];

                return {
                    done  : _value === undefined,
                    value : _value
                };
            }
        };
    }
}

AmjsDataTypesBase.register('Array', AmjsDataTypesArray);
module.exports = AmjsDataTypesArray;
