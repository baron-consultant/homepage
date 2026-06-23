// ?“Œ AJAX ê´€??SCRIPT
$(function () {
  $.ajaxSetup({ cache: false });

  function loadHTML(url, target, callback) {
    $.ajax({
      url: url,
      async: true,
      success: function (data) {
        $(target).html(data);
        if (typeof callback === "function") callback();
      },
      error: function (xhr, status, error) {
        console.error(`??Failed to load ${url}:`, error);
      },
    });
  }

  // ?’šnav ?°ê²°
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
  // ?’šheader ??nav.html ?°ê²°
  if (!$(".container").hasClass("recruit")) {
    loadHTML("../_include/eng/header.html", "#header", function () {
      loadHTML("../_include/eng/nav.html", "#header .corp .nav", function () {
        connectNavToMapList();
      });
    });
  } else {
    loadHTML("../_include/eng/header_recruit.html", "#header_recruit", function () {
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

  // ?’šsitemap ??nav.html ?°ê²°
  if (!$(".container").hasClass("recruit")) {
    loadHTML(
      "../_include/eng/nav.html",
      ".popup_wrap.sitemap .popup_contents_wrap nav"
    );
  } else {
    loadHTML(
      "../_include/eng/nav_recruit.html",
      ".popup_wrap.sitemap .popup_contents_wrap nav"
    );
  }

  // ?’šfooter ??nav.html ?°ê²°
  loadHTML("../_include/eng/footer.html", "#footer", function () {
    loadHTML("../_include/eng/nav.html", "#footer .nav");
  });
  mobileMenu();
});

// ?“Œ TITLE ê´€??SCRIPT
// ?’š  S: title ?µì¼?˜ê¸°

$(function () {
  const currentPath = location.pathname;
  if (currentPath.indexOf("/recruit/") > 0) {
    document.querySelector("head title").textContent =
      "?¸ìž¬ì±„ìš© | (ì£?ë°”ë¡ ì»¨ì„¤?´íŠ¸";
  } else {
    document.querySelector("head title").textContent = "BaronConsultant";
  }
});

// E : title ?µì¼?˜ê¸°

// ?’š S : header ?¨ê¸°ê¸?
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
      if (lenis.isStopped) return;
      self.direction === -1 ? showNav.play() : showNav.reverse();
    },
  });
});
// E : header ?¨ê¸°ê¸?

// ?“Œ POPUP SCRIPT
// ?’šS : ?ì—… ?´ê¸°
// ?’šS : ?ì—… ?´ê¸°
$(function () {
  $(document).on("click", "button", function () {
    const button = this;
    const value = button.getAttribute("data-value");
    const popup = document.querySelector(`.popup_wrap.${value}`);

    if (popup) {
      // ?„ìž¬ ?¤í¬ë¡??„ì¹˜ ?€??
      const scrollY = window.scrollY;
      document.body.setAttribute('data-scroll-lock', scrollY);
      
      // body ê³ ì •
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      
      // Lenis ?„ì „ ì¤‘ì?
      if (lenis) {
        lenis.destroy();
      }
      
      // ?ì—… ?œì‹œ
      popup.style.display = 'block';
      
      // ?ì—… ?´ë? ?°ì¹˜ ?¤í¬ë¡?ê°•ì œ ?œì„±??
      const popupContents = popup.querySelector('.popup_contents_wrap');
      if (popupContents) {
        popupContents.removeAttribute('data-lenis-prevent-wheel');
        popupContents.removeAttribute('data-lenis-prevent');
        popupContents.style.cssText = `
          overflow-y: auto !important;
          -webkit-overflow-scrolling: touch !important;
          overscroll-behavior: contain !important;
          height: 100vh !important;
          touch-action: pan-y !important;
        `;
        
        // ?°ì¹˜ ?´ë²¤??ê°•ì œ ?ˆìš©
        popupContents.addEventListener('touchstart', function(e) {
          e.stopPropagation();
        }, { passive: true });
        
        popupContents.addEventListener('touchmove', function(e) {
          e.stopPropagation();
        }, { passive: true });
      }
    }
  });
});
// E : ?ì—… ?´ê¸°

// ?’šS : ?ì—… ?«ê¸°
$(function () {
  $(document).on("click", function (e) {
    const $target = $(e.target);

    // ?¤?«ê¸° ë²„íŠ¼ ?´ë¦­ ??
    if ($target.closest(".btn_close").length) {
      const $popupWrap = $target.closest(".popup_wrap");
      if ($popupWrap.length) {
        $popupWrap.hide();
        enableBodyScroll();
      }
      return;
    }

    // ?¤popup_contents_wrap ?´ë¦­ ?œë„ ?¬í•¨?´ì„œ ?«ê¸°
    const $popupContents = $target.closest(".popup_contents_wrap");
    if ($popupContents.length && $target.is(".popup_contents_wrap")) {
      const $popupWrap = $target.closest(".popup_wrap");
      if ($popupWrap.length) {
        $popupWrap.hide();
        enableBodyScroll();
      }
    }
  });

  // ?¤?ì—… ?«íž ??body ?¤í¬ë¡??œì„±??
  function enableBodyScroll() {
    // body ?¤í¬ë¡??„ì¹˜ ë³µì›
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    
    // Lenis ?¬ì‹œ??
    lenis.start();
  }
});
// E : ?ì—… ?«ê¸°

// ?’šS : map list ?€ì§ì´ê¸? /* 250604ì¶”ê??’¦ */
let lastScrollY = window.scrollY;
const stickyBox = document.querySelector(".map_list");

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  const width = window.innerWidth;
  if (width > 1440) {
    //250604 ì¶”ê?
    if (stickyBox != null) {
      if (currentScrollY > lastScrollY) {
        // ?„ëž˜ë¡??¤í¬ë¡¤í•  ??
        stickyBox.style.top = "24px";
      } else {
        // ?„ë¡œ ?¤í¬ë¡¤í•  ??
        stickyBox.style.top = "124px";
      }
    }
  } else {
    if (stickyBox != null) {
      if (currentScrollY > lastScrollY) {
        // ?„ëž˜ë¡??¤í¬ë¡¤í•  ??
        stickyBox.style.top = "24px";
      } else {
        // ?„ë¡œ ?¤í¬ë¡¤í•  ??
        stickyBox.style.top = "74px";
      }
    }
  }

  lastScrollY = currentScrollY;
});
// E : map list ?€ì§ì´ê¸?

// ?“Œ SCROLL SCRIPT
// ?’šAOS
AOS.init();

// ?’šLenis

let lenis;

function handleStartLenis() {
  lenis = new Lenis({
    lerp: 0.1, // ?¤í¬ë¡¤ì˜ ë¶€?œëŸ¬???•ë„
    smoothWheel: true,
    smoothTouch: false,
  });
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}
handleStartLenis();

export default lenis;

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
            // ?¬ë¼?´ë“œ ?¤ìš´
            depth2.style.maxHeight = depth2.scrollHeight + "px";
          } else {
            item.classList.remove("active");
            // ?¬ë¼?´ë“œ ??
            depth2.style.maxHeight = null;
          }
        }
      }
    });
  });
}
