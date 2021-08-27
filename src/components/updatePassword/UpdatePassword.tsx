import React, {useState} from "react"
import {Redirect, useParams} from "react-router-dom"
import {useFormik} from "formik"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../redux/store"
import {updatePasswordTC} from "../../redux/reducers/updatePassword-reducer"
import {MainTitle} from "../common/mainTitle/MainTitle"
import {Button} from "../common/button/Button"
import {InputTextMUI} from "../common/inputText/InputTextMUI"
import InputAdornment from "@material-ui/core/InputAdornment"
import {IconButton} from "@material-ui/core"
import {Visibility, VisibilityOff} from "@material-ui/icons"
import s from "./UpdatePassword.module.scss"

type FormikErrorType = {
    newPassword?: string
}

export const UpdatePassword = React.memo(() => {

    const isSuccess = useSelector<AppRootStateType, boolean>(state => state.updatePasswordReducer.isSuccess)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const {token} = useParams<{token: string}>()

    const mouseDownPasswordHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const formik = useFormik({
        initialValues: {
            newPassword: "",
        },
        validate: (values) => {
            const error: FormikErrorType = {}
            if (!values.newPassword) {
                error.newPassword = "Required."
            } else if (values.newPassword.length < 8) {
                error.newPassword = "Must be at least 8 characters."
            }
            return error
        },
        onSubmit: values => {
            dispatch(updatePasswordTC(values.newPassword, token))
            formik.resetForm()
        }
    })

    if (isSuccess) {
        return <Redirect to={"/login"}/>
    }

    if (isLoggedIn) {
        return <Redirect to={"/"}/>
    }

    return (
        <div className={s.create}>
            <form onSubmit={formik.handleSubmit}>
                <MainTitle title={"It-Incubator"}/>
                <h2 className={s.caption}>Create new password</h2>
                <div className={s.inputWrap}>
                    <InputTextMUI
                        type={showPassword ? "text" : "password"}
                        {...formik.getFieldProps("newPassword")}
                        label={"Password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={mouseDownPasswordHandler}
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>)
                        }}
                    />
                    {formik.touched.newPassword && formik.errors.newPassword
                        ? <div>{formik.errors.newPassword}</div>
                        : <div>&nbsp;</div>
                    }
                </div>
                <p className={s.text}>Create new password and we will send you further instructions to email</p>
                <Button
                    type={"submit"}
                    className={s.button}>
                    Create new password
                </Button>
            </form>
        </div>
    )
})