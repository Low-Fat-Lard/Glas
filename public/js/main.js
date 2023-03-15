//main.js for GLAS

var data = []; // main data storage
var tags = []; // mian tag storage
var content = document.getElementById("content");
var path = window.location.pathname.split("/");
// read-only datocms token
const token = 'fba3a390146d01c2e3dce13c40b038';

// init all functions and load datocms data
function init() {

    // datocms data. use the datocms API explorer
    fetch(
        'https://graphql.datocms.com/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                query: `        
                {
                allArticles {
                    mainContent
                    publishDate
                    slug
                    title
                    excerpt
                    tags {
                      tag
                      id
                    }
                    author {
                      name
                      id
                    }
                    articleType {
                      articleType
                    }
                  }
                  allTags {
                    tag
                    id
                  }
                }`
            }),
        }
    )
        .then(res => res.json())
        .then((res) => {
            data = res.data.allArticles;
            tags = res.data.allTags;
            if (content) {
                populateArticles();
                populateTags();
            } else {
                createpost();
            }

        })
        .catch((error) => {
            console.log(error);
        });
}

function displayTags(tags) {
    var displaytag = "";
    for (var i = 0; i < tags.length; i++) {
        displaytag += `<p class="listTag" id="` + tags[i].id + `">` + tags[i].tag + `</p>`
    }
    return displaytag;
}

init();