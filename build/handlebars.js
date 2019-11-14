const fs = require('fs');
const Hb = require('handlebars');
const jData = require('../src/data');

const htmlInput = process.cwd() + "/src/hb/index.handlebars";
const htmlOutput = process.cwd() + "/public/index.html";

fs.readFile(
    htmlInput,
    "utf-8",
    (err, data) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        const output = Hb.compile(data)(jData).replace(/\s+/g, ' ');

        fs.writeFile(
            htmlOutput,
            output,
            err => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
            }
        );
    }
);


