import React, {useEffect} from "react"
import {Redirect, Route, Switch, useLocation} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "./redux/store"
import {initializeAppTC, RequestStatusType} from "./redux/reducers/app-reducer"
import {HeaderMenu} from "./components/common/headerMenu/HeaderMenu"
import {PacksList} from "./components/packsList/PacksList"
import {CardsList} from "./components/cardsList/CardsList"
import {LearnElement} from "./components/learnElement/LearnElement"
import {Profile} from "./components/profile/Profile"
import {PersonalInfo} from "./components/personalInfo/PersonalInfo"
import {Login} from "./components/login/Login"
import {Registration} from "./components/registration/Registration"
import {RestorePassword} from "./components/restorePassword/RestorePassword"
import {UpdatePassword} from "./components/updatePassword/UpdatePassword"
import {PageNotFound} from "./components/pageNotFound/PageNotFound"
import {CheckEmail} from "./components/checkEmail/CheckEmail"
import {ErrorSnackbar} from "./components/common/ErrorSnackbar/ErrorSnackbar"
import {CircularProgress} from "@material-ui/core"
import s from "./App.module.scss"

function App() {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.appReducer.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const dispatch = useDispatch()

    const {pathname} = useLocation()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (status === "loading") {
        return <div style={{position: "fixed", top: "40%", textAlign: "center", width: "100%"}}>
            <CircularProgress
                size={70}
            />
        </div>
    }

    return (
        <>
            {isLoggedIn && pathname !== "/404" && <HeaderMenu/>}
            <section className={s.pagesContainer}>
                <Switch>
                    <Route exact path={"/"} render={() => <PacksList/>}/>
                    <Route exact path={"/cardslist/:packId"} render={() => <CardsList/>}/>
                    <Route exact path={"/learnCard/:questionId"} render={() => <LearnElement/>}/>
                    <Route path={"/profile"} render={() => <Profile/>}/>
                    <Route path={"/editProfile"} render={() => <PersonalInfo/>}/>
                    <Route path={"/login"} render={() => <Login/>}/>
                    <Route path={"/registration"} render={() => <Registration/>}/>
                    <Route path={"/restorePassword"} render={() => <RestorePassword/>}/>
                    <Route path={"/updatePassword/:token"} render={() => <UpdatePassword/>}/>
                    <Route exact path={"/checkEmail"} render={() => <CheckEmail/>}/>
                    <Route path={"/404"} render={() => <PageNotFound/>}/>
                    <Redirect from={"*"} to={"/404"}/>
                </Switch>
            </section>
            <ErrorSnackbar/>
        </>
    )
}

export default App