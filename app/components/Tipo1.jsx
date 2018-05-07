import React from 'react';

export default class Tipo1 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let quizClassName = "questionC2";
    let showCorrection = (this.props.quizAnswered);
    if (showCorrection) {
      if (this.props.checked) {
        if (this.props.choice.answer === true) {
          quizClassName += " questionC2T";
        } else {
          quizClassName += " questionC2F";
        }
      } else if (this.props.choice.answer === true) {
        quizClassName += " questionC2T";
      }
    }
    if (this.props.tipo === 1) {
      return (<div className="question_choice">
        <div className="questionC1">
          <input type="checkbox" checked={this.props.checked} onChange={() => this.props.handleChange(this.props.choice)} disabled={showCorrection}/>
        </div>
        <div className={quizClassName}>
          {this.props.choice.value.primero}<sup>{this.props.choice.value.segundo}</sup>{"= "+this.props.choice.value.tercero}
        </div>
      </div>);
    } else if (this.props.tipo === 2) {
      return (<div className="question_choice">
        <div className="questionC1">
          <input type="checkbox" checked={this.props.checked} onChange={() => this.props.handleChange(this.props.choice)} disabled={showCorrection}/>
        </div>
        <div className={quizClassName}>
          <sup>{this.props.choice.value.primero}</sup>{"√"+this.props.choice.value.segundo+"="+this.props.choice.value.tercero}
        </div>
      </div>);
    } else if (this.props.tipo === 3) {
      return (<div className="question_choice">
        <div className="questionC1">
          <input type="checkbox" checked={this.props.checked} onChange={() => this.props.handleChange(this.props.choice)} disabled={showCorrection}/>
        </div>
        <div className={quizClassName}>
          Log<sub>{this.props.choice.value.primero}</sub>({this.props.choice.value.segundo})={this.props.choice.value.tercero}</div>
      </div>);
    } else {
      return (<div className="question_choice">
        <div className="questionC1">
          <input type="checkbox" checked={this.props.checked} onChange={() => this.props.handleChange(this.props.choice)} disabled={showCorrection}/>
        </div>
        <div className={quizClassName}>
          <div>{this.props.choice.value}</div>
        </div>
      </div>);
    }
  }
}
