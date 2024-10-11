
   
const quizData = [
    {
        question: "1. Who is known as the father of the World Wide Web?",
        a: "Steve Jobs",
        b: "Bill Gates",
        c: "Tim Berners-Lee",
        d: "Mark Zuckerberg",
        correct: "c"
    },
    {
        question: "2. What is the name of the first electronic general-purpose computer?",
        a: "ENIAC",
        b: "UNIVAC",
        c: "EDVAC",
        d: "ABC",
        correct: "a"
    },
    {
        question: "3. What does IP stand for in IP address?",
        a: "Internet Protocol",
        b: "Internal Protocol",
        c: "Internet Package",
        d: "Internal Package",
        correct: "a"
    },
    {
        question: "4.What does SSD stand for in computer hardware?",
        a: "Solid-State Device",
        b: "Super-Speed Drive",
        c: "Solid-State Drive",
        d: "Super-Secure Device",
        correct: "c"
    },
    {
        question: "5.Which programming language is commonly used for developing web applications?",
        a: "Java",
        b: "Python",
        c: "C++",
        d: "Ruby",
        correct: "d"
    },
    {
        question: "6.Which language is used for web development to structure content on the web?",
        a: "CSS",
        b: "JavaScript",
        c: "HTML",
        d: "PHP",
        correct: "c"
    },
    {
        question: "7.Which of the following is a relational database management system?",
        a: "MongoDB",
        b: "MySQL",
        c: "Redis",
        d: "Cassandra",
        correct: "b"
    },
    {
        question: "8.Which company is known for developing the Windows operating system?",
        a: "Apple",
        b: "IBM",
        c: "Microsoft",
        d: "Google",
        correct: "c"
    },
    {
        question: "9.Which company developed the Java programming language?",
        a: "Microsoft",
        b: "Apple",
        c: "Sun Microsystems",
        d: "IBM",
        correct: "c"
    },
    {
        question: "10.What does GUI stand for in computing?",
        a: "General User Interface",
        b: "Graphic User Interface",
        c: "Graphical User Interface",
        d: "Global User Interface",
        correct: "c"
    },
    
    {
        question: "11.Which of the following is not an operating system?",
        a: "Windows",
        b: "Linux",
        c: "Oracle",
        d: "MacOS",
        correct: "c"
    },
    {
        question: "12.Which company created the Python programming language?",
        a: "Microsoft",
        b: "Apple",
        c: "Google",
        d: "Python Software Foundation",
        correct: "d"
    },
    {
        question: "13.What is the primary use of CSS in web development?",
        a: "To structure the content",
        b: "To define the logic",
        c: "To style the content",
        d: "To manage the database",
        correct: "c"
    },
    {
        question: "14.What is the name of the file that contains the bytecode in a Java program?",
        a: ".java",
        b: ".class",
        c: ".byte",
        d: ".exe",
        correct: "b"
    },
    {
        question: "15.What does XML stand for?",
        a: "Extensible Markup Language",
        b: "Extensive Markup Language",
        c: "External Markup Language",
        d: "Extra Markup Language",
        correct: "b"
    },
    {
        question: "16.Which of the following is an example of an interpreted language?",
        a: "C",
        b: "Java",
        c: "Python",
        d: "Assembly",
        correct: "c"
    },
    {
        question: "17.What does BIOS stand for in a computer system?",
        a: "Basic Input Output System",
        b: "Binary Input Output System",
        c: "Basic Internal Operating System",
        d: "Binary Internal Operating System",
        correct: "a"
    },
    {
        question: "18.Which open-source operating system is based on the Linux kernel?",
        a: "Windows",
        b: "MacOS",
        c: "Unix",
        d: "Ubuntu",
        correct :"d"
    },
    {
        question: "19.What does API stand for?",
        a: "Application Program Interface",
        b: "Application Programming Interface",
        c: "Advanced Programming Interface",
        d: "Application Protocol Interface",
        correct :"b"
    },
    {
        question: "20.What is the main purpose of a compiler?",
        a: "To execute the program",
        b: "To convert high-level language to machine code",
        c: "To debug the program",
        d: "To optimize the code",
        correct: "b"
    }


    // Add more quiz questions as needed
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const timerEl = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const viewHighScoresBtn = document.getElementById('view-highscores-btn');
const usernameInput = document.getElementById('username');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const highscoreScreen = document.getElementById('highscore-screen');
const highscoreList = document.getElementById('highscore-list');
const backBtn = document.getElementById('back-btn');
const resetBtn = document.getElementById('reset-btn');
const previousBtn = document.getElementById('previous-btn'); // Assuming you add IDs to your previous and next buttons
const nextBtn = document.getElementById('next-btn');

let currentQuiz = 0;
let score = 0;
let time = 600; // Set the starting time for the quiz in seconds (e.g., 20 minutes)
let timerInterval;
let username = '';

let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

startBtn.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
        startScreen.style.display = 'none';
        quizScreen.style.display = 'block';
        startQuiz();
    } else {
        alert('Please enter your name');
    }
});

viewHighScoresBtn.addEventListener('click', () => {
    startScreen.style.display = 'none';
    highscoreScreen.style.display = 'block';
    displayHighScores();
});

backBtn.addEventListener('click', () => {
    highscoreScreen.style.display = 'none';
    startScreen.style.display = 'block';
});

resetBtn.addEventListener('click', () => {
    localStorage.removeItem('highScores');
    highScores = [];
    displayHighScores();
});

function startQuiz() {
    loadQuiz();
    startTimer();
}

function loadQuiz() {
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

previousBtn.addEventListener('click', () => {
    if (currentQuiz > 0) {
        currentQuiz--;
        loadQuiz();
    
    }
});

nextBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++; // Increment score if answer is correct
        }
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            alert('You have reached the end of the quiz.');
            currentQuiz = quizData.length; // Ensures currentQuiz stays at the last question
            score=score-1;
        }
    } else {
        alert('Please select an answer.');
    }
});


submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz - 1].correct) {
            score++; // Increment score if answer is correct
        }
        displayScore(username, score); // Display final score
        
        saveHighScore(username, score); // Save the high score
        displayHighScores(); // Display high scores
        clearInterval(timerInterval);
        quizScreen.style.display = 'none'; // Hide quiz screen
    } else {
        alert('Please select an answer.');
    }
});

function startTimer() {
    timerInterval = setInterval(() => {
        time--;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerEl.innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        if (time <= 0) {
            clearInterval(timerInterval);
            quizScreen.style.display = 'none'; // Hide quiz screen
            displayScore(username, score); // Display final score
            highscoreScreen.style.display = 'block'; // Show high score screen
            saveHighScore(username, score); // Save the high score
            displayHighScores(); // Display high scores
        }
    }, 1000);
}

function saveHighScore(username, score) {
    highScores.push({ username, score });
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 5); // keep top 5 scores
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

function displayHighScores() {
    highscoreList.innerHTML = highScores
        .map((score, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${score.username}</td>
                <td>${score.score}</td>
            </tr>`)
        .join('');
}

function displayScore(username, score) {
    const scoreDisplay = document.createElement('div');
    scoreDisplay.classList.add('score-display');
    scoreDisplay.innerHTML = `
        <h2>${username}, your final score is ${score}/${quizData.length}</h2>
        <button onclick="location.reload()">Reload</button>
    `;
    quiz.appendChild(scoreDisplay);
}

   

    
