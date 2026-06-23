document.addEventListener('DOMContentLoaded', (event)=> {

    // ---------------------------------------------
    // js__snap 스크롤 스냅하기
    // 사용 클래스 : js__snap
    // ---------------------------------------------
    // document.querySelectorAll('.js__snap').forEach(element => {
    //     gsap.to(element, {
    //         scrollTrigger: {
    //             trigger: element,
    //             start: 'top 30%',
    //             // markers: true,
    //             end: 'bottom 80%',
    //             onEnter: () => {
    //                 gsap.to(window, { scrollTo: { y: element, offsetY: 0 }, duration: 0.2});
    //             },
    //             onEnterBack: () => {
    //                 gsap.to(window, { scrollTo: { y: element, offsetY: 0 }, duration: 0.2});
    //             }
    //         }
    //     });
    // });

    // let hasAnimationRun = false;
    // gsap.to('.js__fullpage', {
    //     scrollTrigger: {
    //         trigger: '.js__fullpage',
    //         start: 'top 70%',
    //         // markers: true,
    //         onEnter: () => {
    //             const offsetYValue = 0;
    //             gsap.to(window, { scrollTo: { y: '.js__fullpage', offsetY: offsetYValue }, duration: 0.4 });

    //             if (!hasAnimationRun && offsetYValue === 0) {
    //                 document.querySelector('.js__fullpage').classList.add('card_ani');
    //                 document.querySelector('.js__fullpage .lines').classList.add('move_ani');
    //                 setTimeout(() => {
    //                     document.querySelector('.js__fullpage').classList.remove('card_ani');
    //                 }, 1200);
    //                 hasAnimationRun = true;  // Set the flag to true
    //             }
    //         }
    //     }
    // });

    // ---------------------------------------------
    // js__height 배경 서서히 나타나기
    // 사용 클래스 : js__height_trigger, js__height_item
    // ---------------------------------------------
    // 초기 상태 설정: js__height_item, js__height_text
    gsap.set(".js__height_item", {transform: "translate(-50%, 0%) scale(0.5)", top: "12%"});
    
    const bottomToCenter = gsap.timeline();
    let guideSampleCalled = false;
    
    // ScrollTrigger 설정
    ScrollTrigger.create({
        animation: bottomToCenter,
        trigger: ".js__height_trigger",
        start: "top top",
        end: "+=1000 top",
        scrub: true,
        pin: true,
        // markers: true,
        anticipatePin: 1,
        onUpdate: (self) => {
            const item = document.querySelector(".js__height_item");
            const btn = document.querySelector(".js__height_btn");
            if (self.progress > 0.5) {
                if (!guideSampleCalled) {
                    guideSample();
                    guideSampleCalled = true;
                };
                item.classList.add("full");
                btn.classList.remove("on");
                item.style.transition = '0.5s'
                item.style.transform = 'translate(-50%, -50%) scale(1)';
                item.style.top = '50%';
                btn.style.opacity= '1'
                btn.style.transition = '0.5s'
                btn.style.left = '140px'
                const menuTexts = item.querySelectorAll(".menu_text");
                menuTexts.forEach(menuText => {
                    menuText.style.display = '';
                });
            } else {
                item.style.backgroundImage = 'url(../img/value_screen1.png)'
                item.classList.remove("full");
                item.style.transition = '0.5s'
                item.style.transform = 'translate(-50%, 0%) scale(0.5)';
                item.style.top = '12%';
                btn.classList.remove("on");
                btn.style.opacity= '0'
                btn.style.transition = '0.5s'
                btn.style.left = 'calc(50% - 60px)';
                const menuTexts = item.querySelectorAll(".menu_text");
                menuTexts.forEach(menuText => {
                    menuText.style.display = 'none';
                });
            }
        },
        onLeave: () => {
            document.querySelector(".js__height_item").style.backgroundImage = 'url(../img/value_screen1.png)'
        }
    });
})



function preventScroll(event) {
    event.preventDefault();
}

function guideSample() {
    console.log('애니메이션 시작');
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });

    const guide = document.querySelector ('.js__height_item');
    guide.classList.add('show_ani');

    setTimeout(() => {
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
        guide.classList.remove('show_ani');
    }, 1500);
};



document.addEventListener('DOMContentLoaded', function() {
    const guide = document.querySelector ('.js__height_item')
    const dim = guide.querySelector('.dim');
    const mask = guide.querySelector('.mask')
    const button = document.querySelector('.js__height_btn');
    const list = guide.querySelector('ul')
    const listItems = list.querySelectorAll('li');
    const listClassNames = ['li1', 'li2', 'li3', 'li4', 'li5', 'li6', 'li7', 'li8'];

    button.addEventListener('click', function() {
        if (button.classList.contains('on')) {
            button.classList.remove('on');
            guide.style.backgroundImage = 'url(../img/value_screen1.png)'
            listItems.forEach(item => {
                const menuText = item.querySelector('.menu_text');
                if (menuText) {
                    menuText.style.display = '';
                }
            });
            
        } else {
            button.classList.add('on');
            guide.style.backgroundImage = 'url(../img/value_screen2.png)'
            listItems.forEach(item => {
                const menuText = item.querySelector('.menu_text');
                if (menuText) {
                    menuText.style.display = 'block';
                }
            });
        }
    });

    listItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            listClassNames.forEach(className => mask.classList.remove(className));
            dim.style.display = 'block';
            mask.style.display = "block";
            mask.classList.add(listClassNames[index]);
            item.style.zIndex = '100';
        });
    
        item.addEventListener('mouseleave', () => {
            listClassNames.forEach(className => mask.classList.remove(className));
            dim.style.display = '';
            mask.style.display = '';
            item.style.zIndex = ''
        });
    });
});
