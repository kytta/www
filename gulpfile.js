const { promises: fsP } = require('fs');
const path = require('path');

const Fiber = require('fibers');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const Vinyl = require('vinyl');

const pugData = require('./src/pugData');

sass.compiler = require('sass');

const OUTPUT_DIR = './public';

async function makedir() {
	try {
		await fsP.access(OUTPUT_DIR);
	} catch (e) {
		await fsP.mkdir(OUTPUT_DIR);
	}
}

function css() {
	return gulp.src('./src/scss/main.scss')
		.pipe(sass({
			fiber: Fiber,
			includePaths: ["node_modules/normalize.css"]
		}).on('error', sass.logError))
		.pipe(postcss([
			require('autoprefixer'),
			require('cssnano')
		]))
		.pipe(gulp.dest(OUTPUT_DIR));
}

function html() {
	return gulp.src('./src/index.pug')
		.pipe(pug({ locals: pugData }))
		.pipe(gulp.dest(OUTPUT_DIR));
}

function writeMultilangString(inputKey, outputKey, root = pugData) {
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

async function vavilon() {
	const dictionaries = {};
	pugData.languages
		.forEach(l => { dictionaries[l] = {} });

	function translateSimpleString(key, langStringMap) {
		function writeString(lang, key, val) {
			dictionaries[lang][key] = val;
		}

		if (typeof langStringMap === 'string' || langStringMap instanceof String) {
			Object.keys(dictionaries)
				.forEach(lang => {
					writeString(lang, key, langStringMap);
				})
		} else {
			Object.entries(langStringMap)
				.forEach(([lang, strOrArr]) => {
					if (typeof strOrArr === 'string' || strOrArr instanceof String) {
						writeString(lang, key, strOrArr);
					} else if (strOrArr instanceof Array) {
						for (let i = 0; i < strOrArr.length; i++) {
							writeString(lang, `${key}-${i}`, strOrArr[i]);

						}
					}
				});
		}
	}

	["name", "descriptionMeta", "description"]
		.forEach(k => translateSimpleString(k, pugData[k]));

	pugData.socials.forEach(soc => {
		translateSimpleString(soc.slug, soc.name);
	});

	pugData.listModules.forEach(mod => {
		translateSimpleString(`m-${mod.slug}`, mod.title);
		mod.items.forEach(item => {
			translateSimpleString(`m-${mod.slug}-${item.slug}-name`, item.name);
			translateSimpleString(`m-${mod.slug}-${item.slug}-desc`, item.description);
		});
	});


	return await Promise.all(
		Object.entries(dictionaries)
			.map(([lang, dict]) => {

				return fsP.writeFile(
					path.join(OUTPUT_DIR, `${lang}.json`),
					JSON.stringify(dict)
				)
			})
	)
}

function static() {
	return gulp.src('./src/static/**/*')
		.pipe(gulp.dest(OUTPUT_DIR));
}

exports.default = gulp.series(
	makedir,
	gulp.parallel(html, css, static, vavilon)
);

exports.watch = function () {
	gulp.watch('./src/pugData.js', gulp.parallel(html, vavilon));
	gulp.watch('./src/index.pug', html);
	gulp.watch('./src/style/**/*.scss', css);
	gulp.watch('./src/static/**/*', static);
}
