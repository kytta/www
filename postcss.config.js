module.exports = {
    plugins: [
        require('postcss-normalize')(),
        require('postcss-preset-env')(),
        require('css-mqpacker')(),
        require('autoprefixer')(),
        require('cssnano')()
    ]
}
