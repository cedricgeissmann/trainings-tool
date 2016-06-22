define(["jquery", "js/render"], function($, render){



	function clearCache(){
		//TODO: implement
		require(["js/login"], function(login){
			login.logout();
			console.log("Cache cleared");
		});
	}

	function navLinkClicked(element) {
		var elem = element.parent();
		if (!elem.hasClass('active')) {
			$('.active').removeClass("active");
			elem.addClass('active');

		}
			var contentName = element.data("identifier");

			require(["js/content_switcher"], function(cs){
				var content = cs.getContent();
				content.switchEntry(contentName);

			});
	}


	function ready(){
		require(["js/util"], function(util){
			util.addHandlerToElements("#logout", "click", function(){clearCache();});
			util.addAdditionalHandlerToElements(".nav-link", "click", function(){navLinkClicked($(this));});

			require(["js/content_switcher"], function(cs){
				cs.initialize();
			});



		});
	}


	var pub = {
		renderNav: function(){
			render.render("navbar.must", {}, "#nav", {callback: ready});
		}
	};


	return pub;

});





/**
 * Sets the last clicked nav-button to active.
 */
// $("#navbar-head ul li a").click(function (e) {
//     var $this = $(this).parent();
//     if (!$this.hasClass('active')) {
//         $('.active').removeClass("active");
//         $this.addClass('active');
//     }
// });

// function navLinkClicked(element) {
//     var elem = element.parent();
//     if (!elem.hasClass('active')) {
//         $('.active').removeClass("active");
//         elem.addClass('active');
//     }
// }

// /**
//  * Sets the active class on the new loaded page. Call this in the onload function of a page.
//  */
// function changeNavbarActive(newActive){
// 	$(".active").removeClass("active");
// 	$("#"+newActive).addClass("active");
// }

// /**
//  * Gets the number of unread messages, for the currently logged in user.
//  */
// /*function getNewMessageCount(){
// 	$.ajax({
// 		"type": "POST",
// 		"url": "server/ChatUtil.php",
// 		"data": {
// 			"function": "getNewMessageCount"
// 		},
// 		"success": function(data){
// 			//console.log(data);
// 			var countData = jQuery.parseJSON(data);
// 			$("#newMessageCounter").html(countData[0].count);
// 		}
// 	});
// }*/

// $(document).ready(function(){
// 	//getNewMessageCount();
// 	addHandlerToElements("#logout", "click", function(){clearCache();});
// 	addAdditionalHandlerToElements(".nav-link", "click", function(){navLinkClicked($(this));})
// 	//var timer = setInterval(function(){getNewMessageCount();}, 60000);
	
// });
