import {makeStyles, Theme} from "@material-ui/core/styles"

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        '& .MuiTabs-root': {
            backgroundColor: "#ffffff;",
            color: "#2D2E46",
            width: "196px",
            minHeight: "36px",
            height: "36px",
        },
        '& .MuiTab-root': {
            width: "98px",
            height: "36px",
            minHeight: "36px",

            "@media (min-width: 600px)": {
                minWidth: "98px",
            }
        },
        '& .MuiTab-textColorInherit': {
            backgroundColor: "#ffffff;",
            color: "#2D2E46",
        },
        '& .MuiTab-textColorInherit.Mui-selected': {
            backgroundColor: "#9A91C8;",
            color: "#ffffff",
        },
        '& .MuiTabs-indicator': {
            backgroundColor: "transparent",
        },
        '& .MuiTab-wrapper': {
            textTransform: "none",
            fontFamily: "SFUIDisplay, sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "1.05",
            letterSpacing: ".4px",
        },
    }
}))