module.exports = {
    plugins: [
        require('autoprefixer'),
        require('mqpacker'),
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