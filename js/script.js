$(document).ready(function(){
  var channels = [
    "fairygenocide",
    "TSM_Dyrus",
    "flosd",
    "Day9tv",
    "DisguisedToastHS",
    "trumpsc",
    "esl_csgo",
    "kolento",
    "freecodecamp",
    "itshafu",
    "tsm_doublelift",
    "imaqtpie",
    "amazhs",
    "s1mpleof",
    "summit1g"
  ];
  var urls = channels.map(function(channel){
    return "https://api.twitch.tv/kraken/streams/"+
            channel+
            "?client_id=eip5xd0aed00o0kf27l8tjzabthn51f"
  });

var someFunction = function(data){
  return    '<li><img src="' +
            data.stream.channel.logo +
            '"><span class="streamer-name">' +
            data.stream.channel.display_name +
            '</span><span class="streamer-light"></span></li>';
}

  urls.forEach(function(url){
    $.getJSON(url,function(data){

      if(data.stream !== null){
        $(".online").append(someFunction(data));
      } else {
        var newUrl = data._links.channel+"/?client_id=eip5xd0aed00o0kf27l8tjzabthn51f";
        $.getJSON(newUrl,function(data){
          $(".offline").append('<li><img src="' + data.logo + '"><span class="streamer-name">' + data.display_name + '</span><span class="streamer-light"></span></li>');
        });
      }
    });
  });
  $("#streamerSideBar").mCustomScrollbar({
          scrollButtons:{enable:true}
        });

  $("#streamerSideBar .online").on("click",'li',function(data){
    $('#switch').show().removeAttr('style');;
    $(".active").removeClass('active');
    $(this).addClass('active');
    $('#streamInfo').hide().show(500);
    $('#defaultInfo').hide(1000);
    $('.if-offline').hide(1000);
    $('.if-online').show(1000);
    var name = $(this).find('.streamer-name').html();
    var streamUrl = "https://api.twitch.tv/kraken/streams/"+name+"?client_id=eip5xd0aed00o0kf27l8tjzabthn51f";
    $.getJSON(streamUrl,function(data){
      $(".stream-link").attr('href',data.stream.channel.url);
      $(".stream-title").html(data.stream.channel.status);
      $(".channel-name").html(data.stream.channel.display_name);
      $(".viewers").html(data.stream.viewers);
      $(".game").html(data.stream.game);
      var now = new Date().getTime();
      var started = new Date(data.stream.created_at).getTime();
      var difference = now - started;
      var totalMinutes = difference / 60000;
      var hours = Math.floor(totalMinutes/60);
      var minutes = Math.floor(totalMinutes-hours*60);
      var time_string = hours+' hr '+minutes+' min ago';
      $(".stream-started").html(time_string);
      $('.preview').attr('src', '' + data.stream.preview.large + '');
      var game = data.stream.game;
      var gameUrl = "https://api.twitch.tv/kraken/search/games?q="+game+"&type=suggest&client_id=eip5xd0aed00o0kf27l8tjzabthn51f";

      $.getJSON(gameUrl,function(data){
        $('.game-logo').attr('src', data.games[0].box.large);
      });
    });
  });

  $("#streamerSideBar .offline").on("click",'li',function(data){
    $('#switch').hide(500);
    $('#streamInfo').hide().show(500);
    $('#defaultInfo').hide(500);
    $('.if-online').hide(500);
    $('.if-offline').show(500);
    var name = $(this).find('.streamer-name').html();
    var channelUrl = "https://api.twitch.tv/kraken/channels/"+name+"?client_id=eip5xd0aed00o0kf27l8tjzabthn51f";
    $.getJSON(channelUrl,function(data){
      if (data.profile_banner === null){
        $(".if-offline").css("background-color","black");
        $(".if-offline").css("background-image","none");
      } else {
        $(".if-offline").css("background-image","url('"+data.video_banner+"')");
      }
    });
  });

  $("#switch").on("click",function(){
    $("#left-header").hide();
    $("#streamerSideBar").hide();
    $("#streamInfo").hide(1000);
    $("#theTableSm").hide();
    $("#switch2").show();
    $("#xsBox").show(1000);
  })

  $("#switch2").on("click",function(){
    $("#left-header").show(1000);
    $("#streamerSideBar").show(1000);
    $("#streamInfo").show(1000);
    $("#theTableSm").show(1000);
    $("#switch2").hide(1000);
    $("#xsBox").hide();

  })

  $(window).resize(function(){
    if($('#defaultInfo').css('display')=='none' && $('.if-offline').css('display')=='none'){
      if ($('html').width() >= 511) {
        $('#xsBox').removeAttr('style');
        $('#streamInfo').show();
        $('#streamerSideBar').show();
        $("#theTableSm").show();
        $("#left-header").show();
      };
      if ($('html').width() >= 950) {
        $("#theTableSm").hide();
      };
    }
  });

  $(".toggle-on").on("click",function(){
    $(".offline").hide(1000);
    $(".online").show(1000);
  })
  $(".toggle-off").on("click",function(){
    $(".online").hide(1000);
    $(".offline").show(1000);
  })
  $(".toggle-all").on("click",function(){
    $(".online").show(1000);
    $(".offline").show(1000);
  })

});
