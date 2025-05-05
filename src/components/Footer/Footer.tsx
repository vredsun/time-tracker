import React from "react";
import { IoIosPlay, IoMdSquare } from "react-icons/io";
import { useSelector } from "react-redux";
import { Slide, toast } from 'react-toastify';
import { addActivityRecord, DayKey } from "~modules/activities-record/reducer";
import { useAppDispatch } from "~modules/configureStore";
import { finishActivity, resetCurrentActivity, startActivity } from "~modules/current-activity/reducer";
import { selectCurrentActivityEndTime, selectCurrentActivityName, selectCurrentActivityStartTime, selectCurrentActivityStatus } from "~modules/current-activity/selectors";

export const Footer: React.FC = React.memo(() => {
  const currentActivityStatus = useSelector(selectCurrentActivityStatus);
  const name = useSelector(selectCurrentActivityName);
  const startTime = useSelector(selectCurrentActivityStartTime);
  const endTime = useSelector(selectCurrentActivityEndTime);
  
  const dispatch = useAppDispatch();

  const handleClick = () => {
    switch (currentActivityStatus) {
      case 'notStarted': {
        dispatch(startActivity());
        return;
      }
      case 'tracked': {
        dispatch(finishActivity());
        return;
      }
      case 'finished': {
        if (!name) {
          return;
        }

        if (startTime && endTime) {
          const date: DayKey = (new Date(startTime)).toISOString().split('T')[0];

          dispatch(addActivityRecord({
            date,
            activity: {
              startTime,
              endTime,
              name,
            }
          }))
          toast.success('Activity saved', {
            position: 'bottom-center',
            theme: 'colored',
            closeButton: false,
            autoClose: 2000,
            transition: Slide,
            hideProgressBar: true,
            progress: undefined,
          })
          dispatch(resetCurrentActivity());
        }

        return;
      }

      default: {
        const currentActivityStatusNever: never = currentActivityStatus;

        console.error('never', currentActivityStatusNever)
      }

    }
  }

  return (
    <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', padding: '24px 0' }}>
      <div style={{ height: '80px', fontSize: '48px', display: 'flex', flex: '1', justifyContent: 'center', alignItems: 'center', padding: '24px 0 48px'}} onClick={handleClick}>
        {
          currentActivityStatus === 'notStarted' && <IoIosPlay size={64} />
        }
        {
          currentActivityStatus === 'tracked' && <IoMdSquare size={64} />
        }
        {
          currentActivityStatus === 'finished' && (
            <div style={{ opacity: !name ? 0.5 : 1, color: !name ? 'red' : 'black' }}>Save</div>
          )
        }
      </div>
    </div>
  )
})
