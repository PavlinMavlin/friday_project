import React, {useCallback, useEffect, useState} from "react"
import {Redirect} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../redux/store"
import {
    fetchPacksTC,
    setDoubleRangesValuesAC, setNewCurrentPageAC, setNewPageCountAC,
    setSearchPacksValueAC,
    setSortPacksCardsCountOrderAC, setSortPacksCreatedByOrderAC,
    setSortPacksNameOrderAC,
    setSortPacksUpdateOrderAC,
    addNewPackTC, updatePackTC, deletePackTC,
    SortPacksAndCardsOrderType
} from "../../redux/reducers/packsList-reducer"
import {ProfileAvatar} from "../common/profileAvatar/ProfileAvatar"
import {DoubleRange} from "../common/doubleRange/DoubleRange"
import {MainTitle} from "../common/mainTitle/MainTitle"
import {SearchInput} from "../common/searchInput/SearchInput"
import {Button} from "../common/button/Button"
import {PacksListTableMUI} from "../packsList/packsTableMUI/PacksListTableMUI"
import {PaginationTable} from "../common/paginationTable/PaginationTable"
import {ModalWindowAdd} from "../common/modalWindow/modalAdd/ModalWindowAdd";
import {PackResponseType} from "../../api/api"
import s from "./Profile.module.scss"


type ProfilePropsType = {}

export const Profile = React.memo(function (props: ProfilePropsType) {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const user_id = useSelector<AppRootStateType, string>(state => state.appReducer.userData._id)
    const {searchPacksValue, minCardsCount, maxCardsCount, sortPacksNameOrder, sortPacksCardsCountOrder, sortPacksUpdateOrder, sortPacksCreatedByOrder, sortPacksFilter, page, pageCount} = useSelector((state: AppRootStateType) => state.packsListReducer)
    const {minCardsDoubleRangeValue, maxCardsDoubleRangeValue, cardPacksTotalCount} = useSelector((state: AppRootStateType) => state.packsListReducer)
    const packs = useSelector<AppRootStateType, Array<PackResponseType>>((state) => state.packsListReducer.cardPacks)
    const dispatch = useDispatch()

    const [openModal, setOpenModal] = useState(false)
    const pagesCount = Math.ceil(cardPacksTotalCount / pageCount)

    useEffect(() => {
        switch (sortPacksFilter) {
            case "name":
                dispatch(fetchPacksTC(searchPacksValue, minCardsDoubleRangeValue, maxCardsDoubleRangeValue, sortPacksNameOrder, sortPacksFilter, page, pageCount, user_id))
                break
            case "cardsCount":
                dispatch(fetchPacksTC(searchPacksValue, minCardsDoubleRangeValue, maxCardsDoubleRangeValue, sortPacksCardsCountOrder, sortPacksFilter, page, pageCount, user_id))
                break
            case "updated":
                dispatch(fetchPacksTC(searchPacksValue, minCardsDoubleRangeValue, maxCardsDoubleRangeValue, sortPacksUpdateOrder, sortPacksFilter, page, pageCount, user_id))
                break
            case "user_name":
                dispatch(fetchPacksTC(searchPacksValue, minCardsDoubleRangeValue, maxCardsDoubleRangeValue, sortPacksCreatedByOrder, sortPacksFilter, page, pageCount, user_id))
                break
            default: {
                const setTimer = setTimeout(() => {
                    dispatch(fetchPacksTC(searchPacksValue, minCardsDoubleRangeValue, maxCardsDoubleRangeValue, sortPacksUpdateOrder, sortPacksFilter, page, pageCount, user_id))
                }, 300)
                return () => {
                    clearTimeout(setTimer)
                }
            }
        }

    }, [dispatch, searchPacksValue, minCardsDoubleRangeValue, maxCardsDoubleRangeValue, sortPacksNameOrder, sortPacksCardsCountOrder, sortPacksUpdateOrder, sortPacksCreatedByOrder, sortPacksFilter, page, pageCount, user_id])

    const setDoubleRangeValues = useCallback((minCardsDoubleRangeValue: number, maxCardsDoubleRangeValue: number) => {
        dispatch(setDoubleRangesValuesAC(minCardsDoubleRangeValue, maxCardsDoubleRangeValue))
    }, [dispatch])

    const setSearchValue = useCallback((newSearchPacksValue: string) => {
        dispatch(setSearchPacksValueAC(newSearchPacksValue))
    }, [dispatch])

    const setNewSortPacksNameOrder = useCallback((sortPacksOrder: SortPacksAndCardsOrderType, sortPacksFilter: string) => {
        dispatch(setSortPacksNameOrderAC(sortPacksOrder, sortPacksFilter))
    }, [dispatch])

    const setNewSortPacksCardsCountOrder = useCallback((sortPacksOrder: SortPacksAndCardsOrderType, sortPacksFilter: string) => {
        dispatch(setSortPacksCardsCountOrderAC(sortPacksOrder, sortPacksFilter))
    }, [dispatch])

    const setNewSortPacksUpdateOrder = useCallback((sortPacksOrder: SortPacksAndCardsOrderType, sortPacksFilter: string) => {
        dispatch(setSortPacksUpdateOrderAC(sortPacksOrder, sortPacksFilter))
    }, [dispatch])

    const setNewSortPacksCreatedByOrder = useCallback((sortPacksOrder: SortPacksAndCardsOrderType, sortPacksFilter: string) => {
        dispatch(setSortPacksCreatedByOrderAC(sortPacksOrder, sortPacksFilter))
    }, [dispatch])

    const addNewPack = useCallback((packName: string) => {
        dispatch(addNewPackTC(packName, searchPacksValue, minCardsCount, maxCardsCount, sortPacksUpdateOrder, sortPacksFilter, page, pageCount, user_id))
    }, [dispatch, searchPacksValue, minCardsCount, maxCardsCount, sortPacksUpdateOrder, sortPacksFilter, page, pageCount, user_id])

    const updatePack = useCallback((newPackName: string, packId: string) => {
        dispatch(updatePackTC(newPackName, packId, searchPacksValue, minCardsCount, maxCardsCount, sortPacksUpdateOrder, sortPacksFilter, page, pageCount, user_id))
    }, [dispatch, searchPacksValue, minCardsCount, maxCardsCount, sortPacksUpdateOrder, sortPacksFilter, page, pageCount, user_id])

    const deletePack = useCallback((packId: string) => {
        dispatch(deletePackTC(packId, searchPacksValue, minCardsCount, maxCardsCount, sortPacksUpdateOrder, sortPacksFilter, page, pageCount, user_id))
    }, [dispatch, searchPacksValue, minCardsCount, maxCardsCount, sortPacksUpdateOrder, sortPacksFilter, page, pageCount, user_id])

    const setNewCurrentPage = useCallback((newCurrentPage: number) => {
        dispatch(setNewCurrentPageAC(newCurrentPage))
    }, [dispatch])

    const setNewPageCount = useCallback((newPageCount: number) => {
        dispatch(setNewPageCountAC(newPageCount))
    }, [dispatch])

    const onCloseModalHandler = useCallback(() => {
        setOpenModal(false)
    }, [])

    const onAddNewClickPackHandler = useCallback((newValue: string) => {
        addNewPack(newValue)
        setOpenModal(false)
    }, [addNewPack])

    if (!isLoggedIn) {
        return <Redirect to={"/login"}/>
    }

    return (
        <div className={s.packsList}>
            <div className={s.container}>
                <div className={s.inner}>
                    <div className={s.aside}>
                        <ProfileAvatar/>
                        <div className={s.rangeWrap}>
                            <DoubleRange
                                minCardsCount={minCardsCount}
                                maxCardsCount={maxCardsCount}
                                setDoubleRangeValues={setDoubleRangeValues}
                            />
                        </div>
                    </div>
                    <div className={s.content}>
                        <MainTitle title={"Packs list"} textStyle={s.tableTitle}/>
                        <div className={s.topWrap}>
                            <SearchInput onKeyPressEnter={setSearchValue}/>
                            <Button
                                onClick={() => setOpenModal(true)}
                                className={s.button}>
                                Add new pack
                            </Button>
                        </div>
                        <PacksListTableMUI
                            user_id={user_id}
                            packs={packs}
                            setNewSortPacksNameOrder={setNewSortPacksNameOrder}
                            setNewSortPacksCardsCountOrder={setNewSortPacksCardsCountOrder}
                            setNewSortPacksUpdateOrder={setNewSortPacksUpdateOrder}
                            setNewSortPacksCreatedByOrder={setNewSortPacksCreatedByOrder}
                            updatePack={updatePack}
                            deletePack={deletePack}
                        />
                        {openModal
                        && <ModalWindowAdd
                            addNewPack={onAddNewClickPackHandler}
                            closeModal={onCloseModalHandler}
                        />}
                        <PaginationTable
                            currentPage={page}
                            pagesCount={pagesCount}
                            itemsPerPageCount={pageCount}
                            setNewCurrentPage={setNewCurrentPage}
                            setNewPageCount={setNewPageCount}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
})