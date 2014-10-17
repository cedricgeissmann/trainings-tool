/**
 * Loads a list of all team members and hands the data to the contact list renderer.
 */
function getContactList(){
	$.ajax({
		"type": "POST",
		"url": "server/ChatUtil.php",
		"data": {
			"function": "getContactList"
		},
		"dataType": "json",
		"success": function(data){
			renderContactList(data);
		}
	});
}

/**
 * Takes a JSON array as input and renders it to an html element and adds this to the page.
 * @param contactListData a JSON array that contains the data for the contact list.
 */
function renderContactList(contactListData){
	var res = json2html.transform(contactListData, contactListTransform);
	$("#contactList").append(res);
	addContactListHandler();
}

/**
 * TODO: Change this to async function, appand the result to the corresponding label.
 * Get the number of messages in the format unread/total.
 * @param username the name of the user you share a conversation with.
 */
function getNumberOfMessages(username){
    var res = "";
    $.ajax({
		"type": "POST",
        "url": "server/ChatUtil.php",
        "data": {
            "conversationPartner": username,
            "function": "getNumberOfUnread"
        },
		"dataType": "json",
        "success": function(data){
            res = data;
        },
        "async": false
    });
    return res[0].unread+"/"+res[0].tot;
}

/**
 * Scrolls down in the conversation area, so you can see the last message.
 */
function scrollDown(){
	$("#conversationArea").animate({ scrollTop: $('#conversationArea')[0].scrollHeight}, 1000);
}

var refreshInterval = 5000;		//interval in miliseconds to check for new messages.
var lastId = -1;


/**
 * Send the message in the messageInputField to the server.
 */
function sendMessage(){
	var username = localStorage.getItem("chatUsername");
	if($("#messageInputField").val()!=""){
		$.ajax({
			"type": "POST",
			"url": "server/ChatUtil.php",
			"data": {
				"message": $("#messageInputField").val(),
				"sender": getSessionUser(),
				"receiver": username,
				"function": "messageSent"
			},
			"success": function(){
				loadConversations(username);
				$("#messageInputField").val("");
			}
		});
	}
}


/**
 * TODO: Clean this code
 * Set the size of the chatarea, so there is no scrolling needed.
 */
function resizeChatArea(){
	var conHeight = $(window).height()-$("#chatPanel").offset().top;
	var offsetBottom = 30; //with this offset, there is no scroll on the page.
	$("#chatPanel").height(conHeight-offsetBottom);
	var height2 = $("#chatPanel").height()-$("#chatHeading").outerHeight(true);
	var h2 = height2-$("#chatPanelFooter").outerHeight(true);
	var paddingPanel = 2*15;		//15px is the padding in a panel.
	$("#conversationArea").height(h2-paddingPanel);
	scrollDown();
}

/**
 * Aligns the messages, so that your messages appear on the right side, and the one of the conversation partner on the left.
 */
function alignMessages(){
	console.log("I'm still needed.");
	var username = getSessionUser();
	$(".conversationBubble."+username).addClass("senderMessages");
}


/**
 * Load the conversation with a specified user from the server, as JSON array, and transform it to html element. Adds this to the page.
 * @param username the name of the conversation partner.
 */
function loadConversations(username){
	if(username!==""){
		localStorage.setItem("chatUsername", username);
		$.ajax({
			"type": "POST",
			"url": "server/ChatUtil.php",
			"data": {
				"lastId": lastId,
				"username": username,
				"function": "loadConversations"
			},
			"dataType": "json",
			"success": function(chatData){
				lastId = chatData.id[0].lastId;
				if(chatData.data.length>0){
					var res = json2html.transform(chatData.data, conversationTransform);
					$("#conversationArea").append(res);
					alignMessages();
					scrollDown();
				}
			},
			//"async": false
		});
	}
}

/**
 * Clears the content of the conversation area.
 */
function clearConversationArea(){
	$("#conversationArea").html("");
}


/**
 * Toggles the contact list. Resizes the chat area after the toggle animation is over.
 */
function toggleContactList(){
	var delay = 500;
	$("#contactList").toggle(delay);
	setTimeout(resizeChatArea, delay);
}


/**
 * TODO: Clean this code
 * Adds a handler to the contact list. This handler loads a new conversation, when a user is clicked. Toggles the contact list after a user is selected on small devices.
 */
function addContactListHandler(){
	$(".contactListEntry").on("click", function(){
		if(this.name!==localStorage.getItem("chatUsername")){
			lastId = -1;
			clearConversationArea();
			var username = this.name;
			loadConversations(username);
			if(findBootstrapEnvironment()<=2){
				toggleContactList();
			}
		}
	});
	$("#contactListHeader").on("click", function(){
		toggleContactList();
	});
}



/**
 * When the window gets resized, call the resizeChatArea function.
 */
$(window).on("resize", resizeChatArea);

/**
 * Call these function when document is ready.
 */
$(document).ready(function(){
	changeNavbarActive("nav-chat");
	getContactList();
	resizeChatArea();
	loadConversations(localStorage.getItem("chatUsername"));
	setInterval(function(){loadConversations(localStorage.getItem("chatUsername"));}, refreshInterval);
	$("textarea").on("input", function(){resizeChatArea();});
});