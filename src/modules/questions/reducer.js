import { createReducer } from '../../utils';
import * as t from './actionTypes';
import { QUESTIONS } from 'src/constants';

const initialState = {
  questions: QUESTIONS,
  currentQuestion: 0
};

export default createReducer(initialState, {
  [t.SET_CURRENT_QUESTION]: (state, action) => ({
    ...state,
    currentQuestion: action.num
  })
});
