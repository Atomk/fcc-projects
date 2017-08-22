$(document).ready(function() {
  /* When I click on a menu element, the nav closes
     Thanks --> http://stackoverflow.com/questions/21203111/bootstrap-3-collapsed-menu-doesnt-close-on-click */
  $(".li-collapse").click(function() {
    $("#atomk-navbar-collapse").collapse("hide");
  })
});