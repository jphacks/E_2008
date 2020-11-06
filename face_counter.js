function facesCountFun() {
    // 初期化
    let faces_counter=[
        {name: "unknown", count:0},
        {name: "neutral", count:0},
        {name: "happy", count:0},
        {name: "sad", count:0},
        {name: "angry", count:0},
        {name: "fearful", count:0},
        {name: "disgusted", count:0},
        {name: "surprised", count:0},
    ];

    // list_faceから他の人の表情リストを取得
    // faces_counterでカウント
    for(i in list_face){
        for(j in faces_counter){
            if(list_face[i]==faces_counter[j].name){
                faces_counter[j].count++;
            }
        }
    }
    // カウントしたfaces_counterを降順ソート
    faces_counter.sort(function(a,b){
        if(a.count > b.count) return -1;
        if(a.count < b.count) return 1;
        return 0;
    });

    $('.faceCountList').empty();

    // faces_counterを出力
    for(i in faces_counter){
        if(faces_counter[i].count !== 0) {
            const listHeadDom = $('<dt>');
            listHeadDom.attr('class', faces_counter[i].name);
            listHeadDom.text(faces[faces_counter[i].name])
            const listBodyDom = $('<dd>');
            listBodyDom.text(faces_counter[i].count);
            $('.faceCountList').append(listHeadDom);
            $('.faceCountList').append(listBodyDom);
        }
    }
}

setInterval(facesCountFun,1000);//1秒ごとにfacesCountで他ユーザーの顔をリスト化