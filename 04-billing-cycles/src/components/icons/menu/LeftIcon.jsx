import propTypes from "prop-types"

export default function LeftIcon({ className, stroke }) {
    return (
        <div className={className || ""}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                strokeWidth={2.0}
                className={`w-4 h-4 ${stroke}`}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                />
            </svg>
        </div>
    )
}
LeftIcon.propTypes = {
    className: propTypes.string,
    stroke: propTypes.string
}
