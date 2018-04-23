export const quiz_example = {
  "title":"Quiz Example",
  "questions":[
    {
      "type":"multiple_choice",
      "value":"¿Cuáles de las siguientes afirmaciones son verdaderas?",
      "choices":[
        {
          "id":"1",
          "value":"Madrid es la capital de España.",
          "answer":true,
        }, {
          "id":"2",
          "value":"Turín es la capital de Italia.",
          "answer":false,
        }, {
          "id":"3",
          "value":"París es la capital de Francia.",
          "answer":true,
        }, {
          "id":"4",
          "value":"Manchester es la capital de Inglaterra.",
          "answer":false,
        },
      ],
      "difficulty":2,
    }, {
      "type":"multiple_choice",
      "value":"¿Cuáles de las siguientes afirmaciones son verdaderas?",
      "choices":[
        {
          "id":"1",
          "value":"Lima es la capital de Ecuador.",
          "answer":false,
        }, {
          "id":"2",
          "value":"Tokio es la capital de China.",
          "answer":false,
        }, {
          "id":"3",
          "value":"Santiago de Chile es la capital de Chile.",
          "answer":true,
        }, {
          "id":"4",
          "value":"Ankara es la capital de Turquía.",
          "answer":true,
        },
      ],
      "difficulty":5,
    }, {
      "type":"multiple_choice",
      "value":"¿Cuáles de las siguientes afirmaciones son verdaderas?",
      "choices":[
        {
          "id":"1",
          "value":"Sidney es la capital de Australia.",
          "answer":false,
        }, {
          "id":"2",
          "value":"Timbu es la capital de Bután.",
          "answer":true,
        }, {
          "id":"3",
          "value":"Ragga es la capital de Afganistán.",
          "answer":false,
        }, {
          "id":"4",
          "value":"Tórshavn es la capital de Islas Feroe.",
          "answer":true,
        },
      ],
      "difficulty":8,
    },
  ],
};
export const preguntas1 = {
  "answered": true,
  "difficulty": 0,
  "random": false,
  "tipo1": {
    "value": "¿Cuáles de las siguientes afirmaciones son verdaderas?",
    "choices": [{
      "id": 0,
      "value": "",
      "answer": true,
    }, {
      "id": 1,
      "value": "",
      "answer": true,
    }, {
      "id": 2,
      "value": "",
      "answer": true,
    }, {
      "id": 3,
      "value": "",
      "answer": true,
    }, ],
  },
  "tipo2": {
    "value": "¿Cuáles de las siguientes afirmaciones son verdaderas?",
    "choices": [{
      "id": 0,
      "value": "",
      "answer": true,
    }, {
      "id": 1,
      "value": "",
      "answer": true,
    }, {
      "id": 2,
      "value": "",
      "answer": true,
    }, {
      "id": 3,
      "value": "",
      "answer": true,
    }, ],
  },
  "tipo3": {
    "value": "",
    "answer": "",
  },
};

export const preguntas2 = {
  "answered": true,
  "difficulty": 0,
  "random": false,
  "tipo1": {
    "value": "¿Cuáles de las siguientes afirmaciones son verdaderas?",
    "choices": [{
      "id": 0,
      "value": {
        "primero": 0,
        "segundo": 0,
        "tercero": 0,
      },
      "answer": true,
    }, {
      "id": 1,
      "value": {
        "primero": 0,
        "segundo": 0,
        "tercero": 0,
      },
      "answer": true,
    }, {
      "id": 2,
      "value": {
        "primero": 0,
        "segundo": 0,
        "tercero": 0,
      },
      "answer": true,
    }, {
      "id": 3,
      "value": {
        "primero": 0,
        "segundo": 0,
        "tercero": 0,
      },
      "answer": true,
    }, ],
  },
  "tipo2": {
    "value": {
      "primero": 0,
      "segundo": 0,
    },
    "choices": [{
      "id": 0,
      "value": "",
      "answer": true,
    }, {
      "id": 1,
      "value": "",
      "answer": true,
    }, {
      "id": 2,
      "value": "",
      "answer": true,
    }, {
      "id": 3,
      "value": "",
      "answer": true,
    }, ],
  },
  "tipo3": {
    "value": {
      "primero": 0,
      "segundo": 0,
    },
    "answer": "",
  },
};

export const SumaResta = {
  "primerNum": 0,
  "segundNum": 0,
  "impsegundNum": "",
  "tercerNum": 0,
  "imptercerNum": "",
  "resultado": 0,
  "operador1": 0,
  "operador2": 0,
}

export const MultiplicacionDivision = {
  "primerNum": 0,
  "segundNum": 0,
  "impsegundNum": "",
  "resultado": 0,
  "operador": 0,
}

export const RaicesElevados = {
  "primerNum": 0,
  "primerNumF": 0,
  "segundNum": 0,
  "segundNumF": 0,
  "resultado": 0,
  "operador": "√",
}

export const Logaritmos = {
  "base": 0,
  "numero": 0,
  "resultado": 0,
}

export var pregunta=1;
