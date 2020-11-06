var list_face;
var faces_counter=[
    {name:"( ? )",count:0},
    {name:"(·ω·)",count:0},
    {name:'(*^ω^*)"',count:0},
    {name:"( ´•̥̥̥ω•̥̥̥` )",count:0},
    {name:"(*｀へ´*)",count:0},
    {name:"◝(⁰▿⁰三⁰▿⁰ ‧̣̥̇)◜",count:0},
    {name:"_( _︶⌓︶ )_",count:0},
    {name:"(((゜Д゜；)))",count:0},
]


function facesCountFun(){
    var faces_counter=[//初期化
        {name:"( ? )",count:0},
        {name:"(·ω·)",count:0},
        {name:'(*^ω^*)"',count:0},
        {name:"( ´•̥̥̥ω•̥̥̥` )",count:0},
        {name:"(*｀へ´*)",count:0},
        {name:"◝(⁰▿⁰三⁰▿⁰ ‧̣̥̇)◜",count:0},
        {name:"_( _︶⌓︶ )_",count:0},
        {name:"(((゜Д゜；)))",count:0},
    ]


    for(i in list_face){//list_faceから他の人の表情リストを取得
        for(j in faces_counter){//faces_counterでカウント
            if(list_face[i]==faces_counter[j].name){
                faces_counter[j].count++;
            }
        }
    }

    faces_counter.sort(function(a,b){//カウントしたfaces_counterを降順ソート
        if(a.count>b.count) return -1;
        if(a.count < b.count) return 1;
        return 0;
    });
    const face_List_id = document.getElementById('face_List_id');
    face_List_id.textContent = "";
    var textContent_sum="";
    for(i in faces_counter){//faces_counterを出力
        if(faces_counter[i].count==0){continue;}
        else {
            textContent_sum=textContent_sum+faces_counter[i].name+" "+faces_counter[i].count+"\n";
        }
    }

    face_List_id.textContent=textContent_sum;


}

function list_face_clear(){
    list_face={};
    console.log("list_face_clear");
    //もし余裕があれば，誰かが退出したらclearがベスト

}

    setInterval(facesCountFun,1000);//1秒ごとにfacesCountで他ユーザーの顔をリスト化
    setInterval(list_face_clear,10000);//10秒ごとにlist_faceを初期化
