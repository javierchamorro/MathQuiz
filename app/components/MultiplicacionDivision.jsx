import React from 'react';

import * as SAMPLES from '../config/samples.js';
import {GLOBAL_CONFIG} from '../config/config.js';
import * as Utils from '../vendors/Utils.js';
import {addObjectives, objectiveAccomplished, objectiveAccomplishedThunk, finishApp} from './../reducers/actions';

import Tipo1 from './Tipo1.jsx';
import Tipo2 from './Tipo2.jsx';
import QuestionButtons from './QuestionButtons.jsx';
import Temporizador from './Temporizador.jsx';

export default class MultiplicacionDivision extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected_choices_ids:[],
      option:"",
      input_answer:"",
      answered:false,
      tipo:"",
      correct:false,
    };
  }
  componentDidMount(){
    SAMPLES.preguntas1.answered = false;
    this.elegirTipo();
  }

  elegirTipo(){
    let objective = new Utils.Objective({
      id:"MyQuiz" + SAMPLES.pregunta,
      progress_measure:1 / GLOBAL_CONFIG.n,
      score:1 / GLOBAL_CONFIG.n,
    });
    let tipo = 0;
    if(GLOBAL_CONFIG.tipo.tipo1 || GLOBAL_CONFIG.tipo.tipo2 || GLOBAL_CONFIG.tipo.tipo3){
      do {
        tipo = Math.floor(Math.random() * 3);
      } while((tipo === 0 && !GLOBAL_CONFIG.tipo.tipo1) || (tipo === 1 && !GLOBAL_CONFIG.tipo.tipo2) || (tipo === 2 && !GLOBAL_CONFIG.tipo.tipo3));
    }
    this.props.dispatch(addObjectives([objective]));
    this.setState({tipo:tipo});
    switch (tipo){
    case 0:
      this.crearPregunta1();
      break;
    case 1:
      this.crearPregunta2();
      break;
    case 2:
      this.crearPregunta3();
      break;
    default:
      console.log("error");
    }
  }

  handleMultiChoiceChange(choice){
    let newSelectedChoices = Object.assign([], this.state.selected_choices_ids);
    let indexOf = newSelectedChoices.indexOf(choice.id);
    if(indexOf === -1){
      newSelectedChoices.push(choice.id);
    } else {
      newSelectedChoices.splice(indexOf, 1);
    }
    this.setState({selected_choices_ids:newSelectedChoices});
  }
  handleOneChoiceChange(choice){
    this.setState({option:choice.id});
  }
  handleInputChange(valor){
    let v = + valor.target.value;
    this.setState({input_answer:v});
  }
  onAnswerQuiz(){
    let scorePercentage;
    switch (this.state.tipo){
    case 0:
        // Calculate score
      let nChoices = SAMPLES.preguntas1.tipo1.choices.length;
      let correctAnswers = 0;
      let incorrectAnswers = 0;
      let blankAnswers = 0;

      for(let i = 0; i < nChoices; i++){
        let choice = SAMPLES.preguntas1.tipo1.choices[i];
        if(this.state.selected_choices_ids.indexOf(choice.id) !== -1){
            // Answered choice
          if(choice.answer === true){
            correctAnswers += 1;
          } else {
            incorrectAnswers += 1;
          }
        } else {
          blankAnswers += 1;
        }
      }
      scorePercentage = Math.max(0, (correctAnswers - incorrectAnswers) / SAMPLES.preguntas1.tipo1.choices.filter(function(c){
        return c.answer === true;
      }).length);

      break;
    case 1:
      if(this.state.option === "" || SAMPLES.preguntas1.tipo2.choices[this.state.option].answer === false){
        scorePercentage = 0;
      } else {
        scorePercentage = 1;
      }
      break;
    case 2:
      if(SAMPLES.preguntas1.tipo3.answer === this.state.input_answer){
        scorePercentage = 1;
      } else {
        scorePercentage = 0;
      }
      break;
    default:
      console.log("error");
    }

    // Send data via SCORM
    let objective = this.props.tracking.objectives["MyQuiz" + SAMPLES.pregunta];
    this.props.dispatch(objectiveAccomplished(objective.id, objective.score * scorePercentage));
    // this.props.dispatch(objectiveAccomplishedThunk(objective.id, objective.score * scorePercentage));
    if(scorePercentage === 1){
      this.setState({correct:true});
    } else {
      this.setState({correct:false});
    }
    // Mark quiz as answered
    this.setState({answered:true});
    if(GLOBAL_CONFIG.progressBar){
      this.refs.contador.componentWillUnmount();
    }

  }

  onResetQuestion(){
    this.setState({selected_choices_ids:[], answered:false, option:"", input_answer:""});
    if(GLOBAL_CONFIG.progressBar){
      this.refs.contador.componentDidMount();
    }
  }

  onNextQuiz(){
    if(SAMPLES.pregunta === GLOBAL_CONFIG.n){
      this.props.dispatch(finishApp(true));
    }
    SAMPLES.pregunta++;
    this.setState({selected_choices_ids:[], answered:false, option:"", input_answer:""});
    this.setState({option:""});
    SAMPLES.preguntas1.answered = true;
    this.props.onReset(this.state.correct);
    this.elegirTipo();
  }
  onResetQuiz(){
    this.setState({selected_choices_ids:[], answered:false, option:"", input_answer:""});
    this.setState({option:""});
    SAMPLES.preguntas1.answered = true;
    this.props.onReset(this.state.correct);
    this.elegirTipo();
    this.props.onResetQuiz();
  }

  crearPregunta1(){
    let verdaderas = 0;
    for(let i = 0; i < SAMPLES.preguntas1.tipo1.choices.length; i++){
      let vf = Math.floor((Math.random() * 2) + 1);
      if(vf === 1){
        SAMPLES.preguntas1.tipo1.choices[i].answer = false;
        this.generarNumerosYOperadores();
        this.resultadoF();
      } else {
        SAMPLES.preguntas1.tipo1.choices[i].answer = true;
        this.generarNumerosYOperadores();
        this.resultadoV();
        verdaderas++;
      }
      SAMPLES.preguntas1.tipo1.choices[i].value = SAMPLES.MultiplicacionDivision.primerNum + " " + SAMPLES.MultiplicacionDivision.operador + " " + SAMPLES.MultiplicacionDivision.impsegundNum + " = " + SAMPLES.MultiplicacionDivision.resultado;
    }
    if(verdaderas === 0){
      let i = Math.floor(Math.random() * SAMPLES.preguntas1.tipo1.choices.length);
      SAMPLES.preguntas1.tipo1.choices[i].answer = true;
      this.generarNumerosYOperadores();
      this.resultadoV();
      SAMPLES.preguntas1.tipo1.choices[i].value = SAMPLES.MultiplicacionDivision.primerNum + " " + SAMPLES.MultiplicacionDivision.operador + " " + SAMPLES.MultiplicacionDivision.impsegundNum + " = " + SAMPLES.MultiplicacionDivision.resultado;
    }
  }
  crearPregunta2(){
    this.generarNumerosYOperadores();
    for(let i = 0; i < SAMPLES.preguntas1.tipo2.choices.length; i++){
      SAMPLES.preguntas1.tipo2.choices[i].answer = false;
      this.resultadoF();
      SAMPLES.preguntas1.tipo2.choices[i].value = + SAMPLES.MultiplicacionDivision.resultado;
    }
    let i = Math.floor(Math.random() * SAMPLES.preguntas1.tipo2.choices.length);
    SAMPLES.preguntas1.tipo2.choices[i].answer = true;
    this.resultadoV();
    SAMPLES.preguntas1.tipo2.choices[i].value = + SAMPLES.MultiplicacionDivision.resultado;
    SAMPLES.preguntas1.tipo2.value = "¿Cuánto es " + SAMPLES.MultiplicacionDivision.primerNum + " " + SAMPLES.MultiplicacionDivision.operador + " " + SAMPLES.MultiplicacionDivision.impsegundNum + "?";
    for(let i = 0; i < SAMPLES.preguntas1.tipo2.choices.length; i++){
      for(let j = 0; j < SAMPLES.preguntas1.tipo2.choices.length; j++){
        if(i !== j){
          let h = 0;
          while(SAMPLES.preguntas1.tipo2.choices[i].value === SAMPLES.preguntas1.tipo2.choices[j].value){
            this.resultadoF();
            SAMPLES.preguntas1.tipo2.choices[i].value = + SAMPLES.MultiplicacionDivision.resultado;
            h++;
            if(h > 3000){
              alert("MultiplicacionDivision1: Esta línea no debería ejecutarse nunca.");
              break;
            }
            i = 0;
            j = 0;
            break;
          }
        }
      }
    }
  }
  crearPregunta3(){
    this.generarNumerosYOperadores();
    this.resultadoV();
    SAMPLES.preguntas1.tipo3.answer = SAMPLES.MultiplicacionDivision.resultado;
    SAMPLES.preguntas1.tipo3.value = "¿Cuánto es " + SAMPLES.MultiplicacionDivision.primerNum + " " + SAMPLES.MultiplicacionDivision.operador + " " + SAMPLES.MultiplicacionDivision.impsegundNum + "?";
  }

  generarNumerosYOperadores(){
    let operador;
    let simbolo1;
    let simbolo2;
    let resultado;
    let p1;

    if(this.props.difficulty < 4){
      operador = Math.floor((Math.random() * 2) + 1);
      simbolo1 = Math.floor((Math.random() * 2) + 1);
      simbolo2 = Math.floor((Math.random() * 2) + 1);
      p1 = 10;
    } else {
      operador = Math.floor((Math.random() * 2) + 1);
      simbolo1 = Math.floor((Math.random() * 2) + 1);
      simbolo2 = Math.floor((Math.random() * 2) + 1);
      p1 = 100;
    }
    if(operador === 1){
      SAMPLES.MultiplicacionDivision.operador = "×";
      if(simbolo1 === 1){
        SAMPLES.MultiplicacionDivision.primerNum = Math.floor((Math.random() * p1) + 1);
      } else {
        SAMPLES.MultiplicacionDivision.primerNum = -Math.floor((Math.random() * p1) + 1);
      }
      if(simbolo2 === 1){
        SAMPLES.MultiplicacionDivision.segundNum = Math.floor((Math.random() * 10) + 1);
        SAMPLES.MultiplicacionDivision.impsegundNum = SAMPLES.MultiplicacionDivision.segundNum;
      } else {
        SAMPLES.MultiplicacionDivision.segundNum = -Math.floor((Math.random() * 10) + 1);
        SAMPLES.MultiplicacionDivision.impsegundNum = "(" + SAMPLES.MultiplicacionDivision.segundNum + ")";
      }
    } else {
      SAMPLES.MultiplicacionDivision.operador = "/";
      if(simbolo1 === 1){
        resultado = Math.floor((Math.random() * p1) + 1);
      } else {
        resultado = -Math.floor((Math.random() * p1) + 1);
      }
      if(simbolo2 === 1){
        SAMPLES.MultiplicacionDivision.segundNum = Math.floor((Math.random() * 10) + 1);
        SAMPLES.MultiplicacionDivision.impsegundNum = SAMPLES.MultiplicacionDivision.segundNum;
      } else {
        SAMPLES.MultiplicacionDivision.segundNum = -Math.floor((Math.random() * 10) + 1);
        SAMPLES.MultiplicacionDivision.impsegundNum = "(" + SAMPLES.MultiplicacionDivision.segundNum + ")";
      }
      SAMPLES.MultiplicacionDivision.primerNum = resultado * SAMPLES.MultiplicacionDivision.segundNum;
    }
  }
  resultadoV(){
    if(SAMPLES.MultiplicacionDivision.operador === "×"){
      SAMPLES.MultiplicacionDivision.resultado = SAMPLES.MultiplicacionDivision.primerNum * SAMPLES.MultiplicacionDivision.segundNum;
    } else {
      SAMPLES.MultiplicacionDivision.resultado = SAMPLES.MultiplicacionDivision.primerNum / SAMPLES.MultiplicacionDivision.segundNum;
    }
  }
  resultadoF(){
    let resultadoV;
    let resultadoF;
    if(SAMPLES.MultiplicacionDivision.operador === "×"){
      resultadoV = SAMPLES.MultiplicacionDivision.primerNum * SAMPLES.MultiplicacionDivision.segundNum;
    } else {
      resultadoV = SAMPLES.MultiplicacionDivision.primerNum / SAMPLES.MultiplicacionDivision.segundNum;
    }
    resultadoF = Math.floor(resultadoV - 5 + (Math.random() * 10) + 1);
    let j = 0;
    while(resultadoF === resultadoV){
      resultadoF = Math.floor(resultadoV - 5 + (Math.random() * 10) + 1);
      j++;
      if(j > 3000){
        alert("MultiplicacionDivision1: Esta línea no debería ejecutarse nunca.");
        resultadoF = resultadoV + 1;
        break;
      }
    }

    SAMPLES.MultiplicacionDivision.resultado = resultadoF;

  }

  render(){
    if(this.state.tipo === ""){
      return (<h1>Esperando a que cargue el nivel</h1>);
    }
    let isLastQuestion = (SAMPLES.pregunta === GLOBAL_CONFIG.n);
    let temporizador = [];
    if(GLOBAL_CONFIG.progressBar){
      temporizador.push(<Temporizador ref="contador" key={SAMPLES.pregunta} seconds={GLOBAL_CONFIG.temporizador} onAnswerQuiz={this.onAnswerQuiz.bind(this)}/>);
    }
    switch (this.state.tipo){
    case 0:
      let choices1 = [];
      for(let i = 0; i < SAMPLES.preguntas1.tipo1.choices.length; i++){
        choices1.push(<Tipo1 key={"MyQuiz_" + "quiz_choice_" + i} choice={SAMPLES.preguntas1.tipo1.choices[i]} checked={this.state.selected_choices_ids.indexOf(SAMPLES.preguntas1.tipo1.choices[i].id) !== -1} handleChange={this.handleMultiChoiceChange.bind(this)} quizAnswered={this.state.answered} difficulty={this.props.difficulty}/>);
      }
      return (<div className="question">
          <div className="pregunta">
            <div className="textopregunta">{SAMPLES.preguntas1.tipo1.value}</div>
            <div className="respuestas">
              {choices1}
            </div>
            {temporizador}
          </div>
          <QuestionButtons I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuiz.bind(this)} onResetQuestion={this.onResetQuestion.bind(this)} onResetQuiz={this.onResetQuiz.bind(this)} onNextQuestion={this.onNextQuiz.bind(this)} answered={this.state.answered} quizCompleted={this.props.tracking.finished} allow_finish={isLastQuestion}/>
        </div>);
      break;
    case 1:
      let choices2 = [];
      for(let i = 0; i < SAMPLES.preguntas1.tipo2.choices.length; i++){
        choices2.push(<Tipo2 key={"MyQuiz_" + "quiz_choice_" + i} choice={SAMPLES.preguntas1.tipo2.choices[i]} checked={i === this.state.option} handleChange={this.handleOneChoiceChange.bind(this)} quizAnswered={this.state.answered} difficulty={this.props.difficulty}/>);
      }
      return (<div className="question">
          <div className="pregunta">
            <div className="textopregunta">{SAMPLES.preguntas1.tipo2.value}</div>
            <div className="respuestas">
              {choices2}
            </div>
            {temporizador}
          </div>
          <QuestionButtons I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuiz.bind(this)} onResetQuestion={this.onResetQuestion.bind(this)} onResetQuiz={this.onResetQuiz.bind(this)} onNextQuestion={this.onNextQuiz.bind(this)} answered={this.state.answered} quizCompleted={this.props.tracking.finished} allow_finish={isLastQuestion}/>
        </div>);
      break;
    case 2:
      var input = "";
      if(this.state.answered){
        if(this.state.input_answer === SAMPLES.preguntas1.tipo3.answer){
          input = (<input className="input_answerT" type="number" name="respuesta" disabled="true" onChange={this.handleInputChange.bind(this)} value={this.state.input_answer} />);
        } else {
          input = (<input className="input_answerF" type="number" name="respuesta" disabled="true" onChange={this.handleInputChange.bind(this)} value={this.state.input_answer} />);
        }
      } else {
        input = (<input type="number" name="respuesta" onChange={this.handleInputChange.bind(this)} value={this.state.input_answer} />);
      }
      return (<div className="question">
          <div className="pregunta">
            <div className="textopregunta">{SAMPLES.preguntas1.tipo3.value}</div>
            <div className="respuestas">
              <div className="question_choice">
                {input}
              </div>
            </div>
            {temporizador}
          </div>
          <QuestionButtons I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuiz.bind(this)} onResetQuestion={this.onResetQuestion.bind(this)} onResetQuiz={this.onResetQuiz.bind(this)} onNextQuestion={this.onNextQuiz.bind(this)} answered={this.state.answered} quizCompleted={this.props.tracking.finished} allow_finish={isLastQuestion}/>
        </div>);
      break;
    default:
      console.log("error");
    }
  }
}