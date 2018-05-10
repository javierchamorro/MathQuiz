import React from 'react';

export default class Header2 extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let loggedText;
    let trackingTexts = [];

    if(typeof this.props.tracking.progress_measure === "number"){
      trackingTexts.push(<div className="puntuacion0"><div className="texto0">{this.props.I18n.getTrans("i.progress_measure") + ": "}</div><div className="azul0">{(this.props.tracking.progress_measure * 100).toFixed(1) + "%"}</div></div>);
    } else {
      trackingTexts.push(<div className="puntuacion0"><div className="texto0">{this.props.I18n.getTrans("i.progress_measure") + ": "}</div><div className="azul0">0</div></div>);
    }
    if(typeof this.props.tracking.score === "number"){
      trackingTexts.push(<div className="puntuacion1"><div className="texto1">{this.props.I18n.getTrans("i.score") + ": "}</div><div className="azul1">{(this.props.tracking.score * 100).toFixed(1) + "%"}</div></div>);
    } else {
      trackingTexts.push(<div className="puntuacion1"><div className="texto1">{this.props.I18n.getTrans("i.score") + ": "}</div><div className="azul1">0</div></div>);
    }
    if(this.props.user_profile){
      if((typeof this.props.user_profile.name === "string")){
        loggedText = (this.props.I18n.getTrans("i.logged_as") + " " + this.props.user_profile.name);
      }
      if(typeof this.props.user_profile.learner_preference === "object"){
        if(typeof this.props.user_profile.learner_preference.difficulty === "number"){
          trackingTexts.push(<div className="puntuacion2"><div className="texto2">{this.props.I18n.getTrans("i.difficulty") + ": "}</div><div className="azul2">{this.props.user_profile.learner_preference.difficulty}</div></div>);
        }
      }
    }

    let trackingEls = trackingTexts.map(function(text, index){
      return(<div className={"elemento"+index} key={index}>{text}</div>);
    });

    return (
      <div className="header2">
        <div className="tracking">{trackingEls}</div>
      </div>
    );
  }
}
