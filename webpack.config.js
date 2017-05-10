const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const cssDev = ['style-loader', 'css-loader?sourceMap', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    publicPath: '/dist'
});

const cssConfig = isProduction ? cssProd : cssDev;

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: {
                loader: 'vue-loader',
                options: {
                    scss: 'vue-style-loader!css-loader!sass-loader',
                    sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                }
            }
        }, {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            use: cssConfig
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]?[hash]'
                }
            }
        }, {
            test: /\.(woff2?)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: 'fonts/[name].[ext]'
                }
            }
        }, {
            test: /\.(ttf|eot)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            }
        }]
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        stats: 'errors-only'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Marvel Heroes',
            hash: true,
            template: './src/index.html'
        }),
        new ExtractTextPlugin({
            filename: '/css/[name].css',
            disable: !isProduction,
            allChunks: true
        })
    ],
    devtool: '#eval-source-map'
};

if (isProduction) {

    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);

}
