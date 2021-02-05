const { join, normalize, resolve } = require('path');

const Fiber = require('fibers');
const pug = require('pug');

const IN_DIR = resolve(__dirname, 'src');
const OUT_DIR = resolve(__dirname, 'public');

exports.default = function* (task) {
	yield task.parallel(['pug', 'sitemap', 'static', 'styles', 'vavilon']);
};

exports.styles = function* (task) {
	yield task
		.source(join(IN_DIR, 'scss', 'main.scss'))
		.sass({
			fiber: Fiber,
			includePaths: ['node_modules/normalize.css'],
		})
		.postcss({
			from: undefined,
			plugins: [
				require('autoprefixer')(),
				require('@fullhuman/postcss-purgecss')({
					content: [join(IN_DIR, 'index.pug')],
				}),
				require('cssnano')({
					preset: 'default',
				}),
			],
		})
		.target(OUT_DIR);
};

// See: https://github.com/lukeed/taskr/issues/316#issuecomment-605296296
// See: https://github.com/lukeed/taskr/issues/316#issuecomment-605410415
exports.pug = function* (task) {
	delete require.cache[require.resolve('./src/pugData')];
	const pugData = require('./src/pugData');

	yield task
		.source(join(IN_DIR, 'index.pug'))
		.run({
			every: true,
			* func(file) {
				const html = pug.render(
					file.data.toString(),
					{
						filename: join(file.dir, file.base),
						...pugData,
					},
				);

				file.data = Buffer.from(html);
				file.base = file.base.replace(/\.pug$/i, '.html');
			},
		})
		.target(OUT_DIR);
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
		join(OUT_DIR, 'sitemap.xml'),
		xml.replace(/\t/g, '').replace(/[\n\r]/g, ' '),
	);
};

exports.static = function* (task) {
	yield task.source(join(IN_DIR, 'static', '**', '*')).target(OUT_DIR);
};

exports.vavilon = function* (task) {
	delete require.cache[require.resolve('./src/pugData')];
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

	task._.globs = [join(IN_DIR, 'pugData.js')];

	task._.files = Object.entries(dictionaries)
		.map(([lang, dict]) => ({
			dir: normalize(IN_DIR),
			base: `${lang}.json`,
			data: Buffer.from(JSON.stringify(dict)),
		}));

	task.target(OUT_DIR);
};

exports.watch = function* (task) {
	yield task.watch(join(IN_DIR, 'pugData.js'), ['pug', 'vavilon']);
	yield task.watch(join(IN_DIR, 'index.pug'), 'pug');
	yield task.watch(join(IN_DIR, 'scss', '**', '*.scss'), 'styles');
	yield task.watch(join(IN_DIR, 'static', '**', '*'), 'static');
};
