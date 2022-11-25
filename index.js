const express = require("express")
const app = express()
const http = require("http");

const server = http.Server(app);

const path = require("path");
const { writeFileSync, readFileSync } = require("fs");


server.listen(3000, () => console.log(`Lisening on port :3000`))


app.use(express.static(__dirname + "/view"));
app.use(express.static(__dirname + "/public"));

let loadPosts = () => JSON.parse(readFileSync(__dirname + "/public/json/database.json"));
let loadQuestions = () => JSON.parse(readFileSync(__dirname + "/public/json/questions.json"));
let loadAchieves = () => JSON.parse(readFileSync(__dirname + "/public/json/achievements.json"));

//main page
app.get("/", function(request, response) {
    response.render(path.join(__dirname + "/view/index.ejs"));
})
app.get("/about", function(request, response) {
    response.render(path.join(__dirname + "/view/about.ejs"));
})

app.get("/quiz/:term", function(request, response) {
    app.locals.term = request.params.term;
    response.render(path.join(__dirname + "/view/quiz.ejs"));
});
app.get("/results", function(request, response) {
    response.render(path.join(__dirname + "/view/results.ejs"));
})

app.get("/achievements", function(request, response) {
    response.render(path.join(__dirname + "/view/achieve.ejs"));
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

//search
app.get("/search/:searchterm", function(request, response) {
    app.locals.term = request.params.searchterm;
    response.render(path.join(__dirname + "/view/search.ejs"));
});
//post
app.get("/post/:posturl", (request, response) => {

    postUrl = request.params.posturl;
    for (var i = 0; i < loadPosts().length; i++) {
        dbIndex = JSON.stringify(loadPosts()[i]).indexOf(postUrl);
        if (loadPosts()[i].posturl == postUrl) {
            app.locals.title = loadPosts()[i].title;
            app.locals.content = loadPosts()[i].content;
            app.locals.posturl = loadPosts()[i].posturl;
            if (loadPosts()[i].image) {
                app.locals.image = loadPosts()[i].image;
            } else {
                app.locals.image = "";
            }
        }
    }
    response.render(path.join(__dirname + "/view/post.ejs"));
});
