const AmFactory = require('@amjs/factory');

/**
 * Parent class for any other data type class
 * @namespace   am.dataType
 * @class       am.dataType.Base
 * @requires    am.Factory
 */
class AmDataTypeBase extends AmFactory
{

    /**
     * Stores instance value in "raw" format, without being parsed.
     * @property    $raw
     * @type        {*}
     * @default     null
     * @private
     * @protected
     */

    /**
     * Stores current instance value.
     * @property    $value
     * @type        {*}
     * @default     null
     * @private
     * @protected
     */

    /**
     * @constructor
     */
    constructor()
    {
        super();

        // Define private properties
        ['raw', 'value'].forEach(
            key =>
            {
                Object.defineProperty(this, `$${key}`, {
                    enumerable      : false,
                    configurable    : false,
                    writable        : true,
                    value           : null
                });
            },
            this
        );
    }

    /**
     * Returns class constructor unique identifier key name.
     * @return      {String}    'am.dataType.Base'
     */
    static get KEY()
    {
        return 'am.dataType.Base';
    }

    /**
     * Returns factory reference in use.
     * @return {am.AmFactory}   Factory
     */
    static get factory()
    {
        return AmFactory.i();
    }

    /**
     * Returns current value.
     * @return {*}  Value
     */
    get value()
    {
        return this.$value;
    }

    /**
     * Sets new value for this instance.
     * @param {*}   value New value
     */
    set value(value)
    {
        this.$raw = value;
        this.$value = this._parseValue(value);
    }

    /**
     * Parses values in order to set its correct format.
     * @param   {*} value New value to be parsed
     * @return  {*} Value parsed
     * @private
     */
    _parseValue(value)
    {
        return value;
    }

    /**
     * Returns raw original value of this instance.
     * @return {*}  Raw value
     */
    raw()
    {
        return this.$raw;
    }

    /**
     * Returns this instance value as {String} or object representation name.
     * @return  {String}     Instance value o '[object *]'
     */
    toString()
    {
        const value = this.value;

        return value ? value.toString() : `[object ${this.constructor.KEY}]`;
    }
}

// ---------------------------------------------------------------
// Class registration and export
// ---------------------------------------------------------------
AmFactory.register('Base', AmDataTypeBase);
module.exports = AmDataTypeBase;
