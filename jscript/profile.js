define(["js/render", "js/remotecall", "js/util", "lib/bootstrap"], function(render, rc, util){

	/**
	 * This function is called after the data is rendered. Call here the event handlers that should be appended to the new elements.
	 */
	function postRender(data){
			panels = data.panels;

		/**
		 * Allways call this function after generating new content.
		 */
		require(["js/content_switcher"], function(cs){
			var content = cs.getContent();
			
			//The first entry has to be the filename of the module without the extention
			content.addEntry("profile", data.panels, $("#screen").html(), false);
		});
	}

	/**
	 * This function takes the data returned from the server, and renders them to display to the client.
	 * A postrender function is called to add eventHandlers to the newly rendered elements.
	 */
	function renderTrainings(data){
		console.log(data);
		render.render("profile.must", data.result, "#screen", function(){postRender(data);});

	}

	var pub = {
		/**
		 * Request the data for trainings from the server and hand them to a render function.
		 */
		loadTrainings: function(){
			rc.call_server_side_function("TrainingUtil", "getTraining", {}, renderTrainings);
		},
		loadContent: function(){
			this.loadTrainings();
		}
	};

	return pub;
});



var panels = {};
