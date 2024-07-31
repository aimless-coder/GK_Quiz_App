// add a timer 
//automatically goes to next question when timed out
// make is responsive



import questions from './questionData.js';

const startBtnEl = document.getElementById("startBtn");
const nextBtnEl = document.getElementById('nextBtn');
const retryBtn = document.getElementById('retryBtn');

const startSectionEl = document.querySelector('.start-section');
const quizSectionEl = document.querySelector('.quiz-section');
const resultSectionEl = document.querySelector('.result-section');

const quizQuestionEl = document.getElementById('quizQuestion');
const quizAnswerEl = document.getElementById('quizAnswer');

const scoreEl = document.getElementById('score');

let questionIndex = 0;
let score = 0;

const showQuestions = () => {
    quizAnswerEl.innerHTML = '';
    nextBtnEl.style.display = 'none';

    let currentQuestionNumber = questionIndex + 1;
    let currentQuestion = questions[questionIndex].question;

    quizQuestionEl.innerText = `${currentQuestionNumber}. ${currentQuestion}`;




    questions[questionIndex].answer.forEach(answer => {

        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('ans-btn');
        quizAnswerEl.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
        
    });

    questionIndex++;
}

const selectAnswer = (event) => {
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';

    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }else{
        selectedBtn.classList.add('incorrect');
    }

    Array.from(quizAnswerEl.children).forEach(button =>{
        if (button.dataset.correct === 'true') {

            button.classList.add('correct'); 
        }
        button.disabled = true
    });

    nextBtnEl.style.display = 'block';
}

const showScore = () =>{

    quizSectionEl.style.display = 'none';
    resultSectionEl.style.display ='flex';

    const scorePercent = Math.round((score/questions.length) * 100);

    if (scorePercent > 90) {

        scoreEl.innerText = `Amazing work! You got ${score} out of ${questions.length}! You're a top performer!!!!`;
        
    } else if (scorePercent > 70 && scorePercent < 90) {

        scoreEl.innerText = `Congratulations! You got ${score} out of ${questions.length}! You're a quiz master`;
        
    } else if (scorePercent > 40 && scorePercent < 70) {
        
        scoreEl.innerText = `Good effort! You got ${score} out of ${questions.length}. Keep learning and you'll get even better`;
        
    } else {
        
        scoreEl.innerText = `You got ${score} out of ${questions.length}. Don't worry, practice makes perfect! Try again to improve your score.`;
    }
};


const startQuestions = () => {

    startSectionEl.style.display = 'none';
    quizSectionEl.style.display = 'block';

    questionIndex = 0;
    score = 0;

    showQuestions();
};

const resetToStart = () => {
    startSectionEl.style.display = 'flex';
    resultSectionEl.style.display ='none';

    document.querySelector('.start-section p').innerText = `${questions.length} General Knowledge Questions.`;
                                
};


nextBtnEl.addEventListener("click", () =>{
    if(questionIndex < questions.length){
        showQuestions();
    }else{
        showScore();
    }
});

resetToStart();

retryBtn.addEventListener('click', resetToStart);

startBtnEl.addEventListener("click", startQuestions);