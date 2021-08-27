import React, {useCallback} from "react"
import {CardType} from "../../../api/api"
import {Button} from "../../common/button/Button"
import {AnswerType} from "../LearnElement"
import s from "./LearnAnswer.module.scss"

type LearnAnswerPropsType = {
    card: CardType
    grades: string[]
    setShowAnswer: (value: boolean) => void
    onNextCard: (grade: number) => void
}

export const LearnAnswer = React.memo((props: LearnAnswerPropsType) => {

    const [value, setValue] = React.useState<AnswerType>(-1)

    const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.currentTarget.value) as AnswerType)
    }, [])

    const mappedOptions = props.grades ? props.grades.map((option, index) => (
        <label key={index} className={s.radioLabel}>
            <input
                type={"radio"}
                value={index}
                checked={value === index}
                onChange={onChangeHandler}
                className={s.radioInput}
            />
            {option}
        </label>
    )) : []

    return (
        <div className={s.learnAnswer}>
            <h2 className={s.caption}>Learn “Pack Name”</h2>
            <div className={s.block}>
                <span className={s.action}>Question:</span>
                <span className={s.text}>{props.card.question}</span>
            </div>
            <div className={s.block}>
                <span className={s.action}>Answer:</span>
                <span className={s.text}>{props.card.answer}</span>
            </div>
            <div className={s.radioWrap}>
                <span className={s.action}>Rate yourself:</span>
                {mappedOptions}
            </div>
            <div className={s.btns}>
                <Button
                    onClick={() => props.setShowAnswer(false)}
                    className={s.button}>
                    Cancel
                </Button>
                <Button
                    onClick={() => props.onNextCard(value)}
                    className={s.button}>
                    Next
                </Button>
            </div>
        </div>
    )
})