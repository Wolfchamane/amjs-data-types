const AmDataTypeBase = require('./Base');

/**
 * Boolean data type
 * @namespace   am
 * @class       am.dataType.Boolean
 * @extends     am.dataType.Base
 */
class AmDataTypeBoolean extends AmDataTypeBase
{
    /**
     * Returns class constructor unique identifier key name.
     * @return {String} 'am.dataType.Boolean'
     * @constructor
     */
    static get KEY()
    {
        return 'am.dataType.Boolean';
    }

    /**
     * @override
     */
    _parseValue(value)
    {
        return super._parseValue(!!value);
    }
}

// ---------------------------------------------------------------
// Class registration and export
// ---------------------------------------------------------------
AmDataTypeBase.register('Boolean', AmDataTypeBoolean);
module.exports = AmDataTypeBoolean;
