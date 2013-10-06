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
		},
		success: function(){location.reload();}
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
		success: function(){location.reload();}
	});
}

function defaultSubscribe(subscribeType, trainingsID){
	$.ajax({
		type: 'POST',
		url: 'ProfileUtil.php',
		data: {
			subscribeType: subscribeType,
			trainingsID: trainingsID,
			'function': 'defaultSubscribe'
		}
	});
}

function removeTraining(id){
	$.ajax({
		type: 'POST',
		url: 'Training.php',
		data: {
			id: id,
			'function': 'removeTraining'
		},
		success: function(){location.reload();}
	});
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
		},
		success: function(){location.reload();}
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
		},
		success: function(){location.reload();}
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
		},
		success: function(){location.reload();}
	});
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
		},
		success: function(){location.reload();}
	});
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
	location.reload();
}

/**
 * Sending a chat message to the server.
 * @param sender is the sender of the message.
 * @param receiver is the receiver for this message.
 * @param message is the content of the message.
 */
function sendMessage(sender){
	$.ajax({
		  type: "POST",
		  url: "ChatUtil.php",
		  data: {
			  sender: sessionStorage.username,
			  receiver: sessionStorage.receiver,
			  message: $("#msg").val(),
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
			'receiver': receiver,
			'function': 'getMessages'
		},
		success: function(data) {
			returnMsg = data; 
		}
	});
	return jQuery.parseJSON(returnMsg);
}

/**
 * Get all messages for one receiver from one sender.
 * @returns an array of json-objects which encode the messages.
 */
function getAllMessagesFromSender(sender, receiver){
	var returnMsg = ""; 
	$.ajax({
		type: "POST",
		url: "ChatUtil.php",
		async: false,
		data: {
			'sender': sender,
			'receiver': receiver,
			'function': 'getMessagesFromSender'
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
		children: [{
			tag: 'div',
			class: 'panel-heading',
			html: '${sender} schrieb am ${sendtime}:'
		},{
			tag: 'div',
			class: 'panel-body',
			html: '${message}'
		}]
};

/**
 * Load all the messages of the current user, and display them.
 */
function loadMessages(sender){
	sessionStorage.receiver = sender;
	var messages = getAllMessagesFromSender(sender, sessionStorage.username);
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
 * Admin can subscribe or unsubscribe a user for training by default.
 * @param username id of the user.
 * @param trainingsID id of the training used for default subscribe.
 * @param subscribeType 1 for subscribe, 0 for unsubscribe.
 */
function defaultSubscribeForTrainingFromAdmin(username, trainingsID, subscribeType){
	$.ajax({
		type: 'POST',
		url: 'ProfileUtil.php',
		data: {
			username: username,
			trainingsID: trainingsID,
			subscribeType: subscribeType,
			'function': 'defaultSubscribeForTrainingFromAdmin'
		}
	});
}

passwordTransform = {
		tag: 'div',
		'class': 'modal fade',
		id: 'pwModal',
		tabindex: '-1',
		children: [{
			tag: 'div',
			'class': 'modal-dialog',
			children: [{
				tag: 'div',
				'class': 'modal-content',
				children: [{
					tag: 'div',
					'class': 'modal-header',
					children: [{
						tag: 'button',
						'class': 'close',
						'data-dismiss': 'modal',
						html: '&times'
					},{
						tag: 'h4',
						'class': 'modal-title',
						html: 'Passwort für ${firstname} ${name} zurücksetzen'
					}]
				},{
					tag: 'div',
					'class': 'modal-body',
					children: [{
						tag: 'div',
						'class': 'input-group',
						children: [{
							tag: 'label',
							'for': 'password',
							html: 'Neues Passwort: '
						},{
							tag: 'input',
							id: 'password',
							type: 'password',
							'class': 'form-control'
						},{
							tag: 'label',
							'for': 'passwordConfirm',
							html: 'Passwort bestätigen: '
						},{
							tag: 'input',
							id: 'passwordConfirm',
							type: 'password',
							'class': 'form-control'
						}]
					}]
				},{
					tag: 'div',
					'class': 'modal-footer',
					html: "<button type='button' class='btn btn-primary' onclick='resetPW(\"${username}\")'>Passwort zurücksetzen</button>"	//TODO create resetPW method
				}]
			}]
		}]
}

/**
 * Sends the reset password command to the server.
 */
function resetPW(username){
	if($("#password").val()===$("#passwordConfirm").val()){
		$.ajax({
			type: 'POST',
			url: 'AdminUtil.php',
			async: false,
			data: {
				'password': MD5($("#password").val()),
				'username': username,
				'function': 'resetPassword'
			}
		});
		$("#pwModal").modal('toggle');
	}else{
		console.log($("#password").val()+" "+$("#passwordConfirm").val());
	}
}

/**
 * Let the admin reset the users password.
 * @param user the user whos password gets reset.
 */
function resetPassword(user){
//	$.ajax({
//		type: "POST",
//		url: 'AdminUtil.php',
//		async: false,
//		data: {
//			username: user,
//			'function': 'resetPassword'
//		},
//		success: function(data){
//			var res = json2html.transform(data, passwordTransform);
//			$("body").add(res);
//			$("#pwModal").modal('toggle');
//		}
//	});
	var data = {
			username: "cedy",
			firstname: "Cedric",
			name: "Geissmann"
	};
	var res = json2html.transform(data, passwordTransform);
	$("#comment").html(res);
	$("#pwModal").modal('toggle');
}

$('button').click(function(){
	alert("it works");
});


//$(function(){
//
//    $('.nav li a').on('click', function(e){
//
////        e.preventDefault(); // prevent link click if necessary?
//
//        var $thisLi = $(this).parent('li');
//        var $ul = $thisLi.parent('ul');
//
//        if (!$thisLi.hasClass('active'))
//        {
//            $ul.find('li.active').removeClass('active');
//                $thisLi.addClass('active');
//        }
//
//    })
//
//})

/**
 * Remove ads from square7
 */
$('document').ready(function(){
	$('#removeNext').nextAll().remove();
});
