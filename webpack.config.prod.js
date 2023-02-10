const path = require('path');
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
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'static/assets/[hash][ext][query]'
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
                test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/i,
                type: 'asset/resource',
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
              { from: "src/static", to: "static" },
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