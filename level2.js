
class eater {
    xposition = 36;
    yposition = 52;

    heart = 3;
}

class gust {
    xposition;
    yposition;

    gustNum;

    lastx = -20;
    lasty = -20;

    gofhomex;
    gofhomey;

    gColoring = false;

    mode = 1; // 1 -> in home , 1 -> go to stare , 3 -> walk ,4 -> escape , 5 -> catch kek

    storeP() {
        this.lastx = this.xposition;
        this.lasty = this.yposition;
    }
}

//__copy funcion_________
var linkList = document.querySelectorAll(".link a");
for(var i = 0 ; i < linkList.length ; i++){
    linkList[i].addEventListener("click" , () => {
        navigator.clipboard.writeText("kekpac.com");
        alert("Site address copied !!!");
    });
}



document.addEventListener("keydown", direction);

//connect
var canvas = document.getElementById("gamePlat");
var ctx = canvas.getContext('2d');

var scoreShow = document.getElementById("score");
var timerShow = document.getElementById("timer");

var gameOver = document.getElementById("gameOver");
var win = document.getElementById("win");
var loseH = document.getElementById("loseHeart");

var stopP = document.getElementById("stopPopUp");

//direction images for mobile

let stoped = false;

document.getElementById("upd").addEventListener("touchstart", function (e) {//up
    up = true;
    newisup = true;
    newisdown = false;
    newisleft = false;
    newisright = false;
});

document.getElementById("downd").addEventListener("touchstart", function (e) {//down
    down = true;
    newisup = false;
    newisdown = true;
    newisleft = false;
    newisright = false;
});

document.getElementById("leftd").addEventListener("touchstart", function (e) {//left
    left = true;
    newisup = false;
    newisdown = false;
    newisleft = true;
    newisright = false;

    img = document.getElementById("EaterLeft");
    imgOpen = document.getElementById("EaterLeftOpen");
});

document.getElementById("rightd").addEventListener("touchstart", function (e) {//right
    right = true;
    newisup = false;
    newisdown = false;
    newisleft = false;
    newisright = true;

    img = document.getElementById("EaterRight");
    imgOpen = document.getElementById("EaterRightOpen");
});

document.getElementById("stopB").addEventListener("touchstart", function (e) {//stop
    if (stoped) {
        stoped = false;

        moveF = setInterval(move, 100)
        gust1 = setInterval(gustMove, spead, gusts[0]);
        gust2 = setInterval(gustMove, spead, gusts[1]);
        gust3 = setInterval(gustMove, spead, gusts[2]);
        gust4 = setInterval(gustMove, spead, gusts[3]);

        if (soulSv.paused == true && soundB == true) {
            soulSv.play();
        }

        pend.play();
        stopP.style = "display : none;";

    } else {
        stoped = true;

        pstart.play();
        stopP.style = "display : flex;";

        clearInterval(moveF);
        clearInterval(gust1);
        clearInterval(gust2);
        clearInterval(gust3);
        clearInterval(gust4);

        soulSv.pause();

    }
});

//images
var img = document.getElementById("EaterLeft");
var imgOpen = document.getElementById("EaterLeftOpen");

var coffi1 = document.getElementById("coffi1");
var coffi1Left = document.getElementById("coffi1-left");

var coffi2Right = document.getElementById("coffi2-left");
var coffi2Left = document.getElementById("coffi2-right");

var coffi3Right = document.getElementById("coffi3-left");
var coffi3Left = document.getElementById("coffi3-right");

var coffi4Right = document.getElementById("coffi4-left");
var coffi4Left = document.getElementById("coffi4-right");

var coffi_img = [coffi1, coffi1Left, coffi2Left, coffi2Right, coffi3Left, coffi3Right, coffi4Left, coffi4Right];
var last_img = [coffi1, coffi2Left, coffi3Left, coffi4Left];
var imgLocal;
var imageCounter = 0;

//voice
const dotEv = document.getElementById("dotEate");
const soulEv = document.getElementById("soulEate");
var soulSv = new Audio("voice/ghost hunt fase.mp3");
var soundB = false;
const deathEv = document.getElementById("death");
const losev = document.getElementById("ls");
const winv = document.getElementById("ws");
const pend = document.getElementById("pend");
const pstart = document.getElementById("pstart");

//hearts
const h1 = document.querySelector("#heart1");
const h2 = document.querySelector("#heart2");
const h3 = document.querySelector("#heart3");
const hearts = [h1, h2, h3];

//node and score
let nodes = 0;
let score = 0;

//direction booleans
let up = false;//1
let down = false;//2
let right = false;//3
let left = false;//4

let newisup = false;
let newisdown = false;
let newisleft = false;
let newisright = false;

let done = false;
let winb = false;

//gusts declaration
const gusts = [];
for (var i = 0; i < 4; i++) {
    gusts[i] = new gust;
}
gusts[0].xposition = 40;
gusts[0].yposition = 30;
gusts[0].gofhomex = 24;
gusts[0].gofhomey = 20;
gusts[0].gustNum = 0;

gusts[1].xposition = 38;
gusts[1].yposition = 33;
gusts[1].gofhomex = 50;
gusts[1].gofhomey = 18;
gusts[1].gustNum = 1;

gusts[2].xposition = 32;
gusts[2].yposition = 30;
gusts[2].gofhomex = 20;
gusts[2].gofhomey = 35;
gusts[2].gustNum = 2;

gusts[3].xposition = 35;
gusts[3].yposition = 33;
gusts[3].gofhomex = 50;
gusts[3].gofhomey = 33;
gusts[3].gustNum = 3;

var spead = 100;

var gustMode = 1;  //1 -> in home , 1 -> go to stare , 3 -> walk ,4 -> escape , 5 -> catch kek
var hitedGust = -1;

//timers
var redraw = 1;
var gameTimer = 3000;
var scapGust = -1;
var timerCounter = 1;

//sett name
var n = sessionStorage.getItem("name");
var nameF = document.getElementById("name");
nameF.innerText = "*" + n + "*";

//Eater declaration
var E = new eater();

//game plat difinition
let gameMat =
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1],
        [1, 3, 3, 3, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 3, 3, 3, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 3, 3, 3, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 4, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 3, 3, 1],
        [1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 3, 3, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 3, 3, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 4, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 3, 3, 3, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 3, 3, 3, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 3, 3, 3, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];



//draw game plat
for (var i = 0; i < 75; i++) {
    for (var j = 0; j < 60; j++) {
        if (i == E.xposition && j == E.yposition) {//main character

            ctx.drawImage(img, E.xposition * 10, E.yposition * 10, 30, 30);

            gameMat[i][j] = 0;
            gameMat[i + 1][j] = 0;
            gameMat[i][j + 1] = 0;
            gameMat[i + 1][j] = 0;
        }
        else if (gameMat[i][j] == 1) {//wall
            ctx.fillStyle = "rgb(255 , 242 , 0)";
            ctx.fillRect(i * 10, j * 10, 10, 10);

        }
        else if (gameMat[i][j] == 2 && gameMat[i][j + 1] == 2 && gameMat[i][j + 2] == 2 && gameMat[i + 1][j] == 2 && gameMat[i + 1][j + 1] == 2 && gameMat[i + 1][j + 2] == 2 && gameMat[i + 2][j] == 2 && gameMat[i + 2][j + 1] == 2 && gameMat[i + 2][j + 2] == 2) {//node

            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.arc(i * 10 + 15, j * 10 + 15, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();

            nodes += 1;

            gameMat[i][j] = 7;

        }
        else if (gameMat[i][j] == 3 && gameMat[i + 1][j] == 3 && gameMat[i][j + 1] == 3 && gameMat[i + 1][j + 1] == 3 && gameMat[i + 2][j] == 3 && gameMat[i + 2][j + 1] == 3 && gameMat[i + 2][j + 2] == 3 && gameMat[i][j + 2] == 3 && gameMat[i + 1][j + 2] == 3) {

            ctx.beginPath();
            ctx.fillStyle = "#FFB0B0";
            ctx.arc(i * 10 + 15, j * 10 + 15, 7, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

//draw gusts
for (var i = 0; i < 4; i++) {

    ctx.drawImage(coffi_img[gusts[i].gustNum * 2], gusts[i].xposition * 10, gusts[i].yposition * 10, 30, 30);
}

console.log(nodes);

var body = document.querySelector("body");
body.onload = (event) => {
    var f = localStorage.getItem(n);
    if(f == null){
        window.open("index.html", "_self");
    }else if(f >= 2){
        start();
    }
}


function start(){
    setTimeout(() => {
        moveF = setInterval(move, 100);
    
        gust1 = setInterval(gustMove, spead, gusts[0]);
        gust2 = setInterval(gustMove, spead, gusts[1]);
        gust3 = setInterval(gustMove, spead, gusts[2]);
        gust4 = setInterval(gustMove, spead, gusts[3]);
    }, 300);
}

//________________direction function__________________
function direction(event) {

    if (event.key == "ArrowUp" || event.key == "w") {//up
        up = true;
        newisup = true;
        newisdown = false;
        newisleft = false;
        newisright = false;
    }
    else if (event.key == "ArrowDown" || event.key == "s") {//down

        down = true;
        newisup = false;
        newisdown = true;
        newisleft = false;
        newisright = false;

    }
    else if (event.key == "ArrowLeft" || event.key == "a") {//left

        left = true;
        newisup = false;
        newisdown = false;
        newisleft = true;
        newisright = false;

        img = document.getElementById("EaterLeft");
        imgOpen = document.getElementById("EaterLeftOpen");

    }
    else if (event.key == "ArrowRight" || event.key == "d") {//right
        right = true;
        newisup = false;
        newisdown = false;
        newisleft = false;
        newisright = true;

        img = document.getElementById("EaterRight");
        imgOpen = document.getElementById("EaterRightOpen");

    } else if (event.key == "Shift") {
        if (stoped) {
            stoped = false;

            moveF = setInterval(move, 100)
            gust1 = setInterval(gustMove, spead, gusts[0]);
            gust2 = setInterval(gustMove, spead, gusts[1]);
            gust3 = setInterval(gustMove, spead, gusts[2]);
            gust4 = setInterval(gustMove, spead, gusts[3]);

            if (soulSv.paused == true && soundB == true) {
                soulSv.play();
            }

            pend.play();
            stopP.style = "display : none;";

        } else {
            stoped = true;

            pstart.play();
            stopP.style = "display : flex;";

            clearInterval(moveF);
            clearInterval(gust1);
            clearInterval(gust2);
            clearInterval(gust3);
            clearInterval(gust4);

            soulSv.pause();

        }
    }

}

//____________move function ___________________
function move() {
    done = false;
    var lisLeft = false;

    //timer updating
    if (gameTimer % 10 == 0) {
        timerShow.style = "color : white;";
        if (gameTimer < 600) {
            timerShow.style = "color : red; transform: scale(1.1); font-weight : bolder;";
        }
        timerShow.innerHTML = parseInt(gameTimer / 600) + ":" + (gameTimer % 600) / 10;
    }
    gameTimer -= 1
    scoreShow.innerHTML = "score is : " + score;

    //clear
    ctx.fillStyle = "rgb(99, 94, 1)";
    ctx.fillRect(E.xposition * 10, E.yposition * 10, 30, 30);

    //up
    if (gameMat[E.xposition][E.yposition - 1] != 1 && gameMat[E.xposition + 1][E.yposition - 1] != 1 && gameMat[E.xposition + 2][E.yposition - 1] != 1) {//up is empty
        if (newisup && done == false) {//new up direction
            E.yposition -= 1;

            down = false;
            left = false;
            right = false;

        } else if (up == true) {//continue moving to up
            ctx.fillRect(E.xposition * 10, E.yposition * 10, 21, 20);
            E.yposition -= 1;

            done = true;
        }

        //eat
        if (gameMat[E.xposition][E.yposition] == 7) {

            score += 1;

            gameMat[E.xposition][E.yposition] = 0;
            dotEv.play();
        }

        if (gameMat[E.xposition][E.yposition] == 3 && gameMat[E.xposition + 1][E.yposition] == 3 && gameMat[E.xposition + 2][E.yposition] == 3 && gameMat[E.xposition][E.yposition + 1] == 3 && gameMat[E.xposition + 1][E.yposition + 1] == 3 && gameMat[E.xposition + 2][E.yposition + 1] == 3 && gameMat[E.xposition][E.yposition + 2] == 3 && gameMat[E.xposition + 1][E.yposition + 2] == 3 && gameMat[E.xposition + 2][E.yposition + 2] == 3) {//Eat big-dots and change gusts mode
            gustMode = 4;
            for (var i = 0; i < 4; i++) {
                gusts[i].mode = 4;
            }
            spead = 250;
            changeGSpead(spead, 0);
            changeGSpead(spead, 1);
            changeGSpead(spead, 2);
            changeGSpead(spead, 3);

            gameMat[E.xposition][E.yposition] = 0;
            gameMat[E.xposition + 1][E.yposition] = 0;
            gameMat[E.xposition][E.yposition + 1] = 0;
            gameMat[E.xposition + 1][E.yposition + 1] = 0;
            scapGust = 22;

            soulSv.pause();
            soulSv = new Audio("voice/ghost hunt fase.mp3");
            soulSv.play();
            soundB = true;
        }
    }

    //down
    if (gameMat[E.xposition][E.yposition + 3] != 1 && gameMat[E.xposition + 1][E.yposition + 3] != 1 && gameMat[E.xposition + 2][E.yposition + 3] != 1 && gameMat[E.xposition][E.yposition + 3] != 4 && gameMat[E.xposition + 1][E.yposition + 3] != 4 && gameMat[E.xposition + 2][E.yposition + 3] != 4) {//down is empty
        if (newisdown) {//change direction to down
            E.yposition += 1;

            up = false;
            left = false;
            right = false;
        } else if (down == true) {//continue to down
            ctx.fillRect(E.xposition * 10, E.yposition * 10, 21, 20);
            E.yposition += 1;

            done = true;
        }

        //eat
        if (gameMat[E.xposition][E.yposition] == 7) {

            score += 1;

            gameMat[E.xposition][E.yposition] = 0;
            dotEv.play();
        }

        if (gameMat[E.xposition][E.yposition] == 3 && gameMat[E.xposition + 1][E.yposition] == 3 && gameMat[E.xposition + 2][E.yposition] == 3 && gameMat[E.xposition][E.yposition + 1] == 3 && gameMat[E.xposition + 1][E.yposition + 1] == 3 && gameMat[E.xposition + 2][E.yposition + 1] == 3 && gameMat[E.xposition][E.yposition + 2] == 3 && gameMat[E.xposition + 1][E.yposition + 2] == 3 && gameMat[E.xposition + 2][E.yposition + 2] == 3) {//Eat big-dots and change gusts mode
            gustMode = 4;
            for (var i = 0; i < 4; i++) {
                gusts[i].mode = 4;
            }
            spead = 250;
            changeGSpead(spead, 0);
            changeGSpead(spead, 1);
            changeGSpead(spead, 2);
            changeGSpead(spead, 3);

            gameMat[E.xposition][E.yposition] = 0;
            gameMat[E.xposition + 1][E.yposition] = 0;
            gameMat[E.xposition][E.yposition + 1] = 0;
            gameMat[E.xposition + 1][E.yposition + 1] = 0;
            scapGust = 22;

            soulSv.pause();
            soulSv = new Audio("voice/ghost hunt fase.mp3");
            soulSv.play();
            soundB = true;
        }
    }

    //left
    if (E.xposition == 0) {
        //do notting
    }
    else if (left == true && gameMat[E.xposition - 1][E.yposition] != 1 && gameMat[E.xposition - 1][E.yposition + 1] != 1 && gameMat[E.xposition - 1][E.yposition + 2] != 1) {//new left
        if (newisleft && done == false) {//change direction to left
            E.xposition = (E.xposition - 1);

            if (E.xposition <= 0) {
                E.xposition = 73;
            }

            up = false;
            down = false;
            right = false;

        } else {//continue moving to left
            ctx.fillRect(E.xposition * 10, E.yposition * 10, 21, 20);
            E.xposition = (E.xposition - 1);

            if (E.xposition <= 0) {
                E.xposition = 73;
            }
            lisLeft = true;
            done = true;

        }

        //eat
        if (gameMat[E.xposition][E.yposition] == 7) {

            score += 1;

            gameMat[E.xposition][E.yposition] = 0;
            dotEv.play();
        }

        if (gameMat[E.xposition][E.yposition] == 3 && gameMat[E.xposition + 1][E.yposition] == 3 && gameMat[E.xposition + 2][E.yposition] == 3 && gameMat[E.xposition][E.yposition + 1] == 3 && gameMat[E.xposition + 1][E.yposition + 1] == 3 && gameMat[E.xposition + 2][E.yposition + 1] == 3 && gameMat[E.xposition][E.yposition + 2] == 3 && gameMat[E.xposition + 1][E.yposition + 2] == 3 && gameMat[E.xposition + 2][E.yposition + 2] == 3) {//Eat big-dots and change gusts mode
            gustMode = 4;
            for (var i = 0; i < 4; i++) {
                gusts[i].mode = 4;
            }
            spead = 250;
            changeGSpead(spead, 0);
            changeGSpead(spead, 1);
            changeGSpead(spead, 2);
            changeGSpead(spead, 3);

            gameMat[E.xposition][E.yposition] = 0;
            gameMat[E.xposition + 1][E.yposition] = 0;
            gameMat[E.xposition][E.yposition + 1] = 0;
            gameMat[E.xposition + 1][E.yposition + 1] = 0;
            scapGust = 22;

            soulSv.pause();
            soulSv = new Audio("voice/ghost hunt fase.mp3");
            soulSv.play();
            soundB = true;
        }
    }

    //right
    if (right == true && gameMat[E.xposition + 3][E.yposition] != 1 && gameMat[E.xposition + 3][E.yposition + 1] != 1 && gameMat[E.xposition + 3][E.yposition + 2] != 1) {//new right
        if (newisright && done == false || lisLeft) {//change direction to right
            E.xposition = (E.xposition + 1) % 72;
            up = false;
            down = false;
            left = false;
        } else {
            ctx.fillRect(E.xposition * 10, E.yposition * 10, 21, 20);
            E.xposition = (E.xposition + 1);

            if (E.xposition >= 72) {
                E.xposition = 1;
            }

            done = true;
        }

        //eat
        if (gameMat[E.xposition][E.yposition] == 7) {

            score += 1;

            gameMat[E.xposition][E.yposition] = 0;
            dotEv.play();
        }

        if (gameMat[E.xposition][E.yposition] == 3 && gameMat[E.xposition + 1][E.yposition] == 3 && gameMat[E.xposition + 2][E.yposition] == 3 && gameMat[E.xposition][E.yposition + 1] == 3 && gameMat[E.xposition + 1][E.yposition + 1] == 3 && gameMat[E.xposition + 2][E.yposition + 1] == 3 && gameMat[E.xposition][E.yposition + 2] == 3 && gameMat[E.xposition + 1][E.yposition + 2] == 3 && gameMat[E.xposition + 2][E.yposition + 2] == 3) {//Eat big-dots and change gusts mode
            gustMode = 4;
            for (var i = 0; i < 4; i++) {
                gusts[i].mode = 4;
            }
            spead = 250;
            changeGSpead(spead, 0);
            changeGSpead(spead, 1);
            changeGSpead(spead, 2);
            changeGSpead(spead, 3);

            gameMat[E.xposition][E.yposition] = 0;
            gameMat[E.xposition + 1][E.yposition] = 0;
            gameMat[E.xposition][E.yposition + 1] = 0;
            gameMat[E.xposition + 1][E.yposition + 1] = 0;
            scapGust = 22;

            soulSv.pause();
            soulSv = new Audio("voice/ghost hunt fase.mp3");
            soulSv.play();
            soundB = true;
        }
    }

    drawPlat();

    //kekw animation
    if (imageCounter % 4 == 0 || imageCounter % 4 == 1) {
        ctx.drawImage(img, E.xposition * 10, E.yposition * 10, 30, 30);
    } else {
        ctx.drawImage(imgOpen, E.xposition * 10, E.yposition * 10, 30, 30);
    }
    imageCounter += 1;

    //win
    if (nodes <= score) {
        win.style = "display = block";
        clearInterval(moveF);
        clearInterval(gust1);
        clearInterval(gust2);
        clearInterval(gust3);
        clearInterval(gust4);

        winb = true;

        localStorage.setItem(n , 3);
        winv.play();
    }

    //time out
    if (gameTimer < 0) {
        gameOver.style = "display = block";

        clearInterval(moveF);
        clearInterval(gust1);
        clearInterval(gust2);
        clearInterval(gust3);
        clearInterval(gust4);

        var s = document.getElementById("gameOverScore");
        s.innerHTML = "Score is : " + score;

        losev.play();
    }

    //if hit gusts
    if (isGust(E.xposition, E.yposition)) {
        if (gusts[hitedGust].mode == 3 || gusts[hitedGust].mode == 2 && winb == false) {

            if (E.heart > 1) {
                loseH.style = "display : flex;";

                clearInterval(moveF);
                clearInterval(gust1);
                clearInterval(gust2);
                clearInterval(gust3);
                clearInterval(gust4);

                //clear all
                for (var i = 0; i < 4; i++) {
                    ctx.fillStyle = "rgb(99, 94, 1)";
                    ctx.fillRect(gusts[i].xposition * 10, gusts[i].yposition * 10, 30, 30);

                    gusts[i].mode = 1;
                }

                ctx.fillStyle = "rgb(99, 94, 1)";
                ctx.fillRect(E.xposition * 10, E.yposition * 10, 30, 30);

                E.heart -= 1;
                hearts[E.heart].style = "display : none";

                E.xposition = 36;
                E.yposition = 52;

                gusts[0].xposition = 40;
                gusts[0].yposition = 30;
                gusts[0].gofhomex = 24;
                gusts[0].gofhomey = 20;

                gusts[1].xposition = 38;
                gusts[1].yposition = 33;
                gusts[1].gofhomex = 50;
                gusts[1].gofhomey = 18;

                gusts[2].xposition = 32;
                gusts[2].yposition = 30;
                gusts[2].gofhomex = 20;
                gusts[2].gofhomey = 35;

                gusts[3].xposition = 35;
                gusts[3].yposition = 33;
                gusts[3].gofhomex = 50;
                gusts[3].gofhomey = 33;

                setTimeout(() => {
                    moveF = setInterval(move, 100);
                    spead = 100;
                    changeGSpead(spead, 0);
                    changeGSpead(spead, 1);
                    changeGSpead(spead, 2);
                    changeGSpead(spead, 3);
                    loseH.style = "display : none;";
                }, 3000);

                deathEv.play();

            } else {
                gameOver.style = "display = block";

                var s = document.getElementById("gameOverScore");
                s.innerHTML = "Score is : " + score;
                clearInterval(moveF);
                clearInterval(gust1);
                clearInterval(gust2);
                clearInterval(gust3);
                clearInterval(gust4);

                losev.play();
            }
        } else if (scapGust > 0) {
            ctx.fillStyle = "rgb(99, 94, 1)";
            ctx.fillRect(gusts[hitedGust].xposition * 10, gusts[hitedGust].yposition * 10, 30, 30);

            timerShow.style = "color: green; font-weight : bolder;";
            timerShow.innerHTML = timerShow.innerHTML = parseInt(gameTimer / 600) + ":" + (gameTimer % 600) / 10 + " + " + 15;
            gameTimer += 15;

            gusts[hitedGust].mode = 1;
            gusts[hitedGust].xposition = 38;
            gusts[hitedGust].yposition = 33;

            changeGSpead(100, hitedGust);
            soulEv.play();
        }
    }

    //timer
    if(scapGust != -1 ){
        if (scapGust > 0) {
            if (timerCounter % 4 == 0) {
                scapGust -= 1;
            }
            timerCounter += 1
        }
        else if (scapGust == 0) {
            spead = 100;
    
            changeGSpead(spead, 0);
            changeGSpead(spead, 1);
            changeGSpead(spead, 2);
            changeGSpead(spead, 3);
            scapGust = -1;
            timerCounter = 0;
            soundB = false;
    
            for (var i = 0; i < 4; i++) {
                gusts[i].mode = 3;
            }
        }
    }
}

//_________________redrawing function_________________ 
function drawPlat() {
    for (var i = 0; i < 75; i++) {
        for (var j = 0; j < 60; j++) {
            var b = true;
            for (var k = 0; k < 4; k++) {
                if (i == gusts[k].xposition && j == gusts[k].yposition || i == gusts[k].xposition + 1 && j == gusts[k].yposition || i == gusts[k].xposition - 1 && j == gusts[k].yposition || i == gusts[k].xposition && j == gusts[k].yposition + 1 || i == gusts[k].xposition && j == gusts[k].yposition - 1) {
                    b = false;
                }
            }
            if (b && gameMat[i][j] == 7 ) {//node

                ctx.beginPath();
                ctx.fillStyle = "rgb(99, 94, 1)";
                ctx.arc(i * 10 + 15, j * 10 + 15, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();

                ctx.beginPath();
                ctx.fillStyle = "white";
                ctx.arc(i * 10 + 15, j * 10 + 15, 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();

            }
            else if (gameMat[i][j] == 3 && gameMat[i + 1][j] == 3 && gameMat[i][j + 1] == 3 && gameMat[i + 1][j + 1] == 3 && gameMat[i + 2][j] == 3 && gameMat[i + 2][j + 1] == 3 && gameMat[i + 2][j + 2] == 3 && gameMat[i][j + 2] == 3 && gameMat[i + 1][j + 2] == 3) {

                ctx.beginPath();
                if (imageCounter % 2 == 0) {
                    ctx.fillStyle = "#B1E693";
                } else {
                    ctx.fillStyle = "#6ECB63";
                }
                ctx.arc(i * 10 + 15, j * 10 + 15, 7, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

}

//___________________gust functions _________________
function gustMove(gust, b) {

    if (gust.mode == 1) {//go out of home

        // ctx.fillStyle = "white";
        // ctx.fillRect(370, 260, 10, 10);

        //clear
        ctx.fillStyle = "rgb(99, 94, 1)";
        ctx.fillRect(gust.xposition * 10, gust.yposition * 10, 30, 30);

        var p = develop(gust);

        var selectD = 0;
        var min = Math.sqrt(Math.abs(p[0][0] - 37) + Math.abs(p[0][1] - 26));
        for (var i = 1; i < p.length; i++) {
            if (Math.sqrt(Math.abs(p[i][0] - 37) + Math.abs(p[i][1] - 26)) < min) {
                selectD = i;
            }
        }

        if (gust.xposition > p[selectD][0]) {//left
            imgLocal = coffi_img[gust.gustNum * 2 + 1];
        } else if (gust.xposition < p[selectD][0]) {//right
            imgLocal = coffi_img[gust.gustNum * 2];
        } else {
            imgLocal = last_img[gust.gustNum];
        }

        gust.xposition = p[selectD][0];
        gust.yposition = p[selectD][1];

        //display
        ctx.drawImage(imgLocal, gust.xposition * 10, gust.yposition * 10, 30, 30);
        last_img[gust.gustNum] = imgLocal;

        if (gust.xposition == 37 && gust.yposition == 26) {
            gust.mode = 2;
            gustMode = 2;
        }
    }
    else if (gust.mode == 4) {//escape from charackter

        //clear
        ctx.fillStyle = "rgb(99, 94, 1)";
        ctx.fillRect(gust.xposition * 10, gust.yposition * 10, 30, 30);

        var p = develop(gust);
        var h = [];
        var counter = 0;
        for (var i = 0; i < p.length; i++) {
            if (p[i][0] != gust.lastx || p[i][1] != gust.lasty) {
                h[counter] = p[i];
                counter += 1;
            }
        }

        var r = Math.floor(Math.random() * h.length);

        //define image
        if (h.length > 0) {
            if (gust.xposition > h[r][0]) {//left
                imgLocal = coffi_img[gust.gustNum * 2 + 1];
            } else if (gust.xposition < h[r][0]) {//right
                imgLocal = coffi_img[gust.gustNum * 2];
            } else {
                imgLocal = last_img[gust.gustNum];
            }

            gust.storeP();
            gust.xposition = h[r][0];
            gust.yposition = h[r][1];
        } else {
            imgLocal = coffi_img[gust.gustNum * 2];
            gust.storeP();
        }

        //display
        ctx.drawImage(imgLocal, gust.xposition * 10, gust.yposition * 10, 30, 30);
        last_img[gust.gustNum] = imgLocal;

        if ((scapGust <= 18 && parseInt((timerCounter - 2) / 4) % 2 == 0) == false) {
            ctx.beginPath();
            ctx.fillStyle = "#4a3d3dcc";
            ctx.arc(gust.xposition * 10 + 15, gust.yposition * 10 + 15, 15, 0, Math.PI * 2);
            ctx.fill();

        }
    }
    else if ((Math.abs(E.xposition - gust.xposition) + Math.abs(E.yposition - gust.yposition)) < 20) {//mode 5 catch kek

        //clear
        ctx.fillStyle = "rgb(99, 94, 1)";
        ctx.fillRect(gust.xposition * 10, gust.yposition * 10, 30, 30);

        var p = develop(gust);

        var selectD = 0;
        //var min = Math.abs(p[0][0] - E.xposition) + Math.abs(p[0][1] - E.yposition);
        var min = 100;
        for (var i = 1; i < p.length; i++) {
            if ((p[i][0] != gust.lastx || p[i][1] != gust.lasty) && Math.abs(p[i][0] - E.xposition) + Math.abs(p[i][1] - E.yposition) < min) {
                selectD = i;
                min = Math.abs(p[i][0] - E.xposition) + Math.abs(p[i][1] - E.yposition);
            }
        }

        //define image
        if (gust.xposition > p[selectD][0]) {//left
            imgLocal = coffi_img[gust.gustNum * 2 + 1];
        } else if (gust.xposition < p[selectD][0]) {//right
            imgLocal = coffi_img[gust.gustNum * 2];
        } else {
            imgLocal = last_img[gust.gustNum];
        }

        gust.storeP();
        gust.xposition = p[selectD][0];
        gust.yposition = p[selectD][1];

        //display
        ctx.drawImage(imgLocal, gust.xposition * 10, gust.yposition * 10, 30, 30);
        last_img[gust.gustNum] = imgLocal;

    }
    else if (gust.mode == 2) {//mode out of home 2

        //clear
        ctx.fillStyle = "rgb(99, 94, 1)";
        ctx.fillRect(gust.xposition * 10, gust.yposition * 10, 30, 30);
        if (b) {
            drawPlat();
        }


        var p = develop(gust);
        var selectD = 0;
        var min = 100.99;
        for (var i = 0; i < p.length; i++) {
            if (Math.sqrt(Math.abs(p[i][0] - gust.gofhomex) + Math.abs(p[i][1] - gust.gofhomey)) < min && (p[i][0] != gust.lastx || p[i][1] != gust.lasty)) {
                selectD = i;
                min = Math.sqrt(Math.abs(p[i][0] - gust.gofhomex) + Math.abs(p[i][1] - gust.gofhomey));
            }
        }

        //define image
        if (gust.xposition > p[selectD][0]) {//left
            imgLocal = coffi_img[gust.gustNum * 2 + 1];
        } else if (gust.xposition < p[selectD][0]) {//right
            imgLocal = coffi_img[gust.gustNum * 2];
        } else {
            imgLocal = last_img[gust.gustNum];
        }

        gust.storeP();
        gust.xposition = p[selectD][0];
        gust.yposition = p[selectD][1];

        //display
        ctx.drawImage(imgLocal, gust.xposition * 10, gust.yposition * 10, 30, 30);
        last_img[gust.gustNum] = imgLocal;

        if (gust.xposition == gust.gofhomex && gust.yposition == gust.gofhomey) {
            gust.mode = 3;
            gustMode = 3;
        }
    }
    else if (gust.mode == 3) {//walking

        //clear
        ctx.fillStyle = "rgb(99, 94, 1)";
        ctx.fillRect(gust.xposition * 10, gust.yposition * 10, 30, 30);

        var p = develop(gust);
        var h = [];
        var counter = 0;
        for (var i = 0; i < p.length; i++) {
            if (p[i][0] != gust.lastx || p[i][1] != gust.lasty) {
                h[counter] = p[i];
                counter += 1;
            }
        }

        var r = Math.floor(Math.random() * h.length);

        //define image
        if (h.length > 0) {
            if (gust.xposition > h[r][0]) {//left
                imgLocal = coffi_img[gust.gustNum * 2 + 1];
            } else if (gust.xposition < h[r][0]) {//right
                imgLocal = coffi_img[gust.gustNum * 2];
            } else {
                imgLocal = last_img[gust.gustNum];
            }

            gust.storeP();
            gust.xposition = h[r][0];
            gust.yposition = h[r][1];
        } else {
            imgLocal = coffi_img[gust.gustNum * 2];
            gust.storeP();
        }


        //display
        ctx.drawImage(imgLocal, gust.xposition * 10, gust.yposition * 10, 30, 30);
        last_img[gust.gustNum] = imgLocal;
    }

}

//___________show s all of the ways for gust_____________
function develop(gust) {

    var newPositions = [[gust.xposition, gust.yposition], [gust.xposition, gust.yposition], [gust.xposition, gust.yposition], [gust.xposition, gust.yposition]];
    var index = 0;

    if (gameMat[gust.xposition][(gust.yposition - 1)] != 1 && gameMat[gust.xposition + 1][(gust.yposition - 1)] != 1 && gameMat[gust.xposition + 2][(gust.yposition - 1)] != 1) {//top
        //console.log("top");
        newPositions[index][0] = gust.xposition;
        newPositions[index][1] = gust.yposition - 1;
        index += 1;

    } if (gameMat[gust.xposition][(gust.yposition + 3)] != 1 && gameMat[gust.xposition + 1][(gust.yposition + 3)] != 1 && gameMat[gust.xposition + 2][(gust.yposition + 3)] != 1 && gameMat[gust.xposition][(gust.yposition + 3)] != 4) {//down
        //console.log("down");
        newPositions[index][0] = gust.xposition;
        newPositions[index][1] = gust.yposition + 1;
        index += 1;

    } if (gameMat[(gust.xposition - 1)][(gust.yposition)] != 1 && gameMat[(gust.xposition - 1)][(gust.yposition + 1)] != 1 && gameMat[(gust.xposition - 1)][(gust.yposition + 2)] != 1 && gameMat[(gust.xposition - 1)][(gust.yposition)] != 4) {//left
        //console.log("left");
        newPositions[index][0] = gust.xposition - 1;
        newPositions[index][1] = gust.yposition;

        if (newPositions[index][0] <= 0) {
            newPositions[index][0] = 73;
        }
        index += 1;

    } if (gameMat[(gust.xposition + 3)][(gust.yposition)] != 1 && gameMat[(gust.xposition + 3)][(gust.yposition + 1)] != 1 && gameMat[(gust.xposition + 3)][(gust.yposition + 2)] != 1 && gameMat[(gust.xposition + 3)][(gust.yposition)] != 4) {//right
        //console.log("right");
        newPositions[index][0] = (gust.xposition + 1) % 73;
        newPositions[index][1] = gust.yposition;
        index += 1;

    }

    h = [];
    for (var i = 0; i < index; i++) {
        h[i] = newPositions[i];
    }

    return h;

}

//___________________is goust ________________
function isGust(x, y) {

    var b = false;
    for (var i = 0; i < 4; i++) {
        if (x == gusts[i].xposition && y == gusts[i].yposition || (x + 1) == gusts[i].xposition && y == gusts[i].yposition || x == gusts[i].xposition && (y + 1) == gusts[i].yposition || (x + 2) == gusts[i].xposition && (y) == gusts[i].yposition) {
            b = true;
            hitedGust = i;
        }
    }
    return b;
}

function changeGSpead(spead, index) {

    if (index == 0) {
        clearInterval(gust1);
        gust1 = setInterval(gustMove, spead, gusts[index]);
    } else if (index == 1) {
        clearInterval(gust2);
        gust2 = setInterval(gustMove, spead, gusts[index]);
    } else if (index == 2) {
        clearInterval(gust3);
        gust3 = setInterval(gustMove, spead, gusts[index]);
    } else if (index == 3) {
        clearInterval(gust4);
        gust4 = setInterval(gustMove, spead, gusts[index]);
    }
}
