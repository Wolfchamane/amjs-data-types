// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

const cwd = process.cwd();

module.exports = {
    clearMocks                  : true,
    coverageDirectory           : 'coverage',
    coveragePathIgnorePatterns  : [
        '/node_modules/'
    ],
    coverageReporters           : [
        'lcov'
    ],
    coverageThreshold           : {
        global                  : {
            branches            : 100,
            functions           : 100,
            lines               : 100,
            statements          : 100
        }
    },
    moduleFileExtensions        : [
        'js',
        'mjs'
    ],
    rootDir                     : cwd,
    roots                       : [
        '<rootDir>/src',
        '<rootDir>/tests'
    ],
    testEnvironment             : 'node',
    testRegex                   : [
        '/tests/[^_].+.m?js$'
    ],
    transform                   : {
        '<rootDir>/src/*.m?js'  : 'babel-jest'
    },
    transformIgnorePatterns     : [
        '/node_modules/'
    ]
};
