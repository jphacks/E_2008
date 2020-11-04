let localStream = null;
let chatData = null;
$(function(){

    let peer = null;
    let existingCall = null;
    let atmosphere = document.getElementById("atmosphere");
    let audioSelect = $('#audioSource');
    let videoSelect = $('#videoSource');

    navigator.mediaDevices.enumerateDevices()
        .then(function(deviceInfos) {
            for (let i = 0; i !== deviceInfos.length; ++i) {
                let deviceInfo = deviceInfos[i];
                let option = $('<option>');
                option.val(deviceInfo.deviceId);
                if (deviceInfo.kind === 'audioinput') {
                    option.text(deviceInfo.label);
                    audioSelect.append(option);
                } else if (deviceInfo.kind === 'videoinput') {
                    option.text(deviceInfo.label);
                    videoSelect.append(option);
                }
            }
            videoSelect.on('change', setupGetUserMedia);
            audioSelect.on('change', setupGetUserMedia);
            setupGetUserMedia();
        }).catch(function (error) {
            console.error('mediaDevices.enumerateDevices() error:', error);
            return;
        });

    peer = new Peer({
        key: window.__SKYWAY_KEY__,
        debug: 3
    });

    peer.on('open', function(){
        $('#my-id').text(peer.id);
    });

    peer.on('error', function(err){
        alert(err.message);
    });

    $('#make-call').submit(function(e){
        e.preventDefault();
        let roomName = $('#join-room').val();
        if (!roomName) {
            return;
        }
        const call = peer.joinRoom(roomName, {mode: 'sfu', stream: localStream});
        setupCallEventHandlers(call);
    });

    $('#end-call').submit(function(e){
        e.preventDefault();
        existingCall.close();
    });

    function setupGetUserMedia() {
        let audioSource = $('#audioSource').val();
        let videoSource = $('#videoSource').val();
        let constraints = {
            audio: {deviceId: {exact: audioSource}},
            video: {deviceId: {exact: videoSource}}
        };
        constraints.video.width = {
            min: 320,
            max: 640
        };
        constraints.video.height = {
            min: 240,
            max: 480        
        };

        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (stream) {
                $('#myStream').get(0).srcObject = stream;
                localStream = stream;

                if(existingCall){
                    existingCall.replaceStream(stream);
                }

            }).catch(function (error) {
                console.error('mediaDevice.getUserMedia() error:', error);
                return;
            });
    }

    

    $("#audioTrack").on("click", function(){
        var audioTrack = localStream.getAudioTracks()[0];
        if($(this).prop("checked") == true){
            audioTrack.enabled = true
        }else{
            audioTrack.enabled = false
        }
    });
    $("#videoTrack").on("click", function(){
        var videoTrack = localStream.getVideoTracks()[0];
        if($(this).prop("checked") == true){
            videoTrack.enabled = true
        }else{
            videoTrack.enabled = false
        }
    });

    function setupCallEventHandlers(call){
        if (existingCall) {
            existingCall.close();
        };

        existingCall = call;
        setupEndCallUI();
        $('#room-id').text(call.name);

        call.on('stream', function(stream){
            addVideo(stream);
        });

        call.on('removeStream', function(stream){
            removeVideo(stream.peerId);
        });

        call.on('peerLeave', function(peerId){
            removeVideo(peerId);
        });

        call.on('close', function(){
            removeAllRemoteVideos();
            setupMakeCallUI();
        });

        // チャットを送信
        $('#send').click(function(){
            var msg = $('#msg').val();
            call.send(msg);
            chatLog('自分> ' + msg);
        });

        // チャットを受信
        call.on('data', function(data){
            chatData = data;
            chatLog('ID: ' + data.src + '> ' + data.data);
            // data.src = 送信者のpeerid, data.data = 送信されたメッセージ
        });
    }

    function addVideo(stream){
        const videoDom = $('<video autoplay>');
        videoDom.attr('id',stream.peerId);
        videoDom.get(0).srcObject = stream;
        const faceDom = $('<span>');
        faceDom.attr('class',expressionKey);
        faceDom.text(expressionText);
        $('.videosContainer').append(videoDom)
        $('.faceAnalysis').after(faceDom);
    }

    function removeVideo(peerId){
        $('#'+peerId).remove();
    }

    function removeAllRemoteVideos(){
        $('.videosContainer').empty();
    }

    function setupMakeCallUI(){
        $('#make-call').show();
        $('#end-call').hide();
        $('#chat-box').hide();
    }

    function setupEndCallUI() {
        $('#make-call').hide();
        $('#end-call').show();
        $('#chat-box').show();
    }

    // チャットログに記録するための関数
    function chatLog(msg){
        $('#chatLog').append('<p>' + msg + '</p>');
    }
});

