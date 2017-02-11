import * as t from './actionTypes';

export const addAnswer = (answer) => ({
  type: t.ADD_ANSWER,
  payload: {
    answer
  }
});

export const clearAnswers = () => ({
  type: t.CLEAR_ANSWERS
});
