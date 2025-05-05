import React from "react";
import { useSelector } from "react-redux";
import { getHHMMSSfromSeconds } from "~components/TimerTitle/utils";
import { selectActivitiesByDate } from "~modules/activities-record/selectors";

export const ActivitiesList: React.FC = React.memo(
  () => {
    const activitiesByDate = useSelector(selectActivitiesByDate);

    return (
      <>
        {
          Object.entries(activitiesByDate).reduceRight((acc: Array<React.ReactNode>, [day, activities]) => {
            acc.push(
              <div key={day} style={{ padding: '0 24px 24px' }}>
                <div style={{ position: 'sticky', top: '0', background: 'white', fontSize: '24px', paddingBottom: '8px', fontWeight: '600' }}>{day}</div>
                {activities.reduceRight((acc: Array<React.ReactNode>, activity) => {
                  acc.push((
                    <div key={activity.startTime} style={{ padding: '2px 0', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid grey' }}>
                      <div>{activity.name}</div>
                      <div>{getHHMMSSfromSeconds(Math.floor((activity.endTime - activity.startTime) / 1000))}</div>
                    </div>
                  ))

                  return acc;
                }, [])}
              </div>
            )

            return acc;
          }, [])
        }
      </>
    )
  }
);