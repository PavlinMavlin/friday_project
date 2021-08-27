import {makeStyles, Theme} from "@material-ui/core/styles"
import {createStyles} from "@material-ui/core"

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        '& .MuiInputBase-input': {
            fontFamily: "SFUIDisplay, sans-serif",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "1.5",
            color: "#2D2E46",
        },

        '& .MuiFormLabel-root': {
            fontFamily: "SFUIDisplay, sans-serif",
            fontWeight: 400,
            fontSize: "13px",
            lineHeight: "1.5",
            color: "#24254A",
            opacity: ".5"
        },

        '& .MuiInput-underline:before': {
            height: "1.6px",
            color: "#24254A",
            opacity: ".2"
        },

        '& .MuiInput-underline:after': {
            color: "#21268F",
            opacity: ".2"
        },

        '& .MuiSvgIcon-root': {
            color: "#2D2E46",
        }
    }
}))