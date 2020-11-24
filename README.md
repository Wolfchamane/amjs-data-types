# @amjs/data-types 0.1.8

![Statements](https://img.shields.io/badge/Statements-100%25-brightgreen.svg) ![Branches](https://img.shields.io/badge/Branches-100%25-brightgreen.svg) ![Functions](https://img.shields.io/badge/Functions-100%25-brightgreen.svg) ![Lines](https://img.shields.io/badge/Lines-100%25-brightgreen.svg)

> Data types for your OOP javascript project

## Installation

```bash
$ npm i @amjs/data-types
```
## Usage

Can be use directly:
```javascript
// some.js file
const AmjsDataTypes = require('@amjs/data-types');
const str = new AmjsDataTypes.AmjsDataTypesString();
str.value = 'My Awesome String';

console.log(str.value); // My Awesome String
```

Can be de-constructed:
```javascript
const { AmjsDataTypesString } = require('@amjs/data-types');
const str = new AmjsDataTypesString();
str.value = 'My Awesome String';

console.log(str.value); // My Awesome String
```

Can be extended:
```javascript
// MyString.js
const AmjsDataTypesString = require('@amjs/data-types/src/String');
module.exports = class MyString extends AmjsDataTypesString
{
    welcome(name = '')
    {
        this.value = `Welcome ${user}`;
    }
}
```

__NOTICE__: in those examples CommonJS architecture + ES6 syntax is being used,
if its planned to use this ORM solution for web project,
is suggested to use [@babel](https://babeljs.io)
to transpile files properly.
#### Working with Object data type

```javascript
// Pre-register basic data types
require('@amjs/data-types/src/Date');
require('@amjs/data-types/src/Password');
require('@amjs/data-types/src/String');
// Requires parent Object class
const {AmjsDataTypesObject} = require('@amjs/data-types');

// Extend User from Object
class User extends AmjsDataTypesObject
{
    constructor(values)
    {
        super();

        // $privateProperties flags this object properties that should be handled internally
        this.$privateProperties = {
            password : true
        };

        // $propertyTypes maps the data type of each User property
        this.$propertyTypes = {
            password : 'Password',
            name     : 'String'
            birth    : 'Date'
        };

        // Use $propertyMap to map data values to User properties
        this.$propertyMap = {
            pwd         : 'password',
            userName    : 'name',
            dob         : 'birth'
        };

        // Flags $useMap to "true" to apply $propertyMap
        this.$useMap = true;

        // Declare properties
        this.password   = null;
        this.name       = null;
        this.birth      = null;

        this._setProperties(values);
    }
};

// Register User constructor (optional)
AmjsDataTypesObject.register('User', User);

const values = { pwd : '123456', userName : 'Mr. User', dob: '1989-02-03' };

// Direct creation
const user = new User();

// Factory creation
const user = AmjsDataTypesObject.create('User', values);

console.log(user.toJSON()); // { name : 'Mr. User', birth : '1989-02-03' }
```
### Working with Collection data types

```javascript

const { AmjsDataTypesCollection, AmjsDataTypesObject } = require('@amjs/data-types');

// Create (optional) & pre-register your item type class reference.
class MyObject extends AmjsDataTypesObject
{
    constructor(values)
    {
        super();

        /**
        * @override
        */
        this.$propertyTypes = {
            key : '*'
        };

        this.key = null;

        this._setProperties(values);
    }
}

AmjsDataTypesObject.register('MyObject', MyObject);

// Create a collection which "itemType" property is your new item type class
class MyCollection extends AmjsDataTypesCollection
{
    constructor(values)
    {
        super();
        this.$itemType = 'MyObject';
        this.value = values;
    }
}

const values = [{ key : 'value1' }, { key : 'value2' }, { key: 'value3' }];
const sut = new MyCollection(values);
console.log(sut.value); // [ MyObject { key: 'value1' }, MyObject { key: 'value2' }, MyObject { key: 'value3' } ]
```

