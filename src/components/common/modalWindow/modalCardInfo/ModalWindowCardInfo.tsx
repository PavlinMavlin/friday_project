import React from "react"
import s from "../ModalWindow.module.scss"
import {CardInfo} from "./CardInfo";




type ModalWindowCardInfoPropsType = {
    name: string
    question?: string
    answer?: string
    editCard: (question: string, answer: string) => void
    closeModal: () => void
}

export const ModalWindowCardInfo = React.memo((props: ModalWindowCardInfoPropsType) => {
    return (
        <div className={s.modalWindow}>
            <CardInfo
                name={props.name}
                answer={props.answer}
                question={props.question}
                onAddNewHandler={props.editCard}
                onCloseModalButtonClick={props.closeModal}
            />
        </div>
    )
})