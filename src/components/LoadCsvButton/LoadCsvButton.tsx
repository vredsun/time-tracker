import isEmpty from "lodash/isEmpty";
import React from "react";
import { BsFiletypeCsv } from "react-icons/bs";
import { useSelector } from "react-redux";
import { downloadFile } from "~lib/load-file";
import { prepareCsv } from "~lib/prepare-csv";
import { selectActivitiesByDate } from "~modules/activities-record/selectors";


export const LoadCsvButton: React.FC = React.memo(
  () => {
    const activitiesByDate = useSelector(selectActivitiesByDate);
    
    const handleLoadCsv = async () => {
      const blob = await prepareCsv(activitiesByDate);

      downloadFile(blob)
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