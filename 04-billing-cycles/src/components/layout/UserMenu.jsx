/* eslint-disable @next/next/no-img-element */
import useAuth from "@/src/hooks/useAuth"
import { useContext, useEffect, useState } from "react"
import { Context as AuthContext } from "../../contexts/AuthContext"
import Button from "../common/Button"

//Componente utilizado em Header.jsx
export default function UserMenu() {
    const { username, email } = useContext(AuthContext)
    const { methods } = useAuth()
    const [menu, setMenu] = useState(false)

    //Função utilizada para criar o efeito toggle no menu do usuário
    function toggleMenu() {
        setMenu((prevState) => (prevState ? false : true))
    }

    //Fechando o menu do usuário caso seja feito um click fora dele
    function closeMenu(event) {
        const firstCondition = !event.target.closest(".drop-down")
        const secondCondition = !event.target.closest(".user-menu")
        if (firstCondition && secondCondition) return setMenu(false)
    }

    useEffect(() => {
        const body = document.body
        body.addEventListener("click", closeMenu)
        return () => body.removeEventListener("click", closeMenu)
    }, [])

    return (
        <div className="user-menu relative ml-auto h-full">
            <div onClick={toggleMenu} className="user-avatar">
                <span
                    className="shrink-0 block h-9 w-9 rounded-full overflow-hidden border-2
                    border-white/30"
                >
                    <img
                        className="h-full w-full"
                        src="/profile.jpg"
                        alt="user profile picture"
                    />
                </span>
                <div className="overflow-hidden max-w-[124px]">
                    <p className="text-white text-sm text-ellipsis overflow-hidden whitespace-nowrap">
                        {username}
                    </p>
                </div>
            </div>
            <div className={`drop-down ${menu ? "open" : ""}`}>
                <section className="p-3">
                    <span className="mb-3 block m-auto w-24 h-24 overflow-hidden rounded-full">
                        <img
                            className="h-full"
                            src="/profile.jpg"
                            alt="user profile picture"
                        />
                    </span>
                    <div className="text-white text-center break-words">
                        <p>{username}</p>
                        <p className="text-sm">{email}</p>
                    </div>
                </section>
                <section className="p-3 text-right bg-zinc-100">
                    <Button onClick={methods.logout} type="button" className="logout-button">
                        Sair
                    </Button>
                </section>
            </div>
        </div>
    )
}
