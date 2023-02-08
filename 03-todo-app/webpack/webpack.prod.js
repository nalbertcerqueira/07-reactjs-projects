const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtracPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const webpackNodeExternals = require("webpack-node-externals")
const { imagesRuleProd, scriptsRule, cssServerRule } = require("./webpack.common.js")

const clientConfig = {
    mode: "production",
    entry: {
        bundle: path.resolve(__dirname, "../", "src", "client", "index.js")
    },
    output: {
        path: path.resolve(__dirname, "../", "build"),
        filename: "public/js/[name][contenthash].js",
        publicPath: "/"
    },
    module: {
        rules: [
            scriptsRule,
            imagesRuleProd,
            {
                test: /\.html/,
                exclude: /node_modules/,
                use: ["html-loader"]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [MiniCssExtracPlugin.loader, "css-loader", "postcss-loader"]
            }
        ]
    },
    optimization: {
        minimizer: ["...", new CssMinimizerPlugin()]
    },
    plugins: [
        new MiniCssExtracPlugin({ filename: "public/css/styles[contenthash].css" }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        })
    ]
}

const serverConfig = {
    mode: "production",
    entry: {
        server: path.resolve(__dirname, "../", "src", "server", "server.js")
    },
    target: "node",
    output: {
        path: path.resolve(__dirname, "../", "build"),
        filename: "[name].js",
        clean: true
    },
    module: {
        rules: [scriptsRule, imagesRuleProd, cssServerRule]
    },
    optimization: {
        minimizer: ["...", new CssMinimizerPlugin()]
    },
    externals: [webpackNodeExternals()]
}

module.exports = [clientConfig, serverConfig]
