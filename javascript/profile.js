/**
 * TODO: Change to async function.
 * Load the list of team members if a specified team as JSON array.
 * @param teamID the id of the team, for which all the members are loaded.
 * @returns return the json array with the team members.
 */
function getTeamMembers(teamID){
	var response = "";
	$.ajax({
		"type": "POST",
		"url": "server/ProfileUtil.php",
		"async": false,
		"data": {
			"teamID": teamID,
			"function": "getTeamMembers"
		},
		"success": function(data){
			response = data;
		}
	});
	return response;
}


var userSelectionTag = "<select id='userSelection' name='userSelection' class='form-control'></select>";

/**
 * TODO: Clean up this code. User list should be distinct.
 * Prepares the user selection dropdown.
 * @param admin a json array that contains information for the member, if he is admin for a specific team or not.
 * @param selected the username of the selected player.
 */
function userSelection(admin, selected){
	for(var i in admin){
		tmp = admin[i];
		if(tmp.admin==1){
			teamMemberData = getTeamMembers(tmp.tid);
			var res = json2html.transform(teamMemberData, userSelectionTransform);
			$("#usernameField").replaceWith(userSelectionTag);
			$("#userSelection").append(res);
			$("#userSelection").val(selected);
		}
	}
	$("#userSelection").on("change", function(){
		var user = $("#userSelection option:selected").val();
		loadProfilePanelsWithUsername(user);
	});
}

/**
 * Change the page that so that it works for sign up.
 */
function makeSignupChanges(){
	$("#navbar-head").remove();
	$("#usernameField").removeAttr("disabled");
	$("#changePasswordPanel").html("Passwort");
	$("#oldPasswordGroup").remove();
	$("#newPasswordLabel").html("Passwort:");
	$("#newPasswordConfirmLabel").html("Passwort bestätigen:");
}

/**
 * Loads the data for the team selection list as a JSON array, hands the data to its render function.
 */
function loadTeamSelectionData(){
	$.ajax({
		"type": "POST",
		"url": "server/ProfileUtil.php",
		"data": {
			"function": "getTeamList"
		},
		"dataType": "json",
		//async: false,
		"success": function(data){
			renderTeamSelection(data);		//TODO make this to a callback function, it it can be choosen dynamically.
		}
	});
}

/**
 * Select all teams from the list, in which the user is member of, mark the entries as selected.
 * @param teamData a JSON array that contains the list of teams.
 */
function markTeamMembership(teamData){
	var teamList = [];
	for(var tmp in teamData){
		teamList.push(teamData[tmp].tid);
	}
	var test = $("#teamSelector").val(teamList);
}

/**
 * Check if the user is admin in at least one of the teams he is a member of.
 * @param adminList a JSON array that contains all the teams with the admin flag for the user.
 */
function checkAdminClient(adminList){
	for(var i in adminList){
		if(adminList[i].admin==1){
			return true;
		}
	}
	return false;
}

/**
 * Loads the data to render the panels for profile manipulation as a json array, and hands it over to a callback render function.
 * @param user the name of the user for which the profile data should be loaded.
 */
/*function loadProfilePanelsWithUsername(user){
	$.ajax({
		"type": "POST",
		"url": "server/ProfileUtil.php",
		"data": {
			"username": user,
			"function": "getUserProfile"
		},
		"dataType": "json",
		"success": function(data){
			renderProfilePanels(data);		//TODO replace with callback function
		}
	});
}*/

/**
 * Takes a JSON array that contains the data for a specific user and converts it to an html element. Adds the element to the page.
 * @param profileData a JSON array that contains all data for this user.
 */
/*function renderProfilePanels(profileData){
	var admin = profileData.adminData;
	var selected = profileData.selectedUser;
	var teamData = profileData.teamList;
	profileData = profileData.profileData;
	var signup = false;
	if(profileData.length===0){
		profileData = [{}];			//empty json object, is needed to make the transformation.
		signup = true;
	}
	var res = json2html.transform(profileData, profileTransform);
	$("#content").html(res);
	userSelection(admin, selected);
	if(signup || checkAdminClient(admin)){
		loadTeamSelectionData();		//TODO add callback function, to specify how the data is rendered.
		markTeamMembership(teamData);
	}else{
		$("#teamSelectionPanel").remove();
	}
	if(signup){
		makeSignupChanges();
	}
}*/

/**
 * Checks if username is missing.
 */
function checkMissingUsername(){
	if($("#usernameField").val()==="" && $("#userSelection option:selected").text()===""){
		$("#modalContent").append("<p>Benutzername angeben...</p>");
		return true;
	}
	return false;
}

/**
 * Checks if firstname is missing.
 */
function checkMissingFirstname(){
	if($("#firstnameField").val()===""){
		$("#modalContent").append("<p>Vorname angeben...</p>");
		return true;
	}
	return false;
}

/**
 * Checks if name is missing.
 */
function checkMissingName(){
	if($("#nameField").val()===""){
		$("#modalContent").append("<p>Nachname angeben...</p>");
		return true;
	}
	return false;
}

/**
 * Checks if email is missing.
 */
function checkMissingMail(){
	if($("#mailField").val()===""){
		$("#modalContent").append("<p>Emailadresse angeben...</p>");
		return true;
	}
	return false;
}


/**
 * Checks if phonenumber is missing.
 */
function checkMissingPhone(){
	if($("#phoneField").val()===""){
		$("#modalContent").append("<p>Telefonnummer angeben...</p>");
		return true;
	}
	return false;
}

/**
 * Checks if street is missing.
 */
function checkMissingStreet(){
	if($("#streetnameField").val()===""){
		$("#modalContent").append("<p>Strasse angeben...</p>");
		return true;
	}
	return false;
}

/**
 * Checks if street number is missing.
 */
function checkMissingStreetNumber(){
	if($("#streetNumberField").val()===""){
		$("#modalContent").append("<p>Strassennummer angeben...</p>");
		return true;
	}
	return false;
}

/**
 * Checks if zip is missing.
 */
function checkMissingPLZ(){
	if($("#zipField").val()===""){
		$("#modalContent").append("<p>PLZ angeben...</p>");
		return true;
	}
	return false;
}

/**
 * Checks if city is missing.
 */
function checkMissingCity(){
	if($("#cityField").val()===""){
		$("#modalContent").append("<p>Stadt angeben...</p>");
		return true;
	}
	return false;
}


/**
 * Checks if some values are missing. Adds a notification for the missing values.
 */
function checkForMissingValues(){
	var missing = false;
	missing = checkMissingUsername() || missing;
	missing = checkMissingFirstname() || missing;
	missing = checkMissingName() || missing;
	missing = checkMissingMail() || missing;
	missing = checkMissingPhone() || missing;
	missing = checkMissingStreet() || missing;
	missing = checkMissingStreetNumber() || missing;
	missing = checkMissingPLZ() || missing;
	missing = checkMissingCity() || missing;
	return missing;
}

/**
 * Sends the reset password command to the server. Sets the new password in the database.
 * @param username the name of the user for which the password should be reset.
 * @param oldPassword the value of the old password, has to match with the existing in the database.
 * @param newPassword the value of the new password that will be set for this user.
 */
function resetPW(username, oldPassword, newPassword){
	$.ajax({
		"type": "POST",
		"url": "server/AdminUtil.php",
		"async": false,
		"data": {
			"oldPassword": oldPassword,
			"newPassword": newPassword,
			"username": username,
			"function": "resetPassword"
		},
		"success" : function(data){
			console.log(data);
			$("#notificationModal").modal("toggle");
			$("#notificationModalContent").html(data);
			//notifyUser(data);
			$("#oldPasswordField").val("");
			$("#newPasswordField").val("");
			$("#newPasswordConfirmField").val("");
		}
	});
}


/**
 * Get the username, eighter from select element or from text field.
 * @return username the username entered in the user textfield, or the select.
 */
function getUsernameFromFormular(){
	if($("#usernameField").val()!==undefined){
		return $("#usernameField").val();
	}else if($("#userSelection option:selected").text() !==undefined){
		return $("#userSelection option:selected").text();
	}
}


/**
 * Checks if there is a password, and checks if the new password and confirm password are the same.
 */
function checkPassword(){
	var oldPassword = $.md5($("#oldPasswordField").val());
	if(oldPassword!=="d41d8cd98f00b204e9800998ecf8427e"){							//md5("") == "d41d8cd98f00b204e9800998ecf8427e"		md5("undefined") == "5e543256c480ac577d30f76f9120eb74"
		var newPW = $.md5($("#newPasswordField").val());
		var newPWConfirm = $.md5($("#newPasswordConfirmField").val());
		if(newPW !== newPWConfirm){
			$("#modalContent").append("<p>Passwörter stimmen nicht überein...</p>");
			return true;
		}
		if(newPW === "d41d8cd98f00b204e9800998ecf8427e" || newPWConfirm === "d41d8cd98f00b204e9800998ecf8427e"){
			$("#modalContent").append("<p>Geben Sie ein Passwort ein...</p>");
			return true;
		}
		if(oldPassword!=="5e543256c480ac577d30f76f9120eb74"){
			var username = getUsernameFromFormular();
			resetPW(username, oldPassword, newPW);
		}
	}
}


/**
 * Send the content of the form element profileForm to the server to store it in the database.
 */
function sendProfileData(){
	$.ajax({
		"type": "POST",
		"url": "server/ProfileUtil.php",
		"data": $("#profileForm").serialize()+"&function=updateUser",
		"async": false,
		"success": function(data){
			//console.log(data);
			//TODO give feedback
			notifyUser(data);
			return false;
		}
	});
}

/**
 * TODO replace submit with send button.
 * check if all needed data is given, prevents the default submit action.
 */
$(document).submit(function(e){
	$("#modalContent").html("");
	var missing = checkForMissingValues();
	missing = checkPassword() || missing;
	if(missing){
		$("#modalAlert").modal("toggle");
	}else{
		sendProfileData();
		return false;
	}
	//window.location = "index.php";
	e.preventDefault();
	return false;
});


/**
 * When document is loaded, load the trainings.
 */
$("document").ready(function(){
	//var username = "";
	//if(localStorage.getItem("username")!==undefined){
	//	username = localStorage.getItem("username");
	//	localStorage.removeItem("username");
	//}	
    //loadProfilePanelsWithUsername(username);
    //changeNavbarActive("nav-profile");
});