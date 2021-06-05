const { join, resolve } = require('path');

const Fiber = require('fibers');
const pug = require('pug');

const IN_DIR = resolve(__dirname, 'src');
const OUT_DIR = resolve(__dirname, 'public');

exports.default = function* (task) {
	yield task.parallel(['pug', 'sitemap', 'static', 'styles', 'wellKnown']);
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

exports.wellKnown = function* (task) {
	yield task.source(join(IN_DIR, 'static', '.well-known', '**', '*')).target(join(OUT_DIR, '.well-known'));
}

exports.watch = function* (task) {
	yield task.watch(join(IN_DIR, 'pugData.js'), 'pug');
	yield task.watch(join(IN_DIR, 'index.pug'), 'pug');
	yield task.watch(join(IN_DIR, 'scss', '**', '*.scss'), 'styles');
	yield task.watch(join(IN_DIR, 'static', '**', '*'), 'static');
};
