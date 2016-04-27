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
				url: "/test_dir/Route.php",
				data: data,
				//dataType: "JSON",
				success: function(data){
					callback(data);
				}
			});
		}
	};
});
