import propTypes from "prop-types"

import ValueBox from "../../dashboard/ValueBox"
import BalanceIcon from "../../icons/dashboard/BalanceIcon"
import BankIcon from "../../icons/dashboard/BankIcon"
import DebtIcon from "../../icons/dashboard/DebtIcon"

//Componente utilizado nos formulários FormCreate, FormUpdate e
//FormDelete.jsx
export default function ValuesSummary({ credit, debt, balance }) {
    return (
        <>
            <ValueBox
                icon={<BankIcon stroke="stroke-green-700 w-16 h-16" />}
                valueStyle="text-2xl font-bold mb-2 break-all"
                margin="mb-0"
                color="bg-green-600"
                footerBgColor="bg-green-700"
                className="w-full min-w-[230px]"
                text="Total de Créditos"
                value={credit}
            />
            <ValueBox
                icon={<DebtIcon stroke="stroke-red-700 w-16 h-16" />}
                valueStyle="text-2xl font-bold mb-2 break-all"
                margin="mb-0"
                color="bg-red-600"
                footerBgColor="bg-red-700"
                className="w-full min-w-[230px]"
                text="Total de Débitos"
                value={debt}
            />
            <ValueBox
                icon={<BalanceIcon stroke="stroke-sky-700 w-16 h-16" />}
                valueStyle="text-2xl font-bold mb-2 break-all"
                margin="mb-0"
                color="bg-sky-600"
                footerBgColor="bg-sky-700"
                className="w-full min-w-[230px]"
                text="Saldo geral"
                value={balance}
            />
        </>
    )
}
ValuesSummary.propTypes = {
    credit: propTypes.oneOfType([propTypes.string, propTypes.number]),
    debt: propTypes.oneOfType([propTypes.string, propTypes.number]),
    balance: propTypes.oneOfType([propTypes.string, propTypes.number])
}
