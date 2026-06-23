(() => {
  const locale = document.documentElement.lang === 'en' ? 'en' : 'ko';
  const currentFile = (window.location.pathname.split('/').pop() || 'index.html').split('?')[0];
  const isEnglish = locale === 'en';

  const baseHref = isEnglish ? '/baron/en' : '/baron/ko';
  const baronHomeHref = `${baseHref}/sv_sw.html`;
  const gaiaRoot = '/baron';

  const navItems = isEnglish
    ? {
        depth1: 'Realizing Value',
        package: 'Package S/W',
        service: 'Service S/W',
        bigRoom: 'Big Room',
        dx: 'D/X Experience',
        pr: 'PR Center',
        gaia: ['About GAIA', 'Key Features', 'Deliverables', 'Digital Innovation'],
        gaiaTitle: 'GAIA',
      }
    : {
        depth1: '가치를 실현하는',
        package: '패키지 S/W',
        service: '서비스 S/W',
        bigRoom: '빅룸',
        dx: 'D/X 체험',
        pr: '홍보센터',
        gaia: ['GAIA 소개', '주요기능', '성과품', '디지털 혁신'],
        gaiaTitle: 'GAIA',
      };

  const gaiaLinks = [
    ['value.html', navItems.gaia[0]],
    ['primary.html', navItems.gaia[1]],
    ['results.html', navItems.gaia[2]],
    ['further.html', navItems.gaia[3]],
  ];

  const footerLinks = isEnglish
    ? [
        ['About TOVA', '/baron/en/tova/value.html'],
        ['GAIA', '/baron/en/gaia/value.html'],
        ['EG-BIM', '/baron/en/sv_sw_egbim.html'],
        ['KNGIL', '/baron/en/sv_sw_kngil.html'],
      ]
    : [
        ['TOVA', '/baron/ko/tova/value.html'],
        ['GAIA', '/baron/ko/gaia/value.html'],
        ['EG-BIM', '/baron/ko/sv_sw_egbim.html'],
        ['KNGIL', '/baron/ko/sv_sw_kngil.html'],
      ];

  function injectStyles() {
    if (document.getElementById('baron-gaia-shell-style')) return;

    const style = document.createElement('style');
    style.id = 'baron-gaia-shell-style';
    style.textContent = `
      body.baron-gaia-shell > .wrapper {
        padding-top: 92px;
      }
      header.js__header.baron-shell {
        width: 100%;
        height: 92px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2000;
        background: #fff;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        backdrop-filter: blur(10px);
      }
      header.js__header.baron-shell .header_inner {
        display: flex;
        align-items: center;
        gap: 80px;
        width: min(1760px, calc(100% - 48px));
        height: 100%;
        margin: 0 auto;
        padding: 0;
      }
      header.js__header.baron-shell .logo_box { display: flex; align-items: center; flex: 0 0 auto; }
      header.js__header.baron-shell .logo_box a.logo {
        width: 160px; height: 100%; display: block; color: transparent; text-indent: -9999px; overflow: hidden;
        background-color: #0c367f; -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-position: center; mask-position: center;
        -webkit-mask-size: contain; mask-size: contain; background-size: cover;
      }
      header.js__header.baron-shell nav { height: 100%; }
      header.js__header.baron-shell nav ol {
        display: flex; justify-content: center; align-items: center; gap: 28px; width: 100%; height: 100%;
      }
      header.js__header.baron-shell nav ol li.depth1 {
        height: 100%; min-width: 60px; position: relative;
      }
      header.js__header.baron-shell nav ol li.depth1 span {
        width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;
        color: #000; font-size: 18px; text-align: center; opacity: 0.8; cursor: pointer;
      }
      header.js__header.baron-shell nav ol li.depth1 span em {
        display: block; width: 100%; margin-top: -15px; color: #999; font-size: 13px; text-align: center; font-weight: 500; opacity: 0;
      }
      header.js__header.baron-shell nav ol li.depth1 ul.depth2 {
        position: absolute; top: 100%; left: 50%; translate: -50% 0; min-width: 180px; width: max-content;
        padding: 20px; background: #fff; border-radius: 0 0 5px 5px; box-shadow: 0 4px 4px #00000033; display: none;
      }
      header.js__header.baron-shell nav ol li.depth1:hover ul.depth2 { display: block; }
      header.js__header.baron-shell nav ol li.depth1 ul.depth2 li { width: 100%; margin-top: 10px; text-align: center; }
      header.js__header.baron-shell nav ol li.depth1 ul.depth2 li.has_depth3 { position: relative; }
      header.js__header.baron-shell nav ol li.depth1 ul.depth2 li.has_depth3 > a { font-weight: 700; }
      header.js__header.baron-shell nav ol li.depth1 ul.depth2 li ul.depth3 {
        position: absolute; top: -20px; left: 100%; min-width: 180px; width: max-content; padding: 20px;
        background: #fff; border-radius: 5px; box-shadow: 0 4px 12px #00000022; display: none;
      }
      header.js__header.baron-shell nav ol li.depth1 ul.depth2 li.has_depth3:hover ul.depth3 { display: block; }
      header.js__header.baron-shell nav ol li.depth1 ul.depth2 li ul.depth3 li { margin-top: 10px; }
      header.js__header.baron-shell .header_R { display: flex; flex-direction: row; align-items: center; margin-left: auto; }
      header.js__header.baron-shell .header_R .language { display: inline-flex; align-items: center; flex: 0 0 auto; min-width: max-content; padding-right: 24px; white-space: nowrap; }
      header.js__header.baron-shell .header_R .language::before { content: ''; display: inline-block; flex: 0 0 16px; width: 16px; height: 16px; margin-top: 4px; background-position: center; background-repeat: no-repeat; translate: 0 2px; }
      header.js__header.baron-shell .header_R .language a { padding: 0 5px; display: inline-flex; align-items: center; flex: 0 0 auto; font-weight: 700; font-size: 16px; color: #000; opacity: 0.5; white-space: nowrap; }
      header.js__header.baron-shell .header_R .language a.on { opacity: 1; }
      header.js__header.baron-shell .header_R .language a:first-child::after { content: ''; display: inline-block; flex: 0 0 auto; width: 1px; height: 12px; background: #000; opacity: 0.8; margin-left: 10px; }
      header.js__header.baron-shell .btn_menu { cursor: pointer; height: fit-content; margin-left: auto; padding: 8px; width: 32px; height: 32px; position: relative; }
      header.js__header.baron-shell .btn_menu div { width: 24px; height: 2px; position: absolute; right: 4px; border-radius: 4px; background-color: #000; transition: 0.2s; }
      header.js__header.baron-shell .btn_menu div:nth-child(1) { top: 7px; }
      header.js__header.baron-shell .btn_menu div:nth-child(2) { top: 15px; width: 16px; }
      header.js__header.baron-shell .btn_menu div:nth-child(3) { bottom: 7px; }
      header.js__header.baron-shell .popup_wrap.sitemap { display: none; position: fixed; inset: 0; background: rgba(0, 0, 0, 0.4); z-index: 2100; }
      header.js__header.baron-shell .popup_wrap.sitemap .popup_contents_wrap { width: 100%; height: 100%; background: #fff; overflow: auto; }
      header.js__header.baron-shell .popup_wrap.sitemap .popup_header { min-height: 92px; padding: 0 144px 0 160px; border-bottom: 1px solid #ccc; display: flex; justify-content: space-between; align-items: center; background: #fff; }
      header.js__header.baron-shell .popup_wrap.sitemap .btn_close { width: 40px; height: 40px; position: relative; }
      header.js__header.baron-shell .popup_wrap.sitemap .btn_close i::before,
      header.js__header.baron-shell .popup_wrap.sitemap .btn_close i::after { content: ''; position: absolute; top: 18px; left: 8px; width: 24px; height: 2px; background: #000; }
      header.js__header.baron-shell .popup_wrap.sitemap .btn_close i::before { transform: rotate(45deg); }
      header.js__header.baron-shell .popup_wrap.sitemap .btn_close i::after { transform: rotate(-45deg); }
      header.js__header.baron-shell .popup_wrap.sitemap nav { width: 100%; height: 100%; text-align: left; overflow: hidden; background: #fff; padding: 0 160px 0 240px; }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol { width: 100%; height: 100%; display: grid; grid-auto-rows: minmax(160px, auto); align-content: start; align-items: start; position: relative; }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 { display: grid; grid-template-columns: 1fr 4fr; align-items: start; height: auto; opacity: 0.5; }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 span { font-size: 28px; font-weight: 700; }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 span em { display: block; font-size: 20px; font-weight: 400; }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 { display: grid; grid-template-columns: repeat(3, 1fr); align-items: start; height: auto; font-size: 18px; padding-left: 80px; border-bottom: 1px solid #eee; }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 li { padding: 16px 0; width: 80%; }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 li.has_depth3 { width: 100%; }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 li.has_depth3 > a { font-weight: 700; }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 li ul.depth3 { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(0,0,0,0.08); font-size: 15px; opacity: 0.75; }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 li ul.depth3 li { width: 100%; padding: 0; }
      footer#footer.baron-footer { background: #0c367f; color: #fff; }
      footer#footer.baron-footer .footer_inner { width: 100%; display: grid; justify-content: space-between; align-content: space-between; grid-auto-columns: min-content; gap: 40px; padding: 40px 160px 24px; overflow: hidden; }
      footer#footer.baron-footer nav ol { width: max-content; display: flex; gap: 40px; }
      footer#footer.baron-footer nav ol li.depth1 { display: flex; flex-direction: column; gap: 48px; position: relative; height: max-content; }
      footer#footer.baron-footer nav ol li.depth1 span { font-size: 18px; font-weight: 700; position: relative; color: #fff; }
      footer#footer.baron-footer nav ol li.depth1 span em { display: block; opacity: 0.5; font-size: 16px; font-weight: 400; }
      footer#footer.baron-footer nav ol li.depth1 ul.depth2 { display: flex; flex-direction: column; gap: 14px; font-size: 15px; opacity: 0.75; }
      footer#footer.baron-footer .footer_info { display: flex; flex-wrap: wrap; gap: 12px 24px; align-items: flex-start; font-size: 14px; }
      footer#footer.baron-footer .footer_info .logo { width: 160px; height: 28px; }
      footer#footer.baron-footer .footer_info .home { display: block; width: 100%; height: 100%; color: transparent; overflow: hidden; text-indent: -9999px; background-size: contain; background-repeat: no-repeat; background-position: left center; }
      footer#footer.baron-footer .footer_info span { opacity: 0.88; }
      footer#footer.baron-footer .footer_info span em { margin-right: 4px; font-weight: 700; }
      footer#footer.baron-footer .family_wrap { position: relative; width: 220px; }
      footer#footer.baron-footer .family_btn { display: flex; justify-content: space-between; align-items: center; cursor: pointer; padding: 12px 16px; border: 1px solid rgba(255,255,255,0.2); }
      footer#footer.baron-footer .family_list { display: none; position: absolute; left: 0; bottom: 100%; width: 100%; margin-bottom: 8px; background: #fff; color: #000; border-radius: 8px; overflow: hidden; }
      footer#footer.baron-footer .family_list.family_on { display: block; }
      footer#footer.baron-footer .family_list li a { display: block; padding: 10px 14px; }
      footer#footer.baron-footer .btn_top { position: fixed; right: 24px; bottom: 60px; width: 40px; height: 40px; border-radius: 999px; background: #fff; box-shadow: 0 8px 20px rgba(0,0,0,0.2); }
      body.baron-gaia-shell .wrapper .container { min-height: calc(100vh - 92px); }
      @media (max-width: 1024px) {
        header.js__header.baron-shell .header_inner { gap: 24px; padding: 0 24px; }
        header.js__header.baron-shell .header_inner nav { display: none; }
        header.js__header.baron-shell .popup_wrap.sitemap .popup_contents_wrap { width: 84.4444%; max-width: 640px; min-width: 304px; position: fixed; top: 0; right: 0; height: 100vh; }
        header.js__header.baron-shell .popup_wrap.sitemap .popup_header { min-height: 50px; height: 50px; padding: 0 0 0 16px; background: #006aff; }
        header.js__header.baron-shell .popup_wrap.sitemap .popup_header .logo_box a.logo { width: 133px; background-color: #fff; }
        header.js__header.baron-shell .popup_wrap.sitemap .btn_close i::before,
        header.js__header.baron-shell .popup_wrap.sitemap .btn_close i::after { background: #fff; }
        header.js__header.baron-shell .popup_wrap.sitemap nav { padding: 0; height: calc(100vh - 50px); overflow-y: auto; }
        header.js__header.baron-shell .popup_wrap.sitemap nav ol { display: block; padding-top: 24px; padding-bottom: 80px; height: auto; }
        header.js__header.baron-shell .popup_wrap.sitemap nav ol::before { content: none; }
        header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 { display: block; height: auto; opacity: 1; padding-bottom: 16px; }
        header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 span { position: relative; display: block; color: rgba(0,0,0,0.8); padding: 0 24px 14px; font-size: 20px; cursor: pointer; font-weight: 400; }
        header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 span em { display: inline; font-size: inherit; color: inherit; opacity: 1; margin-right: 6px; }
        header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 { display: block; padding: 0; background: #f9f9f9; max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out; border-bottom: none; }
        header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 li { padding: 16px 40px; border-top: 1px solid rgba(0,0,0,0.05); font-size: 16px; opacity: 0.6; width: 100%; }
        header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 li.has_depth3 { opacity: 1; }
        header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 li ul.depth3 { gap: 10px; margin-top: 12px; padding-top: 12px; font-size: 14px; opacity: 1; }
        header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 li ul.depth3 li { padding: 0; border: 0; font-size: 14px; opacity: 0.7; }
        footer#footer.baron-footer .footer_inner { padding: 32px 24px 24px; }
        footer#footer.baron-footer .footer_info { flex-direction: column; }
        footer#footer.baron-footer .family_wrap { width: 100%; max-width: 320px; }
      }
    `;
    document.head.appendChild(style);
  }

  function buildNavMarkup() {
    const gaiaMarkup = gaiaLinks
      .map(([file, label]) => `<li><a href="${gaiaRoot}/${locale}/gaia/${file}">${label}</a></li>`)
      .join('');

    return `
      <ol>
        <li class="depth1">
          <span><em>${isEnglish ? 'Designing the Future' : '미래를 설계하는'}</em>${isEnglish ? 'Baron Consultants' : '바론 컨설턴트'}</span>
          <ul class="depth2">
            <li><a href="${baseHref}/br_future.html">${isEnglish ? 'Future Presented by Baron' : '바론이 제시하는 미래'}</a></li>
            <li><a href="${baseHref}/br_tech.html">${isEnglish ? 'Technology Realized by Baron' : '바론이 실현하는 기술'}</a></li>
            <li><a href="${baseHref}/br_value.html">${isEnglish ? 'The Values Pursued by Baron' : '바론이 추구하는 가치'}</a></li>
          </ul>
        </li>
        <li class="depth1">
          <span><em>${isEnglish ? 'Leading the Change' : '변화를 선도하는'}</em>${isEnglish ? 'Digital Transformation' : '디지털전환'}</span>
          <ul class="depth2">
            <li><a href="${baseHref}/dt_explain.html">${isEnglish ? 'D/X Infrastructure Construction' : '건설산업에서의 디지털전환'}</a></li>
            <li><a href="${baseHref}/dt_sw.html">${isEnglish ? 'D/X & Software' : '디지털전환과 소프트웨어'}</a></li>
            <li><a href="${baseHref}/dt_use.html">${isEnglish ? 'Leveraging D/X Infrastructure Construction' : '건설산업에서의 디지털전환 활용'}</a></li>
          </ul>
        </li>
        <li class="depth1">
          <span onclick="location.href='${baseHref}/sv_solution.html'"><em>${isEnglish ? 'Realizing Value' : '가치를 실현하는'}</em>${isEnglish ? 'Solution Program' : '솔루션 프로그램'}</span>
          <ul class="depth2">
            <li><a href="${baseHref}/sv_solution.html">${isEnglish ? 'Design Solution' : '설계 솔루션'}</a></li>
            <li><a href="${baseHref}/sv_solution_construction.html">${isEnglish ? 'Construction Solution' : '시공 솔루션'}</a></li>
            <li><a href="${baseHref}/sv_solution_operation.html">${isEnglish ? 'Operation & Maintenance Solution' : '운영 및 유지·관리 솔루션'}</a></li>
          </ul>
        </li>
        <li class="depth1 active">
          <span onclick="location.href='${baseHref}/sv_sw.html'"><em>${isEnglish ? 'Realizing Value' : '가치를 실현하는'}</em>${isEnglish ? 'Package S/W' : '패키지 S/W'}</span>
          <ul class="depth2">
            <li class="has_depth3">
              <a href="${baseHref}/sv_sw.html">TOVA</a>
              <ul class="depth3">
                <li><a href="${baseHref}/tova/value.html">${isEnglish ? 'About TOVA' : 'TOVA 소개'}</a></li>
                <li><a href="${baseHref}/tova/primary.html">${isEnglish ? 'Key Features' : '주요기능'}</a></li>
                <li><a href="${baseHref}/tova/road.html">${isEnglish ? 'Roadway Analysis' : '공로 분석'}</a></li>
                <li><a href="${baseHref}/tova/public.html">${isEnglish ? 'Public Transit Analysis' : '대중교통 분석'}</a></li>
                <li><a href="${baseHref}/tova/buy.html">${isEnglish ? 'Contact' : '구매하기'}</a></li>
              </ul>
            </li>
            <li><a href="${baseHref}/sv_sw_egbim.html">EG-BIM</a></li>
            <li class="has_depth3">
              <a href="${baseHref}/sv_sw_gaia.html">GAIA</a>
              <ul class="depth3">
                ${gaiaMarkup}
              </ul>
            </li>
          </ul>
        </li>
        <li class="depth1">
          <span onclick="location.href='${baseHref}/sv_sw_kngil.html'">${isEnglish ? 'Service S/W' : '서비스 S/W'}</span>
          <ul class="depth2">
            <li><a href="${baseHref}/sv_sw_kngil.html">KNGIL</a></li>
          </ul>
        </li>
        <li class="depth1"><span onclick="location.href='${baseHref}/sv_bigroom.html'"><em>${isEnglish ? 'Realizing Value' : '가치를 실현하는'}</em>${isEnglish ? 'Big Room' : '빅룸'}</span><ul class="depth2"><li><a href="${baseHref}/sv_bigroom.html">${isEnglish ? 'Big Room' : '빅룸'}</a></li></ul></li>
        <li class="depth1"><span><em>${isEnglish ? 'Experiencing the Vision' : '비전을 체험하는'}</em>${isEnglish ? 'D/X Experience' : 'D/X 체험'}</span><ul class="depth2"><li><a href="${baseHref}/dx.html">${isEnglish ? 'D/X experience<br>to experience the vision' : '비전을 체험하는 D/X체험'}</a></li></ul></li>
        <li class="depth1"><span><em>${isEnglish ? 'Telling a story' : '이야기를 전하는'}</em>${isEnglish ? 'PR Center' : '홍보센터'}</span><ul class="depth2"><li><a href="${baseHref}/pr_news.html">${isEnglish ? 'Baron News' : '바론뉴스'}</a></li><li><a href="${baseHref}/pr_brochure.html">${isEnglish ? 'Brochure' : '브로슈어'}</a></li><li><a href="${baseHref}/pr_ci.html">CI</a></li></ul></li>
      </ol>
    `;
  }

  function buildFooterMarkup() {
    const navList = footerLinks
      .map(([label, href]) => `<li><a href="${href}">${label}</a></li>`)
      .join('');

    return `
      <div class="footer_inner">
        <nav class="nav"><ol><li class="depth1 active"><span><em>${isEnglish ? 'Realizing Value' : '가치를 실현하는'}</em>${isEnglish ? 'Package S/W' : '패키지 S/W'}</span><ul class="depth2">${navList}</ul></li></ol></nav>
        <div class="family_wrap">
          <div class="family_btn"><span>Family Site</span><i></i></div>
          <ul class="family_list">
            <li><a href="http://www.hanmaceng.co.kr" target="_blank">${isEnglish ? 'hanmac' : '한맥기술'}</a></li>
            <li><a href="https://www.samaneng.co.kr/" target="_blank">${isEnglish ? 'saman' : '삼안'}</a></li>
            <li><a href="http://www.jangheon.co.kr/" target="_blank">${isEnglish ? 'jangheon' : '장헌산업'}</a></li>
            <li><a href="http://www.pre-cast.co.kr/" target="_blank">PTC</a></li>
            <li><a href="http://www.hallasanup.com/" target="_blank">${isEnglish ? 'hallasanup' : '한라산업개발'}</a></li>
          </ul>
        </div>
        <div class="footer_info">
          <div class="logo"><a class="home" href="${baronHomeHref}">${isEnglish ? 'Baron Consultants' : '(주) 바론컨설턴트'}</a></div>
          <span><em>${isEnglish ? 'Address.' : '주소.'}</em>${isEnglish ? '554, Ogeum-ro, Songpa-gu, Seoul, Republic of Korea' : '서울특별시 송파구 오금로 554(거여동)'}</span>
          <span><em>Tel.</em>02-2141-7434</span>
          <span><em>Mail.</em>baroncs@baroncs.co.kr</span>
          <span><em>${isEnglish ? 'CEO.' : '대표이사.'}</em>${isEnglish ? 'Jang Jong Chan' : '장종찬'}</span>
          <span><em>© ${isEnglish ? 'Baron Consultants Co,.Ltd' : 'BARON Consultants Co,.Ltd'} All Rights Reserved.</em></span>
        </div>
      </div>
      <button class="btn_top js__top" type="button"><div class="arrow"></div></button>
    `;
  }

  function injectHeaderFooter() {
    if (!document.querySelector('header#header')) {
      const header = document.createElement('header');
      header.id = 'header';
      document.body.insertBefore(header, document.body.firstChild);
    }

    if (!document.querySelector('footer#footer')) {
      const footer = document.createElement('footer');
      footer.id = 'footer';
      document.body.appendChild(footer);
    }
  }

  function setActiveLinks(header) {
    header.querySelectorAll('nav a').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (href.split('/').pop() === currentFile) {
        const depth1 = link.closest('.depth1');
        depth1?.classList.add('active');
      }
    });
  }

  function setupInteractions(header) {
    const sitemapPopup = header.querySelector('.popup_wrap.sitemap');
    const openButton = header.querySelector('.btn_menu[data-value="sitemap"]');
    const closeButton = header.querySelector('.popup_wrap.sitemap .btn_close');

    openButton?.addEventListener('click', () => {
      if (sitemapPopup) sitemapPopup.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
    closeButton?.addEventListener('click', () => {
      if (sitemapPopup) sitemapPopup.style.display = 'none';
      document.body.style.overflow = '';
    });
    sitemapPopup?.addEventListener('click', (event) => {
      if (event.target === sitemapPopup || event.target.classList.contains('popup_contents_wrap')) {
        sitemapPopup.style.display = 'none';
        document.body.style.overflow = '';
      }
    });

    header.querySelectorAll('.popup_wrap.sitemap ol > li.depth1').forEach((item, index, items) => {
      item.addEventListener('click', () => {
        if (window.innerWidth > 1024 || index === items.length - 1) return;
        const depth2 = item.querySelector('.depth2');
        if (!depth2) return;
        if (!item.classList.contains('active')) {
          item.classList.add('active');
          depth2.style.maxHeight = depth2.scrollHeight + 'px';
        } else {
          item.classList.remove('active');
          depth2.style.maxHeight = null;
        }
      });
    });

    const familyBtn = document.querySelector('#footer .family_btn');
    const familyList = document.querySelector('#footer .family_list');
    familyBtn?.addEventListener('click', (event) => {
      event.stopPropagation();
      familyBtn.classList.toggle('family_on');
      familyList?.classList.toggle('family_on');
    });
    document.addEventListener('click', (event) => {
      if (!event.target.closest('#footer .family_list') && !event.target.closest('#footer .family_btn')) {
        familyBtn?.classList.remove('family_on');
        familyList?.classList.remove('family_on');
      }
    });

    document.querySelector('.js__top')?.addEventListener('click', () => window.scrollTo(0, 0));
  }

  function init() {
    injectStyles();
    injectHeaderFooter();

    const header = document.querySelector('header#header');
    const footer = document.querySelector('footer#footer');
    if (!header || !footer) return;

    document.body.classList.add('baron-gaia-shell');

    const logoPath = isEnglish ? '/baron/assets/img/eng/logo_c.svg' : '/baron/assets/img/logo_c.svg';
    const footerLogoPath = isEnglish ? '/baron/assets/img/eng/logo_w.svg' : '/baron/assets/img/logo_w.svg';

    header.className = 'js__header baron-shell';
    const selfHref = isEnglish ? `/baron/en/gaia/${currentFile}` : `/baron/ko/gaia/${currentFile}`;
    const peerHref = isEnglish ? `/baron/ko/gaia/${currentFile}` : `/baron/en/gaia/${currentFile}`;

    header.innerHTML = `
      <div class="header_inner corp">
        <div class="logo_box"><a class="logo" href="${baronHomeHref}">${isEnglish ? 'Baron Consultants' : '(주) 바론컨설턴트'}</a></div>
        <nav class="nav"></nav>
        <div class="header_R">
          <div class="language"><a href="${isEnglish ? peerHref : selfHref}" class="${isEnglish ? '' : 'on'}">KR</a><a href="${isEnglish ? selfHref : peerHref}" class="${isEnglish ? 'on' : ''}">EN</a></div>
          <button class="btn_menu" data-value="sitemap" type="button"><div></div><div></div><div></div></button>
        </div>
      </div>
      <div class="popup_wrap sitemap"><div class="popup_contents_wrap"><div class="popup_header"><div class="logo_box"><a class="logo" href="${baronHomeHref}">${isEnglish ? 'Baron Consultants' : '(주) 바론컨설턴트'}</a></div><button class="btn_close" type="button"><i class="close"></i></button></div><nav class="nav"></nav></div></div>
    `;

    footer.className = 'baron-footer';
    footer.innerHTML = buildFooterMarkup();

    header.querySelector('.logo_box a.logo')?.style.setProperty('-webkit-mask-image', `url(${logoPath})`);
    header.querySelector('.logo_box a.logo')?.style.setProperty('mask-image', `url(${logoPath})`);
    header.querySelector('.popup_wrap.sitemap .logo_box a.logo')?.style.setProperty('-webkit-mask-image', `url(${logoPath})`);
    header.querySelector('.popup_wrap.sitemap .logo_box a.logo')?.style.setProperty('mask-image', `url(${logoPath})`);
    footer.querySelector('.footer_info .home')?.style.setProperty('background-image', `url(${footerLogoPath})`);

    const navMarkup = buildNavMarkup();
    header.querySelector('.header_inner .nav').innerHTML = navMarkup;
    header.querySelector('.popup_wrap.sitemap .nav').innerHTML = navMarkup;
    footer.querySelector('.nav').innerHTML = navMarkup;

    setActiveLinks(header);
    setupInteractions(header);
  }

  document.addEventListener('DOMContentLoaded', init);
})();