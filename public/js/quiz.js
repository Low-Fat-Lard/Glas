var questionAmount = 7,
    questionData = [],
    question = [],
    questions = [],
    currentQuestion = 0,
    id = 1,
    wrong = false,
    disabled = false,
    errors = [],
    assist = ["á", "é", "í", "ó", "ú"],
    types = ["choice", "text"], //main quiz types
    specialType = "", //once off quiz types
    colours = ["red", "yellow", "orange", "green", "pink", "blue", "purple", "black"],
    randomColour = "green",
    correctColour = 1,
    type = Math.floor(Math.random() * types.length),
    buttons;
var submit = document.getElementById("submit"),
    result = document.getElementById("result"),
    main = document.getElementById("quiz");

function init(url) {
    result.style.display = "none";
    fetch("../questions").then(r => r.json()).then(async data => {
        questionData = data; load(url)
    })
}
//Loads questions
function load(url) {
    if (url == "practice") {
        completeAchievement("Summerteeth");
        var mistakes = JSON.parse(localStorage.getItem("mistakes"));
        for (var i = 0; i < questionData.length; i++) {
            for (var l = 0; l < mistakes.length; l++) {
                if (JSON.stringify(mistakes[l][0]) == JSON.stringify(questionData[i].question)) {
                    question.push(questionData[i]);
                }
            }

        }
    } else {
        if (url == "colours") {
            completeAchievement("Blue");
        }
        for (var i = 0; i < questionData.length; i++) {
            if (String(questionData[i].posturl) == url) {
                question.push(questionData[i]);
            }
        }
    }
    checkType(url);
}
function multipleInArray(arr, values) {
    return values.every(value => {
        var lowercaseWords = arr.map(ar => ar.toLowerCase());
        return lowercaseWords.includes(value);
    });
}
//Checks type
function checkType(url) {
    if (url == "colours" || specialType == "colour") {
        specialType = "colour";
        type = 3;
    } else {
        type = Math.floor(Math.random() * types.length);
    }
    document.getElementById("number").innerHTML = (currentQuestion + 1) + "/" + question.length;
    if (specialType == "colour") {
        loadColour(question[currentQuestion]);
    } else if (types[type] == "choice") {
        loadChoice(question[currentQuestion]);
    } else if (types[type] == "text") {
        loadText(question[currentQuestion]);
    } else {
        console.log(types[type]);
    }
}
//button based quiz
function loadChoice(question) {
    submit.innerHTML = "";
    document.getElementById("question").innerHTML = question.question;
    for (var i = 0; i < question.questions.length; i++) {
        buttons = document.createElement("button");
        buttons.innerHTML = question.questions[i];
        buttons.id = i + 1;
        buttons.setAttribute("onclick", "check(" + buttons.id + ")");
        submit.appendChild(buttons);
    }
}
//text based quiz
function loadText(question) {
    submit.innerHTML = "";
    document.getElementById("question").innerHTML = question.question;
    var input = document.createElement("input");
    input.id = "input";
    input.autocomplete = "off";
    submit.appendChild(input);
    input.addEventListener("keyup", (function (event) {
        if (event.key === "Enter") {
            wrong = true;
            check();
        }
    }));
    var enter = document.createElement("button");
    enter.innerHTML = "submit";
    enter.className = "submit";
    enter.addEventListener("click", (function (event) {
        wrong = true;
        check();
        wrong = false;
    }));
    submit.appendChild(enter);
    for (var i = 0; i < assist.length; i++) {
        buttons = document.createElement("button");
        buttons.innerHTML = assist[i];
        buttons.className = "assist";
        buttons.setAttribute("onclick", "add('" + assist[i] + "')");
        submit.appendChild(buttons);
    }
}
//colour based quiz
function loadColour(question) {
    submit.innerHTML = "";
    document.getElementById("question").innerHTML = "What colour is " + question.question;
    randomColour = colours
        .map(value => ({
            value,
            sort: Math.random()
        }))
        .sort((a, b) => a.sort - b.sort)
        .map(({
            value
        }) => value)
    var replaced = JSON.stringify(question.correct).replace(/[\[\]']+/g, '').replace(/["]+/g, '');//just some debugging
    randomColour.splice(randomColour.indexOf(replaced), 1); //removes original colour
    randomColour.splice(Math.floor(Math.random() * 5), 0, replaced); // re-adds it
    correctColour = randomColour.indexOf(replaced);
    for (var i = 0; i < 5; i++) { // creates buttons
        buttons = document.createElement("button");
        buttons.style.background = randomColour[i];
        buttons.id = i;
        buttons.classList = "colour";
        buttons.setAttribute("onclick", "check(" + buttons.id + ")");
        submit.appendChild(buttons);
    }
}

//checks answer
function check(select) {
    var selected;
    var input = document.getElementById('input');
    if (types[type] == "text") {
        selected = input.value;
    } else {
        selected = select;
    }
    if (!disabled) {
        if (types[type] == "choice" && multipleInArray(question[currentQuestion].correct, [question[currentQuestion].questions[selected - 1].toLowerCase()]) || types[type] == "text" && multipleInArray(question[currentQuestion].correct, [selected.toLowerCase()]) || specialType == "colour" && selected == correctColour) {
            if (types[type] == "text") {
                input.blur(); // song 2
            }
            border("correct")
        } else {
            if (types[type] == "choice") {
                errors.push([question[currentQuestion].question, question[currentQuestion].questions[selected - 1], question[currentQuestion].correct.join(" / ")]);
                border("wrong")

            } else if (types[type] == "text") {
                if (wrong == true) {
                    errors.push([question[currentQuestion].question, selected, question[currentQuestion].correct.join(" / ")]);
                    border("wrong")
                }
            } else if (specialType == "colour") {
                errors.push([question[currentQuestion].question, randomColour[selected], question[currentQuestion].correct]);
                border("wrong")
            } else {
                console.warn("ERROR - Couldn't load question proparly")
            }
        }
    }
}
function border(type) {
    var colour = "#ffffff"
    if (type == "correct") {
        colour = "rgb(200, 255, 200)";
    } else {
        colour = "rgb(255, 100, 100)";
    }
    document.getElementById("quiz").style.border = "5px solid " + colour;
    disabled = true;
    setTimeout((function () {
        disabled = false;
        document.getElementById("quiz").style.border = "5px solid white";
        if (type == "correct") {
            callEnd();
        } else {
            correctMistake();
        }
    }), 500);
}
//adds special glyphs. Nothing too complicated.
function add(value) {
    var input = document.getElementById("input");
    input.value += value;
    input.focus();
}

function correctMistake() {
    var html = "<h4>Correct answer</h4>"
    html += "<p>" + errors[errors.length - 1][2] + "</p>"
    html += "<h4>Your answer</h4>"
    html += "<p>" + errors[errors.length - 1][1] + "</p>"
    buttons = document.createElement("button");
    buttons.innerHTML = "next";
    buttons.setAttribute("onclick", "callEnd()");
    submit.innerHTML = html;
    submit.appendChild(buttons);
}

function callEnd() {
    if ((currentQuestion + 1) < question.length) {
        currentQuestion += 1;
        checkType();
    } else {
        results();
    }
}
function displayResults() {
    var mis = [];
    let d = "<p>See what went wrong here:</p>";
    d += "<table><tr><th>Question</th><th>Correct answer</th><th>Your answer</th></tr>";
    for (let err of errors) {
        d += "<tr><td>" + err[0] + "</td><td>" + err[2] + "</td><td>" + err[1] + "</td></tr>";
        mis.push(err[0]);
    }
    if (specialType != "colour") {
        localStorage.setItem("mistakes", JSON.stringify(errors));
    }
    d += "</table>";
    document.getElementById("results").innerHTML = d;
}
function results() {
    result.style.display = "block";
    main.style.display = "none";
    //completeAchievement("John Peel Sessions");
    if (errors.length === 0) {
        //completeAchievement("OK computer");
        document.getElementById('results').innerHTML = '<h1 class="glas">PERFECT!</h1>';
    } else if (errors.length === question.length) {
        //completeAchievement("Nevermind");
        displayResults();
    } else {
        displayResults();
    }
}

function replay() {
    location.reload();
}

function next() {
    window.location.assign("https://glas.low-fat-lard.repl.co/");
}