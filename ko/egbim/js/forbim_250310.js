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
        // markers: true,
        onEnter: () => updateElements(0),
        onLeaveBack: () => updateElements(0)
    });
    
    ScrollTrigger.create({
        trigger: sections[1],
        start: "center center",
        // markers: true,
        onEnter: () => updateElements(1),
        onLeaveBack: () => updateElements(1)
    });


});


window.addEventListener('resize', function() {
    if (window.innerWidth <= 992) {
        checkAndToggleDisplay();
    } else {
        document.querySelector('div.left.vc').style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 992) {
        checkAndToggleDisplay();
    } else {
        document.querySelector('div.left.vc').style.display = 'none';
    }
});

window.addEventListener('wheel', function(event) {
    if (window.innerWidth <= 992) {
        checkAndToggleDisplay(event);
    } else {
        document.querySelector('div.left.vc').style.display = 'none';
    }
});

function checkAndToggleDisplay(event) {
    const secondChild = document.querySelector('.process .left span.js__fixLeft_tit:nth-of-type(2)');
    console.log(secondChild);

    const leftVcDiv = document.querySelector('div.left.vc');
    if (!leftVcDiv) return;

    if (secondChild && secondChild.classList.contains('on')) {
        // 마우스 휠 내리면 opacity를 0으로, 올리면 1로 설정
        if (event.deltaY > 0) {
            leftVcDiv.style.opacity = 0;  // 휠 내리면 opacity = 0
        } else if (event.deltaY < 0) {
            leftVcDiv.style.opacity = 1;  // 휠 올리면 opacity = 1
        }
    } else {
        // .on 클래스가 없다면 항상 opacity 1로 설정
        leftVcDiv.style.opacity = 1;
    }
}




