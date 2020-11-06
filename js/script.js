const myStream = document.getElementById("faceAPIStream");

let data = new Object();
let expressionsValue = 0;
let expressionKey = "yet";

const faces = {
  unknown: "( ? )",
  neutral: "(·ω·)",
  happy: '(*^ω^*)"',
  sad: "( ´•̥̥̥ω•̥̥̥` )",
  angry: "(*｀へ´*)",
  fearful: "◝(⁰▿⁰三⁰▿⁰ ‧̣̥̇)◜",
  disgusted: "_( _︶⌓︶ )_",
  surprised: "(((゜Д゜；)))" 
};

const init = async () => {
  // Webカメラ初期化
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: 320,
      height: 240
    }
  });

  try {
    myStream.srcObject = stream;
  } catch (err) {
    myStream.src = window.URL.createObjectURL(stream);
  }
  // モデル読み込み
  await faceapi.nets.tinyFaceDetector.load("models/");
  await faceapi.nets.faceExpressionNet.load("models/");
}

const onPlay = async () => {
  const expression = document.getElementById('expression');

  const detectionsWithExpressions = setInterval(async () => {
    // 表情認識処理
    const resultExpression = await faceapi.detectSingleFace(
      myStream,
      new faceapi.TinyFaceDetectorOptions()
    ).withFaceExpressions();
    // 表情 => 顔文字
    if (resultExpression === undefined) {
      expressionKey = "unknown";
    } else {
      data = resultExpression.expressions;
      expressionsValue = 0;
      for (let key in data) {
        if (data[key] > expressionsValue) {
          expressionsValue = data[key];
          expressionKey = key;
        }
      }
    }
    // 顔文字の出力及び、送信
    expression.textContent = faces[expressionKey];
    $('#expression').attr('class', expressionKey);
    if (call !== null) {
      call.send(expressionKey);
    }
  }, 1000);
}