import { configureStore } from '@reduxjs/toolkit'
import Reducer from '../slice/searchSlice'
const store = configureStore({
    reducer: Reducer
})

export type RootState = ReturnType<typeof store.getState>;
export default store;