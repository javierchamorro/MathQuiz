import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import Barra from 'react-progressbar';

export default class Temporizador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsRemaining: 0,
      seconds : 0
    };
    this.tick = this.tick.bind(this);
  };

  tick() {
    this.setState({
      secondsRemaining: this.state.secondsRemaining - 0.1
    });
    if (this.state.secondsRemaining <= 0) {
      clearInterval(this.interval);
      this.tiempoAgotado();
    }
  };

  componentDidMount() {
    this.setState({secondsRemaining: this.props.secondsRemaining});
    this.setState({seconds:this.props.secondsRemaining});

    this.interval = setInterval(this.tick, 100);
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval)
  // };

  tiempoAgotado() {
    this.props.onAnswerQuiz();
  };

  render() {
    return (<div>

      <Barra completed={(this.state.secondsRemaining/this.state.seconds)*100}/>
    </div>);
  }
}
