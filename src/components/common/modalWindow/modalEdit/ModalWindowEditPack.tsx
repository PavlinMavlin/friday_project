import React from "react"
import s from "../ModalWindow.module.scss"
import {ModalEdit} from "./ModalEdit";


type ModalWindowEditPackPropsType = {
    packName: string
    editNewPack: (newValue: string) => void
    closeModal?: () => void
}

export const ModalWindowEditPack = React.memo((props: ModalWindowEditPackPropsType) => {
    return (
        <div className={s.modalWindow}>
            <ModalEdit
                packName={props.packName}
                onEditNewPackButtonClick={props.editNewPack}
                onCloseModalButtonClick={props.closeModal}
            />
        </div>
    )
})