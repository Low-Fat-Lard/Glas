# Glas

[Glas](https://glas.low-fat-lard.repl.co) - An ineractive Irish learning website
## Table of Contents
1. [About](#about)
2. [Main Features](#main-features)
3. [Update Log](#update-log)
4. [Special Thanks](#special-thanks)

## About
Dia Dhaoibh! Glas was a very poor attemt to fix the bad sides of Duoligo. It gives you a detailed description of the topic. One of the things that I didn't like about the Duolingo system was the way it didn't show how you got your question wrong, so I tried my best so the experience feels like reading a book. Having said that, it's VERY bad. I guess it was too ambitious for a teenager to tackle on a multi-billion dollar co-operation. It's still open source if you want it, though. I'm thinking about paying repl so it doesn't take hours for the page to load. [Link to Website](https://glas.low-fat-lard.repl.co)

## Main Features

### Users
- The users are saved in a JSON file, using the Node Passport plugin. The password gets encoded, so it should be fine security wyse. 

### Achievements 
- Achievements are saved onto `LocalStorage`, where they are put into JSON format. They are all names of Albums I like. Give them a listen!

### Posts
- A clean blog system with it's own programming language, similar to markdown.

### Tests
- Tests pull a random quiz type, at the moment "muti-choice" and "text-input"

### Realitively Good CSS
- I know nothing about front-end. I tried my best to make it responsive.

### Games
- You can play hangman and a colour matching game. Will add more.

## Update Log
- [x] Make site mobile friendly
- [ ] Update the website
- [ ] Add more items

## Backend
The whole system works with a series of JSON files, by using the Javascript `fetch()` funciton. Here is how they are all made, for the non existant people that want to work on my website. I also added square brackets to all of them, which made it harder to work with, but easier to look at, in my opinion.

### Database.JSON
The [achievement](https://github.com/Low-Fat-Lard/Glas/blob/main/public/json/database.json) JSON file is the main JSON file used in the website. It's nothing but a blog framework. Just make sure to make a quiz that matches it. The tags use base 16 encoding. Good luck figuring that one out. *Hint: try looking into the [Main.js](https://github.com/Low-Fat-Lard/Glas/blob/main/public/js/main.js) file*
```json
[
  {
    "title": [""], // Post title. This will be displayed in the main page.
    "posturl": [""] // Post URL can be changed through here. Make sure to use a term not used before, or else the whole thing falls to pieces.
    "content": [""] // Post content. Does exactly what it says on the tin.
    "tags":
  }
]
```

### Achievement.JSON
The [achievement](https://github.com/Low-Fat-Lard/Glas/blob/main/public/json/achievements.json) JSON file is made to be as simple as possible, by only using the name and description. To trigger it, just put a `completeAchievement` function in the code, where you want it to be triggered, and put the achievement name in [string](https://www.w3schools.com/js/js_strings.asp) form.
```json
[
  {
    "name": [""], // Achievement Name
    "description": [""] // Achievement Description
  }
]
```

### Questions.JSON
The [Questions](https://github.com/Low-Fat-Lard/Glas/blob/main/public/json/questions.json) JSON file is.... Drum roll please.... FOR THE QUIZES! who could have guessed . 
```json
[
  {
    "question": [""], //Question
    "posturl": [""], //URL for the quiz.
    "questions": ["", "", "", ""], //If you want to add more questions, just add more strings.
    "correct": [] //Correct answer. Answer in number form, except for when it's colour mode, where you type in a string. (E.g. [1] selects the first question element.)
  }
]
```
I don't even know why I'm putting this much effort for something no one is going to see. lol.

## Special Thanks
Special Thanks to : My Irish Teacher, H.A. and S.W.J.
