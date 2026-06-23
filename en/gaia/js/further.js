document.addEventListener("DOMContentLoaded", (event) => {

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
            transform: "scale(1.05)",
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
            transform: "scale(0.7) translate(-30%, 0%)",
            duration: 0.5
        });
    }

    function updateElements(index) {
        bgs.forEach((bg, i) => {
          // console.log(bg, i);
            if (i === index) {
                bg.classList.add("on");
                bgOnEnter(bg);
            } else {
                bg.classList.remove("on");
                bgOnLeave(bg);
            }
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
        start: "center top",
        // end: "center top",
        // markers: true,
        onEnter: () => updateElements(0),
        onLeaveBack: () => updateElements(0)
    });
    
    ScrollTrigger.create({
        trigger: sections[1],
        start: "top top",
        // end: "center top",
        //markers: true,
        onEnter: () => updateElements(1),
        onLeaveBack: () => updateElements(1)
    });


    ScrollTrigger.create({
        trigger: sections[2],
        start: "top center",
        // end: "top center",
        // markers: true,
        onEnter: () => updateElements(2),
        onLeaveBack: () => updateElements(2)
    });

    // ++++++++++++++++++ S: TODO 진슬 추가_ 클릭시에도 메뉴 불 나오게
    $('.js__fixLeft_tit').each(function(index, val){
      val.addEventListener("click", () => {
        gsap.to(window, {
          duration: 0, 
          scrollTo: {y:"#content" + (index + 1), offsetY:390 }
        }).play(),
        gsap.to(val, {
          onComplete: function(){
            // $('.js__fixLeft_tit > li > a').removeClass('on'),
            // $(val).addClass('on')
            // ~ S: 기존 함수 활용
            if(index === 0) {
              updateElements(0)
            } else if(index === 1) {
              updateElements(1)
            } else if(index === 2) {
              updateElements(2)
            }
            // ~ E: 기존 함수 활용 
          }
        }).play();
      });
    })
     // ++++++++++++++++++ E: TODO 진슬 추가_ 클릭시에도 메뉴 불 나오게

    // ---------------------------------------------
    // js__height 스크롤 하면 높이 높아지기
    // 사용 클래스 : js__height_item, js__text, js__height_trigger
    // ---------------------------------------------

    // gsap.set(".js__height_item", {height: "20vh"});
    // gsap.set(".js__height_text1", {opacity: 1});
    // gsap.set(".js__height_text2", {opacity: 0});

    // const bottomToCenter = gsap.timeline();

    // // ScrollTrigger 설정
    // ScrollTrigger.create({
    //     animation: bottomToCenter,
    //     trigger: ".js__height_trigger",
    //     start: "top top",
    //     end: "+=800",
    //     pin: true,
    //     duration: 0.5,
    //     // markers: true,
    //     // scrub: true,
    //     // anticipatePin: 1,
    //     onUpdate: (self) => {
    //         const item = document.querySelector(".js__height_item");
    //         const text1 = document.querySelector(".js__height_text1");
    //         const text2 = document.querySelector(".js__height_text2");
    //         if (self.progress > 0.4) {
    //             item.style.transition = '0.5s'
    //             item.style.height = '100vh';
    //             text1.style.opacity = '0';
    //             text2.style.transition = '0.5s'
    //             text2.style.opacity = '1';
    //         } else {
    //             item.style.height = '20vh';
    //             item.style.transition = '0.5s'
    //             text1.style.opacity = '1';
    //             text2.style.transition = '0.5s'
    //             text2.style.opacity = '0';
    //         }
    //     }
    // });

});
