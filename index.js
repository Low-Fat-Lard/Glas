const express = require("express")
const app = express()
const http = require("http");

const server = http.Server(app);

const path = require("path");
const { writeFileSync, readFileSync } = require("fs");

let loadPosts = () => JSON.parse(readFileSync("database.json"));
let loadQuestions = () => JSON.parse(readFileSync(__dirname + "/public/json/questions.json"));
let loadAchieves = () => JSON.parse(readFileSync(__dirname + "/public/json/achievements.json"));

server.listen(3000, () => console.log(`Lisening on port :3000`))


app.use(express.static(__dirname + "/view"));
app.use(express.static(__dirname + "/public"));

//main page 
app.get("/", (request, response) => {
    response.render(path.join(__dirname + "/view/index.ejs"));
})
app.get("/about", function(request, response) {
    response.render(path.join(__dirname + "/view/about.ejs"));
})
app.get("/quiz/:term", function(request, response) {
    app.locals.term = request.params.term; response.render(path.join(__dirname + "/view/quiz.ejs"));
});
app.get("/game/:term", function(request, response) {
    app.locals.term = request.params.term; response.render(path.join(__dirname + "/view/game.ejs"));
});
app.get("/achievements", function(request, response) {
    response.render(path.join(__dirname + "/view/achieve.ejs"));
});
//post
app.get("/post/:posturl", (request, response) => {
    response.render(path.join(__dirname + "/view/post.ejs"));
});
//json
app.get("/posts", function(request, response) {
    response.send(loadPosts());
});
app.get("/questions", function(request, response) {
    response.send(loadQuestions());
});
app.get("/achieve", function(request, response) {
    response.send(loadAchieves());
});
