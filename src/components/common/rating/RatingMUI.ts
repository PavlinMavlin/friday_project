import {makeStyles, Theme} from "@material-ui/core/styles"

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#ffffff",
        color: "#21268F",
        fontSize: "12px",

        '& span ': {
            padding: "1px",
        },
    }
}))