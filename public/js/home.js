var scrollBtn = document.getElementById("top");

fetch("./posts").then(r => r.json()).then(async data => {
    jsonData = data;
    update();
})
const btnVisibility = () => {
    if (window.scrollY > 400) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
};
//Partial loding for Easing on GPU. 
//I mean, it still loads all of the data so it computes the same amount.
window.onscroll = function (ev) {
    btnVisibility();
    if (search == false) {
        if ((window.innerHeight + window.scrollY - document.body.scrollHeight) > -1) {
            content.innerHTML = "";
            displayAmount += 5;
            update();
        }
    }
};

scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

btnVisibility();