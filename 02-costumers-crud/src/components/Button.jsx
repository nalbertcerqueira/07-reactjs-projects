//Componente Button utilizado Form.jsx e index.jsx

import propTypes from "prop-types"

export default function Button(props) {
    const color = props.color || "gray"
    const colorsGradient = {
        gray: "from-gray-500 to-gray-700",
        green: "from-green-500 to-green-700",
        red: "from-red-500 to-red-700",
        blue: "from-blue-500 to-blue-700",
        pink: "from-pink-500 to-pink-700",
        purple: "from-purple-500 to-purple-700",
        violet: "from-violet-500 to-violet-700",
        yellow: "from-yellow-500 to-yellow-700"
    }

    return (
        <button
            type={props.type}
            onClick={props.onClick}
            className={`text-lg bg-gradient-to-r ${colorsGradient[color]}
            text-white rounded-md px-4 py-2 font-medium mb-6 sm:mb-4
            opacity-80 hover:opacity-100 transition-opacity ${props.className || ""}`}
        >
            {props.children}
        </button>
    )
}

Button.propTypes = {
    type: propTypes.string,
    className: propTypes.string,
    children: propTypes.node,
    color: propTypes.string,
    onClick: propTypes.func
}
