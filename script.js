$(function () {
    var roles = ["Weeb", "Gamer", "Student", "Coder", "VITian"];
    var count = 0;
    var $typeSpan = $("#intro .content h2 span").typist({
      text: roles[count]
    });
    setInterval(() => {
        $typeSpan
          .typistRemove(roles[count++ % roles.length].length)
          .typistPause(1000)
          .typistAdd(roles[count % roles.length]);
      }, 4000); 
});