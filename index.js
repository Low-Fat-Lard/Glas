const express = require('express')
const app = express()
const http = require('http');

// Import socket.io
const socketIo = require('socket.io');
const server = http.Server(app);

// restart
const io = socketIo(server);
const path = require("path");
const { writeFileSync, readFileSync } = require('fs');
var data;
let loadPosts = () => JSON.parse(readFileSync('database.json'));
let loadReplies = () => JSON.parse(readFileSync('replies.json'));
var replies = { id: 1, body: '3000', time: '12:00' };
var config = [];
const d = new Date();
const dateFormat = d.toDateString();
var writectx = null;


io.on('connection', function connection(ws) {
  console.log('A new client Connected!');
  ws.send('Welcome New Client!');

  ws.on("reply", function incoming(message) {
    console.log('received: %s', message);

    var replyArray = message.toString();
    var reply = replyArray.split(",");

    replies = { id: parseInt(reply[0], 10), body: reply[1], time: dateFormat };
    writectx = message;
    const path = './replies.json';
    config.push(replies);
    try {
      writeFileSync(path, JSON.stringify(config, null, 2), 'utf8');
      console.log('Data successfully saved to disk');
    } catch (error) {
      console.log('An error has occurred ', error);
    }

  });
});

server.listen(3000, () => console.log(`Lisening on port :3000`))


app.use(express.static(__dirname + "/view"));
app.use(express.static(__dirname + '/public'));
//main page
app.get("/", function(request, response) {
  response.render(path.join(__dirname + "/view/index.ejs"));
})
//json
app.get("/posts", function(request, response) {
  response.send(loadPosts());
});
//search
app.get("/search/:searchterm", function(request, response) {
  app.locals.term = request.params.searchterm;
  response.render(path.join(__dirname + "/view/search.ejs"));
});
//post
app.get('/post/:posturl', (request, response) => {
  postUrl = request.params.posturl;
  for (var i = 0; i < loadPosts().length; i++) {
    dbIndex = JSON.stringify(loadPosts()[i]).indexOf(postUrl);
    if (loadPosts()[i].posturl == postUrl) {
      app.locals.title = loadPosts()[i].title;
      app.locals.content = loadPosts()[i].content;
      app.locals.posturl = loadPosts()[i].posturl;
    }
  }
  if (dbIndex != -1) {
    response.render(path.join(__dirname + "/view/post.ejs"));
  } else {
    //error
    response.send('Page not found :(')
  }
});

app.get("/replies", function(request, response) {
  response.send(loadReplies());
});