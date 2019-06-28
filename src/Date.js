const AmjsDataTypesBase = require('./Base');

let $DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';

/**
 * Date type
 * @namespace   amjs.dataTypes.type
 * @class       amjs.dataTypes.type.Date
 * @extends     amjs.dataTypes.type.Base
 */
class AmjsDataTypesTypeDate extends AmjsDataTypesBase
{
    /**
     * @constructor
     */
    constructor()
    {
        super();

        /**
         * Specific date format of this instance
         * @property    format
         * @type        {string}
         * @default     ''
         */
        this.format = '';
    }

    /**
     * Sets the default date format to use
     * @param   {String}    format  New format
     */
    static set defaultFormat(format)
    {
        $DEFAULT_DATE_FORMAT = format;
    }

    /**
     * @override
     */
    _parseValue(value)
    {
        if (!(value instanceof Date))
        {
            switch (typeof value)
            {
                case 'number':
                    if (value && !isNaN(value))
                    {
                        value = new Date(value);
                    }
                    else
                    {
                        value = null;
                    }
                    break;
                case 'string':
                    value = new Date(Date.parse(value));
                    break;
                default:
                    value = null;
            }
        }

        return super._parseValue(value);
    }

    /**
     * Pads (leading zeroes) any value
     * @param   {String}    text    Value to left pad
     * @return  {String}    Text padded with leading zeroes
     * @private
     */
    _leftPad(text = '')
    {
        if (typeof text !== 'string')
        {
            text = String(text);
        }

        return `00${text}`.substr(text.length);
    }

    /**
     * Applies current date format to
     * @return  {String}    Date formatted
     * @private
     */
    _format()
    {
        let value = '';

        if (this.value instanceof Date)
        {
            value = (this.format || $DEFAULT_DATE_FORMAT).replace(
                /(\w+)/g,
                match =>
                {
                    let rep = '';
                    switch (match)
                    {
                        case 'dd':
                            rep = this._leftPad(this.value.getDate());
                            break;
                        case 'MM':
                            rep = this._leftPad(this.value.getMonth() + 1);
                            break;
                        case 'yyyy':
                            rep = this.value.getFullYear();
                            break;
                        case 'HH':
                            rep = this._leftPad(this.value.getHours());
                            break;
                        case 'mm':
                            rep = this._leftPad(this.value.getMinutes());
                            break;
                        case 'ss':
                            rep = this._leftPad(this.value.getSeconds());
                            break;
                        default:
                            rep = match;
                    }

                    return rep;
                }
            );
        }

        return value;
    }

    /**
     * @override
     */
    toString()
    {
        return this._format();
    }
}

AmjsDataTypesBase.register('Date', AmjsDataTypesTypeDate);
module.exports = AmjsDataTypesTypeDate;
