const AmjsDataTypesBase = require('./Base');

class AmjsDataTypesArray extends AmjsDataTypesBase
{
}

AmjsDataTypesBase.register('Array', AmjsDataTypesArray);
module.exports = AmjsDataTypesArray;
