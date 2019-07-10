const AmjsDataTypesBase = require('./Base');

class AmjsDataTypesArray extends AmjsDataTypesBase
{
    /**
     * @inheritDoc
     */
    constructor(values)
    {
        super({});

        if (Array.isArray(values))
        {
            this.value = values;
        }
    }
}

AmjsDataTypesBase.register('Array', AmjsDataTypesArray);
module.exports = AmjsDataTypesArray;
