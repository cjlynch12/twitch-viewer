
$(document).ready(function (){
  
var cName = ["nvidiageforcefr","ESL_SC2", "OgamingSC2", "shiphtur", "moonducktv", "rainbow6", "RobotCaleb", "noobs2ninjas", "gnumme", "esl_overwatch"];


function createItem(channel){
  var html;
  var sList_html;
  var apiLink = "https://wind-bow.gomix.me/twitch-api/channels/" + channel + "/?callback=?";
  var streamLink = "https://wind-bow.gomix.me/twitch-api/streams/" + channel + "/?callback=?";
  var onlineCheck = "Streaming";
  
  $.getJSON(streamLink, function (data) {
    
    
    if (data.stream === null) {
      onlineCheck="Offline";
      $('#display').append(
        "<div id='" + channel + "'class='channelContainer offline'>" + 
          "<div class='cInfo'>" +
            "<span style='display:inline-block;'>" + channel + "</span>" +
            " <button type='button' class='removeBtn'> Remove </button> " +
            "<a style='display: inline-block'id='cLink' target='blank_'  style='color: red' href='http://www.twitch.tv/"+ channel+ "'>" +onlineCheck+ "</a>" +
          "</div>" +
        "</div>"
      );
      

      $('#' + channel + '_list').append('<div class="list_status">'+onlineCheck+'</div>' );
      $('#' + channel + '_list').addClass('offline hidden');
      
      $.getJSON(apiLink, function(streamsData) {
        if (streamsData.status == "404") {
          $('#' + channel + '_list').append('<div>User Not Found</div>');
        }
      });
    }
    
      html = 
        "<div  id='" + channel + "' class='channelContainer online' style='background-image: url('')>" +
          "<img class='streamImg' src='" + data.stream.preview.medium + "'>" +
          "<div class='channelInfo'>" +
            "<button type='button' class='removeBtn'> Remove </button>" +
            "<div id='cTitle'>" + data.stream.channel.display_name + "</div>" + 
            "<a id='cLink' target='blank_' href='" + data.stream.channel.url + "'>" + data.stream.channel.status + "</a>" + "<br>" +
            "<div id='cInfo'> Currently Playing: " + data.stream.channel.game + "</div>" +
         "</div>" +
         
        "</div>";
      
    
    $('#display').append(sList_html);
    $('#' + channel + '_list').append('<div class="list_status">'+onlineCheck+'</div>');
    $('#' + channel + '_list').addClass('online hidden');
    $('#display').append(html);
    $('.removeBtn').click(function(){
     $(this).closest('.channelContainer').fadeOut(200);
    });
    
  });

}
  

//display default list on page load
  cName.forEach(function(channel) {
    createItem(channel);
  });

// add new channel
  $(document).on("submit","form", function(e) {
    e.preventDefault();
    createItem($("input").val());
    $("input").val("");
  });

  
 
  $("#online_btn").click(function() {
    $("#offline_btn, #all_btn, #streamList_btn").removeClass('focus');
    $("#online_btn").addClass('focus');
    $(".offline").addClass('hidden');
    $(".online").removeClass('hidden');
    $(".streamList").addClass('hidden');
  });
  
  $("#offline_btn").click(function() {
    $("#online_btn, #all_btn, #streamList_btn" ).removeClass('focus');
    $("#offline_btn").addClass('focus');
    $(".online").addClass('hidden');
    $(".offline").removeClass('hidden');
    $(".streamList").addClass('hidden');
  });
  
  $("#all_btn").click(function() {
    $("#online_btn, #offline_btn, #streamList_btn").removeClass('focus');
    $("#all_btn").addClass('focus');
    $(".offline, .online").removeClass('hidden');
    $(".streamList").addClass('hidden');
  });
  
  $("#streamList_btn").click(function() {
    $("#streamList_btn").addClass('focus');
    $("#online_btn, #offline_btn, #all_btn").removeClass('focus');
    $(".online, .offline").addClass('hidden');
    $(".streamList").removeClass('hidden');
  });
  
$(".testBtn1").click(function(){
  $(this).closest(".hideme1").html("<p style='color: white;'>Test1</p>");
});
 
});