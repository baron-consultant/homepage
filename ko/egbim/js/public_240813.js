document.addEventListener("DOMContentLoaded", (event) => {
    
    // ---------------------------------------------
    // js__snap 스크롤 스냅하기
    // 사용 클래스 : js__snap
    // ---------------------------------------------
    // document.querySelectorAll('.js__snap').forEach(element => {
    //     gsap.to(element, {
    //         scrollTrigger: {
    //         trigger: element,
    //         start: 'top 40%',
    //         // markers: true,
    //         end: 'bottom 90%',
    //         onEnter: () => {
    //           gsap.to(window, { scrollTo: { y: element, offsetY: 0 }, duration: 0.2 });
    //         },
    //         onEnterBack: element.classList.contains('process') ? () => {
    //           gsap.to(window, { scrollTo: { y: element, offsetY: 0 }, duration: 0.2 });
    //         } : null
    //         }
    //     });
    // });


    // $(document).ready(function() {
    //     $('.js__top').on('click', function() {
    //         $('html, body').animate({ scrollTop: 0 }, 'slow');
    //     });
    // });


    // ---------------------------------------------
    // js__fixLeft 오른쪽에 따라 왼쪽 내용 변하기
    // 사용 클래스 : js__fixLeft_tit, js__fixLeft_bg, js__fixLeft_sec
    // ---------------------------------------------
    gsap.registerPlugin(ScrollTrigger);

    const tits = document.querySelectorAll(".js__fixLeft_tit");
    const bgs = document.querySelectorAll(".js__fixLeft_bg");
    const sections = document.querySelectorAll(".js__fixLeft_sec");


    function bgOnEnter(element) {
        gsap.to(element, {
            transform: "scale(1)",
            duration: 0.5
        });
    }

    function bgOnLeave(element) {
        gsap.to(element, {
            transform: "scale(1)",
            duration: 0.5
        });
    }
    
    function titOnEnter(element) {
        gsap.to(element, {
            opacity: 1,
            transform: "scale(1) translate(0%, 0%)",
            duration: 0.5
        });
    }
    
    function titOnLeave(element) {
        gsap.to(element, {
            opacity: 0.5,
            transform: "scale(0.7) translate(0%, 0%)",
            duration: 0.5
        });
    }

    function updateElements(index) {
        bgs.forEach((bg, i) => {
            if (i === index) {
                bg.classList.add("on");
                bgOnEnter(bg);
            } else {
                bg.classList.remove("on");
                bgOnLeave(bg);
            }
            console.log('index:',index);
            console.log('i:',i);
        });
        
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
        trigger: sections[0],
        start: "center 60%",
        end: "top 50%",
        // markers: true,
        onEnter: () => updateElements(0),
        onLeaveBack: () => updateElements(0)
    });
    
    ScrollTrigger.create({
        trigger: sections[1],
        start: "center 60%",
        end: "top 50%",
        // markers: true,
        onEnter: () => updateElements(1),
        onLeaveBack: () => updateElements(1)
    });

    ScrollTrigger.create({
        trigger: sections[2],
        start: "center 60%",
        end: "top 50%",
        // markers: true,
        onEnter: () => updateElements(2),
        onLeaveBack: () => updateElements(2)
    });
});

$(document).ready(function() {
    var slides = $('.public_slide');
    var currentIndex = 0;
    var isAnimating = false;

    function goToSlide(index) {
        if (index >= 0 && index < slides.length && !isAnimating) {
            isAnimating = true;
            slides.removeClass('slide_on').eq(index).addClass('slide_on');
            $('html, body').animate({
                scrollTop: slides.eq(index).offset().top
            }, 100, function() {
                currentIndex = index;
                isAnimating = false;
            });
        }
    }
    $('.public_slide').on('wheel', function(event) {
        if (isAnimating) return;
        if (event.originalEvent.deltaY < 0) {
            goToSlide(currentIndex - 1);
        } else {
            goToSlide(currentIndex + 1);
        }
    });
    $('.public_slide').on('wheel', function(event) {
        if (event.originalEvent.deltaY < 0) {
            if (currentIndex === 0) {
                document.body.style.overflow = "auto";
            } else if(currentIndex === 1){
                document.body.style.overflow = "hidden";
                document.body.style.paddingRight = "14px";
            }else if(currentIndex === 2){
                document.body.style.overflow = "hidden";
                document.body.style.paddingRight = "14px";
            }
        } else {
            if (currentIndex === 0) {
                document.body.style.overflow = "hidden";
                document.body.style.paddingRight = "14px";
            } else if(currentIndex === 1){
                document.body.style.overflow = "hidde";
                document.body.style.paddingRight = "14px";
            }else if(currentIndex === 2){
                document.body.style.overflow = "auto";
            }
        }
    });

    $('.slide_tab_li').on('click', function() {
        var tabIndex = $(this).index();
        if (tabIndex === 0) {
            goToSlide(0);
        } else if (tabIndex === 1) {
            goToSlide(1);
        } else if (tabIndex === 2) {
            goToSlide(2);
        }
    });   
    $('.slide_img').on('click', function() {
        var tabIndex = $(this).index();
        if (tabIndex === 0) {
            goToSlide(0);
        } else if (tabIndex === 1) {
            goToSlide(1);
        } else if (tabIndex === 2) {
            goToSlide(2);
        }
    });   

});