const path = require('path')        //обращаемся к package.json
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        app: './src/index.js'       //путь к точке входа, может быть несколько
    },
    output: {
        filename: '[name].js',       //точка выхода, имя берётся из ярлыка точки входа
        path: path.resolve(__dirname, './dist'),     //путь к выходной папке
        publicPath: '/dist'        //папка нужно для работы devServer
    },
    module: {
        rules: [{
            test: /\.js$/,              //какие файлы обрабатываем
            loader: 'babel-loader',     //через что обрабатываем файлы
            exclude: '/node_modules/'   //исключаем из обработки    
        }, {
            test: /\.css$/,              //какие файлы обрабатываем
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: { sourceMap: true }        //конфигурация css-loader
                }, {
                    loader: 'postcss-loader',
                    options: { sourceMap: true, config: { path: 'src/js/postcss.config.js' } }
                },
            ]     //через что обрабатываем файлы
        }, {
            test: /\.scss$/,              //какие файлы обрабатываем
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: { sourceMap: true }        //конфигурация css-loader
                }, {
                    loader: 'postcss-loader',
                    options: { sourceMap: true, config: { path: 'src/js/postcss.config.js' } }
                }, {
                    loader: 'sass-loader',
                    options: { sourceMap: true }
                }
            ]     //через что обрабатываем файлы
        }]
    },
    devServer: {
        overlay: true       //параметр: показ ошибок на экране браузера
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ]
}