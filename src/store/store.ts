import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import authenReducer from './slices/authenSlices'
import employeesReducer from './slices/employeesSlices'



const store = configureStore({
    reducer: {
        auth: authenReducer,
        employees: employeesReducer,
    },
    devTools: process.env.NODE_ENV === "development",
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store