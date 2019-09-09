const fs = require('fs');

const htmlInput = process.cwd() + "/src/html/index.html";
const htmlOutput = process.cwd() + "/public/index.html";

fs.createReadStream(htmlInput).pipe(fs.createWriteStream(htmlOutput));
