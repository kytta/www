const fs = require('fs');
const sass = require('node-sass');

const scssInput = process.cwd() + "/src/scss";
const scssOutput = process.cwd() + "/public";

const result = sass.renderSync({
    file: scssInput + "/main.scss",
    includePaths: [ scssInput ],
    outputStyle: "compressed",
    outFile: scssOutput + "/style.min.css"
});

fs.writeFile(scssOutput + "/style.min.css", result.css, "binary", err => {

    if (err) {
        console.error(err);
        process.exit(1);
    }
});
