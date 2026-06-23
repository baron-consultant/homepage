document.addEventListener("DOMContentLoaded", (event) => {
    // ---------------------------------------------
    // js__snap 스크롤 스냅하기
    // 사용 클래스 : js__snap
    // ---------------------------------------------
    // document.querySelectorAll('.js__snap').forEach(element => {
    //     gsap.to(element, {
    //         scrollTrigger: {
    //         trigger: element,
    //         start: 'top 30%',
    //         // markers: true,
    //         end: 'bottom 80%',
    //         onEnter: () => {
    //             gsap.to(window, { scrollTo: { y: element, offsetY: 0 }, duration: 0.2});
    //         },
    //         onEnter: () => {
    //             gsap.to(window, { scrollTo: { y: element, offsetY: 0 }, duration: 0.2});
    //         },
    //         }
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
        end: "center top",
        // markers: true,
        onEnter: () => updateElements(0),
        onLeaveBack: () => updateElements(0)
    });
    
    ScrollTrigger.create({
        trigger: sections[1],
        start: "top center",
        end: "top center",
        // markers: true,
        onEnter: () => updateElements(1),
        onLeaveBack: () => updateElements(1)
    });



    // ---------------------------------------------
    // js__height 스크롤 하면 높이 높아지기
    // 사용 클래스 : js__height_item, js__text, js__height_trigger
    // ---------------------------------------------

    gsap.set(".js__height_item", {height: "20vh"});
    gsap.set(".js__height_text", {opacity: 0});

    const bottomToCenter = gsap.timeline();

    // ScrollTrigger 설정
    ScrollTrigger.create({
        animation: bottomToCenter,
        trigger: ".js__height_trigger",
        start: "top top",
        end: "+=800",
        scrub: true,
        pin: true,
        // markers: true,
        anticipatePin: 1,
        onUpdate: (self) => {
            const item = document.querySelector(".js__height_item");
            const text = document.querySelector(".js__height_text");
            if (self.progress > 0.4) {
                item.style.transition = '0.5s'
                item.style.height = '100vh';
                text.style.transition = '0.5s'
                text.style.opacity = '1';
            } else {
                item.style.height = '20vh';
                item.style.transition = '0.5s'
                text.style.transition = '0.5s'
                text.style.opacity = '0';
            }
        }
    });

});
