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
        if ($(window).scrollTop() > 500 && $(window).scrollTop() < 520) {
            $(".navbar")
            .css('opacity', 0)
            .slideDown(200)
            .animate(
              { opacity: 1 },
              { queue: false, duration: 100}
            );
        } else if($(window).scrollTop() < 500) {
            $(".navbar").slideUp(300);
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
    $(".go-down a").click(function (e) {
      e.preventDefault();
      var top = $($(this).attr("href")) .position().top;
      $("html, body").animate(
        {
          scrollTop: top
        },
        1000
      );
    });
});