const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const EventHooksPlugin = require('event-hooks-webpack-plugin');
const fs = require('fs')

module.exports = {
    target: 'web',
    mode: 'production',
    entry: {
        ['config-style.min']: './src/config-style.css'
    },
    output: {
        clean: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new EventHooksPlugin({
            'done': () => {
                // ...
                fs.unlinkSync('dist/config-style.min.js')
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    optimization: {
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin(),
        ],
    }
}