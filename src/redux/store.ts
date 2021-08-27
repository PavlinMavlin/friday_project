import {applyMiddleware, combineReducers, createStore} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk"
import {appReducer, AppReducerActionsType} from "./reducers/app-reducer"
import {packsListReducer, PacksListReducerActionsType} from "./reducers/packsList-reducer"
import {cardsListReducer, CardsListReducerActionsType} from "./reducers/cardsList-reducer"
import {loginReducer, LoginReducerActionsType} from "./reducers/login-reducer"
import {registrationReducer, RegistrationReducerActionsType} from "./reducers/registration-reducer"
import {restorePasswordReducer, RestorePasswordReducerActionsType} from "./reducers/restorePassword-reducer"
import {updatePasswordReducer, UpdatePasswordReducerActionsType} from "./reducers/updatePassword-reducer"
import {learnPackReducer, LearnPackReducerActionsType} from "./reducers/learnPack-reducer"

const rootReducer = combineReducers({
    appReducer: appReducer,
    packsListReducer: packsListReducer,
    cardsListReducer: cardsListReducer,
    learnPackReducer: learnPackReducer,
    loginReducer: loginReducer,
    registrationReducer: registrationReducer,
    restorePasswordReducer: restorePasswordReducer,
    updatePasswordReducer: updatePasswordReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType = AppReducerActionsType
    | PacksListReducerActionsType
    | CardsListReducerActionsType
    | LearnPackReducerActionsType
    | LoginReducerActionsType
    | RegistrationReducerActionsType
    | RestorePasswordReducerActionsType
    | UpdatePasswordReducerActionsType

// @ts-ignore
window.store = store