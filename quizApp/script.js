const questionElement = document.getElementById('question');
const answer_buttons = document.getElementById('answer-buttons');
const next_button = document.getElementById('next-btn');
const start_btn = document.querySelector('.start_btn');
const app = document.querySelector('.app');
const quizC = document.querySelector('.quiz');
const result_page = document.querySelector('.result');
const your_answers = document.querySelector('.your-answers');
const answer_question = document.querySelector('.question');

let currentIndex = 0;
let score = 0;
const selectedAnswers = [];

start_btn.addEventListener('click', startQuiz);

next_button.addEventListener('click', () => {
  if (currentIndex < quiz.length - 1) {
    currentIndex++;
    showQuestion();
  } else {
    resultPage();
  }
});

function startQuiz() {
  app.classList.remove('show');
  start_btn.classList.add('show');
  showQuestion();
}

function showQuestion() {
  resetsState();
  let currentQuestion = quiz[currentIndex];
  //soruyu getirir
  questionElement.innerHTML = currentQuestion.question;

  //seçenekleri getirir
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answer_buttons.appendChild(button);
    if (answer.correct) {
      //ifade true ise dataya true atanıyor
      button.dataset.correct = answer.correct;
    }

    button.addEventListener('click', selectAnswer);
  });
}

function resetsState() {
  next_button.style.display = 'none';
  //yeni sorular gelmeden container'ın boşluğunu kontrol eder

  while (answer_buttons.firstChild) {
    answer_buttons.removeChild(answer_buttons.firstChild);
  }
}

function selectAnswer(e) {
  //seçtiğimiz seçenek
  const selectBtn = e.target;

  //işaretlediğimiz seçenekleri en sonunda göstermek için
  const selectedOption = selectBtn.innerHTML;

  //seçeneği diziye ekler
  selectedAnswers[currentIndex] = selectedOption;

  //seçtiğimiz seçeneğin doğru veya yanlışlığını kontrol eder
  const isCorrect = selectBtn.dataset.correct === 'true';

  //true ise classlisti correct değilse incorrect
  if (isCorrect) {
    selectBtn.classList.add('correct');
    score++;
  } else {
    selectBtn.classList.add('incorrect');
  }

  //yanlış seçeneği seçse de doğru seçeneği gösterir
  Array.from(answer_buttons.children).forEach((button) => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  next_button.style.display = 'block';
}

function resultPage() {
  app.classList.add('show');
  result_page.classList.remove('show');
  result_page.innerHTML = `
        <h2>Your score : ${score}/${quiz.length} </h2>
        <div class="buttons">
            <button class="restart">Restart</button>
            <button class="results-btn">Results</button>
        </div>
    
    `;

  const restart = document.querySelector('.restart');
  const results_btn = document.querySelector('.results-btn');
  restart.addEventListener('click', () => {
    location.reload();
  });

  results_btn.addEventListener('click', () => {
    showResults();
  });
}

function showResults() {
  result_page.classList.add('show');
  your_answers.classList.remove('show');

  const resultsContainer = document.createElement('div');

  quiz.forEach((question, index) => {
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('question-container');

    const questionElement = document.createElement('h2');
    questionElement.innerHTML = question.question;
    questionContainer.appendChild(questionElement);

    const answerContainer = document.createElement('div');
    answerContainer.classList.add('answer-container');

    question.answers.forEach((answer) => {
      const answerElement = document.createElement('button');
      answerElement.innerHTML = answer.text;
      answerElement.classList.add('answerEl');

      if (answer.correct) {
        answerElement.classList.add('correct');
      } else if (selectedAnswers[index] === answer.text) {
        answerElement.classList.add('incorrect');
      }

      answerContainer.appendChild(answerElement);
    });

    questionContainer.appendChild(answerContainer);
    resultsContainer.appendChild(questionContainer);
  });

  your_answers.innerHTML = '';
  your_answers.appendChild(resultsContainer);

  const restartButton = document.createElement('button');
  restartButton.innerHTML = 'Restart';
  restartButton.classList.add('restart');
  result_page.appendChild(restartButton);
  restartButton.addEventListener('click', () => {
    location.reload();
  });

  your_answers.appendChild(restartButton);
}
