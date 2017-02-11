import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';

import s from './style';

@autobind
export default class Question extends Component {
  static propTypes = {
    question: PropTypes.object,
    onChoosedAnswer: PropTypes.func,
    onClickBack: PropTypes.func
  };

  onChoosedAnswer(answer) {
    const {
      onChoosedAnswer,
      question
    } = this.props;

    onChoosedAnswer({
      id: question.id,
      answer
    });
  }

  onClickBack() {
    this.props.onClickBack();
  }

  render() {
    const {
      question
    } = this.props;

    return (
      <div className={s.root}>
        <div className={s.back} onClick={this.onClickBack}>&#8592; back</div>
        <div className={s.mainContentGroup}>
          <h1>{question.question}</h1>
          <p className={s.subText}>{question.note}</p>
          <div className={s.answers}>
            {question.options.map((ans, i) => (
              <div className={s.answer} onClick={() => this.onChoosedAnswer(ans.answer)} key={i}>
                {ans.answer}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
