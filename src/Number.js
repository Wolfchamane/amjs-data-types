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
}

AmjsDataTypesBase.register('Number', AmjsDataTypesTypeNumber);
module.exports = AmjsDataTypesTypeNumber;
