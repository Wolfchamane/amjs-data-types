const AmDataTypeBase = require('./Base');

/**
 * Integer data type
 * @namespace   am.dataType
 * @class       am.dataType.Integer
 * @extends     am.dataType.Base
 */
class AmDataTypeInteger extends AmDataTypeBase
{
    /**
     * Returns class constructor unique identifier key name.
     * @return      {String}    'am.dataType.Integer'
     */
    static get KEY()
    {
        return 'am.dataType.Integer';
    }

    /**
     * @override
     */
    _parseValue(value)
    {
        if (value !== null)
        {
            if (typeof value !== 'number')
            {
                value = Number(value);
            }

            if (!isNaN(value))
            {
                value = Math.floor(value);
            }
        }

        return super._parseValue(value);
    }

    /**
     * Returns if current value is positive or negative
     * @return {Boolean} `true` if value is a number greater o equal to zero (0), `false` in any other case
     */
    isPositive()
    {
        const value = this.value;

        return value !== null && typeof value === 'number' && !isNaN(value)
            ? value >= 0
            : false;
    }
}

// ---------------------------------------------------------------
// Class registration and export
// ---------------------------------------------------------------
AmDataTypeBase.register('Integer', AmDataTypeInteger);
module.exports = AmDataTypeInteger;
