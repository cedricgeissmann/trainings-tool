
define(["jquery", "lib/mustache"], function($, mus){


	function includeHTML(html, elem){
		$(elem).html(html);
	}

	var pub = {
		render: function(template_name, data, elem, addHandlers){
			var template_to_load = "text!templates/" + template_name;
			require([template_to_load], function(templ){
				var res = mus.render(templ, data);
				includeHTML(res, elem);
				addHandlers();
			});
		}
	};
	
	return pub;

});
