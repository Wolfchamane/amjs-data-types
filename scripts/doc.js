#!/usr/bin/env node
const { JSDOM } = require('jsdom');
const path      = require('path');
const fs        = require('fs');
const templater = require('@amjs/templater');

const badges = () =>
{
    let badges = {};
    const coverageIndex = path.resolve(__dirname, '..', 'coverage', 'index.html');

    if (fs.existsSync(coverageIndex))
    {
        const dom = new JSDOM(fs.readFileSync(coverageIndex).toString());
        const clearfix = dom.window.document.querySelector('.clearfix');
        Array.from(clearfix.querySelectorAll('div.fl')).forEach(
            node =>
            {
                const key = node.querySelector('.quiet').textContent.trim();
                const value = node.querySelector('.strong').textContent.trim();
                let color = value.match(/\d+/).pop();
                color = Number(color) === 100
                    ? 'brightgreen'
                    : 'red';
                badges[key] = {
                    value, color
                };
            }
        )
    }

    return Object.keys(badges)
        .map(
            key =>
                `![${key}](https://img.shields.io/badge/${key}-${encodeURIComponent(badges[key].value)}-${badges[key].color}.svg)`)
        .join(' ');
};

const packageFile = require(path.resolve(__dirname, '..', 'package.json'));
const version = packageFile.version;

fs.writeFileSync(
    path.resolve(__dirname, '..', 'README.md'),
    templater(path.resolve(__dirname, 'README.hbs'), { badges, version }),
    'utf-8'
);

