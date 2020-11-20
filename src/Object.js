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
     * @inheritDoc
     */
    constructor(values)
    {
        super();

        this._setPrivateProperties(['privateProperties', 'propertyTypes', 'propertyMap', 'useMap']);

        /**
         * Map of properties that could be "private", excluding them from 'toJSON()' response
         * @property    $privateProperties
         * @type        {Object}
         * @default     {}
         * @private
         * @protected
         */
        this.$privateProperties = {};

        /**
         * Types of this object properties
         * @property    $propertyTypes
         * @type        {Object}
         * @default     {}
         * @private
         * @protected
         */
        this.$propertyTypes = {};

        /**
         * Map of value's properties assigned with this instance properties.
         * @property    $propertyMap
         * @type        {Object}
         * @default     {}
         * @private
         * @protected
         */
        this.$propertyMap = {};

        /**
         * Whether to use or not property map
         * @property    $useMap
         * @type        {Boolean}
         * @default     false
         * @private
         * @protected
         */
        this.$useMap = false;

        this._setProperties(values);
    }

    /**
     * @override
     */
    _setProperties(values = {})
    {
        this.$raw = JSON.parse(JSON.stringify(values));

        const parsed = {};
        Object.keys(values).forEach(
            key =>
            {
                const value         = values[key];
                key                 = (this.$useMap && this.$propertyMap[key]) || key;
                const type          = this.$propertyTypes[key] || '*';
                switch (type)
                {
                    // Complex case
                    case 'Array':
                    case 'Collection':
                    case 'Object':
                        parsed[key] = this.constructor.create(type, value);
                        break;
                    // Wildcard '*' assigns value without any class type
                    case '*':
                        parsed[key] = value;
                        break;
                    // Default data type
                    default:
                        parsed[key] = this.constructor.create(type);
                        parsed[key].value = value;
                }
            },
            this
        );

        super._setProperties(parsed);
    }

    /**
     * Handles dot notation access to inner references of this instance.
     * @param   {Object}    ref     Original root reference
     * @param   {String}    prop    Dot-notation property to access
     * @param   {*}         value   (optional) value to assign
     * @return  {Object}    Last value or reference obtained from dot-prop chain
     * @private
     */
    _dotProp(ref = {}, prop = '', value)
    {
        if (prop.lastIndexOf('.') !== -1)
        {
            prop = prop.split('.');
            while (prop.length >= 2)
            {
                ref = ref[prop.shift()];
            }
            prop = prop.pop();
        }

        if (value)
        {
            ref[prop] = value;
        }
        else
        {
            ref = ref[prop];
        }

        return ref;
    }

    /**
     * Returns the value of a property
     * @param   {String}    prop    Property to be returned
     * @return  {*}         Current property value
     */
    get(prop = '')
    {
        return this._dotProp(this, prop);
    }

    /**
     * Sets a new value of a property
     * @param   {String}    prop    Property to be set
     * @param   {*}         value   New value
     */
    set(prop = '', value)
    {
        this._dotProp(this, prop, value);
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
                if (!this.$privateProperties[key])
                {
                    const value = this[key];
                    json[key] = $factory.is('Object', value)
                        ? value.toJSON()
                        : $factory.is('Base', value)
                            ? value.value
                            : value;
                }
            },
            this
        );

        return json;
    }

    /**
     * @override
     */
    toString()
    {
        return JSON.stringify(this.toJSON());
    }
}

AmjsDataTypesBase.register('Object', AmjsDataTypesTypeObject);
module.exports = AmjsDataTypesTypeObject;
