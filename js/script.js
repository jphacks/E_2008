const myStream = document.getElementById("myStream");
let data = new Object();

const onPlay = async () => {
  const message = document.getElementById('message');
  // (1)モデル読み込み※フォルダを指定
  await faceapi.nets.tinyFaceDetector.load("../models");
  await faceapi.nets.faceExpressionNet.load("../models");

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
      expression.textContent = "以下のような表情"
      $("#expression").append(_.template($("#template").text(), data));
    }
  }, 500);
}