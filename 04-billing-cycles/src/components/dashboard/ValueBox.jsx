import propTypes from "prop-types"

//Componente utilizado para exibir o consolidado de créditos,
//débitos e saldo em index.jsx
export default function ValueBox(props) {
    return (
        <div
            className={`overflow-hidden rounded-md group/box shadow-md
            shadow-zinc-300 flex flex-col ${props.color} ${props.className || ""}`}
        >
            <div className="p-3 relative min-w-80">
                <div className={`text-white relative z-10 ${props.margin || "mb-5"}`}>
                    <h3
                        className={`${
                            props.valueStyle || "text-3xl font-bold mb-3 break-all"
                        }`}
                    >
                        {props.value}
                    </h3>
                    <p className="text-base">{props.text}</p>
                </div>
                <div
                    className={`absolute right-4 top-1/2 -translate-y-1/2
                    group-hover/box:scale-110 transition duration-500`}
                >
                    {props.icon}
                </div>
            </div>
            <div className={`h-6 mt-auto ${props.footerBgColor}`}></div>
        </div>
    )
}
ValueBox.propTypes = {
    icon: propTypes.node,
    text: propTypes.string,
    color: propTypes.string,
    margin: propTypes.string,
    value: propTypes.oneOfType([propTypes.string, propTypes.number]),
    className: propTypes.string,
    valueStyle: propTypes.string,
    footerBgColor: propTypes.string
}
