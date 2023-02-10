const path = require('path');
var webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: ['./src/js/index.js', './src/scss/style.scss'],
    output: {
        filename: './app.min.js',
        path: path.resolve(__dirname, 'build')
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.js$/, exclude: /node_modules/,
                use: {
                    loader: "babel-loader", 
                    options: { presets: ['babel-preset-env'] } 
                }
            },
            {
                test: /\.(sass|css|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            publicPath: "./img",
                            emitFile: false
                        }
                    }
                ]
            },
            {
                test: /\.(svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: './svg/[hash][ext][query]',
                },
            },
            {
                test: /\.(woff(2)?|ttf|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: './fonts/[hash][ext][query]',
                },
            },
            {
                test: /\.html$/i,
                type: "asset/resource",
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ 
            filename: './style.min.css' 
        }),
        new CopyPlugin({
            patterns: [
              {
                context: path.resolve(__dirname, "src"),
                from: "./*.html",
              },
            ],
        }),
    ],
    optimization: {
        minimize: false,        
    }
};

new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
});