import lenis from "./common.js";

$(function () {
  gsap.registerPlugin(ScrollTrigger);
  /*
  gsap.set(".contents_wrap", { opactiy: 0, pointerEvents: "none" });

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
  });*/
});

$(function () {
  const images = [
    [
      "poster_p01.jpg",
      "Digital Transformation in Road Construction:<br> <em>A Total Solution for BIM & OSC Implementation</em>",
      "a",
    ],
    [
      "poster_p02.jpg",
      "<em>The current construction engineering,</em>which is irresponsible, shouts ‘hurry up, hurry up’ and is analog, is guilty.",
      "a",
    ],
    [
      "poster_p03.jpg",
      "Is it okay for <em>our construction industry</em> to just keep doing what it has always done",
      "a",
    ],
    [
      "poster_p04.jpg",
      "In the era of digital transformation, drawings <em>and BIM models are combined</em> into a single software.",
      "a",
    ],
    [
      "poster_p05.jpg",
      "<em>Easy, fast, and accurate</em> paperwork and documentation!",
      "b",
    ],
    ["poster_p06.jpg", "<em>GIS + BIM + Web + Business Management</em> all in one!", "b"],
    ["poster_p07.jpg", "<em>Blossoming Spatial Information at KNGIL</em>", "b"],
    [
      "poster_p08.jpg",
      "Creating <em>a digital GIS</em> space for construction solutions",
      "b",
    ],
    [
      "poster_p09.jpg",
      "Web-based drilling survey and ground information management service. <em>All ground information</em> is managed by GAIA.",
      "b",
    ],
    [
      "poster_p10.jpg",
      "<em>A blueprint for transportation</em>  drawn with data: Korea's integrated <em>transportation demand analysis</em> program.",
      "b",
    ],
    ["poster_p11.jpg", "<em>In-house development of an independent graphics engine</em>", "c"],
    [
      "poster_p12.jpg",
      "<em>StrAna-Core</em>, a structural analysis engine developed with our own technology",
      "c",
    ],
    [
      "poster_p13.jpg",
      "<em>StrAna</em>, Easy and convenient modeling environment, fast and accurate analysis!",
      "c",
    ],
    [
      "poster_p14.jpg",
      "<em>Digital Transformation of Road Design and Construction Engineering Technology </em>",
      "d",
    ],
    ["poster_p15.jpg", "Design and construction of earthworks", "d"],
    ["poster_p16.jpg", "Design and construction of drainage works", "d"],
    ["poster_p17.jpg", "Design and construction of pavement works", "d"],
    ["poster_p18.jpg", "Design and construction of auxiliary structures", "d"],
    [
      "poster_p19.jpg",
      "Easy and fast <em>BIM-based water and sewer pipe design</em>",
      "d",
    ],
    [
      "poster_p20.jpg",
      "<em>BIM-based drainage design for climate change response</em> and <em>intuitive</em>  cross-section determination",
      "d",
    ],
    [
      "poster_p21.jpg",
      "<em>Bulb T Girder</em>, a BIM-based design and construction technology",
      "e",
    ],
    [
      "poster_p22.jpg",
      "<em>Nodular Girder</em> and OSC construction <em>bridge design and construction technology</em> using <em>proprietary DfMA</em>",
      "e",
    ],
    [
      "poster_p23.jpg",
      "<em>BIM-based Road Structures</em> Expert Systems & Solutions",
      "e",
    ],
    [
      "poster_p24.jpg",
      "<em>BIM-based tunnel design and construction that adapts to the environment</em> and provides user convenience",
      "e",
    ],
    [
      "poster_p25.jpg",
      "<em>BIM-based crosswalk design and construction</em> with users in mind",
      "e",
    ],
    [
      "poster_p26.jpg",
      "User-centric, <em>comfortable</em>,  and safe! Naturally <em>curved retaining walls.</em>",
      "e",
    ],
    [
      "poster_p27.jpg",
      "<em>HM Unit Price/Process Solution,</em>  from unit price to process management, for anyone, quickly and easily.",
      "f",
    ],
    [
      "poster_p28.jpg",
      "<em>Creating flood-safe cities with</em>  Rectangular to Circle R2C technology.</em>",
      "f",
    ],
    [
      "poster_p29.jpg",
      "<em>BIM-based construction details</em> to meet social demands, fulfill legal obligations, and ensure productivity and quality",
      "f",
    ],
    [
      "poster_p30.jpg",
      "GIS & BIM-based process management <em>The ground becomes space! From excavation to road construction!!!</em>",
      "f",
    ],
    [
      "poster_p31.jpg",
      "<em>Still viewing avatars on your phone?</em> Engineering signage  dedicated to road construction design and construction.",
      "f",
    ],
  ];

  const categoryOrder = ["a", "b", "c", "d", "e", "f"];
  const categoryTitles = {
    a: "D/X",
    b: "Survey and GIS",
    c: "Structural Analysis and Engineering",
    d: "BIM Road Design/Construction",
    e: "BIM structural design/construction",
    f: "Construction and maintenance",
  };

  // HTML 내 .filter li 텍스트 자동 삽입
  for (const key in categoryTitles) {
    $(`.filter .swiper-slide[data-category="${key}"]`).text(
      categoryTitles[key]
    );
  }

  const mainWrapper = document.getElementById("p-main");
  const mainThumbWrapper = document.getElementById("p-thumb-main");
  const thumbWrapper = document.getElementById("p-thumb");
  const filterWrapper = document.querySelector(".filter_slide .filter");

  let mainSwiper, thumbSwiper, filterSwiper, thumbListSwiper;
  const categoryStartIndex = {};
  const dxImageBaseUrl = new URL("../../img/dx/", import.meta.url);

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
      const imgUrl = new URL(filename, dxImageBaseUrl).href;

      // 메인 슬라이드
      const mainSlide = document.createElement("div");
      const mainThumbSlide = document.createElement("div");
      mainSlide.className = "swiper-slide";
      mainThumbSlide.className = "swiper-slide";
      //mainSlide.innerHTML = `<div class="swiper-zoom-container"><img src="${imgUrl}" alt="${title}"></div>`;
      mainSlide.innerHTML = `<img src="${imgUrl}" alt="${title}">`;
      mainThumbSlide.innerHTML = `<img src="${imgUrl}" alt="${title}">`;
      mainWrapper.appendChild(mainSlide);
      mainThumbWrapper.appendChild(mainThumbSlide);

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
    if (thumbListSwiper) thumbListSwiper.destroy();
    if (filterSwiper) filterSwiper.destroy();
    if (thumbSwiper) thumbSwiper.destroy();

    filterSwiper = new Swiper(".tab_item_list .filter_slide", {
      direction: "vertical",
      slidesPerView: "auto",
      mousewheel: true,
      spaceBetween: 24,
      loop: false,
      centeredSlides: false,
      breakpoints: {
        1660: {
          direction: "vertical", // 1440px 이상은 세로
        },
        0: {
          direction: "horizontal", // 0~1439px은 가로
        },
      },
    });

    filterSwiper.slides.forEach((slide, index) => {
      slide.addEventListener("click", () => {
        filterSwiper.slideTo(index);
      });
    });

    // Swiper 초기화

    thumbListSwiper = new Swiper(".thumbListSwiper.img", {
      direction: "vertical",
      slidesPerView: "auto",
      mousewheel: {
        enabled: true,
        forceToAxis: true,
        releaseOnEdges: false,
        sensitivity: 1,
        invert: false,
      },
      allowTouchMove: true,
      spaceBetween: 10,
      freeMode: true,
      slideToClickedSlide: true,
      loop: false,
      scrollbar: {
        el: ".thumbListSwiper.img .swiper-scrollbar",
        draggable: true,
      },
      breakpoints: {
        // 956px 이하 (모바일)
        0: {
          scrollbar: false, // 또는 제거
          mousewheel: false,
          allowTouchMove: false,
        },
        // 957px 이상 (PC)
        957: {
          scrollbar: {
            el: ".thumbListSwiper.img .swiper-scrollbar",
            draggable: true,
          },
          mousewheel: {
            enabled: true,
            forceToAxis: true,
            releaseOnEdges: false,
            sensitivity: 1,
            invert: false,
          },
          allowTouchMove: true,
        },
      },
      on: {
        click: function (swiper, event) {
          const clickedIndex = swiper.clickedIndex;
          const clickedSlide = swiper.clickedSlide;
          if (!clickedSlide) return;
          if (event.target.closest(".slide-box")) {
            if (window.innerWidth <= 956) {
              const mainSlide = document.querySelector(".slide_wrap");
              mainSlide.classList.add("open");
              document.body.style.overflow = "hidden";
              lenis.stop();
            } else {
              mainSwiper.slideTo(clickedIndex);
            }
          }
        },
        slideChange: function () {
          const realIndex = this.realIndex;
          mainSwiper.slideTo(realIndex);
        },
      },
      
    });

    thumbSwiper = new Swiper(".thumbSwiper.img", {
      direction: "horizontal",
      slidesPerView: "auto",
      mousewheel: true,
      spaceBetween: 10,
      freeMode: true,
      centeredSlides: true,
      slideToClickedSlide: true,
      loop: false,
      pagination: {
        el: ".thumbSwiper.img .swiper-pagination",
        type: "fraction", // 1/4 형태
      },
    });

    mainSwiper = new Swiper(".mainSwiper.img", {
      loop: false,
      mousewheel: true,
      slidesPerView: 1,
      spaceBetween: 20,
      /*
      zoom: {
        maxRatio: 3, // 최대 확대 비율
        minRatio: 1, // 최소 비율 (기본값)
      },*/
      keyboard: {
        enabled: true, // 키보드 방향키 활성화
        onlyInViewport: true, // 슬라이더가 뷰포트 안에 있을 때만 반응
      },
      navigation: {
        nextEl: ".mainSwiper.img .swiper-button-next",
        prevEl: ".mainSwiper.img .swiper-button-prev",
      },

      thumbs: {
        swiper: thumbSwiper,
      },

      on: {
        slideChange: function () {
          const realIndex = this.realIndex;
          thumbListSwiper.slideTo(realIndex);
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
            $(".filter .swiper-slide").removeClass("on");
            $(
              `.filter .swiper-slide[data-category="${currentCategory}"]`
            ).addClass("on");
          }

          if (window.innerWidth <= 956) {
            const filserListItem = document.querySelectorAll(
              ".thumbListSwiper.img .swiper-slide"
            );
            filserListItem.forEach((item, index) => {
              if (index == realIndex) {
                item.scrollIntoView({
                  behavior: "smooth", // 부드럽게 스크롤
                  block: "center", // 수직 정렬 기준 (start, center, end)
                  inline: "center", // 수평 정렬 기준
                });
              }
            });
          }
        },
      },
    });

    const slideBtn = document.querySelector(".slide_wrap .btn_close");
    slideBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const mainSlide = document.querySelector(".slide_wrap");
      mainSlide.classList.remove("open");
      document.body.style.overflow = "";
      lenis.start();
    });
  }

  $(".filter .swiper-slide").on("click", function () {
    const category = $(this).data("category");
    const index = categoryStartIndex[category];

    if (typeof index === "number" && mainSwiper) {
      mainSwiper.slideToLoop(index, 500);
    }

    $(".filter .swiper-slide").removeClass("on");
    $(this).addClass("on");

    // ✅ thumbSwiper 업데이트로 스크롤 영역 재계산
    setTimeout(() => {
      if (thumbListSwiper) {
        thumbListSwiper.update(); // Swiper 내부 구조 재계산
      }
    }, 100); // 약간의 딜레이를 두면 더 안정적
  });

  // 초기 실행
  createSlidesAllSorted();
});
var players = [];
$(function () {
  const videos = [
    ["TRVL7Rtn08E", " 원주청광터교차로", "a"],
    ["wAKT5PQgdgA", "PG착공식_자율주행영상", "a"],
    ["a_dWqOR3s98", "원주청 하왕도교차로 개선공사", "a"],
    ["omL383gPRXg", "이라크 Habbaniyah 공항", "a"],
    ["FiQ1g21SbtQ", "논산 강경~채운", "a"],
    ["iA6d33DtE1Q", "대산당진신규모델", "a"],
    ["wsLoehdQgFg", "인주~염치", "a"],
    ["ncnBbFEoZNc", "안동수상대로", "a"],
    ["tRy2d9g4OYA", "당진시 면천도시계획도로", "a"],
    ["kwR6kiKRng8", "자유로지하화", "a"],
    ["ahCy-dClDmI", "평택지산교차로2차", "a"],
    ["CUh4hM7dxyw", "청도운문마일 주민설명회", "a"],
    ["_Q852TT7oV4", "[경상북도]상대~하대", "b"],
    ["sa2aMGaxJyg", "부산 영화의전당 지하차도", "b"],
    ["tIudVr3KvZs", "삼선산 수목원", "b"],
    ["VN6ERIDynPM", "유곡역촌주민설명회", "b"],
    ["b5wiXw5oaJc", "계양강화", "b"],
    ["rxRP9rIrNgM", "영월봉래산명소화사업", "b"],
    ["u6yOXLI_zgA", "함양합천실사화", "b"],
    ["qmwl80W8pKs", "은화삼단지", "b"],
    ["qXg1rlAIh-M", "영가대교웅부", "b"],
    ["24w1L-PFY-c", "청송 진보 ~ 영양 입암", "b"],
    ["GWmyBliEllM", "함안여항~창원내서", "b"],
    ["j6ace-2esoc", "대전청 행정~읍내", "b"],
    ["XdXAIUs5yrw", "노들섬서킷", "c"],
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
            autoplay: 0, // 자동 재생
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
  const thumVideobWrapper = document.getElementById("v-thumb-main");
  const thumListVideobWrapper = document.getElementById("v-thumb");

  let mainVideoSwiper, thumbVideoSwiper, thumbListVideoSwiper;
  const categoryStartIndex = {};

  function createSlidesAllSorted() {
    mainVideoWrapper.innerHTML = "";
    thumVideobWrapper.innerHTML = "";
    thumListVideobWrapper.innerHTML = "";

    const sortedVideos = categoryVideoOrder.flatMap((category) =>
      videos.filter((v) => v[2] === category)
    );

    sortedVideos.forEach(([videoId, title], i) => {
      const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      const videoUrl = `https://www.youtube.com/embed/${videoId}?rel=0&controls=1`; // 메인 슬라이드: iframe

      const mainSlide = document.createElement("div");
      const thumbSlide = document.createElement("div");
      mainSlide.className = "swiper-slide";
      thumbSlide.className = "swiper-slide";
      //mainSlide.innerHTML = `<iframe src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      mainSlide.innerHTML = `<div class="video_box"><div id="player${i}"></div></div>`;
      thumbSlide.innerHTML = `<img src="${thumbUrl}" alt="${title}"/>`;
      mainVideoWrapper.appendChild(mainSlide); // 썸네일 슬라이드: 이미지 + 제목
      thumVideobWrapper.appendChild(thumbSlide); // 썸네일 슬라이드: 이미지 + 제목

      const thumbListSlide = document.createElement("div");
      thumbListSlide.className = "swiper-slide";
      /*  
      thumbSlide.innerHTML = `
         <div class="slide-box"><img src="${thumbUrl}" alt="${title}"/>
        <p>${title}</p></div>`;
*/
      thumbListSlide.innerHTML = `
         <div class="slide-box"><img src="${thumbUrl}" alt="${title}"/>
        <p>임시 타이틀_${i}</p></div>`;
      thumListVideobWrapper.appendChild(thumbListSlide);
    }); // 카테고리 타이틀

    if (mainVideoSwiper) mainVideoSwiper.destroy();
    if (thumbVideoSwiper) thumbVideoSwiper.destroy();
    if (thumbListVideoSwiper) thumbListVideoSwiper.destroy();

    thumbListVideoSwiper = new Swiper(".thumbListSwiper.vod", {
      direction: "vertical",
      slidesPerView: "auto",
      spaceBetween: 10,
      freeMode: true,
      mousewheel: {
        enabled: true,
        forceToAxis: true,
        releaseOnEdges: false,
        sensitivity: 1,
        invert: false,
      },
      watchSlidesProgress: true,
      scrollbar: {
        el: ".thumbListSwiper.vod .swiper-scrollbar",
      },
      loop: false,
      breakpoints: {
        // 956px 이하 (모바일)
        0: {
          mousewheel: false,
        },
        // 957px 이상 (PC)
        957: {
          mousewheel: {
            enabled: true,
            forceToAxis: true,
            releaseOnEdges: false,
            sensitivity: 1,
            invert: false,
          },
        },
      },
      on: {
        click: function (swiper, event) {
          const clickedSlide = swiper.clickedSlide;
          if (!clickedSlide) return;
          if (window.innerWidth <= 956) {
            const mainSlide = document.querySelector(".slide_wrap");
            mainSlide.classList.add("open");
            document.body.style.overflow = "hidden";
            lenis.stop();
          }
        },
      },
    });

    thumbVideoSwiper = new Swiper(".thumbSwiper.vod", {
      direction: "horizontal",
      slidesPerView: "auto",
      spaceBetween: 10,
      freeMode: true,
      mousewheel: true,
      centeredSlides: true,
      watchSlidesProgress: true,
      loop: false,
      pagination: {
        el: ".thumbSwiper.vod .swiper-pagination",
        type: "fraction", // 1/4 형태
      },
    });

    mainVideoSwiper = new Swiper(".mainSwiper.vod", {
      loop: false,
      mousewheel: true,
      keyboard: {
        enabled: true, // 키보드 방향키 활성화
        onlyInViewport: true, // 슬라이더가 뷰포트 안에 있을 때만 반응
      },
      navigation: {
        nextEl: ".mainSwiper.vod .swiper-button-next",
        prevEl: ".mainSwiper.vod .swiper-button-prev",
      },
      thumbs: {
        swiper: thumbVideoSwiper,
      },
      on: {
        slideChange: function () {
          var activeIndex = this.activeIndex;
          thumbListVideoSwiper.slideTo(activeIndex);
          players.forEach(function (player, index) {
            if (index !== activeIndex) {
              player.pauseVideo(); // 다른 슬라이드 영상 일시정지
            } else {
              player.playVideo();
            }
          });
          if (window.innerWidth <= 956) {
            const filserListItem = document.querySelectorAll(
              ".thumbListSwiper.vod .swiper-slide"
            );
            filserListItem.forEach((item, index) => {
              if (index == realIndex) {
                item.scrollIntoView({
                  behavior: "smooth", // 부드럽게 스크롤
                  block: "center", // 수직 정렬 기준 (start, center, end)
                  inline: "center", // 수평 정렬 기준
                });
              }
            });
          }
        },
      },
    });
  }

  createSlidesAllSorted();

  onYouTubeIframeAPIReady();

  thumbListVideoSwiper.on("click", function (swiper) {
    const clickedIndex = swiper.clickedIndex;
    if (typeof clickedIndex !== "undefined") {
      mainVideoSwiper.slideTo(clickedIndex); // 이 시점에 mainSwiper가 진짜 Swiper 인스턴스여야 함!
    }
  });

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

      const videoIdx = mainVideoSwiper.realIndex;
      players.forEach(function (player, index) {
        if (index == videoIdx && idx > 0) {
          player.playVideo();
        } else {
          player.pauseVideo(); // 다른 슬라이드 영상 일시정지
        }
      });
      if (window.innerWidth <= 956) {
        $(".slide_wrap  .thumbSwiper  ").hide();
        $(".slide_wrap .thumbSwiper ").eq(idx).show();
      } else {
        $(".thumbSwiper").hide();
      }
    }
  });
});
