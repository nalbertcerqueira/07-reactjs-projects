module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: ["eslint:recommended", "prettier", "plugin:prettier/recommended"],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": ["error"],
        "no-param-reassign": ["error", { props: true }]
    }
}
