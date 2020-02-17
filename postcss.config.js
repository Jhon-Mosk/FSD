module.exports = {
    plugins: [
        require('autoprefixer'),
        require('css-mqpacker'),
        require('cssnano')({
            preset: [
                'default', {
                    discardComments: {          //настройка удаляет комментарии
                        removeAll: true
                    }
                }
            ]
        })
    ]
}