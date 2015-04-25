//test deploy

var canvas;
var ctx;
var dx = 2;
var dy = -0.5;
var circle=new Circle(0,400,10);
var p1 = new Circle(750, 125,10);
var p2 = new Circle(750, 250, 10);
var p3 = new Circle(750, 375, 10);
var d1 = new Direction(0, 0);
var d2 = new Direction(0, 0);
var d3 = new Direction(0, 0);
var sp1 = new Point(0, 0);
var sp2 = new Point(0, 0);
var sp3 = new Point(0, 0);
var timer;
var running = false;
getDirection(d1, p1);
getDirection(d2, p2);
getDirection(d3, p3);

initSettings();
var t1 = solve(d1, p1);
initSettings();
var t2 = solve(d2, p2);
initSettings();
var t3 = solve(d3, p3);
initSettings();

getDirectionPoint(d1, p1, t1, sp1);
getDirectionPoint(d2, p2, t2, sp2);
getDirectionPoint(d3, p3, t3, sp3);

function initSettings(){
    dx = 2;
    dy = -0.5;
    circle=new Circle(0,400,10);
    p1 = new Circle(750, 125,10);
    p2 = new Circle(750, 250, 10);
    p3 = new Circle(750, 375, 10);
    d1 = new Direction(0, 0);
    d2 = new Direction(0, 0);
    d3 = new Direction(0, 0);
    sp1 = new Point(0, 0);
    sp2 = new Point(0, 0);
    sp3 = new Point(0, 0);
}

function getDirection(d, p){
    var y = circle.y-p.y;
    if(y>0){
        d.x=1;
        d.y=1;
    }else if(y<0){
        d.x=-1;
        d.y=-1;
    }else{
        d.x=0;
        d.y=0;
    }
}

function getDirectionPoint(d, p, t, sp){
    var numSteps = t;
    var spx = circle.x+dx*t;
    var spy = circle.y+dy*t;
    d.x = (spx-p.x)/numSteps;
    d.y = (spy-p.y)/numSteps;
    sp.x = spx;
    sp.y = spy;
}

function solve(d, p){
    var t = 0;
    while(p.x > circle.x){
        getDirection(d, p);
        circle.x += dx;
        circle.y += dy;
        p.x += d.x;
        p.y += d.y;
        t+=1;
    }
    console.log("Steps: "+t);
    return t;
}

function Direction(x, y){
    this.x = x;
    this.y = y;
}

function Point(x, y){
    this.x = x;
    this.y = y;
}


function Circle(x,y,r){
  this.x=x;
  this.y=y;
  this.r=r;
}



function getContext(){
    var canvas=document.getElementById("annahme");
    return canvas.getContext("2d");
}



function drawField(){
    ctx.strokeStyle="black";
    ctx.moveTo(500,0);
    ctx.lineTo(500,500);
    ctx.stroke();
    ctx.moveTo(625, 0);
    ctx.lineTo(1000,375);
    ctx.stroke();
    ctx.moveTo(625, 125);
    ctx.lineTo(1000,500);
    ctx.stroke();
    ctx.moveTo(625, 250);
    ctx.lineTo(1000,625);
    ctx.stroke();
    ctx.moveTo(625, 0);
    ctx.lineTo(625,500);
    ctx.stroke();
    ctx.moveTo(375, 0);
    ctx.lineTo(375,500);
    ctx.stroke();
}

function drawBall(c) {
  ctx.beginPath();
  ctx.arc(c.x, c.y, c.r, 0, Math.PI*2, true);
  ctx.fill();
}


function doKeyDown(e){
    if(e.keyCode===32 && running){
        clearInterval(timer);
        running=false;
    }else if(e.keyCode===32){
        timer = setInterval(draw,10);
        running = true;
    } 
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  drawField();
  ctx.fillStyle = "#000000";
  drawBall(p1);
  drawBall(p2);
  drawBall(p3);
  ctx.fillStyle = "#FFFF00";
  drawBall(circle);
  circle.x += dx;
  circle.y += dy;
  p1.x += d1.x;
  p2.x += d2.x;
  p3.x += d3.x;
  p1.y += d1.y;
  p2.y += d2.y;
  p3.y += d3.y;
  if(circle.x>1000){
    initSettings();
    getDirectionPoint(d1, p1, t1, sp1);
	getDirectionPoint(d2, p2, t2, sp2);
	getDirectionPoint(d3, p3, t3, sp3);
  }
}


function init() {
  window.addEventListener("keydown",doKeyDown,false);
  canvas = document.getElementById("annahme");
  ctx = canvas.getContext("2d");
  running = true;
  timer=setInterval(draw, 10);
  return timer;
}


$(document).ready(function(){
    init();
});
