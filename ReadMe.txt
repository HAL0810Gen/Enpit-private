##まず、リポジトリのcloneが終わったら
python -m venv venv
を実行(仮想環境を用意)
venv\Scripts\activate.bat
を実行（仮想環境を有効化）
作業が終わって気になるなら
deactivate
を実行すれば以降はOK
（仮想環境を使えば、PC本体に余計なインストールをする必要がない）
ファイルを実行した際に何か（moduleが～）言われたら、実行されたターミナルのパスに(venv)とついているか確認（仮想環境かどうか確認）

##いちいちvenv\Scripts\activate.batが面倒なとき
コマンドパレット（Windows/Macとも Ctrl+Shift+P または Cmd+Shift+P ）を開き、"Python: Select Interpreter" と入力して選択する。

一覧の中から、プロジェクトフォルダ内の venv\Scripts\python.exe（Windows）または venv/bin/python（Mac）を選ぶ。一覧に出てこなければ、"Enter interpreter path" から直接パスを指定する。