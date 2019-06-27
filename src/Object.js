const AmjsDataTypesBase = require('./Base');

/**
 * Type object
 * @namespace   amjs.dataTypes.type
 * @class       amjs.dataTypes.type.Object
 * @extends     amjs.dataTypes.type.Base
 */
class AmjsDataTypesTypeObject extends AmjsDataTypesBase
{

    /**
     * @constructor
     */
    constructor()
    {
        super();

        /**
         * Types of this object proeperties
         * @property    $propertyTypes
         * @type        {Object}
         * @default     {}
         * @private
         * @protected
         */

        /**
         * Map of service's reponse properties to this instance properties
         * @property    $propertyMap
         * @type        {Object}
         * @default     {}
         * @private
         * @protected
         */

        /**
         * Whether to use or not property map
         * @property    $useMap
         * @type        {Boolean}
         * @default     false
         * @private
         * @protected
         */

        this._setPrivateProperties(['propertyTypes', 'propertyMap', 'useMap']);
        this.$propertyTypes = {};
        this.$propertyMap = {};
        this.$useMap = false;
    }

    /**
     * @override
     */
    _setProperties(values = {})
    {
        this.$raw = JSON.parse(JSON.stringify(values));

        Object.keys(values).forEach(
            key =>
            {
                const value         = values[key];
                key                 = this.$useMap ? this.$propertyMap[key] : key;
                const type          = this.$propertyTypes[key];
                // Using wildcard '*' will assign value without any class type
                if (type === '*')
                {
                    values[key] = value;
                }
                else
                {
                    values[key]         = this.constructor.create(type);
                    values[key].value   = value;
                }
            },
            this
        );

        super._setProperties(values);
    }

    /**
     * Returns the value of a property
     * @param   {String}    prop    Property to be returned
     * @return  {*}         Current property value
     */
    get(prop = '')
    {
        let value;
        if (prop.lastIndexOf('.') !== -1)
        {
            prop = prop.split('.');
            const ref = this[prop.shift()];
            if (ref)
            {
                value = this.get.call(ref, prop.join('.'));
            }
        }
        else
        {
            value = this[prop];
        }

        return value;
    }

    /**
     * Sets a new value of a property
     * @param   {String}    prop    Property to be set
     * @param   {*}         value   New value
     */
    set(prop = '', value)
    {
        if (prop.lastIndexOf('.') !== -1)
        {
            prop = prop.split('.');
            const ref = this[prop.shift()];
            if (ref)
            {
                this.set.call(ref, prop.join('.'), value);
            }
        }
        else if (prop in this)
        {
            this[prop] = value;
        }
    }

    /**
     * Transforms this model instance into a plain JSON object
     * @return  {Object}    Transformed model
     */
    toJSON()
    {
        const $factory = this.constructor;
        const json = {};
        Object.keys(this).forEach(
            key =>
            {
                const value = this[key];
                json[key] = $factory.is('Object', value)
                    ? value.toJSON()
                    : $factory.is('Base', value)
                        ? $factory.is('Password', value)
                            ? value.toString()
                            : value.value
                        : value;
            },
            this
        );

        return json;
    }
}

AmjsDataTypesBase.register('Object', AmjsDataTypesTypeObject);
module.exports = AmjsDataTypesTypeObject;
