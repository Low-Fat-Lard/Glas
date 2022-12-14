//main.js for GLAS

var displayAmount = 7,
    jsonData = [],
    search = false,
    tags = "",
    header = document.getElementById("header"),
    error = document.getElementById("alert"),
    logo = document.getElementById("logo"),
    content = document.getElementById("content"),
    preloader = document.querySelector('.preloader');

document.getElementById("left").style.display = "none";
function expandTags(bits) {
    // for future use, add the numbers in hex together to add a tag. Having said that, the json maker should automaticly do the job
    let a = []
    if (bits & 0x1) a.push("grammar")
    if (bits & 0x2) a.push("vocab")
    if (bits & 0x4) a.push("reading")
    if (bits & 0x8) a.push("listening")
    if (bits & 0x10) a.push("nouns")
    if (bits & 0x20) a.push("verbs")
    if (bits & 0x40) a.push("adjectives")
    if (bits & 0x80) a.push("conjugation")
    if (bits & 0x100) a.push("irregular")
    if (bits & 0x200) a.push("regular")
    if (bits & 0x400) a.push("game")
    return a;
}
//Using the Update function for absolute Garbage.
//It's not even properly updating.
function update() {
    jsonData.forEach(r => {
        if (jsonData.indexOf(r) < displayAmount && content != undefined) {
            tags = expandTags(r.tags);
            content.innerHTML += `<a class="name" href="post/${r.posturl}"><div class="box"><div loading="lazy" class="cover" style="background-image: ${r.cover}"></div>${r.title} <br><span class="tags">${tags.join(", ")}</span > <br></div></a>`;
        }
    })
}
//Click
logo.addEventListener("click", (function() {
    window.location.assign("https://glas.low-fat-lard.repl.co");
}));

//Input Search Bar 
const input = document.querySelector("input");
input.addEventListener("keyup", (event) => {
    if (event.key === "Enter" && input.value.length > 2) {
        window.location.assign("https://glas.low-fat-lard.repl.co/search/" + input.value)
    }
});
window.addEventListener('load', () => {
    preloader.style.display = "none";
})
function navigate() {
    document.getElementById("left").style.display = document.getElementById("left").style.display === 'none' ? '' : 'none';;
}