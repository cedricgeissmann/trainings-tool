define(["jquery"], function($){
	return {
		call_server_side_function: function(class_name, function_name, args, callback){
			var data = {
				class_name: class_name,
				function_name: function_name,
				args: JSON.stringify(args)
			};
			console.log(data);
			$.ajax({
				type: "POST",
				//TODO: change the url_path
				url: "/server/Route.php",
				data: data,
				dataType: "JSON",
				success: function(data){
					console.log(data);		//TODO: remove this line
					callback(data);
				}
			});
		}
	};
});
