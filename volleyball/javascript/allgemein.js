//function send_ajax(msg, dest){
//	var params = msg;
//	var response = "";
//	var xmlhttp;
//	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
//		xmlhttp = new XMLHttpRequest();
//	} else {// code for IE6, IE5
//		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//	}
//
//	xmlhttp.open("POST", dest, false);
//	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//
//	xmlhttp.onreadystatechange = function() {
//		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//			response = xmlhttp.responseText;
//		}
//	};
//
//	xmlhttp.send(params);
//	return response;
//}


/**
 * @deprecated sets the type of the actual training. In newer version all events are displayed in one page separated into their categories.
 */
function setType(type){
	sessionStorage.type=type;
}

/**
 * @deprecated use remove from jquery.
 */
function removeElement(id) {
	var element = document.getElementById(id);
	element.parentNode.removeChild(element);
}

/**
 * @deprecated should not be in use anymore.
 */
function change_type(){
	document.getElementById("type").value = sessionStorage.type;
}

/**
 * Loads all trainings in the database, from today on.
 */
function loadTraining(type){
	if(type==undefined){
		type = "training";
	}
	//document.getElementById("response").innerHTML = send_ajax("type="+type+"&function=getTraining", "Training.php");
	$ajax({
		type: "POST",
		url: "Training.php",
		data: {
			type: type,
			func: "getTraining"
		}
	}).done(function(res){
		$("#response").html(res);
	});
	
}

/**
 * subscribe the event triggering user for this training.
 */
function subscribe(arg){
	//send_ajax("trainingsID="+arg.name+"&subscribeType=1&function=subscribeForTraining", "Training.php");
	//loadTraining(sessionStorage.type);
	$ajax({
		type: "POST",
		url: "Training.php",
		data: {
			trainingsID: arg.name,
			subscribeType: 1,
			func: "subscribeForTraining"
		}
	}).done(function(res){
		$("#response").html(res);
	});
}

/**
 * unsubscribe the event triggering user for this training.
 */
function unsubscribe(arg){
	send_ajax("trainingsID="+arg.name+"&subscribeType=0&function=subscribeForTraining", "Training.php");
	loadTraining(sessionStorage.type);
}

function defaultSubscribe(subscribeType, trainingsID){
	send_ajax("subscribeType="+subscribeType+"&trainingsID="+trainingsID+"&function=defaultSubscribe", "ProfileUtil.php");
}

function removeTraining(arg){
//	removeElement(arg.name);
	document.getElementById("comment").innerHTML = send_ajax("id="+arg.name+"&type="+sessionStorage.type+"&function=removeTraining", "Training.php");
	window.location.reload();
}

function getSession(sessionDescriber, variableName){
	var session=send_ajax("sessionDescriber="+sessionDescriber+"&variableName="+variableName+"&function=getSession", "ProfileUtil.php");
	return session;
}


var firstname = "";
var lastname = "";
var trainingsID = 0;

$(document).on('contextmenu', "p", function(){
	if(getSession("user", "admin")==1){
		var tmpName = this.innerHTML;
		var tmp = tmpName.split(" ");
		firstname = tmp[0];
		lastname = tmp[1];
		trainingsID = this.parentNode.parentNode.parentNode.id;
	}
});

$('document').ready(function(){
	if(getSession("user", "admin")==1){
		$.contextMenu({
			selector: '.personInTraining', 
			callback: function(key){
				if(key=="subscribe"){
					send_ajax("firstname="+firstname+"&lastname="+lastname+"&subscribeType=1&trainingsID="+trainingsID+"&function=subscribeForTrainingFromAdmin", "AdminUtil.php");
				}else if(key=="unsubscribe"){
					send_ajax("firstname="+firstname+"&lastname="+lastname+"&subscribeType=0&trainingsID="+trainingsID+"&function=subscribeForTrainingFromAdmin", "AdminUtil.php");
				}else if(key=="remove"){
					send_ajax("firstname="+firstname+"&lastname="+lastname+"&subscribeType=0&trainingsID="+trainingsID+"&function=removeFromTrainingFromAdmin", "AdminUtil.php");
				}
				location.reload();
			},
			items: {
				"subscribe": {name: "Anmelden"},
				"unsubscribe": {name: "Abmelden"},
				"remove": {name: "Entfernen"}
			}
		});
	}
});

function activate(username, active){
	send_ajax("username="+username+"&active="+active+"&function=activate", "AdminUtil.php");
}

function changeTrainer(username, active){
	send_ajax("username="+username+"&active="+active+"&function=changeTrainer", "AdminUtil.php");
}

function changeAdmin(username, active){
	send_ajax("username="+username+"&active="+active+"&function=changeAdmin", "AdminUtil.php");
}

function deleteUser(username){
	send_ajax("username="+username+"&function=deleteUser", "AdminUtil.php");
}

fixNavbar = false;
headerSize = 50;
navbarSize = 40;
/**
 * Fix navbar at top of the window.
 */
//$(window).scroll(function () {
//    if ($(window).scrollTop() > headerSize && fixNavbar==false) {
//        $('#navbar').toggleClass('navbar-static-top navbar-fixed-top');
//        fixNavbar = true;
//        $('body').css('margin-top', navbarSize);
//    }
//}
//);
//
///**
// * Fix navbar directly under the header.
// */
//$(window).scroll(function () {
//    if ($(window).scrollTop() <= headerSize && fixNavbar==true) {
//        $('#navbar').toggleClass('navbar-static-top navbar-fixed-top');
//        fixNavbar = false;
//        $('body').css('margin-top', 0);
//    }
//}
//);

//function wrapPlayers(){
//	$('.personInTraining').wrap("<div class='playerDiv row'></div>");
//	$('.playerDiv').append("<button class='btn span'>test</button>");
//}

/**
 * This function is for the admin, to subscribe someone for a training.
 */
function subscribeFromAdmin(username, trainingsID){
	send_ajax("username="+username+"&subscribeType=1&trainingsID="+trainingsID+"&function=subscribeForTrainingFromAdmin", "AdminUtil.php");
	var scroll = $(window).scrollTop();
	loadTraining(sessionStorage.type);
	$(window).scrollTop(scroll);
}

/**
 * This function is for the admin, to unsubscribe someone for a training.
 */
function unsubscribeFromAdmin(username, trainingsID){
	send_ajax("username="+username+"&subscribeType=0&trainingsID="+trainingsID+"&function=subscribeForTrainingFromAdmin", "AdminUtil.php");
	var scroll = $(window).scrollTop();
	loadTraining(sessionStorage.type);
	$(window).scrollTop(scroll);
}

/**
 * This function is for the admin, to remove someone for a training.
 */
function removeFromTrainingFromAdmin(username, trainingsID){
	alert(username+" "+trainingsID);
	document.getElementById("comment").innerHTML = send_ajax("username="+username+"&trainingsID="+trainingsID+"&function=removeFromTrainingFromAdmin", "AdminUtil.php");
	var scroll = $(window).scrollTop();
	loadTraining(sessionStorage.type);
	$(window).scrollTop(scroll);
}

/**
 * Sending a chat message to the server.
 */
function sendMessage(sender, receiver, message){
	$.ajax({
		  type: "POST",
		  url: "ChatUtil.php",
		  data: { sender: sender, receiver: receiver, message: message, func: 'messageSent' }
		})
		  .done(function( msg ) {
//		    alert( "Message sent" );
		  });
}



/**
 * Remove ads from square7
 */
$('document').ready(function(){
	$('#removeNext').nextAll().remove();
});
