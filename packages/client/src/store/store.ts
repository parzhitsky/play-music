import * as reactRedux from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { app } from './app/slice.ts'
import { listener } from './listener.ts'
import * as appActions from './app/actions.ts'

/** @private */
const rootReducer = combineReducers({
  app: app.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listener.middleware),
})

setTimeout(() => {
  store.dispatch(appActions.initialize())
}, 0)

export type Dispatch = typeof store.dispatch

export type State = ReturnType<typeof store.getState>

export const useDispatch: () => Dispatch = reactRedux.useDispatch

export const useSelector: reactRedux.TypedUseSelectorHook<State> = reactRedux.useSelector
