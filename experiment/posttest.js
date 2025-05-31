/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
 

/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////






/////////////// Write the MCQ below in the exactly same described format ///////////////


 const myQuestions = [
  {
    question: "What happens if the current density in an electrochemical reactor is too high?",
    answers: {
      a: "It may cause side reactions like hydrogen or oxygen evolution",
      b: "It can lead to excessive heating and electrode corrosion",
      c: "It always improves energy efficiency",
      d: "It increases the reaction rate"
    },
    correctAnswer: "abd"
  },
  {
    question: "Why is electrode area important in electrochemical reactors?",
    answers: {
      a: "Larger electrode area provides more active reaction sites",
      b: "It allows higher total current without raising current density",
      c: "It reduces electrolyte concentration",
      d: "It helps in scaling reactors for industrial use"
    },
    correctAnswer: "abd"
  },
  {
    question: "How does electrolyte concentration affect electrochemical reactions?",
    answers: {
      a: "Higher concentration lowers internal resistance",
      b: "It enhances ion mobility",
      c: "Low concentration leads to slower reaction rates",
      d: "It has no effect on energy consumption"
    },
    correctAnswer: "abc"
  },
  {
    question: "What are the effects of temperature on an electrochemical reactor?",
    answers: {
      a: "Higher temperature increases ionic mobility and reaction rates",
      b: "Excessive temperature may damage electrodes and electrolyte",
      c: "Temperature does not influence electrical conductivity",
      d: "Optimal temperature control improves reactor efficiency"
    },
    correctAnswer: "abd"
  },
  {
    question: "Which of the following describes the interrelationship among electrochemical reactor parameters?",
    answers: {
      a: "Current density depends on total current and electrode area",
      b: "Electrolyte concentration and temperature affect conductivity and reaction kinetics",
      c: "Temperature only affects electrode stability, not electrolyte behavior",
      d: "Balancing all parameters is necessary for optimal performance"
    },
    correctAnswer: "abd"
  },                                  ///// To add more questions, copy the section below 
    									                  ///// this line


    /* To add more MCQ's, copy the below section, starting from open curly braces ( { )
        till closing curly braces comma ( }, )

        and paste it below the curly braces comma ( below correct answer }, ) of above 
        question

    Copy below section

    {
      question: "This is question n?",
      answers: {
        a: "Option 1",
        b: "Option 2",
        c: "Option 3",
        d: "Option 4"
      },
      correctAnswer: "c"
    },

    Copy above section

    */




  ];




/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////


  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();


/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////