import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react"
import s from "./Button.module.scss"

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
    error?: string | null
}

export const Button: React.FC<ButtonPropsType> = React.memo(({
     error, className,
     ...restProps
}) => {

    const finalClassName = `${error ? s.error : s.default} ${className}`

    return (
        <button
            {...restProps}
            className={finalClassName}
        />
    )
})