module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "prettier",
        "plugin:prettier/recommended",
        "next/core-web-vitals",
        "plugin:@next/next/recommended"
    ],
    overrides: [],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["prettier", "react"],
    rules: {
        "prettier/prettier": ["error"],
        "react/prop-types": ["error"],
        "no-param-reassign": ["error", { props: true }]
    }
}
