import { createSlice } from "@reduxjs/toolkit";

const initialState = { search: '' }

const postSlice = createSlice({
    name: "searchPost",
    initialState: initialState,
    reducers: {
        updateSearch(state, action) {
            const search = action.payload
            state.search = search
        }
    }
})

export const { updateSearch } = postSlice.actions;

export default postSlice.reducer