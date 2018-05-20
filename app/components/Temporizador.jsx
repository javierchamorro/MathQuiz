import React from 'react';
import './../assets/scss/bootstrap.min.scss';

import {ProgressBar} from 'react-bootstrap';
import Barra from 'react-progressbar';

const timerTime = 200;
let timer;

export default class Temporizador extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      seconds:this.props.seconds,
      secondsRemaining:this.props.seconds,
      value:100,
    };
    this.tick = this.tick.bind(this);
  }

  tick(){
    let newSecondsRemaining = (this.state.secondsRemaining - timerTime / 1000);
    this.setState({
      secondsRemaining:newSecondsRemaining,
      value:((newSecondsRemaining) / this.state.seconds) * 100,
    });
    if(this.state.secondsRemaining + 0.5 <= 0){
      clearInterval(timer);
      this.tiempoAgotado();
    }
  }

  componentDidMount(){
    this.setState({value:100, secondsRemaining:this.state.seconds});
    if(this.state.value !== 100){
      setTimeout(function(){
        timer = setInterval(this.tick, timerTime);
      }.bind(this), 500);
    } else {
      timer = setInterval(this.tick, timerTime);
    }
  }

  componentWillUnmount(){
    clearInterval(timer);

  }

  tiempoAgotado(){

    this.props.onAnswerQuiz();
  }

  render(){
    return (<div className="progressBar">
      <ProgressBar bsStyle="info" now={this.state.value}/>
    </div>);
  }
}