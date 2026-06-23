// ?“Œ?“Œ?“Œ dt_ê³µí†µ.html??SCRIPT
// ?’šS : btn_more ?´ë¦­???ì—…
$(function () {
  const container = $(".container");
  const pageType = ["explain", "sw", "use"].find((cls) =>
    container.hasClass(cls)
  );
  if (!pageType) return;

  $(".btn_more").on("click", function () {
    const $this = $(this);
    const $wrap = $(".wrap");
    const value = $this.data("value");
    const $next = $this.next();
    const isAlreadyInserted = $next.hasClass("popup_wrap " + value);

    if (!isAlreadyInserted) {
      const html = `
            <div class="popup_wrap ${value}">
                <div class="popup_contents_wrap" data-lenis-prevent-wheel>
                  <picture>
                    <source
                      media="(max-width:1400px)"
                      srcset="../assets/img/dt/eng/m_${pageType}_${value}.jpg"
                    />
                    <source
                      media="(min-width: 1401px)"
                      srcset="../assets/img/dt/eng/${pageType}_${value}.jpg"
                    /> 
                  <img src="../assets/img/dt/eng/${pageType}_${value}.jpg">
                </picture>
                </div>
                <button class="btn_close"><i class="close"></i></button>
            </div>
            `;

      $wrap.after(html);
      console.log(`${value} ?‘ì„± ?„ë£Œ`);
      const $popup = $wrap.next(".popup_wrap." + value);
    } else {
      console.log(`?´ë? ${value} ?ì—…??ì¡´ì¬?©ë‹ˆ??`);
    }
  });
});
// E : btn_more ?´ë¦­???ì—…

// ?’šS : blobs ?ˆì— li ê·¸ë¦¬ê¸?
$(function () {
  if (!$(".container").hasClass("dt")) return;
  $("ul.blobs").each(function () {
    for (let i = 0; i < 4; i++) {
      const $li = $("<li></li>").addClass("blob-item");
      $(this).append($li);
    }
  });

  const blobs = document.querySelectorAll(".objs_wrap ul.blobs");
  gsap.registerPlugin(ScrollTrigger);
  gsap.to(blobs, {
    opacity: 1,
    duration: 0.3,
    ease: "power1.out",
  });
});
// E : blobs ?ˆì— li ê·¸ë¦¬ê¸?

// ?’šS : svg ?¼ì¸ ê·¸ë¦¬ê¸?
$(function () {
  gsap.registerPlugin(ScrollTrigger);

  const path = document.querySelector("#animatedLine");
  const pathLength = path.getTotalLength();

  path.style.stroke = "url(#lineGradient)";
  path.style.strokeWidth = "3";
  path.style.fill = "none";
  const visibleLength = 1200;

  path.style.strokeDasharray = `${visibleLength} ${pathLength - 1200}`;
  path.style.strokeDashoffset = pathLength;

  const maskPath = document.querySelector("#maskPath");
  maskPath.style.strokeDasharray = `${visibleLength} 0`;
  maskPath.setAttribute("d", path.getAttribute("d"));

  gsap.to(path, {
    strokeDashoffset: 0,
    scrollTrigger: {
      trigger: ".bg_line",
      start: "top center",
      end: "bottom center",
      scrub: 3,
    },
    ease: "none",
  });
});
// E : svg ?¼ì¸ ê·¸ë¦¬ê¸?

// ?“Œ?“Œ?“Œ dt_explain.html??SCRIPT
// ?’šS : objs_wrap ?˜í??˜ê¸°

// ?¤section.bim
$(function () {
  if (!$(".container").hasClass("explain")) return;

  var sec = [".bim", ".gis", ".twin"];
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  ScrollTrigger.matchMedia({
    "(min-width: 1401px)": function () {
      gsap.set(".bim .objs_wrap", { opacity: 0, scale: 0.5, x: -300, y: -400 });
    },
    "(max-width: 1400px)": function () {
      gsap.set(".bim .objs_wrap", { opacity: 1, scale: 1, x: 0, y: 0 });
    },
  });

  const bimTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".bim",
      start: "top center",
      end: "bottom center",
      scrub: true,
      // markers: true,
      onEnter: playVideoFromStart,
      onEnterBack: playVideoFromStart,
    },
  });

  function playVideoFromStart() {
    const video = document.querySelector(".bim .objs_wrap video");
    const pointImg = document.querySelector(".bim .objs_wrap img.point");

    video.currentTime = 0;
    video.play().catch((e) => console.warn("Video play failed:", e));
    gsap.set(pointImg, { opacity: 0, xPercent: 25 });
    ScrollTrigger.matchMedia({
      "(min-width: 1401px)": function () {
        gsap.to(pointImg, {
          delay: 0.8, // 00ì´????¬ìƒ
          opacity: 1,
          x: 0,
          xPercent: 0,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
        });
      },
      "(max-width: 1400px)": function () {
        gsap.to(pointImg, {
          delay: 0.8, // 00ì´????¬ìƒ
          opacity: 1,
          x: 0,
          xPercent: 0,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
        });
      },
    });
  }
  ScrollTrigger.matchMedia({
    "(min-width: 1401px)": function () {
      // ?¬ë¬¼??ê²½ë¡œ ì§€??
      bimTL.to(".bim .objs_wrap", {
        motionPath: {
          path: [
            { x: 0, y: -200 },
            { x: 0, y: 0 },
          ],
          curviness: 1.5,
          autoRotate: false,
        },
        opacity: 1,
        scale: 1,
        ease: "power1.out",
      });

      bimTL.to(
        ".bim .objs_wrap",
        {
          scale: 1,
          ease: "power1.out",
        },
        ">"
      );
    },
  });
});

// ?¤section.gis
$(function () {
  if (!$(".container").hasClass("explain")) return;

  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  ScrollTrigger.matchMedia({
    "(min-width: 1401px)": function () {
      gsap.set(".gis .objs_wrap", { opacity: 0, scale: 0.5, x: 150, y: -500 });
    },
    "(max-width: 1400px)": function () {
      gsap.set(".gis .objs_wrap", { opacity: 1, scale: 1, x: 0, y: 0 });
    },
  });

  const bimTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".gis",
      start: "top center",
      end: "bottom center",
      scrub: true,
      // markers: true,
      onEnter: imgPointStart,
      onEnterBack: imgPointStart,
    },
  });
  function imgPointStart() {
    const pointImg = document.querySelector(".gis .objs_wrap img.point");
    gsap.set(pointImg, { opacity: 0, xPercent: -25 });
    ScrollTrigger.matchMedia({
      "(min-width: 1401px)": function () {
        gsap.to(pointImg, {
          delay: 1, // 00ì´????¬ìƒ
          opacity: 1,
          x: 0,
          xPercent: 0,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
        });
      },
      "(max-width: 1400px)": function () {
        gsap.to(pointImg, {
          delay: 1, // 00ì´????¬ìƒ
          opacity: 1,
          x: 0,
          xPercent: 0,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
        });
      },
    });
  }
  ScrollTrigger.matchMedia({
    "(min-width: 1401px)": function () {
      // ?¬ë¬¼??ê²½ë¡œ ì§€??
      bimTL.to(".gis .objs_wrap", {
        motionPath: {
          path: [
            { x: 50, y: -400 },
            { x: 0, y: 0 },
          ],
          curviness: 1.5,
          autoRotate: false,
        },
        opacity: 1,
        scale: 1.1,
        ease: "power1.out",
      });

      bimTL.to(
        ".gis .objs_wrap",
        {
          scale: 1,
          ease: "power1.out",
        },
        ">"
      );
    },
  });
});

// ?¤section.twin
$(function () {
  if (!$(".container").hasClass("explain")) return;

  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  ScrollTrigger.matchMedia({
    "(min-width: 1401px)": function () {
      gsap.set(".twin .objs_wrap", {
        opacity: 0,
        scale: 0.5,
        x: -150,
        y: -500,
      });
    },
    "(max-width: 1400px)": function () {
      gsap.set(".twin .objs_wrap", { opacity: 1, scale: 1, x: 0, y: 0 });
    },
  });

  const bimTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".twin",
      start: "top center",
      end: "bottom center",
      scrub: true,
      // markers: true,
      onEnter: playVideoFromStart,
      onEnterBack: playVideoFromStart,
    },
  });

  function playVideoFromStart() {
    const video = document.querySelector(".twin .objs_wrap video");
    const pointImg = document.querySelector(".twin .objs_wrap img.point");

    video.currentTime = 0;
    video.play().catch((e) => console.warn("Video play failed:", e));
    gsap.set(pointImg, { opacity: 0, xPercent: 25 });
    ScrollTrigger.matchMedia({
      "(min-width: 1401px)": function () {
        gsap.to(pointImg, {
          delay: 1, // 00ì´????¬ìƒ
          opacity: 1,
          x: 0,
          xPercent: 0,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
        });
      },
      "(max-width: 1400px)": function () {
        gsap.to(pointImg, {
          delay: 0.8, // 00ì´????¬ìƒ
          opacity: 1,
          x: 0,
          xPercent: 0,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
        });
      },
    });
  }
  ScrollTrigger.matchMedia({
    "(min-width: 1401px)": function () {
      // ?¬ë¬¼??ê²½ë¡œ ì§€??
      bimTL.to(".twin .objs_wrap", {
        motionPath: {
          path: [
            { x: -50, y: -400 },
            { x: 0, y: 0 },
          ],
          curviness: 1.5,
          autoRotate: false,
        },
        opacity: 1,
        scale: 1.1,
        ease: "power1.out",
      });

      bimTL.to(
        ".twin .objs_wrap",
        {
          scale: 1,
          ease: "power1.out",
        },
        ">"
      );
    },
  });
});
// E : objs_wrap ?˜í??˜ê¸°

// ?“Œ?“Œ?“Œ dt_sw.html??SCRIPT
// ?’šS : objs_wrap ?˜í??˜ê¸°
// ?¤section.overview
$(function () {
  if (!$(".container").hasClass("sw")) return;
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  const bimTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".overview",
      start: "70% center",
      end: "bottom bottom",
      scrub: true,
      // markers: true,
    },
  });
});

// ?¤section.toDT
$(function () {
  if (!$(".container").hasClass("sw")) return;

  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  ScrollTrigger.matchMedia({
    "(min-width: 1401px)": function () {
      gsap.set(".toDT .objs_wrap", {
        opacity: 0,
        scale: 0.5,
        x: -300,
        y: -500,
      });
    },
    "(max-width: 1400px)": function () {
      gsap.set(".toDT .objs_wrap", {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
      });
    },
  });

  const bimTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".toDT",
      start: "top center",
      end: "bottom center",
      scrub: true,
      // markers: true,
      onEnter: playVideoFromStart,
      onEnterBack: playVideoFromStart,
    },
  });

  function playVideoFromStart() {
    const video = document.querySelector(".toDT .objs_wrap video");

    video.currentTime = 0;
    video.play().catch((e) => console.warn("Video play failed:", e));
  }
  ScrollTrigger.matchMedia({
    "(min-width: 1401px)": function () {
      // ?¬ë¬¼??ê²½ë¡œ ì§€??
      bimTL.to(".toDT .objs_wrap", {
        motionPath: {
          path: [
            { x: -100, y: -300 },
            { x: 0, y: 0 },
          ],
          curviness: 1.5,
          autoRotate: false,
        },
        opacity: 1,
        scale: 1.1,
        ease: "power1.out",
      });

      bimTL.to(
        ".toDT .objs_wrap",
        {
          scale: 1,
          ease: "power1.out",
        },
        ">"
      );
    },
  });
});

// ?¤section.need
$(function () {
  if (!$(".container").hasClass("sw")) return;

  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  ScrollTrigger.matchMedia({
    "(min-width: 1401px)": function () {
      gsap.set(".need .objs_wrap", { opacity: 0, scale: 0.5, x: 300, y: -600 });
    },
    "(max-width: 1400px)": function () {
      gsap.set(".need .objs_wrap", { opacity: 1, scale: 1, x: 0, y: 0 });
    },
  });

  const bimTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".need",
      start: "top center",
      end: "bottom center",
      scrub: true,
      // markers: true,
      onEnter: playVideoFromStart,
      onEnterBack: playVideoFromStart,
    },
  });

  function playVideoFromStart() {
    const video = document.querySelector(".need .objs_wrap video");
    const pointImg = document.querySelector(".need .objs_wrap img.point");

    video.currentTime = 0;
    video.play().catch((e) => console.warn("Video play failed:", e));

    gsap.set(pointImg, { opacity: 0, xPercent: -25 });
    gsap.to(pointImg, {
      delay: 3.2, // 00ì´????¬ìƒ
      opacity: 1,
      x: 0,
      xPercent: 0,
      y: 0,
      duration: 1.5,
      ease: "power2.out",
    });
  }
  ScrollTrigger.matchMedia({
    "(min-width: 1401px)": function () {
      // ?¬ë¬¼??ê²½ë¡œ ì§€??
      bimTL.to(".need .objs_wrap", {
        motionPath: {
          path: [
            { x: 50, y: -400 },
            { x: 0, y: 0 },
          ],
          curviness: 1.5,
          autoRotate: false,
        },
        opacity: 1,
        scale: 1.1,
        ease: "power1.out",
      });

      bimTL.to(
        ".need .objs_wrap",
        {
          scale: 1,
          ease: "power1.out",
        },
        ">"
      );
    },
  });
});

// ?¤section.dir
$(function () {
  if (!$(".container").hasClass("sw")) return;

  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  ScrollTrigger.matchMedia({
    "(min-width: 1401px)": function () {
      gsap.set(".dir .objs_wrap", { opacity: 0, scale: 0.5, x: -200, y: -500 });
    },
    "(max-width: 1400px)": function () {
      gsap.set(".dir .objs_wrap", { opacity: 1, scale: 1, x: 0, y: 0 });
    },
  });

  const bimTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".dir",
      start: "top center",
      end: "bottom center",
      scrub: true,
      // markers: true,
      onEnter: playVideoFromStart,
      onEnterBack: playVideoFromStart,
    },
  });

  function playVideoFromStart() {
    const video = document.querySelector(".dir .objs_wrap video");

    video.currentTime = 0;
    video.play().catch((e) => console.warn("Video play failed:", e));
  }

  ScrollTrigger.matchMedia({
    "(min-width: 1401px)": function () {
      // ?¬ë¬¼??ê²½ë¡œ ì§€??
      bimTL.to(".dir .objs_wrap", {
        motionPath: {
          path: [
            { x: 50, y: 0 },
            { x: 0, y: 0 },
          ],
          curviness: 1.5,
          autoRotate: false,
        },
        opacity: 1,
        scale: 1.1,
        ease: "power1.out",
      });

      bimTL.to(
        ".dir .objs_wrap",
        {
          scale: 1,
          ease: "power1.out",
        },
        ">"
      );
    },
  });
});
// E : objs_wrap ?˜í??˜ê¸°

// ?“Œ?“Œ?“Œ dt_use.html??SCRIPT
// ?’šS : objs_wrap ?˜í??˜ê¸°
// ?¤section.overview
$(function () {
  if (!$(".container").hasClass("use")) return;
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  const bimTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".overview",
      start: "70% center",
      end: "bottom bottom",
      scrub: true,
      // markers: true,
    },
  });
});

// ?¤section.process
$(function () {
  if (!$(".container").hasClass("use")) return;

  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  ScrollTrigger.matchMedia({
    "(min-width: 1401px)": function () {
      gsap.set(".process .objs_wrap", {
        opacity: 0,
        scale: 0.5,
        x: -150,
        y: -500,
      });
    },
    "(max-width: 1400px)": function () {
      gsap.set(".process .objs_wrap", {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
      });
    },
  });
  const bimTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".process",
      start: "top center",
      end: "bottom center",
      scrub: true,
      // markers: true,
      onEnter: imgPointStart,
      onEnterBack: imgPointStart,
    },
  });

  function imgPointStart() {
    const pointImg = document.querySelector(".process .objs_wrap img.point");
    gsap.set(pointImg, { opacity: 0, xPercent: 25 });
    ScrollTrigger.matchMedia({
      "(min-width: 1401px)": function () {
        gsap.to(pointImg, {
          delay: 1, // 00ì´????¬ìƒ
          opacity: 1,
          x: 0,
          xPercent: 0,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
        });
      },
      "(max-width: 1400px)": function () {
        gsap.to(pointImg, {
          delay: 1, // 00ì´????¬ìƒ
          opacity: 1,
          x: 0,
          xPercent: 0,
          y: 0,
          duration: 1,
          ease: "power2.out",
        });
      },
    });
  }

  ScrollTrigger.matchMedia({
    "(min-width: 1401px)": function () {
      // ?¬ë¬¼??ê²½ë¡œ ì§€??
      bimTL.to(".process .objs_wrap", {
        motionPath: {
          path: [
            { x: -50, y: -400 },
            { x: 0, y: 0 },
          ],
          curviness: 1.5,
          autoRotate: false,
        },
        opacity: 1,
        scale: 1.1,
        ease: "power1.out",
      });

      bimTL.to(
        ".process .objs_wrap",
        {
          scale: 1,
          ease: "power1.out",
        },
        ">"
      );
    },
  });
});

// ?¤section.system
$(function () {
  if (!$(".container").hasClass("use")) return;

  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  ScrollTrigger.matchMedia({
    "(min-width: 1401px)": function () {
      gsap.set(".system .objs_wrap", {
        opacity: 0,
        scale: 0.5,
        x: 300,
        y: -500,
      });
    },
    "(max-width: 1401px)": function () {
      gsap.set(".system .objs_wrap", {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
      });
    },
  });

  const bimTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".system",
      start: "top center",
      end: "bottom center",
      scrub: true,
      // markers: true,
      onEnter: playVideoFromStart,
      onEnterBack: playVideoFromStart,
    },
  });

  function playVideoFromStart() {
    const video = document.querySelector(".system .objs_wrap video");
    const pointImg = document.querySelector(".system .objs_wrap img.point");

    video.currentTime = 0;
    video.play().catch((e) => console.warn("Video play failed:", e));

    gsap.set(pointImg, { opacity: 0, yPercent: 15 });

    gsap.to(pointImg, {
      delay: 0.8, // 00ì´????¬ìƒ
      opacity: 1,
      y: 0,
      yPercent: 0,
      x: 0,
      duration: 1,
      ease: "power2.out",
    });
  }

  ScrollTrigger.matchMedia({
    "(min-width: 1401px)": function () {
      // ?¬ë¬¼??ê²½ë¡œ ì§€??
      bimTL.to(".system .objs_wrap", {
        motionPath: {
          path: [
            { x: 200, y: -400 },
            { x: 0, y: 0 },
          ],
          curviness: 1.5,
          autoRotate: false,
        },
        opacity: 1,
        scale: 1.1,
        ease: "power1.out",
      });

      bimTL.to(
        ".system .objs_wrap",
        {
          scale: 1,
          ease: "power1.out",
        },
        ">"
      );
    },
  });
});

// ?¤section.cycle
$(function () {
  if (!$(".container").hasClass("use")) return;

  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  ScrollTrigger.matchMedia({
    "(min-width: 1401px)": function () {
      gsap.set(".cycle .objs_wrap", {
        opacity: 0,
        scale: 0.5,
        x: -300,
        y: -300,
      });
    },
    "(max-width: 1400px)": function () {
      gsap.set(".cycle .objs_wrap", {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
      });
    },
  });

  const bimTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".cycle",
      start: "top center",
      end: "bottom center",
      scrub: true,
      // markers: true,
      onEnter: imgPointStart,
      onEnterBack: imgPointStart,
    },
  });

  function imgPointStart() {
    const pointImg = document.querySelector(".cycle .objs_wrap img.point");
    gsap.set(pointImg, { opacity: 0, xPercent: 25 });
    ScrollTrigger.matchMedia({
      "(min-width: 1401px)": function () {
        gsap.to(pointImg, {
          delay: 0, // 00ì´????¬ìƒ
          opacity: 1,
          x: 0,
          xPercent: 0,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
        });
      },
      "(max-width: 1400px)": function () {
        gsap.to(pointImg, {
          delay: 0.8, // 00ì´????¬ìƒ
          opacity: 1,
          x: 0,
          xPercent: 0,
          y: 0,
          duration: 1,
          ease: "power2.out",
        });
      },
    });
  }

  ScrollTrigger.matchMedia({
    "(min-width: 1401px)": function () {
      // ?¬ë¬¼??ê²½ë¡œ ì§€??
      bimTL.to(".cycle .objs_wrap", {
        motionPath: {
          path: [
            { x: -50, y: -100 },
            { x: 0, y: 0 },
          ],
          curviness: 1.5,
          autoRotate: false,
        },
        opacity: 1,
        scale: 1.1,
        ease: "power1.out",
      });

      bimTL.to(
        ".cycle .objs_wrap",
        {
          scale: 1,
          ease: "power1.out",
        },
        ">"
      );
    },
  });
});
// E : objs_wrap ?˜í??˜ê¸°

//?’š S: ë¡œí‹° ? ë‹ˆë©”ì´??
$(function () {
  if (!$(".container").hasClass("use")) return;

  let animation = bodymovin.loadAnimation({
    container: document.getElementById("js__lottie"),
    renderer: "svg",
    loop: true, //ë°˜ë³µ?¬ìƒ
    autoplay: true, //?ë™?¬ìƒ
    path: "../assets/img/dt/use_end_obj3.json",
  });
  // animation.setSpeed(0.2); //ê¸°ë³¸?ë„ : 1
});
// E: ë¡œí‹° ? ë‹ˆë©”ì´??
