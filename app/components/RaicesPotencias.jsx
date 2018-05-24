import React from 'react';

import * as SAMPLES from '../config/samples.js';
import {GLOBAL_CONFIG} from '../config/config.js';
import * as Utils from '../vendors/Utils.js';
import {addObjectives, objectiveAccomplished, objectiveAccomplishedThunk, finishApp} from './../reducers/actions';

import Tipo1 from './Tipo1.jsx';
import Tipo2 from './Tipo2.jsx';
import QuestionButtons from './QuestionButtons.jsx';
import Temporizador from './Temporizador.jsx';

export default class RaicesPotencias extends React.Component {
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
    SAMPLES.preguntas2.answered = false;
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
      let nChoices = SAMPLES.preguntas2.tipo1.choices.length;
      let correctAnswers = 0;
      let incorrectAnswers = 0;
      let blankAnswers = 0;

      for(let i = 0; i < nChoices; i++){
        let choice = SAMPLES.preguntas2.tipo1.choices[i];
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
      scorePercentage = Math.max(0, (correctAnswers - incorrectAnswers) / SAMPLES.preguntas2.tipo1.choices.filter(function(c){
        return c.answer === true;
      }).length);

      break;
    case 1:
      if(this.state.option === "" || SAMPLES.preguntas2.tipo2.choices[this.state.option].answer === false){
        scorePercentage = 0;
      } else {
        scorePercentage = 1;
      }
      break;
    case 2:
      if(SAMPLES.preguntas2.tipo3.answer === this.state.input_answer){
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
    SAMPLES.preguntas2.answered = true;
    this.props.onReset(this.state.correct);
    this.elegirTipo();
  }
  onResetQuiz(){
    this.setState({selected_choices_ids:[], answered:false, option:"", input_answer:""});
    this.setState({option:""});
    SAMPLES.preguntas2.answered = true;
    this.props.onReset(this.state.correct);
    this.elegirTipo();
    this.props.onResetQuiz();
  }

  crearPregunta1(){
    if(this.props.difficulty < 4){
      var verdaderas = 0;
      for(let i = 0; i < SAMPLES.preguntas2.tipo1.choices.length; i++){
        var vf = Math.floor((Math.random() * 2) + 1);
        if(vf === 1){
          SAMPLES.preguntas2.tipo1.choices[i].answer = false;
          this.generarNumerosYOperadores();
          this.resultadoF();
        } else {
          SAMPLES.preguntas2.tipo1.choices[i].answer = true;
          this.generarNumerosYOperadores();
          this.resultadoV();
          verdaderas++;
        }
        SAMPLES.preguntas2.tipo1.choices[i].value.primero = SAMPLES.RaicesPotencias.primerNum;
        SAMPLES.preguntas2.tipo1.choices[i].value.segundo = SAMPLES.RaicesPotencias.segundNum;
        SAMPLES.preguntas2.tipo1.choices[i].value.tercero = SAMPLES.RaicesPotencias.resultado;
      }
      if(verdaderas === 0){
        var i = Math.floor(Math.random() * SAMPLES.preguntas2.tipo1.choices.length);
        SAMPLES.preguntas2.tipo1.choices[i].answer = true;
        this.generarNumerosYOperadores();
        this.resultadoV();
        SAMPLES.preguntas2.tipo1.choices[i].value.primero = SAMPLES.RaicesPotencias.primerNum;
        SAMPLES.preguntas2.tipo1.choices[i].value.segundo = SAMPLES.RaicesPotencias.segundNum;
        SAMPLES.preguntas2.tipo1.choices[i].value.tercero = SAMPLES.RaicesPotencias.resultado;
      }
    } else {
      var verdaderas = 0;
      for(let i = 0; i < SAMPLES.preguntas2.tipo1.choices.length; i++){
        var vf = Math.floor((Math.random() * 2) + 1);
        if(vf === 1){
          SAMPLES.preguntas2.tipo1.choices[i].answer = false;
          this.generarNumerosYOperadores();
          this.resultadoF();
        } else {
          SAMPLES.preguntas2.tipo1.choices[i].answer = true;
          this.generarNumerosYOperadores();
          this.resultadoV();
          verdaderas++;
        }
        SAMPLES.preguntas2.tipo1.choices[i].value.primero = SAMPLES.RaicesPotencias.segundNum;
        SAMPLES.preguntas2.tipo1.choices[i].value.segundo = SAMPLES.RaicesPotencias.resultado;
        SAMPLES.preguntas2.tipo1.choices[i].value.tercero = SAMPLES.RaicesPotencias.primerNumF;
      }
      if(verdaderas === 0){
        var i = Math.floor(Math.random() * SAMPLES.preguntas2.tipo1.choices.length);
        SAMPLES.preguntas2.tipo1.choices[i].answer = true;
        this.generarNumerosYOperadores();
        this.resultadoV();
        SAMPLES.preguntas2.tipo1.choices[i].value.primero = SAMPLES.RaicesPotencias.segundNum;
        SAMPLES.preguntas2.tipo1.choices[i].value.segundo = SAMPLES.RaicesPotencias.resultado;
        SAMPLES.preguntas2.tipo1.choices[i].value.tercero = SAMPLES.RaicesPotencias.primerNumF;
      }
    }

  }
  crearPregunta2(){
    if(this.props.difficulty < 4){
      this.generarNumerosYOperadores();
      for(let i = 0; i < SAMPLES.preguntas2.tipo2.choices.length; i++){
        SAMPLES.preguntas2.tipo2.choices[i].answer = false;
        this.resultadoF();
        SAMPLES.preguntas2.tipo2.choices[i].value = + SAMPLES.RaicesPotencias.resultado;
      }
      var i = Math.floor(Math.random() * SAMPLES.preguntas2.tipo2.choices.length);
      SAMPLES.preguntas2.tipo2.choices[i].answer = true;
      this.resultadoV();
      SAMPLES.preguntas2.tipo2.choices[i].value = + SAMPLES.RaicesPotencias.resultado;
      SAMPLES.preguntas2.tipo2.value.primero = SAMPLES.RaicesPotencias.primerNum;
      SAMPLES.preguntas2.tipo2.value.segundo = SAMPLES.RaicesPotencias.segundNum;
    } else {
      this.generarNumerosYOperadores();
      for(let i = 0; i < SAMPLES.preguntas2.tipo2.choices.length; i++){
        SAMPLES.preguntas2.tipo2.choices[i].answer = false;
        this.resultadoF();
        SAMPLES.preguntas2.tipo2.choices[i].value = + SAMPLES.RaicesPotencias.primerNumF;
      }
      var i = Math.floor(Math.random() * SAMPLES.preguntas2.tipo2.choices.length);
      SAMPLES.preguntas2.tipo2.choices[i].answer = true;
      this.resultadoV();
      SAMPLES.preguntas2.tipo2.choices[i].value = + SAMPLES.RaicesPotencias.primerNumF;
      SAMPLES.preguntas2.tipo2.value.primero = SAMPLES.RaicesPotencias.segundNum;
      SAMPLES.preguntas2.tipo2.value.segundo = SAMPLES.RaicesPotencias.resultado;
    }
    for(let i = 0; i < SAMPLES.preguntas2.tipo2.choices.length; i++){
      for(let j = 0; j < SAMPLES.preguntas2.tipo2.choices.length; j++){
        if(i !== j){
          let h = 0;
          while(SAMPLES.preguntas2.tipo2.choices[i].value === SAMPLES.preguntas2.tipo2.choices[j].value){
            this.resultadoF();
            if(this.props.difficulty < 4){
              SAMPLES.preguntas2.tipo2.choices[i].value = + SAMPLES.RaicesPotencias.resultado;
            } else {
              SAMPLES.preguntas2.tipo2.choices[i].value = + SAMPLES.RaicesPotencias.primerNumF;
            }
            h++;
            if(h > 3000){
              alert("RaicesPotencias1: Esta línea no debería ejecutarse nunca.");
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
    if(this.props.difficulty < 4){
      SAMPLES.preguntas2.tipo3.value.primero = SAMPLES.RaicesPotencias.primerNum;
      SAMPLES.preguntas2.tipo3.value.segundo = SAMPLES.RaicesPotencias.segundNum;
      SAMPLES.preguntas2.tipo3.answer = SAMPLES.RaicesPotencias.resultado;
    } else {
      SAMPLES.preguntas2.tipo3.value.primero = SAMPLES.RaicesPotencias.segundNum;
      SAMPLES.preguntas2.tipo3.value.segundo = SAMPLES.RaicesPotencias.resultado;
      SAMPLES.preguntas2.tipo3.answer = SAMPLES.RaicesPotencias.primerNumF;
    }
  }

  genAux(){
    SAMPLES.RaicesPotencias.primerNum = Math.floor((Math.random() * 10) + 1);
    if(SAMPLES.RaicesPotencias.primerNum === 1){
      SAMPLES.RaicesPotencias.segundNum = Math.floor(Math.random() * 1001);
    } else if(SAMPLES.RaicesPotencias.primerNum === 2){
      SAMPLES.RaicesPotencias.segundNum = Math.floor(Math.random() * 13);
    } else if(SAMPLES.RaicesPotencias.primerNum === 3 || SAMPLES.RaicesPotencias.primerNum === 4 || SAMPLES.RaicesPotencias.primerNum === 10){
      SAMPLES.RaicesPotencias.segundNum = Math.floor(Math.random() * 7);
    } else if(SAMPLES.RaicesPotencias.primerNum === 5 || SAMPLES.RaicesPotencias.primerNum === 8){
      SAMPLES.RaicesPotencias.segundNum = Math.floor(Math.random() * 5);
    } else {
      SAMPLES.RaicesPotencias.segundNum = Math.floor(Math.random() * 4);
    }
  }
  generarNumerosYOperadores(){
    if(this.props.difficulty < 4){
      this.genAux();
    } else {
      let j = 0;
      do {
        j++;
        this.genAux();
        if(j > 3000){
          alert("RaicesPotencias1: Esta línea no debería ejecutarse nunca.");
          break;
        }
      } while(SAMPLES.RaicesPotencias.segundNum < 1);
    }
  }

  resultadoV(){
    SAMPLES.RaicesPotencias.resultado = Math.pow(SAMPLES.RaicesPotencias.primerNum, SAMPLES.RaicesPotencias.segundNum);
    SAMPLES.RaicesPotencias.primerNumF = SAMPLES.RaicesPotencias.primerNum;
  }
  resultadoF(){
    let resultadoV;
    let resultadoF;
    if(this.props.difficulty < 4){
      resultadoV = Math.pow(SAMPLES.RaicesPotencias.primerNum, SAMPLES.RaicesPotencias.segundNum);
      resultadoF = Math.floor(resultadoV - 5 + (Math.random() * 10) + 1);
      var j = 0;
      while(resultadoF === resultadoV){
        resultadoF = Math.floor(resultadoV - 5 + (Math.random() * 10) + 1);
        j++;
        if(j > 3000){
          alert("RaicesPotencias2: Esta línea no debería ejecutarse nunca.");
          resultadoF = resultadoV + 1;
          break;
        }
      }
      SAMPLES.RaicesPotencias.resultado = resultadoF;
    } else {
      resultadoV = Math.pow(SAMPLES.RaicesPotencias.primerNum, SAMPLES.RaicesPotencias.segundNum);
      SAMPLES.RaicesPotencias.primerNumF = Math.floor(SAMPLES.RaicesPotencias.primerNum - 5 + (Math.random() * 10) + 1);
      var j = 0;
      while(SAMPLES.RaicesPotencias.primerNumF === SAMPLES.RaicesPotencias.primerNum || SAMPLES.RaicesPotencias.primerNumF < 1){
        SAMPLES.RaicesPotencias.primerNumF = Math.floor(SAMPLES.RaicesPotencias.primerNum - 5 + (Math.random() * 10) + 1);
        j++;
        if(j > 3000){
          alert("RaicesPotencias3: Esta línea no debería ejecutarse nunca.");
          resultadoF = resultadoV + 1;
          break;
        }
      }
      SAMPLES.RaicesPotencias.resultado = resultadoV;
    }
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
    let tipo;
    if(this.props.difficulty < 4){
      tipo = 1;
    } else {
      tipo = 2;
    }
    switch (this.state.tipo){
    case 0:
      let choices1 = [];
      for(let i = 0; i < SAMPLES.preguntas2.tipo1.choices.length; i++){
        choices1.push(<Tipo1 key={"MyQuiz_" + "quiz_choice_" + i} choice={SAMPLES.preguntas2.tipo1.choices[i]} checked={this.state.selected_choices_ids.indexOf(SAMPLES.preguntas2.tipo1.choices[i].id) !== -1} handleChange={this.handleMultiChoiceChange.bind(this)} quizAnswered={this.state.answered} tipo={tipo}/>);
      }
      return (<div className="question">
            <div className="pregunta">
              <div className="textopregunta">{SAMPLES.preguntas2.tipo1.value}</div>
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
      for(let i = 0; i < SAMPLES.preguntas2.tipo2.choices.length; i++){
        choices2.push(<Tipo2 key={"MyQuiz_" + "quiz_choice_" + i} choice={SAMPLES.preguntas2.tipo2.choices[i]} checked={i === this.state.option} handleChange={this.handleOneChoiceChange.bind(this)} quizAnswered={this.state.answered} tipo={tipo}/>);
      }
      if(this.props.difficulty < 4){
        return (<div className="question">
              <div className="pregunta">
                <div className="textopregunta">¿Cuánto es {SAMPLES.preguntas2.tipo2.value.primero}<sup>{SAMPLES.preguntas2.tipo2.value.segundo}</sup>?</div>
                <div className="respuestas">
                  {choices2}
                </div>
                {temporizador}
              </div>
              <QuestionButtons I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuiz.bind(this)} onResetQuestion={this.onResetQuestion.bind(this)} onResetQuiz={this.onResetQuiz.bind(this)} onNextQuestion={this.onNextQuiz.bind(this)} answered={this.state.answered} quizCompleted={this.props.tracking.finished} allow_finish={isLastQuestion}/>
            </div>);
      }
      return (<div className="question">
              <div className="pregunta">
                <div className="textopregunta">¿Cuánto es
                  <sup>{SAMPLES.preguntas2.tipo2.value.primero}</sup>√{SAMPLES.preguntas2.tipo2.value.segundo}
                  ?</div>
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
        if(this.state.input_answer === SAMPLES.preguntas2.tipo3.answer){
          input = (<input className="input_answerT" type="number" name="respuesta" disabled="true" onChange={this.handleInputChange.bind(this)} value={this.state.input_answer} />);
        } else {
          input = (<input className="input_answerF" type="number" name="respuesta" disabled="true" onChange={this.handleInputChange.bind(this)} value={this.state.input_answer} />);
        }
      } else {
        input = (<input type="number" name="respuesta" onChange={this.handleInputChange.bind(this)} value={this.state.input_answer} />);
      }
      if(this.props.difficulty < 4){
        return (<div className="question">
              <div className="pregunta">
                <div className="textopregunta">¿Cuánto es {SAMPLES.preguntas2.tipo3.value.primero}<sup>{SAMPLES.preguntas2.tipo3.value.segundo}</sup>?</div>
                <div className="respuestas">
                  <div className="question_choice">
                    {input}
                  </div>
                </div>
                {temporizador}
              </div>
              <QuestionButtons I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuiz.bind(this)} onResetQuestion={this.onResetQuestion.bind(this)} onResetQuiz={this.onResetQuiz.bind(this)} onNextQuestion={this.onNextQuiz.bind(this)} answered={this.state.answered} quizCompleted={this.props.tracking.finished} allow_finish={isLastQuestion}/>
            </div>);
      }
      return (<div className="question">
              <div className="pregunta">
                <div className="textopregunta">¿Cuánto es
                  <sup>{SAMPLES.preguntas2.tipo3.value.primero}</sup>√{SAMPLES.preguntas2.tipo3.value.segundo}
                  ?</div>
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
