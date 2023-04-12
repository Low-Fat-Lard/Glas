// selectors
var header = document.getElementById("header");
var post = document.getElementById("post");
var tagContent = document.getElementById("tags");
var input = document.getElementById("search");
var tag = "All";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
console.log(tag);
//populate articeles

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
                achievesNo += 1;
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
function searchPost() 
{
    var term = input.value;
    if (urlParams.get("tag")) 
    {
        tag = urlParams.get("tag");
    } else 
    {
        tag = "All"
    }
    //Searching mechanism. No real algorithm involved. Brute forces.
    var tagList = [];
    var searchData = [];
    // New search algo - should be faster
    data.forEach(r => {
        tagList = [];
        var subject = (r.title + tagList.join("") + r.excerpt).toLowerCase();
        var query = term.toLowerCase();
        
        for (var i = 0; i < r.tags.length; i++) 
        {
            tagList.push(r.tags[i].tag);
        }

        if ((subject).includes(query)) 
        {
            if (tag == "All" || tagList.join("").toLowerCase().includes(tag.toLowerCase())) 
            {
                searchData.push(r);
            }
        }
    });

    if (searchData != "") {
        content.innerHTML = "";
        for (var i = 0; i < searchData.length; i++) {
            content.innerHTML += cardPost(searchData[i])
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
            <a href="https://glas.low-fat-lard.repl.co/?tag=` + r.tag + `">
               <li id="`+ r.id + `" class="tag">
               ` + r.tag + `
               </li>
            </a>
    
            `
}
mistakes();
achievements();