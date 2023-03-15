var tag = "All", // current selected tag. All is the default value
    // selectors
    header = document.getElementById("header"),
    post = document.getElementById("post"),
    tagContent = document.getElementById("tags"),
    input = document.getElementById("search");

//populate articeles
function populateArticles() {
    data.forEach(r => {
        content.innerHTML += cardPost(r);

    });
}
function mistakes() {
    if (localStorage.getItem("mistakes")) {
        var mistakes = JSON.parse(localStorage.getItem("mistakes"));
        document.getElementById("mistakes").innerHTML = mistakes.length;
    } else {
        document.getElementById("mistakes").innerHTML = "0";
        document.getElementById("link").href = "javascript: void(0)";
        document.getElementById("link").innerHTML = "No mistakes made";
    }

}
function achievements() {
    if (localStorage.getItem("achievements")) {
        var achieves = JSON.parse(localStorage.getItem("achievements"));
        var achievesNo = 0;
        for (var i = 0; i < achieves.length; i++) {
            if (achieves[i].complete == true) {
                achievesNo+=1;
            }
        }
        if (achievesNo == achieves.length) {
            achievesNo = "all"
        }
        document.getElementById("achievements").innerHTML = achievesNo;
    } else {
        document.getElementById("achievements").innerHTML = "0";
    }
}
// tag population function
function populateTags() {
    tags.forEach(r => {
        tagContent.innerHTML += tagPost(r);
    })
}
function clickHandle(clickedTag) {
    tag = clickedTag;
    searchPost();
}

function searchPost() {
    var term = input.value;
    //Searching mechanism. No real algorithm involved. Brute forces.
    var tagData = [];
    var searchData = [];
    data.forEach(r => {
        if (JSON.stringify(r.title).toLowerCase().includes(term.toLowerCase())) {
            searchData.push(r);
        }
    });
    searchData.forEach(t => {
        if (tag == "All") {
            tagData.push(t);
        } else {
            for (var i = 0; i < t.tags.length; i++) {
                if (tag.toLowerCase() == t.tags[i].tag.toLowerCase()) {
                    tagData.push(t);
                }
            }
        }
    });
    if (tagData != "") {
        content.innerHTML = "";
        for (var i = 0; i < tagData.length; i++) {
            content.innerHTML += cardPost(tagData[i])
        }
    } else {
        //error handeling.
        content.innerHTML = "No matches";
    }
}


function cardPost(r) {
    return `
            <a class="name" href="post/${r.slug}">
                <div class="blog">
                    <header class="header">
                      <h2 class="title">${r.title}</h2>
                    </header>
                    <div class="listTags">
                    `+ displayTags(r.tags) + `
                    </div> 
                    <p class="excerpt">${r.excerpt}</p>
                    <br>
                </div>
            </a>
            `
}

function tagPost(r) {
    return `
           <li id="`+ r.id + `" onclick="clickHandle('` + r.tag + `')" class="tag">
           ` + r.tag + `
           </li>
        `
}
mistakes();
achievements();