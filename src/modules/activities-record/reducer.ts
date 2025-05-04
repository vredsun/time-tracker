import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type DayKey = string;
export type ActivityRecord = {
  name: string;
  startTime: number;
  endTime: number;
}

export type ActivitiesRecord = {
  byDate: Record<DayKey, Array<ActivityRecord>>;
  activitiesList: Array<string>;
}

const initialState: ActivitiesRecord = {
  byDate: {},
  activitiesList: [],
}

export const activitiesRecordSlice = createSlice({
  name: 'activitiesRecord',
  initialState,
  reducers: {
    addActivityRecord: (state, action: PayloadAction<{ date: DayKey, activity: ActivityRecord }>) => {
      const { payload: { date, activity } } = action;
      if (!state.byDate[date]) {
        state.byDate[date] = [];
      }

      state.byDate[date] = [...state.byDate[date], activity];
      
      const activitiesList = new Set([...state.activitiesList, activity.name]);
      state.activitiesList = [...activitiesList];
    },
  },
})

export const { addActivityRecord } = activitiesRecordSlice.actions

export default activitiesRecordSlice.reducer