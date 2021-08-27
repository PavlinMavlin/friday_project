import React, {ChangeEvent, useCallback, useState} from "react"
import {InputTextMUI} from "../../inputText/InputTextMUI"
import {Button} from "../../button/Button"
import s from "./ModalAdd.module.scss"

type ModalAdd = {
    onAddNewPackHandler: (newValue: string) => void
    onCloseModalButtonClick?: () => void
}

export const ModalAdd = React.memo((props: ModalAdd) => {

    const [title, setTitle] = useState("")

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }, [])

    const addSaveHandler = useCallback(() => {
        if (title.trim() !== "") {
            props.onAddNewPackHandler(title)
            setTitle("")
        }
    }, [props, title])

    return (
        <div className={s.modalAdd}>
            <div className={s.modalTop}>
                <h2 className={s.caption}>Add new pack:</h2>
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
                    onClick={addSaveHandler}
                    className={s.button}>
                    Save
                </Button>
            </div>
        </div>
    )
})