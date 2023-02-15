//Componente Table utilizado em index.jsx

import propTypes from "prop-types"
import { DeleteIcon, EditIcon } from "./Icons.jsx"

export default function Table(props) {
    //Verificando se as ações de edição e exclusão do cliente foram passadas em props
    const costumerAcions = props.editCostumer || props.deleteCostumer ? true : false

    //Criando o head da tabela
    function renderTableHead() {
        return (
            <tr className="bg-gradient-to-r from-purple-500 to-purple-800">
                <th className="hidden sm:table-cell py-2 px-4 text-left text-gray-100">
                    Código
                </th>
                <th className="py-2 px-4 text-left text-gray-100">Nome</th>
                <th className="py-2 px-4 text-left text-gray-100">Idade</th>
                {costumerAcions ? (
                    <th className="py-2 px-4 text-center text-gray-100">Ações</th>
                ) : null}
            </tr>
        )
    }

    //Criando o corpo da tabela
    function renderTableBody(costumers) {
        return costumers?.map((costumer) => {
            return (
                <tr className="odd:bg-purple-100 even:bg-purple-200" key={costumer.id}>
                    <td className="hidden sm:table-cell p-4 max-w-9 text-ellipsis overflow-hidden">
                        {costumer.id}
                    </td>
                    <td className="p-4 max-w-9 text-ellipsis overflow-hidden">
                        {costumer.name}
                    </td>
                    <td className="p-4">{costumer.age}</td>
                    {costumerAcions ? renderActions(costumer) : null}
                </tr>
            )
        })
    }

    //Criando as ações de edição e exclusão do cliente
    function renderActions(costumer) {
        return (
            <td className="p-4">
                <div className="flex justify-center gap-1">
                    {props.deleteCostumer ? (
                        <button
                            className="p-2 rounded-full hover:bg-gray-50 transition duration-150"
                            onClick={() => props?.deleteCostumer(costumer.id)}
                        >
                            <DeleteIcon />
                        </button>
                    ) : null}
                    {props.editCostumer ? (
                        <button
                            className="p-2 rounded-full hover:bg-gray-50 transition duration-150"
                            onClick={() => props?.editCostumer(costumer)}
                        >
                            <EditIcon />
                        </button>
                    ) : null}
                </div>
            </td>
        )
    }

    return (
        <table className="text-lg w-full rounded-lg sm:rounded-xl overflow-hidden">
            <thead>{renderTableHead()}</thead>
            <tbody>{renderTableBody(props.costumers)}</tbody>
        </table>
    )
}

Table.propTypes = {
    costumers: propTypes.array,
    editCostumer: propTypes.func,
    deleteCostumer: propTypes.func
}
