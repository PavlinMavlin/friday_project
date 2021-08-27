import React from "react"
import s from "../ModalWindow.module.scss"
import {ModalDelete} from "../modalDelete/ModalDelete";



type ModalWindowDeletePropsType = {
    name: string
    packName: string
    onDeleteButtonClick: any
    onCloseModalButtonClick: any
}

export const ModalWindowDelete = React.memo((props: ModalWindowDeletePropsType) => {
    return (
        <div className={s.modalWindow}>
            <ModalDelete
                name={props.name}
                packName={props.packName}
                onDeleteButtonClick={props.onDeleteButtonClick}
                onCloseModalButtonClick={props.onCloseModalButtonClick}
            />
        </div>
    )
})