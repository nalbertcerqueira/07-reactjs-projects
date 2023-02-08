const imagesRuleDev = {
    test: /\.(jpg|jpeg|gif|png|svg)$/,
    exclude: /node_modules/,
    type: "asset/resource",
    generator: {
        publicPath: "/",
        filename: "public/img/[name][ext]"
    }
}
const imagesRuleProd = {
    test: /\.(jpg|jpeg|gif|png|svg)$/,
    exclude: /node_modules/,
    type: "asset/resource",
    generator: {
        publicPath: "/",
        filename: "public/img/[name][contenthash][ext]"
    }
}
const scriptsRule = {
    test: /\.(js|jsx|mjs)$/,
    exclude: /node_modules/,
    use: {
        loader: "babel-loader",
        options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
        }
    }
}
const cssServerRule = {
    test: /\.css$/,
    exclude: /node_modules/,
    use: ["css-loader", "postcss-loader"]
}
module.exports = { imagesRuleDev, imagesRuleProd, scriptsRule, cssServerRule }
