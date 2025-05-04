import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type CurrentActivityStatus = 'notStarted' | 'tracked' | 'finished'

export type CurrentActivity = {
  status: CurrentActivityStatus;
  name: string | null;
  start_time: number | null;
  end_time: number | null;
}

const initialState: CurrentActivity = {
  status: 'notStarted',
  name: null,
  start_time: null,
  end_time: null,
}

export const currentActivitySlice = createSlice({
  name: 'currentActivity',
  initialState,
  reducers: {
    startActivity: (state) => {
      state.status = 'tracked';
      state.start_time = Date.now();
    },
    finishActivity: (state) => {
      state.status = 'finished';
      state.end_time = Date.now();
    },
    setActivityName: (state, action: PayloadAction<string | null>) => {
      state.name = action.payload;
    },
    resetCurrentActivity: () => initialState,
  },
})

export const { startActivity, finishActivity, resetCurrentActivity, setActivityName } = currentActivitySlice.actions

export default currentActivitySlice.reducer