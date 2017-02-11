import { combineReducers } from 'redux';
import appReducer from './app/reducer';
import questionsReducer from './questions/reducer';

export default combineReducers({
  app: appReducer,
  questions: questionsReducer
});
