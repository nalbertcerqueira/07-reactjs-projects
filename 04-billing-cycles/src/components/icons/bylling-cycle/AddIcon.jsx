import propTypes from "prop-types"

export default function AddIcon({ className }) {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className={`w-5 h-5 ${className || ""}`}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </div>
    )
}
AddIcon.propTypes = {
    className: propTypes.string
}
