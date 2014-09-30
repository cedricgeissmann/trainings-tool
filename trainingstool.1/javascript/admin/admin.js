

var resetPassword = generateDropdownTransformEntry("Passwort zurücksetzen", "resetPassword");

var deletePlayer = generateDropdownTransformEntry("Spieler löschen", "deletePlayer");

var activatePlayer = generateDropdownTransformEntry("Freischalten", "activate");

var deactivatePlayer = generateDropdownTransformEntry("Sperren", "deactivate");

var grantTrainer = generateDropdownTransformEntry("Trainerrechte gewähren", "grantTrainer");

var denyTrainer = generateDropdownTransformEntry("Trainerrechte verwerfen", "denyTrainer");

var grantAdmin = generateDropdownTransformEntry("Adminrechte gewähren", "grantAdmin");

var denyAdmin = generateDropdownTransformEntry("Adminrechte verwerfen", "denyAdmin");

var editPlayer = generateDropdownTransformEntry("Spieler bearbeiten", "editPlayer");

var teamMemberTransform = {
    
            "tag": "tr",
            "class": "sortable",
            "data-firstname": "${firstname}",
            "data-name": "${name}",
            "data-birthdate": "${birthdate}",
            "data-username": "${username}",
            "data-phone": "${phone}",
            "data-mail": "${mail}",
            "data-address": "${street}",
            "data-zip": "${zip}",
            "data-city": "${city}",
            "children": [{
                "tag": "td",
                "children": [{
                    "tag": "div",
                    "class": "btn-group",
                    "children": [{
                        "tag": "a",
                        "html": "${username}",
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
                                activatePlayer,
                                deactivatePlayer,
                                grantTrainer,
                                denyTrainer,
                                grantAdmin,
                                denyAdmin,
                                divider,
                                resetPassword,
                                deletePlayer,
                                editPlayer
                            ]
                        }]
                    }]
                }]
            },{
                "tag": "td",
                "html": "${firstname}"
            },{
                "tag": "td",
                "html": "${name}"
            },{
                "tag": "td",
                "html": "${birthdate}"
            },{
                "tag": "td",
                "html": "${phone}"
            },{
                "tag": "td",
                "html": "${mail}"
            },{
                "tag": "td",
                "html": "${street} ${street_number}"
            },{
                "tag": "td",
                "html": "${zip}"
            },{
                "tag": "td",
                "html": "${city}"
            }]
};

/**
 * When this handler is triggerd, all elements get sorted ascending by the data attribute given by the data attribute sort.
 * @param elem is the html element that triggers the event.
 */
function sortElementsHandler(elem){
	var type = elem.data("sort");
	var parent = elem.closest(".panel");
	//console.log(parent);
	sortHTMLElements(parent, type);
}

/**
 * Add handlers to each trigger.
 */
function addHandlers(){
	addHandlerToElements(".activate", "click", function(){activatePlayerHandler($(this));});
	addHandlerToElements(".deactivate", "click", function(){deactivatePlayerHandler($(this));});
	addHandlerToElements(".grantTrainer", "click", function(){grantTrainerHandler($(this));});
	addHandlerToElements(".denyTrainer", "click", function(){denyTrainerHandler($(this));});
	addHandlerToElements(".grantAdmin", "click", function(){grantAdminHandler($(this));});
	addHandlerToElements(".denyAdmin", "click", function(){denyAdminHandler($(this));});
	addHandlerToElements(".resetPassword", "click", function(){resetPasswordHandler($(this));});
	addHandlerToElements(".deletePlayer", "click", function(){deleteUserHandler($(this));});
	addHandlerToElements(".editPlayer", "click", function(){editPlayerHandler($(this));});
	addHandlerToElements(".sorter", "click", function(){sortElementsHandler($(this));});
}

/**
 * Renders the JSON array to an html element, that displayes the members and their address data.
 * @param memberList JSON array that contains all the data for one member.
 */
function renderTeamMembers(memberList){
	var res = json2html.transform(memberList, teamMemberTransform);
	return res;
}

/**
 * Takes a JSON array which contains the admin data, renders it to an html element, and inserts it into the page.
 * @param adminData is the JSON array that is convertet into an html element.
 */
function renderAdminPanels(adminData){
	var res = json2html.transform(adminData, adminTransform);
	$("#content").append(res);
	addHandlers();
}

/**
 * Gets the data for the admin panels from the server as JSON array. Hands the data to a render function.
 */
function loadAdminPanels(){
	$.ajax({
		"type": "POST",
		"url": "server/AdminUtil.php",
		"data": {
			"function": "initAdmin"
		},
		"dataType": "json",
		"success": function(adminData){
			renderAdminPanels(adminData);
		}
	});
}

/**
 * When document is loaded, load the trainings.
 */
$("document").ready(function(){
	loadAdminPanels();
	changeNavbarActive("nav-admin");
});