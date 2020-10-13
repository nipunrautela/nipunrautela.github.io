$(function () {
    var roles = ["Weeb", "Gamer", "Student", "Coder", "VITian"];
    var count = 0;
    var $typeSpan = $("#intro .content h2 span").typist({
      text: roles[count]
    });
    setInterval(() => {
        $typeSpan
          .typistRemove(roles[count++ % roles.length].length)
          .typistPause(100)
          .typistAdd(roles[count % roles.length])
          .typistPause(800);
      }, 4000);
    $(".navbar").hide();
    $(window).scroll(function () {
        if ($(window).scrollTop() > 500) {
            $(".navbar").slideDown(200)
        } else {
            $(".navbar").slideUp(100);
        }
        //for about me
        if ($(window).scrollTop() > 120) {
            $("#about h2").fadeIn(600);
            $("#about p").slideDown(500)
        } else {
            $("#about h2").fadeOut(100);
            $("#about p").slideUp(300)
        }
    });
});