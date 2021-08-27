import React, {ChangeEvent, useCallback, useState} from "react"
import {InputTextMUI} from "../../inputText/InputTextMUI"
import {Button} from "../../button/Button"
import s from "./ModalEdit.module.scss"

type ModalEdit = {
    packName: string
    onEditNewPackButtonClick: (newValue: string) => void
    onCloseModalButtonClick?: () => void
}

export const ModalEdit = React.memo((props: ModalEdit) => {

    const [title, setTitle] = useState(props.packName)

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }, [])

    const onSaveClickHandler = useCallback(() => {
        if (title.trim() !== "") {
            props.onEditNewPackButtonClick(title)
            setTitle("")
        }
    }, [props, title])

    return (
        <div className={s.modalAdd}>
            <div className={s.modalTop}>
                <h2 className={s.caption}>Edit pack:</h2>
                <button onClick={props.onCloseModalButtonClick} className={s.btnCross}/>
            </div>
            <div className={s.inputWrap}>
                <InputTextMUI
                    type={"text"}
                    value={title}
                    onChangeHandler={onChangeHandler}
                    label={"Name Pack"}
                    autoComplete="off"
                />
            </div>
            <div className={s.btns}>
                <Button
                    onClick={props.onCloseModalButtonClick}
                    className={s.button}>
                    Cancel
                </Button>
                <Button
                    onClick={onSaveClickHandler}
                    className={s.button}>
                    Save
                </Button>
            </div>
        </div>
    )
})