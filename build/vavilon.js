const fs = require('fs');

const vavilonStrings = require('../src/vavilon/en');
const {projects} = require('../src/pug.config').locals;

const publicFolder = process.cwd() + "/public";

if (!fs.existsSync(publicFolder)) {
    fs.mkdirSync(publicFolder);
}

const outputFile = publicFolder + "/en.json";

let projectStrings = {};

for (const p of projects) {
    projectStrings["p-" + p.id + "-name"] = p.name.en;
    projectStrings["p-" + p.id + "-desc"] = p.description.en;
}

const newDict = {
    ...vavilonStrings,
    ...projectStrings
};

fs.writeFileSync(outputFile, JSON.stringify(newDict), err => {
    if (err) {
        console.error(err);
    }
});
