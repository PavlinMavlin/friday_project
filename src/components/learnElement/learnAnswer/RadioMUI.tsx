import React from "react"
import {Radio, RadioProps} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import classnames from "classnames"

export const useStyles = makeStyles({
    root: {
        padding: "10px",
        '&:hover': {
            backgroundColor: "transparent",
        },
    },
    icon: {
        borderRadius: "50%",
        width: 16,
        height: 16,
        boxShadow: "inset 0 0 0 1px rgba(33, 38, 143, .35), inset 0 -1px 0 rgba(255, 255, 255, .3)",
        backgroundColor: '#F9F9FE',
        backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
        '$root.Mui-focusVisible &': {
            // outline: "2px auto rgba(19,124,189,.6)",
            // outlineOffset: 1,
        },
        'input:hover ~ &': {
            // backgroundColor: "#ECECF9",
        },
    },
    checkedIcon: {
        backgroundColor: "#21268F",
        backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
        '&:before': {
            display: "block",
            width: 19,
            height: 19,
            backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
            content: "''",
            position: "absolute",
            top: "9px",
            right: "11px",
        },
        'input:hover ~ &': {
            // backgroundColor: "#21268F",
        },
    },
})

export const RadioMUI = React.memo((props: RadioProps) => {

    const classes = useStyles()

    return (
        <Radio
            checkedIcon={<span className={classnames(classes.icon, classes.checkedIcon)}/>}
            icon={<span className={classes.icon}/>}
            {...props}
            className={classes.root}
        />
    )
})