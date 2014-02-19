/**
 * When try to submit, catch the request and send a login via ajax.
 */
$(document).submit(function(e){
	login();
	e.preventDefault();
});

/**
 * Send a post query to the server to log the user in.
 * Parameters: username=...&password=...
 * Response: Get a json object as response {exists: boolean, active: boolean}
 */
function login(){
	$.ajax({
		type: "POST",
		url: "server/login.php",
		data: $("#login").serialize(),
		async: false,
		success: function(data){
			var response = jQuery.parseJSON(data);
			console.log(response);
			if(response.exists && response.active){
				console.log("You can loggin now.");		//TODO forward to main.php
				window.location = "main.php";
			}else if(response.exists){
				console.log("You are not yet activeted.");	//TODO show error
			}else{
				console.log("Wrong username or password.");	//TODO show error
			}
		}
	});
}