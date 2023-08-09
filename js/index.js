import { Questions } from "./Questions.js";
import { Quiz } from "./Quiz.js";
// HTML ELEMENTS
export const quizOption = document.getElementById("quizOptions");
export const categoryMenu = document.getElementById("categoryMenu");
export const difficultyOptions = document.getElementById("difficultyOptions");
export const questionsNumber = document.getElementById("questionsNumber");
export const questionsContainer = document.querySelector(".questions-container");
const startBtn = document.getElementById("startQuiz");

export let quiz;
export let questions;
startBtn.addEventListener("click", async function (e) {

    const category = categoryMenu.value;
    const difficulty = difficultyOptions.value;
    const numberOfQuestions = questionsNumber.value;


    quiz = new Quiz(category, difficulty, numberOfQuestions);
    questions = await quiz.getQuestions();

    const question = new Questions(0);
  
    console.log(question);
    quizOption.classList.replace("d-flex", "d-none");
    question.display();
})