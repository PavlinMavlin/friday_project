import React, {useCallback, useState} from "react"
import {NavLink, Redirect} from "react-router-dom"
import {useFormik} from "formik"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../redux/store"
import {loginTC} from "../../redux/reducers/login-reducer"
import {RequestStatusType} from "../../redux/reducers/app-reducer"
import {InputTextMUI} from "../common/inputText/InputTextMUI"
import {MainTitle} from "../common/mainTitle/MainTitle"
import {Button} from "../common/button/Button"
import {Checkbox, FormControlLabel, IconButton} from "@material-ui/core"
import InputAdornment from "@material-ui/core/InputAdornment"
import {Visibility, VisibilityOff} from "@material-ui/icons"
import {useStyles} from "./LoginStyles"
import s from "./Login.module.scss"

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = React.memo(() => {

    const classes = useStyles()

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.appReducer.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }, [])

    const formik = useFormik({
        initialValues: {
            email: "poiumazaya@gmail.com",
            password: "newPiatnicaTest",
            rememberMe: false
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
            return errors
        },
        onSubmit: (values) => {
            dispatch(loginTC(values.email, values.password, values.rememberMe))
            formik.resetForm()
        }
    })

    if (isLoggedIn) {
        return <Redirect to={"/"}/>
    }

    return (
        <div className={s.login}>
            <MainTitle title={"It-Incubator"}/>
            <h2 className={s.caption}>Sign In</h2>
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
                                            onMouseDown={handleMouseDownPassword}
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
                </div>
                <div className={s.infoWrap}>
                    <FormControlLabel
                        label="Remember Me"
                        control={
                            <Checkbox
                                {...formik.getFieldProps("rememberMe")}
                                name="rememberMe"
                                color="default"
                                size={"small"}
                            />
                        }
                        className={classes.root}
                    />
                    <NavLink to={"/restorePassword"} className={s.forgotLink}>Forgot Password</NavLink>
                </div>
                <Button
                    type={"submit"}
                    disabled={status === "loading"}
                    className={s.button}>
                    Login
                </Button>
                <span className={s.account}>Don’t have an account?</span>
                <NavLink to={"/registration"} className={s.singUp}>Sign Up</NavLink>
            </form>
        </div>
    )
})