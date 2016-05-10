requirejs.config({
 	baseUrl: "../",
 	paths: {
 		tests: "tests",
 		js: "javascript",
		lib: "lib",
		jquery: "lib/jquery"
 	}
});


var toTest = new function(){
	this.test_list = [];
	this.get_list = function(){
		var to_return = ["tests/qunit/qunit"];
		return to_return.concat(this.test_list);
	};
	this.add_test = function(test_file){
		this.test_list.push("tests/" + test_file);
	};
};

toTest.add_test("loginTest");

console.log(toTest.get_list());


require(toTest.get_list(), function(qunit){

	qunit.load();
	qunit.start();

});
