
function encode(text) {
  text = text.replace(/"/gi, "")
  text = text.replace(/-i/gi, "<span style='font-style:italic;'>");
  text = text.replace(/-b/gi, "<span style='font-weight:900;'>");
  text = text.replace(/-u/gi, "<span style='text-decoration:underline;'>");
  text = text.replace(/--/gi, "</br>");
  text = text.replace(/-n/gi, "</span>");
  text = text.replace(/-h/gi, "<hr>");
  console.log(text);
  document.getElementById("text").innerHTML = text;
}