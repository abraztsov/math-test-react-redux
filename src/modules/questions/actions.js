import * as t from './actionTypes';

export const setCurrentQuestion = (num) => ({
  type: t.SET_CURRENT_QUESTION,
  payload: {
    num
  }
});
