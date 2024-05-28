 //Pré-Tudo
  //Perguntas e Respostas
 
const questions = [
   //Questão 1
  {
    question: "Qual é a capital do Brasil?",
    choices: ["Brasília", "Rio de Janeiro", "São Paulo", "Salvador", "N.D.A"],
    answer: "Brasília",
  },
    //Questão 2
  {
    question: "Qual é a capital da Argentina?",
    choices: ["Buenos Aires", "Brasília", "Lisboa", "Paris" ,"N.D.A"],
    answer: "Buenos Aires",
  },
    //Questão 3
  {
    question: "Qual é a capital da França?",
    choices: ["Roma", "Madri", "Paris", "Londres","N.D.A"],
    answer: "Paris",
  },
    //Questão 4
  {
    question: "Qual é a capital da Espanha?",
    choices: ["Lisboa", "Madri", "Barcelona", "Valência","N.D.A"],
    answer: "Madri",
  },
    //Questão 5
  {
    question: "Qual é a capital da Itália?",
    choices: ["Veneza", "Milão", "Roma", "Nápoles","N.D.A"],
    answer: "Roma",
  },
    //Questão 6
  {
    question: "Qual é a capital do Canadá?",
    choices: ["Toronto", "Vancouver", "Ottawa", "Montreal","N.D.A"],
    answer: "Ottawa",
  },
    //Questão 7
  {
    question: "Qual é a capital dos Estados Unidos?",
    choices: ["Nova York", "Los Angeles", "Chicago", "Washington D.C.","N.D.A"],
    answer: "Washington D.C.",
  },
    //Questão 8
  {
    question: "Qual é a capital do Reino Unido?",
    choices: ["Liverpool", "Manchester", "Edimburgo", "Londres","N.D.A"],
    answer: "Londres",
  },
];
//Variaveis
const questionElement = document.getElementById("question");
const choiceElements = Array.from(document.getElementsByClassName("choice"));
const nextButton = document.getElementById("next");
const scoreElement = document.getElementById("score");
const wrongElement = document.getElementById("wrong");
const thepoints1 = document.querySelector("#osPontos1")
const thepoints2 = document.querySelector("#osPontos2")
const thepoints3 = document.querySelector("#osPontos3")
const thepoints4 = document.querySelector("#osPontos4")
const thepoints5 = document.querySelector("#osPontos5")
const restartBtn = document.querySelector("#restart")

let currentQuestion = 0;
let score = 0;
let wrong = 0;
let answerChosen = false;
let pointsNumber = 0;
//Carregar Questão 
function loadQuestion() {
  const currentQuestionData = questions[currentQuestion];
  questionElement.innerText = currentQuestionData.question;

  const choices = shuffleArray(currentQuestionData.choices);
  for (let i = 0; i < choiceElements.length; i++) {
    choiceElements[i].innerText = choices[i];
  }
  answerChosen = false; // reset flag when loading new question
}
//Checar Resposta
function checkAnswer(e) {
  if (answerChosen) return; // prevent multiple answers
  answerChosen = true;

  if (e.target.innerText === questions[currentQuestion].answer) {
    score++;
    scoreElement.innerText = "Pontos: " + score;
    alert("Acertoooooou!");
  } else {
    wrong++;
    wrongElement.innerText = "Erros: " + wrong;
    alert(
      "Errooooooooooou! "
    );
  }
}

choiceElements.forEach((element) => {
  element.addEventListener("click", checkAnswer);
});
//Reiniciar Quiz
function restartQuiz(pointsNumber) {
  thepoints1.innerHTML = "Pontos 1: " + localStorage.getItem("Pontos 1");
  thepoints2.innerHTML = "Pontos 2: " + localStorage.getItem("Pontos 2");
  thepoints3.innerHTML = "Pontos 3: " + localStorage.getItem("Pontos 3");
  thepoints4.innerHTML = "Pontos 4: " + localStorage.getItem("Pontos 4");
  thepoints4.innerHTML = "Pontos 5: " + localStorage.getItem("Pontos 5");

  currentQuestion = 0;
  score = 0;
  wrong = 0;
  scoreElement.innerText = "Pontos: 0";
  wrongElement.innerText = "Erros: 0";
  pointsNumber++
  if(pointsNumber > 4) {
    localStorage.clear();
    pointsNumber = 1;

  }
  loadQuestion();
}
//Proxima Pergunta
nextButton.addEventListener("click", () => {
  if (!answerChosen) {
    alert("Responda a Pergunta Para Continuar!");
    return;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    alert(
      "Fim do Quiz! Você acertou " +
        score +
        " de " +
        questions.length +
        " perguntas."
    );
    pointsNumber++
    localStorage.setItem("Pontos " + pointsNumber,score )
    restartQuiz();
    
  }
});
//Aleatorizar
function shuffleArray(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
//Botão de Reiniciar Quiz
restartBtn.addEventListener("click", () => {
  restartQuiz()
})
loadQuestion();

