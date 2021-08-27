import {makeStyles} from "@material-ui/core"

export const useStyles = makeStyles({
    root: {
        '&:hover': {
            backgroundColor: "transparent"
        },
        '& .MuiTypography-body1': {
            fontFamily: "SFUIDisplay, sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "1.2",
            color: "#2D2E46"
        },
        '& .MuiIconButton-label': {
            color: "#2D2E46"
        }
    }
})