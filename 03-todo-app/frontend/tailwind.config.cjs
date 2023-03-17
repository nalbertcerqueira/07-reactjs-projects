/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}", "./*.html"],
    theme: {
        extend: {
            minWidth: {
                400: "400px",
                360: "360px"
            },
            maxWidth: {
                9: "9rem"
            },
            maxHeight: {
                "70-screen": "70vh"
            },
            height: {
                0.5: "0.125rem"
            },
            borderRadius: {
                sl: "0.25rem"
            },
            keyframes: {
                display: {
                    "0%": { opacity: "0%" },
                    "100%": { opacity: "100%" }
                },
                slide: {
                    "100%": {
                        transform: "translateX(-100%)",
                        opacity: "0%"
                    }
                },
                opacity: {
                    "0%": { opacity: "0%" },
                    "100%": { opacity: "100%" }
                }
            },
            animation: {
                display: "display 0.5s forwards ease-in-out",
                slide: "slide 1.25s forwards ease-in-out;",
                opacity: "opacity 0.25s ease-in-out 0.5s forwards"
            }
        }
    },
    plugins: []
}
