const audio_claps = document.querySelector("#audio_claps");
var list_face;


var Recording = function(cb){
    var recorder = null;
    var recording = true;
    var audioInput = null;
    var volume = null;
    var audioContext = null;
    var callback = cb;

    navigator.getUserMedia = navigator.getUserMedia    || navigator.webkitGetUserMedia ||
                             navigator.mozGetUserMedia || navigator.msGetUserMedia;

    if(navigator.getUserMedia){
      navigator.getUserMedia({audio:true},
        function(e){ //success
          var AudioContext = window.AudioContext || window.webkitAudioContext;
          audioContext = new AudioContext();
          volume = audioContext.createGain(); // creates a gain node
          audioInput = audioContext.createMediaStreamSource(e); // creates an audio node from the mic stream
          audioInput.connect(volume);// connect the stream to the gain node
          recorder = audioContext.createScriptProcessor(2048, 1, 1);

          recorder.onaudioprocess = function(e){
              if(!recording) return;
              var left = e.inputBuffer.getChannelData(0);
              //var right = e.inputBuffer.getChannelData(1);
              callback(new Float32Array(left));
          };
          volume.connect(recorder);// connect the recorder
          recorder.connect(audioContext.destination);
        },
        function(e){ //failure
          alert('Error capturing audio.');
        }
      );
    } else {
      alert('getUserMedia not supported in this browser.');
    }
  };

  var lastClap = (new Date()).getTime();

  function detectClap(data){
    var t = (new Date()).getTime();
    if(t - lastClap < 100) return false; // TWEAK HERE
    var zeroCrossings = 0, highAmp = 0;
    for(var i = 1; i < data.length; i++){
      if(Math.abs(data[i]) > 0.25) highAmp++; // TWEAK HERE
      if(data[i] > 0 && data[i-1] < 0 || data[i] < 0 && data[i-1] > 0) zeroCrossings++;
    }
//if(highAmp>0){
//    console.log(highAmp);
//    console.log(zeroCrossings);}
    if(130>highAmp && highAmp > 10 && zeroCrossings > 300){ // TWEAK HERE
      //console.log(highAmp+' / '+zeroCrossings);

      //console.log(t-lastClap);
      if(t - lastClap >2000) {      lastClap = t;return false;}
      lastClap = t;
      return true;
    }
    return false;
  }

  var clap_flag=0;
  var rec = new Recording(function(data){
    if(detectClap(data)){
      console.log('clap!');
      clap_flag=1;
      create_clap();
      audio_claps.play();//残りタスク...別ユーザー上のaudio_clapsで再生(通信部分ができてない)
      //setTimeout(delete_clap(),3000);
      //document.bgColor = 'rgb('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')';
    }

    if(timer_claps>0){
      if(timer_claps==1){
        delete_clap();      
      }
      timer_claps--;
    }
  });

  var timer_claps=0;
  function delete_clap(){
    $("ul #box1").css("display", "none")
  };
  function create_clap(){
    $("ul #box1").css("display", "block");
    clearTimeout();
    setTimeout(function(){console.log("endend");timer_claps++;},1000);
  };


