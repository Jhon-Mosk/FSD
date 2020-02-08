const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    contentBase: baseWebpackConfig.externals.path.dist,//место где будет открываться вебпак
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 8081,
        overlay: {
            warnings: false,
            errors: true}       //параметр: показ ошибок на экране браузера
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ]
})

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig)
})
