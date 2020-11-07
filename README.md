# Virtual zoom

[![IMAGE ALT TEXT HERE](https://jphacks.com/wp-content/uploads/2020/09/JPHACKS2020_ogp.jpg)](https://www.youtube.com/watch?v=G5rULR53uMk)

## デモ動画
[![Audi R8](http://img.youtube.com/vi/KOxbO0EI4MA/0.jpg)](https://www.youtube.com/watch?v=KOxbO0EI4MA "Audi R8")


## 製品概要

### コミュニケーション X Tech

～学生の表情を知りたい教員と、教員からプライベートを守りたい学生の共存に向けて～

～オンライン通話によって、失われる非言語コミュニケーションを補填～

### 背景(製品開発のきっかけ、課題等）
2020年秋、多くの大学では、オンラインと、対面を融合させてハイブリッド型の形式で講義を行っている。今回の顧客となる教授は、画面に向かって講義をすることに嫌気がさし、学生のリアクションを渇望している。しかし、学生は、「髭をそってない、化粧してない」など、さまざまな理由で、カメラをオフにしたい。
そこで、両者のニーズに答えるのが、Virtual Zoomである。

### 製品説明（具体的な製品の説明）

### 特長
#### 1. 特長1
他の人にWEBカメラの映像を見せることなく、
WEBカメラで、顔の画像を取得し、リアルタイムで、学習済みのAIで表情を分析し、他の人の表情を集計できる。
#### 2. 特長2
他の人にマイクの音声を伝えることなく、
マイクから、拍手の音を認知し、拍手の音だけを、相手に伝えられる。
#### 3. 特長3
他の人にマイクの音声を伝えることなく、
マイクの音声から、話した言葉を分析し、他の人の言葉を集計できる。

### 解決出来ること
#### 教授側
- カメラがオフでも学生の表情がわかる
- 人数が多すぎて、雰囲気がつかめないときも、全体の表情がわかる
- マイクがオフでも、全体の言いたいことがわかる

#### 学生側
- カメラをオフのまま、自分の状態を伝えられる。
- 匿名のため、周りの目を気にせず、素直にリアクションできる
- 内職していて、両手が相手なくても、音声により、操作できる

### 今後の展望
- 表情は一時的に表示しているだけですが、それをcsvのデータとして時間ともに、出力することで、オンライン上での講演会において、参加者の状態を分析することができる。
- UIが盛り上がっているときの盛り上がり感がないため、話し手がワクワクするようにしたい。
- 

### 注力したこと（こだわり等）
* 他の人の感情を顔文字で表現
* 拍手の音の認知


## 開発技術
### 活用した技術
#### API・データ
* sky way


#### フレームワーク・ライブラリ・モジュール
* face-api.js
* howler.js
* Web Speech API
* jQuery
* Underscore.js

### 独自技術
#### ハッカソンで開発した独自機能・技術
