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
    specialType = "", //one off quiz types
    colours = ["red", "yellow", "orange", "green", "pink", "blue", "purple", "black", "white"],
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
    for (var i = 0; i < questionData.length; i++) {
        if (String(questionData[i].posturl) == url) {
            question.push(questionData[i]);
        }
    }
    checkType(url);
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
    input.setAttribute("onkeyup", "check()");
    input.autocomplete = "off";
    submit.appendChild(input);
    input.addEventListener("keyup", (function(event) {
        if (event.key === "Enter") {
            wrong = true;
            check();
        }
    }));
    var enter = document.createElement("button");
    enter.innerHTML = "submit";
    enter.className = "submit";
    enter.addEventListener("click", (function(event) {
        wrong = true;
        check();
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
    console.log(disabled);
    if (!disabled) {
        if (selected == question[currentQuestion].correct || types[type] == "text" && selected.toLowerCase() == question[currentQuestion].questions[question[currentQuestion].correct - 1].toLowerCase() || specialType == "colour" && selected == correctColour) {
            document.getElementById("quiz").style.background = "rgb(200, 255, 200)";
            if (types[type] == "text") {
                input.blur(); // song 2
            }
            disabled = true;
            setTimeout((function() {
                disabled = false;
                document.getElementById("quiz").style.background = "none";
                callEnd();
            }), 500)
        } else {
            if (types[type] == "choice") {
                errors.push([question[currentQuestion].questions[selected - 1], question[currentQuestion].questions[question[currentQuestion].correct - 1]]);
                document.getElementById("quiz").style.background = "rgb(255, 100, 100)";
                disabled = true;
                setTimeout((function() {
                    disabled = false;
                    document.getElementById("quiz").style.background = "none";
                    callEnd();
                }), 500)
            } else if (types[type] == "text") {
                if (wrong == true) {
                    errors.push([selected, question[currentQuestion].questions[question[currentQuestion].correct - 1]]);
                    document.getElementById("quiz").style.background = "rgb(255, 100, 100)";
                    setTimeout((function() {
                        document.getElementById("quiz").style.background = "none";
                        callEnd();
                    }), 500)
                }
            } else if (specialType == "colour") {
                errors.push([randomColour[selected], question[currentQuestion].correct]);
                document.getElementById("quiz").style.background = "rgb(255, 100, 100)";
                disabled = true;
                setTimeout((function() {
                    disabled = false;
                    document.getElementById("quiz").style.background = "none";
                    callEnd();
                }), 500)
            } else {
                console.warn("ERROR - Couldn't load question proparly")
            }
        }
    }
}
//adds special glyphs. Nothing too complicated.
function add(value) {
    var input = document.getElementById("input");
    input.value += value;
    input.focus();
    check();
}

function callEnd() {
    if ((currentQuestion + 1) < question.length) {
        currentQuestion += 1;
        checkType();
    } else {
        results();
    }
}

function results() {
    result.style.display = "block";
    main.style.display = "none";
    completeAchievement("In the aeroplane over the sea");
    if (errors.length === 0) {
        completeAchievement("OK computer");
        document.getElementById('results').innerHTML = '<h1 class="glas">PERFECT!</h1>';
    } else if (errors.length === question.length) {
        completeAchievement("Nevermind");
        let d = "<p>See what went wrong here:</p>";
        d += "<table><tr><th>Correct answer</th><th>Your answer</th></tr>";
        for (let err of errors) {
            d += "<tr><td>" + err[1] + "</td><td>" + err[0] + "</td></tr>";
        }
        d += "</table>";
        document.getElementById('results').innerHTML = d;
    } else {
        let d = "<p>See what went wrong here:</p>";
        d += "<table><tr><th>Correct answer</th><th>Your answer</th></tr>";
        for (let err of errors) {
            d += "<tr><td>" + err[1] + "</td><td>" + err[0] + "</td></tr>";
        }
        d += "</table>";
        document.getElementById('results').innerHTML = d;
    }
}

function replay() {
    location.reload();
}

function next() {
    window.location.assign("https://glas.low-fat-lard.repl.co/");
}