import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import * as appActions from 'src/modules/app/actions';
import * as questionsActions from 'src/modules/questions/actions';
import { PAGE } from 'src/constants';
import { isCorretAnswer } from 'src/utils';

import MainPage from '../MainPage';
import Answers from '../Answers';
import Question from 'src/modules/questions/components/Question';

import s from './style';

@autobind
class AppEnter extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    questions: PropTypes.array,
    answers: PropTypes.array,
    defaultPage: PropTypes.string,
    currentQuestion: PropTypes.number
  };

  constructor(props) {
    super(props);

    this.state = {
      currentPage: props.defaultPage
    };
  }

  onActionClick() {
    const {
      currentQuestion,
      dispatch
    } = this.props;

    this.setState({ currentPage: PAGE.QUESTIONS });
    if (currentQuestion === 0) {
      dispatch(questionsActions.setCurrentQuestion(1));
    }
  }

  onChoosedAnswer(answer) {
    const {
      dispatch,
      currentQuestion,
      questions
    } = this.props;
    const newAnswer = Object.assign({}, answer, { isCorretAnswer: isCorretAnswer(answer) });
    dispatch(appActions.addAnswer(newAnswer));

    if (currentQuestion !== questions.length) {
      dispatch(questionsActions.setCurrentQuestion(currentQuestion + 1));
    } else {
      this.setState({ currentPage: PAGE.ANSWER });
    }
  }

  onClickBack() {
    this.setState({ currentPage: PAGE.MAIN_PAGE });
  }

  onResetClick() {
    const {
      dispatch
    } = this.props;

    this.setState({ currentPage: PAGE.MAIN_PAGE });
    dispatch(appActions.clearAnswers());
    dispatch(questionsActions.setCurrentQuestion(0));
  }

  renderContent() {
    const {
      questions,
      currentQuestion,
      answers
    } = this.props;
    const {
      currentPage
    } = this.state;

    switch (currentPage) {
      case PAGE.MAIN_PAGE:
        return (
          <MainPage
            currentQuestion={currentQuestion}
            questions={questions}
            onActionClick={this.onActionClick}
          />
        );
      case PAGE.QUESTIONS:
        return (
          <Question
            question={questions[currentQuestion - 1]}
            currentQuestion={currentQuestion}
            onChoosedAnswer={this.onChoosedAnswer}
            onClickBack={this.onClickBack}
          />
        );
      case PAGE.ANSWER: {
        let correctAnswers = 0;
        let inCorrectAnswers = 0;

        answers.forEach(ans => {
          if (ans.isCorretAnswer) {
            correctAnswers += 1;
          } else {
            inCorrectAnswers += 1;
          }
        });

        return (
          <Answers
            answersCount={answers.length}
            correctAnswers={correctAnswers}
            inCorrectAnswers={inCorrectAnswers}
            onResetClick={this.onResetClick}
          />
        );
      }
      default:
        return null;
    }
  }

  render() {
    const {
      questions,
      currentQuestion
    } = this.props;

    return (
      <div className={s.rootC}>
        <section>
          <p className={s.slogan}>How well do you know math</p>
          <p className={s.author}>
            MADE BY
            <a href="https://github.com/abraztsov" target="_blank" rel="noreferrer noopener">ABRAZTSOV</a>
          </p>
          <p className={s.hint}>hint: 3+2=5</p>
          {this.state.currentPage === PAGE.QUESTIONS &&
            <div className={s.currentQuestion}>{currentQuestion}/{questions.length}</div>
          }
          {this.renderContent()}
        </section>
      </div>
    );
  }
}

function mapStateToProps({ app, questions }) {
  return {
    questions: questions.questions,
    currentQuestion: questions.currentQuestion,
    answers: app.answers
  };
}

export default connect(mapStateToProps)(AppEnter);
