module.exports = {
    plugins: {
        'postcss-import': {},
        tailwindcss: {},
        autoprefixer: {},
        cssnano: {
            preset: ['default', {
                discardComments: { removeAll: true },
                // Disable calc optimization to avoid infinity issues
                calc: false
            }]
        }
    }
}
