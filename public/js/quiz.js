var questionAmount = 7,
  questionData = [],
  question = [],
  questions = [],
  currentQuestion = 0,
  id = 1,
  errors = [],
  questionurl = "",
  buttons;

var submit = document.getElementById("submit");

function init(url) {
  fetch("../questions").then(r => r.json()).then(async data => {
    questionData = data;
    load(url)
  })
}
function load(url) {
  questionurl = url;
  for (var i = 0; i < questionData.length; i++) {
    if (String(questionData[i].posturl) == url) {
      question.push(questionData[i]);
    }
  }
  checkType();
}
function checkType() {
  document.getElementById("number").innerHTML = (currentQuestion + 1) + "/" + question.length;
  if (question[currentQuestion].type == "choice") {
    loadChoice(question[currentQuestion]);
  } else if (question[currentQuestion].type == "text") {
    loadText();
  } else {
    console.log("Question Not Found!");
  }
}
function loadChoice(question) {
  submit.innerHTML = "";
  console.log(question.question)
  document.getElementById("question").innerHTML = question.question;
  for (var i = 0; i < question.questions.length; i++) {
    buttons = document.createElement("button");
    buttons.innerHTML = question.questions[i];
    buttons.id = i + 1;
    buttons.setAttribute("onclick", "check(" + buttons.id + ")");
    submit.appendChild(buttons);
  }
}
function check(selected) {
  console.log(selected)
  if (selected == question[currentQuestion].correct) {
    alert("CORRECT!");
  } else {
    if (question[currentQuestion].type == "choice") {
      errors.push([question[currentQuestion].questions[selected - 1], question[currentQuestion].questions[question[currentQuestion].correct - 1]]);
      console.log(errors);
    } else if (question[currentQuestion].type == "text") {

    } else {

    }

  }
  if ((currentQuestion + 1) < question.length) {
    currentQuestion += 1;
    checkType();
  } else {
    finish();
  }
}
function finish() {
  localStorage.setItem('errors', JSON.stringify(errors));
  localStorage.setItem('url', questionurl);
  window.location.assign("../results");
  console.log("Win")
}
// reload page on back button
window.addEventListener("pageshow", function(event) {
  var historyTraversal = event.persisted || (typeof window.performance != "undefined" && window.performance.navigation.type === 2);
  if (historyTraversal) {
    window.location.reload();
  }
});