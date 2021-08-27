import React from "react"
import {useSelector} from "react-redux"
import {AppRootStateType} from "../../../redux/store"
import defaultAvatar from "../../../assets/images/defaultUserAvatar.png"
import s from "./ProfileAvatarBtn.module.scss"

export const ProfileAvatarBtn = React.memo(() => {

    const {avatar} = useSelector((state: AppRootStateType) => state.appReducer.userData)

    return (
        <div className={s.profileAvatar}>
            {avatar
                ? <div className={s.avatarWrap}>
                    <img className={s.avatar} src={avatar} alt="avatar"/>
                    <button className={s.photoIcon}/>
                </div>
                :
                <div className={s.avatarWrap}>
                    <img className={s.avatar} src={defaultAvatar} alt="avatar"/>
                    <button className={s.photoIcon}/>
                </div>
            }
        </div>
    )
})