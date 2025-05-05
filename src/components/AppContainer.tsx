import React from "react";

import { useSelector } from "react-redux";
import { selectActivitiesByDate } from "~modules/activities-record/selectors";
import { ActivitiesList } from "./ActivitiesList/ActivitiesList";
import { ActivityNamePicker } from "./ActivityNamePicker/ActivityNamePicker";
import { Footer } from "./Footer/Footer";
import { TimerTitle } from "./TimerTitle/TimerTitle";


const AppContainer = React.memo(() => {
  const activitiesByDate = useSelector(selectActivitiesByDate);

  console.log(activitiesByDate)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
      <div style={{ display: 'flex', flex: '1', flexDirection: 'column', overflow: 'hidden' }}>
        <TimerTitle />

        <div style={{  flex: '1', overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
          <div style={{ padding: '0 24px' }}>
            <ActivityNamePicker />
          </div>

          <div style={{ flex: '1', overflow: 'auto' }}>
            <ActivitiesList />
          </div>
        </div>

        <div style={{ display: 'flex',  }}>
          <Footer />
        </div>
      </div>
    </div>
  )
})

export default AppContainer;
