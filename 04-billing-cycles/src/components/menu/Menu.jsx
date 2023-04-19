import CoinIcon from "../icons/menu/CoinIcon.jsx"
import DashboardIcon from "../icons/menu/Dashboard"
import RegisterIcon from "../icons/menu/RegisterIcon"
import Item from "./Item"
import MenuTree from "./MenuTree"

//Componente Menu utilizado em Sidebar.jsx
export default function Menu() {
    return (
        <nav>
            <ul>
                <Item icon={<DashboardIcon className="icons" />} label="Dashboard" path="/" />
                <MenuTree icon={<RegisterIcon className="icons" />} label="Cadastro">
                    <Item
                        icon={<CoinIcon className="icons group-hover/icon:stroke-zinc-300" />}
                        label="Ciclo de pagamentos"
                        path="/billing-cycle"
                    />
                </MenuTree>
            </ul>
        </nav>
    )
}
