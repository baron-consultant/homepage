// ------------------------------
// [1] ?�이??로딩 �??�렬
// ------------------------------
const urlParams = new URL(location.href).searchParams;
const listIndex = urlParams.get("seq");
const group = urlParams.get("cate");

let jobListItem = {};

function fetchData() {
  $.getJSON("job_list.json")
    .then(function (data1) {
      jobListItem = sortDateAsc(data1.jobList);
      setDetailView(jobListItem);
      setFilterList(jobListItem);
      return $.getJSON("job_banner.json");
    })
    .then(function (data2) {
      $.each(data2, function (i, j) {
        if (i == group) {
          const report = document.querySelector(".sub_report");
          report.classList.add(group);
          const reportTitle = document.createElement("h6");
          const reportText = document.createElement("p");
          reportTitle.innerHTML = j.title;
          reportText.innerHTML = j.text;

          report.append(reportTitle);
          report.append(reportText);
        }
      });
    });
}
fetchData();
const btnBack = document.querySelector(".btn_back");
const btnEmail = document.querySelector(".btn_email");

btnBack.addEventListener("click", function () {
  location.href = "recruit_apply.html";
});
function sortDateAsc(list) {
  return list.sort((a, b) => new Date(a.date) - new Date(b.date));
}

function setDetailView(list) {
  const infoPart = document.querySelector(".info_part");
  const infoTitle = document.querySelector(".info_title");
  const infoJob = document.querySelector(".info_job");
  const infoCareer = document.querySelector(".info_career");
  const infoDDay = document.querySelector(".info_dday");
  const infoDate = document.querySelector(".info_date");
  const btnSaramin = document.querySelector(".btn_saramin");
  $.each(list, function (k, j) {
    if (listIndex == k) {
      const today = new Date();
      const targetDate = new Date(j.date);
      const diffTime = targetDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      let Ddays =
        diffDays > 0 ? "D -" + diffDays : diffDays == 0 ? "D-Day" : "마감";
      infoPart.textContent = "[" + j.part + "]";
      infoTitle.textContent = j.title;
      infoCareer.textContent = j.career;
      infoJob.textContent = j.job;
      infoDDay.textContent = Ddays;
      infoDate.textContent = "~ " + j.date;
      setTaskView(j.content);

      btnSaramin.addEventListener("click", function () {
        window.open(j.link, "_blank");
      });
    }
  });
}

function setFilterList(list) {
  const jobList = document.querySelector(".apply_left .list_filtered");
  $.each(list, function (k, j) {
    if (group === j.group) {
      let listItem = document.createElement("li");
      if (k == listIndex) {
        listItem.className = "active";
      }
      const today = new Date();
      const targetDate = new Date(j.date);
      const diffTime = targetDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      let Ddays =
        diffDays > 0 ? "D -" + diffDays : diffDays == 0 ? "D-Day" : "마감";
      let list =
        '<a href="recruit_view.html?seq=' +
        k +
        "&cate=" +
        j.group +
        '">';
      list +=
        '<div class="sub"><span class="info_job" id="info_job">' +
        j.job +
        "</span>";
      list +=
        '<span class="info_career" id="info_career">' +
        j.career +
        "</span></div>";
      list += '<dl class="main"><dt>';

      list += '<span id="info_part">[' + j.part + "] </span>";
      list += '<span id="info_title">' + j.title + "</span></dt><dd>";
      list += '<span class="info_dday" id="info_dday">' + Ddays + "</span>";
      list +=
        '<span class="info_date" id="info_date">~ ' +
        j.date +
        "</span></dd></dl></a>";

      listItem.innerHTML = list;
      if (k == listIndex) {
        jobList.prepend(listItem);
      } else {
        jobList.append(listItem);
      }
    }
  });

  const total = $(".apply_left .list_filtered > li").length;
  $(".filter_wrap .txt_box b").text(total + "개");
  $(".back_header .backList b").text(total + "개");
}

function setTaskView(content) {
  const listWrap = document.querySelector(".sub_task");

  $.each(content, function (i, j) {
    const listItem = document.createElement("dl");
    const dtItem = document.createElement("dt");
    dtItem.innerHTML = j.title;
    listItem.append(dtItem);
    $.each(j.text, function (k, o) {
      const ddItem = document.createElement("dd");
      ddItem.innerHTML = o;
      listItem.append(ddItem);
    });
    listWrap.append(listItem);
  });
}

btnEmail.addEventListener("click", function (e) {
  const $this = $(this);
  const value = $this.data("value");
  const $next = $this.next();

  const isAlreadyInserted = $next.hasClass("pop_wrap");
  if (!isAlreadyInserted) {
    const html = `
            <div class="pop_wrap ${value}">
                <div class="popup_contents_wrap" data-lenis-prevent-wheel>
                  <div class="pop_head">
                    <button class="btn_close" onclick="popClose();">><i class="close"></i></button>
                 </div>
                 <div class="pop_body">
                    <div class="tit_box">
                      <div class="img_box">
                        <img src="../assets/img/recruit/img_apply_pop.png" alt=""/>
                      </div>
                      <h2>입사 지원서를 작성하여<br>메일로 보내주세요.</h2>
                    </div>
                    <div class="txt_box">
                      <dl>
                         <dt>메일주소</dt>
                         <dd><span class="email">baroncs@baroncs.co.kr</span> <button class="btn copy" onclick="btnCopy();"><span>복사</span><i></i></button></dd>
                      </dl>
                       <dl>
                         <dt>제출서류</dt>
                         <dd>입사 지원서 및 직군별 추가서류</dd>
                       </dl>
                       <button class="btn_full btn_apply" onClick="location.href='../assets/file/입사지원서_바론_경력.hwp'">입사 지원서 다운로드 <i></i></button>
                    </div>
                 </div>
                </div>
            </div>
            `;
    $this.after(html);
    console.log(`${value} 작성 완료`);
  } else {
    const popup = document.querySelector(".pop_wrap");
    popup.style.display = "block";
    document.body.style.overflow = "hidden";
    lenis.stop();
    console.log(`이미 ${value} 팝업이 존재합니다.`);
  }
});

// E : btn_more ?�릭???�업

// 카피버튼
function btnCopy() {
  const copyBtn = document.querySelector(".btn.copy");
  const emailAdd = document.querySelector(".email");
  const btnSpan = copyBtn.querySelector("span");

  console.log(emailAdd.textContent);

  copyBtn.addEventListener("click", function () {
    const textToCopy = emailAdd.textContent;
    const tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.value = textToCopy;
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    // Add 'complete' class to button
    copyBtn.classList.add("complete");
    btnSpan.textContent = "완료";

    // Remove 'complete' class after 2 seconds
    setTimeout(function () {
      copyBtn.classList.remove("complete");
      btnSpan.textContent = "복사";
    }, 600);
  });
}

function popClose() {
  const popup = document.querySelector(".pop_wrap");
  popup.style.display = "none";
}

const navList = document.querySelector(".apply_left");
const filterBtn = document.querySelector(".backList");

filterBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (!navList.classList.contains("open")) {
    navList.classList.add("open");
    document.querySelector("body").style.overflowY = "hidden";
  }
});

const filterCloseBtn = document.querySelector(".apply_left .btn-close");
filterCloseBtn.addEventListener("click", function (e) {
  e.preventDefault();
  navList.classList.remove("open");
  document.querySelector("body").style.overflowY = "initial";
});

navList.addEventListener("click", function (e) {
  const filterCloseBtn = document.querySelector(".apply_left .btn-close");
  const navWrap = navList.querySelector(".filter_wrap");
  if (navList.classList.contains("open")) {
    if (
      navWrap &&
      !navWrap.contains(e.target) &&
      !filterCloseBtn.contains(e.target)
    ) {
      navList.classList.remove("open");
    }
  }
});
