import { configureStore } from "@reduxjs/toolkit";
import countDownSlice from "../reducers/countDown";

export default configureStore({ reducer: { countDown: countDownSlice } });
