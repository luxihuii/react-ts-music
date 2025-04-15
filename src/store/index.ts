import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from '@/store/userInfo'
import recommendReducer from '@/views/discover/c-views/recommend/store/recommend'
import playerReducer from '@/views/player/store/player'
import { shallowEqual, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const store = configureStore({
    reducer: {
        userInfo: userInfoReducer,
        recommend: recommendReducer,
        player: playerReducer
    }
})

export type IRootState = ReturnType<typeof store.getState>
type DispatchType = typeof store.dispatch

// useAppSelector和useAppDispatch的hook
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
export const useAppDispatch: () => DispatchType = useDispatch
export const shallowEqualApp = shallowEqual

export default store