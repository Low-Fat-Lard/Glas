var achieveData = [],
    targetAchievement = '',
    completedAchievement = '';
//fetch
fetch("../achieve")
    .then(r => r.json())
    .then(async data => {
        if (!localStorage.achievements) {
            achieveData = data;
            setAchievements();
            draw();
        } else {
            achieveData = JSON.parse(localStorage.getItem('achievements'));
            draw();
        }
    });

function setAchievements() {
    let achievementsArray = [];
    achieveData.forEach(function(a) {
        let ac = {
            'name': a.name,
            'description': a.description,
            'complete': false
        }
        achievementsArray.push(ac);
    })
    localStorage.setItem('achievements', JSON.stringify(achievementsArray));
}
//Achievement updates - Updates localStorage
function updateAchievements() {
    localStorage.setItem('achievements', JSON.stringify(achieveData));
}

function completeAchievement(name) {
    console.log(name);
    achieveData.forEach(function(a) {

        if (a.name == name) {
            if (a.complete != true) {
                a.complete = true;
                targetAchievement = a
                completedAchievement = targetAchievement;
                document.getElementById("name").innerHTML = a.name;
                document.getElementById("description").innerHTML = a.description;
                document.getElementById("achievement").classList.add("active");
                setTimeout(function() {
                    achieveData[achieveData.indexOf(a)] = targetAchievement;
                    document.getElementById("achievement").classList.remove("active");
                }, 3500)
            } else {
                console.warn("ERROR")
            }
            updateAchievements();
            draw();
        }
    })
}

function draw() {

    achieveData = JSON.parse(localStorage.getItem('achievements'));
    var random = achieveData[Math.floor(Math.random() * achieveData.length)];
    document.getElementById("label").innerHTML = random.name;
    document.getElementById("achieve").innerHTML = random.description;
    if (document.getElementById("achievList")) {
        document.getElementById("achievList").innerHTML = "";
        achieveData.forEach(function(a) {
            var percent = Number(a.complete) * 75 + 25;
            document.getElementById("achievList").innerHTML +=
                "<div class='achievement' style='opacity:" + percent + "%'><div class='name'>" + a.name + "</div><div class='description'>" + a.description + "</div></div>";
        })
    }
}

function clearData() {
    if (confirm("Are you sure you want to do that? An bhfuil tú cinnte faoi sin?") == true) {
        localStorage.removeItem("achievements");
        location.reload();
    } else {
        text = "You canceled!";
    }
}