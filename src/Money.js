require('./Number');
require('./String');
const AmjsDataTypesObject = require('./Object');

const currencySymbols = {
    EUR: '€',
    USD: '$'
}

/**
 * Money type object
 * @namespace   amjs.dataTypes
 * @class       amjs.dataTypes.Money
 * @extends     amjs.dataTypes.Object
 * @requires    amjs.dataTypes.Number
 * @requires    amjs.dataTypes.String
 * @requires    amjs.Factory
 */
class AmjsDataTypesMoney extends AmjsDataTypesObject
{
    /**
     * @constructor
     * @inheritDoc
     */
    constructor(...args)
    {
        super();

        this.$propertyTypes = {
            amount      : 'Number',
            currency    : 'String'
        };

        /**
         * Money amount value
         * @property    amount
         * @type        {amjs.dataTypes.Number}
         * @default     null
         */
        this.amount     = null;

        /**
         * Money currency
         * @property    currency
         * @type        {amjs.dataTypes.String}
         * @default     null
         */
        this.currency   = null;

        this._setProperties(...args)
    }

    /**
     * @override
     */
    toString()
    {
        return `${this.amount} ${currencySymbols[this.currency.value]}`;
    }

    /**
     * Prints this instance into an HTML template
     * @return {String} HTML template fulfilled
     */
    toHTML()
    {
        return `<span class="money-integer">${this.amount.integer}</span>
<span class="money-sep"></span>
<span class="money-decimal">${this.amount.decimal}</span>
<span class="money-currency">${currencySymbols[this.currency.value]}</span>`;
    }
}

AmjsDataTypesObject.register('Money', AmjsDataTypesMoney);
module.exports = AmjsDataTypesMoney;
