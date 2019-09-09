const fs = require('fs');
const path = require('path');

const inputFolder = process.cwd() + "/src/vavilon";
const outputFolder = process.cwd() + "/public";

fs.readdir(inputFolder, function (err, files) {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    files.forEach(function (file) {
        const fromPath = path.join(inputFolder, file);
        const toPath = path.join(outputFolder, file);

        fs.rename(fromPath, toPath, function (error) {
            if (error) {
                console.error("File moving error.", error);
            }
        });
    });
});
