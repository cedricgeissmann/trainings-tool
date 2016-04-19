/**
 * This file should be included on all pages, since it provides the necessary javascript-function for the other scripts to work.
 *
 * This file may not have any dependencies, exept for the external libraries that will be listed below.
 */



/**
 * External libraries:
 * JQuery: Version 2.2.2
 */


var minHeight = 32;		//minimum height for a textarea.
var webroot = "/test_new/test_dir/";

/**
 * Creates a console element, if it does not exist, so the internetexplorer does not crash when making console.log.
 */
function repairIEError(){
	if(!window.console){
		console = {
			log: function(){},
			info: function(){},
			warn:function(){},
			error:function(){}
		};
	}
}



/**
 * Use this method for a default ajax-request. The object that will be returned is a JSON-Object.
 * route: is the serverside script that will be called.
 * data: is a JSON-Object that contains the data which will be sent to the server.
 * callback: is the callback function that will be executed if the server returns data.
 */
function defaultAjax(route, data, callback){
	route = webroot + route;
	$.ajax({
		type: "POST",
		dataType: "json",
		url: route,
		data: data,
		success: function(data){
			callback(data);
		}
	});
}


/**
 * Use this method for a default ajax-request. The object that will be returned is a JSON-Object.
 * func: is the name of the function that will be called in a serverside script.
 * route: is the serverside script that will be called.
 * data: is a JSON-Object that contains the data which will be sent to the server.
 * callback: is the callback function that will be executed if the server returns data.
 */
function call_server_side_function(func, route, data, callback){
	data["function"] = func;
	defaultAjax(route, data, callback);
}

/**
 * Whenever a document is loaded, try to fix the console error.
 */
$(document).ready(function(){
	repairIEError();
});

/**
 * Calculates the duration between two times.
 * time1 the earlyer event in HH:MM
 * time2 the later event in HH:MM
 * @return duration from time1 to time2 in minutes
 */
function calculateDuration(time1, time2){
	var timeArray1 = time1.split(":");
	var timeArray2 = time2.split(":");
	var h = parseInt(timeArray2[0])-parseInt(timeArray1[0]);
	var m = parseInt(timeArray2[1])-parseInt(timeArray1[1]);
	var duration = (60*h)+m;
	return duration;
}

/**
 * Sort the html elements alphanumerical ascending by the given data attribute.
 * @param elem all children with the class selected of this element get sorted.
 * @param type defines the data attribute by which the elements are sorted.
 */
function sortHTMLElements(elem, type){
    //console.log($(elem).find(".sortable"));
    $(elem).find(".sortable").sortElements(function(a, b){
        return $(a).data(type) > $(b).data(type) ? 1 : -1;
    });
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
 * Replace all line breaks with \\n.
 * @param inputString the string in which the linebreaks should be replaced by \\n.
 * @return the input sting with the replaced linebreaks.
 */
function replaceLineBreaks(inputString){
	return inputString.replace(/(\r\n|\n|\r)/gm,"\\n");
}

/**
 * Remove all trailing line breaks.
 * @param inputString the string in which the trailing linebreaks should be removed.
 * @return the input sting without the trailing linebreaks.
 */
function removeTrailingLineBreak(inputString){
	return inputString.replace(/(\r\n|\n|\r)$/,"");
}

/**
 * Takes a String as input, trys to convert it to the format hh:mm
 */
function stringToTimeInterpreter(str){
	return str.replace(/(\.|\,)/gm,":");
}

/**
 * Resize all textareas so the match with their content.
 */
function resizeTextAreas() {
  $("textarea").each(function(i, obj){
	if(obj.scrollHeight>minHeight){
		$(obj).height(obj.scrollHeight);
	}else{
		$(obj).height(minHeight);
	}
  });
}

/**
 * Resize a specific textarea to match its content. Add this as a callback function to an on input handler, to have the textarea resize while typing.
 * @param textarea the element which should be resized.
 */
function resizeActiveTextArea(textarea){
	textarea.height(minHeight);
	textarea.height(textarea[0].scrollHeight);
}

/**
 * TODO: delete this function, is still in use in admin...
 * Generets a json representation of an entry for the dropdown menu. This can only be called in a json2html transform.
 * @param name the display name of the dropdown entry
 * @param functionName specifies the class of the dropdown entry, to add an eventhandler later.
 * @return the JSON object after inserting the display name and class name.
 */
function generateDropdownTransformEntry(name, functionName){
    var transform = {
        "tag": "li",
        "children": [{
            "tag": "a",
            "class": functionName,
            "data-trainingsid": "${trainingsID}",
            "data-username": "${username}",
            "href": "#!",
            "html": name,
        }]
    };
    return transform;
}


/**
 * Extracts the arguments from a callback function and returns them as args without the function name.
 * @param arg are the arguments of a callback function.
 * @return the arguments as array, without the functions name as first element.
 */
function extractArguments(arg){
	var args = [];
	for(var i=1;i<arg.length;i++){
		args.push(arg[i]);
	}
	return args;
}

/**
 * Generates a JSON object from the localStorage, which containes admin and trainer.
 * @return returns the JSON object if admin or trainer exists in the cache. Retruns null otherwise.
 */
function generateAdminTrainerFromCache(){
	var admin = getItemFromCache("admin");
	if(admin!==null){
		admin = admin.data;
	}else{
		return null;
	}
	var trainer = getItemFromCache("trainer");
	if(trainer!==null){
		trainer = trainer.data;
	}else{
		return null;
	}
	var res = {
		"admin": admin,
		"trainer": trainer
	};
	return res;
}

/**
 * Checks if the item exists in the cache, and if it is allready expired.
 * @param itemName name of the item, which is accessed from cache.
 */
function checkCache(itemName){
	if(localStorage.hasOwnProperty(itemName)){
		var item = localStorage.getItem(itemName);
		item = jQuery.parseJSON(item);
		if(item.expirationTime<0){
			return true;
		}
		var actTime = parseInt(new Date().getTime() / 1000);
		var timeout = parseInt(item.timeOfStorrage+item.expirationTime);
		if(timeout<actTime){
			localStorage.removeItem(itemName);
			return false;
		}
		return true;
	}
	return false;
}

/**
 * Clears the complete cache. This function should be called on logout, because of user change.
 */
function clearCache(){
	//console.trace();
	localStorage.clear();
}

/**
 * Stores an iten into the cache as a JSON object with sorrageTime and expiration time.
 * @param name is the name of the item which is storred in the cache.
 * @param data the data which is storred under the item name.
 * @param expirationTime when the item expires in seconds.
 */
function storeItemToCache(name, data, expirationTime){
	var actTime = parseInt(new Date().getTime() / 1000);
	var cacheObject = {
		"name": name,
		"data": data,
		"timeOfStorrage": actTime,
		"expirationTime": expirationTime
		
	};
	localStorage.setItem(name, JSON.stringify(cacheObject));
}

/**
 * Checks if an item in cache is expired. If not return the item else return null.
 * @param name is the name of the item, which is accessed in the cache.
 */
function getItemFromCache(name){
	if(checkCache(name)){
		var item = localStorage.getItem(name);
		return jQuery.parseJSON(item);
	}else{
		return null;
	}
}

/**
 * Checks if the user who is logged in, has admin or trainer function. If there exists an entry in the local localStorage load it from there. Else load it from the Server and store it in the cache.
 */
function checkAdminAndTrainerWithCallback(callback){
	var args = extractArguments(arguments);
	var adminTrainer = generateAdminTrainerFromCache();
	if(adminTrainer!==null){
		callback(args, adminTrainer);
	}else{
		$.ajax({
			"type": "POST",
			"url": "server/AdminUtil.php",
			"data": {
				"function": "checkAdminAndTrainer"
			},
			"dataType": "json",
			success: function(data){
				data = data[0];		//extract the first element from the list.		//TODO change this so it has only one element in the list. The one for the team.
				storeItemToCache("admin", data.admin, 60);
				storeItemToCache("trainer", data.trainer, 60);
				callback(args, data);
			},
		});
	}
}

/**
 * Removes elements that are not visible for non-trainer or non-admin.
 */
function setVisibilities(args, data){
	var admin = data.admin;
	var trainer = data.trainer;
	if(admin==0 && trainer==0){
		$(".visibleAdmin.visibleTrainer").remove();
	}
	if(admin==0/* && trainer==1*/){
		$(".visibleAdmin:not(.visibleTrainer)").remove();
	}
	if(/*admin==1 && */trainer==0){
		$(".visibleTrainer:not(.visibleAdmin)").remove();
	}
	fitIntoRow();
}

/**
 * For each row element, get the direct children, and change their size, so the all fit perfectly in.
 */
function fitIntoRow(){
	var cols = $(".equidistant");
	cols.each(function(){
		var sibs = $(this).siblings(".equidistant");
		var numberOfSiblings = sibs.length+1;		//+1 because self is no sibling.
		var numberOfColumns = 12/numberOfSiblings;
		sibs.addClass("col-sm-"+numberOfColumns);
	});
}


/**
 * Opens a notification modal to notify the user with a message. If the notification modal does not allready exist, create a new one.
 * @param msg the message which is displayed in the modal. Can contain html elements.
 */
function notifyUser(msg){
	if($("#notificationModal").size()===0){
		var res = json2html.transform(defaultNotificationData, defaultNotificationTransform);
		$(res).insertBefore("#removeNext");
	}
	$("#notificationModal").modal("toggle");
	$("#notificationModalContent").html(msg);
}

/**
 * Initializes a datepicker dialog on all elements that have datepicker.
 */
function initDatepicker(){
	$(".datepicker").on("click", function(){
	if (!$(this).hasClass("hasDatepicker"))
        {
            $(this).datepicker({
				"dateFormat": "yy-mm-dd"
            });
            $(this).datepicker("show");
        }
	});
}

/**
 * Adds a dummy element at the end of the page. Checks in which environment the element is visible.
 * @return return the number of the actual environment.
 */
function findBootstrapEnvironment() {
    var envs = ["ExtraSmall", "Small", "Medium", "Large"];
    var envsNumbers = [1, 2, 3, 4];
    var envValues = ["xs", "sm", "md", "lg"];

    var el = $('<div>');
    el.insertBefore("#removeNext");

    for (var i = envValues.length - 1; i >= 0; i--) {
        var envVal = envValues[i];

        el.addClass('hidden-'+envVal);
        if (el.is(':hidden')) {
            el.remove();
            return envsNumbers[i];
        }
    }
}

/**
 * Executes different functions when the document is ready.
 */
$(document).ready(function(){
	checkAdminAndTrainerWithCallback(setVisibilities);
});

/**
 * Adds a new handler to an elements and removes the old one, so that there are not two different handlers on one element.
 * @param name means the jQuery selection identifier to select the element the handler will be added to.
 * @param handlerType defines what type of handler will be added. {click, mouseover, ...}
 * @param callbackFunction the function which is executed when the event is triggered.
 */
function addHandlerToElements(name, handlerType, callbackFunction){
	$(name).off(handlerType);
	$(name).on(handlerType, callbackFunction);
}


/**
 * Adds a additional new handler to an element.
 * @param name means the jQuery selection identifier to select the element the handler will be added to.
 * @param handlerType defines what type of handler will be added. {click, mouseover, ...}
 * @param callbackFunction the function which is executed when the event is triggered.
 */
function addAdditionalHandlerToElements(name, handlerType, callbackFunction){
	$(name).on(handlerType, callbackFunction);
}

/**
 * Gets the total number of players for a training with the given ID. Hands the received data over to a callback function.
 * @param trainingID the ID of the training for which the number of player is asked.
 */
function getNumberOfPlayersForTraining(trainingID, callback){
	//TODO make this function async. Add a callback function.
	$.ajax({
		"type": "POST",
		"url": "server/TrainingUtil.php",
		"data": {
			"trainingID": trainingID,
			"function": "getNumberOfPlayersForTraining"
		},
		"dataType": "json",
		"success": function(data){
			callback(data);
		}
	});
}

/**
 * Gets the username storred for the actual session.
 * @param callback the function that is called when the name is retrived.
 */
function getSessionsUsername(callback){
	var callbackArguments = arguments;
	if(checkCache("sessionUsername")){
		var username = getItemFromCache("sessionUsername").data;
		callback(username, callbackArguments[1], callbackArguments[2]);
	}else{
		$.ajax({
			"type": "POST",
			"url": "server/TrainingUtil.php",
			"data": {
				"function": "getSessionsUsername"
			},
			"success": function(data){
				var res = removeLineBreaks(data);
				storeItemToCache("sessionUsername", res, -1);
				callback(res, callbackArguments[1], callbackArguments[2]);
			}
		});
	}
}

/**
 * TODO: Clean this code
 * Resize an area to fit into its parent. Use this function if a overflow-y is set.
 * @param areaID the id of the element that will be resized.
 */
function resizeArea(areaID){
	var conHeight = $(window).height()-$("#"+areaID).offset().top;
	var offsetBottom = 40; //with this offset, there is no scroll on the page.
	$("#"+areaID).height(conHeight-offsetBottom);
}




/*--------------------------------------------------------------------------------------------------------------------------------*/
//TODO deactivate these functions

/**
 * Gets the username for the current session.
 */
function getSessionUser(){
	var res = "";
	$.ajax({
		"type": "POST",
		"url": "server/AdminUtil.php",
		"data": {
			"function": "getSessionUser"
		},
		"async": false,
		"success": function(data){
			res = removeLineBreaks(data);
		}
	});
	return res;
}



/**
 * Gets the full name for a specific username.
 */
function getFullName(username){
	var res = "";
	//TODO cache the result. Add calback function, so it is nonblocking.
	$.ajax({
		"type": "POST",
		"url": "server/AdminUtil.php",
		"data": {
			"username": username,
			"function": "getFullName"
		},
		"async": false,
		"success": function(data){
			res = removeLineBreaks(data);
		}
	});
	return res;
}



/**
 * TODO: Call these functions in the ajax success function only if they are needed.
 * Execute this every time a ajax call is completed.
 */
$(document).ajaxComplete(function(){
	//console.log("all is loaded");
	initDatepicker();
	$("textarea").on("input", function(){resizeActiveTextArea($(this));});
});


function sendTestMail(receiver, sender){
	$.ajax({
		"type": "POST",
		"url": "server/MailUtil.php",
		"data": {
			"receiver": receiver,
			"sender": sender,
			"function": "testMail"
		},
		"success": function(data){
			console.log(data);
		}
	});
}

/**
 * TODO: remove if not needed anymore
 * Lists all item that are stored in the localStorage.
 */
function listLocalStorage(){
	for(var i in localStorage){
		console.log(localStorage[i]);
	}
}

 $(window).bind('storage', function (e) {
	 console.log($(this));
     console.log(e);
 });
