var RecText;
call=null;
// 別出力にするパターン


function speechFunc(){
    //console.log("####"+RecText);//最終的な結果を表示
    if(call==null){}
    else{
        call.send("SP#"+RecText);
        //SPcommand(RecText);
    }
}

function speechCountFun() {
    // 初期化
    let speech_counter=[

    ];
    var list_ele={};

    // list_speechから他の人の表情リストを取得
    // speech_counterでカウント
    for(i in list_speech){
        let flag_speech=1;
        for(j in speech_counter){
            if(list_speech[i]==speech_counter[j].name){
                speech_counter[j].count++;
                flag_speech=0;
            }
        }
        if(flag_speech==1){//speech_counterになかった
            list_ele['name']=list_speech[i];
            list_ele['count']=1;
            speech_counter[speech_counter.length]=list_ele;
            
        }
    }
    // カウントしたspeech_counterを降順ソート
    speech_counter.sort(function(a,b){
        if(a.count > b.count) return -1;
        if(a.count < b.count) return 1;
        return 0;
    });

    $('.sp_contents').empty();

    // speech_counterを出力
    for(i in speech_counter){
        if(speech_counter[i].count !== 0) {
            const listHeadDom = $('<dt>');
            listHeadDom.attr('class', speech_counter[i].name);
            listHeadDom.text(speech_counter[i].name)
            const listBodyDom = $('<dd>');
            listBodyDom.text(speech_counter[i].count);
            $('.sp_contents').append(listHeadDom);
            $('.sp_contents').append(listBodyDom);
        }
    }
}

setInterval(speechCountFun,1000);//1秒ごとにspeechCountで他ユーザーの顔をリスト化
