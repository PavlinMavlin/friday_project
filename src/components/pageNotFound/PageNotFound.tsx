import React from "react"
import {NavLink} from "react-router-dom"
import search from "../../assets/images/search.svg"
import s from "./PageNotFound.module.scss"

export const PageNotFound = React.memo(() => {
    return (
        <div className={s.pageNotFoundBlock}>
            <h1 className={s.number}> 404</h1>
            <h2 className={s.error}>Page Not Found!</h2>
            <div className={s.wrapIcon}>
                <img className={s.search} src={search} alt="icon"/>
            </div>
            <p className={s.text}>MOST LIKELY THE PAGE <br/>YOU ARE LOOKING FOR THERE</p>
            <NavLink to="/" className={s.linkHome}>Back to home</NavLink>
        </div>
    )
})

