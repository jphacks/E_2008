const myStream = document.getElementById("faceAPIStream");
let data = new Object();
const faces = {
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
  const message = document.getElementById('message');

  const detectInterval = setInterval(async () => {
    // (3)顔認識処理
    const result = await faceapi.detectSingleFace(
      myStream,
      new faceapi.TinyFaceDetectorOptions()
    );

    if (result) {
      message.textContent = "認識されてます"
    } else {
      message.textContent = "認識されていません"
    }
  }, 500);

  const detectionsWithExpressions = setInterval(async () => {
    // (4)表情認識処理
    const resultExpression = await faceapi.detectSingleFace(
      myStream,
      new faceapi.TinyFaceDetectorOptions()
    ).withFaceExpressions();
    
    if (resultExpression === undefined) {
      expression.textContent = "判別できません。"
    } else {
      data = resultExpression.expressions;
      let expressionsValue = 0;
      let expressionText = "";
      for (let key in data) {
        if (data[key] > expressionsValue) {
          expressionsValue = data[key];
          expressionText = faces[key];
        }
      }
      expression.textContent = expressionText
    }
  }, 500);
}