import { ANSWERS } from 'src/constants';

export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];

    return reducer
      ? reducer(state, action.payload)
      : state;
  };
}

export function isCorretAnswer(answer) {
  const correctAnswer = ANSWERS.find(ans => ans.id === answer.id).answer;
  if (correctAnswer) {
    return correctAnswer === answer.answer;
  }
  return false;
}
