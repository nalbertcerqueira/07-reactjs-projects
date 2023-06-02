/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Content-Security-Policy",
                        value: "img-src 'self';style-src 'self' https://fonts.googleapis.com 'unsafe-inline';font-src 'self' https://fonts.gstatic.com;frame-src;default-src 'self';base-uri 'self';form-action 'self';frame-ancestors 'self';object-src 'none';script-src 'self' 'unsafe-inline' 'unsafe-eval'; script-src-attr 'none';upgrade-insecure-requests"
                    },
                    {
                        key: "Cross-Origin-Opener-Policy",
                        value: "same-origin"
                    },
                    {
                        key: "Cross-Origin-Resource-Policy",
                        value: "same-origin"
                    },
                    {
                        key: "Origin-Agent-Cluster",
                        value: "?1"
                    },
                    {
                        key: "Referrer-Policy",
                        value: "no-referrer"
                    },
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=15552000; includeSubDomains"
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff"
                    },
                    {
                        key: "X-DNS-Prefetch-Control",
                        value: "off"
                    },
                    {
                        key: "X-Download-Options",
                        value: "noopen"
                    },
                    {
                        key: "X-Frame-Options",
                        value: "SAMEORIGIN"
                    },
                    {
                        key: "X-Permitted-Cross-Domain-Policies",
                        value: "none"
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "0"
                    }
                ]
            }
        ]
    }
}

module.exports = nextConfig
