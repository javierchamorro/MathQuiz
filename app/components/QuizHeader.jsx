import React from 'react';
import * as SAMPLES from '../config/samples.js';
import {GLOBAL_CONFIG} from '../config/config.js';

export default class QuizHeader extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="quizHeader">
        <div className="info">{this.props.I18n.getTrans("i.quiz_header_title", {current:SAMPLES.pregunta, total:GLOBAL_CONFIG.n})}</div>
      </div>
    );
  }
}