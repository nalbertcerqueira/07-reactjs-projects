/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                source: ["Source Sans Pro, sans-serif"]
            },
            screens: {
                xxs: "260px",
                mdd: "820px",
                smm: "670px"
            },
            keyframes: {
                show: {
                    "0%": { opacity: "0%" },
                    "100%": { opacity: "100%" }
                },
                slide: {
                    "0%": { transform: "translateX(200%)", opacity: "0%" },
                    "100%": { transform: "translateX0)", opacity: "100%" }
                },
                showModal: {
                    "0%": { opacity: "0%" },
                    "100%": { opacity: "100%" }
                }
            },
            animation: {
                showModal: "showModal 0.2s forwards ease-in-out"
            }
        }
    },
    plugins: []
}
