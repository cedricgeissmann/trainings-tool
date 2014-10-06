
/**
 * TODO: deactivate. Each element that needs the data id, should have it in its data attribute.
 * Get the data attribute team of the closest element of class panel.
 * @param element the element for with the parent panel is searched for.
 */
function getTeamID(element){
	var teamID = element.closest(".panel").data("team");
	return teamID;
}


/**
 * Sends an activate request to the server, to store in the database, if a user should be activated or not.
 * @param username of the user who should be activated.
 * @param active 1 if the user should be activated, or 0 if he should be deactivated.
 */
function activate(username, active){
	$.ajax({
		"type": "POST",
		"url": "server/AdminUtil.php",
		"data": {
			"username": username,
			"active": active,
			"function": "activate"
		}
	});
}

/**
 * Sends a request to the server, to store in the database, if a user should be trainer or not for a specific team.
 * @param username of the user who should be activated.
 * @param active 1 if the user should be activated, or 0 if he should be deactivated.
 * @param element the html element that holds the data attributes.
 */
function changeTrainer(username, active, element){
	$.ajax({
		"type": "POST",
		"url": "server/AdminUtil.php",
		"data": {
			"username": username,
			"active": active,
			"teamID": function(){return getTeamID(element);},
			"function": "changeTrainer"
		}
	});
}

/**
 * Sends a request to the server, to store in the database, if a user should be admin or not for a specific team.
 * @param username of the user who should be activated.
 * @param active 1 if the user should be activated, or 0 if he should be deactivated.
 * @param element the html element that holds the data attributes.
 */
function changeAdmin(username, active, element){
	$.ajax({
		"type": "POST",
		"url": "server/AdminUtil.php",
		"data": {
			"username": username,
			"active": active,
			"teamID": function(){return getTeamID(element);},
			"function": "changeAdmin"
		}
	});
}

/**
 * Let the admin reset the users password.
 * @param user the user whos password gets reset.
 */
function resetPasswordFunction(user){
	$.ajax({
		"type": "POST",
		"url": "server/AdminUtil.php",
		//"async": false,
		"data": {
			"username": user,
			"function": "getUser"
		},
		"dataType": "json",
		"success": function(data){
			//var res = json2html.transform(data, passwordTransform);
			console.log(data);
			var template = $("#passwordModalTemplate").html();
			var res = Mustache.render(template, data)
			$("#comment").html(res);
			$("#pwModal").modal("toggle");
		}
	});
}

/**
 * Sends the delete user command to the server. The user gets marked as deleted in the database, and should be deactivated.
 * @param username the user name of the user which should be deleted.
 */
function deleteUser(username){
	$.ajax({
		"type": "POST",
		"url": "server/AdminUtil.php",
		"data": {
			"username": username,
			"function": "deleteUser"
		},
		"success": function(data){
			notifyUser("Der Benutzer "+username+" wurde gelöscht.");
		}
	});
}

/**
 * Changes to location to profile.php and loads the secified user, so changes can be applied.
 * @param username the username of the user who should be edited.
 */
function editUser(username){
	localStorage.setItem("username", username);
	window.location = "profile.php";
}

/**
 * Sends the reset password command to the server.
 * @param username the username for which the password gets reset.
 */
function resetPWAdmin(username){
	console.log("PW reset");
	if($("#password").val()===$("#passwordConfirm").val()){
		$.ajax({
			"type": "POST",
			"url": "server/AdminUtil.php",
			//"async": false,
			"data": {
				"newPassword": $.md5($("#password").val()),
				"username": username,
				"function": "resetPassword"
			},
			"success": function(data){
				console.log(data);
				$("#pwModal").modal('toggle');
			}
		});
	}else{
		$("#passwordHint").html("Die Passwörter stimmen nicht überein.");
	}
}