import React from 'react';

export default class Tipo2 extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let quizClassName = "questionC2";
    let showCorrection = (this.props.quizAnswered);
    if(showCorrection){
      if(this.props.checked){
        if(this.props.choice.answer === true){
          quizClassName += " questionC2T";
        } else {
          quizClassName += " questionC2F";
        }
      } else if(this.props.choice.answer === true){
        quizClassName += " questionC2T";
      }
    }
    return (<div className="question_choice">
      <div className="questionC1">
        <input type="radio" checked={this.props.checked} onChange={() => this.props.handleChange(this.props.choice)} disabled={showCorrection}/>
      </div>
      <div className={quizClassName}>
        <div>{this.props.choice.value}</div>
      </div>
    </div>);
  }
}