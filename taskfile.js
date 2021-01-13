const path = require('path');

const Fiber = require('fibers');
const pug = require('pug');

const OUTPUT_DIR = './public';

exports.default = function* (task) {
	yield task.parallel(['pug', 'sitemap', 'static', 'styles', 'vavilon']);
};

exports.styles = function* (task) {
	yield task
		.source('./src/scss/main.scss')
		.sass({
			fiber: Fiber,
			includePaths: ['node_modules/normalize.css'],
		})
		.postcss({
			from: undefined,
			plugins: [
				require('autoprefixer')(),
				require('@fullhuman/postcss-purgecss')({
					content: ['./src/index.pug'],
				}),
				require('cssnano')({
					preset: 'default',
				}),
			],
		})
		.target(OUTPUT_DIR);
};

// See: https://github.com/lukeed/taskr/issues/316#issuecomment-605296296
// See: https://github.com/lukeed/taskr/issues/316#issuecomment-605410415
exports.pug = function* (task) {
	const pugData = require('./src/pugData');

	yield task
		.source('./src/index.pug')
		.run({
			every: true,
			* func(file) {
				const html = pug.render(
					file.data.toString(),
					{
						filename: path.join(file.dir, file.base),
						...pugData,
					},
				);

				file.data = Buffer.from(html);
				file.base = file.base.replace(/\.pug$/i, '.html');
			},
		})
		.target(OUTPUT_DIR);
};

exports.sitemap = function* (task) {
	const now = new Date();
	const today = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${(now.getDate()).toString().padStart(2, '0')}`;

	// language=XML
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
	<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
					xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
					xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
		<url>
			<loc>https://karamoff.dev/</loc>
			<lastmod>${today}</lastmod>
			<changefreq>monthly</changefreq>
			<priority>1.0</priority>
		</url>
	</urlset>
	`;

	yield task.$.write(
		`${OUTPUT_DIR}/sitemap.xml`,
		xml.replace(/\t/g, '').replace(/[\n\r]/g, ' '),
	);
};

exports.static = function* (task) {
	yield task.source('./src/static/**/*').target(OUTPUT_DIR);
};

exports.vavilon = function* (task) {
	const pugData = require('./src/pugData');
	const dictionaries = {};

	pugData.languages
		.forEach(l => {
			dictionaries[l] = {};
		});

	function translateSimpleString(key, langStringMap) {
		function writeString(lang, key, val) {
			dictionaries[lang][key] = val;
		}

		if (typeof langStringMap === 'string' || langStringMap instanceof String) {
			Object.keys(dictionaries)
				.forEach(lang => {
					writeString(lang, key, langStringMap);
				});
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

	['name', 'descriptionMeta', 'description']
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

	task._.files = Object.entries(dictionaries)
		.map(([lang, dict]) => ({
			dir: OUTPUT_DIR,
			base: `${lang}.json`,
			data: Buffer.from(JSON.stringify(dict)),
		}));

	task.target(OUTPUT_DIR);
};

exports.watch = function* (task) {
	yield task.watch('./src/pugData.js', ['pug', 'vavilon']);
	yield task.watch('./src/index.pug', 'pug');
	yield task.watch('./src/scss/**/*.scss', 'styles');
	yield task.watch('./src/static/**/*', 'static');
};
