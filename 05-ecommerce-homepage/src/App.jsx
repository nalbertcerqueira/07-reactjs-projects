import React from "react"
import HeaderBottom from "./components/layout/header/HeaderBottom"
import HeaderMiddle from "./components/layout/header/HeaderMiddle"
import HeaderTop from "./components/layout/header/HeaderTop"
import MenuContext from "./contexts/MenuContext"

import Content from "./components/layout/footer/Content"
import Copyright from "./components/layout/footer/Copyright"
import PaymentMethods from "./components/layout/footer/PaymentMethods"
import Banners from "./components/layout/sections/Banners"
import Deal from "./components/layout/sections/Deal"
import HotProducts from "./components/layout/sections/HotProducts"
import NewProducts from "./components/layout/sections/NewProducts"
import Newsletter from "./components/layout/sections/NewsletterSub"

export default function App() {
    return (
        <>
            <header>
                <MenuContext>
                    <HeaderTop />
                    <HeaderMiddle />
                    <HeaderBottom />
                </MenuContext>
            </header>
            <main>
                <Banners />
                <NewProducts />
                <Deal />
                <HotProducts />
                <Newsletter />
            </main>
            <footer className="footer">
                <div className="footer__inner-container">
                    <Content />
                    <PaymentMethods />
                    <Copyright />
                </div>
            </footer>
        </>
    )
}
