
var el = document.querySelector('#checklist');
var text = el.dataset.text;
var file = el.dataset.file;

$(function(){

// パラメータの値を取得し、処理を分岐
if ( getUrlVars() != window.location.href) {
    var urlVars = getUrlVars().split("");
    var urlVarsHex = "";
    
    //1桁ずつ2進数に変換
    for (var i = 0; i < urlVars.length; i++ ) {
        //先頭1桁は0詰めしない
        if (i === 0) {
            urlVarsHex += parseInt(urlVars[i], 32).toString(2);
        }
        else {
            urlVarsHex += ('0000' + parseInt(urlVars[i], 32).toString(2)).slice(-5);
        }
    }
    var urlVarsList = urlVarsHex.split("").reverse();
    
    //console.log("パラメータがなにかあるよ");
    for (var i = 0; i < urlVarsList.length; i++ ) {
        if ( urlVarsList[i] == "1") {
            $('#my-form label input').eq(i).prop('checked', true);
        } else {
            $('#my-form label input').eq(i).prop('checked', false);
        }
    }
}

// 一回だけ実行
checked();
maker1();

});

function getUrlVars()
{
    return window.location.href.slice(window.location.href.indexOf('?') + 1);
}

$('.allCheck input,.allCheck label').click(function(){ //全選択・全解除をクリックしたとき
    var items = $(this).closest('.allCheck').next().find('input');
    if($(this).is(':checked')) { //全選択・全解除がcheckedだったら
        $(items).prop('checked', true); //アイテムを全部checkedにする
    } else { //全選択・全解除がcheckedじゃなかったら
        $(items).prop('checked', false); //アイテムを全部checkedはずす
    }

checked();

});

function checked(){
    // checkbox, radio にチェックがあったら label に class を付ける
    var checkboxList = $("#my-form");
    checkboxList.each(function() {
        var label = $(this).find("label");
        // 最初の処理
        $(this).find(":checked").closest("label").addClass("checked");
        // ラベルクリック
        label.click(function() {
            label.filter(".checked").removeClass("checked");
            label.find(":checked").closest(label).addClass("checked");
        });
    });
}

/* Maker */
function maker1(){

    // チェックボックスの状態を取得、2進数化する
    var checkedList = [];
    $('#my-form label input').each(function() {
        if ($(this).prop('checked')) {
            checkedList.unshift("1");
        }
        else {
            checkedList.unshift("0");
        }
    });
    var checked = checkedList.join("");
    
    //5桁ずつ分割後、32進数として出力
    var checkedSplit = [];
    while (checked.length > 5) {
        checkedSplit.unshift(checked.slice(-5));
        checked = checked.substr(0, (checked.length - 5));
    }
    checkedSplit.unshift(checked);
    
    var valListShare = "";
    for (var i = 0; i < checkedSplit.length; i++ ) {
        valListShare += parseInt(checkedSplit[i], 2).toString(32);
    }
    
    //先頭の0を削除してURL短縮
    if (valListShare != 0) {
        var match = valListShare.match(/[^0].*/);
        valListShare = match[0];
    }
    
    // チェックボックスの数を取得する
    var checkLengthAll = $('#my-form label input').length;
    var checkLength = $('#my-form label input:checked').length;
    var checkRate = Math.floor(checkLength / checkLengthAll *100);

    $('#maker-kekka1').html('所有率<em>' + checkRate + '</em>％です。（' + checkLength + '/' + checkLengthAll + '）');
    $('#maker-kekka2').html('所有率<em>' + checkRate + '</em>％です。（' + checkLength + '/' + checkLengthAll + '）');
    //$(':text[name="maker-kekka1a"]').val(checkLengthAll + '個中' + checkLength + '個。所有率' + checkRate + '％です。 #rtwiki');


    $('#maker-url1').html('<a href="?' + valListShare + '>ブックマーク用リンク</a>');
    $('#maker-twitter1').html('<a href="https://twitter.com/intent/tweet?source=webclient&text=' + text + checkRate + '%ef%bc%85%e3%81%a7%e3%81%99%20http://pad.rtwiki.net/tool/' + file + '?' + valListShare + '%20%23rtwiki_net%20%23pzdr" target="_blank">結果をツイート</a>');

}