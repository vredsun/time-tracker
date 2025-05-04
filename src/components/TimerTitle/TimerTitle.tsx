import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentActivityEndTime, selectCurrentActivityStartTime, selectCurrentActivityStatus } from "~modules/current-activity/selectors";
import { getHHMMSSfromSeconds } from "./utils";

export const TimerTitle: React.FC = React.memo(() => {
  const currentActivityStatus = useSelector(selectCurrentActivityStatus);
  const currentActivityStartTime = useSelector(selectCurrentActivityStartTime);
  const currentActivityEndTime = useSelector(selectCurrentActivityEndTime);

  const [timeDiff, setTimeDiff] = useState<number | null>(() => {
    if (currentActivityStartTime) {
      return Math.floor((Date.now() - currentActivityStartTime) / 1000);
    }

    return null;
  });
  
  React.useEffect(
    () => {
      if (currentActivityStatus === 'tracked' && currentActivityStartTime) {
        setTimeDiff(Math.floor((Date.now() - currentActivityStartTime) / 1000));

        let animationId: number | null = null;
        let prevTime = performance.now();

        const checkTimeDiff = (now: number) => {
          animationId = requestAnimationFrame(checkTimeDiff);

          const diff = now - prevTime;

          if (diff >= 1000) {
            setTimeDiff(oldState => (oldState ?? 0) + Math.floor(diff / 1000))
            prevTime = now;
          }
        }

        checkTimeDiff(prevTime);

        return () => {
          if (animationId) {
            cancelAnimationFrame(animationId);
          }
        }
      }

      if (currentActivityStatus === 'finished' && currentActivityStartTime && currentActivityEndTime) {
        setTimeDiff(Math.floor((currentActivityEndTime - currentActivityStartTime) / 1000));
        return;
      }

      if (currentActivityStatus === 'notStarted' && timeDiff !== null) {
        setTimeDiff(null);
      }
    },
    [currentActivityStartTime, currentActivityStatus]
  );

  return (
    <div style={{ paddingTop: '44px', fontSize: '48px', margin: '0 auto'}}>
      {
        timeDiff === null && `Let's start`
      }
      {
        timeDiff !== null && getHHMMSSfromSeconds(timeDiff)
      }
  </div>
  )
})