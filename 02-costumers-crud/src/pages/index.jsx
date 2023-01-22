/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import useCostumers from "../hooks/useCostumers.jsx"

import Button from "../components/Button.jsx"
import CustomHead from "../components/CustomHead.jsx"
import Form from "../components/Form.jsx"
import Layout from "../components/Layout.jsx"
import Modal from "../components/Modal.jsx"
import Table from "../components/Table.jsx"

export default function Home() {
    //Importando métodos e propriedades do hook personalizado useCostumer
    const {
        getCostumersData,
        editCostumerInfo,
        deleteCostumer,
        newCostumer,
        closeModal,
        openModal,
        cancelForm,
        saveForm,
        currentCostumer,
        costumers,
        modalVisible,
        tableVisible,
        formVisible
    } = useCostumers([])

    /*Atualizando os dados da tabela de clientes cada vez que a tabela
    é exibida. Seria equivalente a uma sincronização de dados*/
    useEffect(() => {
        getCostumersData()
    }, [formVisible])

    return (
        <>
            <CustomHead title="Costumers CRUD"></CustomHead>
            <main
                className="text-xl min-h-screen flex justify-center items-center
                p-6 bg-gradient-to-r from-purple-500 to-sky-500"
            >
                <Layout title="Cadastro Simples">
                    {tableVisible && (
                        <>
                            <div className="text-right">
                                <Button onClick={newCostumer} color="green">
                                    Novo Cliente
                                </Button>
                            </div>
                            <Table
                                editCostumer={editCostumerInfo}
                                deleteCostumer={openModal}
                                costumers={costumers}
                            />
                        </>
                    )}
                    {formVisible && (
                        <Form
                            saveForm={saveForm}
                            cancelForm={cancelForm}
                            costumer={currentCostumer}
                        />
                    )}
                </Layout>
                {modalVisible && (
                    <Modal confirmModal={deleteCostumer} closeModal={closeModal} />
                )}
            </main>
        </>
    )
}
