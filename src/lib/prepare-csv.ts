import { ActivityRecord } from "~modules/activities-record/reducer";
import { getISOString } from "./datetime";

const MS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const CSV_UTF8_PREFIX = '\uFEFF';
const CSV_CELLS_SEPARATOR = ',';
const CSV_ROWS_SEPARATOR = '\n';

export const prepareCsv = (activitiesByDate: Record<string, Array<ActivityRecord>>): Promise<Blob> => {
  return new Promise(res => {
    const data: Array<string>= []
  
    Object.entries(activitiesByDate).forEach(([day, activities]) => {
      activities.forEach(activity => {
        data.push(
          [
            day,
            activity.name,
            Math.floor((activity.endTime - activity.startTime) / MS_IN_SECOND / SECONDS_IN_MINUTE),
            getISOString(activity.startTime),
            getISOString(activity.endTime),
          ].join(CSV_CELLS_SEPARATOR)
        )
      })
    })
  
    res(new Blob([`${CSV_UTF8_PREFIX}${data.join(CSV_ROWS_SEPARATOR)}`], { type: 'text/csv' }));
  })

}