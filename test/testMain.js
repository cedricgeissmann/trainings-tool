QUnit.module("sidebar test", {
   beforeEach: function(assert){
       var done = assert.async();
       initMain();
       setTimeout(function(){
           assert.ok(true, "Setup complete");
           done();
       });
   }
});


QUnit.test("selector builder", function(assert){
    var teamID = 1;
    var expected = "[data-teamid='1']";
    assert.equal(sidebarHandler.buildDataSelector(teamID), expected, "Data selector correctly builded.")
});

/**
 * Test the selection filter by simulating a click on the teamid=1 selector.
 */
QUnit.test("selectionFilter specific team", function(assert){
    var teamID = 2;
    var elements = sidebarHandler.selectShowHideElements(teamID);
    elements.toShow.each(function(){
       assert.equal($(this).data("teamid"), teamID, "teamID matches"); 
    });
    elements.toHide.each(function(){
       assert.notEqual($(this).data("teamid"), teamID, "teamID does not match"); 
    });
    
});


/**
 * Test if all elements are eighter visible or hidden.
 */
QUnit.test("no elements are lost", function(assert){
    var teamID = 2;
    var totalSize = $(sidebarHandler.selector).length;
    var elements = sidebarHandler.selectShowHideElements(teamID);
    assert.equal((elements.toShow.length + elements.toHide.length), totalSize, "lists are not empty");
});

/**
 * Test the selection filter to display all, by simulate a click on the teamid=all selector.
 */
QUnit.test("selectionFilter visible all", function(assert){
    var teamID = "all";
    var allElements =$(sidebarHandler.selector);
    var totalSize = allElements.length;
    var elements = sidebarHandler.selectShowHideElements(teamID);
    assert.equal(elements.toShow.length, totalSize, "Lists have same length");
    assert.equal(elements.toHide.length, 0, "No elements will be hidden");
    
});

/**
 * Move a player from not subscribed to subscribed.
 */
//QUnit.test("move player", function(assert){
//    var elem = $.parseHTML('<a href="#!" class="subscribe" data-id="503"><h2>Anmelden:</h2></a>');
//});


/**
 * This object stores the data object that ajax will send to the server. Use this to check if the data is correct.
 */
var ajaxParams;

QUnit.module("subscribe user", {
    beforeEach: function(){
        this._real_ajax = $.ajax;
        $.ajax = function(param){
            ajaxParams = param;
        }
    },
    afterEach: function(){
        $.ajax = this._real_ajax;
    }
});

QUnit.test("subscribe user", function(assert){
    var trainingsID = 10;
    var expectedData = {
        "trainingsID": trainingsID,
        "subscribeType": 1,
        "function": "subscribeForTraining"
    };
    var expectedURL = "server/TrainingUtil.php";
    var expectedType = "POST";
    subscription.subscribe(trainingsID);
    assert.deepEqual(ajaxParams.data, expectedData, "Data that will be sended to the server is correct.");
    assert.equal(ajaxParams.type, expectedType, "Ajax type is POST");
    assert.equal(ajaxParams.url, expectedURL, "Ajax request is sent to the right destination.");
});

QUnit.test("unsubscribe user", function(assert){
    var trainingsID = 10;
    var expectedData = {
        "trainingsID": trainingsID,
        "subscribeType": 0,
        "function": "subscribeForTraining"
    };
    var expectedURL = "server/TrainingUtil.php";
    var expectedType = "POST";
    subscription.unsubscribe(trainingsID);
    assert.deepEqual(ajaxParams.data, expectedData, "Data that will be sended to the server is correct.");
    assert.equal(ajaxParams.type, expectedType, "Ajax type is POST");
    assert.equal(ajaxParams.url, expectedURL, "Ajax request is sent to the right destination.");
});