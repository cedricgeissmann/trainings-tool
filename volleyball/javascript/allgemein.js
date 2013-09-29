/**
 * subscribe the event triggering user for this training.
 */
function subscribe(id){
	$.ajax({
		type: "POST",
		url: "Training.php",
		data: {
			trainingsID: id,
			subscribeType: 1,
			'function': "subscribeForTraining"
		}
	});
}

/**
 * unsubscribe the event triggering user for this training.
 */
function unsubscribe(id){
	$.ajax({
		type: "POST",
		url: "Training.php",
		data: {
			trainingsID: id,
			subscribeType: 0,
			'function': "subscribeForTraining"
		},
		success: function(res){alert(res);}
	});
}

function defaultSubscribe(subscribeType, trainingsID){
	send_ajax("subscribeType="+subscribeType+"&trainingsID="+trainingsID+"&function=defaultSubscribe", "ProfileUtil.php");
}

function removeTraining(arg){
	document.getElementById("comment").innerHTML = send_ajax("id="+arg.name+"&type="+sessionStorage.type+"&function=removeTraining", "Training.php");
	window.location.reload();
}

function getSession(sessionDescriber, variableName){
	var session=send_ajax("sessionDescriber="+sessionDescriber+"&variableName="+variableName+"&function=getSession", "ProfileUtil.php");
	return session;
}

function activate(username, active){
	$.ajax({
		type: 'POST',
		url: 'AdminUtil.php',
		data: {
			username: username,
			active: active,
			'function': 'activate'
		}
	});
}

function changeTrainer(username, active){
	$.ajax({
		type: 'POST',
		url: 'AdminUtil.php',
		data: {
			username: username,
			active: active,
			'function': 'changeTrainer'
		}
	});
}

function changeAdmin(username, active){
	$.ajax({
		type: 'POST',
		url: 'AdminUtil.php',
		data: {
			username: username,
			active: active,
			'function': 'changeAdmin'
		}
	});
}

function deleteUser(username){
	$.ajax({
		type: 'POST',
		url: 'AdminUtil.php',
		data: {
			username: username,
			'function': 'deleteUser'
		}
	});
}

/**
 * This function is for the admin, to subscribe someone for a training.
 */
function subscribeFromAdmin(username, trainingsID){
	$.ajax({
		type: 'POST',
		url: 'AdminUtil.php',
		data:{
			username: username,
			subscribeType: '1',
			trainingsID: trainingsID,
			'function': 'subscribeForTrainingFromAdmin'
		}
	});
	//TODO reload page
}

/**
 * This function is for the admin, to unsubscribe someone for a training.
 */
function unsubscribeFromAdmin(username, trainingsID){
	$.ajax({
		type: 'POST',
		url: 'AdminUtil.php',
		data:{
			username: username,
			subscribeType: '0',
			trainingsID: trainingsID,
			'function': 'subscribeForTrainingFromAdmin'
		}
	});
	//TODO reload page
}

/**
 * This function is for the admin, to remove someone for a training.
 */
function removeFromTrainingFromAdmin(username, trainingsID){
	$.ajax({
		type: 'POST',
		url: 'AdminUtil.php',
		data:{
			username: username,
			trainingsID: trainingsID,
			'function': 'removeFromTrainingFromAdmin'
		}
	});
	//TODO reload page
}

/**
 * Sending a chat message to the server.
 * @param sender is the sender of the message.
 * @param receiver is the receiver for this message.
 * @param message is the content of the message.
 */
function sendMessage(sender, receiver, message){
	$.ajax({
		  type: "POST",
		  url: "ChatUtil.php",
		  data: {
			  sender: sender,
			  receiver: receiver,
			  message: message,
			  'function': 'messageSent'
		  }
	});
}

/**
 * Get all messages for one receiver.
 * @returns an array of json-objects which encode the messages.
 */
function getAllMessages(receiver){
	var returnMsg = ""; 
	$.ajax({
		type: "POST",
		url: "ChatUtil.php",
		async: false,
		data: {
			receiver: receiver,
			'function': 'getMessages'
		},
		success: function(data) {
			returnMsg = data; 
		}
	});
	return jQuery.parseJSON(returnMsg);
}

/**
 * Transformation from a message-json-object into html code.
 */
messageTransform = {
		tag: 'div',
		class: 'panel panel-default',
		children: [
		{
			tag: 'div',
			class: 'panel-heading',
			html: '${sender} schrieb am ${sendtime}:'
		},
		{
			tag: 'div',
			class: 'panel-body',
			html: '${message}'
		}]
};

/**
 * Load all the messages of the current user, and display them.
 */
function loadMessages(){
	var messages = getAllMessages(sessionStorage.username);
	trans = json2html.transform(messages, messageTransform);
	$("#message").html(trans);
}

function executeQuery(query){
	var response = "";
	$.ajax({
		type: "POST",
		url: "DatabaseUtil.php",
		data: {
			'function': "getJSONFromQuery",
			query: query
		},
		async: false,
		success: function(data){
			response = data;
		}
	});
	return jQuery.parseJSON(response);
}

/**
 * Get cookies when user logs in.
 */
$(document).on('submit', 'form', function(e) {
	var username = $("#loginName").val();
	var user = executeQuery("SELECT username, firstname, name FROM user WHERE username='"+username+"'");
	user = user.pop();
	$.cookie('user', JSON.stringify(user));
//	$.cookie('username', user.username);
//	$.cookie('firstname', user.firstname);
//	$.cookie('name', user.name);
	var teams = executeQuery("SELECT tid FROM is_in_team WHERE username='"+username+"'");
	$.cookie('teams', JSON.stringify(teams));
});


/**
 * Remove ads from square7
 */
$('document').ready(function(){
	$('#removeNext').nextAll().remove();
});
