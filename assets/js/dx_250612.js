import lenis from "./common.js";

$(function () {
  gsap.registerPlugin(ScrollTrigger);

  /* gsap.set(".contents_wrap", { opactiy: 0, pointerEvents: "none" });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".dx",
      start: "top top",
      end: "+=10%", // 필요시 조절 가능
      pin: true,
      scrub: true,
    },
  });

  tl.to(".contents_wrap", {
    opacity: 1,
    duration: 0.5,
    pointerEvents: "initial",
  });
  */
});

$(function () {
  const images = [
    [
      "poster_p01.jpg",
      "도로건설의 디지털 전환은? BIM & OSC 구현 Total Solution",
      "a",
    ],
    [
      "poster_p02.jpg",
      "무책임한, 빨리빨리만 외치는, 아날로그 방식의 현재의 건설엔지니어링은 유죄",
      "a",
    ],
    [
      "poster_p03.jpg",
      "하던 대로만 하는 우리의 건설산업 이대로 괜찮은가요?",
      "a",
    ],
    ["poster_p04.jpg", "디지털전환 시대, 도면과 BIM모델을 하나의 S/W로", "a"],
    ["poster_p05.jpg", "용지 및 조서 작성 쉽고, 빠르고, 정확하게", "b"],
    ["poster_p06.jpg", "GIS + BIM + Web + 사업관리를 한번에", "b"],
    ["poster_p07.jpg", "KNGIL에서 공간정보의 꽃을 피우다", "b"],
    ["poster_p08.jpg", "건설 솔루션을 위한 디지털 GIS 공간을 만들다", "b"],
    [
      "poster_p09.jpg",
      "Web 기반 시추조사 및 지반정보 관리서비스 모든 지층 정보는 GAIA가 관리",
      "b",
    ],
    [
      "poster_p10.jpg",
      "데이터로 그리는 교통의 청사진 한국형 통합 교통 수요분석 프로그램",
      "b",
    ],
    ["poster_p11.jpg", "독자적 그래픽 엔진 자체 개발", "c"],
    [
      "poster_p12.jpg",
      "StrAna-Core 우리 기술로 자체 개발한 구조해석 엔진",
      "c",
    ],
    [
      "poster_p13.jpg",
      "StrAna 쉽고 편리한 모델링 환경, 빠르고 정확한 해석,",
      "c",
    ],
    ["poster_p14.jpg", "도로 설계·시공 엔지니어링 기술의 디지털 전환", "d"],
    ["poster_p15.jpg", "토공의 설계·시공", "d"],
    ["poster_p16.jpg", "배수공의 설계·시공", "d"],
    ["poster_p17.jpg", "포장공의 설계·시공", "d"],
    ["poster_p18.jpg", "부대공의 설계·시공", "d"],
    ["poster_p19.jpg", "쉽고, 빠른 BIM 기반 상·하수관로 설계", "d"],
    [
      "poster_p20.jpg",
      "기후변화 대응 및 직관적 단면결정을 위한 BIM 기반 배수 설계",
      "d",
    ],
    ["poster_p21.jpg", "BIM 기반 설계 및 시공 기술 Bulb T Girder", "e"],
    [
      "poster_p22.jpg",
      "독자적인 DfMA를 적용한 Nodular Girder, OSC 건설 교량 설계·시공 기술",
      "e",
    ],
    ["poster_p23.jpg", "BIM 기반 도로 구조물 Expert Systems & Soutions", "e"],
    [
      "poster_p24.jpg",
      "환경에 순응하고 사용자 편의성을 제공하는 BIM 기반 터널 설계·시공",
      "e",
    ],
    ["poster_p25.jpg", "이용자를 고려한 BIM 기반 횡단통로 설계·시공", "e"],
    [
      "poster_p26.jpg",
      "사용자 중심의 편안한, 안전에 충분한, 자연스러운 곡선형 옹벽",
      "e",
    ],
    [
      "poster_p27.jpg",
      "누구나 쉽고 빠르게 단가에서 공정관리까지 HM 단가·공정 Solution",
      "f",
    ],
    [
      "poster_p28.jpg",
      "Rectangular To Circle R2C 기술로 침수로부터 안전한 도시를 만듭니다",
      "f",
    ],
    [
      "poster_p29.jpg",
      "사회적 요구, 법 의무이행, 생산성과 품질확보 BIM 기반 시공상세도",
      "f",
    ],
    [
      "poster_p30.jpg",
      "GIS & BIM 기반 공정관리 지면이 공간이 되다. 터파기부터 도로건설까지",
      "f",
    ],
    [
      "poster_p31.jpg",
      "아직도 아바타를 핸드폰으로 보시나요? 도로건설 설계·시공 전용 공학용 사이니지",
      "f",
    ],
  ];

  const categoryOrder = ["a", "b", "c", "d", "e", "f"];
  const categoryTitles = {
    a: "D/X",
    b: "조사 및 GIS",
    c: "구조해석 및 엔지니어링",
    d: "BIM 도로 설계/시공",
    e: "BIM 구조물 설계/시공",
    f: "시공 및 유지관리",
  };

  // HTML 내 .filter li 텍스트 자동 삽입
  for (const key in categoryTitles) {
    $(`.filter li[data-category="${key}"]`).text(categoryTitles[key]);
  }

  const mainWrapper = document.getElementById("p-main");
  const thumbWrapper = document.getElementById("p-thumb");

  let mainSwiper, thumbSwiper;
  const categoryStartIndex = {};

  function createSlidesAllSorted() {
    mainWrapper.innerHTML = "";
    thumbWrapper.innerHTML = "";

    const sortedImages = categoryOrder.flatMap((category) =>
      images.filter((img) => img[2] === category)
    );

    // 카테고리별 시작 인덱스 계산
    const firstIndexByCategory = {};
    let currentIndex = 0;
    categoryOrder.forEach((category) => {
      const count = images.filter((img) => img[2] === category).length;
      if (count > 0) {
        categoryStartIndex[category] = currentIndex;
        firstIndexByCategory[category] = currentIndex;
        currentIndex += count;
      }
    });

    // 슬라이드 DOM 생성
    sortedImages.forEach(([filename, title, cate], i) => {
      const imgUrl = `/assets/img/dx/${filename}`;

      // 메인 슬라이드
      const mainSlide = document.createElement("div");
      mainSlide.className = "swiper-slide";
      mainSlide.innerHTML = `<img src="${imgUrl}" alt="${title}">`;
      mainWrapper.appendChild(mainSlide);

      // 썸네일 슬라이드
      const thumbSlide = document.createElement("div");
      thumbSlide.className = "swiper-slide";
      thumbSlide.innerHTML = `
          <div class="slide-box" data-cate="${cate}"><img src="${imgUrl}" alt="${title}"/>
          <p>${title}</p></div>`;
      thumbWrapper.appendChild(thumbSlide);
    });

    // 카테고리 타이틀 삽입
    let offset = 0;
    for (const category of categoryOrder) {
      const index = firstIndexByCategory[category];
      if (typeof index === "number") {
        const title = categoryTitles[category];
        const targetSlide = thumbWrapper.children[index + offset];
        const div = document.createElement("div");
        div.className = `slide_tit ${category}`;
        div.textContent = title;
        //thumbWrapper.insertBefore(div, targetSlide);
        $(targetSlide).prepend(div);
        //offset++; // 타이틀 하나 삽입될 때마다 offset 증가
      }
    }

    // 기존 swiper 제거
    if (mainSwiper) mainSwiper.destroy();
    if (thumbSwiper) thumbSwiper.destroy();

    // Swiper 초기화
    thumbSwiper = new Swiper(".thumbSwiper.img", {
      direction: "vertical",
      slidesPerView: "auto",
      mousewheel: true,
      spaceBetween: 10,
      freeMode: true,
      watchSlidesProgress: true,
      scrollbar: {
        el: ".thumbSwiper.img .swiper-scrollbar",
      },
      loop: false,
    });

    mainSwiper = new Swiper(".mainSwiper.img", {
      loop: true,
      mousewheel: true,
      navigation: {
        nextEl: ".mainSwiper.img .swiper-button-next",
        prevEl: ".mainSwiper.img .swiper-button-prev",
      },
      thumbs: {
        swiper: thumbSwiper,
      },
      on: {
        slideChangeTransitionStart: function () {},
        slideChangeTransitionEnd: function () {},
        slideChange: function () {
          const realIndex = this.realIndex;

          let currentCategory = null;
          let count = 0;

          for (const category of categoryOrder) {
            const imagesInCategory = images.filter(
              (img) => img[2] === category
            ).length;
            if (realIndex < count + imagesInCategory) {
              currentCategory = category;
              break;
            }
            count += imagesInCategory;
          }

          if (currentCategory) {
            $(".filter li").removeClass("on");
            $(`.filter li[data-category="${currentCategory}"]`).addClass("on");
          }
        },
      },
    });
  }

  $(".filter li").on("click", function () {
    const category = $(this).data("category");
    const index = categoryStartIndex[category];

    if (typeof index === "number" && mainSwiper) {
      mainSwiper.slideToLoop(index, 500);
    }

    $(".filter li").removeClass("on");
    $(this).addClass("on");

    // ✅ thumbSwiper 업데이트로 스크롤 영역 재계산
    setTimeout(() => {
      if (thumbSwiper) {
        thumbSwiper.update(); // Swiper 내부 구조 재계산
      }
    }, 100); // 약간의 딜레이를 두면 더 안정적
  });

  // 초기 실행
  createSlidesAllSorted();
});
var players = [];
$(function () {
  const videos = [
    ["bs0tqiY8H4E", "염솔천교 계절 변화", "a"],
    ["jnw_Ji8ojow", "대산당진 실사화", "a"],
    ["TWUD65ivJiY", "도하4교", "b"],
    ["Q2SWEAv5h2g", "안동수상대로", "b"],
    ["ZNKk3W5Wy5o", "부산 영화의전당", "b"],
  ];

  const categoryVideoOrder = ["a", "b", "c"];
  const categoryVideoTitles = {
    a: "카테고리 A",
    b: "카테고리 B",
    c: "카테고리 C",
  };

  function onYouTubeIframeAPIReady() {
    // 영상 ID 배열 (슬라이드마다 다른 영상)
    // 각 슬라이드에 대해 YouTube 플레이어를 생성
    window.YT.ready(function () {
      videos.forEach(function ([videoID, title], index) {
        players[index] = new window.YT.Player("player" + index, {
          height: "100%",
          width: "100%",
          videoId: videoID, // 유튜브 영상 ID
          playerVars: {
            autoplay: 1, // 자동 재생
            controls: 1, // 컨트롤러 표시
            rel: 0, // 관련 동영상 표시 안함
            showinfo: 0, // 영상 정보 안 보이게
            modestbranding: 1, // 브랜딩 최소화
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
      });
    });
  }
  function onPlayerReady(event) {
    //event.target.stopVideo();
    event.target.playVideo();
  }
  function onPlayerStateChange(event) {
    if (event.data == "0") {
      event.target.seekTo(0);
      event.target.stopVideo();
    }
  }

  for (const key in categoryVideoTitles) {
    //$(`.filter li[data-category="${key}"]`).text(categoryVideoTitles[key]);
  }

  const mainVideoWrapper = document.getElementById("v-main");
  const thumVideobWrapper = document.getElementById("v-thumb");

  let mainVideoSwiper, thumbVideoSwiper;
  const categoryStartIndex = {};

  function createSlidesAllSorted() {
    mainVideoWrapper.innerHTML = "";
    thumVideobWrapper.innerHTML = "";

    const sortedVideos = categoryVideoOrder.flatMap((category) =>
      videos.filter((v) => v[2] === category)
    );

    sortedVideos.forEach(([videoId, title], i) => {
      const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      const videoUrl = `https://www.youtube.com/embed/${videoId}?rel=0&controls=1`; // 메인 슬라이드: iframe

      const mainSlide = document.createElement("div");
      mainSlide.className = "swiper-slide";
      //mainSlide.innerHTML = `<iframe src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      //mainSlide.innerHTML = `<div id="player${i}"></div>`;

      mainSlide.innerHTML = `<div class="swiper-slide">
            <div class="video_box">
                <iframe
                  id="player${i}"
                  data-src="https://drive.google.com/file/d/1YQoZNlK6nTRAPE-N7H6bMBqjcsVlSu6U/preview"
                  src=""
                  width="640"
                  height="480"
                  allow="autoplay"
                ></iframe>
                </div>
          </div>`;

      mainVideoWrapper.appendChild(mainSlide); // 썸네일 슬라이드: 이미지 + 제목

      const thumbSlide = document.createElement("div");
      thumbSlide.className = "swiper-slide";
      thumbSlide.innerHTML = `
         <div class="slide-box"><img src="${thumbUrl}" alt="${title}"/>
        <p>${title}</p></div>`;
      thumVideobWrapper.appendChild(thumbSlide);
    }); // 카테고리 타이틀

    if (mainVideoSwiper) mainVideoSwiper.destroy();
    if (thumbVideoSwiper) thumbVideoSwiper.destroy();

    thumbVideoSwiper = new Swiper(".thumbSwiper.vod", {
      direction: "vertical",
      slidesPerView: "auto",
      spaceBetween: 10,
      freeMode: true,
      mousewheel: true,
      watchSlidesProgress: true,
      scrollbar: {
        el: ".thumbSwiper.vod .swiper-scrollbar",
      },
      loop: false,
    });

    mainVideoSwiper = new Swiper(".mainSwiper.vod", {
      loop: true,
      mousewheel: true,
      navigation: {
        nextEl: ".mainSwiper.vod .swiper-button-next",
        prevEl: ".mainSwiper.vod .swiper-button-prev",
      },
      thumbs: {
        swiper: thumbVideoSwiper,
      },
      on: {
        init: function () {
          var activeIndex = this.activeIndex;
          const iframe = document.getElementById("player0");
          iframe.src = iframe.dataset.src;
        },
        slideChangeTransitionStart: function (swiper) {
          var activeIndex = swiper.realIndex;
          players.forEach(function (player, index) {
            const iframe = document.getElementById("player" + index);
            const iframeSrc = iframe.dataset.src;
            if (index !== activeIndex) {
              iframe.src = "";
            } else {
              iframe.src = iframe.dataset.src;
            }
          });
        },
        slideChange: function () {
          /*
          var activeIndex = this.activeIndex;
          players.forEach(function (player, index) {
            if (index !== activeIndex) {
              player.pauseVideo(); // 다른 슬라이드 영상 일시정지
            } else {
              player.playVideo();
            }
          });
          */
        },
      },
    });
  }

  createSlidesAllSorted();

  onYouTubeIframeAPIReady();
});

$(function () {
  $(".tab_menu li").on("click", function () {
    const $this = $(this);
    const idx = $this.index();

    if (!$this.hasClass("on")) {
      $(".tab_menu li").removeClass("on");
      $this.addClass("on");
      $(".tab_item_list").hide();
      $(".tab_item_list").eq(idx).show();
      $(".mainSwiper ").hide();
      $(".mainSwiper").eq(idx).show();
    }
  });

  $(".mainSwiper").on({
    mouseenter: function () {
      lenis.options.smoothWheel = false;
    },
    mouseleave: function () {
      lenis.options.smoothWheel = true;
    },
  });
});

$(function () {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  let panels = gsap.utils.toArray("section"),
    observer,
    scrollTween;

  if (ScrollTrigger.isTouch === 1) {
    observer = ScrollTrigger.normalizeScroll(true);
  }

  document.addEventListener(
    "touchstart",
    (e) => {
      if (scrollTween) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    },
    { capture: true, passive: false }
  );

  function goToSection(i) {
    scrollTween = gsap.to(window, {
      scrollTo: { y: i * innerHeight, autoKill: false },
      onStart: () => {
        if (!observer) return;
        observer.disable();
        observer.enable();
      },
      duration: 1,
      onComplete: () => (scrollTween = null),
      overwrite: true,
    });
  }

  panels.forEach((panel, i) => {
    if (i < panels.length - 1) {
      ScrollTrigger.create({
        trigger: panel,
        start: "top top",
        end: "+=150%",
        onUpdate: (self) => {
          // 아래로 스크롤 중이고, 스크롤 애니메이션이 없을 때만
          if (self.direction === 1 && self.progress > 0.9 && !scrollTween) {
            goToSection(i + 1);
          }
        },
      });
    }
  });

  ScrollTrigger.create({
    start: 0,
    end: "max",
    snap: 1 / (panels.length - 1),
  });
});
