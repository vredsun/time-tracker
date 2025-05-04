import { combineReducers } from 'redux';
import activitiesRecordReducer from './activities-record/reducer';
import currentActivityReducer from './current-activity/reducer';

const reducers = combineReducers({
  currentActivity: currentActivityReducer,
  activitiesRecord: activitiesRecordReducer,
})

export default reducers;
