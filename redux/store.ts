import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { ratingsSlice } from "./slices/ratings-slice";


const rootReducer = combineReducers({
    rating: ratingsSlice.reducer,
});


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }),
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ReturnType<typeof store.dispatch>;