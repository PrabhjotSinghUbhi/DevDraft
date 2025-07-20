import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    posts: [
        {
            "id": "6vIWt3b3nPOFtYQws-8Pd",
            "datetime": "Sun, 20 Jul 2025 11:20:27 GMT",
            "title": "Why Your Code Doesn’t Work (And That’s Okay)",
            "body": "In a world obsessed with intensity, we often overlook the quiet strength of consistency. You don't need to sprint every day to reach your goals — you just need to show up.\n\nWhether it’s writing a single paragraph, reading two pages of a book, or doing five pushups, small steps compound over time. Consistency isn’t glamorous. It doesn’t grab attention. But it works — slowly, quietly, and reliably.\n\nRemember, the gym filled on January 1st is empty by February because motivation fades. But discipline — built through daily effort — sticks. It's not about being perfect. It’s about being persistent.\n\nSo start small. Stay steady. And let consistency carry you to greatness."
        },
    ]
}

const getPosts = createAsyncThunk("getPosts", async () => {
    try {
        const resp = await axios.get('http://localhost:4001/posts')
        return resp.data;
    } catch (err) {
        console.log(err);
        return [];
    }
})

const postSlice = createSlice({
    name: "post-slice",
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => builder.addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload ?? [];
    })
})

// export { } = postSlice.actions;

export default postSlice.reducer;