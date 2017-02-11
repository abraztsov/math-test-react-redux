import { createReducer } from '../../utils';
import * as t from './actionTypes';

const initialState = {
  answers: []
};

export default createReducer(initialState, {
  [t.ADD_ANSWER]: (state, action) => {
    return {
      ...state,
      answers: [
        ...state.answers,
        action.answer
      ]
    };
  },
  [t.CLEAR_ANSWERS]: () => ({
    ...initialState
  })
});
