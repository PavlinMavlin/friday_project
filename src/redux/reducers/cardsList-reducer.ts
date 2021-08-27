import {ThunkAction} from "redux-thunk"
import {cardsAPI, CardType, GetCardsResponseType} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {setAppErrorAC, setAppStatusAC} from "./app-reducer"
import {SortPacksAndCardsOrderType} from "./packsList-reducer"

enum CARDS_LIST_ACTIONS_TYPES {
    SET_CARDS = "SET-CARDS",
    SET_CARD_TOTAL_COUNT = "SET_CARD_TOTAL_COUNT",
    SET_CARDS_NEW_CURRENT_PAGE = "SET_CARDS_NEW_CURRENT_PAGE",
    SET_CARDS_NEW_PAGE_COUNT = "SET_CARDS_NEW_PAGE_COUNT",
    SET_SEARCH_CARDS_VALUE = "SET_SEARCH_CARDS_VALUE",
    SET_SORT_QUESTION_CARDS = "SET_SORT_QUESTION_CARDS",
    SET_SORT_ANSWER_CARDS = "SET_SORT_ANSWER_CARDS",
    SET_SORT_UPDATE_CARDS = "SET_SORT_UPDATE_CARDS",
    SET_SORT_GRADE_CARDS = "SET_SORT_GRADE_CARDS"
}

const initialState = {
    cards: [] as Array<CardType>,
    cardsTotalCount: 0,
    pageCount: 10,
    page: 1,
    maxGrade: 0,
    minGrade: 0,
    packUserId: "",
    token: "",
    tokenDeathTime: 0,
    searchCardsValue: "",

    sortCardsQuestionOrder: "default" as SortPacksAndCardsOrderType,
    sortCardsAnswerOrder: "default" as SortPacksAndCardsOrderType,
    sortCardsUpdateOrder: 0 as SortPacksAndCardsOrderType,
    sortCardsGradeOrder: "default" as SortPacksAndCardsOrderType,
    sortCardsFilter: ""
}

type InitialStateType = typeof initialState

export const cardsListReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case CARDS_LIST_ACTIONS_TYPES.SET_CARDS:
            return {...state, ...action.cardsState}
        case CARDS_LIST_ACTIONS_TYPES.SET_CARD_TOTAL_COUNT:
            return {...state, cardsTotalCount: action.cardsTotalCount}
        case CARDS_LIST_ACTIONS_TYPES.SET_CARDS_NEW_CURRENT_PAGE:
            return {...state, page: action.newCurrentPage}
        case CARDS_LIST_ACTIONS_TYPES.SET_CARDS_NEW_PAGE_COUNT:
            return {...state, pageCount: action.newPageCount}
        case CARDS_LIST_ACTIONS_TYPES.SET_SEARCH_CARDS_VALUE:
            return {...state, searchCardsValue: action.searchCardsValue}
        case CARDS_LIST_ACTIONS_TYPES.SET_SORT_QUESTION_CARDS:
            return {
                ...state,
                sortCardsQuestionOrder: action.sortCardsQuestionOrder,
                sortCardsAnswerOrder: "default",
                sortCardsUpdateOrder: "default",
                sortCardsGradeOrder: "default",
                sortCardsFilter: action.sortCardsFilter
            }
        case CARDS_LIST_ACTIONS_TYPES.SET_SORT_ANSWER_CARDS:
            return {
                ...state,
                sortCardsQuestionOrder: "default",
                sortCardsAnswerOrder: action.sortCardsAnswerOrder,
                sortCardsUpdateOrder: "default",
                sortCardsGradeOrder: "default",
                sortCardsFilter: action.sortCardsFilter
            }
        case CARDS_LIST_ACTIONS_TYPES.SET_SORT_UPDATE_CARDS:
            return {
                ...state,
                sortCardsQuestionOrder: "default",
                sortCardsAnswerOrder: "default",
                sortCardsUpdateOrder: action.sortCardsUpdateOrder,
                sortCardsGradeOrder: "default",
                sortCardsFilter: action.sortCardsFilter
            }
        case CARDS_LIST_ACTIONS_TYPES.SET_SORT_GRADE_CARDS:
            return {
                ...state,
                sortCardsQuestionOrder: "default",
                sortCardsAnswerOrder: "default",
                sortCardsUpdateOrder: "default",
                sortCardsGradeOrder: action.sortCardsGradeOrder,
                sortCardsFilter: action.sortCardsFilter
            }
        default:
            return state
    }
}

// actions
export const setCardsAC = (cardsState: GetCardsResponseType) => (
    {type: CARDS_LIST_ACTIONS_TYPES.SET_CARDS, cardsState} as const)

export const setCardTotalCountAC = (cardsTotalCount: number) => (
    {type: CARDS_LIST_ACTIONS_TYPES.SET_CARD_TOTAL_COUNT, cardsTotalCount} as const)

export const setCardsNewCurrentPageAC = (newCurrentPage: number) => (
    {type: CARDS_LIST_ACTIONS_TYPES.SET_CARDS_NEW_CURRENT_PAGE, newCurrentPage} as const)

export const setCardsNewCardsPageCountAC = (newPageCount: number) => (
    {type: CARDS_LIST_ACTIONS_TYPES.SET_CARDS_NEW_PAGE_COUNT, newPageCount} as const)

export const setSearchCardsValueAC = (searchCardsValue: string) => (
    {type: CARDS_LIST_ACTIONS_TYPES.SET_SEARCH_CARDS_VALUE, searchCardsValue} as const)

export const setSortQuestionCardsAC = (sortCardsQuestionOrder: SortPacksAndCardsOrderType, sortCardsFilter: string) => (
    {type: CARDS_LIST_ACTIONS_TYPES.SET_SORT_QUESTION_CARDS, sortCardsQuestionOrder, sortCardsFilter} as const)

export const setSortAnswerCardsAC = (sortCardsAnswerOrder: SortPacksAndCardsOrderType, sortCardsFilter: string) => (
    {type: CARDS_LIST_ACTIONS_TYPES.SET_SORT_ANSWER_CARDS, sortCardsAnswerOrder, sortCardsFilter} as const)

export const setSortUpdateCardsAC = (sortCardsUpdateOrder: SortPacksAndCardsOrderType, sortCardsFilter: string) => (
    {type: CARDS_LIST_ACTIONS_TYPES.SET_SORT_UPDATE_CARDS, sortCardsUpdateOrder, sortCardsFilter} as const)

export const setSortGradeCardsAC = (sortCardsGradeOrder: SortPacksAndCardsOrderType, sortCardsFilter: string) => (
    {type: CARDS_LIST_ACTIONS_TYPES.SET_SORT_GRADE_CARDS, sortCardsGradeOrder, sortCardsFilter} as const)

// thunks
export const getCardsTC = (packId: string, page?: number, pageCount?: number, searchCardsValue?: string, sortCardsOrder?: SortPacksAndCardsOrderType, sortCardsFilter?: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    async (dispatch) => {
        try {
            const res = await cardsAPI.getCards(packId, page, pageCount, searchCardsValue, sortCardsOrder, sortCardsFilter)
            dispatch(setCardsAC(res.data))
            dispatch(setCardTotalCountAC(res.data.cardsTotalCount))
        } catch (e) {
            const error = e.response ? e.response.data.error : (`Get cards failed: ${e.message}.`)
            console.log(error)
        } finally {
            // some code...
        }
    }

export const addCardTC = (packId: string, cardQuestion: string, cardAnswer: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    async (dispatch, getState) => {
        try {
            dispatch(setAppStatusAC("loading"))
            const {page, pageCount, searchCardsValue, sortCardsUpdateOrder, sortCardsFilter} = getState().cardsListReducer
            const res = await cardsAPI.addCard(packId, cardQuestion, cardAnswer)
            dispatch(getCardsTC(packId, page, pageCount, searchCardsValue, sortCardsUpdateOrder, sortCardsFilter))
            dispatch(setAppStatusAC("succeeded"))
        } catch (e) {
            const error = e.response ? e.response.data.error : (`Add card failed: ${e.message}.`)
            console.log(error)
            dispatch(setAppStatusAC("failed"))
            dispatch(setAppErrorAC(error))
        } finally {
            // some code...
        }
    }

export const updateCardTC = (packId: string, cardId: string, newCardQuestion: string, newCardAnswer: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    async (dispatch, getState) => {
        try {
            dispatch(setAppStatusAC("loading"))
            const {page, pageCount, searchCardsValue, sortCardsUpdateOrder, sortCardsFilter} = getState().cardsListReducer
            const rest = await cardsAPI.updateCard(cardId, newCardQuestion, newCardAnswer)
            dispatch(getCardsTC(packId, page, pageCount, searchCardsValue, sortCardsUpdateOrder, sortCardsFilter))
            dispatch(setAppStatusAC("succeeded"))
        } catch (e) {
            const error = e.response ? e.response.data.error : (`Update card failed: ${e.message}.`)
            console.log(error)
            dispatch(setAppErrorAC(error))
            dispatch(setAppStatusAC("failed"))
        } finally {
            // some code...
        }
    }

export const deleteCardTC = (packId: string, cardId: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    async (dispatch, getState) => {
        try {
            dispatch(setAppStatusAC("loading"))
            const {page, pageCount, searchCardsValue, sortCardsUpdateOrder, sortCardsFilter} = getState().cardsListReducer
            const res = await cardsAPI.deleteCard(cardId)
            dispatch(getCardsTC(packId, page, pageCount, searchCardsValue, sortCardsUpdateOrder, sortCardsFilter))
            dispatch(setAppStatusAC("succeeded"))
        } catch (e) {
            const error = e.response ? e.response.data.error : (`Delete card failed: ${e.message}.`)
            console.log(error)
            dispatch(setAppErrorAC(error))
            dispatch(setAppStatusAC("failed"))
        } finally {
            // some code...
        }
    }

// types
export type CardsListReducerActionsType = ReturnType<typeof setCardsAC>
    | ReturnType<typeof setCardTotalCountAC>
    | ReturnType<typeof setCardsNewCardsPageCountAC>
    | ReturnType<typeof setCardsNewCurrentPageAC>
    | ReturnType<typeof setSearchCardsValueAC>
    | ReturnType<typeof setSortQuestionCardsAC>
    | ReturnType<typeof setSortAnswerCardsAC>
    | ReturnType<typeof setSortUpdateCardsAC>
    | ReturnType<typeof setSortGradeCardsAC>