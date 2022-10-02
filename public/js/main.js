//index.js for GLAS

var displayAmount = 7,
    jsonData = null,
    search = false,
    header = document.getElementById("header"),
    error = document.getElementById("alert"),
    logo = document.getElementById("logo"),
    content = document.getElementById("content");

//Using the Update function for absolute Garbage.
//It's not even properly updating.
function update() {
    jsonData.forEach(r => {
        if (jsonData.indexOf(r) < displayAmount) {
            content.innerHTML += `<div class="box"><a href="post/${r.posturl}">${r.title}</a> <br></div>`;
        }
    })
}
//Click
logo.addEventListener("click", function () {
  window.location.assign("https://glas.low-fat-lard.repl.co");
});

//Input Search Bar 
const input = document.querySelector("input");
input.addEventListener("keyup", (event) => {
    if (event.key === "Enter" && input.value.length > 2) {
       window.location.assign("https://glas.low-fat-lard.repl.co/search/"+input.value)
    }
});
