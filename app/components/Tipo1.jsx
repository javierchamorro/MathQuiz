import React from 'react';

export default class Tipo1 extends React.Component {
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
    if (this.props.difficulty === 5) {
      return (<div className={quizClassName}>
        <div className="questionC1">
          <input type="checkbox" checked={this.props.checked} onChange={() => this.props.handleChange(this.props.choice)} disabled={showCorrection}/>
        </div>
        <div className="questionC2">
          <p>{this.props.choice.value.primero}</p>
          <sup>{this.props.choice.value.segundo}</sup>
          =
          <p>{this.props.choice.value.tercero}</p>
        </div>
      </div>);
    } else if (this.props.difficulty === 6) {
      return (<div className={quizClassName}>
        <div className="questionC1">
          <input type="checkbox" checked={this.props.checked} onChange={() => this.props.handleChange(this.props.choice)} disabled={showCorrection}/>
        </div>
        <div className="questionC2">
          <sup>{this.props.choice.value.primero}</sup>√<p>{this.props.choice.value.segundo}</p>
          =
          <p>{this.props.choice.value.tercero}</p>
        </div>
      </div>);
    } else if (this.props.difficulty === 7 || this.props.difficulty === 8) {
      return (<div className={quizClassName}>
        <div className="questionC1">
          <input type="checkbox" checked={this.props.checked} onChange={() => this.props.handleChange(this.props.choice)} disabled={showCorrection}/>
        </div>
        <div className="questionC2">
          Log<sub>{this.props.choice.value.primero}</sub>({this.props.choice.value.segundo})={this.props.choice.value.tercero}</div>
      </div>);
    } else {
      return (<div className={quizClassName}>
        <div className="questionC1">
          <input type="checkbox" checked={this.props.checked} onChange={() => this.props.handleChange(this.props.choice)} disabled={showCorrection}/>
        </div>
        <div className="questionC2">
          <p>{this.props.choice.value}</p>
        </div>
      </div>);
    }
  }
}
