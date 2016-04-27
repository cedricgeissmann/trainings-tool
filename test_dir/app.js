requirejs.config({
 	baseUrl: "./",
 	paths: {
 		js: "javascript",
		lib: "lib",
		jquery: "lib/jquery"
 	}
});



require(["js/login_test"], function(login){
	login.login();
});
