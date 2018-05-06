import React from 'react';
import './../assets/scss/bootstrap.min.scss';

import {ProgressBar} from 'react-bootstrap';
import Barra from 'react-progressbar';

export default class Temporizador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsRemaining: 0,
      secondsRemainingPB:0,
      seconds: 0,
    };
    this.tick = this.tick.bind(this);
  };

  tick() {
    this.setState({
      secondsRemaining: this.state.secondsRemaining - 0.05
    });
    this.setState({
      secondsRemainingPB: this.state.secondsRemainingPB - 0.05
    });
    if (this.state.secondsRemaining + 0.5 <= 0) {
      clearInterval(this.interval);
      this.tiempoAgotado();
    }
  };

  componentDidMount() {
    this.setState({secondsRemaining: this.props.secondsRemaining});
    this.setState({seconds: this.props.secondsRemaining});
    this.setState({secondsRemainingPB: this.props.secondsRemaining});

    this.interval = setInterval(this.tick, 50);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.setState({secondsRemaining: this.state.seconds});
  };

  tiempoAgotado() {
    this.props.onAnswerQuiz();
    this.setState({secondsRemaining: this.state.seconds});
  };

  render() {
    var segundos = Math.ceil(this.state.secondsRemainingPB);

    return (<div className="progressBar">
      <ProgressBar bsStyle="info" now={(this.state.secondsRemainingPB / this.state.seconds) * 100} label={`${segundos}s`}/>
    </div>);
  }
}
