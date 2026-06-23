(function () {
  function injectBaronHeaderStyles(locale) {
    if (document.getElementById('baron-header-style')) {
      return;
    }

    const logoPath = locale === 'en'
      ? '../../../baron/assets/img/eng/logo_c.svg'
      : '../../../baron/assets/img/logo_c.svg';

    const style = document.createElement('style');
    style.id = 'baron-header-style';
    style.textContent = `
      body.baron-has-header .wrapper {
        padding-top: 92px;
      }
      header.js__header.baron-shell {
        width: 100%;
        height: 92px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2000;
        background: #fff !important;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        backdrop-filter: blur(10px);
      }
      header.js__header.baron-shell .header_inner {
        display: flex;
        align-items: center;
        gap: 80px;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        padding: 0 160px;
        background: #fff !important;
      }
      header.js__header.baron-shell .logo_box {
        display: flex;
        align-items: center;
        flex: 0 0 auto;
      }
      header.js__header.baron-shell .logo_box a.logo {
        width: 160px;
        height: 100%;
        display: block;
        color: transparent;
        text-indent: -9999px;
        overflow: hidden;
        background-color: #0c367f;
        -webkit-mask-image: url(${logoPath});
        mask-image: url(${logoPath});
        background-size: cover;
        -webkit-background-size: cover;
        mask-size: contain;
        -webkit-mask-position: center;
        mask-position: center;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
      }
      header.js__header.baron-shell nav {
        height: 100%;
      }
      header.js__header.baron-shell nav ol {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 28px;
        width: 100%;
        height: 100%;
      }
      header.js__header.baron-shell nav ol li.depth1 {
        height: 100%;
        min-width: 60px;
        position: relative;
      }
      header.js__header.baron-shell nav ol li.depth1 span {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #000;
        font-size: 18px;
        text-align: center;
        opacity: 0.8;
        cursor: pointer;
      }
      header.js__header.baron-shell nav ol li.depth1 span em {
        display: block;
        width: 100%;
        margin-top: -15px;
        color: #999;
        font-size: 13px;
        text-align: center;
        font-weight: 500;
        opacity: 0;
      }
      header.js__header.baron-shell nav ol li.depth1 span i {
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url(../../../baron/assets/img/ico_more.svg) no-repeat center/contain;
        margin-left: 4px;
        translate: 0 1px;
      }
      header.js__header.baron-shell nav ol li.depth1.active span,
      header.js__header.baron-shell nav ol li.depth1:hover span {
        font-weight: 500;
        opacity: 1;
      }
      header.js__header.baron-shell nav ol li.depth1.active em,
      header.js__header.baron-shell nav ol li.depth1:hover em {
        opacity: 1;
      }
      header.js__header.baron-shell nav ol li.depth1 ul.depth2 {
        position: absolute;
        top: 100%;
        left: 50%;
        translate: -50% 0;
        min-width: 180px;
        width: max-content;
        padding: 20px;
        background-color: #fff;
        border-radius: 0 0 5px 5px;
        box-shadow: 0 4px 4px #00000033;
        display: none;
      }
      header.js__header.baron-shell nav ol li.depth1:hover ul.depth2 {
        display: block;
      }
      header.js__header.baron-shell nav ol li.depth1 ul.depth2 li {
        width: 100%;
        margin-top: 10px;
        text-align: center;
      }
      header.js__header.baron-shell nav ol li.depth1 ul.depth2 li:first-child,
      header.js__header.baron-shell nav ol li.depth1 ul.depth2 li ul.depth3 li:first-child {
        margin-top: 0;
      }
      header.js__header.baron-shell nav ol li.depth1 ul.depth2 li a {
        display: block;
        font-size: 16px;
        line-height: 28px;
      }
      header.js__header.baron-shell nav ol li.depth1 ul.depth2 li:hover > a {
        color: #006aff;
      }
      header.js__header.baron-shell nav ol li.depth1 ul.depth2 li.has_depth3 {
        position: relative;
      }
      header.js__header.baron-shell nav ol li.depth1 ul.depth2 li.has_depth3 > a {
        font-weight: 700;
      }
      header.js__header.baron-shell nav ol li.depth1 ul.depth2 li ul.depth3 {
        position: absolute;
        top: -20px;
        left: 100%;
        min-width: 180px;
        width: max-content;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 4px 12px #00000022;
        display: none;
      }
      header.js__header.baron-shell nav ol li.depth1 ul.depth2 li.has_depth3:hover ul.depth3 {
        display: block;
      }
      header.js__header.baron-shell nav ol li.depth1 ul.depth2 li ul.depth3 li {
        margin-top: 10px;
      }
      header.js__header.baron-shell nav ol li.depth1 ul.depth2 li ul.depth3 li a {
        text-align: left;
        font-size: 15px;
        line-height: 24px;
        font-weight: 400;
      }
      header.js__header.baron-shell .header_R {
        display: flex;
        align-items: center;
        margin-left: auto;
        flex-shrink: 0;
      }
      header.js__header.baron-shell .header_R .language {
        display: inline-flex;
        align-items: center;
        flex-wrap: nowrap;
        flex-shrink: 0;
        min-width: 84px;
        padding-right: 24px;
        color: #000;
        white-space: nowrap;
      }
      header.js__header.baron-shell .header_R .language::before {
        content: '';
        display: inline-block;
        flex: 0 0 16px;
        width: 16px;
        height: 16px;
        margin-top: 4px;
        background-image: url(../../../baron/assets/img/ico_language.svg);
        background-position: center;
        background-repeat: no-repeat;
        translate: 0 2px;
      }
      header.js__header.baron-shell .header_R .language a {
        display: inline-flex;
        align-items: center;
        flex: 0 0 auto;
        padding: 0 5px;
        font-weight: 700;
        font-size: 16px;
        color: #000;
        opacity: 0.5;
        white-space: nowrap;
      }
      header.js__header.baron-shell .header_R .language a.on {
        opacity: 1;
      }
      header.js__header.baron-shell .header_R .language a:first-child::after {
        content: '';
        display: inline-block;
        width: 1px;
        height: 12px;
        background-color: #000;
        opacity: 0.8;
        margin-left: 10px;
      }
      header.js__header.baron-shell .btn_menu {
        cursor: pointer;
        padding: 8px;
        width: 32px;
        height: 32px;
        position: relative;
      }
      header.js__header.baron-shell .btn_menu div {
        width: 24px;
        height: 2px;
        position: absolute;
        right: 4px;
        border-radius: 4px;
        background-color: #000;
      }
      header.js__header.baron-shell .btn_menu div:nth-child(1) { top: 7px; }
      header.js__header.baron-shell .btn_menu div:nth-child(2) { top: 15px; width: 16px; }
      header.js__header.baron-shell .btn_menu div:nth-child(3) { bottom: 7px; }
      header.js__header.baron-shell .popup_wrap.sitemap {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        padding: 0;
        background: #fff;
        z-index: 2100;
      }
      header.js__header.baron-shell .popup_wrap.sitemap::before {
        display: none;
        background: transparent;
        content: none;
      }
      header.js__header.baron-shell .popup_wrap.sitemap .popup_contents_wrap {
        width: 100%;
        height: 100%;
        max-width: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        text-align: left;
        background: #fff;
        overflow: auto;
        box-shadow: none;
        backdrop-filter: none;
      }
      header.js__header.baron-shell .popup_wrap.sitemap .popup_contents_wrap > * {
        max-width: none;
      }
      header.js__header.baron-shell .popup_wrap.sitemap .popup_header {
        width: 100%;
        max-width: 100%;
        min-height: 92px;
        padding: 0 144px 0 160px;
        border-bottom: 1px solid #ccc;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
      }
      header.js__header.baron-shell .popup_wrap.sitemap .logo_box {
        display: inline-flex;
        align-items: center;
      }
      header.js__header.baron-shell .popup_wrap.sitemap .btn_close {
        width: 64px;
        min-width: 64px;
        height: 92px;
        margin-left: auto;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 64px;
      }
      header.js__header.baron-shell .popup_wrap.sitemap .btn_close i {
        display: block;
        width: 24px;
        height: 24px;
        margin-left: 0;
        position: relative;
        background: none;
      }
      header.js__header.baron-shell .popup_wrap.sitemap .btn_close i::before,
      header.js__header.baron-shell .popup_wrap.sitemap .btn_close i::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 24px;
        height: 2px;
        background: #000;
      }
      header.js__header.baron-shell .popup_wrap.sitemap .btn_close i::after {
        transform: translateY(-50%) rotate(-45deg);
      }
      header.js__header.baron-shell .popup_wrap.sitemap .btn_close i::before {
        transform: translateY(-50%) rotate(45deg);
      }
      header.js__header.baron-shell .popup_wrap.sitemap nav {
        width: 100%;
        max-width: 100%;
        height: auto;
        min-height: 0;
        flex: 1 1 auto;
        margin: 0 auto;
        text-align: left;
        overflow: hidden;
        background-color: #fff;
        padding: 0 160px 0 240px;
      }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 100%;
        grid-auto-rows: minmax(auto, 160px);
        align-content: center;
        align-items: center;
        gap: 0;
        justify-content: normal;
        position: relative;
      }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol::before {
        position: absolute;
        content: '';
        width: 30%;
        height: 100%;
        top: 0;
        right: 80%;
        background: linear-gradient(90deg, transparent 0%, #006aff 100%);
        opacity: 0.05;
        pointer-events: none;
      }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 {
        display: grid;
        grid-template-columns: 1fr 4fr;
        align-content: stretch;
        align-items: center;
        height: 100%;
        opacity: 0.5;
      }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1:hover {
        opacity: 1;
      }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 span {
        width: auto;
        height: auto;
        display: block;
        color: #000;
        font-size: 28px;
        font-weight: 700;
        text-align: left;
        opacity: 1;
        cursor: default;
      }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 span em {
        display: block;
        width: auto;
        margin-top: 0;
        color: inherit;
        font-size: 20px;
        font-weight: 400;
        text-align: left;
        opacity: 1;
      }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 {
        display: grid;
        position: static;
        top: auto;
        left: auto;
        translate: none;
        min-width: 0;
        width: auto;
        grid-template-columns: repeat(3, 1fr);
        align-items: center;
        height: 100%;
        font-size: 18px;
        padding: 0 0 0 80px;
        background-color: transparent;
        border-radius: 0;
        box-shadow: none;
        border-bottom: 1px solid #eee;
      }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 li {
        margin-top: 0;
        padding: 16px 0;
        width: 80%;
        text-align: left;
      }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 li a {
        width: 100%;
        height: 100%;
        display: block;
        text-align: left;
        font-size: inherit;
        line-height: normal;
        font-weight: inherit;
      }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 li.has_depth3 {
        width: 100%;
      }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 li.has_depth3 > a {
        font-weight: 700;
      }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 li ul.depth3 {
        position: static;
        top: auto;
        left: auto;
        min-width: 0;
        width: auto;
        padding: 12px 0 0;
        background-color: transparent;
        border-radius: 0;
        box-shadow: none;
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 12px;
        border-top: 1px solid rgba(0, 0, 0, 0.08);
        font-size: 15px;
        opacity: 0.75;
      }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1:nth-child(4) ul.depth2 li.has_depth3 ul.depth3 {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px 16px;
        align-content: start;
      }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 li ul.depth3 li {
        margin-top: 0;
        width: 100%;
        padding: 0;
        text-align: left;
      }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1:nth-child(4) ul.depth2 li.has_depth3 ul.depth3 li {
        width: auto;
      }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 li ul.depth3 li a {
        display: block;
        text-align: left;
        font-size: inherit;
        line-height: normal;
        font-weight: inherit;
      }
      header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1:nth-child(4) ul.depth2 li.has_depth3 ul.depth3 li a {
        white-space: nowrap;
      }
      @media (max-width: 1024px) {
        body.baron-has-header .wrapper {
          padding-top: 50px;
        }
        header.js__header.baron-shell .header_inner {
          gap: 24px;
          padding: 0 24px;
        }
        header.js__header.baron-shell .header_inner nav {
          display: none;
        }
        header.js__header.baron-shell .popup_wrap.sitemap .popup_contents_wrap {
          width: 84.4444%;
          max-width: 640px;
          min-width: 304px;
          position: fixed;
          top: 0;
          right: 0;
          height: 100vh;
        }
        header.js__header.baron-shell .popup_wrap.sitemap .popup_header {
          min-height: 50px;
          height: 50px;
          padding: 0 0 0 16px;
          background: #006aff;
        }
        header.js__header.baron-shell .popup_wrap.sitemap .popup_header .logo_box a.logo {
          width: 133px;
          background-color: #fff;
        }
        header.js__header.baron-shell .popup_wrap.sitemap .btn_close i::before,
        header.js__header.baron-shell .popup_wrap.sitemap .btn_close i::after {
          background: #fff;
        }
        header.js__header.baron-shell .popup_wrap.sitemap nav {
          padding: 0;
          height: calc(100vh - 50px);
          overflow-y: auto;
        }
        header.js__header.baron-shell .popup_wrap.sitemap nav ol {
          display: block;
          padding-top: 24px;
          padding-bottom: 80px;
          height: auto;
        }
        header.js__header.baron-shell .popup_wrap.sitemap nav ol::before {
          content: none;
        }
        header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 {
          display: block;
          height: auto;
          opacity: 1;
          padding-bottom: 16px;
        }
        header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 span {
          position: relative;
          display: block;
          color: rgba(0, 0, 0, 0.8);
          padding: 0 24px 14px;
          font-size: 20px;
          cursor: pointer;
          font-weight: 400;
        }
        header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 span em {
          display: inline;
          font-size: inherit;
          color: inherit;
          opacity: 1;
          margin-right: 6px;
        }
        header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1:not(:last-child) span::after {
          content: ' ';
          position: absolute;
          right: 25px;
          top: 30%;
          width: 10px;
          height: 10px;
          border-left: 1.5px solid rgba(0, 0, 0, 0.8);
          border-top: 1.5px solid rgba(0, 0, 0, 0.8);
          transform: rotate(-135deg);
          transition: transform 0.3s ease-out;
        }
        header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1.active span::after {
          transform: rotate(45deg);
          top: 42%;
        }
        header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 {
          display: block;
          padding: 0;
          background: #f9f9f9;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
          border-bottom: none;
        }
        header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 li {
          padding: 16px 40px;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          font-size: 16px;
          opacity: 0.6;
          width: 100%;
        }
        header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 li.has_depth3 {
          opacity: 1;
        }
        header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 li ul.depth3 {
          gap: 10px;
          margin-top: 12px;
          padding-top: 12px;
          font-size: 14px;
          opacity: 1;
        }
        header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 li ul.depth3 li {
          padding: 0;
          border: 0;
          font-size: 14px;
          opacity: 0.7;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function injectBaronFooterStyles(locale) {
    if (document.getElementById('baron-footer-style')) {
      return;
    }

    const footerLogoPath = locale === 'en'
      ? '../../../baron/assets/img/eng/logo_w.svg'
      : '../../../baron/assets/img/logo_w.svg';

    const style = document.createElement('style');
    style.id = 'baron-footer-style';
    style.textContent = `
      footer#footer.baron-footer {
        background: #0c367f;
        color: #fff;
        margin-top: 0;
      }
      footer#footer.baron-footer .footer_inner {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: minmax(0, 1fr) 160px;
        justify-content: stretch;
        align-content: space-between;
        column-gap: 28px;
        row-gap: 40px;
        padding: 40px 40px 24px;
        box-sizing: border-box;
        overflow: hidden;
      }
      footer#footer.baron-footer nav {
        min-width: 0;
      }
      footer#footer.baron-footer nav ol {
        width: 100%;
        max-width: 100%;
        display: flex;
        justify-content: space-between;
        gap: clamp(12px, 1vw, 24px);
      }
      footer#footer.baron-footer nav ol li.depth1 {
        display: flex;
        flex-direction: column;
        gap: 48px;
        position: relative;
        height: max-content;
        min-width: 0;
      }
      footer#footer.baron-footer nav ol li.depth1 span {
        font-size: 18px;
        font-weight: 700;
        position: relative;
        color: #fff;
        white-space: nowrap;
        word-break: keep-all;
        overflow-wrap: normal;
      }
      footer#footer.baron-footer nav ol li.depth1 span::after {
        content: '';
        position: absolute;
        bottom: -20px;
        display: block;
        width: 24px;
        height: 2px;
        background-color: #fff;
      }
      footer#footer.baron-footer nav ol li.depth1 span em {
        display: block;
        opacity: 0.5;
        font-size: 16px;
        font-weight: 400;
      }
      footer#footer.baron-footer nav ol li.depth1 span i {
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url(../../../baron/assets/img/ico_more.svg) no-repeat center/contain;
        margin-left: 4px;
        translate: 0 1px;
        filter: invert(1);
      }
      footer#footer.baron-footer nav ol li.depth1:last-child {
        padding-left: 48px;
      }
      footer#footer.baron-footer nav ol li.depth1:last-child::before {
        content: '';
        position: absolute;
        width: 1px;
        height: 100%;
        border-left: 1px dashed #fff;
        margin-left: -48px;
        opacity: 0.5;
      }
      footer#footer.baron-footer nav ol li.depth1:last-child span::after,
      footer#footer.baron-footer nav ol li.depth1:last-child ul.depth2 {
        display: none;
      }
      footer#footer.baron-footer nav ol li.depth1 ul.depth2 {
        display: flex;
        flex-direction: column;
        gap: 16px;
        opacity: 0.8;
        font-size: 16px;
        font-weight: 300;
        white-space: nowrap;
        word-break: keep-all;
        overflow-wrap: normal;
      }
      footer#footer.baron-footer nav ol li.depth1 ul.depth2 li.has_depth3 {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      footer#footer.baron-footer nav ol li.depth1 ul.depth2 li.has_depth3 > a {
        font-weight: 700;
      }
      footer#footer.baron-footer nav ol li.depth1 ul.depth2 li ul.depth3 {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-left: 12px;
        opacity: 0.8;
        font-size: 14px;
        white-space: nowrap;
        word-break: keep-all;
        overflow-wrap: normal;
      }
      footer#footer.baron-footer .family_wrap {
        grid-column: 2;
        justify-self: end;
        position: relative;
        display: flex;
        height: max-content;
        width: 160px;
      }
      footer#footer.baron-footer .family_wrap .family_btn {
        background: rgba(255, 255, 255, 0.13);
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        padding: 8px 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        width: 100%;
        height: 32px;
        border-radius: 2px;
      }
      footer#footer.baron-footer .family_wrap .family_btn i {
        width: 12px;
        height: 12px;
        background: url(../../../baron/assets/img/ico_angle.svg) no-repeat center/contain;
        transition: 0.2s;
      }
      footer#footer.baron-footer .family_wrap:has(.family_on) .family_btn i {
        transform: scaleY(-1);
      }
      footer#footer.baron-footer .family_wrap .family_list {
        background: #fff;
        width: 100%;
        border-radius: 0 0 4px 4px;
        padding: 0 10px;
        box-sizing: border-box;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.13);
        display: none;
        position: absolute;
        top: 100%;
      }
      footer#footer.baron-footer .family_wrap .family_list.family_on {
        display: block;
        z-index: 10000;
      }
      footer#footer.baron-footer .family_wrap .family_list li {
        padding: 6px 0;
        border-bottom: 1px solid #ddd;
        color: #777;
        width: 100%;
        display: block;
        font-size: 12px;
      }
      footer#footer.baron-footer .family_wrap .family_list li:last-child {
        border-bottom: 0;
      }
      footer#footer.baron-footer .family_wrap .family_list li a:hover {
        color: #000;
        font-weight: 500;
      }
      footer#footer.baron-footer hr {
        display: block;
        grid-column: span 2;
        border: 0;
        border-top: 1px solid #fff;
        opacity: 0.2;
      }
      footer#footer.baron-footer .footer_info {
        grid-column: span 2;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 32px;
        height: max-content;
        letter-spacing: 0;
      }
      footer#footer.baron-footer .footer_info .home {
        display: inline-block;
        width: 160px;
        height: 24px;
        background-image: url(${footerLogoPath});
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
        color: transparent;
      }
      footer#footer.baron-footer .footer_info span {
        display: inline-block;
        font-size: 16px;
      }
      footer#footer.baron-footer .footer_info span em {
        padding-right: 4px;
        font-weight: 300;
        opacity: 0.5;
      }
      footer#footer.baron-footer .footer_info span:last-child {
        margin-left: auto;
        font-size: 14px;
      }
      footer#footer.baron-footer .btn_top {
        position: fixed;
        bottom: 60px;
        right: max(60px, (100vw - 1920px) / 2 + 60px);
        border-radius: 50%;
        z-index: 100;
        width: 60px;
        height: 60px;
        background-color: #071933;
        cursor: pointer;
        box-shadow: none;
      }
      footer#footer.baron-footer .btn_top::after {
        position: absolute;
        content: '';
        top: 12px;
        left: calc(50% - 15px);
        width: 30px;
        height: 2px;
        background-color: #fff;
      }
      footer#footer.baron-footer .btn_top .arrow {
        width: 2px;
        height: 32px;
        background-color: #fff;
        position: absolute;
        bottom: 6px;
        left: 50%;
        transform: none;
        margin: 0;
        border: 0;
      }
      footer#footer.baron-footer .btn_top .arrow::after,
      footer#footer.baron-footer .btn_top .arrow::before {
        position: absolute;
        content: '';
        width: 16px;
        height: 2px;
        background-color: #fff;
        top: 6px;
        left: 50%;
      }
      footer#footer.baron-footer .btn_top .arrow::after {
        transform: translateX(calc(-50% + 6px)) rotate(45deg);
      }
      footer#footer.baron-footer .btn_top .arrow::before {
        transform: translateX(calc(-50% - 6px)) rotate(-45deg);
      }
      footer#footer.baron-footer .btn_top:hover .arrow {
        transition: 0.2s;
        bottom: 12px;
      }
      @media (max-width: 1024px) {
        footer#footer.baron-footer .footer_inner {
          display: flex;
          flex-direction: column-reverse;
          justify-content: flex-start;
          align-items: flex-start;
          padding: 38px 24px 44px;
        }
        footer#footer.baron-footer .footer_inner .nav,
        footer#footer.baron-footer .footer_inner hr {
          display: none;
        }
        footer#footer.baron-footer .footer_inner .footer_info {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 10px;
          width: 100%;
        }
        footer#footer.baron-footer .footer_inner .footer_info .logo {
          width: 100%;
        }
        footer#footer.baron-footer .family_wrap {
          width: 100%;
          max-width: 360px;
        }
        footer#footer.baron-footer .family_wrap .family_btn {
          height: 36px;
          border-radius: 4px;
        }
        footer#footer.baron-footer .family_wrap .family_list {
          border-radius: 4px 4px 0 0;
        }
        footer#footer.baron-footer .family_wrap .family_list.family_on {
          top: auto;
          bottom: 36px;
        }
        footer#footer.baron-footer .footer_info span {
          font-size: 14px;
          font-weight: 400;
          white-space: normal;
        }
        footer#footer.baron-footer .footer_info span:last-child {
          display: block;
          margin: auto;
          width: 100%;
          font-size: 12px;
        }
        footer#footer.baron-footer .btn_top {
          right: 24px;
          width: 40px;
          height: 40px;
        }
        footer#footer.baron-footer .btn_top::after {
          top: 8px;
          left: calc(50% - 10px);
          width: 20px;
        }
        footer#footer.baron-footer .btn_top .arrow {
          width: 2px;
          height: 20px;
          bottom: 5px;
        }
        footer#footer.baron-footer .btn_top .arrow::after,
        footer#footer.baron-footer .btn_top .arrow::before {
          width: 10px;
          top: 4px;
        }
      }
      @media (max-width: 768px) {
        footer#footer.baron-footer .footer_inner .footer_info {
          flex-wrap: nowrap;
          flex-direction: column;
        }
        footer#footer.baron-footer .family_wrap {
          max-width: 100%;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function normalizeBaronIncludeHtml(html) {
    return html
      .replace(/\.\.\/ko\//g, '/baron/ko/')
      .replace(/\.\.\/en\//g, '/baron/en/')
      .replace(/\.\.\/recruit\//g, '/baron/recruit/')
      .replace(/\.\.\/assets\//g, '/baron/assets/');
  }

  function loadBaronInclude(url, target, callback) {
    $.ajax({
      url: url,
      async: true,
      cache: false,
      success: function (data) {
        $(target).html(normalizeBaronIncludeHtml(data));
        if (typeof callback === 'function') {
          callback();
        }
      },
      error: function (xhr, status, error) {
        console.error('Failed to load ' + url + ':', error || status);
        if (typeof callback === 'function') {
          callback();
        }
      }
    });
  }

  function ensureBaronShell() {
    const wrapper = document.querySelector('.wrapper');
    if (!wrapper) {
      return null;
    }

    let header = wrapper.querySelector('header.js__header');
    if (!header) {
      header = document.createElement('header');
      header.className = 'js__header';
      wrapper.insertBefore(header, wrapper.firstChild);
    }

    let footer = wrapper.querySelector('footer#footer');
    if (!footer) {
      footer = document.createElement('footer');
      footer.id = 'footer';
      wrapper.appendChild(footer);
    }

    document.querySelectorAll('.floating_menu, .popup_sitemap').forEach(function (element) {
      element.remove();
    });

    document.body.classList.add('baron-has-header', 'baron-has-footer');

    return { header: header, footer: footer };
  }

  function activateBaronHeaderLink(header, currentFile, productKey) {
    let matched = false;
    header.querySelectorAll('nav a').forEach(function (link) {
      const href = link.getAttribute('href') || '';
      if (href.split('/').pop() === currentFile) {
        const depth1 = link.closest('.depth1');
        if (depth1) {
          depth1.classList.add('active');
          matched = true;
        }
      }
    });

    const productNavMap = {
      egbim: 'sv_sw_egbim.html',
      gaia: 'sv_sw_gaia.html'
    };

    if (!matched && productKey && window.location.pathname.indexOf('/' + productKey + '/') !== -1) {
      const productLink = header.querySelector('nav a[href$="' + productNavMap[productKey] + '"]');
      if (productLink && productLink.closest('.depth1')) {
        productLink.closest('.depth1').classList.add('active');
      }
    }
  }

  function setupBaronHeaderInteractions(header) {
    const sitemapPopup = header.querySelector('.popup_wrap.sitemap');
    const openButton = header.querySelector('.btn_menu[data-value="sitemap"]');
    const closeButton = header.querySelector('.popup_wrap.sitemap .btn_close');

    if (openButton && sitemapPopup) {
      openButton.addEventListener('click', function () {
        sitemapPopup.style.display = 'block';
        document.body.style.overflow = 'hidden';
        if (window.innerWidth <= 1024) {
          header.querySelectorAll('.popup_wrap.sitemap ol > li.depth1.active .depth2').forEach(function (depth2) {
            depth2.style.maxHeight = depth2.scrollHeight + 'px';
          });
        }
      });
    }

    if (closeButton && sitemapPopup) {
      closeButton.addEventListener('click', function () {
        sitemapPopup.style.display = 'none';
        document.body.style.overflow = '';
      });
    }

    if (sitemapPopup) {
      sitemapPopup.addEventListener('click', function (event) {
        if (event.target === sitemapPopup || event.target.classList.contains('popup_contents_wrap')) {
          sitemapPopup.style.display = 'none';
          document.body.style.overflow = '';
        }
      });
    }

    const mobileNavItems = header.querySelectorAll('.popup_wrap.sitemap ol > li.depth1');
    if (window.innerWidth <= 1024) {
      mobileNavItems.forEach(function (item) {
        const depth2 = item.querySelector('.depth2');
        if (item.classList.contains('active') && depth2) {
          depth2.style.maxHeight = depth2.scrollHeight + 'px';
        }
      });
    }
    mobileNavItems.forEach(function (item, index) {
      item.addEventListener('click', function () {
        if (mobileNavItems.length - 1 === index || window.innerWidth > 1024) {
          return;
        }

        const depth2 = item.querySelector('.depth2');
        if (!depth2) {
          return;
        }

        if (!item.classList.contains('active')) {
          item.classList.add('active');
          depth2.style.maxHeight = depth2.scrollHeight + 'px';
        } else {
          item.classList.remove('active');
          depth2.style.maxHeight = null;
        }
      });
    });
  }

  function setupBaronHeaderBrand(productKey, locale) {
    const shell = ensureBaronShell();
    if (!shell) {
      return;
    }

    const header = shell.header;
    const currentFile = (window.location.pathname.split('/').pop() || 'index.html').split('?')[0];

    injectBaronHeaderStyles(locale);

    header.id = 'header';
    header.className = 'js__header baron-shell';
    header.innerHTML = '';

    const headerUrl = locale === 'en' ? '/baron/_include/eng/header.html' : '/baron/_include/header.html';
    const navUrl = locale === 'en' ? '/baron/_include/eng/nav.html' : '/baron/_include/nav.html';

    loadBaronInclude(headerUrl, '#header', function () {
      loadBaronInclude(navUrl, '#header .corp .nav', function () {
        loadBaronInclude(navUrl, '#header .popup_wrap.sitemap .popup_contents_wrap nav', function () {
          const languageLinks = header.querySelectorAll('.language a');
          if (languageLinks.length >= 2) {
            languageLinks[0].setAttribute('href', '/baron/ko/' + productKey + '/' + currentFile);
            languageLinks[1].setAttribute('href', '/baron/en/' + productKey + '/' + currentFile);
            languageLinks[0].classList.toggle('on', locale === 'ko');
            languageLinks[1].classList.toggle('on', locale === 'en');
          }

          activateBaronHeaderLink(header, currentFile, productKey);
          setupBaronHeaderInteractions(header);
          if (typeof window.setupHeaderAnimation === 'function') {
            window.setupHeaderAnimation();
          }
        });
      });
    });
  }

  function initializeTopButton() {
    const topButton = document.querySelector('#footer .btn_top');
    if (!topButton || topButton.dataset.baronInitialized === 'true') {
      return;
    }

    topButton.dataset.baronInitialized = 'true';

    function adjustButtonPosition() {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const bottomSpace = 120;

      if (scrollY + windowHeight >= documentHeight - bottomSpace) {
        topButton.style.bottom = (bottomSpace + (scrollY + windowHeight - documentHeight)) + 'px';
      } else {
        topButton.style.bottom = '60px';
      }
    }

    function toggleTopButtonClass() {
      if (window.scrollY === 0) {
        topButton.classList.remove('topbtn_on');
        topButton.classList.add('topbtn_off');
      } else {
        topButton.classList.remove('topbtn_off');
        topButton.classList.add('topbtn_on');
      }
    }

    const onScroll = function () {
      adjustButtonPosition();
      toggleTopButtonClass();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('load', onScroll);
    onScroll();
  }

  function setupBaronFooterBrand(locale) {
    const shell = ensureBaronShell();
    if (!shell) {
      return;
    }

    const footer = shell.footer;
    const footerUrl = locale === 'en' ? '/baron/_include/eng/footer.html' : '/baron/_include/footer.html';
    const navUrl = locale === 'en' ? '/baron/_include/eng/nav.html' : '/baron/_include/nav.html';

    injectBaronFooterStyles(locale);
    footer.className = 'baron-footer';
    footer.innerHTML = '';

    loadBaronInclude(footerUrl, '#footer', function () {
      loadBaronInclude(navUrl, '#footer .nav', function () {
        const depth3Menus = footer.querySelectorAll('.nav ol li.has_depth3 > .depth3');
        depth3Menus.forEach(function (menu) {
          menu.style.display = 'none';
        });

        footer.querySelectorAll('.nav ol li.has_depth3 > a').forEach(function (link) {
          link.addEventListener('click', function (event) {
            event.preventDefault();
            const depth3 = this.nextElementSibling;
            if (!depth3) {
              return;
            }

            const willOpen = depth3.style.display === 'none' || depth3.style.display === '';
            depth3Menus.forEach(function (menu) {
              menu.style.display = 'none';
            });

            if (willOpen) {
              depth3.style.display = 'flex';
            }
          });
        });

        const familyButton = footer.querySelector('.family_btn');
        const familyList = footer.querySelector('.family_list');
        if (familyButton && familyList) {
          familyButton.addEventListener('click', function (event) {
            event.stopPropagation();
            familyButton.classList.toggle('family_on');
            familyList.classList.toggle('family_on');
          });

          document.addEventListener('click', function (event) {
            if (!event.target.closest('.family_btn') && !event.target.closest('.family_list')) {
              familyButton.classList.remove('family_on');
              familyList.classList.remove('family_on');
            }
          });
        }

        initializeTopButton();
      });
    });
  }

  window.initProductBaronShell = function initProductBaronShell(productKey, locale) {
    setupBaronHeaderBrand(productKey, locale);
    setupBaronFooterBrand(locale);
  };

  window.initEgbimBaronShell = function initEgbimBaronShell(locale) {
    window.initProductBaronShell('egbim', locale);
  };
})();
