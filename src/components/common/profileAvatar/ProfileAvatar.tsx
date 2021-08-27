import React from "react"
import {NavLink} from "react-router-dom"
import {useSelector} from "react-redux"
import {AppRootStateType} from "../../../redux/store"
import {Button} from "../button/Button"
import defaultAvatar from "../../../assets/images/defaultUserAvatar.png"
import s from "./ProfileAvatar.module.scss"

export const ProfileAvatar = React.memo(() => {

    const {name, avatar} = useSelector((state: AppRootStateType) => state.appReducer.userData)

    return (
        <div className={s.profileAvatar}>
            {avatar
            ? <div className={s.avatarWrap}>
                    <img className={s.avatar} src={avatar} alt="avatar"/>
                </div>
            : <div className={s.avatarWrap}>
                    <img className={s.avatar} src={defaultAvatar} alt="avatar"/>
                </div>
            }
            <h2 className={s.name}>{name}</h2>
            <span className={s.career}>Front-end developer</span>
            <div className={s.profileAvatarButtonContainer}>
                <NavLink to={"/editProfile"}>
                    <Button
                        onClick={() => {}}
                        className={s.profileAvatarButton}>
                        Edit profile
                    </Button>
                </NavLink>
            </div>
        </div>
    )
})