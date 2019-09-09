const fs = require('fs');

const vavilonStrings = require('../src/vavilon/en');
const {projects} = require('../src/data');

const output = process.cwd() + "/public/en.json";

let projectStrings = {};

for (const p of projects) {
    projectStrings["p-" + p.id + "-name"] = p.name.en;
    projectStrings["p-" + p.id + "-desc"] = p.description.en;
}

const newDict = {
    ...vavilonStrings,
    ...projectStrings
};

fs.writeFile(output, JSON.stringify(newDict), err => {
    if (err) {
        console.error(err);
    }
});
