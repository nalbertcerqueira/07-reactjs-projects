//Componente Modal utlizado em index.jsx

import propTypes from "prop-types"
import { CloseIcon, WarningIcon } from "./Icons"

export default function Modal(props) {
    return (
        <div
            className={`w-screen overflow-scroll p-6 min-h-screen bg-slate-800/70 fixed top-0 left-0
            xsm:justify-center items-center opacity-0 flex animate-showModal`}
        >
            <div className="bg-slate-100 py-6 px-6 max-w-sm text-lg rounded-lg relative min-w-16.5">
                <section className="mb-2">
                    <WarningIcon className="m-auto" />
                </section>
                <section>
                    <span
                        className="absolute top-4 right-4 cursor-pointer"
                        onClick={props.closeModal}
                    >
                        <CloseIcon />
                    </span>
                </section>
                <section className="mb-8 text-center">
                    <h2 className="font-medium mb-2  text-gray-800 text-xl">Atenção!</h2>
                    <p>Você está prestes a apagar um cliente da lista, tem certeza ?</p>
                </section>
                <section className="text-right">
                    <button
                        type="button"
                        onClick={props.confirmModal}
                        className="mr-3 bg-red-500 py-2 px-4 rounded-md
                        text-gray-100 font-medium text-base hover:bg-red-600
                        hover:border-red-700 transition border-1 border-red-600"
                    >
                        Apagar
                    </button>
                    <button
                        type="button"
                        onClick={props.closeModal}
                        className="bg-slate-200 py-2 px-4 rounded-md text-gray-900
                        font-medium text-base border-1 border-slate-300 hover:bg-slate-300
                        hover:border-slate-400 transition"
                    >
                        Cancelar
                    </button>
                </section>
            </div>
        </div>
    )
}

Modal.propTypes = {
    closeModal: propTypes.func,
    confirmModal: propTypes.func
}
