export let GLOBAL_CONFIG = {
  dev:{
    debug:true,
    debug_scorm_api:false,
    debug_scorm_api_window:false,
    available_locales:["en", "es"],
    // locale: "es",
    adaptive:true,
    finish_screen:true,
    scorm:{
      completion_threshold:0.5,
      score_threshold:0.6,
    },
    // activar boton de resetQuestion
    resetQuestion:true,
    // activar boton de resetQuiz
    resetQuiz:true,
    // numero de preguntas del test
    n:5,
    // en modo progresivo se el numero de preguntas necesarias para subir o bajar de nivel
    progresivo:1,
    // probabilidad de niveles
    prob_dif:{
      nivel0:{
        SumaResta:0.8,
        MultiplicacionDivision:0.16,
        RaicesElevados:0.02,
        Logaritmos:0.02,
      },
      nivel1:{
        SumaResta:0.6,
        MultiplicacionDivision:0.22,
        RaicesElevados:0.09,
        Logaritmos:0.09,
      },
      nivel2:{
        SumaResta:0.5,
        MultiplicacionDivision:0.3,
        RaicesElevados:0.1,
        Logaritmos:0.1,
      },
      nivel3:{
        SumaResta:0.35,
        MultiplicacionDivision:0.35,
        RaicesElevados:0.15,
        Logaritmos:0.15,
      },
      nivel4:{
        SumaResta:0.25,
        MultiplicacionDivision:0.25,
        RaicesElevados:0.25,
        Logaritmos:0.25,
      },
      nivel5:{
        SumaResta:0.25,
        MultiplicacionDivision:0.25,
        RaicesElevados:0.25,
        Logaritmos:0.25,
      },
      nivel6:{
        SumaResta:0.2,
        MultiplicacionDivision:0.3,
        RaicesElevados:0.25,
        Logaritmos:0.25,
      },
      nivel7:{
        SumaResta:0.15,
        MultiplicacionDivision:0.25,
        RaicesElevados:0.3,
        Logaritmos:0.3,
      },
      nivel8:{
        SumaResta:0.2,
        MultiplicacionDivision:0.2,
        RaicesElevados:0.3,
        Logaritmos:0.3,
      },
    },
    // Preguntas con temporizador y barra de progresivo
    progressBar:true,
    // tiempo en segundos para responder una pregunta
    temporizador:17,
    // tipos de pregunta(multiplechoice,onechoice,input).
    tipo:{
      // multiplechoice
      tipo1:true,
      // onechoice
      tipo2:true,
      // input
      tipo3:true,
    },
  },
  production:{
    debug:false,
    debug_scorm_api:false,
    debug_scorm_api_window:false,
    available_locales:["en", "es"],
    adaptive:true,
    finish_screen:true,
    scorm:{
      completion_threshold:0.5,
      score_threshold:0.6,
    },
    // activar boton de resetQuestion
    resetQuestion:false,
    // activar boton de resetQuiz
    resetQuiz:false,
    // numero de preguntas del test
    n:1,
    // en modo progresivo se el numero de preguntas necesarias para subir o bajar de nivel
    progresivo:1,
    // probabilidad de niveles
    prob_dif:{
      nivel0:{
        SumaResta:0.8,
        MultiplicacionDivision:0.16,
        RaicesElevados:0.02,
        Logaritmos:0.02,
      },
      nivel1:{
        SumaResta:0.6,
        MultiplicacionDivision:0.22,
        RaicesElevados:0.09,
        Logaritmos:0.09,
      },
      nivel2:{
        SumaResta:0.5,
        MultiplicacionDivision:0.3,
        RaicesElevados:0.1,
        Logaritmos:0.1,
      },
      nivel3:{
        SumaResta:0.35,
        MultiplicacionDivision:0.35,
        RaicesElevados:0.15,
        Logaritmos:0.15,
      },
      nivel4:{
        SumaResta:0.25,
        MultiplicacionDivision:0.25,
        RaicesElevados:0.25,
        Logaritmos:0.25,
      },
      nivel5:{
        SumaResta:0.25,
        MultiplicacionDivision:0.25,
        RaicesElevados:0.25,
        Logaritmos:0.25,
      },
      nivel6:{
        SumaResta:0.2,
        MultiplicacionDivision:0.3,
        RaicesElevados:0.25,
        Logaritmos:0.25,
      },
      nivel7:{
        SumaResta:0.15,
        MultiplicacionDivision:0.25,
        RaicesElevados:0.3,
        Logaritmos:0.3,
      },
      nivel8:{
        SumaResta:0.2,
        MultiplicacionDivision:0.2,
        RaicesElevados:0.3,
        Logaritmos:0.3,
      },
    },
    // Preguntas con temporizador y barra de progresivo
    progressBar:true,
    // tiempo en segundos para responder una pregunta
    temporizador:17,
    // tipos de pregunta(multiplechoice,onechoice,input).
    tipo:{
      // multiplechoice
      tipo1:true,
      // onechoice
      tipo2:true,
      // input
      tipo3:true,
    },
  },
};

let processConfig = (function(){
  let env = process.env.NODE_ENV || 'dev';
  if(typeof GLOBAL_CONFIG[env] === "undefined"){
    env = "dev";
  }
  GLOBAL_CONFIG = GLOBAL_CONFIG[env];

  GLOBAL_CONFIG.debug_scorm_api = ((GLOBAL_CONFIG.debug) && (GLOBAL_CONFIG.debug_scorm_api));
  GLOBAL_CONFIG.debug_scorm_api_window = ((GLOBAL_CONFIG.debug_scorm_api) && (GLOBAL_CONFIG.debug_scorm_api_window));
})();