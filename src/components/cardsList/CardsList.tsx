import React, {useCallback, useEffect, useState} from "react"
import {Redirect, useHistory, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../redux/store"
import {
    addCardTC,
    deleteCardTC,
    getCardsTC,
    setCardsNewCardsPageCountAC,
    setCardsNewCurrentPageAC,
    setSearchCardsValueAC,
    setSortAnswerCardsAC,
    setSortGradeCardsAC,
    setSortQuestionCardsAC,
    setSortUpdateCardsAC,
    updateCardTC
} from "../../redux/reducers/cardsList-reducer"
import {SortPacksAndCardsOrderType} from "../../redux/reducers/packsList-reducer"
import {CardsListTableMUI} from "./cardsTableMUI/CardsListTableMUI"
import {MainTitle} from "../common/mainTitle/MainTitle"
import {SearchInput} from "../common/searchInput/SearchInput"
import {Button} from "../common/button/Button"
import {PaginationTable} from "../common/paginationTable/PaginationTable"
import {ModalWindowCardInfo} from "../common/modalWindow/modalCardInfo/ModalWindowCardInfo"
import s from "./CardsList.module.scss"

export const CardsList = React.memo(() => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const user_id = useSelector<AppRootStateType, string>(state => state.appReducer.userData._id)
    const packUserId = useSelector<AppRootStateType, string>(state => state.cardsListReducer.packUserId)
    const {
        cards, cardsTotalCount,
        searchCardsValue,
        sortCardsQuestionOrder, sortCardsAnswerOrder, sortCardsUpdateOrder, sortCardsGradeOrder, sortCardsFilter,
        pageCount, page
    } = useSelector((state: AppRootStateType) => state.cardsListReducer)
    const dispatch = useDispatch()

    const [openNewCardModal, setOpenNewCardModal] = useState(false)
    const pagesCount = Math.ceil(cardsTotalCount / pageCount)

    const {packId} = useParams<{ packId: string }>()
    const history = useHistory()

    useEffect(() => {
        switch (sortCardsFilter) {
            case "question":
                dispatch(getCardsTC(packId, page, pageCount, searchCardsValue, sortCardsQuestionOrder, sortCardsFilter))
                break
            case "answer":
                dispatch(getCardsTC(packId, page, pageCount, searchCardsValue, sortCardsAnswerOrder, sortCardsFilter))
                break
            case "updated":
                dispatch(getCardsTC(packId, page, pageCount, searchCardsValue, sortCardsUpdateOrder, sortCardsFilter))
                break
            case "grade":
                dispatch(getCardsTC(packId, page, pageCount, searchCardsValue, sortCardsGradeOrder, sortCardsFilter))
                break
            default:
                dispatch(getCardsTC(packId, page, pageCount, searchCardsValue, sortCardsUpdateOrder, sortCardsFilter))
        }
    }, [dispatch, packId, page, pageCount, searchCardsValue, sortCardsQuestionOrder, sortCardsUpdateOrder, sortCardsFilter, sortCardsGradeOrder, sortCardsAnswerOrder])

    const RedirectToPacksListHandler = () => {
        history.push("/")
    }

    const setCardsSearchValue = useCallback((newSearchCardsValue: string) => {
        dispatch(setSearchCardsValueAC(newSearchCardsValue))
    }, [dispatch])

    const setNewSortQuestionOrder = useCallback((sortCardsQuestionOrder: SortPacksAndCardsOrderType, sortCardsFilter: string) => {
        dispatch(setSortQuestionCardsAC(sortCardsQuestionOrder, sortCardsFilter))
    }, [dispatch])

    const setNewSortAnswerOrder = useCallback((sortCardsAnswerOrder: SortPacksAndCardsOrderType, sortCardsFilter: string) => {
        dispatch(setSortAnswerCardsAC(sortCardsAnswerOrder, sortCardsFilter))
    }, [dispatch])

    const setNewSortUpdateOrder = useCallback((sortCardsOrder: SortPacksAndCardsOrderType, sortCardsFilter: string) => {
        dispatch(setSortUpdateCardsAC(sortCardsOrder, sortCardsFilter))
    }, [dispatch])

    const setNewSortGradeOrder = useCallback((sortCardsGradeOrder: SortPacksAndCardsOrderType, sortCardsFilter: string) => {
        dispatch(setSortGradeCardsAC(sortCardsGradeOrder, sortCardsFilter))
    }, [dispatch])

    const addNewCard = useCallback((cardQuestion: string, cardAnswer: string) => {
        dispatch(addCardTC(packId, cardQuestion, cardAnswer))
    }, [dispatch, packId])

    const updateCard = useCallback((cardId: string, newCardQuestion: string, newCardAnswer: string) => {
        dispatch(updateCardTC(packId, cardId, newCardQuestion, newCardAnswer))
    }, [dispatch, packId])

    const deleteCard = useCallback((cardId: string) => {
        dispatch(deleteCardTC(packId, cardId))
    }, [dispatch, packId])

    const setCardsNewCurrentPage = useCallback((newCurrentPage: number) => {
        dispatch(setCardsNewCurrentPageAC(newCurrentPage))
    }, [dispatch])

    const setCardsNewPageCount = useCallback((newPageCount: number) => {
        dispatch(setCardsNewCardsPageCountAC(newPageCount))
    }, [dispatch])

    const onAddNewHandler = useCallback((question: string, answer: string) => {
        addNewCard(question, answer)
        setOpenNewCardModal(false)
    }, [addNewCard])

    const onOpenModalHandler = useCallback(() => {
        setOpenNewCardModal(true)
    }, [])

    const onCloseModalHandler = useCallback(() => {
        setOpenNewCardModal(false)
    }, [])

    if (!isLoggedIn) {
        return <Redirect to={"/login"}/>
    }

    return (
        <div className={s.cardsList}>
            <div className={s.container}>
                <div className={s.inner}>
                    <div className={s.topWrap}>
                        <button onClick={RedirectToPacksListHandler} className={s.btn}/>
                        <MainTitle title={"Pack Name"} textStyle={s.tableTitle}/>
                    </div>
                    <div className={s.searchWrap}>
                        <SearchInput onKeyPressEnter={setCardsSearchValue}/>
                        {packUserId === user_id
                        && <Button
                            onClick={() => onOpenModalHandler()}
                            className={s.button}>
                            Add new card
                        </Button>}
                    </div>
                    {cards.length === 0
                        ? <span className={s.empty}>This pack is empty. Click add new card to fill this pack.</span>
                        : <>
                            <CardsListTableMUI
                                user_id={user_id}
                                tableState={cards}
                                setNewSortQuestionOrder={setNewSortQuestionOrder}
                                setNewSortAnswerOrder={setNewSortAnswerOrder}
                                setNewSortUpdateOrder={setNewSortUpdateOrder}
                                setNewSortGradeOrder={setNewSortGradeOrder}
                                updateCard={updateCard}
                                deleteCard={deleteCard}
                            />
                            <PaginationTable
                                currentPage={page}
                                pagesCount={pagesCount}
                                itemsPerPageCount={pageCount}
                                setNewCurrentPage={setCardsNewCurrentPage}
                                setNewPageCount={setCardsNewPageCount}
                            />
                        </>}
                    {openNewCardModal
                    && <ModalWindowCardInfo
                        name={"Add new card"}
                        editCard={onAddNewHandler}
                        closeModal={onCloseModalHandler}
                    />}
                </div>
            </div>
        </div>
    )
})