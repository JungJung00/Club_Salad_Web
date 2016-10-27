// TODO success 호출 뒤 값을 return하는 방법을 알 수가 없어 일단 async:false로 동기식으로 진행함...ㅠㅜㅠㅜㅜㅠㅜㅍ러ㅜㅊ타퍼ㅜ푸탚ㄴㅍㅌㅋㅋㅋㅌㅋㅋㅋㅋㅌㅋㅋㅋㅋ
// ID 유효성 검사
function idFilter(){
  var check = false;
  // 값이 입력되었는가
  if($('#input-id').val() == ""){
    $('#input-id + span').text('Input value')
                         .fadeIn({duration: 1000, queue: false});
    $('#input-id').css('border-color', '#FF4040');
    return check;
  }
  // 한글이 포함되었는가
  else if($('#input-id').val().match(/[ㄱ-ㅎㅏ-ㅣ가-힣]/)){
    $('#input-id + span').text('Input only English or \'_\'')
                         .fadeIn({duration: 1000, queue: false});
    $('#input-id').css('border-color', '#FF4040');
    return check;
  }
  // 특수문자가 포함되었는가
  else if($('#input-id').val().match(/[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/)){
    $('#input-id + span').text('Don\'t input special letters except for \'_\'')
                         .fadeIn({duration: 1000, queue: false});
    $('#input-id').css('border-color', '#FF4040');
    return check;
  }
  // 공백이 포함되었는가
  else if($('#input-id').val().match(/\s/)){
    $('#input-id + span').text('Don\'t input white space')
                         .fadeIn({duration: 1000, queue: false});
    $('#input-id').css('border-color', '#FF4040');
    return check;
  }
  // 6 ~ 20자인가
  else if(($('#input-id').val().length < 6) || ($('#input-id').val().length > 20)){
    $('#input-id + span').text('Input value between 6 and 20 characters long')
                         .fadeIn({duration: 1000, queue: false});
    $('#input-id').css('border-color', '#FF4040');
    return check;
  }
  // 중복 검사
  $.ajax({
    url: '/filter/id',
    type: 'post',
    data: {input_Id: $('#input-id').val()},
    dataType: 'json',
    async: false,
    success: function(data){
      if(!data.isThere){
        $('#input-id + span').text('Accepted').fadeOut(4000);
        $('#input-id').css('border-color', '#19FF5E');
        check = true;
      }
      else{
        // alert('This ID is already given. Try others.');
        $('#input-id + span').text('Already using ID. Try others')
                             .fadeIn({duration: 1000, queue: false});
        $('#input-id').css('border-color', '#FF4040');
      }
    }
  });
  return check;
}
// PASSWORD 유효성 검사
function pwdFilter(){
    // 값이 입력됐는가
    if($('#input-pwd').val() == ""){
      $('#input-pwd + span').text('Input value')
                            .fadeIn({duration: 1000, queue: false});
      $('#input-pwd').css('border-color', '#FF4040');
      if($('#pwdck-slider').css('display') == 'block'){
        $('#input-pwdck').val('');
        $('#pwdck-slider').slideUp({duration: 800, queue: false});
      }
      return check = false;
    }
    // 대소문자, 숫자를 섞었는가
    else if(!($('#input-pwd').val().match(/[a-z]/) && $('#input-pwd').val().match(/[A-Z]/) && $('#input-pwd').val().match(/[0-9]/))){
      $('#input-pwd + span').text('Mix lower case, upper case and number')
                            .fadeIn({duration: 1000, queue: false});
      $('#input-pwd').css('border-color', '#FF4040');
      if($('#pwdck-slider').css('display') == 'block'){
        $('#input-pwdck').val('');
        $('#pwdck-slider').slideUp({duration: 800, queue: false});
      }
      return check = false;
    }
    // 한글이 포함되었는가
    else if($('#input-pwd').val().match(/[ㄱ-ㅎㅏ-ㅣ가-힣]/)){
      $('#input-pwd + span').text('Input only English or \'_\'')
                            .fadeIn({duration: 1000, queue: false});
      $('#input-pwd').css('border-color', '#FF4040');
      if($('#pwdck-slider').css('display') == 'block'){
        $('#input-pwdck').val('');
        $('#pwdck-slider').slideUp({duration: 800, queue: false});
      }
      return check = false;
    }
    // 특수문자가 포함되었는가
    else if(!$('#input-pwd').val().match(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/)){
      $('#input-pwd + span').text('Mix special letters')
                            .fadeIn({duration: 1000, queue: false});
      $('#input-pwd').css('border-color', '#FF4040');
      if($('#pwdck-slider').css('display') == 'block'){
        $('#input-pwdck').val('');
        $('#pwdck-slider').slideUp({duration: 800, queue: false});
      }
      return check = false;
    }
    // 공백이 포함되었는가
    else if($('#input-pwd').val().match(/\s/)){
      $('#input-pwd + span').text('Don\'t input white space')
                            .fadeIn({duration: 1000, queue: false});
      $('#input-pwd').css('border-color', '#FF4040');
      if($('#pwdck-slider').css('display') == 'block'){
        $('#input-pwdck').val('');
        $('#pwdck-slider').slideUp({duration: 800, queue: false});
      }
      return check = false;
    }
    // 6 ~ 20자인가
    else if(($('#input-pwd').val().length < 6) || ($('#input-pwd').val().length > 40)){
      $('#input-pwd + span').text('Input value between 6 and 40 characters long')
                            .fadeIn({duration: 1000, queue: false});
      $('#input-pwd').css('border-color', '#FF4040');
      if($('#pwdck-slider').css('display') == 'block'){
        $('#input-pwdck').val('');
        $('#pwdck-slider').slideUp({duration: 800, queue: false});
      }
      return check = false;
    }
    else{
      $('#input-pwd + span').text('Accepted').fadeOut(2000);
      $('#input-pwd').css('border-color', '#19FF5E');
      $('#pwdck-slider').slideDown({duration: 800, queue: false});
      return check = true;
    }
}
// PASSWORD CHECK 유효성 검사
function pwdckFilter(){
  // pwd와 값이 다를 때
  if($('#input-pwd').val() != $('#input-pwdck').val()){
    $('#input-pwdck + span').text('It is different to above!')
                         .fadeIn({duration: 1000, queue: false});
    $('#input-pwd').css('border-color', '#FF4040');
    $('#input-pwdck').css('border-color', '#FF4040');
    return check = false;
  }
  else{
    $('#input-pwdck + span').text('Accepted').fadeOut(4000);
    $('#input-pwd').css('border-color', '#19FF5E');
    $('#input-pwdck').css('border-color', '#19FF5E');
    return check = true;
  }
}
// NICKNAME 유효성 검사
function nickFilter(){
  var check = false;
  // 문자열 바이트 계산
  // 한글 : 3바이트, 영어-특수문자 : 1바이트
  function getByte(s){
    var b, i;
    var c;
    for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
    return b;
  }
  if($('#input-nick').val() == ""){
    // alert('Please input data');
    $('#input-nick + span').text('Input value')
                         .fadeIn({duration: 1000, queue: false});
    $('#input-nick').css('border-color', '#FF4040');
    return check;
  }
  // 4 ~ 30 바이트 외
  // 한글 10자, 영어 30자
  else if(getByte($('#input-nick').val()) < 4 || getByte($('#input-nick').val()) > 30){
    $('#input-nick + span').text('Input value between 4 and 30 Bytes long')
                         .fadeIn({duration: 1000, queue: false});
    $('#input-nick').css('border-color', '#FF4040');
    return check;
  }
  // 중복 검사
  $.ajax({
    url: '/filter/nick',
    type: 'post',
    data: {input_Nick: $('#input-nick').val()},
    dataType: 'json',
    async: false,
    success: function(data){
      if(!data.isThere){
        $('#input-nick + span').text('Accepted').fadeOut(4000);
        $('#input-nick').css('border-color', '#19FF5E');
        check = true;
      }
      else{
        $('#input-nick + span').text('Already using Nick. Try others')
                             .fadeIn({duration: 1000, queue: false});
        $('#input-nick').css('border-color', '#FF4040');
      }
    }
  });
  return check;
  // connection.query('select mbr_Nick from member where mbr_Nick = ?', $('#input-nick').val(), function(err, rows){
}

// 이메일 유효성 검사
function emailFilter(){
  var check = false;
  if(!$('#input-email').val().match(/^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)){
    $('#input-email + span').text('Input valid email')
                         .fadeIn({duration: 1000, queue: false});
    $('#input-email').css('border-color', '#FF4040');
    return check;
  }
  // 중복검사
  $.ajax({
    url: '/filter/email',
    type: 'post',
    data: {input_Email: $('#input-email').val()},
    dataType: 'json',
    async: false,
    success: function(data){
      if(!data.isThere){
        $('#input-email + span').text('Accepted').fadeOut(4000);
        $('#input-email').css('border-color', '#19FF5E');
        check = true;
      }
      else{
        $('#input-email + span').text('Already using E-mail. Try others')
                             .fadeIn({duration: 1000, queue: false});
        $('#input-email').css('border-color', '#FF4040');
      }
    }
  });
  return check;
}
