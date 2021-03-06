# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 0.1.8

**Features**:

- Improved `Array` type
- Added `findBy` method to `Collection`

**Fixes**:

- Avoid JSON.stringify loop errors on assigning `$raw` value in `Object`

## 0.1.7

**Fixes**:

- Added 'Money' to object properties constructor

## 0.1.6

**Features**:

- Added `Money` type
- Added `@getter integer` and `@getter decimal` to `Number` type
- Added `toString` method to `Object` type
