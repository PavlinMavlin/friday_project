import React, {useCallback} from "react"
import {useHistory} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../../redux/store"
import {logoutTC} from "../../../redux/reducers/login-reducer"
import {HeaderMenuStatusType, setHeaderMenuStatusAC} from "../../../redux/reducers/app-reducer"
import {MainTitle} from "../mainTitle/MainTitle"
import {Button} from "../button/Button"
import s from "./HeaderMenu.module.scss"

export const HeaderMenu = React.memo(() => {

    const {status, headerMenuStatus} = useSelector((state: AppRootStateType) => state.appReducer)
    const dispatch = useDispatch()

    const history = useHistory()

    const packsListClassName = headerMenuStatus === "packsList" ? `${s.tabPack} ${s.activeHeaderMenuItem}` : s.tabPack
    const profileClassName = headerMenuStatus === "profile" ? `${s.tabProfile} ${s.activeHeaderMenuItem}` : s.tabProfile

    const onChangeHeaderMenuStatus = useCallback((headerMenuStatus: HeaderMenuStatusType) => {
        if (headerMenuStatus === "packsList") {
            history.push("/")
        } else {
            history.push("/profile")
        }
        dispatch(setHeaderMenuStatusAC(headerMenuStatus))
    }, [dispatch, history])

    const onLogoutClickHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [dispatch])

    return (
        <div className={s.headerMenu}>
            <div className={s.container}>
                <div className={s.inner}>
                    <div className={s.titleWrap}>
                        <MainTitle title={"It-Incubator"}/>
                    </div>
                    <div className={s.tabsWrap}>
                        <div
                            onClick={() => {
                                onChangeHeaderMenuStatus("packsList")
                            }}
                            className={packsListClassName}>
                            Packs list
                        </div>
                        <div
                            onClick={() => {
                                onChangeHeaderMenuStatus("profile")
                            }}
                            className={profileClassName}>
                            Profile
                        </div>
                    </div>
                    <Button
                        onClick={onLogoutClickHandler}
                        disabled={status === "loading"}
                        className={s.logoutButton}>
                        Log out
                    </Button>
                </div>
            </div>
        </div>
    )
})

