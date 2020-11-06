let list_face={};
let localStream = null;
let chatData = null;
let call = null;

$(function(){

    let peer = null;
    let existingCall = null;
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
        call = peer.joinRoom(roomName, {mode: 'sfu', stream: localStream});
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
            console.log('自分> ' + msg);
        });

        // チャットを受信
        // 特定の文字列は、チャットでつかえない
        call.on('data', function(data){
            if (data.data in faces) {
                chatData = data;
                const faceDom = $('#'+data.src+"Face");
                faceDom.attr('class', data.data);
                faceDom.text(faces[data.data]);
                list_face[data.src] = data.data;
            } else {
                chatData = data;
                chatLog('ID: ' + data.src + '> ' + data.data);
                // data.src = 送信者のpeerid, data.data = 送信されたメッセージ
            }
        });
    }

    function addVideo(stream){
        const videoDom = $('<video autoplay>');
        videoDom.attr('id',stream.peerId);
        videoDom.get(0).srcObject = stream;
        $('.othersVideoContainer').append(videoDom);
        // とりあえず、入室時の自分の表情を初期値として代入
        const faceDom = $('<span>');
        faceDom.attr('id',stream.peerId+"Face");
        faceDom.attr('class',expressionKey);
        faceDom.text(faces[expressionKey]);
        $('.facesContainer').append(faceDom);
    }

    function removeVideo(peerId){
        $('#'+peerId).remove();
        $('#'+peerId+'Face').remove();
    }

    function removeAllRemoteVideos(){
        $('.othersVideoContainer').empty();
        $('.facesContainer').empty();

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

