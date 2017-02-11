import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';

import s from './style';

@autobind
export default class MainPage extends Component {
  static propTypes = {
    questions: PropTypes.array,
    currentQuestion: PropTypes.number,
    onActionClick: PropTypes.func
  };

  onActionClick() {
    this.props.onActionClick();
  }

  render() {
    const {
      questions,
      currentQuestion
    } = this.props;
    const isTestStarted = currentQuestion > 0;

    return (
      <div className={s.root}>
        <div className={s.mainContentGroup}>
          <h1>How well do you know math ?</h1>
          <p className={s.subText}>Have you ever wondered how well can you add and multiply? I’ve created this handy website with tiny test just for you. Find out how well do you know math in under a minute!</p>
          <button onClick={this.onActionClick}>{isTestStarted ? 'continue →' : 'get started'}</button>
          <p className={s.currentQuestion}>{currentQuestion}/{questions.length}</p>
        </div>
      </div>
    );
  }
}
