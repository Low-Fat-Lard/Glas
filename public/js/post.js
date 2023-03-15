function createpost() {
    data.forEach(r => {
        console.log(r.slug + "," + path[2]);
        if (r.slug == path[2]) {
            document.getElementById("post").innerHTML = mainPost(r);
        } else if (path[2] == "random") {
            document.getElementById("post").innerHTML = mainPost(data[Math.floor(Math.random() * data.length)]);
        }
    })
}

function mainPost(r) {
    return `
        <header class="header">
          <h1 class="title">${r.title}</h1>
        </header>
        <div class="listTags">
        `+ displayTags(r.tags) + `
        </div> 
        `+ converter(r.mainContent) + `

        `+ createButton(r, r.articleType.articleType) + `
        <br>
            `
}

function createButton(r, type) {
    var text = "";
    var link = "";
    var style = "";
    if (type == "quiz") {
        text = "Take quiz on " + r.title;
        link = "https://glas.low-fat-lard.repl.co/quiz/" + r.slug;
    } else if (type == "game") {
        text = "Play game";
        link = "https://glas.low-fat-lard.repl.co/game/" + r.slug;
    } else {
        text = "";
        link = "";
        style = "display: none";
    }

    return `
    <a class="button" style="`+ style + `" href="` + link + `">` + text + `</a>
    `;
}

function converter(md) {
    var converter = new showdown.Converter();
    var html = converter.makeHtml(md);
    return html
}