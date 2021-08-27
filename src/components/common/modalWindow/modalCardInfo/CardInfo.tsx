import React, {ChangeEvent, useCallback, useState} from "react"
import {InputTextMUI} from "../../inputText/InputTextMUI"
import {Button} from "../../button/Button"
import s from "./CardInfo.module.scss"

type CardInfoPropsType = {
    name: string
    question?: string
    answer?: string
    onAddNewHandler: (question: string, answer: string) => void
    onCloseModalButtonClick: () => void
}

export const CardInfo = React.memo((props: CardInfoPropsType) => {

    const [question, setQuestion] = useState(props.question ? props.question : "")
    const [answer, setAnswer] = useState(props.answer ? props.answer : "")

    const onChangeHandlerQuestion = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }, [])

    const onChangeHandlerAnswer = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }, [])

    const addSaveHandler = useCallback(() => {
        if (question.trim() !== "") {
            props.onAddNewHandler(question, answer)
            setQuestion("")
            setAnswer("")
        }
    }, [props, question, answer])

    return (
        <div className={s.cardInfo}>
            <h2 className={s.caption}>{props.name}:</h2>
            <div className={s.inputBox}>
                <div className={s.inputWrap}>
                    <InputTextMUI
                        type={"text"}
                        value={question}
                        onChangeHandler={onChangeHandlerQuestion}
                        label={"Question"}
                        autoComplete="off"
                    />
                </div>
                <div className={s.inputWrap}>
                    <InputTextMUI
                        type={"text"}
                        value={answer}
                        onChangeHandler={onChangeHandlerAnswer}
                        label={"Answer"}
                        autoComplete="off"
                    />
                </div>
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