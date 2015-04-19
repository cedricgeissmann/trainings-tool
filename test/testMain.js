QUnit.module("Main tests", {
   beforeEach: function(){
       QUnit.stop();
       initMain();
       QUnit.start();
   }
});

/**
 * Test the selection filter by simulating a click on the teamid=1 selector.
 */
QUnit.test("selectionFilter specific team", function(assert){
    var panelClassIdentifier = ".panel";
    var elem = $.parseHTML('<a href="#!" data-teamid="1">TV Muttenz Herren</a>');
    sidebarHandler($(elem));
    var visibleList = $(panelClassIdentifier+":visible");
    var hiddenList = $(panelClassIdentifier+":hidden");
    visibleList.each(function(){
       assert.equal($(this).data("teamid"), 1, "teamID matches"); 
    });
    hiddenList.each(function(){
        assert.notEqual($(this).data("teamid"), 1, "teamID does not match.");
    });
});

/**
 * Test the selection filter to display all, by simulate a click on the teamid=all selector.
 */
QUnit.test("selectionFilter visible all", function(assert){
    var panelClassIdentifier = ".panel";
    var elem = $.parseHTML('<a href="#" name="all" data-teamid="all">Alle</a>');
    sidebarHandler($(elem));
    var completeList = $(panelClassIdentifier);
    var visibleList = $(panelClassIdentifier+":visible");
    var hiddenList = $(panelClassIdentifier+":hidden");
    assert.equal(hiddenList.length, 0, "There are no hidden "+panelClassIdentifier);
    assert.equal(completeList.length, visibleList.length, "Amount of visible elements, is equal to the amount of total elements.");
    assert.notEqual(completeList, 0, "There are elments in the list.");
});

/**
 * Move a player from not subscribed to subscribed.
 */
QUnit.test("move player", function(assert){
    var elem = $.parseHTML('<a href="#!" class="subscribe" data-id="503"><h2>Anmelden:</h2></a>');
    
});