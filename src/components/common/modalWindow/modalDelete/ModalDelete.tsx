import React from "react"
import {Button} from "../../button/Button"
import s from "./ModalDelete.module.scss"

type ModalDelete = {
    name: string
    packName: string
    onDeleteButtonClick: any
    onCloseModalButtonClick: any
}

export const ModalDelete = React.memo((props: ModalDelete) => {
    return (
        <div className={s.modalDelete}>
            <div className={s.modalTop}>
                <h2 className={s.caption}>Delete {props.name}:</h2>
                <button onClick={props.onCloseModalButtonClick} className={s.btnCross}/>
            </div>
            <div className={s.inputWrap}>
                <span className={s.text}>Do you really want to remove
                    <span className={s.accent}>{props.name} Name - {props.packName}?</span>
                    All cards will be excluded from this course.
                </span>
            </div>
            <div className={s.btns}>
                <Button
                    onClick={props.onCloseModalButtonClick}
                    className={s.button}>
                    Cancel
                </Button>
                <Button
                    onClick={props.onDeleteButtonClick}
                    className={s.button}>
                    Delete
                </Button>
            </div>
        </div>
    )
})