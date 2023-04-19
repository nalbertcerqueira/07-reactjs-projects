import propTypes from "prop-types"

import BillingCyclesProvider from "./providers/BillingCyclesContext"
import DashboardProvider from "./providers/DashboardContext"
import FormProvider from "./providers/FormContext"
import MenuProvider from "./providers/MenuContext"
import ModalProvider from "./providers/ModalContext"
import TabsProvider from "./providers/TabsContext"
import UserProvider from "./providers/UserContext"

//Wrapper de todos os contextos, utilizado em AppTemplate.jsx
export default function AppProvider({ children }) {
    return (
        <UserProvider>
            <MenuProvider>
                <DashboardProvider>
                    <BillingCyclesProvider>
                        <TabsProvider>
                            <FormProvider>
                                <ModalProvider>{children}</ModalProvider>
                            </FormProvider>
                        </TabsProvider>
                    </BillingCyclesProvider>
                </DashboardProvider>
            </MenuProvider>
        </UserProvider>
    )
}
AppProvider.propTypes = {
    children: propTypes.node
}
