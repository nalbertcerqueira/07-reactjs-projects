import propTypes from "prop-types"

export default function MenuIcon(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            strokeWidth={1.5}
            className={`w-7 h-7 ${props.className}`}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
        </svg>
    )
}
MenuIcon.propTypes = {
    className: propTypes.string
}
