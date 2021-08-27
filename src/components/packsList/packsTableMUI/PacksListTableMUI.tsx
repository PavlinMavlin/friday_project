import React, {useCallback, useState} from "react"
import {NavLink} from "react-router-dom"
import {useSelector} from "react-redux"
import {PackResponseType} from "../../../api/api"
import {AppRootStateType} from "../../../redux/store"
import {SortPacksAndCardsOrderType} from "../../../redux/reducers/packsList-reducer"
import {ItemsFilterSpan} from "../../common/itemsFilterSpan/ItemsFilterSpan"
import {ButtonSmall} from "../../common/buttonSmall/ButtonSmall"
import {ModalWindowDelete} from "../../common/modalWindow/modalDelete/ModalWindowDelete"
import {ModalWindowEditPack} from "../../common/modalWindow/modalEdit/ModalWindowEditPack"
import TableRow from "@material-ui/core/TableRow"
import TableContainer from "@material-ui/core/TableContainer"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableBody from "@material-ui/core/TableBody"
import {StyledTableCell, StyledTableRow} from "./PacksListTableMUIStyles"
import s from "./PacksListTableMUI.module.scss"

type PacksListTableMUIPropsType = {
    user_id: string
    packs: Array<PackResponseType>
    setNewSortPacksNameOrder: (sortPacksNameOrder: SortPacksAndCardsOrderType, sortPacksFilter: string) => void
    setNewSortPacksCardsCountOrder: (sortPacksOrder: SortPacksAndCardsOrderType, sortPacksFilter: string) => void
    setNewSortPacksUpdateOrder: (sortPacksOrder: SortPacksAndCardsOrderType, sortPacksFilter: string) => void
    setNewSortPacksCreatedByOrder: (sortPacksOrder: SortPacksAndCardsOrderType, sortPacksFilter: string) => void
    updatePack: (newPackName: string, packId: string) => void
    deletePack: (packId: string) => void
}

export const PacksListTableMUI = React.memo((props: PacksListTableMUIPropsType) => {

    const {sortPacksNameOrder, sortPacksCardsCountOrder, sortPacksUpdateOrder, sortPacksCreatedByOrder} = useSelector((state: AppRootStateType) => state.packsListReducer)

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [id, setId] = useState("")
    const [packName, setPackName] = useState("")

    const onEditNewPackHandler = useCallback((newValue: string) => {
        props.updatePack(newValue, id)
    }, [props, id])

    const onDeletePackHandler = useCallback(() => {
        props.deletePack(id)
        setOpenDeleteModal(false)
    }, [props, id])

    const onRemoveClickHandler = useCallback((id: string, name: string) => {
        setOpenDeleteModal(true)
        setId(id)
        setPackName(name)
    }, [])

    const onUpdatePackHandler = useCallback((packId: string, packName: string) => {
        setOpenEditModal(true)
        setId(packId)
        setPackName(packName)
    }, [])

    const onCancelClickHandler = useCallback(() => {
        setOpenDeleteModal(false)
        setOpenEditModal(false)
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table
                // className={classes.table}
                aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <ItemsFilterSpan
                                title={"Name"}
                                status={sortPacksNameOrder}
                                setSetStatusValue={props.setNewSortPacksNameOrder}
                            />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <ItemsFilterSpan
                                title={"Cards"}
                                status={sortPacksCardsCountOrder}
                                setSetStatusValue={props.setNewSortPacksCardsCountOrder}
                            />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <ItemsFilterSpan
                                title={"Last Updated"}
                                status={sortPacksUpdateOrder}
                                setSetStatusValue={props.setNewSortPacksUpdateOrder}
                            />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <ItemsFilterSpan
                                title={"Created by"}
                                status={sortPacksCreatedByOrder}
                                setSetStatusValue={props.setNewSortPacksCreatedByOrder}
                            />
                        </StyledTableCell>
                        <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {openDeleteModal &&
                    <ModalWindowDelete
                        name={"Pack"}
                        packName={packName}
                        onDeleteButtonClick={onDeletePackHandler}
                        onCloseModalButtonClick={onCancelClickHandler}
                    />}
                    {openEditModal &&
                    <ModalWindowEditPack
                        packName={packName}
                        editNewPack={onEditNewPackHandler}
                        closeModal={onCancelClickHandler}
                    />}
                    {props.packs.map((pack) => (<StyledTableRow key={pack._id}>
                            <StyledTableCell component="th" scope="row">
                                <NavLink to={`/cardsList/${pack._id}`}>{pack.name}</NavLink>
                            </StyledTableCell>
                            <StyledTableCell>{pack.cardsCount}</StyledTableCell>
                            <StyledTableCell>{pack.updated.slice(0, 10)}</StyledTableCell>
                            <StyledTableCell>{pack.user_name}</StyledTableCell>
                            <StyledTableCell>
                                <div className={s.buttonsContainer}>
                                    {props.user_id === pack.user_id
                                        ? <>
                                            <ButtonSmall
                                                text={"delete"}
                                                onClick={() => onRemoveClickHandler(pack._id, pack.name)}
                                                style={{backgroundColor: "#F1453D", color: "#ffffff"}}
                                            />
                                            <ButtonSmall
                                                text={"edit"}
                                                onClick={() => onUpdatePackHandler(pack._id, pack.name)}
                                                style={{backgroundColor: "#D7D8EF", color: "#21268F"}}
                                            />
                                            <NavLink to={`/learnCard/:${pack._id}`}>
                                                <ButtonSmall
                                                    text={"learn"}
                                                    style={{backgroundColor: "#D7D8EF", color: "#21268F"}}
                                                    disabled={pack.cardsCount === 0}
                                                />
                                            </NavLink>
                                        </>
                                        : <>
                                            <NavLink to={`/learnCard/:${pack._id}`}>
                                                <ButtonSmall
                                                    text={"learn"}
                                                    style={{backgroundColor: "#D7D8EF", color: "#21268F"}}
                                                    disabled={pack.cardsCount === 0}
                                                />
                                            </NavLink>
                                        </>
                                    }
                                </div>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
})