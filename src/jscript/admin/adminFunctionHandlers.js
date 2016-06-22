/**
 * Adds an eventhandler to the specified html element, which triggers the function to activate a player.
 * @param element the html element to which the handler gets attached.
 */
function activatePlayerHandler(element){
    var username = element.data("username");
    activate(username, 1);
}

/**
 * Adds an eventhandler to the specified html element, which triggers the function to deactivate a player.
 * @param element the html element to which the handler gets attached.
 */
function deactivatePlayerHandler(element){
    var username = element.data("username");
    activate(username, 0);
}

/**
 * Adds an eventhandler to the specified html element, which triggers the function to grant admin rights to this player.
 * @param element the html element to which the handler gets attached.
 */
function grantAdminHandler(element){
    var username = element.data("username");
    changeAdmin(username, 1, element);
}

/**
 * Adds an eventhandler to the specified html element, which triggers the function to take away admin rights to this player.
 * @param element the html element to which the handler gets attached.
 */
function denyAdminHandler(element){
    var username = element.data("username");
    changeAdmin(username, 0, element);
}

/**
 * Adds an eventhandler to the specified html element, which triggers the function to grant trainer rights to this player.
 * @param element the html element to which the handler gets attached.
 */
function grantTrainerHandler(element){
    var username = element.data("username");
    changeTrainer(username, 1, element);
}

/**
 * Adds an eventhandler to the specified html element, which triggers the function to take away trainer rights to this player.
 * @param element the html element to which the handler gets attached.
 */
function denyTrainerHandler(element){
    var username = element.data("username");
    changeTrainer(username, 0, element);
}

/**
 * Adds an eventhandler to the specified html element, which triggers the function to reset the password for this player.
 * @param element the html element to which the handler gets attached.
 */
function resetPasswordHandler(element){
    var username = element.data("username");
    resetPasswordFunction(username);
}

/**
 * Adds an eventhandler to the specified html element, which triggers the function to delete this player.
 * @param element the html element to which the handler gets attached.
 */
function deleteUserHandler(element){
    var username = element.data("username");
    deleteUser(username);
    element.closest(".open").remove();	//remove the open dropdown menu
}

/**
 * Adds an eventhandler to the specified html element, which triggers the function to edit this player. Navigates to the profile page, and loads the specified user.
 * @param element the html element to which the handler gets attached.
 */
function editPlayerHandler(element){
	var username = element.data("username");
	editUser(username);
}