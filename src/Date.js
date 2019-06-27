const AmjsDataTypesBase = require('./Base');

/**
 * Date type
 * @namespace   amjs.dataTypes.type
 * @class       amjs.dataTypes.type.Date
 * @extends     amjs.dataTypes.type.Base
 */
class AmjsDataTypesTypeDate extends AmjsDataTypesBase
{
    /**
     * @constructor
     */
    constructor()
    {
        super();

        this.format = 'yyyy-MM-dd';
    }

    /**
     * @override
     */
    _parseValue(value)
    {
        if (!(value instanceof Date))
        {
            switch (typeof value)
            {
                case 'number':
                    if (value && !isNaN(value))
                    {
                        value = Date.parse(value);
                    }
                    break;
                case 'string':
                    value = new Date(value);
                    break;
                default:
                    value = null;
            }
        }

        return super._parseValue(value);
    }
}

AmjsDataTypesBase.register('Date', AmjsDataTypesTypeDate);
module.exports = AmjsDataTypesTypeDate;
