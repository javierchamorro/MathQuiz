import React from 'react';

export default class Tipo2 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let quizClassName = "question_choice";
    let showCorrection = (this.props.quizAnswered);
    if (showCorrection) {
      if (this.props.checked) {
        if (this.props.choice.answer === true) {
          quizClassName += " question_choice_correct";
        } else {
          quizClassName += " question_choice_incorrect";
        }
      } else if (this.props.choice.answer === true) {
        quizClassName += " question_choice_correct";
      }
    }
    return (<div className={quizClassName}>
      <div className="questionC1">
        <input type="radio" checked={this.props.checked} onChange={() => this.props.handleChange(this.props.choice)} disabled={showCorrection}/>
      </div>
      <div className="questionC2">
        <p>{this.props.choice.value}</p>
      </div>
    </div>);
  }
}
