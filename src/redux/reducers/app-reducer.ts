import {ThunkAction} from "redux-thunk"
import {authAPI, UserDataType} from "../../api/api"
import {AppActionsType, AppRootStateType} from "../store"
import {setIsLoggedInAC} from "./login-reducer"

enum APP_ACTIONS_TYPES {
    SET_APP_STATUS = "SET_APP_STATUS",
    SET_ERROR = "SET_ERROR",
    SET_HEADER_MENU_STATUS = "SET_HEADER_MENU_STATUS",
    SET_USER_DATA = "USER_DATA",
    UPDATE_USER_DATA = "UPDATE_USER_DATA"
}

const initialState = {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    headerMenuStatus: "packsList" as HeaderMenuStatusType,
    userData: {
        _id: "",
        email: "",
        name: "",
        avatar: "" as string | undefined,
        publicCardPacksCount: 0,

        created: "",
        updated: "",
        isAdmin: false,
        verified: false,
        rememberMe: false,
    } as UserDataType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case APP_ACTIONS_TYPES.SET_APP_STATUS:
            return {...state, status: action.status}
        case APP_ACTIONS_TYPES.SET_ERROR:
            return {...state, error: action.error}
        case APP_ACTIONS_TYPES.SET_HEADER_MENU_STATUS:
            return {...state, headerMenuStatus: action.headerMenuStatus}
        case APP_ACTIONS_TYPES.SET_USER_DATA:
            return {...state, userData: action.userData}
        case APP_ACTIONS_TYPES.UPDATE_USER_DATA:
            return {...state, ...action.userData}
        default:
            return state
    }
}

// actions
export const setAppStatusAC = (status: RequestStatusType) => (
    {type: APP_ACTIONS_TYPES.SET_APP_STATUS, status} as const)

export const setAppErrorAC = (error: string | null) => (
    {type: APP_ACTIONS_TYPES.SET_ERROR, error} as const)

export const setHeaderMenuStatusAC = (headerMenuStatus: HeaderMenuStatusType) => (
    {type: APP_ACTIONS_TYPES.SET_HEADER_MENU_STATUS, headerMenuStatus} as const)

export const setUserDataAC = (userData: UserDataType) => (
    {type: APP_ACTIONS_TYPES.SET_USER_DATA, userData} as const)

export const updateUserDataAC = (email: string, name: string, avatar: string | undefined) => (
    {type: APP_ACTIONS_TYPES.UPDATE_USER_DATA, userData: {email, name, avatar}} as const)

// thunks
export const initializeAppTC = (): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    async (dispatch) => {
        try {
            dispatch(setAppStatusAC("loading"))
            const res = await authAPI.me()
            if (res.data._id) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setUserDataAC(res.data))
                console.log("AuthMe success!!!")
            }
            dispatch(setAppStatusAC("succeeded"))
        } catch (e) {
            const error = e.response ? e.response.data.error : (`AuthMe failed: ${e.message}.`)
            console.log(error)
            dispatch(setAppStatusAC("failed"))
        } finally {
            // ...some code
        }
    }

export const updateUserDataTC = (userName: string, userEmail: string, userAvatar: string | undefined): ThunkAction<void, AppRootStateType, unknown, AppActionsType> =>
    async (dispatch) => {
        try {
            dispatch(setAppStatusAC("loading"))
            const res = await authAPI.updateUserData(userName, userAvatar)
            const {name, email, avatar} = res.data.updatedUser
            dispatch(updateUserDataAC(name, email, avatar))
            dispatch(setAppStatusAC("succeeded"))
        } catch (e) {
            const error = e.response ? e.response.data.error : (`Update userData failed: ${e.message}.`)
            console.log(error)
            dispatch(setAppStatusAC("failed"))
        } finally {
            // some code...
        }
    }

// types
export type HeaderMenuStatusType = "packsList" | "profile"
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type AppReducerActionsType = ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setHeaderMenuStatusAC>
    | ReturnType<typeof setUserDataAC>
    | ReturnType<typeof updateUserDataAC>