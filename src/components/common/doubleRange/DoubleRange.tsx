import React, {useCallback, useState} from "react"
import {Slider} from "@material-ui/core"
import {useStyles} from "./DoubleRangeStyles"
import s from "./DoubleRange.module.scss"

type DoubleRangePropsType = {
    minCardsCount: number
    maxCardsCount: number
    setDoubleRangeValues: (minValue: number, maxValue: number) => void
}

export const DoubleRange = React.memo((props: DoubleRangePropsType) => {

    const classes = useStyles()

    const [value, setValue] = useState<number[]>([0, props.maxCardsCount])

    const onDoubleRangeHandleChange = useCallback((event: any, newValue: number | number[]) => {
        setValue(newValue as number[])
        props.setDoubleRangeValues(value[0], value[1])
    }, [props, value])

    return (
        <div className={s.numberCards}>
            <h2 className={s.title}>Number of cards:</h2>
            <div className={classes.root}>
                <Slider
                    value={value}
                    onChange={onDoubleRangeHandleChange}
                    valueLabelDisplay="on"
                    aria-labelledby="range-slider"
                    min={props.minCardsCount}
                    max={props.maxCardsCount}
                />
            </div>
        </div>
    )
})