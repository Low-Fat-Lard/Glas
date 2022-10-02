//Post.js for GLAS


const urlParams = new URLSearchParams(location.search);
const socket = io();
var d = new Date();
const dateFormat = d.toDateString();


// SO MANY VARIABLES!! AHHH
var loadid = "",
  realid = 0,
  replies = 0,
  jsonReplyData = null,
  displayAmount = 6,
  displaydata = [],
  displayLength = 0,
  displayContent = [],
  runcount = 0,
  jsonData = null;

window.onscroll = function(ev) {
  if ((window.innerHeight + window.scrollY - document.body.scrollHeight) > -1) {
    displayAmount += 5;
    update();
  }
};
function init(posturl) {
  fetch("./replies").then(r => r.json()).then(async data => {
    jsonReplyData = data;
    loadJson(posturl);
  });
}


function loadJson(id) {
  loadid = id;
  displaydata = [];
  //looks through all data and responds with only the ones that are related to the page
  for (var i = 0; i < jsonReplyData.length; i++) {
    if (jsonReplyData[i].posturl == id) {
      realid = i;
      displaydata.push(jsonReplyData[i]);
    }
  }
  if (jsonReplyData[realid] == undefined || displaydata.length == 0) {
    //That's super sad
    document.getElementById("replynum").innerHTML = "No replies yet!";

  } else {
    //display stuff
    console.log(displaydata);
    if (displaydata.length == 1) {
      document.getElementById("replynum").innerHTML = "1 reply";
    } else {
      document.getElementById("replynum").innerHTML = displaydata.length + " replies";
    }
    update();

  }
}

function update() {
  document.getElementById("replies").innerHTML = "";
  console.log(displayAmount);
  displayLength = 0;
  displayContent = [];
  displaydata.forEach(r => {
    displayContent.splice(0, 0, "<p>" + r.time + "</p>" + r.body);
    if (displayLength < displayAmount) {
      document.getElementById("replies").innerHTML = displayContent.join("");
      displayLength += 1;
    }
  })
}

//connected
socket.addEventListener('open', function(event) {
  console.log('Connected to WS Server');
});

// Listen for messages
socket.addEventListener('message', function(event) {
  console.log('Message from server ', event.data);
});

function strip(html) {
  let doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}

//Input
const replyinput = document.getElementById("reply");
replyinput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    postMessage();
  }
});

function postMessage() {
  if (input.value.length >= 5) {
    replyData = [];
    replyData.push(loadid);
    replyData.push(strip(replyinput.value));
    socket.emit("reply", replyData);
    input.value = "";
    fetch("./replies").then(r => r.json()).then(async data => {
      jsonReplyData = data;
      loadJson();
    });
  }
  else {
    console.log("Replies must be at least 5 characters long!");
  }
}
//https://www.youtube.com/playlist?list=PLHis-V9WJV0xIVBLlk-4drnFdwKCNdyPD