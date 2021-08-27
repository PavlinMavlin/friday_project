import React, {useCallback, useState} from "react"
import {NavLink, Redirect, useHistory} from "react-router-dom"
import {useFormik} from "formik"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../redux/store"
import {signUpTC} from "../../redux/reducers/registration-reducer"
import {RequestStatusType} from "../../redux/reducers/app-reducer"
import {MainTitle} from "../common/mainTitle/MainTitle"
import {InputTextMUI} from "../common/inputText/InputTextMUI"
import {Button} from "../common/button/Button"
import InputAdornment from "@material-ui/core/InputAdornment"
import {IconButton} from "@material-ui/core"
import {Visibility, VisibilityOff} from "@material-ui/icons"
import s from "./Registration.module.scss"

type FormikErrorType = {
    email?: string
    password?: string
    repeatPassword?: string
}

export const Registration = React.memo(() => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const isSignUp = useSelector<AppRootStateType, boolean>(state => state.registrationReducer.isSignUp)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.appReducer.status)
    const dispatch = useDispatch()

    const history = useHistory()

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

    const onMouseDownPasswordHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const redirectToLoginClickHandler = useCallback(() => {
        history.push("/login")
    }, [history])

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            repeatPassword: ""
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = "Required."
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address."
            }
            if (!values.password) {
                errors.password = "Required."
            } else if (values.password.length < 6) {
                errors.password = "Password must be more than six characters."
            }
            if (!values.repeatPassword) {
                errors.repeatPassword = "Required."
            } else if (values.password !== values.repeatPassword) {
                errors.repeatPassword = "Passwords are not equal."
            }
            return errors
        },
        onSubmit: (values) => {
            dispatch(signUpTC(values.email, values.password))
            formik.resetForm()
        }
    })

    if (isSignUp) {
        return <Redirect to={"/login"}/>
    }

    if (isLoggedIn) {
        return <Redirect to={"/"}/>
    }

    return (
        <div className={s.registration}>
            <MainTitle title={"It-Incubator"}/>
            <h2 className={s.caption}>Sign Up</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.inputBox}>
                    <div className={s.inputWrap}>
                        <InputTextMUI
                            type={"email"}
                            {...formik.getFieldProps("email")}
                            label={"Email"}
                            autoComplete="off"
                        />
                        {formik.touched.email && formik.errors.email
                            ? <div>{formik.errors.email}</div>
                            : <div>&nbsp;</div>
                        }
                    </div>
                    <div className={s.inputWrap}>
                        <InputTextMUI
                            type={showPassword ? "text" : "password"}
                            {...formik.getFieldProps("password")}
                            label={"Password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            onMouseDown={onMouseDownPasswordHandler}
                                        >
                                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>)
                            }}
                        />
                        {formik.touched.password && formik.errors.password
                            ? <div>{formik.errors.password}</div>
                            : <div>&nbsp;</div>
                        }
                    </div>
                    <div className={s.inputWrap}>
                        <InputTextMUI
                            type={showConfirmPassword ? "text" : "password"}
                            {...formik.getFieldProps("repeatPassword")}
                            label={"Confirm password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            onMouseDown={onMouseDownPasswordHandler}
                                        >
                                            {showConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>)
                            }}
                        />
                        {formik.touched.repeatPassword && formik.errors.repeatPassword
                            ? <div>{formik.errors.repeatPassword}</div>
                            : <div>&nbsp;</div>
                        }
                    </div>
                </div>
                <div className={s.btns}>
                    <Button
                        onClick={redirectToLoginClickHandler}
                        className={s.button}>
                        <NavLink to={"/login"}>Cancel</NavLink>
                    </Button>
                    <Button
                        type={"submit"}
                        disabled={status === "loading"}
                        className={s.button}>
                        Register
                    </Button>
                </div>
            </form>
        </div>
    )
})