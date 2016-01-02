var output = document.getElementById("debug");
var connect = document.getElementById("connect");
var override = document.getElementById("override").value;
    console.log(override);
function debug(str) {
    if (output) output.innerHTML += str + "<BR>";
}

var wsurl = "ws" + document.URL.match("s?://[a-z0-9.:]+/") + "basic.ws";

if ("WebSocket" in window) {
   var websocket = new WebSocket(wsurl);
} else if ("MozWebSocket" in window) {
   var websocket = new MozWebSocket(wsurl);
}

websocket.onopen = function () {
  //connect.src = "images/online.png";
  $("#connection").html("CONNECTED"); 
  $("#connection").css("background-color","#5cb85c");
};

websocket.onclose = function (evt) {
  //connect.src = "images/offline.png";
  $("#connection").html("DISCONNECTED"); 
  $("#connection").css("background-color","#d9534f");
};

websocket.onmessage = function(evt) {onMessage(evt)}

function onMessage(evt) {
    var message = JSON.parse(evt.data)

    for (var name in message) {
        var elem = document.getElementById(name)
        switch (elem.nodeName) {
          case "IMG":
            if (message[name] != 0) {
              elem.src = "images/" + name + "-on.png"
            } else {
              elem.src = "images/" + name + "-off.png"
            }
            break
          default:
            elem.innerHTML = message[name]
        }
    }
}

function invoke(cmd) {
    try {
        // Send the command through the websocket
        websocket.send(cmd);
        // If successful, don't submit the form
        return false;
    } catch(err) {
        // As a backup action proceed with submitting the form
        return true;
    }
}

var AWAYTEMP=15.0;
var HOMETEMP=19.5;
var SLEEPTEMP=17.0;
var COMFORTTEMP=20.5;

$("#away-value").html(AWAYTEMP.toFixed(1)); 
$("#home-value").html(HOMETEMP.toFixed(1)); 
$("#sleep-value").html(SLEEPTEMP.toFixed(1)); 
$("#comfort-value").html(COMFORTTEMP.toFixed(1)); 

$('#up').click(function(){
  //invoke("Up");
  $("#prog").html("OFF"); 
  $("#prog").css("background-color","#d9534f"); 
  $("#status").html("Manually override temperature");     
  $("#manual").html("ON"); 
  $("#manual").css("background-color","#5cb85c");  
  
  $('#away').removeClass("btn-sel"); 
  $('#home').removeClass("btn-sel"); 
  $('#sleep').removeClass("btn-sel"); 
  $('#comfort').removeClass("btn-sel");   
});

$('#down').click(function(){
  //invoke("Down");
  $("#prog").html("OFF"); 
  $("#prog").css("background-color","#d9534f");  
  $("#status").html("Manually override temperature");    
  $("#manual").html("ON"); 
  $("#manual").css("background-color","#5cb85c");  
  
  $('#away').removeClass("btn-sel"); 
  $('#home').removeClass("btn-sel"); 
  $('#sleep').removeClass("btn-sel"); 
  $('#comfort').removeClass("btn-sel");   
});

$('#prog').click(function(){
  invoke("Prog");
  $("#prog").html("ON"); 
  $("#prog").css("background-color","#5cb85c"); 
  $("#status").html("Manually override temperature");  
  $("#manual").html("OFF"); 
  $("#manual").css("background-color","#d9534f");  
  
  $('#away').removeClass("btn-sel"); 
  $('#home').removeClass("btn-sel"); 
  $('#sleep').removeClass("btn-sel"); 
  $('#comfort').removeClass("btn-sel");   
});

$('#away').click(function(){
    //invoke("Prog");
  $("#prog").html("OFF"); 
  $("#prog").css("background-color","#d9534f");   
  $("#status").html("Temperature manually set to Away: "+AWAYTEMP.toFixed(1)+"&deg;");   
  $("#manual").html("ON"); 
  $("#manual").css("background-color","#5cb85c");  
  
  $('#away').addClass("btn-sel"); 

  $('#home').removeClass("btn-sel"); 
  $('#sleep').removeClass("btn-sel"); 
  $('#comfort').removeClass("btn-sel");    
});

$('#home').click(function(){
    //invoke("Prog");
  $("#prog").html("OFF"); 
  $("#prog").css("background-color","#d9534f");
  $("#status").html("Temperature manually set to Home: "+HOMETEMP.toFixed(1)+"&deg;");     
  $("#manual").html("ON"); 
  $("#manual").css("background-color","#5cb85c");  
  
  $('#home').addClass("btn-sel");   
  
  $('#away').removeClass("btn-sel"); 
  $('#sleep').removeClass("btn-sel"); 
  $('#comfort').removeClass("btn-sel");    
});

$('#sleep').click(function(){
    //invoke("Prog");
  $("#prog").html("OFF"); 
  $("#prog").css("background-color","#d9534f");  
  $("#status").html("Temperature manually set to Sleep: "+SLEEPTEMP.toFixed(1)+"&deg;");      
  $("#manual").html("ON"); 
  $("#manual").css("background-color","#5cb85c");  
  
  $('#sleep').addClass("btn-sel");  
  
  $('#away').removeClass("btn-sel"); 
  $('#home').removeClass("btn-sel"); 
  $('#comfort').removeClass("btn-sel");    
});

$('#comfort').click(function(){
    //invoke("Prog");
  $("#prog").html("OFF"); 
  $("#prog").css("background-color","#d9534f");  
  $("#status").html("Temperature manually set to Comfort: "+COMFORTTEMP.toFixed(1)+"&deg;");      
  $("#manual").html("ON"); 
  $("#manual").css("background-color","#5cb85c");  
  
  $('#comfort').addClass("btn-sel");    
  
  $('#away').removeClass("btn-sel"); 
  $('#home').removeClass("btn-sel"); 
  $('#sleep').removeClass("btn-sel"); 
});

