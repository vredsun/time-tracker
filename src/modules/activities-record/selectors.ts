import { RootState } from "~modules/configureStore";

export const selectActivitiesList = (state: RootState) => state.activitiesRecord.activitiesList;
export const selectActivitiesByDate = (state: RootState) => state.activitiesRecord.byDate;
