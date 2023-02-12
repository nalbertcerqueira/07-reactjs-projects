/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
    theme: {
        extend: {
            screens: {
                xsm: "360px"
            },
            maxWidth: {
                9: "9rem"
            },
            borderWidth: {
                1: "1px"
            },
            minWidth: {
                16.5: "16.5rem",
                screen: "100vw"
            },
            keyframes: {
                showLayout: {
                    "0%": { opacity: "0%" },
                    "100%": { opacity: "100%" }
                },
                showModal: {
                    "0%": { opacity: "0%" },
                    "100%": { opacity: "100%" }
                }
            },
            animation: {
                showLayout: "showLayout 1s forwards ease-in-out",
                showModal: "showModal 0.25s forwards ease-in-out"
            }
        }
    },
    plugins: []
}
