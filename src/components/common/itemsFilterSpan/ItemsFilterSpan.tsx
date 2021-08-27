import React, {useCallback} from "react"
import {SortPacksAndCardsOrderType} from "../../../redux/reducers/packsList-reducer"
import s from "./ItemsFilterSpan.module.scss"

type ItemsFilterSpanPropsType = {
    title: string
    status?: SortPacksAndCardsOrderType
    setSetStatusValue: (sortPacksOrder: SortPacksAndCardsOrderType, sortPacksFilter: string) => void
}

export const ItemsFilterSpan = React.memo((props: ItemsFilterSpanPropsType) => {

    const onStatusClickHandler = useCallback(() => {
        switch (props.title) {
            case "Name":
                props.status === 1
                    ? props.setSetStatusValue(0, "name")
                    : props.setSetStatusValue(1, "name")
                break
            case "Cards":
                props.status === 1
                    ? props.setSetStatusValue(0, "cardsCount")
                    : props.setSetStatusValue(1, "cardsCount")
                break
            case "Last Updated":
                props.status === 1
                    ? props.setSetStatusValue(0, "updated")
                    : props.setSetStatusValue(1, "updated")
                break
            case "Created by":
                props.status === 1
                    ? props.setSetStatusValue(0, "user_name")
                    : props.setSetStatusValue(1, "user_name")
                break
            case "Question":
                props.status === 1
                    ? props.setSetStatusValue(0, "question")
                    : props.setSetStatusValue(1, "question")
                break
            case "Answer":
                props.status === 1
                    ? props.setSetStatusValue(0, "answer")
                    : props.setSetStatusValue(1, "answer")
                break
            case "Grade":
                props.status === 1
                    ? props.setSetStatusValue(0, "grade")
                    : props.setSetStatusValue(1, "grade")
                break
        }
    }, [props])

    return (
        <span onClick={onStatusClickHandler} className={s.spanTitle}>
            {props.title}
            {props.status === 0 ? "▼": props.status === 1 ? "▲" : ""}
        </span>
    )
})