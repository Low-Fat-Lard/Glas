if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require("express");
const fs = require("fs");
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const initializePassport = require('./passport-config')
const path = require("path")

initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)
const users = [];

if (fs.readFileSync(path.join(__dirname + "/public/json/users.json"), "utf8") != "") {
    const userJSON = fs.readFileSync(path.join(__dirname + "/public/json/users.json"), "utf8");
    for (var i = 0; i < users.length; i++) {
        users.shift();
    }
    for (var i = 0; i < JSON.parse(userJSON).length; i++) {
        users.push(JSON.parse(userJSON)[i]);
    }
    console.log(users);
}
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env['.env'],
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

const { writeFileSync, readFileSync } = require("fs");


app.use(express.static(__dirname + "/view"));
app.use(express.static(__dirname + "/public"));


let loadPosts = () => JSON.parse(readFileSync(__dirname + "/public/json/database.json"));
let loadQuestions = () => JSON.parse(readFileSync(__dirname + "/public/json/questions.json"));
let loadAchieves = () => JSON.parse(readFileSync(__dirname + "/public/json/achievements.json"));

//main page
app.get("/", checkAuthenticated, (request, response) => {
    response.render(path.join(__dirname + "/view/index.ejs"));
})
app.get("/about", function(request, response) {
    response.render(path.join(__dirname + "/view/about.ejs"));
})

app.get("/quiz/:term", function(request, response) {
    app.locals.term = request.params.term;
    response.render(path.join(__dirname + "/view/quiz.ejs"));
});

app.get("/game/:term", function(request, response) {
    app.locals.term = request.params.term;
    response.render(path.join(__dirname + "/view/game.ejs"));
});

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

//Login
app.get('/login', checkNotAuthenticated, (request, response) => {
    response.render(path.join(__dirname + "/view/login.ejs"))
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (request, response) => {
    response.render(path.join(__dirname + "/view/register.ejs"))
})
app.delete('/logout', (request, response) => {
    request.logOut()
    response.redirect('/login')
})

app.post('/register', checkNotAuthenticated, async (request, response) => {
    try {
        const hashedPassword = await bcrypt.hash(request.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: request.body.name,
            email: request.body.email,
            password: hashedPassword
        })
        fs.writeFile(path.join(__dirname + "/public/json/users.json"), JSON.stringify(users),
            {
                encoding: "utf8",
                flag: "w",
                mode: 0o666
            },
            (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written successfully\n");
                    console.log("The written has the following contents:");
                    console.log(fs.readFileSync(path.join(__dirname + "/public/json/users.json"), "utf8"));
                }
            });

        console.log("success");

        response.redirect('/login');

    } catch {
        console.log(users)
        response.redirect('/register')
    }
})


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}
app.listen(3000);