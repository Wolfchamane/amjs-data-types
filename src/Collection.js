const AmjsDataTypesArray = require('./Array');

/**
 * Class constructor for a collection of pre-registered data types.
 * @namespace   amjs.dataTypes
 * @class       amjs.dataTypes.Collection
 * @extends     amjs.dataTypes.Array
 */
class AmjsDataTypesCollection extends AmjsDataTypesArray
{
    constructor(values)
    {
        super();

        this._setPrivateProperties(['itemType']);
        this.$itemType = 'Object';

        this.value = values;
    }

    /**
     * @override
     */
    _parseValue(values)
    {
        if (Array.isArray(values))
        {
            this.$raw = JSON.parse(JSON.stringify(values));
            const type = this.$itemType;
            values = values.map(value => AmjsDataTypesArray.create(type, value));
        }

        return super._parseValue(values);
    }

    /**
     * Finds an element by a property value
     * @param   {String}    prop    To find by
     * @param   {String}    value   To match
     * @return  {*|undefined} Result of finding over items
     */
    findBy(prop = '', value = '')
    {
        return this._call('find', item => `${item[prop]}` === value);
    }
}

AmjsDataTypesArray.register('Collection', AmjsDataTypesCollection);
module.exports = AmjsDataTypesCollection;
