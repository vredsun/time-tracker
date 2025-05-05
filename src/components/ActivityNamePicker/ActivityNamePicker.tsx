import React, { useImperativeHandle, useRef } from "react";
import { useSelector } from "react-redux";
import { SelectInstance } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { addActivityName } from "~modules/activities-record/reducer";
import { selectActivitiesList } from "~modules/activities-record/selectors";
import { useAppDispatch } from "~modules/configureStore";
import { setActivityName } from "~modules/current-activity/reducer";
import { selectCurrentActivityName } from "~modules/current-activity/selectors";

export type ActivityNamePickerRef = {
  focus: () => void;
}

type Props = {
  ref: React.Ref<ActivityNamePickerRef>;
}
type Option = {
  value: string;
  label: string;
}

export const ActivityNamePicker = React.memo<Props>(({ ref: forwardedRef }) => {
  const currentActivityName = useSelector(selectCurrentActivityName);
  const activitiesList = useSelector(selectActivitiesList);
  const ref = useRef<SelectInstance<Option>>(null);

  useImperativeHandle(forwardedRef, () => ({
    focus() {
      ref.current?.openMenu('first');
      ref.current?.focus();
    }
  }), [])
  
  const dispatch = useAppDispatch();

  const handleCreateOption = (name: string) => {
    dispatch(addActivityName(name));
    changeInputActivityName(name);
  }

  const changeInputActivityName = (name: string | null) => {
    dispatch(setActivityName(name));
  }

  const options = React.useMemo(
    () => {
      return activitiesList.map((activityName): Option => ({ value: activityName, label: activityName }))
    },
    [activitiesList],
  );

  return (
    <div style={{ margin: '24px 0'}}>
      <CreatableSelect<Option>
        isSearchable
        ref={ref}
        isClearable={false}
        options={options}
        onCreateOption={handleCreateOption}
        value={options.find(({ value }) => value === currentActivityName ) ?? null}
        placeholder="Input activity"
        noOptionsMessage={() => "No saved activities"}
        formatCreateLabel={(inputValue) => `Save as "${inputValue}"`}
        onChange={(newValue) => changeInputActivityName(newValue?.value ?? null)}
      />
    </div>
  )
});