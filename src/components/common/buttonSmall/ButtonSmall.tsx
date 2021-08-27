import React from "react"
import s from "./ButtonSmall.module.scss"

type ButtonSmallPropsType = {
    text: string
    onClick?: any
    disabled?: boolean
    style?: any
}

export const ButtonSmall = React.memo((props: ButtonSmallPropsType) => {
    return (
        <>
            {props.disabled
            ? <button onClick={props.onClick} disabled={props.disabled} className={s.buttonSmallDisabled}>
                    {props.text}
                </button>
            : <button onClick={props.onClick} className={s.buttonSmall} style={props.style}>
                    {props.text}
                </button>
            }
        </>
    )
})
