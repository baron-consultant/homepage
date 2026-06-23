window.onload = function() {
    $.ajax({
        url: "some_api_endpoint",
        success: function(response) {
        },
        complete: function() {

            // 팝업 닫기버튼
            $(document).ready(function() {
                $('.btn_close').click(function() {
                  $('.popup_wrap').hide();
                  $('body').css('overflow', '');  // 기본 스크롤 상태로 복귀
                  lenis.start();
                });
            });
            $(document).ready(function() {
                $('.btn_map_close').click(function() {
                  $('.popup_sitemap').hide();
                  $('body').css('overflow', '');  // 기본 스크롤 상태로 복귀
                  lenis.start();
                });
            });


            // 이메일 직접입력
            $(document).ready(function() {
                $('#domain-list').change(function() {
                    if ($(this).val() === 'type') {
                        $('#custom-domain').show().focus();
                    } else {
                        $('#custom-domain').hide().val('');
                    }
                });
            });


            // 인증번호 타이머
            $(document).ready(function() {
                // 인증번호 버튼 클릭 시
                $('.cert_number').click(function() {
                    $('.code').show();
                });
            
                // 확인 버튼 클릭 시
                $('.check').click(function() {
                    $(this).hide();
                    $('.check.complete').show();
                    clearInterval(interval); // 타이머 멈춤
                    $('.timer').remove(); // 타이머 요소 삭제
                });
    
                // 타이머 함수
                var interval;
                function startTimer(duration, display) {
                    clearInterval(interval);
                    var timer = duration, minutes, seconds;
            
                    function updateTimer() {
                        minutes = parseInt(timer / 60, 10);
                        seconds = parseInt(timer % 60, 10);
            
                        minutes = minutes < 10 ? "0" + minutes : minutes;
                        seconds = seconds < 10 ? "0" + seconds : seconds;
            
                        display.text(minutes + ":" + seconds);
            
                        if (--timer < 0) {
                            clearInterval(interval);
                            display.text("00:00");
                        }
                    }
            
                    updateTimer();
                    interval = setInterval(updateTimer, 1000);
                }
    
                var threeMinutes = 60 * 3,
                    display = $('.timer');
            
                startTimer(threeMinutes, display);
            
                $('.cert_number').click(function() {
                    startTimer(threeMinutes, display);
                });
            });
  
  
            // 아이디찾기
            $(document).ready(function(){
                $('.find_email').click(function(){
                    $('.find_ph').removeClass('on').prop('checked', false);
                    $(this).addClass('on').prop('checked', true);
                    $('.ph').hide();
                    $('.email').show();
                });
            
                $('.find_ph').click(function(){
                    $('.find_email').removeClass('on').prop('checked', false);
                    $(this).addClass('on').prop('checked', true);
                    $('.email').hide();
                    $('.ph').show();
                });
            });

  
            // ----
            $(document).ready(function() {
                $('.btn_id').on('click', function() {
                    $('.btn_id').addClass('on');
                    $('.btn_pw').removeClass('on');
                    $('.content.id').show();
                    $('.content.pw').hide();
                });
            
                $('.btn_pw').on('click', function() {
                    $('.btn_pw').addClass('on');
                    $('.btn_id').removeClass('on');
                    $('.content.pw').show();
                    $('.content.id').hide();
                });
            
                $('#domain-list').on('change', function() {
                    if ($(this).val() === 'type') {
                        $('#custom-domain').show();
                    } else {
                        $('#custom-domain').hide();
                    }
                });
            });
  
  
            // 전체약관동의
            $(document).ready(function() {
                function toggleJoinButton() {
                    // 모든 개별 체크박스가 체크되었는지 확인
                    var allChecked = $('.terms_wrap input[type="checkbox"]').length === $('.terms_wrap input[type="checkbox"]:checked').length;
            
                    // '약관에 모두 동의합니다' 체크박스 상태에 따라 조정
                    $('.checkbox_wrap.all input[type="checkbox"]').prop('checked', allChecked);
            
                    // 모든 체크박스가 체크되지 않은 경우 버튼에 'none' 클래스 추가하고 disabled 속성 추가
                    if (allChecked) {
                        $('.join_btn_wrap').removeClass('none');
                        $('.join_btn_wrap button').prop('disabled', false);
                    } else {
                        $('.join_btn_wrap').addClass('none');
                        $('.join_btn_wrap button').prop('disabled', true);
                    }
                }
            
                // '약관에 모두 동의합니다' 체크박스의 변경 이벤트
                $('.checkbox_wrap.all input[type="checkbox"]').on('change', function() {
                    var isChecked = $(this).is(':checked');
                    $('.terms_wrap input[type="checkbox"]').prop('checked', isChecked);
                    toggleJoinButton(); // 버튼 상태 업데이트
                });
            
                // 각 terms_wrap의 개별 체크박스 변경 이벤트
                $('.terms_wrap input[type="checkbox"]').on('change', function() {
                    toggleJoinButton(); // 버튼 상태 업데이트
                });
            
                // 초기 상태 설정
                toggleJoinButton();
            });

  
            // 전송완료
            $(document).ready(function() {
                $('.pw .join_btn_wrap button').click(function() {
                    $('.contents_wrap').children().not('.messages').hide();
                    $('.messages').show();
                });
            });
  
  
            // 가입완료
            $(document).ready(function() {
                $('.join.completion .join_btn_wrap button').click(function() {
                    $('.pop_input_wrap form').children().not('.messages').hide();
                    $('.messages').show();
                });
            });
  
            $(document).ready(function() {
                $('.join.completion .join_btn_wrap button').click(function() {
                    $('.pop_input_wrap form').children().not('.messages').hide();
                    $('.messages').show();
            
                    // 세 번째 단계에 'on' 클래스 추가하고, 다른 단계에서 'on' 클래스 제거
                    $('.join_progress .join_step').removeClass('on');
                    $('.join_progress .join_step').eq(2).addClass('on');
                });
            });
            
            // 개인정보 보호정책 스크립트
            $(document).ready(function() {  
                $('.tab_privacy').on('click', function() {
                    $(this).addClass('on');
                    $('.tab_agreement').removeClass('on');
                    $('.content.pri').addClass('show').removeClass('hide');
                    $('.content.agr').removeClass('show').addClass('hide');
                });
                $('.tab_agreement').on('click', function() {
                    $(this).addClass('on');
                    $('.tab_privacy').removeClass('on');
                    $('.content.agr').addClass('show').removeClass('hide');
                    $('.content.pri').removeClass('show').addClass('hide');
                });
            });


            
            // -----------------여기 위로만 적기
        }
    });
};