// 📌📌📌 br_future.html의 SCRIPT

// 💚S: sub2 - SVG 라인 애니메이션
$(function () {
  if (!$(".container").hasClass("future")) return;

  gsap.registerPlugin(ScrollTrigger);
  document.querySelector(".js__ver_line").addEventListener("load", function () {
    const svgDoc = this.contentDocument;
    const svg = svgDoc.querySelector("svg");
    const path = svgDoc.querySelector("path");
    const pathLength = path.getTotalLength();

    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    // 1. <defs> 안에 <linearGradient> 생성
    const defs =
      svg.querySelector("defs") ||
      (() => {
        const d = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "defs"
        );
        svg.prepend(d);
        return d;
      })();

    const gradient = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "linearGradient"
    );
    gradient.setAttribute("id", "strokeGradient");
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "0%");
    gradient.setAttribute("y2", "100%");

    const stop1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "stop"
    );
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", "#00F2FF");

    const stop2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "stop"
    );
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", "#1500FF");

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);

    // 2. 만든 gradient를 stroke로 지정
    path.setAttribute("stroke", "url(#strokeGradient)");

    // 3. GSAP 애니메이션
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".js__ver_line",
        start: "top 80%",
        end: "bottom 60%",
        scrub: true,
        // markers: true,
      },
    });

    // 강제 새로고침
    ScrollTrigger.refresh();
  });
});
// E: sub2 - SVG 라인 애니메이션

// 💚S : sub2 - 포인트 이미지 효과
$(function () {
  if (!$(".container").hasClass("future")) return;

  gsap.registerPlugin(ScrollTrigger);

  const imgCut = document.querySelectorAll(".imgs_wrap [class^=cut]");
  imgCut.forEach((item, index) => {
    if (index != 3) {
      ScrollTrigger.matchMedia({
        "(min-width: 769px)": function () {
          gsap.set(item, { opacity: 0, y: -150 });
        },
        "(max-width: 768px)": function () {
          gsap.set(item, { opacity: 0, y: -50 });
        },
      });
      gsap.to(item, {
        x: 0,
        y: 0,
        opacity: 1,
        delay: 0.2 * index,
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".imgs_wrap",
          start: "top center",
          toggleActions: "play none none none",
          // markers : true,
        },
      });
    } else {
      gsap.set(item, { opacity: 0 });
      gsap.to(item, {
        opacity: 1,
        delay: 0.4 * index,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".imgs_wrap",
          start: "top center",
          toggleActions: "play none none none",
          // markers : true,
        },
      });
    }
  });

  gsap.from(".process .point", {
    x: 0,
    y: 0,
    opacity: 0,
    duration: 1,
    scale: 0.5,
    transformOrigin: "0% 0%",
    ease: "power1.inout",
    scrollTrigger: {
      trigger: ".process",
      start: "top center",
      toggleActions: "play none none none",
      // markers : true,
    },
  });
  gsap.from(".product .point", {
    x: 0,
    y: 0,
    opacity: 0,
    duration: 1,
    scale: 0.7,
    transformOrigin: "100% 50%",
    ease: "power1.inout",
    scrollTrigger: {
      trigger: ".product",
      start: "top center",
      toggleActions: "play none none none",
      // markers : true,
    },
  });
});
// E : sub2 - 포인트 이미지 효과

// 💚S : sub3 - 가로스크롤 + SVG 라인 애니메이션
window.addEventListener("load", function () {
  if (!$(".container").hasClass("future")) return;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.matchMedia({
    "(min-width: 1401px)": function () {
      //const baseWidth = 1920; // ✅ 기준 해상도
      const baseWidth = window.innerWidth;
      const inner = document.querySelector(".js__hori_scroll");
      const horiWrap = document.querySelector(".hori_scroll_wrap");
      const contentsWrap = inner.querySelector(".contents_wrap");
      const contentsListWrap = inner.querySelector(".contents_wrap ul");
      const contentsWrapWidth =
        contentsWrap.scrollWidth || contentsWrap.offsetWidth;
      const svgItem = document.querySelector("section.sub3 .js__hori_line");
      svgItem.style.width = svgItem.style.width =
        contentsListWrap.offsetWidth > 6401
          ? contentsListWrap.offsetWidth - 39
          : 6680;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".sub3",
          start: "top top",
          end: "+=" + (contentsWrapWidth - baseWidth + (baseWidth / 2 - 720)), // ✅ 고정된 스크롤 거리
          scrub: true,
          pin: true,
          anticipatePin: 1, // markers: true,

          toggleClass: { targets: horiWrap, className: "active" },
        },
      });

      window.addEventListener("resize", () => {
        ScrollTrigger.refresh();
      });

      tl.to(inner, {
        x: -(contentsWrapWidth - baseWidth + (baseWidth / 2 - 720)), // ✅ 고정된 가로 이동
        ease: "none",
        duration: 1,
      });

      tl.to({}, { duration: 0.1 }); // li 요소 애니메이션 설정

      const allLis = document.querySelectorAll(
        "section.sub3 .contents_wrap li"
      );

      const btn_progress = document.querySelectorAll(".btn_progress");
      btn_progress.forEach((btn, index) => {
        btn.addEventListener("click", () => {
          const scrollStart = horiWrap.offsetTop;
          const scrollDistance = contentsWrap.scrollWidth - baseWidth;

          if (index == 0) {
            const targetScroll = scrollStart;

            gsap.to(window, {
              scrollTo: targetScroll,
              duration: 0.2,
              ease: "power1.inout",
            });
            return;
          } else if (btn_progress.length - 1 == index) {
            const li = allLis[index - 2];
            const liOffsetLeft = li.offsetLeft + li.offsetWidth / 0.7;
            // 전체 progress(0~1) 계산
            const progress = liOffsetLeft / scrollDistance;

            const targetScroll = scrollStart + scrollDistance * progress;
            gsap.to(window, {
              scrollTo: targetScroll,
              duration: 0.2,
              ease: "power1.inout",
            });
            return;
          } else {
            const li = allLis[index - 1];
            const liOffsetLeft = li.offsetLeft - li.offsetWidth / 0.7;
            // 전체 progress(0~1) 계산
            const progress = liOffsetLeft / scrollDistance;

            // scrollTrigger가 핀된 .sub3의 시작 스크롤 위치

            const targetScroll = scrollStart + scrollDistance * progress;

            gsap.to(window, {
              scrollTo: targetScroll,
              duration: 0.2,
              ease: "power1.inout",
            });
          }
        });
      });

      allLis.forEach((el) => (el.style.opacity = "0"));

      allLis.forEach((li, index) => {
        const isLast = index === allLis.length - 1;

        const triggerConfig = {
          trigger: li,
          containerAnimation: tl,
          start: "left 70%",
          end: "right 70%",
          scrub: true, // markers: true,
          invalidateOnRefresh: true,
          onEnter: () => fadeInOne(index),
          onEnterBack: () => {
            fadeInOne(index);
          },
          onUpdate: (self) => {
            const progress = self.progress * 240;
            const progress_li = horiWrap.querySelectorAll(".progress_wrap li");

            progress_li.forEach((item, idx) => {
              if (idx == index) {
                const progressBar = item.querySelector(".progress_bar");
                const progressBtn =
                  progress_li[idx + 1].querySelector(".btn_progress");
                if (progress >= 100) {
                  progressBtn.classList.add("active");
                } else {
                  progressBtn.classList.remove("active");
                }
                if (
                  (index == progress_li.length - 2 && progress > 40) ||
                  progress > 70
                ) {
                  progressBar.style.width = 100 + "%";
                  progressBtn.classList.add("active");
                  return;
                } else {
                  progressBar.style.width = progress + "%";
                }
                if (progress < 100) return;
              }
            });
          },
        }; // 마지막 li는 fadeOut 제외

        if (!isLast) {
          triggerConfig.onLeave = () => fadeOutOne(li);
          triggerConfig.onLeaveBack = () => fadeOutOne(li);
        }

        ScrollTrigger.create(triggerConfig);
      });

      function fadeInOne(index) {
        allLis.forEach((el, i) => {
          gsap.to(el, {
            opacity: i === index ? 1 : 0,
            duration: 1,
            ease: "power2.out",
          });
        });
      }

      function fadeOutOne(el) {
        gsap.to(el, {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        });
      } // SVG 라인 애니메이션

      const path = document.querySelector("section.sub3 .js__hori_line path");
      if (path) {
        const pathLength = path.getTotalLength();
        path.style.stroke = "url(#lineGradient)";
        path.style.strokeWidth = "2";
        path.style.fill = "none";
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".sub3",
            start: "top top",
            end: "+=" + (contentsWrapWidth - baseWidth) * 0.85, // ✅ 고정값 기준
            scrub: true,
            invalidateOnRefresh: true, // markers: true,
          },
        });
      }
    },
  });
});

// E : sub3 - 가로스크롤 구현하기

// 📌📌📌 br_tech.html의 SCRIPT
// 💚S: sub1 - 원이 반으로 펼쳐지기
$(function () {
  if (!$(".container").hasClass("tech")) return;

  gsap.registerPlugin(ScrollTrigger);
  gsap.set(".sub1 .solutions_wrap .circle", {
    opacity: 0,
  });

  const $wrap = $(".sub1 .solutions_wrap .circle_wrap");

  // ✅ circle 복제 (9개씩)
  const originalL = $(".sub1 .solutions_wrap .circle.l");
  const originalR = $(".sub1 .solutions_wrap .circle.r");
  const clonesL = [],
    clonesR = [];

  for (let i = 1; i <= 9; i++) {
    const $cloneL = originalL.clone().addClass("clone").css({
      zIndex: -i,
      opacity: 0,
      position: "absolute",
    });
    const $cloneR = originalR.clone().addClass("clone").css({
      zIndex: -i,
      opacity: 0,
      position: "absolute",
    });

    $wrap.append($cloneL, $cloneR);
    clonesL.push($cloneL[0]);
    clonesR.push($cloneR[0]);

    gsap.set($cloneL, { scaleX: 0, transformOrigin: "right center" });
    gsap.set($cloneR, { scaleX: 0, transformOrigin: "left center" });
  }

  // ✅ 타임라인 구성
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".sub1",
      start: "center center",
      end: "+=1500",
      scrub: 1, // 부드러운 보간
      pin: true,
      // markers: true
    },
  });

  // 1단계: wrap 열림
  tl.to($wrap, {
    scaleY: 1,
    duration: 0.5,
    ease: "power2.out",
  });

  // 2단계: wrap 속성 변경 (같은 타이밍)
  tl.to($wrap, {
    width: "max-content",
    backgroundColor: "initial",
    overflow: "initial",
    duration: 0,
    ease: "none",
  });

  // 3단계: clone 확장 (wrap이 열린 뒤부터 시작)
  tl.to(
    clonesL,
    {
      scaleX: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.03,
      ease: "power1.out",
    },
    ">"
  );
  tl.to(
    clonesR,
    {
      scaleX: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.03,
      ease: "power1.out",
    },
    "<"
  );

  // 4단계: clone out + .circle.l, .circle.r 커지기
  tl.to(
    clonesL.concat(clonesR),
    {
      opacity: 0,
      duration: 0.5,
      ease: "power1.out",
    },
    ">"
  );
  tl.to(
    ".sub1 .solutions_wrap .circle.l:not(.clone)",
    {
      opacity: 1,
      scale: 1.12,
      translate: "2% 0",
      duration: 0.3,
      ease: "power2.out",
    },
    "<-=0.5"
  );
  tl.to(
    ".sub1 .solutions_wrap .circle.r:not(.clone)",
    {
      opacity: 1,
      scale: 1.12,
      translate: "-2% 0",
      duration: 0.3,
      ease: "power2.out",
    },
    "<"
  );
  tl.to(
    ".sub1 .solutions_wrap ul li.bg",
    {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    },
    "<"
  );
  tl.to(
    ".sub1 .solutions_wrap ul li.tit",
    {
      color: "#fff",
      filter: "drop-shadow(0 0 8px #000);",
      duration: 0.3,
      ease: "power2.out",
    },
    "<"
  );

  // 6단계 : 텍스트 in
  tl.to(
    ".sub1 .solutions_wrap ul li",
    {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    },
    ">"
  );
  tl.to(
    ".sub1 .solutions_wrap ul.sw li.bg .flexable",
    {
      translate: "-4% -2%",
      duration: 0.3,
      ease: "power2.out",
    },
    "<"
  );
  tl.to(
    ".sub1 .solutions_wrap ul.hw li.bg .flexable",
    {
      translate: "4% 2%",
      duration: 0.3,
      ease: "power2.out",
    },
    "<"
  );
});
// E: sub1 - 원이 반으로 펼쳐지기

// 💚S: sub2 - 원이 대각선으로 확장되기
$(function () {
  if (!$(".container").hasClass("tech")) return;

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.matchMedia({
    "(min-width: 1401px)": function () {
      const $circle = $(".js__circle");
      const $container = $circle.parent();
      const clones = [];
      const stepPercent = 0.8; // ✅ top/left 변화 단위 (1%씩 이동)

      // i=0 ~ 8까지 clone 생성 (짝수: ↘, 홀수: ↗)
      for (let i = 0; i < 10; i++) {
        const offset = Math.floor((i + 1) / 2) * stepPercent;

        const top =
          i % 2 === 0
            ? `calc(50% + ${offset}%)` // 짝수 index (0,2,4,...): 아래
            : `calc(50% - ${offset}%)`; // 홀수 index (1,3,5,...): 위

        const left =
          i % 2 === 0
            ? `calc(50% - ${offset}%)` // 짝수 index: 왼쪽
            : `calc(50% + ${offset}%)`; // 홀수 index: 오른쪽

        const $clone = $circle.clone().addClass("circle-clone");

        $clone.css({
          width: "600px",
          height: "600px",
          position: "absolute",
          top: top,
          left: left,
          transform: "translate(-50%, -50%)",
          zIndex: -1,
          opacity: 0,
        });

        $container.append($clone);
        clones.push($clone[0]);
      }

      // 통합 타임라인 (sub2 + clones 싱크 맞춤)
      const sub2Tl = gsap.timeline({
        scrollTrigger: {
          trigger: "div.inner",
          start: "top top",
          end: "+=3000",
          scrub: true,
          pin: true,
          // markers: true
        },
      });

      // 초기 상태
      gsap.set(".sub3", {
        opacity: 0,
        pointerEvents: "none",
      });

      // 1단계: sub2 나타나기 + clones 등장 + 원본 숨기기 (동시)
      sub2Tl
        .to($circle, {
          opacity: 0,
          duration: 1,
        })

        .to(clones, {
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 1.5,
        })
        .to(
          clones,
          {
            skewX: 30,
            duration: 1.5,
          },
          "<"
        )

        // 2단계: sub2 사라지기 + clones 사라지기 (동시)
        .to(clones, {
          scale: 1,
          skewX: 0,
          rotate: 360,
          stagger: {
            each: 0.05,
            from: "end",
          },
          top: "50%",
          left: "50%",
          duration: 2,
        })
        .to(
          clones,
          {
            opacity: 0,
            duration: 2,
          },
          ">"
        )
        .to(
          ".sub2",
          {
            opacity: 0,
            duration: 2,
          },
          "<"
        )
        .to(
          $circle,
          {
            opacity: 1,
            skewX: 0,
            duration: 2,
          },
          "<"
        )

        // 4단계: sub3 나타나기
        .to(".sub3", {
          opacity: 1,
          pointerEvents: "initial",
          duration: 0.5,
        })
        .to({}, { duration: 5 });
    },
  });
});
// E: sub2 - 원이 대각선으로 확장되기

// 💚S: sub3 - 종합
// 🤍로티 애니메이션
$(function () {
  if (!$(".container").hasClass("tech")) return;

  let animation = bodymovin.loadAnimation({
    container: document.getElementById("js__lottie"),
    renderer: "svg",
    loop: true, //반복재생
    autoplay: true, //자동재생
    path: "/assets/img/br/tech_sub3_sphere.json",
  });
  animation.setSpeed(0.2); //기본속도 : 1
});

// 🤍step 애니메이션
$(function () {
  if (!$(".container").hasClass("tech")) return;

  let isIn = false;
  let animationTimeouts = [];

  $(window).on("scroll", function () {
    const $sub3 = $("section.sub3");
    const $aniLine = $(".sub3 .ani_line");
    const $stepItems = $("ul.step_wrap > li");
    const opacity = parseFloat($sub3.css("opacity"));

    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();
    const sub3Top = $sub3.offset().top;
    const sub3Bottom = sub3Top + $sub3.outerHeight();

    const isVisibleInViewport =
      sub3Bottom > scrollTop && sub3Top < scrollTop + windowHeight;
    const fullyOutOfView =
      scrollTop + windowHeight < sub3Top || scrollTop > sub3Bottom;

    if (!isIn && opacity === 1 && isVisibleInViewport) {
      isIn = true;
      animationTimeouts.forEach(clearTimeout);
      animationTimeouts = [];

      // ✅ aniline 회전 시작 (2.4초 동안 0 -> 415deg)
      $aniLine.css({
        animation: "circle-rotate 4s ease infinite",
      });

      // ✅ li[0]에 on
      const timeout0 = setTimeout(() => {
        $stepItems.eq(0).addClass("on");
      }, 100);

      // ✅ li[1]에 on
      const timeout1 = setTimeout(() => {
        $stepItems.eq(1).addClass("on");
      }, 600);

      // ✅ li[2]에 on
      const timeout2 = setTimeout(() => {
        $stepItems.eq(2).addClass("on");
      }, 1200);

      // ✅ li[3]에 on
      const timeout3 = setTimeout(() => {
        $stepItems.eq(3).addClass("on");
      }, 1800);

      animationTimeouts.push(timeout0, timeout1, timeout2, timeout3, remove);
    }

    if (isIn && (opacity === 0 || fullyOutOfView)) {
      isIn = false;
    }
  });
});

//  E: sub3 - 종합
