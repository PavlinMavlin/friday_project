import {createStyles, Theme, withStyles} from "@material-ui/core/styles"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"

export const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: "#ECECF9;",
            color: "#2D2E46",
            fontFamily: "SFUIDisplay, sans-serif",
            fontWeight: 600,
            lineHeight: "1.05",
            fontSize: 13,
            textAlign: "left",
            padding: "10px",

            '& span': {
                cursor: "pointer",
            },
        },
        body: {
            fontSize: 13,
            padding: "10px",
        },
    })
)(TableCell)

export const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '& a': {
                color: "#2D2E46",
            },
            '& .MuiTable-root': {
                boxShadow: "0px 4px 14px rgba(45, 46, 70, 0.15",
                color: "#2D2E46",
                fontFamily: "SFUIDisplay, sans-serif",
                fontWeight: 400,
                lineHeight: "1.1",
            },
            '&:nth-of-type(even)': {
                backgroundColor: "#F8F7FD",
            },
            '& .MuiTableCell-root': {
                padding: "10px",
            },
        },
    })
)(TableRow)