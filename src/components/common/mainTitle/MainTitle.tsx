import React from "react"
import s from "./MainTitle.module.scss"

type MainTitlePropsType = {
    title: string
    textStyle?: string
}

export const MainTitle = React.memo((props: MainTitlePropsType) => {
    return (
        <h2 className={`${s.mainTitle} ${props.textStyle}`}>
            {props.title}
        </h2>
    )
})