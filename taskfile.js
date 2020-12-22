const path = require('path');

const Fiber = require('fibers');
const pug = require('pug');

const OUTPUT_DIR = './public';

exports.default = function * (task) {
	yield task.parallel(['pug', 'static', 'styles']);
}

exports.styles = function * (task) {
	yield task
		.source('./src/scss/main.scss')
		.sass({
			fiber: Fiber,
			includePaths: ["node_modules/normalize.css"]
		})
		.postcss({
			from: undefined,
			plugins: [
				require('autoprefixer'),
				require('cssnano'),
			]
		})
		.target(OUTPUT_DIR);
}

// See: https://github.com/lukeed/taskr/issues/316#issuecomment-605296296
// See: https://github.com/lukeed/taskr/issues/316#issuecomment-605410415
exports.pug = function * (task) {
	const pugData = require('./src/pugData');

	yield task
		.source('./src/index.pug')
		.run({
			every: true,
			*func(file) {
				const html = pug.render(
					file.data.toString(),
					{
            filename: path.join(file.dir, file.base),
						...pugData,
					}
				);

				file.data = Buffer.from(html);
				file.base = file.base.replace(/\.pug$/i, '.html');
			}
		})
		.target(OUTPUT_DIR)
}

exports.static = function * (task) {
	yield task.source('./src/static/**/*').target(OUTPUT_DIR);
}
