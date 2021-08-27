import {ThunkAction} from "redux-thunk"
import {learnPackAPI} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {setAppStatusAC} from "./app-reducer"

enum LEARN_PACK_ACTIONS_TYPES {
    TEMPLATE_ACTION_TYPE = "TEMPLATE_ACTION_TYPE"
}

const initialState: InitialStateType = {}

type InitialStateType = {}

export const learnPackReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case LEARN_PACK_ACTIONS_TYPES.TEMPLATE_ACTION_TYPE:
            return state
        default:
            return state
    }
}

// actions
export const templateAC = () => {
    return {type: LEARN_PACK_ACTIONS_TYPES.TEMPLATE_ACTION_TYPE} as const
}

// thunks
export const gradeCardTC = (card_id: string, grade: number): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    async (dispatch, getState) => {
        try {
            dispatch(setAppStatusAC("loading"))
            const res = await learnPackAPI.gradeCard(card_id, grade)
            dispatch(setAppStatusAC("succeeded"))
        } catch (e) {
            const error = e.response ? e.response.data.error : (`Delete card failed: ${e.message}.`)
            console.log(error)
            dispatch(setAppStatusAC("failed"))
        } finally {
            // some code...
        }
    }

// types
export type LearnPackReducerActionsType = ReturnType<typeof templateAC>