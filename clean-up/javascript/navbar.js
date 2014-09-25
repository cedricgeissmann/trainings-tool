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