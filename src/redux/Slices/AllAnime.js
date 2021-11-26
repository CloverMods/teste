import { createSlice } from "@reduxjs/toolkit";
import { apiCallStart } from "../middleware/apiActions";

const allAnimeSlice = createSlice({
    name: "allanime",
    initialState: {
        data: [],
        loading: false,
        error: [],
    },
    reducers: {
        dataRequested: (state) => {
            state.data = [];
            state.loading = true;
            state.error = [];

        },

        dataReceived: (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.error = [];
        },

        dataRequestFailed: (state, action) => {
            state.error = ["404"];
            state.loading = false;
            state.data = [];

        },


    }
});

export default allAnimeSlice.reducer;

const { dataRequested, dataReceived, dataRequestFailed } = allAnimeSlice.actions;


export const fetchAllAnime = ({ page }) => (dispatch) => {
    const baseURL = "https://api.jikan.moe/v3/search/anime?q=&order_by=title&sort=asc";
    const url = `&page=${page}`
    return dispatch(
        apiCallStart({
            baseURL,
            url,
            onStart: dataRequested.type,
            onSuccess: dataReceived.type,
            onError: dataRequestFailed.type,
        })

    );
}
