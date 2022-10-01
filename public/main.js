//Input Search Bar 
const input = document.querySelector("input");
input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    //Searching mechanism. No real algorithm involved. Just searches through all of it. 
    search = true;
    var searchData = [];
    if (input.value.length > 2) {
      for (var i = 0; i < jsonData.length; i++) {
        if (jsonData[i].title.toLowerCase().includes(input.value)) {
          searchData.push(jsonData[i]);
        }
      }
      if (searchData != "") {
        error.innerHTML = searchData.length + " matches for " + input.value + "</br>";
        content.innerHTML = "";
        for (var i = 0; i < searchData.length; i++) {
          content.innerHTML += "<div class='box'><span class='floatright'>" + searchData[i].id + "</span><a href='post?id=" + searchData[i].id + "'>" + searchData[i].title + "</a></div>";
        }
      } else {
        //These two lines were the only two lines that worked first try throughout this whole thing.
        //Epic Programming.
        error.innerHTML = "No matches";
        content.innerHTML = "";
      }

    }
  }
});
console.log("Hello")