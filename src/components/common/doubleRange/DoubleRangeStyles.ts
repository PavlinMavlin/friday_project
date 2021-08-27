import {makeStyles, Theme} from "@material-ui/core/styles"

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        padding: "0 15px",

        '& .MuiSlider-rail': {
            backgroundColor: "#21268F",
            opacity: ".5",
            height: "5px",
            borderRadius: "10px",
        },

        '& .MuiSlider-track': {
            backgroundColor: "#21268F",
            height: "5px",
            borderRadius: "10px",
        },

        '& .MuiSlider-thumb ': {
            backgroundColor: "#ffffff",
            height: "16px",
            width: "16px",
            border: "4px solid #21268F",

            '& span': {
                width: "32px",
                height: "24px",
                transform: "none",
                borderRadius: "3px",
                backgroundColor: "#21268F",
                top: "-22px",

                '& span': {
                    transform: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                },

            },
        },
    }
}))


