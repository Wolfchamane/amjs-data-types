const AmjsDataTypesBase = require('./Base');

/**
 * Type number
 * @namespace   amjs.dataTypes.type
 * @class       amjs.dataTypes.type.Number
 * @extends     amjs.dataTypes.type.Base
 */
class AmjsDataTypesTypeNumber extends AmjsDataTypesBase
{
    /**
     * @constructor
     * @inheritDoc
     */
    constructor(...args)
    {
        super();

        this.precision = 2;

        this._setProperties(...args);
    }

    /**
     * @getter  integer
     * @return  {String} Integer part of this number
     */
    get integer()
    {
        return `${Math.floor(this.value)}`;
    }

    /**
     * @getter  decimal
     * @return  {String} Decimal part of this number
     */
    get decimal()
    {
        return (this.value % 1).toFixed(this.precision).substr(2);
    }

    /**
     * @override
     */
    _parseValue(value)
    {
        if (value !== null && typeof value !== 'undefined' && typeof value !== 'number')
        {
            value = Number(value);
        }

        return super._parseValue(value);
    }

    toString()
    {
        return this.value.toFixed(this.precision);
    }
}

AmjsDataTypesBase.register('Number', AmjsDataTypesTypeNumber);
module.exports = AmjsDataTypesTypeNumber;
