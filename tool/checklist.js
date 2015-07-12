
$(function(){

// パラメータの値を取得し、処理を分岐

if ( getUrlVars() != window.location.href) {
	//console.log("パラメータがなにかあるよ");
	for (var i = 1; i < 5000; i++ ) {
		//console.log([i]);
		if ( getUrlVars()[[i]] == "1") {
		    //console.log("パラメータが" + i + "=1でしたよ");
		    $('input[id="' + i +'"]').prop('checked', true);
		} else {
		    //console.log("パラメータが" + i + "=1じゃなかったよ");
		    $('input[id="' + i +'"]').prop('checked', false);
		}

	}
}

// 一回だけ実行
checked();
maker1();

});

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split(',');
    for(var i = 0; i <hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
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

	// チェックボックスの値を取得する
	var $checked = $('#my-form label input:checked');
	var valList = $checked.map(function(index, el) { return $(this).val(); });
	//console.log(valList);  // => ["B", "C"]
	var valListShare = $checked.map(function(index, el) { return $(this).val(); }) .get().join("=1,");
	//console.log(valListShare);  // => ["B", "C"]

	// チェックボックスの数を取得する
	var checkLengthAll = $('#my-form label input').length;
	var checkLength = $('#my-form label input:checked').length;
	var checkRate = Math.floor(checkLength / checkLengthAll *100);

	$('#maker-kekka1').html('所有率<em>' + checkRate + '</em>％です。（' + checkLength + '/' + checkLengthAll + '）');
	//$(':text[name="maker-kekka1a"]').val(checkLengthAll + '個中' + checkLength + '個。所有率' + checkRate + '％です。 #rtwiki');

	if ( checkLength != 0) {
	$('#maker-url1').html('<a href="?' + valListShare + '=1">ブックマーク用URL</a>');
	}else{
	$('#maker-url1').html('ブックマーク用URL');
	}

	if ( checkLength != 0) {
	$('#maker-twitter1').html('<a href="https://twitter.com/intent/tweet?source=webclient&text=%e7%a7%81%e3%81%ae%e9%99%8d%e8%87%a8%e3%83%a2%e3%83%b3%e3%82%b9%e3%82%bf%e3%83%bc%e6%89%80%e6%9c%89%e7%8e%87%e3%81%af%20' + checkRate + '%ef%bc%85%e3%81%a7%e3%81%99%20http://pad.rtwiki.net/tool/clear.html?' + valListShare + '=1%20%23rtwiki_net%20%23pzdr" target="_blank">Twitterに投稿</a>');
	}else{
	$('#maker-twitter1').html('Twitterに投稿');
	}
}