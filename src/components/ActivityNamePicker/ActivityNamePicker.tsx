import React from "react";
import { useSelector } from "react-redux";
import CreatableSelect from 'react-select/creatable';
import { addActivityName } from "~modules/activities-record/reducer";
import { selectActivitiesList } from "~modules/activities-record/selectors";
import { useAppDispatch } from "~modules/configureStore";
import { setActivityName } from "~modules/current-activity/reducer";
import { selectCurrentActivityName, selectCurrentActivityStatus } from "~modules/current-activity/selectors";

type Option = {
  value: string;
  label: string;
}

export const ActivityNamePicker: React.FC = React.memo(() => {
  const currentActivityStatus = useSelector(selectCurrentActivityStatus);
  const currentActivityName = useSelector(selectCurrentActivityName);
  const activitiesList = useSelector(selectActivitiesList);
  
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
        isClearable={false}
        options={options}
        styles={{
          control: (base) => ({ ...base, borderColor: currentActivityStatus === 'finished' && !currentActivityName ? 'red' : 'black' })
        }}
        onCreateOption={handleCreateOption}
        value={options.find(({ value }) => value === currentActivityName ) ?? null}
        placeholder="Ввод активности"
        noOptionsMessage={() => "Нет сохранённых активностей"}
        formatCreateLabel={(inputValue) => `Сохранить как "${inputValue}"`}
        onChange={(newValue) => changeInputActivityName(newValue?.value ?? null)}
      />
    </div>
  )
});