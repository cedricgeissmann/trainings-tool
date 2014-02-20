panelTransform = {
    "tag": "div",
        "class": "panel panel-default ${team}",
        "children": [{
        "tag": "div",
            "class": "panel-heading",
            "children": [{
            "tag": "h4",
                "class": "panel-title col-xs-11",
                "html": "${day} ${date} ${time}"
        }, {
            "tag": "div",
                "class": "btn-group",
                "children": [{
                "tag": "a",
                    "href": "#",
                    "class": "dropdown-toggle",
                    "data-toggle": "dropdown",
                    "children": [{
                    "tag": "span",
                        "class": "glyphicon glyphicon-cog"
                }, {
                    "tag": "b",
                        "class": "caret"
                }]
            }, {
                "tag": "ul",
                    "class": "dropdown-menu",
                    "children": [{
                    "tag": "li",
                        "html": "test"
                }]
            }]
        }]
    }, {
        "tag": "div",
            "class": "panel-body",
            "children": [{
            "tag": "div",
                "html": function () {
                return renderSubscribed(this, this.admin);
            }
        }, {
            "tag": "div",
                "html": function () {
                return renderUnsubscribed(this, this.admin);
            }
        }, {
            "tag": "div",
                "html": function () {
                return renderNotSubscribed(this, this.admin);
            }
        }]
    }]
};

subscribeTransform = {
    "tag": "div",
        "class": "col-sm-6",
        "children": [{
        "tag": "a",
            "href": "#",
            "class": "subscribe",
            "name": "${id}",
            "children": [{
            "tag": "h2",
                "html": "Anmelden:"
        }]
    }, {
        "tag": "div",
        "class": "subscribeList",
            "html": function () {
            return renderPersons(this.subscribed, this.admin);
        }
    }]
};

subscribeTransformAdmin = {
    "tag": "div",
        "class": "col-sm-4",
        "children": [{
        "tag": "a",
            "href": "#",
            "class": "subscribe",
            "name": "${id}",
            "children": [{
            "tag": "h2",
                "html": "Anmelden:"
        }]
    }, {
        "tag": "div",
        "class": "subscribeList",
            "html": function () {
            return renderPersons(this.subscribed, this.admin);
        }
    }]
};

unsubscribeTransform = {
    "tag": "div",
        "class": "col-sm-6",
        "children": [{
        "tag": "a",
            "href": "#",
            "class": "unsubscribe",
            "name": "${id}",
            "children": [{
            "tag": "h2",
                "html": "Abmelden:"
        }]
    }, {
        "tag": "div",
        "class": "unsubscribeList",
            "html": function () {
            return renderPersons(this.unsubscribed, this.admin);
        }
    }]
};

unsubscribeTransformAdmin = {
    "tag": "div",
        "class": "col-sm-4",
        "children": [{
        "tag": "a",
            "href": "#",
            "class": "unsubscribe",
            "name": "${id}",
            "children": [{
            "tag": "h2",
                "html": "Abmelden:"
        }]
    }, {
        "tag": "div",
        "class": "unsubscribeList",
            "html": function () {
            return renderPersons(this.unsubscribed, this.admin);
        }
    }]
};

notSubscribeTransformAdmin = {
    "tag": "div",
        "class": "col-sm-4",
        "children": [{
        "tag": "a",
            "href": "#",
            "children": [{
            "tag": "h2",
                "html": "Nicht gemeldet:"
        }]
    }, {
        "tag": "div",
        "class": "notSubscribedList",
            "html": function () {
            return renderPersons(this.notSubscribed, this.admin);
        }
    }]
};

resetPassword = generateDropdownTransormEntry("Passwort zurücksetzen", "resetPassword");

var traningsID = 0;

function generateDropdownTransormEntry(name, functionName){
    transform = {
        "tag": "li",
        "children": [{
            "tag": "a",
            "class": functionName,
            "data-trainingsid": function(){return trainingsID;},
            "data-username": "${username}",
            "href": "#",
            "html": name,
        }]
    }
    //console.log(transform); 
    return transform;
};

signUpPlayer = generateDropdownTransormEntry("Spieler anmelden", "signUpPlayer");

signUpPlayerAlways = generateDropdownTransormEntry("Spieler immer anmelden", "signUpPlayerAlways");

signOutPlayer = generateDropdownTransormEntry("Spieler abmelden", "signOutPlayer");

signOutPlayerAlways = generateDropdownTransormEntry("Spieler immer abmelden", "signOutPlayerAlways");
    
removePlayer = generateDropdownTransormEntry("Spieler entfernen", "removePlayer");

deletePlayer = generateDropdownTransormEntry("Spieler löschen", "deletePlayer");

activatePlayer = generateDropdownTransormEntry("Freischalten", "activate");

deactivatePlayer = generateDropdownTransormEntry("Sperren", "deactivate");

grantTrainer = generateDropdownTransormEntry("Trainerrechte gewähren", "grantTrainer");

denyTrainer = generateDropdownTransormEntry("Trainerrechte verwerfen", "denyTrainer");

grantAdmin = generateDropdownTransormEntry("Adminrechte gewähren", "grantAdmin");

denyAdmin = generateDropdownTransormEntry("Adminrechte verwerfen", "denyAdmin");

divider = {
    "tag": "li",
    "class": "divider"
};

personTransformAdmin = {
    "tag": "div",
        "class": "btn-group container",
        "children": [{
        "tag": "a",
            "html": "${firstname} ${name}",
            "name": "${username}",
            "href": "#",
            "class": "dropdown-toggle",
            "data-toggle": "dropdown",
            "children": [{
            "tag": "span"
        }, {
            "tag": "b",
                "class": "caret"
        }]
    }, {
        "tag": "ul",
            "class": "dropdown-menu",
            "children": [{
            "tag": "li",
                "children": [
                    signUpPlayer,
                    signOutPlayer,
                    removePlayer,
                    signUpPlayerAlways,
                    signOutPlayerAlways,
                    divider,
                    activatePlayer,
                    deactivatePlayer,
                    grantTrainer,
                    denyTrainer,
                    grantAdmin,
                    denyAdmin,
                    divider,
                    resetPassword,
                    deletePlayer
                ]
        }]
    }]
};

personTransform = {
    "tag": "div",
        "html": "${firstname} ${name}",
        "name": "${username}"
};


function renderPersons(persons, admin) {
    if (admin=1) {
        return json2html.transform(persons, personTransformAdmin);
    } else {
        return json2html.transform(persons, personTransform);
    }
}

function updateTrainingsID(id){
    trainingsID = id;
}

function renderSubscribed(persons, admin) {
    if (admin==1) {
        updateTrainingsID(persons.id);
        return json2html.transform(persons, subscribeTransformAdmin);
    } else {
        return json2html.transform(persons, subscribeTransform);
    }
}

function renderUnsubscribed(persons, admin) {
    if (admin==1) {
        updateTrainingsID(persons.id);
        return json2html.transform(persons, unsubscribeTransformAdmin);
    } else {
        return json2html.transform(persons, unsubscribeTransform);
    }
}

function renderNotSubscribed(persons, admin) {
    if (admin==1) {
        updateTrainingsID(persons.id);
        return json2html.transform(persons, notSubscribeTransformAdmin);
    }
}


$("#navbar-side li a").click(function (e) {
    showTeam(this.name);
});


function showTeam(team) {
    console.log(team);
    if (team == "all") {
        $(".panel").show();
    } else {
        $(".panel").hide();
        $("." + team).show();
    }
}

function movePlayer(playerName, element, subscribeListClass) {
    var panel = element.closest(".panel-body");
    var list = panel.find("."+subscribeListClass);
    var player = panel.find("[name*='" + playerName + "']");
    var tagName = player.prop("tagName");
    if (tagName == "A") {
        player = player.parent();
    }
    list.append(player);
}

function getSessionsUsername(){
	var res = "";
	$.ajax({
		type: 'POST',
		url: 'server/DatabaseUtil.php',
		data: {
			'function': 'getSessionsUsername'
		},
		async: false,
		success: function(data){
			res = data;
		}
	});
	return res;
}

/**
 * Removes all kinds of linebreaks from a string.
 * @param inputString to be cleaned.
 * @returns cleaned string as output.
 */
function removeLineBreaks(inputString){
	return inputString.replace(/(\r\n|\n|\r)/gm,"");
}

/**
 * subscribe the event triggering user for this training.
 */
function subscribe(id){
	$.ajax({
		type: "POST",
		url: "server/TrainingUtil.php",
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
		url: "server/TrainingUtil.php",
		data: {
			trainingsID: id,
			subscribeType: 0,
			'function': "subscribeForTraining"
		}
	});
}

/**
 * This function is for the admin, to subscribe someone for a training.
 */
function subscribeFromAdmin(username, trainingsID){
	$.ajax({
		type: 'POST',
		url: 'server/AdminUtil.php',
		data:{
			username: username,
			subscribeType: '1',
			trainingsID: trainingsID,
			'function': 'subscribeForTrainingFromAdmin'
		}
	});
}

/**
 * This function is for the admin, to unsubscribe someone for a training.
 */
function unsubscribeFromAdmin(username, trainingsID){
	$.ajax({
		type: 'POST',
		url: 'server/AdminUtil.php',
		data:{
			username: username,
			subscribeType: '0',
			trainingsID: trainingsID,
			'function': 'subscribeForTrainingFromAdmin'
		}
	});
}

/**
 * This function is for the admin, to remove someone for a training.
 */
function removeFromTrainingFromAdmin(username, trainingsID){
	$.ajax({
		type: 'POST',
		url: 'server/AdminUtil.php',
		data:{
			username: username,
			trainingsID: trainingsID,
			'function': 'removeFromTrainingFromAdmin'
		}
	});
}

/**
 * Admin can subscribe or unsubscribe a user for training by default.
 * @param username id of the user.
 * @param trainingsID id of the training used for default subscribe.
 * @param subscribeType 1 for subscribe, 0 for unsubscribe.
 */
function defaultSubscribeForTrainingFromAdmin(username, trainingsID, subscribeType){
	$.ajax({
		type: 'POST',
		url: 'server/AdminUtil.php',
		data: {
			"username": username,
			"trainingsID": trainingsID,
			"subscribeType": subscribeType,
			'function': 'defaultSubscribeForTrainingFromAdmin'
		}
	});
}

subscribeHandler = function() {
    var element = $(this);
    var id = this.name;
    //console.log("subscribe(" + id + ")");
    subscribe(id);
    var name = getSessionsUsername();
    name = removeLineBreaks(name);
    movePlayer(name, element, "subscribeList");
}

unsubscribeHandler = function() {
    var element = $(this);
    var id = this.name;
    //console.log("unsubscribe(" + id + ")");
    unsubscribe(id);
    var name = getSessionsUsername();
    name = removeLineBreaks(name);
    movePlayer(name, element, "unsubscribeList");
}

signUpPlayerHandler = function () {
    var element = $(this);
    var id = element.data('trainingsid');
    var username = element.data('username');
    //console.log("subscribeFromAdmin("+username+", "+id+")");
    subscribeFromAdmin(username, id);
    movePlayer(username, element, "subscribeList");
}

signOutPlayerHandler = function(){
	var element = $(this);
    var id = element.data('trainingsid');
    var username = element.data('username');
    //console.log("unsubscribeFromAdmin("+username+", "+id+")");
    unsubscribeFromAdmin(username, id);
    movePlayer(username, element, "unsubscribeList");
}



removePlayerHandler = function(){
    var element = $(this);
    var id = element.data('trainingsid');
    var username = element.data('username');
    //console.log("removeFromTrainingFromAdmin("+username+", "+id+")");
    removeFromTrainingFromAdmin(username, id);
    movePlayer(username, element, "notSubscribedList");
}

signUpPlayerAlwaysHandler = function(){
    var element = $(this);
    var id = element.data('trainingsid');
    var username = element.data('username');
    console.log("defaultSubscribeForTrainingFromAdmin("+username+", "+id+", 1)");
    defaultSubscribeForTrainingFromAdmin(username, id, 1);
    movePlayer(username, element, "subscribeList");
    console.log("fooock ya");
}


function addHandlers(){
	$(".subscribe").on("click", subscribeHandler);
	$(".unsubscribe").on("click", unsubscribeHandler);
	$(".signUpPlayer").on("click", signUpPlayerHandler);
	$(".signOutPlayer").on("click", signOutPlayerHandler);
	$(".removePlayer").on("click", removePlayerHandler);
	$(".signUpPlayerAlways").on("click", signUpPlayerAlwaysHandler);
}

/**
 * Loads the panels for the trainings.
 */
function loadPanels(){
	//TODO ajax request for panel data.
	var response = "";
	$.ajax({
		type: "POST",
		url: "server/TrainingUtil.php",
		async: false,
		data: {
			'function': "getTraining"
		},
		success: function(data){
			//console.log(data);
			response = data;
		}
	});
	panelData = jQuery.parseJSON(response);
    var res = json2html.transform(panelData, panelTransform);
    $("#content").html(res);
    addHandlers();
}

/**
 * When document is loaded, load the trainings.
 */
$("document").ready(function(){
    loadPanels();
});

/**
 * Remove ads from square7
 */
$('document').ready(function(){
	$('#removeNext').nextAll().remove();
});