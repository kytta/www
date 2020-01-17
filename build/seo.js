const fs = require("fs");
const path = require("path");

console.log("Moving SEO files...");

const input = process.cwd();
const output = path.join(process.cwd(), "public");

fs.createReadStream(path.join(input, 'robots.txt'))
   .pipe(fs.createWriteStream(path.join(output, 'robots.txt')));

fs.createReadStream(path.join(input, 'sitemap.xml'))
    .pipe(fs.createWriteStream(path.join(output, 'sitemap.xml')));
