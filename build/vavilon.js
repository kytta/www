const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const pugConfig = require("../src/pugData");

console.log("Building vavilon.js dictionaries...");

let outputFolder = path.join(process.cwd(), "public");
mkdirp.sync(outputFolder);

let languages = pugConfig.languages.filter(
    l => l !== pugConfig.defaultLanguage
);

let dictionaries = {};
for (let lang of languages) {
    dictionaries[lang] = {};
}

function writeMultilangString(inputKey, outputKey, root = pugConfig) {
    if (outputKey === undefined) {
        outputKey = inputKey;
    }

    languages.forEach(lang => {
        if (typeof root[inputKey] === 'string' || root[inputKey] instanceof String) {
            dictionaries[lang][outputKey] = root[inputKey];
        } else {
            if (root[inputKey].hasOwnProperty(lang)) {
                if (typeof root[inputKey][lang] === 'string' || root[inputKey][lang] instanceof String) {
                    dictionaries[lang][outputKey] = root[inputKey][lang];
                } else if (root[inputKey][lang] instanceof Array) {
                    for (let idx in root[inputKey][lang]) {
                        dictionaries[lang][`${outputKey}-${idx}`] = root[inputKey][lang][idx];
                    }
                }
            }
        }
    })
}

["name", "descriptionMeta", "description"].forEach(mls => writeMultilangString(mls));

pugConfig.socials.forEach(soc => writeMultilangString('name', soc.slug, soc));

pugConfig.listModules.forEach(mod => {
    writeMultilangString('title', `m-${mod.slug}`, mod);
    mod.items.forEach(item => {
        writeMultilangString('name', `m-${mod.slug}-${item.slug}-name`, item);
        writeMultilangString('description', `m-${mod.slug}-${item.slug}-desc`, item);
    })
})

languages.forEach(lang => {
    fs.writeFileSync(
        path.join(outputFolder, `${lang}.json`),
        JSON.stringify(dictionaries[lang])
    )
});
