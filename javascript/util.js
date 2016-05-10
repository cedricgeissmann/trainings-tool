define(["jquery"], function($){
	
	var pub = {
		/**
		 * Adds a new handler to an elements and removes the old one, so that there are not two different handlers on one element.
		 * @param name means the jQuery selection identifier to select the element the handler will be added to.
		 * @param handlerType defines what type of handler will be added. {click, mouseover, ...}
		 * @param callbackFunction the function which is executed when the event is triggered.
		 */
		addHandlerToElements: function(name, handlerType, callbackFunction){
			$(name).off(handlerType);
			$(name).on(handlerType, callbackFunction);
		},


		/**
		 * Adds a additional new handler to an element.
		 * @param name means the jQuery selection identifier to select the element the handler will be added to.
		 * @param handlerType defines what type of handler will be added. {click, mouseover, ...}
		 * @param callbackFunction the function which is executed when the event is triggered.
		 */
		addAdditionalHandlerToElements: function(name, handlerType, callbackFunction){
			$(name).on(handlerType, callbackFunction);
		},



		formToJSON: function(formName){
			var json = {};
			var form = $(formName + " input");
			form.each(function(){
				json[$(this).attr("id")] = $(this).val();
			});
			return json;
		}


	};

	return pub;

});
