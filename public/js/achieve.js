var achieveData = [],
  achieves = [];
//fetch
fetch("../achieve").then(r => r.json()).then(async data => {
  if (localStorage.achieve && JSON.parse(localStorage.achieve).length == data.length) {
    //code on the top defines if I have updated the achieve file or not
    achieveData = JSON.parse(localStorage.achieve);
    achievements();
    changeMenu();
  } else {
    achieveData = data;
    achievements();
    changeMenu();
  }
});
function changeMenu() {
  var progressLabel = document.getElementById("label");
  var progressBar = document.getElementById("achieve");
  var progressTag = document.getElementById("percent");

  var randomArray = achieveData[Math.floor(Math.random() * achieveData.length)];
  console.log(randomArray);
  var percent = 0;
  if (achieveData.progress != undefined) {
    achieveData.progress < achieveData.amount ? Math.floor((achieveData.progress / achieveData.amount) * 100) : 100;
  } else
    if (randomArray.progress != undefined) {
      percent = randomArray.progress < randomArray.amount ? Math.floor((randomArray.progress / randomArray.amount) * 100) : 100;
    } else {
      percent = 0;
    }
  progressLabel.innerHTML = randomArray.name;
  progressBar.innerHTML = "<progress value=" + randomArray.progress + " max=" + randomArray.amount + ">  " + percent + "</progress>";
  progressTag.innerHTML = (randomArray.amount > 1 ? percent + "%" : "Not") + " complete" + (randomArray.amount > 1 ? " (" + (randomArray.amount - randomArray.progress) + " to go)" : "");
}
function achievements() {
  for (var i = 0; i < achieveData.length; i++) {
    if (achieveData[i].progress) {
      achieves.push(new achieve(achieveData[i].name, achieveData[i].description, achieveData[i].type, achieveData[i].amount, achieveData[i].reward, achieveData[i].checked, achieveData[i].progress));
    } else {
      achieves.push(new achieve(achieveData[i].name, achieveData[i].description, achieveData[i].type, achieveData[i].amount, achieveData[i].reward));
    }
  }
  achieves.forEach(populateAchieves)
  achieves.forEach(checkAchieves)
}
//achieve var
var achieve = function(name, desc, type, amount, reward, checked, progress) {
  this.name = name;
  this.desc = desc;
  this.reward = reward;
  this.amount = amount;
  this.type = type;
  this.checked = checked || false;
  this.progress = progress || 0;
}
function populateAchieves(item, index) {
  //display all divs
  var main = document.getElementById("main"),
    newDiv = document.createElement("div"),
    span = document.createElement("strong"),
    span2 = document.createElement("span"),
    span3 = document.createElement("span"),
    achieveName = document.createTextNode(item.name),
    achieveGoal = document.createTextNode(item.desc);
  newDiv.className = "achieves";
  span.className = "achievement";
  span.appendChild(achieveName);
  newDiv.appendChild(span);
  span2.className = "description";
  span2.appendChild(achieveGoal);
  newDiv.appendChild(span2);
  span3.className = "progress";
  newDiv.appendChild(span3);
  if (main != undefined) {
    main.appendChild(newDiv);
  }
}
function checkAchieves(item, index) {
  let divs = document.querySelectorAll(".achieves");
  let span3 = document.querySelectorAll(".progress");
  let pct = item.progress < item.amount ? Math.floor((item.progress / item.amount) * 100) : 100;

  localStorage.achieve = JSON.stringify(achieveData);
  console.log(item.progress)
  if (item.progress != undefined) {
    achieves[index].progress = item.progress;
    achieveData = achieves
  }
  if (!JSON.parse(localStorage.achieve)[index].checked) {
    // not complete
    if (span3[index] != undefined) {
      span3[index].innerHTML = "<progress value=" + item.progress + " max=" + item.amount + ">  " + pct + "</progress> </br> " + (item.amount > 1 ? pct + "%" : "Not") + " complete" + (item.amount > 1 ? " (" + (item.amount - item.progress) + " to go)" : "");
      divs[index].title = (item.amount > 1 ? pct + "%" : "Not") + " complete" + (item.amount > 1 ? " (" + (item.amount - item.progress) + " to go)" : "");

    }
    if (!JSON.parse(localStorage.achieve)[index].checked) {
      //Shows achievement
      showAchieve(item, index - 1);
    }

  } else {
    //complete
    divs[index].title = "Complete";

  }
}
function showAchieve(item, index) {
  let divs = document.querySelectorAll(".achieves"),
    banner = document.querySelector(".bar"),
    name = document.querySelectorAll(".achievement"),
    description = document.querySelectorAll(".description");
  if (divs[index] != undefined) {
    divs[index].className = "checked";
  }

  achieves[index].checked = true;

  achieveData = array;
  localStorage.achieve = JSON.stringify(achieveData);
  console.log(JSON.parse(localStorage.achieve))
  if (Array.from(banner.classlist).indexOf("earned") > -1) {
    banner.classlist.remove("earned");
    void banner.offsetWidth;
  }

  banner.classlist.add("earned");
  name[0].innerHTML = item.name;
  description[0].innerHTML = item.reward;
  if (divs[index] != undefined) {
    description[index].innerHTML = item.reward;
  }
}
function validateAchieves(type) {
  var item = "";
  for (var i = 0; i < JSON.parse(localStorage.achieve).length; i++) {
    if (JSON.parse(localStorage.achieve)[i].type == type) {
      console.log(JSON.parse(localStorage.achieve)[0])
      item = JSON.parse(localStorage.achieve)[i];
      item.progress += 1;
      console.log(item)
      checkAchieves(item, JSON.parse(localStorage.achieve).indexOf(item) + 1);
    }
  }

}