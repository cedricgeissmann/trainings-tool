define(["js/remotecall"], function(rc){


	function dummy(data){
		console.log(data);
	}


	return {
		login: function(){
			rc.call_server_side_function("Auth", "login", {username: 'test', password: 1234}, dummy);
		},

		getTraining: function(){
			rc.call_server_side_function("TrainingUtil", "getTraining", {}, dummy);
		},
		logout: function(){
			rc.call_server_side_function("Auth", "logout", {}, dummy);
		}
	};

});


