import React from "react"
import Rating from "@material-ui/lab/Rating"
import {RatingProps} from "@material-ui/lab/Rating/Rating"
import {useStyles} from "./RatingMUI"

export const RatingMUI = React.memo((props: RatingProps) => {

    const classes = useStyles()

    return (
        <div>
            <Rating  {...props} readOnly className={classes.root}/>
        </div>
    )
})



