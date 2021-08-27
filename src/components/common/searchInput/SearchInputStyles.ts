import {makeStyles, Theme} from "@material-ui/core/styles"
import {alpha, createStyles} from "@material-ui/core"

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
            borderRadius: "2px",
            backgroundColor: "#ECECF9",
            border: "1px solid lightGray",
        },
        search: {
            position: "relative",
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: "100%",

        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: "100%",
            position: "absolute",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: ".5",

        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create("width"),
            width: "100%",
        },
        input: {
            display: "flex",
            fontFamily: "SFUIDisplay, sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "1.6",
            color: "#2D2E46",
            letterSpacing: ".7px",
            borderRadius: "2px",
            opacity: ".5",
        },
        inputRoot: {
            color: "#2D2E46",
            opacity: 1,
        }
    })
)