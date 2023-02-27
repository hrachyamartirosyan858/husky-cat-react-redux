import { createSlice } from "@reduxjs/toolkit";
import { STATES } from "../constants";

export const countDownSlice = createSlice({
  name: "countDown",
  initialState: {
    state: STATES.initial,
    paused: true,
    time: 0,
    initialTime: 0,
  },
  reducers: {
    reset: (state, action) => {
      state.state = STATES.initial;
      state.paused = true;
      state.time = 0;
      state.initialTime = 0;
    },
    runningState: (state, action) => {
      state.state = STATES.running;
      state.paused = action.payload.paused;
      state.time =
        action.payload?.time !== undefined ? action.payload.time : state.time;
    },
    timeChange: (state, action) => {
      const t = action.payload
        ? action.payload.minutes * 60 * 1000 + action.payload.seconds * 1000
        : 0;
      state.state = STATES.initial;
      state.time = t;
      state.initialTime = t;
    },
  },
});

export const { reset, runningState, timeChange } = countDownSlice.actions;

export const selectValue = (state) => state.countDown;

export default countDownSlice.reducer;
