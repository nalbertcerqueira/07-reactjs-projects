module.exports = {
    apps: [
        {
            name: "billing-cycles",
            script: "node_modules/next/dist/bin/next",
            args: "start -p 3000", //running on port 3000
            cwd: "./",
            watch: false,
            env_production: {
                NODE_ENV: "production"
            }
        }
    ]
}
