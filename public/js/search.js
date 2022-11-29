
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
        content.innerHTML = searchData.length + " matches for '" + term + "'</br>";
        for (var i = 0; i < searchData.length; i++) {
            tags = expandTags(searchData[i].tags)
            content.innerHTML += `<a class="name" href="../post/${searchData[i].posturl}"><div class="box"><div loading="lazy"class="cover" style="background-image: ${searchData[i].cover}"></div>${searchData[i].title} <span class="tags">${tags.join(", ")}</span > <br></div></a>`
        }
    } else {
        //error handeling.
        content.innerHTML = "No matches";
    }
}