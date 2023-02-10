const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: ['./src/js/index.js', './src/scss/style.scss'],
    output: {
        filename: './app.min.js',
        path: path.resolve(__dirname, 'build'),
        assetModuleFilename: 'static/assets/[hash][ext][query]'
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
        minimize: false,        
    }
};