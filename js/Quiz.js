export class Quiz {
    constructor(category, difficulty, numberOfQuestion) {
        this.category = category;
        this.difficulty = difficulty;
        this.numberOfQuestion = numberOfQuestion;
        this.score = 0;

    }


    getApiReady() {
        return `https://opentdb.com/api.php?amount=${this.numberOfQuestion}&category=${this.category}&difficulty=${this.difficulty}`
    }

    async getQuestions() {
        const response = await fetch(this.getApiReady());
        const questions = await response.json();
        return questions.results;
    }




    showResult() {
        return `
        <div
          class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3"
        >
          <h2 class="mb-0">
          ${this.score == this.numberOfQuestion ? "Congratulation🎉" : `Your score is${this.score} `}
              
          </h2>
          <button class="again btn btn-primary rounded-pill"><i class="bi bi-arrow-repeat"></i> Try Again</button>
        </div>
      `;
    }
}
