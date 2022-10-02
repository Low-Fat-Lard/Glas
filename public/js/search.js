
function init(term) {
  fetch("../posts").then(r => r.json()).then(async data => {
    jsonData = data;
    search(term)
  })
}
function search(term) {
  console.log(term)
  //Searching mechanism. No real algorithm involved. Brute forces.
  search = true;
  var searchData = [];
  jsonData.forEach(r => {
    console.log(r.title);
    if (JSON.stringify(r.title).toLowerCase().includes(term.toLowerCase())) {
      searchData.push(r);
    }
  })
  if (searchData != "") {
    error.innerHTML = searchData.length + " matches for '" + term + "'</br>";
    content.innerHTML = "";
    for (var i = 0; i < searchData.length; i++) {
      content.innerHTML += `<div class="box"><a href="../post/${searchData[i].posturl}">${searchData[i].title}</a> <br></div>`
    }
  } else {
    //error handeling.
    error.innerHTML = "No matches";
  }
}