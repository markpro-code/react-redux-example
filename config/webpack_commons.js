const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

const publicPath = '/assets/'
const clientRoot = path.resolve(__dirname, '../src')
const outputPath = path.resolve(__dirname, '../dist/assets')

const optimization = {
    minimizer: [
        new TerserPlugin({
            parallel: true,
            sourceMap: true,
        }),
    ],
    splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
            },
            default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true,
            },
        },
    },
}

const fileLoaders = [
    {
        test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 8192,
                },
            },
        ],
    },
    {
        test: /\.(mp4|ogg)$/,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    },
]


module.exports = {
    clientRoot,
    outputPath,
    optimization,
    publicPath,
    fileLoaders,
    alias: {
        '@': path.resolve(clientRoot),
    },
    node: {
        __filename: true,
        __dirname: true,
    },
}
