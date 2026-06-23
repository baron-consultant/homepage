document.addEventListener('DOMContentLoaded', (event)=> {

    // ---------------------------------------------
    // 주요기능의 라인 애니, 카드 애니
    // 사용 클래스 : js__ani
    // ---------------------------------------------
    let hasAnimationRun = false;
    const featuresAni = document.querySelector('.js__ani');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.7] // Observe both 0% and 70% visibility
    };
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (!hasAnimationRun && entry.intersectionRatio >= 0.7) {
                featuresAni.classList.add('card_ani');
                featuresAni.querySelector('.lines').classList.add('move_ani');
                setTimeout(() => {
                    featuresAni.classList.remove('card_ani');
                }, 1200);
                hasAnimationRun = true; 
                observer.unobserve(featuresAni);
            }
        });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(featuresAni);
})

document.addEventListener('DOMContentLoaded', (event) => {
    // 화면 너비가 993px 이상일 때만 실행
    if (window.matchMedia("(min-width: 993px)").matches) {
        gsap.set(".js__height_item", {transform: "translateY(70%) scale(0.5)", bottom: "50%"});

        const bottomToCenter = gsap.timeline();
        let guideSampleCalled = false;

        // ScrollTrigger 설정
        ScrollTrigger.create({
            animation: bottomToCenter,
            trigger: ".js__height_trigger",
            start: "top top",
            end: "+=1000 top",
            pin: true,
            duration: 0.5,
            onUpdate: (self) => {
                const item = document.querySelector(".js__height_item");
                const btn = document.querySelector(".js__height_btn");
                const mouseMark = document.querySelector(".js__mouse_mark");

                if (self.progress > 0.5) {
                    if (!guideSampleCalled) {
                        guideSample();
                        guideSampleCalled = true;
                    }
                    item.classList.add("full");
                    item.style.transition = '0.5s';
                    item.style.transform = 'translateY(50%) scale(1)';
                    mouseMark.style.opacity = '0';
                    btn.classList.remove("on");
                    btn.style.transition = '0.5s';
                    btn.style.left = 'calc(11% - 60px)';
                    btn.style.opacity = '1';

                    const menuTexts = item.querySelectorAll(".menu_text");
                    menuTexts.forEach(menuText => {
                        menuText.style.display = '';
                    });
                } else {
                    item.style.backgroundImage = 'url(../img/value_screen1.png)';
                    item.classList.remove("full");
                    item.style.transition = '0.5s';
                    item.style.transform = 'translateY(70%) scale(0.5)';
                    mouseMark.style.opacity = '1';
                    btn.classList.remove("on");
                    btn.style.transition = '0.5s';
                    btn.style.left = 'calc(50% - 60px)';
                    btn.style.opacity = '0';

                    const menuTexts = item.querySelectorAll(".menu_text");
                    menuTexts.forEach(menuText => {
                        menuText.style.display = 'none';
                    });
                }
            },
            onLeave: () => {
                document.querySelector(".js__height_item").style.backgroundImage = 'url(../img/value_screen1.png)';
            }
        });
    }
});

// 고정 슬라이드
document.addEventListener('DOMContentLoaded', function() {
    const screenM = document.querySelector('.screen.m');
    const sections = screenM.querySelectorAll('#sec1, #sec2, #sec3, #sec4');
    const tabs = screenM.querySelectorAll('.tabs li');
    const subs = screenM.querySelectorAll('.subs li');
    const imgs = screenM.querySelectorAll('.imgs li');

    const observerOptions = {
        root: null,
        rootMargin: '20px',
        threshold: 0.5
    };

    const observerCallback = (entries) => {
        entries.filter(entry => entry.isIntersecting).forEach(entry => {
            const id = entry.target.id;
            [tabs, subs, imgs].forEach(group => 
                group.forEach((el, index) => 
                    el.classList.toggle('on', id === `sec${index + 1}`)
                )
            );
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
});



function guideSample() {
    console.log('애니메이션 시작');
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });

    const guide = document.querySelector('.js__height_item');
    guide.classList.add('show_ani');

    setTimeout(() => {
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
        guide.classList.remove('show_ani');
    }, 3000);
};

function preventScroll(event) {
    event.preventDefault();
}

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
    }, 3000);
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
            guide.style.transition = '0s'
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
