    // ----------------------------------
    // INIT PUBNUB
    // ----------------------------------
    var pubnub = PUBNUB.init({
        publish_key   : 'pub-c-f18f7a0a-b313-403f-b55e-dbd8da145a1c',
        subscribe_key : 'sub-c-5c4ca296-963a-11e2-9b69-12313f022c90'
    });

    // ----------------------------------
    // LISTEN FOR MESSAGES
    // ----------------------------------
    pubnub.subscribe({
        restore  : true,
        connect  : send_hello,
        channel  : 'my_channel',
        callback : function(message) {
          console.log(JSON.stringify(message));
          received = message.received;
          if (received != undefined) {
            pubnub_timestamp = new Date().getTime();
            time_diff = pubnub_timestamp - timestamp;
            console.log("pubnub time diff: " + time_diff);
            $("#pubnub_latency").text(time_diff);
          }
        },
        disconnect : function() {
          console.log("Connection Lost");
        }
    });

    // ----------------------------------
    // SEND MESSAGE
    // ----------------------------------
    function send_hello() {
        pubnub.publish({
            channel  : 'my_channel',
            message  : { example : "Remote listening on real-time channel" },
            callback : function(info) {
                console.log(JSON.stringify(info));
            }
        });
    }

var timestamp = new Date().getTime();
var pubnub_timestamp = new Date().getTime();
var server_timestamp = new Date().getTime();

var ch = function commandHandler(command) {
  timestamp = new Date().getTime();
  pubnub.publish({
    channel  : 'my_channel',
    message  : { cmd : command },
    callback : function(info) {
      console.log(JSON.stringify(info));
    }
  });
};

$("#up").click(function() { ch("move up"); });
$("#down").click(function() { ch("move down"); });
$("#left").click(function() { ch("move left"); });
$("#right").click(function() { ch("move right"); });
$("#forward").click(function() { ch("move forward"); });
$("#backward").click(function() { ch("move backward"); });

socket = io.connect("/");
socket.on("command:changed", function(data) {
  console.log("RECEIVED COMMAND FROM SERVER" + data);
  server_timestamp = new Date().getTime();
  var time_diff = server_timestamp - timestamp;
  $("#server_latency").text(time_diff);
});