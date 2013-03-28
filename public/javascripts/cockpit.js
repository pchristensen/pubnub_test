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
        callback : function(msg) {
            command = msg.cmd;
            if (command != undefined) {
              console.log("RECIEVED " + command);
              // send reply message
              pubnub.publish({
                channel  : 'my_channel',
                message  : { received: "RECEIVED " + command }
              });
              // post command through regular internet
              $.post("/command", { cmd: command });
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
            message  : { example : "Cockpit listening on real-time channel" },
            callback : function(info) {
                console.log(JSON.stringify(info));
            }
        });
    }
})();

