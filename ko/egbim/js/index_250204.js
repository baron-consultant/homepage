$(function(){
    var obj = document.getElementById("video_play");
    var video = $("#video_play").get(0);
    var i = 1;
        
    // 인트로 페이지 종료후 첫영상 실행
    video.pause();
    $('.pagination_main').hide()

    if (sessionStorage.getItem('visited')) {
        video.play();
        $('.pagination_main').show();
    } else {
        setTimeout(function(){
            video.play();
            $('.pagination_main').show();
        }, 2800);
    }


    // 페이지 네이션 -클릭하면 해당 영상 실행
    $('.page_01').click(function(){
        i=1;
        $("#video_play").attr("src", "img/main_"+i+".mp4");
        $(this).addClass('page_on');
        $(".pagination_main div").not(this).removeClass('page_on');
        $(".main_link_0"+i).addClass("link_on");
        $(".main_link a").not(".main_link_0"+i).removeClass("link_on");
    });
    $('.page_02').click(function(){
        i=2;
        $("#video_play").attr("src", "img/main_"+i+".mp4");
        $(this).addClass('page_on');
        $(".pagination_main div").not(this).removeClass('page_on');
        $(".main_link_0"+i).addClass("link_on");
        $(".main_link a").not(".main_link_0"+i).removeClass("link_on");
    });
    $('.page_03').click(function(){
        i=3;
        $("#video_play").attr("src", "img/main_"+i+".mp4");
        $(this).addClass('page_on');
        $(".pagination_main div").not(this).removeClass('page_on');
        $(".main_link_0"+i).addClass("link_on");
        $(".main_link a").not(".main_link_0"+i).removeClass("link_on");
    });
    $('.page_04').click(function(){
        i=4;
        $("#video_play").attr("src", "img/main_"+i+".mp4");
        $(this).addClass('page_on');
        $(".pagination_main div").not(this).removeClass('page_on');
        $(".main_link_0"+i).addClass("link_on");
        $(".main_link a").not(".main_link_0"+i).removeClass("link_on");
    });
    $('.page_05').click(function(){
        i=5;
        $("#video_play").attr("src", "img/main_"+i+".mp4");
        $(this).addClass('page_on');
        $(".pagination_main div").not(this).removeClass('page_on');
        $(".main_link_0"+i).addClass("link_on");
        $(".main_link a").not(".main_link_0"+i).removeClass("link_on");
    });
    

    // 영상 종료후 다음 영상 실행
    $('#video_play').on("ended", function(){
        if(i<5){
            i=i+1;
            $("#video_play").attr("src", "img/main_"+i+".mp4");
            $(".page_0"+i).addClass("page_on");
            $(".pagination_main div").not(".page_0"+i).removeClass("page_on");
            $(".main_link_0"+i).addClass("link_on");
            $(".main_link a").not(".main_link_0"+i).removeClass("link_on");
            
            return;    
        } else{
            i=1;
            $("#video_play").attr("src", "img/main_"+i+".mp4");
            $(".page_0"+i).addClass("page_on");
            $(".pagination_main div").not(".page_0"+i).removeClass("page_on");      
            $(".main_link_0"+i).addClass("link_on");
            $(".main_link a").not(".main_link_0"+i).removeClass("link_on");     
          
        }
        obj.play();        
    }); 
});


$(function(){
    //main footer 토글
    $(".main").on("mousewheel",function(event,delta){
        console.log('hi')
        if(delta>0){
            console.log('bye')
            $("footer").addClass('footer_off');
            $("footer").removeClass('footer_on');
        }else if(delta<0){
            $("footer").addClass('footer_on');
            $("footer").removeClass('footer_off');;
        }
    });

    //footer 닫기
    $('.footer_close').click(function(){
        $("footer").addClass('footer_off');
        $("footer").removeClass('footer_on');
    });
});


// 인트로 없애기
// 1. 홈페이지에 들어오면 sessionStorage에 visited 추가
// 2. visited가 있는 동안에는 인트로 삭제
// 3. 브라우저 종료 or 탭 닫으면 visited 자동 삭제
document.addEventListener("DOMContentLoaded", function() {
    const intro = document.querySelector('.intro_wrap');

    if (sessionStorage.getItem('visited')) {
        console.log('visited')
        intro.style.display = "none";
        document.querySelector('.main_mask').classList.add('skip')

    } else {
        setTimeout(() => {
            sessionStorage.setItem('visited', 'true');
        }, 1000);
    }
});