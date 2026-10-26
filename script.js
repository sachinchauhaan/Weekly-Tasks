
const questions = [
    {
        question: "Which keyword is used to declare a variable?",
        options: ["var", "int", "string", "define"],
        answer: 0,
        explanation: "var is used to declare a variable."
    },
    {
        question: "Which method prints output in the console?",
        options: ["print()", "console.log()", "display()", "write()"],
        answer: 1,
        explanation: "console.log() prints output in the console."
    },
    {
        question: "Which symbol is used for strict equality?",
        options: ["=", "==", "===", "!="],
        answer: 2,
        explanation: "=== compares values without type conversion."
    },
    {
        question: "Which data type represents true or false?",
        options: ["String", "Boolean", "Number", "Array"],
        answer: 1,
        explanation: "Boolean represents true or false."
    },
    {
        question: "Which method adds an element to the end of an array?",
        options: ["pop()", "shift()", "push()", "slice()"],
        answer: 2,
        explanation: "push() adds an element to the end of an array."
    },
    {
        question: "Which operator is used for addition?",
        options: ["-", "+", "*", "/"],
        answer: 1,
        explanation: "The + operator is used for addition."
    },
    {
        question: "Which keyword declares a block-scoped variable?",
        options: ["let", "print", "echo", "define"],
        answer: 0,
        explanation: "let declares a block-scoped variable."
    },
    {
        question: "Which method removes the last element of an array?",
        options: ["shift()", "push()", "pop()", "join()"],
        answer: 2,
        explanation: "pop() removes the last array element."
    },
    {
        question: "Which symbol starts a single-line comment?",
        options: ["<!--", "**", "//", "##"],
        answer: 2,
        explanation: "// is used for a single-line comment."
    },
    {
        question: "Which keyword is used to create a function?",
        options: ["method", "function", "def", "func"],
        answer: 1,
        explanation: "function is used to declare a function."
    },
    {
        question: "Which operator represents logical AND?",
        options: ["||", "&&", "!", "&"],
        answer: 1,
        explanation: "&& checks whether both conditions are true."
    },
    {
        question: "Which method converts JSON text into a JavaScript value?",
        options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.object()"],
        answer: 1,
        explanation: "JSON.parse() converts JSON text into a JavaScript value."
    },
    {
        question: "Which keyword declares a constant?",
        options: ["let", "var", "const", "static"],
        answer: 2,
        explanation: "const declares a binding that cannot be reassigned."
    },
    {
        question: "Which method removes the first element of an array?",
        options: ["pop()", "shift()", "push()", "slice()"],
        answer: 1,
        explanation: "shift() removes the first array element."
    },
    {
        question: "Which method converts a string to uppercase?",
        options: ["toUpperCase()", "upper()", "capitalize()", "toCapital()"],
        answer: 0,
        explanation: "toUpperCase() converts a string to uppercase."
    },
    {
        question: "What is the value of a declared but unassigned variable?",
        options: ["false", "0", "undefined", "empty"],
        answer: 2,
        explanation: "An unassigned variable has the value undefined."
    },
    {
        question: "Which brackets are used to create an array?",
        options: ["{}", "()", "[]", "<>"],
        answer: 2,
        explanation: "Square brackets are used to create an array."
    },
    {
        question: "Which method checks whether an array contains a value?",
        options: ["includes()", "contains()", "exists()", "findValue()"],
        answer: 0,
        explanation: "includes() checks whether an array contains a value."
    },
    {
        question: "Which loop runs while a condition is true?",
        options: ["if", "while", "switch", "case"],
        answer: 1,
        explanation: "A while loop runs as long as its condition is true."
    },
    {
        question: "Which operator returns the remainder after division?",
        options: ["/", "*", "%", "**"],
        answer: 2,
        explanation: "% returns the remainder after division."
    },
    {
        question: "Which function parses a string into an integer?",
        options: ["parseInt()", "parseString()", "toInteger()", "NumberText()"],
        answer: 0,
        explanation: "parseInt() converts a numeric string into an integer."
    },
    {
        question: "Which statement is used for decision-making?",
        options: ["repeat", "if...else", "continue", "import"],
        answer: 1,
        explanation: "if...else runs code based on a condition."
    },
    {
        question: "What does typeof return?",
        options: ["Variable name", "Type as a string", "Variable size", "Array index"],
        answer: 1,
        explanation: "typeof returns a string describing the value's type."
    },
    {
        question: "Which method creates a new array from existing elements?",
        options: ["map()", "pop()", "push()", "reverse()"],
        answer: 0,
        explanation: "map() creates a new array using a callback function."
    },
    {
        question: "Which statement can return a value from a function?",
        options: ["stop", "break", "return", "exit"],
        answer: 2,
        explanation: "return ends a function and can send back a value."
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;
let answered = false;
let wrongAnswers = [];

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const progressElement = document.getElementById("progress");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const explanationElement = document.getElementById("explanation");
const progressBar = document.getElementById("progress-bar");

const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultRestartButton = document.getElementById("result-restart-btn");
const reviewRestartButton = document.getElementById("review-restart-btn");
const reviewButton = document.getElementById("review-btn");
const backButton = document.getElementById("back-btn");

const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const reviewScreen = document.getElementById("review-screen");

const finalScoreElement = document.getElementById("final-score");
const ratingElement = document.getElementById("rating");
const wrongAnswersContainer = document.getElementById("wrong-answers-container");

function showQuestion() {
    clearInterval(timer);

    answered = false;
    timeLeft = 30;

    const current = questions[currentQuestion];

    questionElement.textContent = current.question;
    optionsContainer.innerHTML = "";
    explanationElement.textContent = "";

    progressElement.textContent =
        `Q${currentQuestion + 1}/${questions.length}`;

    scoreElement.textContent = `Score: ${score}`;
    timerElement.textContent = `Time: ${timeLeft}s`;

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    current.options.forEach(function (option, index) {
        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("option-btn");

        button.addEventListener("click", function () {
            checkAnswer(index);
        });

        optionsContainer.appendChild(button);
    });

    nextButton.disabled = true;
    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "See Results →"
            : "Next →";

    startTimer();
}

function startTimer() {
    clearInterval(timer);

    timer = setInterval(function () {
        timeLeft--;
        timerElement.textContent = `Time: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(-1);
        }
    }, 1000);
}

function checkAnswer(selectedIndex) {
    if (answered) {
        return;
    }

    answered = true;
    clearInterval(timer);

    const current = questions[currentQuestion];
    const buttons = optionsContainer.querySelectorAll(".option-btn");

    buttons.forEach(function (button) {
        button.disabled = true;
    });

    if (selectedIndex === current.answer) {
        score++;
        buttons[selectedIndex].classList.add("correct");
    } else {
        if (selectedIndex !== -1) {
            buttons[selectedIndex].classList.add("incorrect");
        }

        buttons[current.answer].classList.add("correct");

        wrongAnswers.push({
            question: current.question,
            selected: selectedIndex === -1
                ? "Not answered (time up)"
                : current.options[selectedIndex],
            correct: current.options[current.answer],
            explanation: current.explanation
        });
    }

    scoreElement.textContent = `Score: ${score}`;

    if (selectedIndex === current.answer) {
        explanationElement.textContent = "Correct! " + current.explanation;
    } else if (selectedIndex === -1) {
        explanationElement.textContent = "Time's up! " + current.explanation;
    } else {
        explanationElement.textContent = "Incorrect! " + current.explanation;
    }

    nextButton.disabled = false;
}

nextButton.addEventListener("click", function () {
    if (!answered) {
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    clearInterval(timer);

    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    reviewScreen.classList.add("hidden");

    finalScoreElement.textContent =
        `Your score: ${score} / ${questions.length}`;

    const percentage = (score / questions.length) * 100;

    if (percentage === 100) {
        ratingElement.textContent = "Excellent! Perfect score!";
    } else if (percentage >= 80) {
        ratingElement.textContent = "Great job! You know your JavaScript.";
    } else if (percentage >= 60) {
        ratingElement.textContent = "Good effort! Keep practising.";
    } else {
        ratingElement.textContent = "Keep learning. You will improve!";
    }

    reviewButton.classList.toggle("hidden", wrongAnswers.length === 0);
}

reviewButton.addEventListener("click", function () {
    resultScreen.classList.add("hidden");
    reviewScreen.classList.remove("hidden");

    wrongAnswersContainer.innerHTML = "";

    wrongAnswers.forEach(function (item, index) {
        const card = document.createElement("div");
        card.classList.add("wrong-answer-item");

        const question = document.createElement("h3");
        question.textContent = `${index + 1}. ${item.question}`;

        const selected = document.createElement("p");
        selected.classList.add("your-answer");
        selected.textContent = `Your answer: ${item.selected}`;

        const correct = document.createElement("p");
        correct.classList.add("correct-answer");
        correct.textContent = `Correct answer: ${item.correct}`;

        const explanation = document.createElement("p");
        explanation.textContent = item.explanation;

        card.append(question, selected, correct, explanation);
        wrongAnswersContainer.appendChild(card);
    });
});

function restartQuiz() {
    clearInterval(timer);

    currentQuestion = 0;
    score = 0;
    timeLeft = 30;
    answered = false;
    wrongAnswers = [];

    resultScreen.classList.add("hidden");
    reviewScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
}

restartButton.addEventListener("click", restartQuiz);
resultRestartButton.addEventListener("click", restartQuiz);
reviewRestartButton.addEventListener("click", restartQuiz);

backButton.addEventListener("click", function () {
    reviewScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
});

showQuestion();
