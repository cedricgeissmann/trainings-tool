var canvas;
var ctx;
var dx = 2;
var dy = -0.5;
var timer;
var running = false;
var globalSteps = 0;
var firstTime = true;

var drawObjects = [{
	id: 1,
	radius: 10,
	act: {
		x: 0,
		y: 0
	},
	dx: 1.0,
	dy: 1.0,
	waypoints: [{
		x: 100,
		y: 200,
		steps: 1000
	}, {
		x: 0,
		y: 300,
		steps: 300
	}, {
		x: 300,
		y: 20,
		steps: 1000
	}],
	actWaypoint: 0,
	steps: 0
}, {
	id: 2,
	radius: 10,
	act: {
		x: 750,
		y: 200
	},
	dx: 1.0,
	dy: 1.0,
	waypoints: [{
		x: 600,
		y: 250,
		steps: 1000
	}, {
		x: 1000,
		y: 300,
		steps: 300
	}, {
		x: 500,
		y: 20,
		steps: 1000
	}],
	actWaypoint: 0,
	steps: 0
}];



function getContext() {
	var canvas = document.getElementById("annahme");
	return canvas.getContext("2d");
}



function drawField() {
	ctx.strokeStyle = "black";
	ctx.moveTo(500, 0);
	ctx.lineTo(500, 500);
	ctx.stroke();
	ctx.moveTo(625, 0);
	ctx.lineTo(625, 500);
	ctx.stroke();
	ctx.moveTo(375, 0);
	ctx.lineTo(375, 500);
	ctx.stroke();
}

function calcObject(c) {
	if (parseInt(c.act.x) !== parseInt(c.waypoints[c.actWaypoint].x) && parseInt(c.act.y) !== parseInt(c.waypoints[c.actWaypoint].y)) {
		c.act.x = c.act.x + c.dx;
		c.act.y = c.act.y + c.dy;
		//console.log(c.act.x);
		c.steps++;
	} else {
		if (c.actWaypoint < c.waypoints.length - 1) {
			c.actWaypoint++;
			console.log("number of steps from " + c.id + " to waypoint " + c.actWaypoint + ": " + c.steps);
			console.log("reach waypoint: " + c.id);
		}
		c.dx = (c.waypoints[c.actWaypoint].x - c.act.x) / c.waypoints[c.actWaypoint].steps;
		c.dy = (c.waypoints[c.actWaypoint].y - c.act.y) / c.waypoints[c.actWaypoint].steps;
	}

	//return c;
}

function drawBall(c) {
	calcObject(c);
	ctx.beginPath();
	ctx.arc(c.act.x, c.act.y, c.radius, 0, Math.PI * 2, true);
	ctx.fill();
	ctx.stroke();
}


function doKeyDown(e) {
	if (e.keyCode === 32 && running) {
		clearInterval(timer);
		running = false;
	} else if (e.keyCode === 32) {
		timer = setInterval(draw, 10);
		running = true;
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	drawField();
	jQuery.each(drawObjects, function(i, obj) {
		drawBall(drawObjects[i]);
	});

}


function initObject(o) {
	o.dx = (o.waypoints[o.actWaypoint].x - o.act.x) / o.waypoints[o.actWaypoint].steps;
	o.dy = (o.waypoints[o.actWaypoint].y - o.act.y) / o.waypoints[o.actWaypoint].steps;
}

function init() {
	$.each(drawObjects, function(i, obj) {
		initObject(obj);
	});

	window.addEventListener("keydown", doKeyDown, false);
	canvas = document.getElementById("annahme");
	ctx = canvas.getContext("2d");
	running = true;
	timer = setInterval(draw, 10);
	return timer;
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

$(document).ready(function() {
	init();
	$("#annahme").on("mousedown", function(e) {
		var pos = getMousePos(this, e);
		console.log(pos.x);
	});
});