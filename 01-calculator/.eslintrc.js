module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        "eslint:recommended",
        "react-app",
        "react-app/jest",
        "plugin:react/recommended",
        "prettier",
        "plugin:prettier/recommended"
    ],
    overrides: [],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["react", "prettier"],
    rules: {
        "prettier/prettier": ["error"],
        "no-param-reassign": ["error", { props: true }]
    }
}
