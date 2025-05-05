import React from "react";
import { IoIosPlay, IoMdSquare } from "react-icons/io";
import { useSelector } from "react-redux";
import { Slide, toast } from 'react-toastify';
import { addActivityRecord, DayKey } from "~modules/activities-record/reducer";
import { useAppDispatch } from "~modules/configureStore";
import { finishActivity, resetCurrentActivity, startActivity } from "~modules/current-activity/reducer";
import { selectCurrentActivityEndTime, selectCurrentActivityName, selectCurrentActivityStartTime, selectCurrentActivityStatus } from "~modules/current-activity/selectors";

type Props = {
  onFocusActivityNamePicker: () => void;
}

export const Footer = React.memo<Props>(({ onFocusActivityNamePicker }) => {
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
          onFocusActivityNamePicker();
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
            autoClose: 2_000,
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
    <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', padding: '24px 0 24px' }}>
      <div style={{ fontSize: '48px', display: 'flex', flex: '1', justifyContent: 'center', alignItems: 'center', padding: '24px 0 48px', cursor: 'pointer'}} onClick={handleClick}>
        <div style={{
            background: 'rgb(0 0 0 / 5%)',
            borderRadius: '44px',
            height: '88px',
            width: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
          {
            currentActivityStatus === 'notStarted' && <IoIosPlay size={64} style={{ transform: 'translateX(4px)' }} />
          }
          {
            currentActivityStatus === 'tracked' && <IoMdSquare size={64}/>
          }
          {
            currentActivityStatus === 'finished' && 'Save'
          }
        </div>
      </div>
    </div>
  )
})
