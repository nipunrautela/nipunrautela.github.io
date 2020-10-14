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
      }, 4000);
    $(".navbar").hide();
    $(window).scroll(function () {
        if ($(window).scrollTop() > 200) {
            $(".navbar").slideDown(300)
        }
        else {
            $(".navbar").slideUp(300);
        }

        if ($(window).scrollTop() < 400) {
            $(".go-about").removeAttr('style');
            $(".go-top").css({ 
                "color": "#0cf",
                "border-bottom": "1px solid #0cf"
            })
            $(".nav-item.nav-link").css({
                "font-weight": "500",
                "transition": "all 0.2s linear",
                "transform": "scale(1)"
            })
        }
        else if ($(window).scrollTop() < 1700) {
            $(".go-top").removeAttr('style');
            $(".go-experience").removeAttr('style');
            $(".go-about").css({ 
                "color": "#0cf",
                "border-bottom": "1px solid #0cf",
            })
            $(".nav-item.nav-link").css({
                "font-weight": "500",
                "transition": "all 0.2s linear",
                "transform": "scale(1)"
            })
        }
        else if ($(window).scrollTop() < 2500) {
            $(".go-about").removeAttr('style');
            $(".go-contact").removeAttr('style');
            $(".go-experience").css({ 
                "color": "#0cf",
                "border-bottom": "1px solid #0cf",
            })
            $(".nav-item.nav-link").css({
                "font-weight": "500",
                "transition": "all 0.2s linear",
                "transform": "scale(1)"
            })
        }
        else if ($(window).scrollTop() < 3500) {
            $(".go-experience").removeAttr('style');
            $(".go-contact").css({ 
                "color": "#0cf",
                "border-bottom": "1px solid #0cf",
            })
            $(".nav-item.nav-link").css({
                "font-weight": "500",
                "transition": "all 0.2s linear",
                "transform": "scale(1)"
            })
        }
    });
    $(".go-down a").click(function (e) {
        e.preventDefault();
        var top = $($(this).attr("href")).position().top - 60;
        $("html, body").animate(
        {
            scrollTop: top
        },
        1000
        );
    });
    $(".go-top").click(function (e) {
        e.preventDefault();
        var top = $("#intro").position().top;
        $("html, body").animate(
        {
            scrollTop: top
        },
        1000
        );
    });
    $(".go-about").click(function (e) {
        e.preventDefault();
        var top = $("#about").position().top;
        $("html, body").animate(
        {
            scrollTop: top
        },
        1000
        );
    });
    $(".go-experience").click(function (e) {
        e.preventDefault();
        var top = $("#experience").position().top;
        $("html, body").animate(
        {
            scrollTop: top
        },
        1000
        );
    });
    $(".go-contact").click(function (e) {
        e.preventDefault();
        var top = $("#contact").position().top;
        $("html, body").animate(
        {
            scrollTop: top
        },
        1000
        );
    });
});