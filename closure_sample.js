"use strict";

document.getElementById("btn1").addEventListener("click", closureTest1);
//document.getElementById("btn2").addEventListener("click", closureTest2);
//document.getElementById("btn3").addEventListener("click", closureTest3);

//クロージャの仕組み
//外側の関数をOuterFunction/内側の関数(外側の関数が返す関数)をInnerFunctionという。
//クロージャとはInnerFunctionとその関数が定義されたスコープの環境(簡単にいうと変数です)のセットのこと。
//パターン1ではOuterFunction内に、宣言しているローカルな変数を保持できる。
//パターン2ではOuterFunctionの引数を保持できる。

//(パターン1)
// function outer(){
//     let va = 0;
//     return inner(){
//         処理・・・必ずしも値を返す必要はない
//     };
// }

//(パターン2)
//引数は関数内の最初の位置で宣言されていると考えれば分かりやすい。
// function outer(arg_o){
//     return inner(arg_i){
//         処理・・・必ずしも値を返す必要はない
//     }
// }
//※上記2つのパターンの複合系もありうる。

//[クロージャの有用な例];
// <closureTest1>---------------------------------------------------------------------------------------
function closureTest1() {
    //例.関数ファクトリ
    // [定義例]---------------------------------------------------------------------------------------------------
    function createValidate(type, min, max) {
        return function (value) {
            // 型チェック
            if (type === "number" && typeof value !== "number") return false;
            if (type === "string" && typeof value !== "string") return false;

            // 長さチェック
            if (type === "string") {
                const len = value.length;
                return len >= min && len <= max;
            }

            if (type === "number") {
                const digitCount = value.toString().replace(".", "").length;
                return digitCount >= min && digitCount <= max;
            }
            return false; // それ以外の型がわたされたとき
        };
    }
    // [使用例]---------------------------------------------------------------------------------------------------
    const validateNum2_3 = createValidate("number", 2, 3); //外側の関数に引数を与え、独自の関数を作り出す。こういう関数を何個も作れます。
    const validateStr2_5 = createValidate("string", 2, 5);
    //↑このようにクロージャはアウター側の変数を保持し続けるので、これを利用して様々なパターンの関数を作り出すことができます。
    //まぁ全く同じことがクラスでもできるのですが、こちらのが短く書けますね。
    //あとは、こういう風に使える例がないか自分で考えて実装してみたらいいかと。そんなに頻繁に使うものでもないですが
    //知ってると便利なときもありますかね。
    //やっていることは外側の関数に引数を与えると、次からクロージャを実行したとき、外側の関数に与えた引数で固定された状態になる。

    //独自の関数(内側の関数)に引数を与え処理をする。(この場合はバリデーションがOKならtrueがNGならfalseが返ってくる)
    //validateNum2_3の引数を変えて実験してみてください。
    if (validateNum2_3(256)) {
        alert("Number:Validate OK!");
    } else {
        alert("Number:Validate NG");
    }
    //validateStr2_5の引数を変えて実験してみてください。
    if (validateStr2_5("hello!")) {
        alert("String:Validate OK!");
    } else {
        alert("String:Validate NG");
    }
}


