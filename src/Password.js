const AmjsDataTypesTypeString = require('./String');

/**
 * Password type
 * @namespace   amjs.dataTypes.type
 * @class       amjs.dataTypes.type.Password
 * @extends     amjs.dataTypes.type.String
 */
class AmjsDataTypesTypePassword extends AmjsDataTypesTypeString
{
    /**
     * @override
     */
    _parseValue(value)
    {
        return window.btoa(super._parseValue(value));
    }

    /**
     * @override
     */
    toString()
    {
        const value = this.value;

        return value ? window.atob(value) : '';
    }
}

AmjsDataTypesTypeString.register('Password', AmjsDataTypesTypePassword);
module.exports = AmjsDataTypesTypePassword;
