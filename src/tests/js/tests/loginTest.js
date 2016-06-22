require(["tests/qunit/qunit", "js/remotecall"], function(qunit, rc){
	console.log(rc);
	qunit.test("simple remotecall", function(assert){
    var x = 1;
		var y = 2;
    var expected = 3;
		rc.call_server_side_function("TrainingUtil", "getTraining", {}, function(data){console.log(data);});
    assert.equal(3, expected, "Addition works correctly.")
	});



});
