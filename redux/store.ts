import { configureStore } from "@reduxjs/toolkit";
// import userSlice from "./features/userSlice";
import dataSlice from "./features/dataSlice";

export const store = configureStore({
    reducer: {
        data: dataSlice
    }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']



