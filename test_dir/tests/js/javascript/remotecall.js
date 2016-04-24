define(["jquery"], function($){
	return {
		call_server_side_function: function(class_name, function_name, args, callback){
			var data = {
				class_name: class_name,
				function_name: function_name,
				args: args
			};
			$.ajax({
				type: "POST",
				url: "/test_dir/Route.php",
				data: data,
				dataType: "json",
				success: function(data){
					callback(data);
				}
			});
		}
	};
});
