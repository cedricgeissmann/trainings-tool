var canvas;
var ctx;
var dx = 2;
var dy = -0.5;
var timer;
var running = false;
var globalSteps = 0;
var firstTime = true;
var canvasHeight = 0;
var canvasWidth = 0;
var callbackEvent = noCallback;
var selectedPlayer;

var drawObjects = [{
		id: 1,
		radius: 10,
		x: 0,
		y: 0,
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
			x: 750,
			y: 200,
		dx: 1.0,
		dy: 1.0,
		waypoints: [{
			x: 600,
			y: 250,
			steps: 100
		}, {
			x: 1000,
			y: 300,
			steps: 300
		}, {
			x: 500,
			y: 20,
			steps: 100
		}],
		actWaypoint: 0,
		steps: 0
	}, {
		id: 3,
		radius: 20,
		color: {
			fill: "#ff0000",
			stroke: "#ff0000"
		},
			x: 500,
			y: 200,
		dx: 1.0,
		dy: 1.0,
		waypoints: [{
			x: 600,
			y: 500,
			steps: 100
		}, {
			x: 1000,
			y: 300,
			steps: 300
		}, {
			x: 500,
			y: 100,
			steps: 100
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
	ctx.moveTo(transformX(500), transformY(0));
	ctx.lineTo(transformX(500), transformY(500));
	ctx.stroke();
	ctx.moveTo(transformX(625), transformY(0));
	ctx.lineTo(transformX(625), transformY(500));
	ctx.stroke();
	ctx.moveTo(transformX(375), transformY(0));
	ctx.lineTo(transformX(375), transformY(500));
	ctx.stroke();
}

function calcObject(c) {
	if (parseInt(c.x) !== parseInt(c.waypoints[c.actWaypoint].x) && parseInt(c.y) !== parseInt(c.waypoints[c.actWaypoint].y)) {
		c.x = c.x + c.dx;
		c.y = c.y + c.dy;
		c.steps++;
	}
	else {
		if (c.actWaypoint < c.waypoints.length - 1) {
			c.actWaypoint++;
			console.log("number of steps from " + c.id + " to waypoint " + c.actWaypoint + ": " + c.steps);
			console.log("reach waypoint: " + c.id);
		}
		c.dx = (c.waypoints[c.actWaypoint].x - c.x) / c.waypoints[c.actWaypoint].steps;
		c.dy = (c.waypoints[c.actWaypoint].y - c.y) / c.waypoints[c.actWaypoint].steps;
	}

	//return c;
}

function drawBall(c) {
	calcObject(c);
	var x = transformX(c.x);
	var y = transformY(c.y);
	ctx.beginPath();
	ctx.arc(x, y, c.radius, 0, Math.PI * 2, true);
	if (c.color == undefined) {
		ctx.fillStyle = "#ffffff";
		ctx.strokeStyle = "#000000";
	}
	else {
		ctx.fillStyle = c.color.fill;
		ctx.strokeStyle = c.color.stroke;
	}
	ctx.fill();
	ctx.stroke();
}


function doKeyDown(e) {
	if (e.keyCode === 32 && running) {
		stopAnimation();
	}
	else if (e.keyCode === 32) {
		startAnimation();
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
	o.dx = (o.waypoints[o.actWaypoint].x - o.x) / o.waypoints[o.actWaypoint].steps;
	o.dy = (o.waypoints[o.actWaypoint].y - o.y) / o.waypoints[o.actWaypoint].steps;
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

/**
 * Transorms the given coordinate into space 0..canvasWidth.
 * @param oldX number to map into canvas space.
 * @returns the transformed coordinate.
 */
function transformX(oldX) {
	var x = oldX * canvasWidth / 1000.;
	return x;
}

/**
 * Transorms the given coordinate into space 0..1000.
 * @param oldX number to map into canvas space.
 * @returns the transformed coordinate.
 */
function transformXBack(oldX) {
	var x = oldX * 1000.0 / canvasWidth;
	return x;
}


/**
 * Transorms the given coordinate into space 0..canvasHeight.
 * @param oldY number to map into canvas space.
 * @returns the transformed coordinate.
 */
function transformY(oldY) {
	var y = oldY * canvasHeight / 500.;
	return y;
}

/**
 * Transorms the given coordinate into space 0..500.
 * @param oldY number to map into canvas space.
 * @returns the transformed coordinate.
 */
function transformYBack(oldY) {
	var y = oldY * 500.0 / canvasHeight;
	return y;
}

function getMaxID(array){
	return Math.max.apply(0, array.map(function(v){return v.id}));
}

function findElement(arr, propName, propValue) {
  for (var i=0; i < arr.length; i++)
    if (arr[i][propName] == propValue)
      return arr[i];

  // will return undefined if not found; you could return a default instead
}

function findElements(arr, propName, propValue, tolerance) {
  var result = [];
  var upper = propValue+tolerance;
  var lower = propValue-tolerance;
  	for (var i=0; i < arr.length; i++){
    	if (arr[i][propName] >= propValue-tolerance && arr[i][propName] <= propValue+tolerance){
      		result.push(arr[i]);
  		}
	}
	return result;
  // will return undefined if not found; you could return a default instead
}

/**
 * Creates a new player object at coordinates x, y.
 * @param x the x-coordinate where the player will be placed.
 * @param y the y-coordinate where the player will be placed.
 * @return the player object represented by a JSON-Object.
 */
function createNewPlayerObject(x, y){
	var id = getMaxID(drawObjects)+1;
	console.log(id);
	var newPlayer = {
		id: id,
		radius: 10,
			x: x,
			y: y,
		dx: 1.0e-14,
		dy: 1.0e-14,
		waypoints: [{
			x: x,
			y: y,
			steps: 1
		}],
		actWaypoint: 0,
		steps: 0
	};
	return newPlayer;
}

function addPlayer(x, y) {
	console.log("Add player at x: " + x + " y: " + y);
	drawObjects.push(createNewPlayerObject(transformXBack(x), transformYBack(y)));
	draw();
}

function movePlayer(x, y) {
	var player;
	if(selectedPlayer === undefined){
		player = findElement(drawObjects, "id", getMaxID(drawObjects));
	}else{
		player = selectedPlayer;
	}
	var waypoint = {
		x: transformXBack(x),
		y: transformYBack(y),
		steps: 300
	};
	player["waypoints"].push(waypoint);
}

function selectPlayer(x, y){
	var res = findElements(drawObjects, "x", transformXBack(x), 10);
	res = findElements(res, "y", transformYBack(y), 10);
	console.log(res[0]);
	selectedPlayer = res[0];
	/*
	if(player === undefined){
		console.log("No player selected...");
		selectedPlayer = undefined;
		return;
	}else{
		selectedPlayer = player;
	}
	*/
}

function noCallback() {
	console.log("No function is selected. Please select one.");
}

/**
 * Set the canvas size to 100% of its parent width, and adjust the height to 50% of the width.
 * Call this function when initializing the canvas.
 */
function adjustCanvasSize() {
	var canvasElement = $("#annahme");
	var parent = canvasElement.parent();
	var parentWidth = parent.width();
	var parentHeight = parentWidth / 2;
	canvasHeight = parentHeight;
	canvasWidth = parentWidth;
	canvasElement.prop({
		"width": parentWidth,
		"height": parentHeight
	});
}

/**
 * Set the callback to the specified callback function.
 * @param callback is the function used as callback when a click in the canvas occures.
 */
function setCallback(callback) {
	callbackEvent = callback;
}

/**
 * Starts the animation of the exercise.
 */
function startAnimation() {
	if (!running) {
		timer = setInterval(draw, 10);
		running = true;
	}
}

/**
 * Stops the animation of the exercise.
 */
function stopAnimation() {
	clearInterval(timer);
	running = false;
}

/**
 * Adds the event listeners to all available and known elements on startup.
 */
function addEventListeners() {
	$("#startAnimation").on("click", function() {
		startAnimation()
	});
	$("#stopAnimation").on("click", function() {
		stopAnimation()
	});
	$("#addPlayer").on("click", function() {
		setCallback(addPlayer)
	});
	$("#movePlayer").on("click", function() {
		setCallback(movePlayer)
	});
	$("#selectPlayer").on("click", function() {
		setCallback(selectPlayer)
	});
}

$(document).ready(function() {
	adjustCanvasSize();
	init();
	addEventListeners();
	$("#annahme").on("mousedown", function(e) {
		var pos = getMousePos(this, e);
		console.log(pos.x);
		callbackEvent(pos.x, pos.y);
	});
});