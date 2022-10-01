// Declare express
const express = require('express');

// Declare database and requitment
const JSONdb = require('simple-json-db');
const db = new JSONdb('database.json');

// Declare port
const app = express();
const port = 4040;

// Set view engine
app.set('view engine', 'ejs');

// Set main page
app.get('/', (req, res) => {
  app.locals.title = db.get('title');
  app.locals.postUrl = db.get('posturl');

  res.render('index');
})

// Set blog page
app.get('/post/:posturl', (req, res) => {
  postUrl = req.params.posturl;
  dbIndex = db.get('posturl').indexOf(postUrl);

  if (dbIndex != -1) {
    app.locals.title = db.get('title')[dbIndex];
    app.locals.content = db.get('content')[dbIndex];

    res.render('post');
  } else {
    res.send('Page not found :(')
  }
});

// Run app
app.listen(port, () => {
  console.log('App is live');
});