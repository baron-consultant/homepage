
  // ---------------------------------------------
  // js__fixLeft 오른쪽에 따라 왼쪽 내용 변하기
  // 사용 클래스 : js__fixLeft_tit, js__fixLeft_bg, js__fixLeft_sec
  // ---------------------------------------------
  $(function(){
    gsap.registerPlugin(ScrollTrigger);
  
    const key1 = document.querySelector('.key.location')
    const key1Tits = key1.querySelectorAll(".js__fixLeft_tit > li > a");
    const key1Sections = key1.querySelectorAll(".js__fixLeft_secs > div");   
    const key2 = document.querySelector('.key.model')
    const key2Tits = key2.querySelectorAll(".js__fixLeft_tit > li > a");
    const key2Sections = key2.querySelectorAll(".js__fixLeft_secs > div");   
    const key3 = document.querySelector('.key.modify')
    const key3Tits = key3.querySelectorAll(".js__fixLeft_tit > li > a");
    const key3Sections = key3.querySelectorAll(".js__fixLeft_secs > div");   
  
    // ? S: 자연스럽게 메뉴 타이틀 불이 켜지도록
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
    // ? E: 자연스럽게 메뉴 타이틀 불이 켜지도록
  
    // ? S: 메뉴 타이틀 불 켜기
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
    // ? E: 메뉴 타이틀 불 켜기
  
    // ? S: 스크롤 시 메뉴 불 나오게
    ScrollTrigger.create({
      trigger: key1Sections[0],
      start: "top 30%",
      // markers: true,
      onEnter: () => key1UpdateTit(0),
      onLeaveBack: () => key1UpdateTit(0)
    });
  
    ScrollTrigger.create({
      trigger: key1Sections[1],
      start: "center 70%",
      // markers: true,
      onEnter: () => key1UpdateTit(1),
      onLeaveBack: () => key1UpdateTit(1)
    });
  
    ScrollTrigger.create({
      trigger: key1Sections[2],
      start: "bottom bottom",
      // markers: true,
      onEnter: () => key1UpdateTit(2),
      onLeaveBack: () => key1UpdateTit(2)
    });
  
    ScrollTrigger.create({
      trigger: key2Sections[0],
      start: "top 30%",
      // markers: true,
      onEnter: () => key2UpdateTit(0),
      onLeaveBack: () => key2UpdateTit(0)
    });
  
    ScrollTrigger.create({
      trigger: key2Sections[1],
      start: "center 70%",
      // markers: true,
      onEnter: () => key2UpdateTit(1),
      onLeaveBack: () => key2UpdateTit(1)
    });
  
    ScrollTrigger.create({
      trigger: key2Sections[2],
      start: "bottom bottom",
      // markers: true,
      onEnter: () => key2UpdateTit(2),
      onLeaveBack: () => key2UpdateTit(2)
    });
  
    ScrollTrigger.create({
      trigger: key2Sections[3],
      start: "bottom bottom",
      // markers: true,
      onEnter: () => key2UpdateTit(3),
      onLeaveBack: () => key2UpdateTit(3)
    });
  
    ScrollTrigger.create({
      trigger: key3Sections[0],
      start: "top 30%",
      // markers: true,
      onEnter: () => key3UpdateTit(0),
      onLeaveBack: () => key3UpdateTit(0)
    });
  
    ScrollTrigger.create({
      trigger: key3Sections[1],
      start: "center 70%",
      // markers: true,
      onEnter: () => key3UpdateTit(1),
      onLeaveBack: () => key3UpdateTit(1)
    });
  
    ScrollTrigger.create({
      trigger: key3Sections[2],
      start: "bottom bottom",
      // markers: true,
      onEnter: () => key3UpdateTit(2),
      onLeaveBack: () => key3UpdateTit(2)
    });
    // ? E: 스크롤 시 메뉴 불 나오게
  
    // ++++++++++++++++++ S: TODO 진슬 추가_ 클릭시에도 메뉴 불 나오게
    document.addEventListener("scroll", () => {
      headerScroll = $('#header').css('transform');
      // console.log('scroll', headerScroll);
    });
        
    let headerScroll;
    $('.js__fixLeft_tit > li > a').each(function(index, val){
      val.addEventListener("click", () => {
        headerScroll = $('#header').css('transform');
        // console.log(headerScroll);
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
              key3UpdateTit(0)
            } else if (index === 7) {
              key3UpdateTit(1)
            } else if (index === 8) {
              key3UpdateTit(2)
            }
            // ~ E: 기존 함수 활용 
          }
        }).play();
      });
    })
     // ++++++++++++++++++ E: TODO 진슬 추가_ 클릭시에도 메뉴 불 나오게
  });