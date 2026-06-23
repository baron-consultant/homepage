$(function () {
  var obj = document.getElementById("video_play");
  var video = $("#video_play").get(0);
  var i = 1;

  // 영상 소스를 비율에 맞게 설정하는 함수
  function updateVideoSource() {
    var width = $(window).width();
    var height = $(window).height();
    var ratio = width / height;

    // 비율이 가로가 더 길면 기본 영상, 세로가 더 길면 '_v'가 붙은 영상
    if (ratio > 1) {
      $("#video_play").attr("src", "img/main_" + i + ".mp4");
      $("ul.pagination_main").removeClass("m");
    } else {
      $("#video_play").attr("src", "img/main_" + i + "_v.mp4");
      $("ul.pagination_main").addClass("m");
    }

    // 영상 로드 및 자동 재생
    video.load();
    video.play();
  }

  // 페이지 로드 시 비율에 맞는 영상 설정
  updateVideoSource();

  // 화면 사이즈가 변경될 때마다 비율에 맞는 영상 설정
  $(window).resize(function () {
    updateVideoSource();
  });
  console.log("리사이징 완료");

  // 인트로 페이지 종료 후 첫 영상 실행
  video.pause();
  $(".pagination_main").hide();

  if (sessionStorage.getItem("visited")) {
    video.play();
    $(".pagination_main").show();
  } else {
    setTimeout(function () {
      video.play();
      $(".pagination_main").show();
    }, 2800);
  }

  // 페이지 네이션 - 클릭하면 해당 영상 실행
  function setPageVideo(pageNum) {
    i = pageNum;
    updateVideoSource(); // 비율에 맞는 영상으로 설정
    $(".page_0" + i).addClass("page_on");
    $(".pagination_main div")
      .not(".page_0" + i)
      .removeClass("page_on");
    $(".main_link_0" + i).addClass("link_on");
    $(".main_link a")
      .not(".main_link_0" + i)
      .removeClass("link_on");
  }

  // 각 페이지 클릭 시 영상 변경
  $(".page_01").click(function () {
    setPageVideo(1);
    console.log("영상1 재생");
  });
  $(".page_02").click(function () {
    setPageVideo(2);
    console.log("영상2 재생");
  });
  $(".page_03").click(function () {
    setPageVideo(3);
    console.log("영상3 재생");
  });
  $(".page_04").click(function () {
    setPageVideo(4);
    console.log("영상4 재생");
  });
  $(".page_05").click(function () {
    setPageVideo(5);
    console.log("영상5 재생");
  });

  // 영상 종료 후 다음 영상 실행
  $("#video_play").on("ended", function () {
    if (i < 5) {
      i = i + 1;
      updateVideoSource();
      $(".page_0" + i).addClass("page_on");
      $(".pagination_main div")
        .not(".page_0" + i)
        .removeClass("page_on");
      $(".main_link_0" + i).addClass("link_on");
      $(".main_link a")
        .not(".main_link_0" + i)
        .removeClass("link_on");
    } else {
      i = 1;
      updateVideoSource();
      $(".page_0" + i).addClass("page_on");
      $(".pagination_main div")
        .not(".page_0" + i)
        .removeClass("page_on");
      $(".main_link_0" + i).addClass("link_on");
      $(".main_link a")
        .not(".main_link_0" + i)
        .removeClass("link_on");
    }
    video.play(); // 영상 자동 재생
  });
});

// index footer 동작
$(function () {
  let currentMode = null;

  // 디바이스 체크 함수
  function getDeviceType() {
    const ua = navigator.userAgent.toLowerCase();
    const isMobile =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
    const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/i.test(
      ua
    );

    // 터치 지원 여부도 체크
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // 모바일 또는 태블릿이면서 터치 지원
    if ((isMobile || isTablet) && hasTouch) {
      return "mo";
    }

    return "pc";
  }

  function setupFooterEvents() {
    const newMode = getDeviceType();

    // 모드가 변경되지 않았으면 리턴
    if (currentMode === newMode) return;

    currentMode = newMode;

    // 기존 이벤트 제거
    $(".main").off("wheel mousewheel touchmove");

    if (newMode === "pc") {
      // PC: 기본 footer_off 상태
      $("footer").addClass("footer_off").removeClass("footer_on");

      // wheel 이벤트로 토글
      $(".main").on("wheel", function (e) {
        if (e.originalEvent.deltaY < 0) {
          // 위로 스크롤
          $("footer").addClass("footer_off").removeClass("footer_on");
        } else {
          // 아래로 스크롤
          $("footer").addClass("footer_on").removeClass("footer_off");
        }
      });
    } else {
      // 모바일/태블릿: touchmove 시 footer_on
      $(".main").on("touchmove", function () {
        $("footer").addClass("footer_on").removeClass("footer_off");
      });
    }
  }

  // 초기 설정
  setupFooterEvents();

  // footer 닫기
  $(".footer_close")
    .off("click")
    .on("click", function () {
      $("footer").addClass("footer_off").removeClass("footer_on");
    });
});

// 인트로 없애기
// 1. 홈페이지에 들어오면 sessionStorage에 visited 추가
// 2. visited가 있는 동안에는 인트로 삭제
// 3. 브라우저 종료 or 탭 닫으면 visited 자동 삭제
document.addEventListener("DOMContentLoaded", function () {
  const intro = document.querySelector(".intro_wrap");

  if (sessionStorage.getItem("visited")) {
    console.log("visited");
    intro.style.display = "none";
    document.querySelector(".main_mask").classList.add("skip");
  } else {
    setTimeout(() => {
      sessionStorage.setItem("visited", "true");
    }, 1000);
  }
});
