const myStream = document.getElementById("faceAPIStream");

let data = new Object();
let expressionsValue = 0;
let expressionText = "";
let expressionKey = "yet";

const faces = {
  unknown:"unknown",
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
  // (1)モデル読み込み　※フォルダを指定
  await faceapi.nets.tinyFaceDetector.load("models/");
  await faceapi.nets.faceExpressionNet.load("models/");
}

const onPlay = async () => {
  const expression = document.getElementById('expression');

  const detectionsWithExpressions = setInterval(async () => {
    // (4)表情認識処理
    expressionsValue = 0;
    const resultExpression = await faceapi.detectSingleFace(
      myStream,
      new faceapi.TinyFaceDetectorOptions()
    ).withFaceExpressions();
    expression.textContent = "";
    if (resultExpression === undefined) {
      expressionKey = "unknown";
      //expression.textContent = "?( ? )?";
      expression.textContent = "unknown";//
      if(call !== null){call.send(expressionKey);}//
    } else {
      data = resultExpression.expressions;
      for (let key in data) {
        if (data[key] > expressionsValue) {
          expressionsValue = data[key];
          expressionText = faces[key];
          expressionKey = key;
        }
      }
      expression.textContent = expressionText;
      $('#expression').attr('class', expressionKey)
      console.log("before" + expressionText);
      if (call !== null) {
        console.log("after" + expressionKey);
        call.send(expressionKey);
      }
    }
  }, 1000);
}