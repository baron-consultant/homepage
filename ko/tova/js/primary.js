document.addEventListener("DOMContentLoaded", (event) => {
   
    // ---------------------------------------------
    // js__fixLeft 오른쪽에 따라 왼쪽 내용 변하기
    // 사용 클래스 : js__fixLeft_tit, js__fixLeft_bg, js__fixLeft_sec
    // ---------------------------------------------
    gsap.registerPlugin(ScrollTrigger);

    const key1 = document.querySelector('.key.net');
    const key2 = document.querySelector('.key.pub');
    const key3 = document.querySelector('.key.zone');

    if (!key1 || !key3) {
        return;
    }

    const key1Tits = key1.querySelectorAll(".js__fixLeft_tit > li");
    const key1Sections = key1.querySelectorAll(".js__fixLeft_secs > div");
    const key2Tits = key2 ? key2.querySelectorAll(".js__fixLeft_tit > li") : [];
    const key2Sections = key2 ? key2.querySelectorAll(".js__fixLeft_secs > div") : [];
    const key3Tits = key3.querySelectorAll(".js__fixLeft_tit > li");
    const key3Sections = key3.querySelectorAll(".js__fixLeft_secs > div");

    
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

    function key1UpdateTit(index) {
        key1Tits.forEach((tit, i) => {
            if (i === index) {
                tit.classList.add("on");
                titOnEnter(tit);
            } else {
                tit.classList.remove("on");
                titOnLeave(tit);
            }
        });
    }

    function key2UpdateTit(index) {
        key2Tits.forEach((tit, i) => {
            if (i === index) {
                tit.classList.add("on");
                titOnEnter(tit);
            } else {
                tit.classList.remove("on");
                titOnLeave(tit);
            }
        });
    }

    function key3UpdateTit(index) {
        key3Tits.forEach((tit, i) => {
            if (i === index) {
                tit.classList.add("on");
                titOnEnter(tit);
            } else {
                tit.classList.remove("on");
                titOnLeave(tit);
            }
        });
    }

    
    // ScrollTrigger.create({
    //   trigger: '.key.net',
    //   start: "top top",
    //   end: "bottom bottom",
    //   markers: true,
    //   onEnter: () => {
    //     $('.key.net').addClass('now');
    //   },
    //   onEnterBack: () => {
    //     $('.key.net').addClass('now');
    //   },
    //   onLeave: () => {
    //     $('.key.net').removeClass('now');
    //   },
    //   onLeaveBack: () => {
    //     $('.key.net').removeClass('now');
    //   }
    // });

    // ScrollTrigger.create({
    //   trigger: '.key.pub',
    //   start: "top 20%",
    //   end: "bottom 60%",
    //   // markers: true,
    //   onEnter: () => {
    //     $('.key.pub').addClass('now');
    //   },
    //   onEnterBack: () => {
    //     $('.key.pub').addClass('now');
    //   },
    //   onLeave: () => {
    //     $('.key.pub').removeClass('now');
    //   },
    //   onLeaveBack: () => {
    //     $('.key.pub').removeClass('now');
    //   }
    // });

    // ScrollTrigger.create({
    //   trigger: '.key.zone',
    //   start: "top top",
    //   end: "bottom 60%",
    //   // markers: true,
    //   onEnter: () => {
    //     $('.key.zone').addClass('now');
    //   },
    //   onEnterBack: () => {
    //     $('.key.zone').addClass('now');
    //   },
    //   onLeave: () => {
    //     $('.key.zone').removeClass('now');
    //   },
    //   onLeaveBack: () => {
    //     $('.key.zone').removeClass('now');
    //   }
    // });
    
    function createSectionTrigger(trigger, start, end, callback) {
        if (!trigger) {
            return;
        }

        ScrollTrigger.create({
            trigger,
            start,
            end,
            onEnter: callback,
            onLeaveBack: callback
        });
    }

    createSectionTrigger(key1Sections[0], "center center", "bottom center", () => key1UpdateTit(0));
    createSectionTrigger(key1Sections[1], "top center", "bottom center", () => key1UpdateTit(1));
    createSectionTrigger(key1Sections[2], "top center", "bottom center", () => key1UpdateTit(2));
    createSectionTrigger(key2Sections[0], "top center", "bottom center", () => key2UpdateTit(0));
    createSectionTrigger(key2Sections[1], "top center", "bottom center", () => key2UpdateTit(1));
    createSectionTrigger(key2Sections[2], "top center", "bottom center", () => key2UpdateTit(2));
    createSectionTrigger(key2Sections[3], "top center", "bottom center", () => key2UpdateTit(3));
    createSectionTrigger(key3Sections[0], "top center", "bottom center", () => key3UpdateTit(0));
    createSectionTrigger(key3Sections[1], "top center", "bottom center", () => key3UpdateTit(1));
    createSectionTrigger(key3Sections[2], "top center", "top center", () => key3UpdateTit(2));
// ++++++++++++++++++ S: TODO 진슬 추가_ 클릭시에도 메뉴 불 나오게
$('.js__fixLeft_tit > li').each(function(index, val){
  val.addEventListener("click", () => {
    gsap.to(window, {
      duration: 0, 
      scrollTo: {y:"#content" + (index + 1), offsetY:200 }
    }).play(),
    gsap.to(val, {
      onComplete: function(){
        // ~ S: 기존 함수 활용
        if(index === 0) {
          key1UpdateTit(0)
        } else if(index === 1) {
          key1UpdateTit(1)
        } else if(index === 2) {
          key1UpdateTit(2)
        } else if (index === 3) {
          key2UpdateTit(0)
        } else if (index === 4) {
          key2UpdateTit(1)
        } else if (index === 5) {
          key2UpdateTit(2)
        } else if (index === 6) {
          key2UpdateTit(3)
        } else if (index === 7) {
          key3UpdateTit(0)
        } else if (index === 8) {
          key3UpdateTit(1)
        } else if (index === 9) {
          key3UpdateTit(2)
        }
        // ~ E: 기존 함수 활용 
      }
    }).play();
  });
})
 // ++++++++++++++++++ E: TODO 진슬 추가_ 클릭시에도 메뉴 불 나오게
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