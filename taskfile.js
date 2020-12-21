const Fiber = require('fibers');

const OUTPUT_DIR = './public';

exports.default = function * (task) {
	yield task.parallel(['styles']);
}

exports.styles = function * (task) {
	yield task
		.source('./src/scss/main.scss')
		.sass({
			fiber: Fiber,
			includePaths: ["node_modules/normalize.css"]
		})
		.target(OUTPUT_DIR);
}
