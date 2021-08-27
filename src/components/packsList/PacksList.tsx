import React, {useCallback, useEffect, useState} from "react"
import {Redirect} from "react-router-dom"
import {PackResponseType} from "../../api/api"
import {AppRootStateType} from "../../redux/store"
import {useDispatch, useSelector} from "react-redux"
import {
    fetchPacksTC,
    changeShowAllOrMyPacksAC,
    addNewPackTC,
    updatePackTC,
    deletePackTC,
    setDoubleRangesValuesAC,
    setNewCurrentPageAC,
    setNewPageCountAC,
    setSearchPacksValueAC,
    setSortPacksCardsCountOrderAC,
    setSortPacksCreatedByOrderAC,
    setSortPacksNameOrderAC,
    setSortPacksUpdateOrderAC,
    SortPacksAndCardsOrderType
} from "../../redux/reducers/packsList-reducer"
import {MainTitle} from "../common/mainTitle/MainTitle"
import {TabsShowPacks} from "./tabsShowPacks/TabsShowPacks"
import {SearchInput} from "../common/searchInput/SearchInput"
import {DoubleRange} from "../common/doubleRange/DoubleRange"
import {PacksListTableMUI} from "./packsTableMUI/PacksListTableMUI"
import {PaginationTable} from "../common/paginationTable/PaginationTable"
import {ModalWindowAdd} from "../common/modalWindow/modalAdd/ModalWindowAdd"
import {Button} from "../common/button/Button"
import s from "./PacksList.module.scss"

export const PacksList = React.memo(() => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const user_id = useSelector<AppRootStateType, string>(state => state.appReducer.userData._id)
    const userId = useSelector<AppRootStateType, string>(state => state.packsListReducer.user_id)
    const {searchPacksValue, minCardsCount, maxCardsCount, sortPacksNameOrder, sortPacksCardsCountOrder, sortPacksUpdateOrder, sortPacksCreatedByOrder, sortPacksFilter, page, pageCount} = useSelector((state: AppRootStateType) => state.packsListReducer)
    const {isShowMyPacks, minCardsDoubleRangeValue, maxCardsDoubleRangeValue, cardPacksTotalCount} = useSelector((state: AppRootStateType) => state.packsListReducer)
    const packs = useSelector<AppRootStateType, Array<PackResponseType>>((state) => state.packsListReducer.cardPacks)
    const dispatch = useDispatch()

    const [openModal, setOpenModal] = useState(false)
    const pagesCount = Math.ceil(cardPacksTotalCount / pageCount)

    useEffect(() => {
        switch (sortPacksFilter) {
            case "name":
                dispatch(fetchPacksTC(searchPacksValue, minCardsDoubleRangeValue, maxCardsDoubleRangeValue, sortPacksNameOrder, sortPacksFilter, page, pageCount, userId))
                break
            case "cardsCount":
                dispatch(fetchPacksTC(searchPacksValue, minCardsDoubleRangeValue, maxCardsDoubleRangeValue, sortPacksCardsCountOrder, sortPacksFilter, page, pageCount, userId))
                break
            case "updated":
                dispatch(fetchPacksTC(searchPacksValue, minCardsDoubleRangeValue, maxCardsDoubleRangeValue, sortPacksUpdateOrder, sortPacksFilter, page, pageCount, userId))
                break
            case "user_name":
                dispatch(fetchPacksTC(searchPacksValue, minCardsDoubleRangeValue, maxCardsDoubleRangeValue, sortPacksCreatedByOrder, sortPacksFilter, page, pageCount, userId))
                break
            default: {
                const setTimer = setTimeout(() => {
                    dispatch(fetchPacksTC(searchPacksValue, minCardsDoubleRangeValue, maxCardsDoubleRangeValue, sortPacksUpdateOrder, sortPacksFilter, page, pageCount, userId))
                }, 300)
                return () => {
                    clearTimeout(setTimer)
                }
            }
        }

    }, [dispatch, searchPacksValue, minCardsDoubleRangeValue, maxCardsDoubleRangeValue, sortPacksNameOrder, sortPacksCardsCountOrder, sortPacksUpdateOrder, sortPacksCreatedByOrder, sortPacksFilter, page, pageCount, userId])

    const changeShowAllOrMyPacks = useCallback((isShowMyPacks: boolean, userId: string) => {
        dispatch(changeShowAllOrMyPacksAC(isShowMyPacks, userId))
    }, [dispatch])

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

    const onAddNewPack = useCallback((newValue: string) => {
        addNewPack(newValue)
        setOpenModal(false)
    }, [addNewPack])

    const onCloseModalHandler = useCallback(() => {
        setOpenModal(false)
    }, [])

    if (!isLoggedIn) {
        return <Redirect to={"/login"}/>
    }

    return (
        <div className={s.packsList}>
            <div className={s.container}>
                <div className={s.inner}>
                    <div className={s.aside}>
                        <TabsShowPacks
                            userId={user_id}
                            showPacksStatus={isShowMyPacks}
                            changeShowMyPacks={changeShowAllOrMyPacks}
                        />
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
                        {packs.length === 0
                            ? <div className={s.empty}>
                                <span>Packs list is empty.</span>
                            </div>
                            : <>
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
                                <PaginationTable
                                    currentPage={page}
                                    pagesCount={pagesCount}
                                    itemsPerPageCount={pageCount}
                                    setNewCurrentPage={setNewCurrentPage}
                                    setNewPageCount={setNewPageCount}
                                />
                            </>}
                        {openModal &&
                        <ModalWindowAdd
                            addNewPack={onAddNewPack}
                            closeModal={onCloseModalHandler}
                        />}
                    </div>
                </div>
            </div>
        </div>
    )
})