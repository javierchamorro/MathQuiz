import React from 'react';

import {GLOBAL_CONFIG} from '../config/config.js';
import * as Utils from '../vendors/Utils.js';
import {addObjectives, objectiveAccomplished, objectiveAccomplishedThunk, resetObjectives} from './../reducers/actions';

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
    var progresivo = false;
    var aleatorio = Math.random();
    //El nivel 9 es un modo aleatorio
    if (this.props.user_profile.learner_preference.difficulty === 9) {
      difficulty = Math.floor(Math.random() * 9);
    } else {
      difficulty = this.props.user_profile.learner_preference.difficulty;
    }
    //Si no se pasa ningun valor se pondra automaticamente el modo progresivo
    if (this.props.user_profile.learner_preference.difficulty > 9 || this.props.user_profile.learner_preference.difficulty < 0 || typeof this.props.user_profile.learner_preference.difficulty !== "number") {
      progresivo = true
      difficulty = Math.floor(Math.random() * 9);
    }

    this.state = {
      difficulty: difficulty,
      progresivo: progresivo,
      contadorCorrectas: 0,
      contadorFalladas: 0,
      aleatorio: aleatorio
    };
  }

  onReset(correct) {
    if (this.state.progresivo) {
      console.log("progresivo");
      var contadorCorrectas = this.state.contadorCorrectas;
      var contadorFalladas = this.state.contadorFalladas;
      if (correct) {
        if (this.state.difficulty === 8) {
          return;
        }
        contadorCorrectas++;
        contadorFalladas = 0;
      } else {
        if (this.state.difficulty === 0) {
          return;
        }
        contadorFalladas++;
        contadorCorrectas = 0;
      }
      this.setState({contadorCorrectas: contadorCorrectas});
      this.setState({contadorFalladas: contadorFalladas});
      if (contadorCorrectas === GLOBAL_CONFIG.progresivo) {
        var difficulty = this.state.difficulty + 1;
        SAMPLES.difficulty = difficulty;
        this.setState({difficulty: difficulty});
        this.setState({contadorCorrectas: 0});
      }
      if (contadorFalladas === GLOBAL_CONFIG.progresivo) {
        var difficulty = this.state.difficulty - 1;
        SAMPLES.difficulty = difficulty;
        this.setState({difficulty: difficulty});
        this.setState({contadorFalladas: 0});
      }
    } else {
      if (this.props.user_profile.learner_preference.difficulty === 9) {
        this.setState({
          difficulty: Math.floor(Math.random() * 9)
        });
        this.setState({aleatorio: Math.random()});
      } else {
        this.setState({difficulty: this.props.user_profile.learner_preference.difficulty});
        this.setState({aleatorio: Math.random()});
      }
    }
  }

  onResetQuiz() {
    SAMPLES.pregunta = 1;
    this.props.dispatch(resetObjectives());
    this.setState({aleatorio: Math.random()});
  }

  render() {

    // if (this.props.user_profile) {
    //   if (typeof this.props.user_profile.learner_preference === "undefined" || typeof this.props.user_profile.learner_preference.difficulty === "undefined") {
    //     return (<h1>Esperando a que cargue el nivel</h1>)
    //   }
    // }
    var pregunta;
    var difficulty = this.state.difficulty;
    SAMPLES.difficulty = this.state.difficulty;
    switch (difficulty) {
      case 0:
        if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel0.SumaResta) {
          pregunta = 1;
        } else if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel0.SumaResta + GLOBAL_CONFIG.prob_dif.nivel0.MultiplicacionDivision) {
          pregunta = 2;
        } else if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel0.SumaResta + GLOBAL_CONFIG.prob_dif.nivel0.MultiplicacionDivision + GLOBAL_CONFIG.prob_dif.nivel0.RaicesElevados) {
          pregunta = 3;
        } else {
          pregunta = 4;
        }
        break;
      case 1:
        if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel1.SumaResta) {
          pregunta = 1;
        } else if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel1.SumaResta + GLOBAL_CONFIG.prob_dif.nivel1.MultiplicacionDivision) {
          pregunta = 2;
        } else if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel1.SumaResta + GLOBAL_CONFIG.prob_dif.nivel1.MultiplicacionDivision + GLOBAL_CONFIG.prob_dif.nivel1.RaicesElevados) {
          pregunta = 3;
        } else {
          pregunta = 4;
        }
        break;
      case 2:
        if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel2.SumaResta) {
          pregunta = 1;
        } else if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel2.SumaResta + GLOBAL_CONFIG.prob_dif.nivel2.MultiplicacionDivision) {
          pregunta = 2;
        } else if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel2.SumaResta + GLOBAL_CONFIG.prob_dif.nivel2.MultiplicacionDivision + GLOBAL_CONFIG.prob_dif.nivel2.RaicesElevados) {
          pregunta = 3;
        } else {
          pregunta = 4;
        }
        break;
      case 3:
        if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel3.SumaResta) {
          pregunta = 1;
        } else if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel3.SumaResta + GLOBAL_CONFIG.prob_dif.nivel3.MultiplicacionDivision) {
          pregunta = 2;
        } else if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel3.SumaResta + GLOBAL_CONFIG.prob_dif.nivel3.MultiplicacionDivision + GLOBAL_CONFIG.prob_dif.nivel3.RaicesElevados) {
          pregunta = 3;
        } else {
          pregunta = 4;
        }
        break;
      case 4:
        if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel4.SumaResta) {
          pregunta = 1;
        } else if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel4.SumaResta + GLOBAL_CONFIG.prob_dif.nivel4.MultiplicacionDivision) {
          pregunta = 2;
        } else if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel4.SumaResta + GLOBAL_CONFIG.prob_dif.nivel4.MultiplicacionDivision + GLOBAL_CONFIG.prob_dif.nivel4.RaicesElevados) {
          pregunta = 3;
        } else {
          pregunta = 4;
        }
        break;
      case 5:
        if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel5.SumaResta) {
          pregunta = 1;
        } else if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel5.SumaResta + GLOBAL_CONFIG.prob_dif.nivel5.MultiplicacionDivision) {
          pregunta = 2;
        } else if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel5.SumaResta + GLOBAL_CONFIG.prob_dif.nivel5.MultiplicacionDivision + GLOBAL_CONFIG.prob_dif.nivel5.RaicesElevados) {
          pregunta = 3;
        } else {
          pregunta = 4;
        }
        break;
      case 6:
        if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel6.SumaResta) {
          pregunta = 1;
        } else if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel6.SumaResta + GLOBAL_CONFIG.prob_dif.nivel6.MultiplicacionDivision) {
          pregunta = 2;
        } else if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel6.SumaResta + GLOBAL_CONFIG.prob_dif.nivel6.MultiplicacionDivision + GLOBAL_CONFIG.prob_dif.nivel6.RaicesElevados) {
          pregunta = 3;
        } else {
          pregunta = 4;
        }
        break;
      case 7:
        if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel7.SumaResta) {
          pregunta = 1;
        } else if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel7.SumaResta + GLOBAL_CONFIG.prob_dif.nivel7.MultiplicacionDivision) {
          pregunta = 2;
        } else if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel7.SumaResta + GLOBAL_CONFIG.prob_dif.nivel7.MultiplicacionDivision + GLOBAL_CONFIG.prob_dif.nivel7.RaicesElevados) {
          pregunta = 3;
        } else {
          pregunta = 4;
        }
        break;
      case 8:
        if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel8.SumaResta) {
          pregunta = 1;
        } else if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel8.SumaResta + GLOBAL_CONFIG.prob_dif.nivel8.MultiplicacionDivision) {
          pregunta = 2;
        } else if (this.state.aleatorio < GLOBAL_CONFIG.prob_dif.nivel8.SumaResta + GLOBAL_CONFIG.prob_dif.nivel8.MultiplicacionDivision + GLOBAL_CONFIG.prob_dif.nivel8.RaicesElevados) {
          pregunta = 3;
        } else {
          pregunta = 4;
        }
        break;
      default:
        console.log("error");
    }
    switch (pregunta) {
      case 1:
        return (<div className="quiz">
          <div className="numeroPregunta">
            <QuizHeader I18n={this.props.I18n}/>
          </div>
          <SumaResta className="pregunta" quiz={SAMPLES.preguntas1} difficulty={difficulty} datos={SAMPLES.SumaResta} dispatch={this.props.dispatch} tracking={this.props.tracking} onReset={this.onReset.bind(this)} onResetQuiz={this.onResetQuiz.bind(this)} I18n={this.props.I18n}/>
        </div>);
        break;
      case 2:
        return (<div className="quiz">
          <div className="numeroPregunta">
            <QuizHeader I18n={this.props.I18n}/>
          </div>
          <MultiplicacionDivision className="pregunta" quiz={SAMPLES.preguntas1} difficulty={difficulty} datos={SAMPLES.MultiplicacionDivision} dispatch={this.props.dispatch} tracking={this.props.tracking} onReset={this.onReset.bind(this)} onResetQuiz={this.onResetQuiz.bind(this)} I18n={this.props.I18n}/>
        </div>);
        break;
      case 3:
        return (<div className="quiz">
          <div className="numeroPregunta">
            <QuizHeader I18n={this.props.I18n}/>
          </div>
          <RaicesElevados className="pregunta" quiz={SAMPLES.preguntas2} difficulty={difficulty} datos={SAMPLES.RaicesElevados} dispatch={this.props.dispatch} tracking={this.props.tracking} onReset={this.onReset.bind(this)} onResetQuiz={this.onResetQuiz.bind(this)} I18n={this.props.I18n}/>
        </div>);
        break;
      case 4:
        return (<div className="quiz">
          <div className="numeroPregunta">
            <QuizHeader I18n={this.props.I18n}/>
          </div>
          <Logaritmos className="pregunta" quiz={SAMPLES.preguntas2} difficulty={difficulty} datos={SAMPLES.Logaritmos} dispatch={this.props.dispatch} tracking={this.props.tracking} onReset={this.onReset.bind(this)} onResetQuiz={this.onResetQuiz.bind(this)} I18n={this.props.I18n}/>
        </div>);
        break;
      default:
        console.log("error");

    }
  }
}
