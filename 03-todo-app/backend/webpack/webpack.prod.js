const path = require("path")
const webpackNodeExternals = require("webpack-node-externals")

module.exports = {
    mode: "production",
    entry: {
        server: path.resolve(__dirname, "../src/server.js")
    },
    target: "node",
    output: {
        path: path.resolve(__dirname, "../", "build"),
        filename: "[name].js",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },
    externals: [webpackNodeExternals()]
}
