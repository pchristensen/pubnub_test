(function(){
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
            message  : { example : "Hello World!" },
            callback : function(info) {
                console.log(JSON.stringify(info));
            }
        });
    }
})();

var ch = function commandHandler(command) {
  alert(command);
};

$("#up").click(function() { ch("move up"); });
$("#down").click(function() { ch("move down"); });
$("#left").click(function() { ch("move left"); });
$("#right").click(function() { ch("move right"); });
$("#forward").click(function() { ch("move forward"); });
$("#backward").click(function() { ch("move backward"); });