import React from 'react';
import './../assets/scss/quiz.scss';

import {GLOBAL_CONFIG} from '../config/config.js';
import * as Utils from '../vendors/Utils.js';
import {addObjectives, objectiveAccomplished, objectiveAccomplishedThunk,resetObjectives} from './../reducers/actions';

import SumaResta from './SumaResta.jsx';
import MultiplicacionDivision from './MultiplicacionDivision.jsx';
import RaicesElevados from './RaicesElevados.jsx';
import Logaritmos from './Logaritmos.jsx';
import QuizHeader from './QuizHeader.jsx';

import * as SAMPLES from '../config/samples.js';

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    var difficulty;
    var progresivo=false;
      if (this.props.user_profile.learner_preference.difficulty === 9) {
        difficulty = Math.floor(Math.random() * 9);
      } else {
        difficulty = this.props.user_profile.learner_preference.difficulty;
      }
    if (this.props.user_profile.learner_preference.difficulty > 9 || this.props.user_profile.learner_preference.difficulty < 0 || typeof this.props.user_profile.learner_preference.difficulty !== "number") {
        progresivo = true
        difficulty = Math.floor(Math.random() * 7);
    }

    this.state = {
      difficulty: difficulty,
      progresivo: progresivo,
      contador: 0
    };
  }

  onReset(correct) {
    if (this.state.progresivo) {
      console.log("progresivo");
      var contador=this.state.contador;
      if (correct) {
        contador ++;
      } else {
        contador=0;
      }
      this.setState({contador: contador});

      if (contador === GLOBAL_CONFIG.progresivo) {
        var difficulty = this.state.difficulty + 1;
        this.setState({difficulty: difficulty});
        this.setState({contador: 0});
      }
    } else {
      if (this.props.user_profile.learner_preference.difficulty === 9) {
        this.setState({
          difficulty: Math.floor(Math.random() * 9)
        });
      } else {
        this.setState({difficulty: this.props.user_profile.learner_preference.difficulty});
      }
    }
  }

  onResetQuiz(){
    SAMPLES.pregunta = 1;
    this.props.dispatch(resetObjectives());

  }

  render() {

    if (this.props.user_profile) {
      if (typeof this.props.user_profile.learner_preference === "undefined" || typeof this.props.user_profile.learner_preference.difficulty === "undefined") {
        return (<h1>Esperando a que cargue el nivel</h1>)
      }
    }
    var pregunta;
    var difficulty=this.state.difficulty;

    // if (this.state.difficulty === "") {
    //   if (this.props.user_profile.learner_preference.difficulty === 9) {
    //     difficulty = Math.floor(Math.random() * 9);
    //     this.setState({difficulty: difficulty});
    //   } else {
    //     difficulty = this.props.user_profile.learner_preference.difficulty;
    //     this.setState({difficulty: difficulty});
    //   }
    // } else {
    //   difficulty = this.state.difficulty;
    // }
    // if (this.props.user_profile.learner_preference.difficulty > 9 || this.props.user_profile.learner_preference.difficulty < 0 || typeof this.props.user_profile.learner_preference.difficulty !== "number") {
    //   if (!this.state.progresivo) {
    //     this.setState({progresivo: true});
    //     difficulty = Math.floor(Math.random() * 7);
    //     this.setState({difficulty: difficulty});
    //   }
    // }
    console.log("difficulty: " + difficulty);
    switch (difficulty) {
      case 0:
        pregunta = 1;
        break;
      case 1:
        pregunta = 1;
        break;
      case 2:
        pregunta = 1;
        break;
      case 3:
        pregunta = 2;
        break;
      case 4:
        pregunta = 2;
        break;
      case 5:
        pregunta = 3;
        break;
      case 6:
        pregunta = 3;
        break;
      case 7:
        pregunta = 4;
        break;
      case 8:
        pregunta = 4;
        break;
      default:
        console.log("error");
    }
    switch (pregunta) {
      case 1:
        return (<div className="quiz">
          <QuizHeader I18n={this.props.I18n}/>
          <SumaResta className="pregunta" quiz={SAMPLES.preguntas1} difficulty={difficulty} datos={SAMPLES.SumaResta} dispatch={this.props.dispatch} tracking={this.props.tracking} onReset={this.onReset.bind(this)} onResetQuiz={this.onResetQuiz.bind(this)} I18n={this.props.I18n}/>
        </div>);
        break;
      case 2:
        return (<div className="quiz">
          <QuizHeader I18n={this.props.I18n}/>
          <MultiplicacionDivision className="pregunta" quiz={SAMPLES.preguntas1} difficulty={difficulty} datos={SAMPLES.MultiplicacionDivision} dispatch={this.props.dispatch} tracking={this.props.tracking} onReset={this.onReset.bind(this)} onResetQuiz={this.onResetQuiz.bind(this)} I18n={this.props.I18n}/>
        </div>);
        break;
      case 3:
        return (<div className="quiz">
          <QuizHeader I18n={this.props.I18n}/>
          <RaicesElevados className="pregunta" quiz={SAMPLES.preguntas2} difficulty={difficulty} datos={SAMPLES.RaicesElevados} dispatch={this.props.dispatch} tracking={this.props.tracking} onReset={this.onReset.bind(this)} onResetQuiz={this.onResetQuiz.bind(this)} I18n={this.props.I18n}/>
        </div>);
        break;
      case 4:
        return (<div className="quiz">
          <QuizHeader I18n={this.props.I18n}/>
          <Logaritmos className="pregunta" quiz={SAMPLES.preguntas2} difficulty={difficulty} datos={SAMPLES.Logaritmos} dispatch={this.props.dispatch} tracking={this.props.tracking} onReset={this.onReset.bind(this)} onResetQuiz={this.onResetQuiz.bind(this)} I18n={this.props.I18n}/>
        </div>);
        break;
      default:
        console.log("error");

    }
  }
}
