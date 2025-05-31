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
    question: "Which of the following correctly describe current density in an electrochemical reactor?",
    answers: {
      a: "It is the electric current per unit area of the electrode surface",
      b: "It influences the rate of electrochemical reactions",
      c: "High current density can cause side reactions and electrode corrosion",
      d: "Low current density can result in lower productivity but higher energy efficiency"
    },
    correctAnswer: "abcd"
  },
  {
    question: "Why is increasing the electrode area beneficial in an electrochemical reactor?",
    answers: {
      a: "It provides more active sites for redox reactions",
      b: "It enables higher total current without increasing current density",
      c: "It improves reaction uniformity",
      d: "It allows scaling the reactor for industrial applications"
    },
    correctAnswer: "abcd"
  },
  {
    question: "Which effects are caused by electrolyte concentration changes in an electrochemical reactor?",
    answers: {
      a: "Higher concentration reduces internal resistance",
      b: "Higher concentration enhances ion mobility",
      c: "Low concentration causes poor conductivity and voltage losses",
      d: "Electrolyte concentration directly affects reaction rates"
    },
    correctAnswer: "abcd"
  },
  {
    question: "What are the consequences of temperature variations in an electrochemical reactor?",
    answers: {
      a: "Higher temperature increases ionic mobility",
      b: "Higher temperature enhances electrode kinetics",
      c: "Excessive temperature may damage electrodes and electrolyte",
      d: "Temperature must be controlled for reactor integrity and efficiency"
    },
    correctAnswer: "abcd"
  },
  {
    question: "How are the key parameters in an electrochemical reactor interrelated?",
    answers: {
      a: "Current density depends on total current and electrode area",
      b: "Electrolyte concentration affects electrical conductivity and reaction kinetics",
      c: "Temperature influences electrode stability and electrolyte behavior",
      d: "All parameters must be balanced for optimal reactor performance"
    },
    correctAnswer: "abcd"
  },                          ///// To add more questions, copy the section below 
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