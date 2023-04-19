import { useEffect, useState } from "react"

//Hook utilizado em UserMenu.jsx
export default function useUserMenu() {
    const [menu, setMenu] = useState(false)

    useEffect(() => {
        const body = document.body
        body.addEventListener("click", closeMenu)
        return () => body.removeEventListener("click", closeMenu)
    }, [])

    //Função utilizada para criar o efeito toggle no menu do usuário.
    function toggleMenu() {
        setMenu((prevState) => (prevState ? false : true))
    }

    //Fechando o menu do usuário caso seja feito um click fora dele.
    function closeMenu(event) {
        const firstCondition = !event.target.closest(".drop-down")
        const secondCondition = !event.target.closest(".user-menu")
        if (firstCondition && secondCondition) return setMenu(false)
    }

    return {
        menu,
        closeMenu,
        toggleMenu
    }
}
