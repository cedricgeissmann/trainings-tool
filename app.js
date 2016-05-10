requirejs.config({
 	baseUrl: "./",
 	paths: {
 		js: "javascript",
		lib: "lib",
		jquery: "lib/jquery",
		templates: "templates",
		text: "lib/text"
 	},
	//TODO: remove urlArgs in productive environment
 urlArgs: "bust=" + (new Date()).getTime()
});



require(["js/login_test"], function(login){
	login.isLoggedIn();
});



