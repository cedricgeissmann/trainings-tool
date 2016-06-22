require(["jquery"], function($) {
  function init(){
    $(".offcanvas-toggler-right").on("click", displayCanvasRight);
    $(".close-right").on("click", closeCanvasRight);
  }

  function displayCanvasRight() {
    $("#main").css({
      "margin-left": "200px"
    });
    $(".offcanvas-menu").css({
      "width": "200px"
    });
    $(".offcanvas-menu-left").css({
      "left": "0px"
    });
  }

  function closeCanvasRight() {
    $("#main").css({
      "margin-left": "0px"
    });
    $(".offcanvas-menu").css({
      "width": "0px"
    });
    $(".offcanvas-menu-left").css({
      "left": "-200px"
    });
  }


  var pub = {
    init: function(){
      init();
    }
  };

  return pub;

});
