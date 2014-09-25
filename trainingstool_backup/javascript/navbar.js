/**
 * Sets the last clicked nav-button to active.
 */
$("#navbar-head ul li a").click(function (e) {
    var $this = $(this).parent();
    if (!$this.hasClass('active')) {
        $('.active').removeClass("active");
        $this.addClass('active');
    }
});

/**
 * Sets the active class on the new loaded page. Call this in the onload function of a page.
 */
function changeNavbarActive(newActive){
	$(".active").removeClass("active");
	$("#"+newActive).addClass("active");
}

/**
 * Gets the number of unread messages, for the currently logged in user.
 */
function getNewMessageCount(){
	$.ajax({
		"type": "POST",
		"url": "server/ChatUtil.php",
		"data": {
			"function": "getNewMessageCount"
		},
		"success": function(data){
			//console.log(data);
			var countData = jQuery.parseJSON(data);
			$("#newMessageCounter").html(countData[0].count);
		}
	});
}

$(document).ready(function(){
	getNewMessageCount();
	addHandlerToElements("#logout", "click", function(){clearCache();});
	var timer = setInterval(function(){getNewMessageCount();}, 60000);
});