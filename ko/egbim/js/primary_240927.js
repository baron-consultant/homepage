document.addEventListener("DOMContentLoaded", (event) => {

    $(document).ready(function() {
        $('.js__top').on('click', function() {
            $('html, body').animate({ scrollTop: 0 }, 'slow');
        });
    });

    
    // ---------------------------------------------
    // js__fixLeft 오른쪽에 따라 왼쪽 내용 변하기
    // 사용 클래스 : js__fixLeft_tit, js__fixLeft_bg, js__fixLeft_sec
    // ---------------------------------------------
    gsap.registerPlugin(ScrollTrigger);

    const tits = document.querySelectorAll(".js__fixLeft_tit");
    const dtail = document.querySelectorAll(".js__dtail");    
    
    function titOnEnter(element) {
        gsap.to(element, {
            duration: 0.5
        });
    }
    
    function titOnLeave(element) {
        gsap.to(element, {
            duration: 0.5
        });
    }

    function updateElements(index) {
        tits.forEach((tit, i) => {
            if (i === index) {
                tit.classList.add("on");
                titOnEnter(tit);
            } else {
                tit.classList.remove("on");
                titOnLeave(tit);
            }
        });
    }
    
    ScrollTrigger.create({
        trigger: dtail[0],
        start: "top 30%",
        // markers: true,
        onEnter: () => updateElements(0),
        onLeaveBack: () => updateElements(0)
    });
    
    ScrollTrigger.create({
        trigger: dtail[1],
        start: "center 70%",
        // markers: true,
        onEnter: () => updateElements(1),
        onLeaveBack: () => updateElements(1)
    });

    ScrollTrigger.create({
        trigger: dtail[2],
        start: "bottom bottom",
        // markers: true,
        onEnter: () => updateElements(2),
        onLeaveBack: () => updateElements(2)
    });

    ScrollTrigger.create({
        trigger: dtail[3],
        start: "bottom 80%",
        // markers: true,
        onEnter: () => updateElements(3),
        onLeaveBack: () => updateElements(3)
    });
    
    ScrollTrigger.create({
        trigger: dtail[4],
        start: "top 30%",
        // markers: true,
        onEnter: () => updateElements(4),
        onLeaveBack: () => updateElements(4)
    });

    ScrollTrigger.create({
        trigger: dtail[5],
        start: "top 30%",
        // markers: true,
        onEnter: () => updateElements(5),
        onLeaveBack: () => updateElements(5)
    });

    ScrollTrigger.create({
        trigger: dtail[6],
        start: "bottom 80%",
        // markers: true,
        onEnter: () => updateElements(6),
        onLeaveBack: () => updateElements(6)
    });

    ScrollTrigger.create({
        trigger: dtail[7],
        start: "center 70%",
        // markers: true,
        onEnter: () => updateElements(7),
        onLeaveBack: () => updateElements(7)
    });
    
    ScrollTrigger.create({
        trigger: dtail[8],
        start: "top 30%",
        // markers: true,
        onEnter: () => updateElements(8),
        onLeaveBack: () => updateElements(8)
    });

    ScrollTrigger.create({
        trigger: dtail[9],
        start: "top 30%",
        // markers: true,
        onEnter: () => updateElements(9),
        onLeaveBack: () => updateElements(9)
    });
});


$(document).ready(function() {
    var slides_img = $('.pri_pub_slide_img');
    var slides_li = $('.img_li');
    var currentIndex = 0;
    var isAnimating = false;

    function goToSlide(index) {
        if (index >= 0 && index < slides_img.length && !isAnimating) {
            isAnimating = true;
            slides_img.removeClass('img_li_on').eq(index).addClass('img_li_on');
            currentIndex = index;
            isAnimating = false;
        } 
    }
  

    $('.img_li').on('click', function() {
        var tabIndex = $(this).index();
        if (tabIndex === 0) {
            goToSlide(0);
        } else if (tabIndex === 1) {
            goToSlide(1);
        } else if (tabIndex === 2) {
            goToSlide(2);
        }
        $(this).addClass('img_li_on');
        $('.pri_pub_slide li').not(this).removeClass('img_li_on');
    });  

});