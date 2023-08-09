import { Quiz } from "./Quiz.js";
import { categoryMenu, difficultyOptions, questions, questionsContainer, questionsNumber, quiz, quizOption } from "./index.js";

export class Questions {
    constructor(index) {
        this.index = index;
        this.question = questions[index].question;
        this.category = questions[index].category;
        this.difficulty = questions[index].difficulty;
        this.correct = questions[index].correct_answer;
        this.incorrect = questions[index].incorrect_answers;
        this.choices = this.getChoices(questions[index]);
        this.answer = false;
    }

    getChoices(questionDetails) {
        return questionDetails.incorrect_answers.concat(questionDetails.correct_answer).sort();
    }
    display() {
        const questionHtml = `
        <div
          class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn"
        >
          <div class="w-100 d-flex justify-content-between">
            <span class="btn btn-category">${this.category}</span>
            <span class="fs-6 btn btn-questions">${this.index + 1} of ${questions.length}
        
       Questions</span>
          </div>
          <h2 class="text-capitalize h4 text-center">${this.question}</h2>  
          <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
          ${this.choices[0] ? `<li>${this.choices[0]}</li>` : ""}
          ${this.choices[1] ? `<li>${this.choices[1]}` : ""}
          ${this.choices[2] ? `<li>${this.choices[2]}` : ""}
          ${this.choices[3] ? `<li>${this.choices[3]}</li>` : ""}
          </ul>
          <h2 class="text-capitalize text-center score-color h3 fw-bold">${quiz.score}<i class="bi bi-emoji-laughing"></i> Score: </h2>        
        </div>
      `;

        questionsContainer.innerHTML = questionHtml;
        const choice = document.querySelectorAll("ul li");
        for (let i = 0; i < choice.length; i++) {
            choice[i].addEventListener("click", () => {
                this.checkAnswer(choice[i]);
                this.animateQuestion(choice[i]);
                this.nextQuestion();
            })

        }

    }


    checkAnswer(choice) {
        if (!this.answer) {
            this.answer = true;
            if (choice.innerText == this.correct) {
                choice.classList.add("correct", "animate__animated", "animate__flipInY");
                quiz.score++;
            }
            else {
                choice.classList.add("wrong", "animate__animated", "animate__shakeX");
            }
        }

    }



    nextQuestion() {
        this.index++;

        setTimeout(() => {
            if (this.index < questions.length) {
                const newQuestion = new Questions(this.index);
                console.log(newQuestion);
                newQuestion.display();
            }
            else {
                questionsContainer.innerHTML = quiz.showResult();
                const tryAgain = document.querySelector(".again");
                tryAgain.addEventListener("click", function () {
                    questionsContainer.querySelector(".question").classList.replace("d-flex", "d-none");
                    categoryMenu.value = "";
                    difficultyOptions.value = "easy";
                    questionsNumber.value = "";
                    quizOption.classList.replace("d-none", "d-flex");
                })
            }
        }, 2000)


    }


    animateQuestion(choice) {
        setTimeout(() => {
            choice.closest(".question").classList.add("animate__animated", "animate__bounceOutLeft");

        }, 1000)

    }
}