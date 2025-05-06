import isEmpty from "lodash/isEmpty";
import React from "react";
import { BsFiletypeCsv } from "react-icons/bs";
import { useSelector } from "react-redux";
import { selectActivitiesByDate } from "~modules/activities-record/selectors";


export const LoadCsvButton: React.FC = React.memo(
  () => {
    const activitiesByDate = useSelector(selectActivitiesByDate);
    
    const handleLoadCsv = () => {

      const data: Array<string>= []

      Object.entries(activitiesByDate).forEach(([day, activities]) => {
        activities.forEach(activity => {
          data.push(
            [
              day,
              activity.name,
              Math.floor((activity.endTime - activity.startTime) / 1000 / 60),
              new Date(activity.startTime).toISOString(),
              new Date(activity.endTime).toISOString(),
            ].join(',')
          )
        })
      })

      const blob = new Blob(['\uFEFF' + data.join('\n')], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "time_tracker.csv");
      document.body.appendChild(link); // Required for FF

      link.click();

      document.body.removeChild(link);
    }

    if (isEmpty(activitiesByDate)) {
      return null;
    }

    return (
      <div style={{ position: 'absolute', right: 0, top: 0}}>
        <div style={{ padding: '12px 24px 12px 24px', cursor: 'pointer'}} onClick={handleLoadCsv}>
          <BsFiletypeCsv size={32} />
        </div>
      </div>
    )
  }
);