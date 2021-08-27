import React from "react"
import {Redirect, useHistory} from "react-router-dom"
import {useFormik} from "formik"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../redux/store"
import {updateUserDataTC} from "../../redux/reducers/app-reducer"
import {InputTextMUI} from "../common/inputText/InputTextMUI"
import {ProfileAvatarBtn} from "../common/profileAvatarBtn/ProfileAvatarBtn"
import {Button} from "../common/button/Button"
import s from "./Personal.module.scss"

type FormikErrorType = {
    nickName?: string
    email?: string
}

type PersonalInfoPropsType = {}

export const PersonalInfo = React.memo((props: PersonalInfoPropsType) => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const dispatch = useDispatch()

    const history = useHistory()

    const formik = useFormik({
        initialValues: {
            nickName: "",
            email: "",
            avatar: ""
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.nickName) {
                errors.nickName = "Required."
            } else if (values.nickName.length < 1) {
                errors.nickName = "Nickname cannot be empty."
            }
            if (!values.email) {
                errors.email = "Required."
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address."
            }
            return errors
        },
        onSubmit: (values) => {
            if (!formik.errors.nickName && !formik.errors.email) {
                dispatch(updateUserDataTC(values.nickName, values.email, values.avatar))
                formik.resetForm()
                history.push("/profile")
            }
        }
    })

    if (!isLoggedIn) {
        return <Redirect to={"/login"}/>
    }

    return (
        <form onSubmit={formik.handleSubmit} className={s.personalInfo}>
            <h2 className={s.caption}>Personal Information</h2>
            <ProfileAvatarBtn/>
            <div className={s.inputBox}>
                <div className={s.inputWrap}>
                    <InputTextMUI
                        type={"text"}
                        {...formik.getFieldProps("nickName")}
                        label={"Nickname"}
                        autoComplete="off"
                    />
                    {formik.touched.nickName && formik.errors.nickName
                        ? <div>{formik.errors.nickName}</div>
                        : <div>&nbsp;</div>
                    }
                </div>
                <div className={s.inputWrap}>
                    <InputTextMUI
                        type={"text"}
                        {...formik.getFieldProps("email")}
                        label={"Email"}
                        autoComplete="off"
                    />
                    {formik.touched.email && formik.errors.email
                        ? <div>{formik.errors.email}</div>
                        : <div>&nbsp;</div>
                    }
                </div>
            </div>
            <div className={s.btns}>
                <Button
                    onClick={() => history.push("/profile")}
                    className={s.button}>
                    Cancel
                </Button>
                <Button
                    type={"submit"}
                    className={s.button}>
                    Save
                </Button>
            </div>
        </form>
    )
})