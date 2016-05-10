define(["jquery", "js/remotecall", "js/util"], function($, rc, util){


	function dummy(data){
		console.log(data);
	}

	


	/**
	 * render the login screen
	 */
	function renderLoginScreen(){
		require(["jquery", "js/render"], function($, render){

			function addHandlers(){
				require(["jquery", "js/login_test"], function($, login){
					$("#loginButton").on("click", function(){
						login.login();
					});
				});
			}


			var data = {};
			var elem = "#screen";
			render.render("login.must", data, elem, addHandlers);
		});	
	}


	function loadNavbar(){
		require(["js/navbar"], function(nav){
			nav.renderNav();
		});
	}


	function loadTrainings(){
		require(["js/trainings"], function(training){
			training.loadTrainings();
		});
	}


	function loadMainPage(data){
		if(data.error !== undefined){
			renderLoginScreen();
			return false;
		}else{
			loadNavbar();
			loadTrainings();
			return true;
		}
	}

	return {
		login: function(){
			var data = util.formToJSON("#login");
			rc.call_server_side_function("Auth", "login", data, loadMainPage);
		},

		isLoggedIn: function(){
			rc.call_server_side_function("Auth", "needs_login", {}, loadMainPage);
		},

		getTraining: function(){
			rc.call_server_side_function("TrainingUtil", "getTraining", {}, dummy);
		},
		logout: function(){
			rc.call_server_side_function("Auth", "logout", {}, dummy);
		}
	};

});


