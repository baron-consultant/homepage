// ?�� AJAX 관??SCRIPT
$(function () {
  const rootPrefix = location.pathname.startsWith('/baron/') ? '/baron' : '';

  // EGBIM은 4-level 깊이 (/ko/egbim/)
  // TOVA/GAIA는 3-level 깊이 (/ko/tova/, /ko/gaia/)
  const isEgbim = location.pathname.includes('/egbim/');
  const isTovOrGaia = location.pathname.includes('/tova/') || location.pathname.includes('/gaia/');
  
  // 배포는 도메인 루트 기준, 로컬 /baron 경로면 prefix를 자동 반영
  let includeBase;
  if (isEgbim) {
    includeBase = `${rootPrefix}/_include`;
  } else if (isTovOrGaia) {
    includeBase = `${rootPrefix}/_include`;
  } else {
    includeBase = `${rootPrefix}/_include`;
  }

  $.ajaxSetup({ cache: false });

  function loadHTML(url, target, callback) {
    $.ajax({
      url: url,
      async: true,
      timeout: 5000,
      success: function (data) {
        $(target).html(data);
        if (typeof callback === "function") callback();
      },
      error: function (xhr, status, error) {
        console.error(`??Failed to load ${url}:`, error || status);
        if (typeof callback === "function") callback();
      },
    });
  }

  // ?��nav ?�결
  function connectNavToMapList() {
    const currentPath = location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(
      "header .corp nav ol li.depth1 ul.depth2 li a"
    );

    navLinks.forEach((link) => {
      const href = link.getAttribute("href").split("/").pop();
      if (href === currentPath) {
        const mapList = document.querySelector(".map_list");
        if (mapList) {
          const targetTitle = link.textContent.trim();
          const categoryTitle = link
            .closest(".depth1")
            ?.querySelector("span")
            ?.textContent.trim();
          const subTitle = link
            .closest(".depth1")
            ?.querySelector("em")
            ?.textContent.trim();
          const mainTitle = categoryTitle.replace(subTitle, "");
          mapList.innerHTML = "";
          link.closest(".depth1").classList.add("active");
          const liHome = document.createElement("li");
          liHome.innerHTML = '<i class="home"></i>';

          const liCategory = document.createElement("li");
          liCategory.textContent = mainTitle || "";

          const liOn = document.createElement("li");
          liOn.classList.add("on");
          liOn.textContent = targetTitle || "";

          mapList.appendChild(liHome);
          mapList.appendChild(liCategory);
          mapList.appendChild(liOn);
        }
      }
    });
  }
  // ?��header ??nav.html ?�결
  if (!$(".container").hasClass("recruit")) {
    loadHTML(`${includeBase}/header.html`, "#header", function () {
      loadHTML(`${includeBase}/nav.html`, "#header .corp .nav", function () {
        connectNavToMapList();
      });
    });
  } else {
    loadHTML(`${includeBase}/header_recruit.html`, "#header_recruit", function () {
      if (!$(".container").hasClass("recruit")) {
      } else {
        const currentPath = location.pathname.split("/").pop();
        const navLinks = document.querySelectorAll(
          "header .recruit nav ol li.depth1 a"
        );
        navLinks.forEach((link) => {
          const href = link.getAttribute("href").split("/").pop();
          if (href === currentPath) {
            link.closest(".depth1").classList.add("active");
          }
        });
      }
    });
  }

  // ?��sitemap ??nav.html ?�결
  if (!$(".container").hasClass("recruit")) {
    loadHTML(`${includeBase}/nav.html`, ".popup_wrap.sitemap .popup_contents_wrap nav");
  } else {
    loadHTML(`${includeBase}/nav_recruit.html`, ".popup_wrap.sitemap .popup_contents_wrap nav");
  }

  // ?��footer ??nav.html ?�결
  loadHTML(`${includeBase}/footer.html`, "#footer", function () {
    loadHTML(`${includeBase}/nav.html`, "#footer .nav", function () {
      // depth3 항목 숨기기 (TOVA, GAIA, EGBIM 초기 상태)
      $("#footer .nav ol li.has_depth3 > .depth3").hide();
    });
  });
  mobileMenu();
});

// ?�� TITLE 관??SCRIPT
// ?��  S: title ?�일?�기

$(function () {
  const currentPath = location.pathname;
  if (currentPath.indexOf("/recruit/") > 0) {
    document.querySelector("head title").textContent =
      "인재채용 | (주)바론컨설턴트";
  } else {
    document.querySelector("head title").textContent = "(주)바론컨설턴트";
  }
});

// E : title ?�일?�기

// ?�� S : header ?�기�?
$(function () {
  const showNav = gsap
    .from("#header, #header_recruit", {
      yPercent: -200,
      paused: true,
      duration: 0.2,
      onStart: () => {
        const stHeader = document.querySelector("header");
        if (window.scrollY > 100) {
          stHeader.classList.add("open");
        }
      },
      onReverseComplete: () => {
        const stHeader = document.querySelector("header");
        stHeader.classList.remove("open");
      },
    })
    .progress(1);

  ScrollTrigger.create({
    start: "top top",
    end: 99999,
    onUpdate: (self) => {
      if (lenis && lenis.isStopped) return;
      self.direction === -1 ? showNav.play() : showNav.reverse();
    },
  });
});
// E : header ?�기�?

// ?�� POPUP SCRIPT
// ?��S : ?�업 ?�기
// ?��S : ?�업 ?�기
$(function () {
  $(document).on("click", "button", function () {
    const button = this;
    const value = button.getAttribute("data-value");
    const popup = document.querySelector(`.popup_wrap.${value}`);

    if (popup) {
      // ?�재 ?�크�??�치 ?�??
      const scrollY = window.scrollY;
      document.body.setAttribute("data-scroll-lock", scrollY);

      // body 고정
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";

      // Lenis ?�전 중�?
      if (lenis) {
        lenis.destroy();
      }

      // ?�업 ?�시
      popup.style.display = "block";

      // ?�업 ?��? ?�치 ?�크�?강제 ?�성??
      const popupContents = popup.querySelector(".popup_contents_wrap");
      if (popupContents) {
        popupContents.removeAttribute("data-lenis-prevent-wheel");
        popupContents.removeAttribute("data-lenis-prevent");
        popupContents.style.cssText = `
          overflow-y: auto !important;
          -webkit-overflow-scrolling: touch !important;
          overscroll-behavior: contain !important;
          height: 100vh !important;
          touch-action: pan-y !important;
        `;

        // ?�치 ?�벤??강제 ?�용
        popupContents.addEventListener(
          "touchstart",
          function (e) {
            e.stopPropagation();
          },
          { passive: true }
        );

        popupContents.addEventListener(
          "touchmove",
          function (e) {
            e.stopPropagation();
          },
          { passive: true }
        );
      }
    }
  });
});
// E : ?�업 ?�기

// ?��S : ?�업 ?�기
$(function () {
  $(document).on("click", function (e) {
    const $target = $(e.target);

    // ?��?�기 버튼 ?�릭 ??
    if ($target.closest(".btn_close").length) {
      const $popupWrap = $target.closest(".popup_wrap");
      if ($popupWrap.length) {
        $popupWrap.hide();
        enableBodyScroll();
      }
      return;
    }

    // ?��popup_contents_wrap ?�릭 ?�도 ?�함?�서 ?�기
    const $popupContents = $target.closest(".popup_contents_wrap");
    if ($popupContents.length && $target.is(".popup_contents_wrap")) {
      const $popupWrap = $target.closest(".popup_wrap");
      if ($popupWrap.length) {
        $popupWrap.hide();
        enableBodyScroll();
      }
    }
  });

  // ?��?�업 ?�힐 ??body ?�크�??�성??
  function enableBodyScroll() {
    // body ?�크�??�치 복원
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo({
      top: parseInt(scrollY || "0") * -1,
      left: 0,
      behavior: "instant", // ?�는 'auto'
    });

    // Lenis ?�시??
    handleStartLenis();
  }
});
// E : ?�업 ?�기

// ?��S : map list ?�직이�? /* 250604추�??�� */
let lastScrollY = window.scrollY;
const stickyBox = document.querySelector(".map_list");

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  const width = window.innerWidth;
  if (width > 1440) {
    //250604 추�?
    if (stickyBox != null) {
      if (currentScrollY > lastScrollY) {
        // ?�래�??�크롤할 ??
        stickyBox.style.top = "24px";
      } else {
        // ?�로 ?�크롤할 ??
        stickyBox.style.top = "124px";
      }
    }
  } else {
    if (stickyBox != null) {
      if (currentScrollY > lastScrollY) {
        // ?�래�??�크롤할 ??
        stickyBox.style.top = "24px";
      } else {
        // ?�로 ?�크롤할 ??
        stickyBox.style.top = "74px";
      }
    }
  }

  lastScrollY = currentScrollY;
});
// E : map list ?�직이�?

// ?�� SCROLL SCRIPT
// ?��AOS
if (window.AOS && typeof window.AOS.init === "function") {
  window.AOS.init();
}

// ?��Lenis

let lenis;
let lenisTickerCallback;

function handleStartLenis() {
  if (lenisTickerCallback) {
    gsap.ticker.remove(lenisTickerCallback);
    lenisTickerCallback = null;
  }

  if (lenis) {
    lenis.destroy();
    lenis = null;
  }

  if (typeof window.Lenis !== "function") {
    return;
  }

  lenis = new Lenis({
    lerp: 0.1, // ?�크롤의 부?�러???�도
    smoothWheel: true,
    smoothTouch: false,
  });

  lenisTickerCallback = (time) => {
    if (!lenis || typeof lenis.raf !== "function") return;
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(lenisTickerCallback);
  gsap.ticker.lagSmoothing(0);
}
handleStartLenis();

export default lenis;

// ?�� 로드 UI fallback ?�제
function releaseLoadingUI() {
  document.documentElement.classList.remove("loading");
  document.body.classList.remove("loading", "is-loading");

  [".loading", ".loading_wrap", ".loader", ".preloader"].forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.style.display = "none";
      el.setAttribute("aria-hidden", "true");
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", releaseLoadingUI, { once: true });
} else {
  releaseLoadingUI();
}

window.addEventListener("load", releaseLoadingUI, { once: true });
window.setTimeout(releaseLoadingUI, 5000);
window.addEventListener("pageshow", releaseLoadingUI);
window.addEventListener("error", releaseLoadingUI);
window.addEventListener("unhandledrejection", releaseLoadingUI);

function mobileMenu() {
  const mNav = document.querySelectorAll(".sitemap ol > li.depth1");

  mNav.forEach((item, index) => {
    item.addEventListener("click", function () {
      if (mNav.length - 1 != index) {
        const width = window.innerWidth;
        if (width <= 1440) {
          const depth2 = item.querySelector(".depth2");
          if (!item.classList.contains("active")) {
            item.classList.add("active");
            // ?�라?�드 ?�운
            depth2.style.maxHeight = depth2.scrollHeight + "px";
          } else {
            item.classList.remove("active");
            // ?�라?�드 ??
            depth2.style.maxHeight = null;
          }
        }
      }
    });
  });
}
