// 💚S : svg 라인 그리기
$(function () {
  gsap.registerPlugin(ScrollTrigger);

  const path = document.querySelectorAll("[class^=objs_line] svg path");

  for (let i = 0; i < path.length; i++) {
    const pathLength = path[i].getTotalLength();

    path[i].style.stroke = "url(#lineGradient2)";
    path[i].style.strokeWidth = "2";
    path[i].style.fill = "none";
    path[i].style.strokeDasharray = pathLength;
    path[i].style.strokeDashoffset = pathLength;

    gsap.to(path[i], {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: ".objs_line_" + (i + 1),
        start: "top center",
        end: "bottom bottom",
        scrub: 3,
        // markers: true,
      },
      ease: "none",
    });
  }
});
// E : svg 라인 그리기



// 💚S : 바론 뉴스 SVG 라인 자동 맞춤
$(function () {
  gsap.registerPlugin(ScrollTrigger);

  const newsMain = document.querySelector(".pr.news section.news_main");
  const bgLine = document.querySelector(".pr.news .bg_line");
  const svg = document.querySelector(".pr.news .bg_line svg");
  const path = document.querySelector(".pr.news #animatedLine");
  const maskPath = document.querySelector(".pr.news #maskPath");

  if (!newsMain || !bgLine || !svg || !path) return;

  let lineTween = null;
  let resizeTimer = null;

  const round = function (num) {
    return Math.round(num * 100) / 100;
  };

  function buildNewsLinePath() {
    const items = Array.from(newsMain.querySelectorAll(".news_list > a > li"));

    if (!items.length) return false;

    const mainRect = newsMain.getBoundingClientRect();
    const firstRect = items[0].getBoundingClientRect();
    const lastRect = items[items.length - 1].getBoundingClientRect();

    const width = Math.max(1, round(newsMain.clientWidth));
    const height = Math.max(1, round(newsMain.offsetHeight));

    const centerX = round(width / 2);
    const outerLeftX = 2;
    const outerRightX = round(width - 2);
    const radius = round(Math.min(120, Math.max(72, width * 0.09)));
    const leftX = radius;
    const rightX = round(width - radius);
    const curveK = 0.55228475;

    const bounds = [];

    bounds.push(round(firstRect.top - mainRect.top));

    for (let i = 0; i < items.length - 1; i++) {
      const currentRect = items[i].getBoundingClientRect();
      const nextRect = items[i + 1].getBoundingClientRect();
      bounds.push(round((currentRect.bottom + nextRect.top) / 2 - mainRect.top));
    }

    bounds.push(round(lastRect.bottom - mainRect.top));

    const startY = Math.max(0, round(bounds[0] - 90));
    const endY = Math.min(height, round(bounds[bounds.length - 1] + 90));

    let d = "M" + centerX + " " + startY + "V" + bounds[0];
    let direction = "right";

    for (let i = 0; i < bounds.length - 1; i++) {
      const y1 = bounds[i];
      const y2 = bounds[i + 1];
      const midY = round((y1 + y2) / 2);
      const halfH = round((y2 - y1) / 2);
      const cpX = round(radius * curveK);
      const cpY = round(halfH * curveK);

      if (direction === "right") {
        d += "H" + rightX;
        d += "C" + round(rightX + cpX) + " " + y1 + " " + outerRightX + " " + round(midY - cpY) + " " + outerRightX + " " + midY;
        d += "C" + outerRightX + " " + round(midY + cpY) + " " + round(rightX + cpX) + " " + y2 + " " + rightX + " " + y2;
        direction = "left";
      } else {
        d += "H" + leftX;
        d += "C" + round(leftX - cpX) + " " + y1 + " " + outerLeftX + " " + round(midY - cpY) + " " + outerLeftX + " " + midY;
        d += "C" + outerLeftX + " " + round(midY + cpY) + " " + round(leftX - cpX) + " " + y2 + " " + leftX + " " + y2;
        direction = "right";
      }
    }

    d += "H" + centerX + "V" + endY;

    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", "0 0 " + width + " " + height);
    svg.setAttribute("preserveAspectRatio", "none");

    path.setAttribute("d", d);
    path.style.stroke = "url(#lineGradient)";
    path.style.strokeWidth = "3";
    path.style.fill = "none";

    if (maskPath) {
      maskPath.setAttribute("d", d);
      maskPath.style.strokeDasharray = "none";
      maskPath.style.strokeDashoffset = 0;
    }

    return true;
  }

  function initNewsLine() {
    if (lineTween) {
      if (lineTween.scrollTrigger) {
        lineTween.scrollTrigger.kill();
      }

      lineTween.kill();
      lineTween = null;
    }

    if (window.innerWidth <= 992) {
      ScrollTrigger.refresh();
      return;
    }

    if (!buildNewsLinePath()) return;

    const pathLength = path.getTotalLength();
    const visibleLength = Math.min(900, pathLength);

    path.style.strokeDasharray = visibleLength + " " + Math.max(pathLength - visibleLength, 0);
    path.style.strokeDashoffset = pathLength;

    lineTween = gsap.to(path, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: newsMain,
        start: "top center",
        end: "bottom center",
        scrub: 3,
        invalidateOnRefresh: true,
      },
      ease: "none",
    });

    ScrollTrigger.refresh();
  }

  initNewsLine();

  $(window).on("load", function () {
    initNewsLine();
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      initNewsLine();
    });
  }

  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(function () {
      initNewsLine();
    }, 150);
  });
});
// E : 바론 뉴스 SVG 라인 자동 맞춤