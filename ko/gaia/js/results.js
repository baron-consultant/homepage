document.addEventListener("DOMContentLoaded", (event) => {
    // ---------------------------------------------
    // js__fixLeft 오른쪽에 따라 왼쪽 내용 변하기
    // 사용 클래스 : js__fixLeft_tit, js__fixLeft_bg, js__fixLeft_sec
    // ---------------------------------------------
    gsap.registerPlugin(ScrollTrigger);

    const tits = document.querySelectorAll(".js__fixLeft_tit");
    const bgs = document.querySelectorAll(".js__fixLeft_bg");
    const sections = document.querySelectorAll(".js__fixLeft_secs > div");


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
            transform: "scale(0.7) translate(-47%, 0%)",
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
       //markers: true,
        onEnter: () => updateElements(0),
        onLeaveBack: () => updateElements(0)
    });
    
    ScrollTrigger.create({
        trigger: sections[1],
        start: "top top",
        //markers: true,
        onEnter: () => updateElements(1),
        onLeaveBack: () => updateElements(1)
    });


});

//고정 슬라이드
document.addEventListener('DOMContentLoaded', function() {
    const route = document.querySelector('.route');
    const sections = route.querySelectorAll('#sec1, #sec2, #sec3, #sec4, #sec5, #sec6, #sec7, #sec8, #sec9, #sec10, #sec11, #sec12, #sec13, #sec14, #sec15, #sec16');
    const tabs = route.querySelectorAll('.tabs li');
    const subs = route.querySelectorAll('.subs li');
    const imgs = route.querySelectorAll('.imgs li.sec_img li');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observerCallback = (entries) => {
        entries.filter(entry => entry.isIntersecting).forEach(entry => {
            const id = entry.target.id;
            [imgs].forEach(group => 
                group.forEach((el, index) => 
                    el.classList.toggle('on', id === `sec${index + 1}`)
                )
            );
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    for (let i = 1; i <= 5; i++) {
        // 섹션 번호를 2자리 형식으로 생성 (01, 02, ..., 05)
        const sectionClass = `section_0${i}_img`;
        const sectionClassSy = $(`li.${sectionClass} li`);
        const imgsSectionItems = document.querySelectorAll(`.imgs li.${sectionClass} li`);
        const imgsOnItem = document.querySelectorAll(`.section_0${i}_img`);
        
        // 클래스가 'on'이 될 때 이벤트 핸들러
        imgsSectionItems.forEach(item => {
            // MutationObserver 설정
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        // 'on' 클래스가 추가되면 모든 해당 섹션에 'on' 클래스 추가
                        if (sectionClassSy.hasClass('on')) {
                            imgsOnItem.forEach(el => el.classList.add('on'));
                            //  + TODO 진슬 추가_ 마지막 화면 화살표 제거
                            if ($(imgsOnItem[2]).hasClass('section_05_img') && $(imgsOnItem[2]).find('.sec_img_item').last().hasClass('on')) {
                              $(imgsOnItem[1]).parent().addClass('final');
                            } else {
                              $(imgsOnItem[1]).parent().removeClass('final');
                            }
                        } else {
                            imgsOnItem.forEach(el => el.classList.remove('on'));
                        }
                    }
                });
            });

            // observer 설정
            observer.observe(item, { attributes: true });
        });
    }
});

if($('.results .route .fix_tit.js__mouse_area .subs .section_05_img').hasClass('on')) {
  $('.results .route .subs').addClass('final');
}
