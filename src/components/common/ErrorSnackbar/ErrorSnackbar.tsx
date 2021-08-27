import React, {useCallback} from "react"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../../redux/store"
import {setAppErrorAC} from "../../../redux/reducers/app-reducer"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert"

const Alert = React.memo((props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props}/>
})

export const ErrorSnackbar = React.memo(() => {

    const error = useSelector<AppRootStateType, string | null>(state => state.appReducer.error)
    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(true)

    const onClickCloseHandler = useCallback((event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return
        }
        setOpen(false)
        dispatch(setAppErrorAC(null))
    }, [dispatch])

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={onClickCloseHandler}>
            <Alert onClose={onClickCloseHandler} severity="error">
                {error}
            </Alert>
        </Snackbar>
    )
})