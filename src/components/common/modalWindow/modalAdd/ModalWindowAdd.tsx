import React from "react"
import {ModalAdd} from "./ModalAdd"
import s from "../ModalWindow.module.scss"

type ModalWindowAddPropsType = {
    addNewPack: (newValue: string) => void
    closeModal: () => void
}

export const ModalWindowAdd = React.memo((props: ModalWindowAddPropsType) => {
    return (
        <div className={s.modalWindow}>
            <ModalAdd
                onAddNewPackHandler={props.addNewPack}
                onCloseModalButtonClick={props.closeModal}
            />
        </div>
    )
})