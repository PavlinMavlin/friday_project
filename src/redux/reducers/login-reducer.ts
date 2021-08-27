import {ThunkAction} from "redux-thunk"
import {authAPI} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {initializeAppTC, setAppErrorAC, setAppStatusAC, setHeaderMenuStatusAC} from "./app-reducer"

enum LOGIN_ACTIONS_TYPES {
    SET_IS_LOGGED_IN = "SET_IS_LOGGED_IN",
}

type InitialStateType = {
    isLoggedIn: boolean
}

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const loginReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case LOGIN_ACTIONS_TYPES.SET_IS_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn
            }
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return {type: LOGIN_ACTIONS_TYPES.SET_IS_LOGGED_IN, isLoggedIn} as const
}

// thunks
export const loginTC = (email: string, password: string, rememberMe: boolean): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    async (dispatch) => {
        try {
            dispatch(setAppStatusAC("loading"))
            const res = await authAPI.login(email, password, rememberMe)
            dispatch(setHeaderMenuStatusAC("packsList"))
            dispatch(initializeAppTC())
        } catch (e) {
            const error = e.response ? e.response.data.error : (`Login failed: ${e.message}.`)
            console.log(error)
            dispatch(setAppErrorAC(error))
            dispatch(setAppStatusAC("failed"))
        } finally {
            // ...some code
        }
    }

export const logoutTC = (): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    async (dispatch) => {
        try {
            dispatch(setAppStatusAC("loading"))
            const res = await authAPI.logout()
            dispatch(setIsLoggedInAC(false))
            dispatch(setHeaderMenuStatusAC("packsList"))
            dispatch(setAppStatusAC("succeeded"))
        } catch (e) {
            const error = e.response ? e.response.data.error : (`Logout failed: ${e.message}.`)
            console.log(error)
            dispatch(setAppStatusAC("failed"))
        } finally {
            // ...some code
        }
    }

// types
export type LoginReducerActionsType = ReturnType<typeof setIsLoggedInAC>
