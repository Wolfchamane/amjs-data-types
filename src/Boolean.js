const AmjsDataTypesBase = require('./Base');

/**
 * Type boolean
 * @namespace   amjs.dataTypes
 * @class       amjs.dataTypes.Boolean
 * @extends     amjs.dataTypes.Base
 */
class AmjsDataTypesTypeBoolean extends AmjsDataTypesBase
{
    /**
     * @override
     */
    _parseValue(value)
    {
        return super._parseValue(!!value);
    }
}

AmjsDataTypesBase.register('Boolean', AmjsDataTypesTypeBoolean);
module.exports = AmjsDataTypesTypeBoolean;
