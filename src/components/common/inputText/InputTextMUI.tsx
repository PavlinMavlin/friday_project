import React, {ChangeEvent} from "react"
import FormControl from "@material-ui/core/FormControl"
import {TextField} from "@material-ui/core"
import {TextFieldProps} from "@material-ui/core/TextField/TextField"
import {useStyles} from "./InputTextMUIStyles"
import s from "./InputTextMUI.module.scss"

type InputTextMUIPropsType = {
    title?: string
    onChangeHandler?: (e: ChangeEvent<HTMLInputElement>) => void
} & TextFieldProps

export const InputTextMUI = React.memo((props: InputTextMUIPropsType) => {

    const classes = useStyles()

    const {...restProps} = props

    return (
        <FormControl fullWidth className={classes.root}>
            <TextField
                value={props.title}
                onChange={props.onChangeHandler}
                {...restProps}
            />
        </FormControl>
    )
})