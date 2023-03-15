
var x = document.getElementById("menuMusic");

var son = document.getElementById("imgon");
var soff = document.getElementById("imgoff");

var close = document.querySelector(".close");
var front = document.querySelector("#front");

var submit = document.getElementById("submit");
var input = document.getElementById("input");
var warn = document.getElementById("warn");

son.addEventListener("click", sonf);
soff.addEventListener("click", sofff);

close.addEventListener("click", (event) => {
    front.style = "display : none;";
    x.play();
})

submit.addEventListener("click", submitF);

function sonf(event) {
    x.pause();
    son.style = "display : none;";
    soff.style = "displsy : flex;";
}

function sofff(event) {
    x.play();
    son.style = "display : flex;";
    soff.style = "display : none;";
}

function submitF(event) {
    var name = input.value;

    if (name == "") {
        input.style = "border : solid 2px red;";
        warn.style = "display : block;";
    }
    else {
        sessionStorage.setItem("name", name);
        var level = localStorage.getItem(name);
        console.log("level = " + level);
        if (level == null || level == 1) {
            localStorage.setItem(name, 1);
            window.open("popUp1.html", "_self");
        } else {
            var ch = confirm("Do you want to continue your last experiment?");
            if(ch == false){
                window.open("popUp1.html", "_self");
            }else if(level == 2){
                window.open("popUp2.html", "_self");
            }else if(level == 3){
                window.open("popUp3.html", "_self");
            }else if(level == 4){
                window.open("popUp4.html", "_self");
            }
        }
    }
}

// function findCookie(name) {
//     var cookie = document.cookie.split(" ");
//     var c = [];
//     for (var i = 0; i < cookie.length; i++) {
//         c = cookie[i].split("=");
//         if (c[0] == name) {
//             return c[1].split(";")[0];
//         }
//     }
//     return null;
// }