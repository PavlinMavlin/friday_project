import {ThunkAction} from "redux-thunk"
import {authAPI} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {setAppStatusAC} from "./app-reducer"

enum UPDATE_PASSWORD_ACTIONS_TYPES {
    IS_SUCCESS = "IS_SUCCESS"
}

type InitialStateType = {
    isSuccess: boolean
}

const initialState: InitialStateType = {
    isSuccess: false
}

export const updatePasswordReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case UPDATE_PASSWORD_ACTIONS_TYPES.IS_SUCCESS:
            return {...state, isSuccess: action.isSuccess}
        default:
            return state
    }
}

// actions
export const isSuccessAC = (isSuccess: boolean) => (
    {type: UPDATE_PASSWORD_ACTIONS_TYPES.IS_SUCCESS, isSuccess} as const)

// thunks
export const updatePasswordTC = (newPassword: string, token: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    async (dispatch) => {
        try {
            dispatch(setAppStatusAC("loading"))
            const res = await authAPI.setNewPassword(newPassword, token)
            dispatch(isSuccessAC(true))
            dispatch(setAppStatusAC("succeeded"))
        } catch (e) {
            const error = e.response ? e.response.data.error : (`Update password failed: ${e.message}.`)
            console.log(error)
            dispatch(setAppStatusAC("failed"))
        } finally {
            // some code...
        }
    }

// types
export type UpdatePasswordReducerActionsType = ReturnType<typeof isSuccessAC>
