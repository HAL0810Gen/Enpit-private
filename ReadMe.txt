##まず、リポジトリのcloneが終わったら
python -m venv venv
を実行(仮想環境を用意)
venv\Scripts\activate.bat
を実行（仮想環境を有効化）➡こうするとターミナルのパスが(venv)C:\Users~　みたいになるはず
作業が終わって気になるなら
deactivate
を実行すれば以降はOK(仮想環境を閉じた)
（仮想環境を使えば、PC本体に余計なインストールがされてトラブルが起きるリスク減る）
ファイルを実行した際に何か（moduleが～）言われたら、実行されたターミナルのパスに(venv)とついているか確認（仮想環境かどうか確認）

#この後は、pip install -r requirements.txtすればいい


##いちいちvenv\Scripts\activate.batが面倒なとき
コマンドパレット（Windows/Macとも Ctrl+Shift+P または Cmd+Shift+P ）を開き、"Python: Select Interpreter" と入力/選択する。

一覧の中から、プロジェクトフォルダ内の venv\Scripts\python.exe（Windows）または venv/bin/python（Mac）を選ぶ。一覧に出てこなければ、"Enter interpreter path" から直接パスを指定する。こうすれば新しくターミナルが開くたび（このリポジトリ内では）仮想環境が自動で有効化される




#main.pyの役割：web.htmlを実行してアクセス可能なローカルサーバのURLを作成する。
#web.htmlの役割：実行されたときに表示されるサイトの見た目を作ってる。
#.htmlを新しく追加・追記する際には、index.pyにもその変更を更新する（修正する）
#今、というかこの夏はバックエンド（ユーザ情報を保存するDBの作成・管理等）は難しそうなのでフロント（ユーザ側の見た目、体験）を充実させる予定
#なのでデプロイはローカルサーバ上のみ。CloudFlare Tunnelを使って作ったリンクに飛んできてもらってる


【備忘録】
・PowerShellの場合、仮想環境を有効化するコマンドは.\venv\Scripts\Activate.ps1


#プロジェクトプログラムの概要
proj
├── app // Flask webサーバ用モジュール
├── front // フロントエンド開発資材→特になし
├── public // フロントエンドBuild資材→ブラウザを表示するHTML置く場所
└── main.py // webサーバ起動タスク→これ実行したらブラウザのURL出てくる。

