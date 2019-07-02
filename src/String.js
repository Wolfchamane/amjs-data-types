const AmjsDataTypesBase = require('./Base');

/**
 * Type string
 * @namespace   amjs.dataTypes.type
 * @class       amjs.dataTypes.type.String
 * @extends     amjs.dataTypes.type.Base
 */
class AmjsDataTypesTypeString extends AmjsDataTypesBase
{
    /**
     * @override
     */
    _parseValue(value)
    {
        if (typeof value !== 'string')
        {
            value = String(value);
        }

        return super._parseValue(value);
    }

    /**
     * @override
     */
    toString()
    {
        return this.value || '';
    }
}

AmjsDataTypesBase.register('String', AmjsDataTypesTypeString);
module.exports = AmjsDataTypesTypeString;
