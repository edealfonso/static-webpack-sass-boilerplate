const path = require('path');
var webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "production",
    entry: ['./src/js/index.js', './src/scss/style.scss'],
    output: {
        filename: './app.min.js',
        path: path.resolve(__dirname, 'dist')
    },
    watch: false,
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
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
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
        minimize: true,
        minimizer: [
            // new TerserPlugin({
            //     minify: TerserPlugin.uglifyJsMinify,
            //     // `terserOptions` options will be passed to `uglify-js`
            //     // Link to options - https://github.com/mishoo/UglifyJS#minify-options
            //     terserOptions: {},
            // }),
            new CssMinimizerPlugin(),
            new HtmlMinimizerPlugin(),
            `...`, // webpack@5 feature: extend existing minimizers (i.e. `terser-webpack-plugin`)
        ]
    }
};

new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
});