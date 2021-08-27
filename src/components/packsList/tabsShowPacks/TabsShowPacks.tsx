import React, {useCallback} from "react"
import {useStyles} from "./TabsStylesShowPacks"
import s from "./TabsShowPacks.module.scss"

type TabsShowPacksPropsType = {
    userId: string
    showPacksStatus: boolean
    changeShowMyPacks: (isShowMyPacks: boolean, userId: string) => void
}

export const TabsShowPacks = React.memo((props: TabsShowPacksPropsType) => {

    const classes = useStyles()

    const onAllButtonClickHandler = useCallback(() => {
        props.changeShowMyPacks(false, "")
    }, [props])

    const onMyButtonClickHandler = useCallback(() => {
        props.changeShowMyPacks(true, props.userId)
    }, [props])

    return (
        <div className={s.tabsShowPacks}>
            <h2 className={s.title}>Show packs cards:</h2>
            <div className={classes.root}>
                {!props.showPacksStatus
                    ? <div className={s.tabItemsContainer}>
                        <button onClick={onAllButtonClickHandler} className={`${s.tabItem} ${s.activeTabItem}`}>All</button>
                        <button onClick={onMyButtonClickHandler} className={s.tabItem}>My</button>
                    </div>
                    : <div className={s.tabItemsContainer}>
                        <button onClick={onAllButtonClickHandler} className={s.tabItem}>All</button>
                        <button onClick={onMyButtonClickHandler} className={`${s.tabItem} ${s.activeTabItem}`}>My</button>
                    </div>
                }
            </div>
        </div>
    )
})