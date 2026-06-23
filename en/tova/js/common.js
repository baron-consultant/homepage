// 전역 변수
var errmsg = "";
var errfld = null;

// 필드 검사
function check_field(fld, msg)
{
    if ((fld.value = trim(fld.value)) == "")
        error_field(fld, msg);
    else
        clear_field(fld);
    return;
}

// 필드 오류 표시
function error_field(fld, msg)
{
    if (msg != "")
        errmsg += msg + "\n";
    if (!errfld) errfld = fld;
    fld.style.background = "#BDDEF7";
}

// 필드를 깨끗하게
function clear_field(fld)
{
    fld.style.background = "#FFFFFF";
}

function trim(s)
{
    var t = "";
    var from_pos = to_pos = 0;

    for (i=0; i<s.length; i++)
    {
        if (s.charAt(i) == ' ')
            continue;
        else
        {
            from_pos = i;
            break;
        }
    }

    for (i=s.length; i>=0; i--)
    {
        if (s.charAt(i-1) == ' ')
            continue;
        else
        {
            to_pos = i;
            break;
        }
    }

    t = s.substring(from_pos, to_pos);
    //				alert(from_pos + ',' + to_pos + ',' + t+'.');
    return t;
}

// 자바스크립트로 PHP의 number_format 흉내를 냄
// 숫자에 , 를 출력
function number_format(data)
{

    var tmp = '';
    var number = '';
    var cutlen = 3;
    var comma = ',';
    var i;
    
    data = data + '';

    var sign = data.match(/^[\+\-]/);
    if(sign) {
        data = data.replace(/^[\+\-]/, "");
    }

    len = data.length;
    mod = (len % cutlen);
    k = cutlen - mod;
    for (i=0; i<data.length; i++)
    {
        number = number + data.charAt(i);

        if (i < data.length - 1)
        {
            k++;
            if ((k % cutlen) == 0)
            {
                number = number + comma;
                k = 0;
            }
        }
    }

    if(sign != null)
        number = sign+number;

    return number;
}

// 새 창
function popup_window(url, winname, opt)
{
    window.open(url, winname, opt);
}


// 폼메일 창
function popup_formmail(url)
{
    opt = 'scrollbars=yes,width=417,height=385,top=10,left=20';
    popup_window(url, "wformmail", opt);
}

// , 를 없앤다.
function no_comma(data)
{
    var tmp = '';
    var comma = ',';
    var i;

    for (i=0; i<data.length; i++)
    {
        if (data.charAt(i) != comma)
            tmp += data.charAt(i);
    }
    return tmp;
}

// 삭제 검사 확인
function del(href)
{
    if(confirm("한번 삭제한 자료는 복구할 방법이 없습니다.\n\n정말 삭제하시겠습니까?")) {
        document.location.href = href;
    }
}

// 쿠키 입력
function set_cookie(name, value, expirehours, domain)
{
    var today = new Date();
    today.setTime(today.getTime() + (60*60*1000*expirehours));
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + today.toGMTString() + ";";
    if (domain) {
        document.cookie += "domain=" + domain + ";";
    }
}

// 쿠키 얻음
function get_cookie(name)
{
	var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
	if (match) return unescape(match[2]);
	return "";
}

// 쿠키 지움
function delete_cookie(name)
{
    var today = new Date();

    today.setTime(today.getTime() - 1);
    var value = get_cookie(name);
    if(value != "")
        document.cookie = name + "=" + value + "; path=/; expires=" + today.toGMTString();
}

var last_id = null;
function menu(id)
{
    if (id != last_id)
    {
        if (last_id != null)
            document.getElementById(last_id).style.display = "none";
        document.getElementById(id).style.display = "block";
        last_id = id;
    }
    else
    {
        document.getElementById(id).style.display = "none";
        last_id = null;
    }
}

function textarea_decrease(id, row)
{
    if (document.getElementById(id).rows - row > 0)
        document.getElementById(id).rows -= row;
}

function textarea_original(id, row)
{
    document.getElementById(id).rows = row;
}

function textarea_increase(id, row)
{
    document.getElementById(id).rows += row;
}

// 글숫자 검사
function check_byte(content, target)
{
    var i = 0;
    var cnt = 0;
    var ch = '';
    var cont = document.getElementById(content).value;

    for (i=0; i<cont.length; i++) {
        ch = cont.charAt(i);
        if (escape(ch).length > 4) {
            cnt += 2;
        } else {
            cnt += 1;
        }
    }
    // 숫자를 출력
    document.getElementById(target).innerHTML = cnt;

    return cnt;
}

// 브라우저에서 오브젝트의 왼쪽 좌표
function get_left_pos(obj)
{
    var parentObj = null;
    var clientObj = obj;
    //var left = obj.offsetLeft + document.body.clientLeft;
    var left = obj.offsetLeft;

    while((parentObj=clientObj.offsetParent) != null)
    {
        left = left + parentObj.offsetLeft;
        clientObj = parentObj;
    }

    return left;
}

// 브라우저에서 오브젝트의 상단 좌표
function get_top_pos(obj)
{
    var parentObj = null;
    var clientObj = obj;
    //var top = obj.offsetTop + document.body.clientTop;
    var top = obj.offsetTop;

    while((parentObj=clientObj.offsetParent) != null)
    {
        top = top + parentObj.offsetTop;
        clientObj = parentObj;
    }

    return top;
}

function flash_movie(src, ids, width, height, wmode)
{
    var wh = "";
    if (parseInt(width) && parseInt(height))
        wh = " width='"+width+"' height='"+height+"' ";
    return "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0' "+wh+" id="+ids+"><param name=wmode value="+wmode+"><param name=movie value="+src+"><param name=quality value=high><embed src="+src+" quality=high wmode="+wmode+" type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/shockwave/download/index.cgi?p1_prod_version=shockwaveflash' "+wh+"></embed></object>";
}

function obj_movie(src, ids, width, height, autostart)
{
    var wh = "";
    if (parseInt(width) && parseInt(height))
        wh = " width='"+width+"' height='"+height+"' ";
    if (!autostart) autostart = false;
    return "<embed src='"+src+"' "+wh+" autostart='"+autostart+"'></embed>";
}

function doc_write(cont)
{
    document.write(cont);
}

var win_password_lost = function(href) {
    window.open(href, "win_password_lost", "left=50, top=50, width=617, height=330, scrollbars=1");
}

$(document).ready(function(){
    $("#login_password_lost, #ol_password_lost").click(function(){
        win_password_lost(this.href);
        return false;
    });
});

/**
 * 포인트 창
 **/
var win_point = function(href) {
    var new_win = window.open(href, 'win_point', 'left=100,top=100,width=600, height=600, scrollbars=1');
    new_win.focus();
}

/**
 * 쪽지 창
 **/
var win_memo = function(href) {
    var new_win = window.open(href, 'win_memo', 'left=100,top=100,width=620,height=500,scrollbars=1');
    new_win.focus();
}

/**
 * 쪽지 창
 **/
var check_goto_new = function(href, event) {
    if( !(typeof g5_is_mobile != "undefined" && g5_is_mobile) ){
        if (window.opener && window.opener.document && window.opener.document.getElementById) {
            event.preventDefault ? event.preventDefault() : (event.returnValue = false);
            window.open(href);
            //window.opener.document.location.href = href;
        }
    }
}

/**
 * 메일 창
 **/
var win_email = function(href) {
    var new_win = window.open(href, 'win_email', 'left=100,top=100,width=600,height=580,scrollbars=1');
    new_win.focus();
}

/**
 * 자기소개 창
 **/
var win_profile = function(href) {
    var new_win = window.open(href, 'win_profile', 'left=100,top=100,width=620,height=510,scrollbars=1');
    new_win.focus();
}

/**
 * 스크랩 창
 **/
var win_scrap = function(href) {
    var new_win = window.open(href, 'win_scrap', 'left=100,top=100,width=600,height=600,scrollbars=1');
    new_win.focus();
}

/**
 * 홈페이지 창
 **/
var win_homepage = function(href) {
    var new_win = window.open(href, 'win_homepage', '');
    new_win.focus();
}

/**
 * 우편번호 창
 **/
var win_zip = function(frm_name, frm_zip, frm_addr1, frm_addr2, frm_addr3, frm_jibeon) {
    if(typeof daum === "undefined"){
        alert("KAKAO 우편번호 서비스 postcode.v2.js 파일이 로드되지 않았습니다.");
        return false;
    }

    // 핀치 줌 현상 제거
    var vContent = "width=device-width,initial-scale=1.0,minimum-scale=0,maximum-scale=10";
    $("#meta_viewport").attr("content", vContent + ",user-scalable=no");

    var zip_case = 1;   //0이면 레이어, 1이면 페이지에 끼워 넣기, 2이면 새창

    var complete_fn = function(data){
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var fullAddr = ''; // 최종 주소 변수
        var extraAddr = ''; // 조합형 주소 변수

        // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            fullAddr = data.roadAddress;

        } else { // 사용자가 지번 주소를 선택했을 경우(J)
            fullAddr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
        if(data.userSelectedType === 'R'){
            //법정동명이 있을 경우 추가한다.
            if(data.bname !== ''){
                extraAddr += data.bname;
            }
            // 건물명이 있을 경우 추가한다.
            if(data.buildingName !== ''){
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
            extraAddr = (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
        }

        // 우편번호와 주소 정보를 해당 필드에 넣고, 커서를 상세주소 필드로 이동한다.
        var of = document[frm_name];

        of[frm_zip].value = data.zonecode;

        of[frm_addr1].value = fullAddr;
        of[frm_addr3].value = extraAddr;

        if(of[frm_jibeon] !== undefined){
            of[frm_jibeon].value = data.userSelectedType;
        }
        
        setTimeout(function(){
            $("#meta_viewport").attr("content", vContent);
            of[frm_addr2].focus();
        } , 100);
    };

    switch(zip_case) {
        case 1 :    //iframe을 이용하여 페이지에 끼워 넣기
            var daum_pape_id = 'daum_juso_page'+frm_zip,
                element_wrap = document.getElementById(daum_pape_id),
                currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
            if (element_wrap == null) {
                element_wrap = document.createElement("div");
                element_wrap.setAttribute("id", daum_pape_id);
                element_wrap.style.cssText = 'display:none;border:1px solid;left:0;width:100%;height:300px;margin:5px 0;position:relative;-webkit-overflow-scrolling:touch;';
                element_wrap.innerHTML = '<img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" style="cursor:pointer;position:absolute;right:0px;top:-21px;z-index:1" class="close_daum_juso" alt="접기 버튼">';
                jQuery('form[name="'+frm_name+'"]').find('input[name="'+frm_addr1+'"]').before(element_wrap);
                jQuery("#"+daum_pape_id).off("click", ".close_daum_juso").on("click", ".close_daum_juso", function(e){
                    e.preventDefault();
                    $("#meta_viewport").attr("content", vContent);
                    jQuery(this).parent().hide();
                });
            }

            new daum.Postcode({
                oncomplete: function(data) {
                    complete_fn(data);
                    // iframe을 넣은 element를 안보이게 한다.
                    element_wrap.style.display = 'none';
                    // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
                    document.body.scrollTop = currentScroll;
                },
                // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분.
                // iframe을 넣은 element의 높이값을 조정한다.
                onresize : function(size) {
                    element_wrap.style.height = size.height + "px";
                },
                maxSuggestItems : g5_is_mobile ? 6 : 10,
                width : '100%',
                height : '100%'
            }).embed(element_wrap);

            // iframe을 넣은 element를 보이게 한다.
            element_wrap.style.display = 'block';
            break;
        case 2 :    //새창으로 띄우기
            new daum.Postcode({
                oncomplete: function(data) {
                    complete_fn(data);
                }
            }).open();
            break;
        default :   //iframe을 이용하여 레이어 띄우기
            var rayer_id = 'daum_juso_rayer'+frm_zip,
                element_layer = document.getElementById(rayer_id);
            if (element_layer == null) {
                element_layer = document.createElement("div");
                element_layer.setAttribute("id", rayer_id);
                element_layer.style.cssText = 'display:none;border:5px solid;position:fixed;width:300px;height:460px;left:50%;margin-left:-155px;top:50%;margin-top:-235px;overflow:hidden;-webkit-overflow-scrolling:touch;z-index:10000';
                element_layer.innerHTML = '<img src="//i1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" class="close_daum_juso" alt="닫기 버튼">';
                document.body.appendChild(element_layer);
                jQuery("#"+rayer_id).off("click", ".close_daum_juso").on("click", ".close_daum_juso", function(e){
                    e.preventDefault();
                    $("#meta_viewport").attr("content", vContent);
                    jQuery(this).parent().hide();
                });
            }

            new daum.Postcode({
                oncomplete: function(data) {
                    complete_fn(data);
                    // iframe을 넣은 element를 안보이게 한다.
                    element_layer.style.display = 'none';
                },
                maxSuggestItems : g5_is_mobile ? 6 : 10,
                width : '100%',
                height : '100%'
            }).embed(element_layer);

            // iframe을 넣은 element를 보이게 한다.
            element_layer.style.display = 'block';
    }
}

/**
 * 새로운 비밀번호 분실 창 : 101123
 **/
win_password_lost = function(href)
{
    var new_win = window.open(href, 'win_password_lost', 'width=617, height=330, scrollbars=1');
    new_win.focus();
}

/**
 * 설문조사 결과
 **/
var win_poll = function(href) {
    var new_win = window.open(href, 'win_poll', 'width=616, height=500, scrollbars=1');
    new_win.focus();
}

/**
 * 쿠폰
 **/
var win_coupon = function(href) {
    var new_win = window.open(href, "win_coupon", "left=100,top=100,width=700, height=600, scrollbars=1");
    new_win.focus();
}


/**
 * 스크린리더 미사용자를 위한 스크립트 - 지운아빠 2013-04-22
 * alt 값만 갖는 그래픽 링크에 마우스오버 시 title 값 부여, 마우스아웃 시 title 값 제거
 **/
$(function() {
    $('a img').mouseover(function() {
        $a_img_title = $(this).attr('alt');
        $(this).attr('title', $a_img_title);
    }).mouseout(function() {
        $(this).attr('title', '');
    });
});

/**
 * 텍스트 리사이즈
**/
function font_resize(id, rmv_class, add_class, othis)
{
    var $el = $("#"+id);

	if((typeof rmv_class !== "undefined" && rmv_class) || (typeof add_class !== "undefined" && add_class)){
		$el.removeClass(rmv_class).addClass(add_class);

		set_cookie("ck_font_resize_rmv_class", rmv_class, 1, g5_cookie_domain);
		set_cookie("ck_font_resize_add_class", add_class, 1, g5_cookie_domain);
	}

    if(typeof othis !== "undefined"){
        $(othis).addClass('select').siblings().removeClass('select');
    }
}

/**
 * 댓글 수정 토큰
**/
function set_comment_token(f)
{
    if(typeof f.token === "undefined")
        $(f).prepend('<input type="hidden" name="token" value="">');

    $.ajax({
        url: g5_bbs_url+"/ajax.comment_token.php",
        type: "GET",
        dataType: "json",
        async: false,
        cache: false,
        success: function(data, textStatus) {
            f.token.value = data.token;
        }
    });
}

$(function(){
    $(".win_point").click(function() {
        win_point(this.href);
        return false;
    });

    $(".win_memo").click(function() {
        win_memo(this.href);
        return false;
    });

    $(".win_email").click(function() {
        win_email(this.href);
        return false;
    });

    $(".win_scrap").click(function() {
        win_scrap(this.href);
        return false;
    });

    $(".win_profile").click(function() {
        win_profile(this.href);
        return false;
    });

    $(".win_homepage").click(function() {
        win_homepage(this.href);
        return false;
    });

    $(".win_password_lost").click(function() {
        win_password_lost(this.href);
        return false;
    });

    /*
    $(".win_poll").click(function() {
        win_poll(this.href);
        return false;
    });
    */

    $(".win_coupon").click(function() {
        win_coupon(this.href);
        return false;
    });

    // 사이드뷰
    var sv_hide = false;
    $(".sv_member, .sv_guest").click(function() {
        $(".sv").removeClass("sv_on");
        $(this).closest(".sv_wrap").find(".sv").addClass("sv_on");
    });

    $(".sv, .sv_wrap").hover(
        function() {
            sv_hide = false;
        },
        function() {
            sv_hide = true;
        }
    );

    $(".sv_member, .sv_guest").focusin(function() {
        sv_hide = false;
        $(".sv").removeClass("sv_on");
        $(this).closest(".sv_wrap").find(".sv").addClass("sv_on");
    });

    $(".sv a").focusin(function() {
        sv_hide = false;
    });

    $(".sv a").focusout(function() {
        sv_hide = true;
    });

    // 셀렉트 ul
    var sel_hide = false;
    $('.sel_btn').click(function() {
        $('.sel_ul').removeClass('sel_on');
        $(this).siblings('.sel_ul').addClass('sel_on');
    });

    $(".sel_wrap").hover(
        function() {
            sel_hide = false;
        },
        function() {
            sel_hide = true;
        }
    );

    $('.sel_a').focusin(function() {
        sel_hide = false;
    });

    $('.sel_a').focusout(function() {
        sel_hide = true;
    });

    $(document).click(function() {
        if(sv_hide) { // 사이드뷰 해제
            $(".sv").removeClass("sv_on");
        }
        if (sel_hide) { // 셀렉트 ul 해제
            $('.sel_ul').removeClass('sel_on');
        }
    });

    $(document).focusin(function() {
        if(sv_hide) { // 사이드뷰 해제
            $(".sv").removeClass("sv_on");
        }
        if (sel_hide) { // 셀렉트 ul 해제
            $('.sel_ul').removeClass('sel_on');
        }
    });

    $(document).on( "keyup change", "textarea#wr_content[maxlength]", function(){
        var str = $(this).val();
        var mx = parseInt($(this).attr("maxlength"));
        if (str.length > mx) {
            $(this).val(str.substr(0, mx));
            return false;
        }
    });
});

function get_write_token(bo_table)
{
    var token = "";

    $.ajax({
        type: "POST",
        url: g5_bbs_url+"/write_token.php",
        data: { bo_table: bo_table },
        cache: false,
        async: false,
        dataType: "json",
        success: function(data) {
            if(data.error) {
                alert(data.error);
                if(data.url)
                    document.location.href = data.url;

                return false;
            }

            token = data.token;
        }
    });

    return token;
}

$(function() {
    $(document).on("click", "form[name=fwrite] input:submit, form[name=fwrite] button:submit, form[name=fwrite] input:image", function() {
        var f = this.form;

        if (typeof(f.bo_table) == "undefined") {
            return;
        }

        var bo_table = f.bo_table.value;
        var token = get_write_token(bo_table);

        if(!token) {
            alert("토큰 정보가 올바르지 않습니다.");
            return false;
        }

        var $f = $(f);

        if(typeof f.token === "undefined")
            $f.prepend('<input type="hidden" name="token" value="">');

        $f.find("input[name=token]").val(token);

        return true;
    });
});



//디자인팀 작업 내용 추가
// include.js
window.addEventListener('load', function() {
    var allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, function(el) {
        var includePath = el.dataset.includePath;
        if (includePath) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    el.outerHTML = this.responseText;
                }
            };
            xhttp.open('GET', includePath, true);
            xhttp.send();
        }
    });
});
$(function(){
document.querySelector('head title').textContent = 'TOVA'
});


// ★★ lenis 멈추기 ★★
function handlePopupScroll(e) {
    $('body').css('overflow', 'hidden');
    $('body').on('wheel', function(e) {
        e.stopPropagation();
    });
    $('body').on('touchmove', function(e) {
        e.stopPropagation();
    });
    lenis.stop();
}


// 각 팝업창 불러오기
function agreement(){
    $(".popup_wrap").hide(); 
    $('.btn_close').show();   
    $('#pop_agreement').show(0, function(){
        handlePopupScroll();
        console.log('body stop 완료')
        $.getScript("../js/popup.js", function() {
        });
    });     
};

function join(){
    $(".popup_wrap").hide();    
    $('#pop_join').show(0, function(){
        handlePopupScroll();
        console.log('body stop 완료')
        $.getScript("../js/popup.js", function() {
        });});     
};

function login(){
    $(".popup_wrap").hide();    
    $('#pop_login').show(0, function(){
        handlePopupScroll();
        console.log('body stop 완료')
        $.getScript("../js/popup.js", function() {
        });});     
};  

function mypage01(){
    $(".popup_wrap").hide(); 
    $('.btn_close').show();   
    $('#pop_mypage01').show(0, function(){
        handlePopupScroll();
        console.log('body stop 완료')
        $.getScript("../js/popup.js", function() {
        });});     
}; 

function mypage02(){
    $(".popup_wrap").hide();    
    $('#pop_mypage02').show(0, function(){
        handlePopupScroll();
        console.log('body stop 완료')
        $.getScript("../js/popup.js", function() {
        });});     
}; 

function mypage03(){
    $(".popup_wrap").hide();    
    $('#pop_mypage03').show(0, function(){
        handlePopupScroll();
        console.log('body stop 완료')
        $.getScript("../js/popup.js", function() {
        });});     
};    

function search(){
    $(".popup_wrap").hide();    
    $('#pop_search').show(0, function(){
        handlePopupScroll();
        console.log('body stop 완료')
        $.getScript("../js/popup.js", function() {
        });});     
};   

function sitemap(){
    $(".popup_sitemap").hide();
    $('#sitemap').show(0, function(){
        handlePopupScroll();
        console.log('body stop 완료')
        $.getScript("../js/popup.js", function() {
        });});     
};



function privacy(type) {
    $(".popup_wrap").hide();
    $('#pop_privacy').show(0, function() {
        handlePopupScroll();
        console.log('body stop 완료')
        $.getScript("../js/popup.js", function() {
            if (type === 'privacy') {
                $('#pop_privacy li.tab_privacy').addClass('on');
                $('#pop_privacy li.tab_agreement').removeClass('on');
                $('.content.pri').addClass('show').removeClass('hide');
                $('.content.agr').removeClass('show').addClass('hide');
                
            } else if (type === 'agreement') {
                $('#pop_privacy li.tab_agreement').addClass('on');
                $('#pop_privacy li.tab_privacy').removeClass('on');
                $('.content.agr').addClass('show').removeClass('hide');
                $('.content.pri').removeClass('show').addClass('hide');
            }

        });
    });
};

// HEADER - 스크롤시 숨기기
function setupHeaderAnimation() {
    const header = document.querySelector('header');
    if (!header) {
        return;
    }

    const applyHeaderScrollClasses = (scrollY, direction) => {
        const isScrolled = scrollY > 0;
        header.classList.toggle('is-scrolled', isScrolled);
        header.classList.toggle('is-scroll-down', isScrolled && direction === 1);
        header.classList.toggle('is-scroll-up', isScrolled && direction === -1);
    };

    // GSAP ScrollTrigger가 있으면 스크롤 방향까지 반영
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
            start: 'top top',
            end: 99999,
            onUpdate: (self) => {
                if (window.sitemapManager && window.sitemapManager.isOpen) return;
                applyHeaderScrollClasses(self.scroll(), self.direction);
            }
        });
        applyHeaderScrollClasses(window.scrollY || 0, 1);
        return;
    }

    // fallback: 기본 스크롤만 감지(방향은 계산)
    let lastY = window.scrollY || 0;
    const onScroll = () => {
        const y = window.scrollY || 0;
        const direction = y > lastY ? 1 : -1;
        lastY = y;
        applyHeaderScrollClasses(y, direction);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

function injectBaronHeaderStyles(locale) {
    if (document.getElementById('baron-header-style')) {
        return;
    }

    const logoPath = locale === 'en'
        ? '../../../baron/assets/img/eng/logo_c.svg'
        : '../../../baron/assets/img/logo_c.svg';

    const style = document.createElement('style');
    style.id = 'baron-header-style';
    style.textContent = document.querySelector('#baron-header-style-template')?.textContent || `
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
        header.js__header.baron-shell.is-scrolled,
        header.js__header.baron-shell:not(:has(.sitemap.open)) {
            background: #fff !important;
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
        header.js__header.baron-shell nav { height: 100%; }
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
        header.js__header.baron-shell nav ol li.depth1:hover span { font-weight: 500; opacity: 1; }
        header.js__header.baron-shell nav ol li.depth1.active em,
        header.js__header.baron-shell nav ol li.depth1:hover em { opacity: 1; }
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
        header.js__header.baron-shell nav ol li.depth1:hover ul.depth2 { display: block; }
        header.js__header.baron-shell nav ol li.depth1 ul.depth2 li {
            width: 100%;
            margin-top: 10px;
            text-align: center;
        }
        header.js__header.baron-shell nav ol li.depth1 ul.depth2 li:first-child,
        header.js__header.baron-shell nav ol li.depth1 ul.depth2 li ul.depth3 li:first-child { margin-top: 0; }
        header.js__header.baron-shell nav ol li.depth1 ul.depth2 li a {
            display: block;
            font-size: 16px;
            line-height: 28px;
        }
        header.js__header.baron-shell nav ol li.depth1 ul.depth2 li:hover > a { color: #006aff; }
        header.js__header.baron-shell nav ol li.depth1 ul.depth2 li.has_depth3 { position: relative; }
        header.js__header.baron-shell nav ol li.depth1 ul.depth2 li.has_depth3 > a { font-weight: 700; }
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
        header.js__header.baron-shell nav ol li.depth1 ul.depth2 li.has_depth3:hover ul.depth3 { display: block; }
        header.js__header.baron-shell nav ol li.depth1 ul.depth2 li ul.depth3 li { margin-top: 10px; }
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
        header.js__header.baron-shell .header_R .language a.on { opacity: 1; }
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
        header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1:hover { opacity: 1; }
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
        header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 li.has_depth3 > a { font-weight: 700; }
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
            header.js__header.baron-shell .header_inner { gap: 24px; padding: 0 24px; }
            header.js__header.baron-shell .header_inner nav { display: none; }
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
            header.js__header.baron-shell .popup_wrap.sitemap .btn_close i::after { background: #fff; }
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
            header.js__header.baron-shell .popup_wrap.sitemap nav ol::before { content: none; }
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
            header.js__header.baron-shell .popup_wrap.sitemap nav ol li.depth1 ul.depth2 li.has_depth3 { opacity: 1; }
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
            console.error(`Failed to load ${url}:`, error || status);
            if (typeof callback === 'function') {
                callback();
            }
        }
    });
}

function setupBaronHeaderBrand() {
    const header = document.querySelector('header.js__header');
    if (!header) {
        return;
    }

    const currentFile = (window.location.pathname.split('/').pop() || 'index.html').split('?')[0];
    injectBaronHeaderStyles('en');

    header.id = 'header';
    header.className = 'js__header baron-shell';

    document.querySelectorAll('.popup_sitemap').forEach((popup) => popup.remove());

    loadBaronInclude('/baron/_include/eng/header.html', '#header', function () {
        loadBaronInclude('/baron/_include/eng/nav.html', '#header .corp .nav', function () {
            loadBaronInclude('/baron/_include/eng/nav.html', '#header .popup_wrap.sitemap .popup_contents_wrap nav', function () {
                const languageLinks = header.querySelectorAll('.language a');
                if (languageLinks.length >= 2) {
                    languageLinks[0].setAttribute('href', `../ko/${currentFile}`);
                    languageLinks[1].setAttribute('href', `./${currentFile}`);
                    languageLinks[0].classList.remove('on');
                    languageLinks[1].classList.add('on');
                }

                activateBaronHeaderLink(header, currentFile);
                setupBaronHeaderInteractions(header);
            });
        });
    });
}

function getBaronNavMarkup() {
        return `
                <ol>
                    <li class="depth1">
                        <span><em>Designing the Future</em>Baron Consultants</span>
                        <ul class="depth2">
                            <li><a href="/baron/en/br_future.html">Future Presented by Baron</a></li>
                            <li><a href="/baron/en/br_tech.html">Technology Realized by Baron</a></li>
                            <li><a href="/baron/en/br_value.html">The Values Pursued by Baron</a></li>
                        </ul>
                    </li>
                    <li class="depth1">
                        <span><em>Leading the Change</em>Digital Transformation</span>
                        <ul class="depth2">
                            <li><a href="/baron/en/dt_explain.html">D/X <br>Infrastructure Construction</a></li>
                            <li><a href="/baron/en/dt_sw.html">D/X &amp; Software</a></li>
                            <li><a href="/baron/en/dt_use.html">Leveraging D/X<br>Infrastructure Construction</a></li>
                        </ul>
                    </li>
                    <li class="depth1">
                        <span onclick="location.href='/baron/en/sv_solution.html'"><em>Realizing Value</em>Solution Program</span>
                        <ul class="depth2">
                            <li><a href="/baron/en/sv_solution.html">Design Solution</a></li>
                            <li><a href="/baron/en/sv_solution_construction.html">Construction Solution</a></li>
                            <li><a href="/baron/en/sv_solution_operation.html">Operation &amp; Maintenance Solution</a></li>
                        </ul>
                    </li>
                    <li class="depth1 active">
                        <span onclick="location.href='/baron/en/sv_sw.html'"><em>Realizing Value</em>Package S/W</span>
                        <ul class="depth2">
                            <li class="has_depth3">
                                <a href="/baron/en/sv_sw.html">TOVA</a>
                                <ul class="depth3">
                                    <li><a href="/tova/www/en/value.html">About TOVA</a></li>
                                    <li><a href="/tova/www/en/primary.html">Key Features</a></li>
                                    <li><a href="/tova/www/en/road.html">Roadway Analysis</a></li>
                                    <li><a href="/tova/www/en/public.html">Public Transit Analysis</a></li>
                                    <li><a href="/tova/www/en/buy.html">Contact</a></li>
                                </ul>
                            </li>
                            <li><a href="/baron/en/sv_sw_egbim.html">EG-BIM</a></li>
                            <li><a href="/baron/en/sv_sw_gaia.html">GAIA</a></li>
                            <li><a href="/baron/en/sv_sw_kngil.html">KNGIL</a></li>
                            <li><a href="/baron/en/sv_sw_ipipes.html">iPipeS</a></li>
                            <li><a href="/baron/en/sv_sw_pq_program.html">PQ Program</a></li>
                        </ul>
                    </li>
                    <li class="depth1">
                        <span onclick="location.href='/baron/en/sv_bigroom.html'"><em>Realizing Value</em>Big Room</span>
                        <ul class="depth2">
                            <li><a href="/baron/en/sv_bigroom.html">Big Room</a></li>
                        </ul>
                    </li>
                    <li class="depth1">
                        <span><em>Experiencing the Vision</em>D/X Experience</span>
                        <ul class="depth2">
                            <li><a href="/baron/en/dx.html">D/X experience<br>to experience the vision</a></li>
                        </ul>
                    </li>
                    <li class="depth1">
                        <span><em>Telling a story</em>PR Center</span>
                        <ul class="depth2">
                            <li><a href="/baron/en/pr_news.html">Baron News</a></li>
                            <li><a href="/baron/en/pr_brochure.html">Brochure</a></li>
                            <li><a href="/baron/en/pr_ci.html">CI</a></li>
                        </ul>
                    </li>
                </ol>
        `;
}

function activateBaronHeaderLink(header, currentFile) {
    const links = header.querySelectorAll('nav a');
    links.forEach((link) => {
        const href = link.getAttribute('href') || '';
        if (href.split('/').pop() === currentFile) {
            const depth1 = link.closest('.depth1');
            if (depth1) {
                depth1.classList.add('active');
            }
        }
    });
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
                header.querySelectorAll('.popup_wrap.sitemap ol > li.depth1.active .depth2').forEach((depth2) => {
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

    sitemapPopup?.addEventListener('click', function (event) {
        if (event.target === sitemapPopup || event.target.classList.contains('popup_contents_wrap')) {
            sitemapPopup.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    const mobileNavItems = header.querySelectorAll('.popup_wrap.sitemap ol > li.depth1');
    if (window.innerWidth <= 1024) {
        mobileNavItems.forEach((item) => {
            const depth2 = item.querySelector('.depth2');
            if (item.classList.contains('active') && depth2) {
                depth2.style.maxHeight = depth2.scrollHeight + 'px';
            }
        });
    }
    mobileNavItems.forEach((item, index) => {
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
        footer#footer.baron-footer .btn_top:hover::after {
            transition: 0.2s;
            padding: 0;
        }
        footer#footer.baron-footer .btn_top:hover .arrow {
            transition: 0.2s;
            padding: 0;
            bottom: 12px;
        }
        footer#footer.baron-footer .btn_top:hover .arrow::after,
        footer#footer.baron-footer .btn_top:hover .arrow::before {
            transition: 0.2s;
            padding: 0;
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

function getBaronFooterMarkup(locale) {
    const homeHref = window.location.protocol === 'file:'
        ? (locale === 'en' ? '../../../baron/en/index.html' : '../../../baron/ko/index.html')
        : (locale === 'en' ? '/baron/en/index.html' : '/baron/ko/index.html');

    if (locale === 'en') {
        return `
            <div class="footer_inner">
                <nav class="nav">${getBaronNavMarkup()}</nav>
                <div class="family_wrap">
                    <div class="family_btn"><span>Family Site</span><i></i></div>
                    <ul class="family_list">
                        <li><a href="http://www.hanmaceng.co.kr" target="_blank">hanmac</a></li>
                        <li><a href="https://www.samaneng.co.kr/" target="_blank">saman</a></li>
                        <li><a href="http://www.jangheon.co.kr/" target="_blank">jangheon</a></li>
                        <li><a href="http://www.pre-cast.co.kr/" target="_blank">PTC</a></li>
                        <li><a href="http://www.hallasanup.com/" target="_blank">hallasanup</a></li>
                    </ul>
                </div>
                <hr />
                <div class="footer_info">
                    <div class="logo"><a class="home" href="${homeHref}">Baron Consultants</a></div>
                    <span><em>Address.</em>554, Ogeum-ro, Songpa-gu, Seoul, Republic of Korea</span>
                    <span><em>Tel.</em>02-2141-7434</span>
                    <span><em>Mail.</em>baroncs@baroncs.co.kr</span>
                    <span><em>CEO.</em>Jang Jong Chan</span>
                    <span><em>© Baron Consultants Co,.Ltd All Rights Reserved.</em></span>
                </div>
            </div>
            <button class="btn_top js__top" onclick="window.scrollTo(0,0);"><div class="arrow"></div></button>
        `;
    }

    return `
        <div class="footer_inner">
            <nav class="nav">${getBaronNavMarkup()}</nav>
            <div class="family_wrap">
                <div class="family_btn"><span>Family Site</span><i></i></div>
                <ul class="family_list">
                    <li><a href="http://www.hanmaceng.co.kr" target="_blank">한맥기술</a></li>
                    <li><a href="https://www.samaneng.co.kr/" target="_blank">삼안</a></li>
                    <li><a href="http://www.jangheon.co.kr/" target="_blank">장헌산업</a></li>
                    <li><a href="http://www.pre-cast.co.kr/" target="_blank">피티씨</a></li>
                    <li><a href="http://www.hallasanup.com/" target="_blank">한라산업개발</a></li>
                </ul>
            </div>
            <hr />
            <div class="footer_info">
                <div class="logo"><a class="home" href="${homeHref}">(주) 바론컨설턴트</a></div>
                <span><em>주소.</em>서울특별시 송파구 오금로 554(거여동)</span>
                <span><em>Tel.</em>02-2141-7434</span>
                <span><em>Mail.</em>baroncs@baroncs.co.kr</span>
                <span><em>대표이사.</em>장종찬</span>
                <span><em>© BARON Consultants Co,.Ltd All Rights Reserved.</em></span>
            </div>
        </div>
        <button class="btn_top js__top" onclick="window.scrollTo(0,0);"><div class="arrow"></div></button>
    `;
}

function setupBaronFooterBrand() {
    const footer = document.querySelector('footer#footer');
    if (!footer) {
        return;
    }

    injectBaronFooterStyles('en');
    footer.className = 'baron-footer';

    loadBaronInclude('/baron/_include/eng/footer.html', '#footer', function () {
        loadBaronInclude('/baron/_include/eng/nav.html', '#footer .nav', function () {
            const depth3Menus = footer.querySelectorAll('.nav ol li.has_depth3 > .depth3');
            depth3Menus.forEach((menu) => {
                menu.style.display = 'none';
            });

            footer.querySelectorAll('.nav ol li.has_depth3 > a').forEach((link) => {
                link.addEventListener('click', function (event) {
                    event.preventDefault();
                    const depth3 = this.nextElementSibling;
                    if (!depth3) {
                        return;
                    }

                    const willOpen = depth3.style.display === 'none' || depth3.style.display === '';
                    depth3Menus.forEach((menu) => {
                        menu.style.display = 'none';
                    });

                    if (willOpen) {
                        depth3.style.display = 'flex';
                    }
                });
            });

            initializeTopButton();
        });
    });
}

document.addEventListener('DOMContentLoaded', setupHeaderAnimation);
document.addEventListener('DOMContentLoaded', setupBaronHeaderBrand);
document.addEventListener('DOMContentLoaded', setupBaronFooterBrand);

// FOOTER - top버튼 위치 조정하기
function initializeTopButton() {
    const topButton = document.querySelector('.btn_top');
    if (!topButton) {
        return;
    }

    function adjustButtonPosition() {
        const scrollY = window.scrollY; // 현재 스크롤 위치
        const windowHeight = window.innerHeight; // 윈도우 높이
        const documentHeight = document.documentElement.scrollHeight; // 문서 전체 높이

        const bottomSpace = 120; // 탑 버튼이 아래에서 떨어져 있어야 하는 거리
        // const buttonHeight = topButton.offsetHeight; // 탑 버튼의 높이

        // 문서의 맨 아래로부터 300px 떨어지기 위한 계산
        if (scrollY + windowHeight >= documentHeight - bottomSpace) {
            topButton.style.bottom = `${bottomSpace + (scrollY + windowHeight - documentHeight)}px`;
        } else {
            topButton.style.bottom = '60px'; // 원래의 위치
        }
    }
    window.addEventListener('scroll', adjustButtonPosition);
    window.addEventListener('load', adjustButtonPosition);
    // 새로운 코드 추가 - topButton의 표시/숨기기 로직
    function toggleTopButtonClass() {
        if (window.scrollY === 0) {
            topButton.classList.remove('topbtn_on');
            topButton.classList.add('topbtn_off'); // 스크롤이 맨 위일 때 topbtn_off 추가
        } else {
            topButton.classList.remove('topbtn_off');
            topButton.classList.add('topbtn_on'); // 스크롤이 내려가면 topbtn_on으로 변경
        }
    }

    window.addEventListener('scroll', toggleTopButtonClass);
    window.addEventListener('load', toggleTopButtonClass); // 페이지 로드 시 초기 상태 설정
}




// FOOTER - 패밀리사이트 열고닫기
$(function(){
    $('.js__header .menu_my').mouseover(function(){
        // console.log('menu_open');
        $('.menu_my_list').show();        
    })

    $('.menu_my').mouseout(function(){
        $('.menu_my_list').hide();
    })
    //footer family site toggle
    $('.family_btn').click(function(event){
        event.stopPropagation(); // family_btn 클릭 시 이벤트 전파를 막음
        $('.family_list').toggleClass('family_on');
        $('.family_btn').toggleClass('family_on');
    });

    // 화면 아무 곳이나 클릭했을 때 family_list를 제외한 영역 클릭 시 리스트 닫기
    $(document).click(function(event) {
        if (!$(event.target).closest('.family_list').length && !$(event.target).closest('.family_btn').length) {
            // family_list와 family_btn 외의 영역을 클릭한 경우
            $('.family_list').removeClass('family_on');
            $('.family_btn').removeClass('family_on');
        }
    });
});



// 마우스 스크롤 마크 표시하기
// 사용 클래스 : js__mouse_mark ,  js__mouse_area
// + TODO 진슬 추가_ addEventListener error debugging
window.onload = function(){
  document.addEventListener('DOMContentLoaded', () => {
      const mouseMark = document.querySelector('.js__mouse_mark');
      const mouseArea = document.querySelector('.js__mouse_area');
      const mouseNot = document.querySelector('.js__mouse_not');
      const mouseNot02 = document.querySelector('.js__mouse_not02');
      
      mouseArea.addEventListener('mousemove', (e) => {          
          mouseMark.style.left = `${e.clientX}px`;
          mouseMark.style.top = `${e.clientY}px`;        
          mouseMark.style.display = 'flex';
      });

      mouseArea.addEventListener('mouseleave', () => mouseMark.style.display = 'none');
      
      mouseNot.addEventListener('mouseover', () => mouseMark.style.opacity = '0');
      mouseNot.addEventListener('mouseleave', () => mouseMark.style.opacity = '1');
      mouseNot02.addEventListener('mouseover', () => mouseMark.style.visibility = 'hidden');
      mouseNot02.addEventListener('mouseleave', () => mouseMark.style.visibility = 'visible');
  });
}

// 이메일 줄바꿈
document.addEventListener('DOMContentLoaded', () => {
    const emailSpan = document.getElementById('span_email');

    if (!emailSpan) {
        return;
    }

    function addBreakToEmail() {
        // 요소의 width를 가져옴
        const emailWidth = emailSpan.offsetWidth;

        // width가 400px 이상일 때
        if (emailWidth >= 250) {
            let emailText = emailSpan.textContent; // 현재 이메일 텍스트
            const emailParts = emailText.split('@'); // @를 기준으로 분리

            if (emailParts.length === 2) { // 유효한 이메일 형식인지 확인
                emailSpan.innerHTML = `${emailParts[0]}<br>@${emailParts[1]}`; // @ 앞에 <br> 태그 추가
            }
        }
    }

    // 페이지가 로드된 후 실행
    window.addEventListener('load', addBreakToEmail);
});


// HEADER - faq버튼이 배경에 따라 블랙&화이트로 변하기 ==== TOVA용
document.addEventListener('DOMContentLoaded', function() {
    const goFaq = document.querySelector('.floating_faq');
    const darkSections = document.querySelectorAll('.js__dark');

    if (!goFaq || !darkSections.length) {
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observerCallback = (entries) => {
        let darkSectionVisible = false;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                darkSectionVisible = true;
            }
        });
        if (darkSectionVisible) {
            // console.log('어두운 배경 in')
            goFaq.style.backgroundColor = '#fff';
            goFaq.style.color = '#000';
            const faqIcon = goFaq.querySelector('a i');
            if (faqIcon) {
                faqIcon.style.backgroundImage = "url(../img/ico_floating_faq_k.svg)";
            }
        } else {
            // console.log('어두운 배경 out')
            goFaq.style.backgroundColor = '#000';
            goFaq.style.color = '#fff';
            const faqIcon = goFaq.querySelector('a i');
            if (faqIcon) {
                faqIcon.style.backgroundImage = "url(../img/ico_floating_faq_w.svg)";
            }

        }
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    darkSections.forEach(section => observer.observe(section));
});