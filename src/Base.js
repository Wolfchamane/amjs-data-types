const AmjsFactory = require('@amjs/factory');

/**
 * Base class for any other within ORM
 * @namespace   amjs.dataTypes
 * @class       amjs.dataTypes.Base
 * @extends     amjs.Factory
 */
class AmjsDataTypesBase extends AmjsFactory
{
    /**
     * @constructor
     */
    constructor()
    {
        super();

        /**
         * Raw value of this instance
         * @property    $raw
         * @type        {*}
         * @default     null
         * @private
         * @protected
         */

        /**
         * Current value of this instance
         * @property    $value
         * @type        {*}
         * @default     null
         * @private
         * @protected
         */

        this._setPrivateProperties(['raw', 'value']);
    }

    /**
     * Returns current instance value
     * @return {null} Current value
     */
    get value()
    {
        return this.$value;
    }

    /**
     * Sets current instance value
     * @param   {*} value   New value
     */
    set value(value)
    {
        this.$raw = value;
        this.$value = this._parseValue(value);
    }

    /**
     * Defines private & protected properties of this instance
     * @param   {Array} props   Properties to be defined
     * @private
     */
    _setPrivateProperties(props = [])
    {
        if (!Array.isArray(props))
        {
            props = [props];
        }

        props
            .filter(item => typeof item === 'string')
            .forEach(
                prop =>
                {
                    Object.defineProperty(this, `$${prop}`, {
                        configurable    : false,
                        enumerable      : false,
                        writable        : true,
                        value           : null
                    });
                },
                this
            );
    }

    /**
     * Sets the new values of all properties of this instance
     * @param   {Object}    values  Values to be set
     * @private
     */
    _setProperties(values = {})
    {
        Object.keys(values).forEach(key =>
        {
            if (key in this && !key.startsWith('$'))
            {
                this[key] = values[key];
            }
        }, this);
    }

    /**
     * Returns the parsed value of this instance
     * @param   {*} value   Raw value
     * @return  {*} Parsed value
     * @private
     */
    _parseValue(value)
    {
        return value;
    }

    /**
     * Returns raw value of this instance
     * @return {*} Raw value
     */
    raw()
    {
        return this.$raw;
    }

    /**
     * Converse current value to its string format
     * @return {String}    Current value as String
     */
    toString()
    {
        const value = this.$value;

        return value ? this.$value.toString() : '[object Base]';
    }
}

AmjsFactory.register('Base', AmjsDataTypesBase);
module.exports = AmjsDataTypesBase;
