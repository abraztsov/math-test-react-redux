import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';

import { PHRAZES } from 'src/constants';

import s from './style';

@autobind
export default class Answers extends Component {
  static propTypes = {
    answersCount: PropTypes.number,
    inCorrectAnswers: PropTypes.number,
    correctAnswers: PropTypes.number,
    onResetClick: PropTypes.func
  };

  setNewContent() {
    this.props.onResetClick();
  }

  getPhrase() {
    const {
      answersCount,
      correctAnswers
    } = this.props;

    if (correctAnswers === answersCount) {
      return PHRAZES.GOOD;
    }
    return PHRAZES.NOT_BAD;
  }

  render() {
    const {
      correctAnswers,
      inCorrectAnswers
    } = this.props;

    return (
      <div className={s.root}>
        <div className={s.mainContentGroup}>
          <h1>{this.getPhrase()}</h1>
          <p className={s.subText}>You have <span className={s.green}>{correctAnswers} correct</span> and <span className={s.red}>{inCorrectAnswers} wrong</span> answers</p>
          <button onClick={this.setNewContent}>restart</button>
        </div>
      </div>
    );
  }
}
