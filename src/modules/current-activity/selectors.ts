import { RootState } from "~modules/configureStore";

export const selectCurrentActivityStatus = (state: RootState) => state.currentActivity.status;
export const selectCurrentActivityName = (state: RootState) => state.currentActivity.name;
export const selectCurrentActivityStartTime = (state: RootState) => state.currentActivity.start_time;
export const selectCurrentActivityEndTime = (state: RootState) => state.currentActivity.end_time;
