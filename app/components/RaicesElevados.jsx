import React from 'react';
import './../assets/scss/quiz.scss';

import * as SAMPLES from '../config/samples.js';
import {GLOBAL_CONFIG} from '../config/config.js';
import * as Utils from '../vendors/Utils.js';
import {addObjectives, objectiveAccomplished, objectiveAccomplishedThunk, finishApp} from './../reducers/actions';

import Tipo1 from './Tipo1.jsx';
import Tipo2 from './Tipo2.jsx';
import QuestionButtons from './QuestionButtons.jsx';
import Temporizador from './Temporizador.jsx';


export default class RaicesElevados extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_choices_ids: [],
      option: "",
      input_answer: "",
      answered: false,
      tipo: "",
      correct: false
    };
  }
  componentDidMount() {
    this.props.quiz.answered = false;
    this.elegirTipo();
  }

  elegirTipo() {
    let objective = new Utils.Objective({id: "MyQuiz"+SAMPLES.pregunta, progress_measure: 1/GLOBAL_CONFIG.n, score: 1/GLOBAL_CONFIG.n});
    this.props.dispatch(addObjectives([objective]));
    var tipo = Math.floor(Math.random() * 3);
    this.setState({tipo: tipo})
    switch (tipo) {
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

  handleMultiChoiceChange(choice) {
    let newSelectedChoices = Object.assign([], this.state.selected_choices_ids);
    let indexOf = newSelectedChoices.indexOf(choice.id);
    if (indexOf === -1) {
      newSelectedChoices.push(choice.id);
    } else {
      newSelectedChoices.splice(indexOf, 1);
    }
    this.setState({selected_choices_ids: newSelectedChoices});
  }
  handleOneChoiceChange(choice) {
    this.setState({option: choice.id});
  }
  handleInputChange(valor) {
    let v = + valor.target.value;
    this.setState({input_answer: v});
  }
  onAnswerQuiz() {
    let scorePercentage;
    switch (this.state.tipo) {
      case 0:
        // Calculate score
        let nChoices = this.props.quiz.tipo1.choices.length;
        let correctAnswers = 0;
        let incorrectAnswers = 0;
        let blankAnswers = 0;

        for (let i = 0; i < nChoices; i++) {
          let choice = this.props.quiz.tipo1.choices[i];
          if (this.state.selected_choices_ids.indexOf(choice.id) !== -1) {
            // Answered choice
            if (choice.answer === true) {
              correctAnswers += 1;
            } else {
              incorrectAnswers += 1;
            }
          } else {
            blankAnswers += 1;
          }
        }
        scorePercentage = Math.max(0, (correctAnswers - incorrectAnswers) / this.props.quiz.tipo1.choices.filter(function(c) {
          return c.answer === true;
        }).length);

        break;
      case 1:
        if (this.state.option === "" || this.props.quiz.tipo2.choices[this.state.option].answer === false) {
          scorePercentage = 0;
        } else {
          scorePercentage = 1;
        }
        break;
      case 2:
        if (this.props.quiz.tipo3.answer === this.state.input_answer) {
          scorePercentage = 1;
        } else {
          scorePercentage = 0;
        }
        break;
      default:
        console.log("error");
    }

    // Send data via SCORM
    let objective = this.props.tracking.objectives["MyQuiz"+SAMPLES.pregunta];
    this.props.dispatch(objectiveAccomplished(objective.id, objective.score * scorePercentage));
    // this.props.dispatch(objectiveAccomplishedThunk(objective.id, objective.score * scorePercentage));
    if (scorePercentage === 1) {
      this.setState({correct: true});
    } else {
      this.setState({correct: false});
    }
    // Mark quiz as answered
    this.setState({answered: true});
    this.refs.contador.componentWillUnmount()

  }

  onResetQuestion(){
    this.setState({selected_choices_ids:[], answered:false});
    this.refs.contador.componentDidMount();
  }

  onNextQuiz() {
    if(SAMPLES.pregunta===GLOBAL_CONFIG.n){
      this.props.dispatch(finishApp(true));
    }
    SAMPLES.pregunta++;
    this.setState({selected_choices_ids: [], answered: false});
    this.setState({option: ""});
    this.props.quiz.answered = true;
    this.props.onReset(this.state.correct);
    this.elegirTipo();
  }
  onResetQuiz(){
    this.setState({selected_choices_ids: [], answered: false});
    this.setState({option: ""});
    this.props.quiz.answered = true;
    this.props.onReset(this.state.correct);
    this.elegirTipo();
    this.props.onResetQuiz();
  }

  crearPregunta1() {
    if (this.props.difficulty < 4) {
      var verdaderas = 0;
      for (let i = 0; i < this.props.quiz.tipo1.choices.length; i++) {
        var vf = Math.floor((Math.random() * 2) + 1);
        if (vf === 1) {
          this.props.quiz.tipo1.choices[i].answer = false;
          this.generarNumerosYOperadores();
          this.resultadoF();
        } else {
          this.props.quiz.tipo1.choices[i].answer = true;
          this.generarNumerosYOperadores();
          this.resultadoV();
          verdaderas++;
        }
        this.props.quiz.tipo1.choices[i].value.primero = this.props.datos.primerNum;
        this.props.quiz.tipo1.choices[i].value.segundo = this.props.datos.segundNum;
        this.props.quiz.tipo1.choices[i].value.tercero = this.props.datos.resultado;
      }
      if (verdaderas === 0) {
        var i = Math.floor(Math.random() * this.props.quiz.tipo1.choices.length);
        this.props.quiz.tipo1.choices[i].answer = true;
        this.generarNumerosYOperadores();
        this.resultadoV();
        this.props.quiz.tipo1.choices[i].value.primero = this.props.datos.primerNum;
        this.props.quiz.tipo1.choices[i].value.segundo = this.props.datos.segundNum;
        this.props.quiz.tipo1.choices[i].value.tercero = this.props.datos.resultado;
      }
    } else {
      var verdaderas = 0;
      for (let i = 0; i < this.props.quiz.tipo1.choices.length; i++) {
        var vf = Math.floor((Math.random() * 2) + 1);
        if (vf === 1) {
          this.props.quiz.tipo1.choices[i].answer = false;
          this.generarNumerosYOperadores();
          this.resultadoF();
        } else {
          this.props.quiz.tipo1.choices[i].answer = true;
          this.generarNumerosYOperadores();
          this.resultadoV();
          verdaderas++;
        }
        this.props.quiz.tipo1.choices[i].value.primero = this.props.datos.segundNum;
        this.props.quiz.tipo1.choices[i].value.segundo = this.props.datos.resultado;
        this.props.quiz.tipo1.choices[i].value.tercero = this.props.datos.primerNumF;
      }
      if (verdaderas === 0) {
        var i = Math.floor(Math.random() * this.props.quiz.tipo1.choices.length);
        this.props.quiz.tipo1.choices[i].answer = true;
        this.generarNumerosYOperadores();
        this.resultadoV();
        this.props.quiz.tipo1.choices[i].value.primero = this.props.datos.segundNum;
        this.props.quiz.tipo1.choices[i].value.segundo = this.props.datos.resultado;
        this.props.quiz.tipo1.choices[i].value.tercero = this.props.datos.primerNumF;
      }
    }

  }
  crearPregunta2() {
    if (this.props.difficulty < 4) {
      this.generarNumerosYOperadores();
      for (let i = 0; i < this.props.quiz.tipo2.choices.length; i++) {
        this.props.quiz.tipo2.choices[i].answer = false;
        this.resultadoF();
        this.props.quiz.tipo2.choices[i].value = + this.props.datos.resultado;
      }
      var i = Math.floor(Math.random() * this.props.quiz.tipo2.choices.length);
      this.props.quiz.tipo2.choices[i].answer = true;
      this.resultadoV();
      this.props.quiz.tipo2.choices[i].value = + this.props.datos.resultado;
      this.props.quiz.tipo2.value.primero = this.props.datos.primerNum;
      this.props.quiz.tipo2.value.segundo = this.props.datos.segundNum;
    } else {
      this.generarNumerosYOperadores();
      for (let i = 0; i < this.props.quiz.tipo2.choices.length; i++) {
        this.props.quiz.tipo2.choices[i].answer = false;
        this.resultadoF();
        this.props.quiz.tipo2.choices[i].value = + this.props.datos.primerNumF;
      }
      var i = Math.floor(Math.random() * this.props.quiz.tipo2.choices.length);
      this.props.quiz.tipo2.choices[i].answer = true;
      this.resultadoV();
      this.props.quiz.tipo2.choices[i].value = + this.props.datos.primerNumF;
      this.props.quiz.tipo2.value.primero = this.props.datos.segundNum;
      this.props.quiz.tipo2.value.segundo = this.props.datos.resultado;
    }
  }
  crearPregunta3() {
    this.generarNumerosYOperadores();
    this.resultadoV();
    if (this.props.difficulty < 4) {
      this.props.quiz.tipo3.value.primero = this.props.datos.primerNum;
      this.props.quiz.tipo3.value.segundo = this.props.datos.segundNum;
      this.props.quiz.tipo3.answer = this.props.datos.resultado;
    } else {
      this.props.quiz.tipo3.value.primero = this.props.datos.segundNum;
      this.props.quiz.tipo3.value.segundo = this.props.datos.resultado;
      this.props.quiz.tipo3.answer = this.props.datos.primerNumF;
    }
  }

  genAux() {
    this.props.datos.primerNum = Math.floor((Math.random() * 10) + 1);
    if (this.props.datos.primerNum === 1) {
      this.props.datos.segundNum = Math.floor(Math.random() * 1001);
    } else if (this.props.datos.primerNum === 2) {
      this.props.datos.segundNum = Math.floor(Math.random() * 13);
    } else if (this.props.datos.primerNum === 3 || this.props.datos.primerNum === 4 || this.props.datos.primerNum === 10) {
      this.props.datos.segundNum = Math.floor(Math.random() * 7);
    } else if (this.props.datos.primerNum === 5 || this.props.datos.primerNum === 8) {
      this.props.datos.segundNum = Math.floor(Math.random() * 5);
    } else {
      this.props.datos.segundNum = Math.floor(Math.random() * 4);
    }
  }
  generarNumerosYOperadores() {
    if(this.props.difficulty < 4){
        this.genAux();
      }else {
        do {
          this.genAux();
        } while (this.props.datos.segundNum < 1);
    }
  }

  resultadoV() {
    this.props.datos.resultado = Math.pow(this.props.datos.primerNum, this.props.datos.segundNum);
    this.props.datos.primerNumF = this.props.datos.primerNum;
  }
  resultadoF() {
    var resultadoV;
    var resultadoF;
    if(this.props.difficulty < 4){
        resultadoV = Math.pow(this.props.datos.primerNum, this.props.datos.segundNum);
        resultadoF = Math.floor(resultadoV - 10 + (Math.random() * 10) + 1);
        while (resultadoF === resultadoV) {
          resultadoF = Math.floor(resultadoV - 10 + (Math.random() * 10) + 1);
        }
        this.props.datos.resultado = resultadoF;
      }else{
        resultadoV = Math.pow(this.props.datos.primerNum, this.props.datos.segundNum);
        this.props.datos.primerNumF = Math.floor(this.props.datos.primerNum - 10 + (Math.random() * 10) + 1);
        while (this.props.datos.primerNumF === this.props.datos.primerNum || this.props.datos.primerNumF < 1) {
          this.props.datos.primerNumF = Math.floor(this.props.datos.primerNum - 10 + (Math.random() * 10) + 1);
        }
        this.props.datos.resultado = resultadoV;
    }
  }

  render() {
    if (this.state.tipo === "") {
      return (<h1>Esperando a que cargue el nivel</h1>);
    }
    let isLastQuestion=(SAMPLES.pregunta===GLOBAL_CONFIG.n);
    let temporizador= [];
    if (GLOBAL_CONFIG.progressBar){
      temporizador.push(<Temporizador ref="contador" key={SAMPLES.pregunta} secondsRemaining={10} onAnswerQuiz={this.onAnswerQuiz.bind(this)}/>);
    }
    var tipo;
    if(this.props.difficulty < 4){
      tipo=1;
    }else{
      tipo=2;
    }
    switch (this.state.tipo) {
      case 0:
        let choices1 = [];
        for (let i = 0; i < this.props.quiz.tipo1.choices.length; i++) {
          choices1.push(<Tipo1 key={"MyQuiz_" + "quiz_choice_" + i} choice={this.props.quiz.tipo1.choices[i]} checked={this.state.selected_choices_ids.indexOf(this.props.quiz.tipo1.choices[i].id) !== -1} handleChange={this.handleMultiChoiceChange.bind(this)} quizAnswered={this.state.answered} tipo={tipo}/>);
        }
        return (<div className="question">
          <h1>{this.props.quiz.tipo1.value}</h1>
          {choices1}
          {temporizador}
          <QuestionButtons I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuiz.bind(this)} onResetQuestion={this.onResetQuestion.bind(this)} onResetQuiz={this.onResetQuiz.bind(this)} onNextQuestion={this.onNextQuiz.bind(this)} answered={this.state.answered} quizCompleted={this.props.tracking.finished} allow_finish={isLastQuestion}/>
        </div>);
        break;
      case 1:
        let choices2 = [];
        for (let i = 0; i < this.props.quiz.tipo2.choices.length; i++) {
          choices2.push(<Tipo2 key={"MyQuiz_" + "quiz_choice_" + i} choice={this.props.quiz.tipo2.choices[i]} checked={i === this.state.option} handleChange={this.handleOneChoiceChange.bind(this)} quizAnswered={this.state.answered} tipo={tipo}/>);
        }
        if (this.props.difficulty === 5) {
          return (<div className="question">
            <p>¿Cuanto es {this.props.quiz.tipo2.value.primero}<sup>{this.props.quiz.tipo2.value.segundo}</sup>?</p>
            {choices2}
            {temporizador}
            <QuestionButtons I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuiz.bind(this)} onResetQuestion={this.onResetQuestion.bind(this)} onResetQuiz={this.onResetQuiz.bind(this)} onNextQuestion={this.onNextQuiz.bind(this)} answered={this.state.answered} quizCompleted={this.props.tracking.finished} allow_finish={isLastQuestion}/>
          </div>);
        } else {
          return (<div className="question">
            <p>¿Cuanto es
              <sup>{this.props.quiz.tipo2.value.primero}</sup>√{this.props.quiz.tipo2.value.segundo}
              ?</p>
            {choices2}
            {temporizador}
            <QuestionButtons I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuiz.bind(this)} onResetQuestion={this.onResetQuestion.bind(this)} onResetQuiz={this.onResetQuiz.bind(this)} onNextQuestion={this.onNextQuiz.bind(this)} answered={this.state.answered} quizCompleted={this.props.tracking.finished} allow_finish={isLastQuestion}/>
          </div>);
        }
        break;
      case 2:
        let quizClassName = "question_choice";
        if (this.state.answered) {
          if (this.state.input_answer === this.props.quiz.tipo3.answer) {
            quizClassName += " question_choice_correct";
          } else {
            quizClassName += " question_choice_incorrect";

          }
        }
        if (this.props.difficulty < 4) {
          return (<div className="question">
            <p>¿Cuanto es {this.props.quiz.tipo3.value.primero}<sup>{this.props.quiz.tipo3.value.segundo}</sup>?</p>
            <div className={quizClassName}>
              <input type="number" name="respuesta" onChange={this.handleInputChange.bind(this)}></input>
            </div>
            {temporizador}
            <QuestionButtons I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuiz.bind(this)} onResetQuestion={this.onResetQuestion.bind(this)} onResetQuiz={this.onResetQuiz.bind(this)} onNextQuestion={this.onNextQuiz.bind(this)} answered={this.state.answered} quizCompleted={this.props.tracking.finished} allow_finish={isLastQuestion}/>
          </div>);
        } else {
          return (<div className="question">
            <p>¿Cuanto es
              <sup>{this.props.quiz.tipo3.value.primero}</sup>√{this.props.quiz.tipo3.value.segundo}
              ?</p>
            <div className={quizClassName}>
              <input type="number" name="respuesta" onChange={this.handleInputChange.bind(this)}></input>
            </div>
            {temporizador}
            <QuestionButtons I18n={this.props.I18n} onAnswerQuestion={this.onAnswerQuiz.bind(this)} onResetQuestion={this.onResetQuestion.bind(this)} onResetQuiz={this.onResetQuiz.bind(this)} onNextQuestion={this.onNextQuiz.bind(this)} answered={this.state.answered} quizCompleted={this.props.tracking.finished} allow_finish={isLastQuestion}/>
          </div>);
        }
        break;
      default:
        console.log("error");
    }
  }
}
