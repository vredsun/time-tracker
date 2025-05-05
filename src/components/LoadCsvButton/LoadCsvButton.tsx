import isEmpty from "lodash/isEmpty";
import React from "react";
import { BsFiletypeCsv } from "react-icons/bs";
import { useSelector } from "react-redux";
import { selectActivitiesByDate } from "~modules/activities-record/selectors";


export const LoadCsvButton: React.FC = React.memo(
  () => {
    const activitiesByDate = useSelector(selectActivitiesByDate);
    
    const handleLoadCsv = () => {
      let csvContent = "data:text/csv;charset=utf-8,";

      Object.entries(activitiesByDate).forEach(([day, activities]) => {
        activities.forEach(activity => {
          csvContent = `${csvContent}${day},${activity.name},${new Date(activity.startTime).toISOString()},${new Date(activity.endTime).toISOString()}\n`;
        })
      })

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "my_data.csv");
      document.body.appendChild(link); // Required for FF

      link.click();

      document.body.removeChild(link);
    }

    if (isEmpty(activitiesByDate)) {
      return null;
    }

    return (
      <div style={{ position: 'absolute', right: 0, top: 0}}>
        <div style={{ padding: '12px 24px 12px 24px'}} onClick={handleLoadCsv}>
          <BsFiletypeCsv size={32} />
        </div>
      </div>
    )
  }
);