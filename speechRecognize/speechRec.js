var RecText=null;
call=null;

//参考：https://www.geekfeed.co.jp/geekblog/webspeech
var speech_count = 0;
document.getElementById("start_recognition").onclick = function speakme(){
  vr_function();
}

function vr_function() {
  var result_text = document.getElementById('result_text');
  while (result_text.firstChild) {
    result_text.removeChild(result_text.firstChild);
  }
  SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'ja';
  recognition.interimResults = true;
  recognition.continuous = true;
  recognition.onresult = function(event) {
    var results = event.results;
    if (document.getElementById('interim_result') == null) {
      var interim = document.createElement('d' + 'iv');
      interim.setAttribute('class', 'results');
      interim.setAttribute('id', 'interim_result');
      document.getElementById('result_text').appendChild(interim);
    }
    for (var i = event.resultIndex; i < results.length; i++) {
      if (results[i].isFinal) {
        speech_count++;
        result_line = "<font size='4'>" + results[i][0].transcript + "</font>";
        document.getElementById('interim_result').innerHTML = result_line;
        //console.log(results[i][0].transcript);//最終的な結果を表示
        RecText=results[i][0].transcript;
        speechFunc();
        document.getElementById('status').innerHTML = "status: stop";
        recognition.stop();
        return;
      } else {
        document.getElementById('interim_result').innerHTML = "<font size='4' color='gray'>" + results[i][0].transcript + "</font>";
        flag_speech = 1;
      }
    }
  }
  document.getElementById('status').innerHTML = "status: recording...";
  recognition.start();
}


document.getElementById("start_recognition_all").onclick = function all_vr_function(){
  call.send("all#listen#");
}