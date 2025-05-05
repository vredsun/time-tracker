import React from "react";

import { ActivitiesList } from "./ActivitiesList/ActivitiesList";
import { ActivityNamePicker, ActivityNamePickerRef } from "./ActivityNamePicker/ActivityNamePicker";
import { Footer } from "./Footer/Footer";
import { LoadCsvButton } from "./LoadCsvButton/LoadCsvButton";
import { TimerTitle } from "./TimerTitle/TimerTitle";


const AppContainer = React.memo(() => {
  const activityNamePickerRef = React.useRef<ActivityNamePickerRef>(null);

  const handleFocusActivityNamePicker = () => {
    activityNamePickerRef.current?.focus(); 
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
      <LoadCsvButton />
      <div style={{ display: 'flex', flex: '1', flexDirection: 'column', overflow: 'hidden' }}>
        <TimerTitle />

        <div style={{  flex: '1', overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
          <div style={{ padding: '0 24px' }}>
            <ActivityNamePicker ref={activityNamePickerRef} />
          </div>

          <div style={{ flex: '1', overflow: 'auto' }}>
            <ActivitiesList />
            <div style={{ position: 'sticky', bottom: '0px', background: 'linear-gradient(0, #ffffff, #ffffffcc 75%, transparent)' }}>
              <Footer onFocusActivityNamePicker={handleFocusActivityNamePicker}  />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex',  }}>
        </div>
      </div>
    </div>
  )
})

export default AppContainer;
