const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpackNodeExternals = require("webpack-node-externals")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const { scriptsRule, imagesRuleDev, cssServerRule } = require("./webpack.common.js")

const clientConfig = {
    mode: "development",
    entry: {
        bundle: path.resolve(__dirname, "../", "src", "client", "index.js")
    },
    output: {
        path: path.resolve(__dirname, "../", "build"),
        filename: "public/js/[name].js",
        publicPath: "/"
    },
    module: {
        rules: [
            imagesRuleDev,
            scriptsRule,
            {
                test: /\.html/,
                exclude: /node_modules/,
                use: ["html-loader"]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "postcss-loader"]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["public/js/**", "!public/*"]
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        })
    ],
    devtool: "source-map"
}
const serverConfig = {
    mode: "development",
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
        rules: [imagesRuleDev, scriptsRule, cssServerRule]
    },
    externals: [webpackNodeExternals({})],
    devtool: "source-map"
}

module.exports = [serverConfig, clientConfig]
