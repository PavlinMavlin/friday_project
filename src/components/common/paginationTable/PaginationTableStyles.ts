import {createStyles, makeStyles} from "@material-ui/core/styles"

export const useStyles = makeStyles((theme) =>
        createStyles({
            root: {
                '& > * + *': {
                    marginTop: theme.spacing(2),
                },

                '& .MuiTypography-body1': {
                    display: "none",
                },

                '& .MuiPaginationItem-page.Mui-selected': {
                    color: "#F2F5F7",
                    backgroundColor: "#21268F;",
                    borderRadius: "2px",
                    opacity: "1",
                },

                '& .MuiPagination-root': {
                    marginTop: "20px",
                },

                '& .MuiPaginationItem-sizeSmall': {
                    margin: "0 5px",
                },

                "@media (max-width: 359.8px)": {
                    '& .MuiPagination-ul li:nth-child(3)': {
                        display: "none",
                    },

                    '& .MuiPagination-ul li:nth-child(4)': {
                        display: "none",
                    },

                    '& .MuiPagination-ul li:nth-child(5)': {
                        display: "none",
                    }
                },
            }
        })
)