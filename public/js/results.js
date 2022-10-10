var errors = JSON.parse(localStorage.getItem('errors'));
var quizurl = localStorage.getItem('url')
console.log(errors)
function results() {
  if (errors.length === 0) {
    document.getElementById('results').innerHTML = 'PERFECT!';
    validateAchieves("perfect");
  } else {
    let d = "<p>See what went wrong here:</p>";
    d += "<table><tr><th>Correct answer</th><th>Your answer</th></tr>";
    for (let err of errors) {
      d += "<tr><td>" + err[1] + "</td><td>" + err[0] + "</td>";
    }
    d += "</table>";
    document.getElementById('results').innerHTML = d;
    localStorage.removeItem('errors');
  }
}
function replay() {
  localStorage.removeItem('url');
  console.log(quizurl)
  window.location.assign("https://glas.low-fat-lard.repl.co/quiz/" + quizurl);
}
function next() {
  window.location.assign("https://glas.low-fat-lard.repl.co/");
}