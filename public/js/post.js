
function encode(text, url) {
    console.log(url);
    text = text.replace(/"/gi, "")
    text = text.replace(/-i/gi, "<span style='font-style:italic;'>");
    text = text.replace(/-b/gi, "<span style='font-weight:900;'>");
    text = text.replace(/-u/gi, "<span style='text-decoration:underline;'>");
    text = text.replace(/-n-/gi, "</br>");
    text = text.replace(/-t-/gi, "<table>");
    text = text.replace(/-et-/gi, "</table>");
    text = text.replace(/-th-/gi, "<th>");
    text = text.replace(/-eth-/gi, "</th>");
    text = text.replace(/-tr-/gi, "<tr>");
    text = text.replace(/-etr-/gi, "</tr>");
    text = text.replace(/-td-/gi, "<td>");
    text = text.replace(/-etd-/gi, "</td>");
    text = text.replace(/-e/gi, "</span>");
    text = text.replace(/-h/gi, "<hr>");
    console.log(text);
    classifyText(url);
    document.getElementById("text").innerHTML = text;
}
function classifyText(url) {
    if (url == "Hangman") {
        document.getElementById("link").innerHTML = `<a class="link" href="https://glas.low-fat-lard.repl.co/game/hangman">Play Hangman</a>`
    }


}