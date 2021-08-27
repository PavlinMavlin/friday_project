import {ThunkAction} from "redux-thunk"
import {authAPI} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {setAppErrorAC, setAppStatusAC} from "./app-reducer"

enum REGISTRATION_ACTIONS_TYPES {
    SET_IS_SIGN_UP = "registration/SET_IS_SIGN_UP"
}

type InitialStateType = {
    isSignUp: boolean
}

const initialState: InitialStateType = {
    isSignUp: false
}

export const registrationReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case REGISTRATION_ACTIONS_TYPES.SET_IS_SIGN_UP:
            return {...state, isSignUp: action.value}
        default:
            return state
    }
}

// actions
export const setIsSignUpAC = (value: boolean) => {
    return {type: REGISTRATION_ACTIONS_TYPES.SET_IS_SIGN_UP, value} as const
}

// thunks
export const signUpTC = (email: string, password: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    async (dispatch) => {
        try {
            dispatch(setAppStatusAC("loading"))
            const res = await authAPI.signUp(email, password)
            dispatch(setIsSignUpAC(true))
            dispatch(setAppStatusAC("succeeded"))
        } catch (e) {
            const error = e.response ? e.response.data.error : (`Registration failed: ${e.message}.`)
            console.log(error)
            dispatch(setAppErrorAC(error))
            dispatch(setAppStatusAC("failed"))
        } finally {
            // some code...
        }
    }

// types
export type RegistrationReducerActionsType = ReturnType<typeof setIsSignUpAC>