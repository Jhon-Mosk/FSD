const path = require('path')        //обращаемся к package.json
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
}

const PAGES_DIR = `${PATHS.src}/pages/`              //откуда берутся страницы в паге
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {

    externals: {
        path: PATHS     //чтобы получить доступ к PATHS из других конфигов
    },
    entry: {
        app: PATHS.src       //путь к точке входа, может быть несколько
    },
    output: {
        filename: `${PATHS.assets}js/[name].[hash].js`,       //точка выхода, имя берётся из ярлыка точки входа
        path: PATHS.dist,     //путь к выходной папке
        publicPath: '/'        //папка нужно для работы devServer
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',            //для оптимизации загрузки
                    test: /node_modules/,       //всё из node_modules попадает в vendors.js
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [{
            test: /\.pug$/,              //какие файлы обрабатываем
            loader: 'pug-loader'    //через что обрабатываем файлы            
        }, {
            test: /\.(png|jpg|gif|svg)$/,              //какие файлы обрабатываем
            loader: 'file-loader',     //через что обрабатываем файлы
            options: {
                name: '[name].[ext]'
            }
        }, {
            test: /\.js$/,              //какие файлы обрабатываем
            loader: 'babel-loader',     //через что обрабатываем файлы
            exclude: '/node_modules/'   //исключаем из обработки         
        }, {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,              //какие файлы обрабатываем
            loader: 'file-loader',     //через что обрабатываем файлы
            options: {
                name: '[name].[ext]'
            }
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
                    options: { sourceMap: true, config: { path: `./postcss.config.js` } }
                }, {
                    loader: 'sass-loader',
                    options: { sourceMap: true }
                }
            ]     //через что обрабатываем файлы
        }]
    },
    resolve: {
        alias: {
            '~': 'src'
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[hash].css`
        }),
        // new HtmlWebpackPlugin({
        //     hash: false,                         //выключает хэши
        //     template: `${PATHS.src}/index.html`,
        //     filename: './index.html',
        //     inject: false                        //выключает автопрописывание стилей и скриптов вебпаком   
        // }),
        new CopyWebpackPlugin([                 //копирует файлы из в
            { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}/img` },
            { from: `${PATHS.src}/static`, to: '' },
            { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}/fonts` }
        ]),

        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,           //на входе паг
            filename: `./${page.replace(/\.pug/,'.html')}`              //на выходе хтмл
        }))
    ]
}