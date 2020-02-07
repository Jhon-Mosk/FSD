const path = require('path')

module.exports = {
    entry: {
        app: './src/index.js'       //путь к точке входа, может быть несколько
    },
    output: {
        filename: '[name].js',       //точка выхода, имя берётся из ярлыка точки входа
        path: path.resolve(__dirname, './dist'),     //путь к выходной папке
        publicPath: './dist'        //папка нужно для работы devServer
    },
    devServer: {
        overlay: true       //параметр: показ ошибок на экране браузера
    }
}