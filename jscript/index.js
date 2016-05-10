/**
 * Send a post query to the server to log the user in.
 * Parameters: username=...&password=...
 * Response: Get a json object as response {exists: boolean, active: boolean}
 */
function login(){
		var data = $("#login").serialize();			//serializes the login form, and sends the data via POST to the server.
		defaultAjax("login.php", data, after_login);

	// $.ajax({
	// 	"type": "POST",
	// 	"url": "server/login.php",
	// 	"data": $("#login").serialize(),			//serializes the login form, and sends the data via POST to the server.
	// 	"async": false,
	// 	"success": function(data){
	// 		console.log(data);
	// 		var response = jQuery.parseJSON(data);
	// 		if(response.exists==1 && response.active==1){
	// 			$("#notificationArea").html("Sie wurden erfolgreich eingeloggt.<br>Sollten Sie nicht automatisch weitergeleitet werden, klicken sie auf folgenden <a href='http://tvmuttenz.square7.ch/main.php'>link</a>.");
	// 			window.location = "main.php";
	// 			return false;
	// 		}else if(response.exists==1){
	// 			$("#notificationArea").html("Sie wurden noch nicht freigeschalten.");
	// 		}else{
	// 			$("#notificationArea").html("Der Benutzername oder das Passwort ist falsch.");
	// 		}
	// 	}
	// });
}

function after_login(response){
			if(response.exists==1 && response.active==1){
				$("#notificationArea").html("Sie wurden erfolgreich eingeloggt.<br>Sollten Sie nicht automatisch weitergeleitet werden, klicken sie auf folgenden <a href='http://tvmuttenz.square7.ch/main.php'>link</a>.");
				window.location = webroot + "main.php";
				return false;
			}else if(response.exists==1){
				$("#notificationArea").html("Sie wurden noch nicht freigeschalten.");
			}else{
				$("#notificationArea").html("Der Benutzername oder das Passwort ist falsch.");
			}
}
/**
 *	Add an event handler to each button used on this page.
 */
function addHandlers(){
	$("#loginButton").on("click", function(){login();});
}

$(document).ready(function(){
	addHandlers();
});
