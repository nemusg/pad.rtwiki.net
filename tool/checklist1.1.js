/*
checklist.js Copyright © nemusg. License is MIT.
http://nemusg.com/checklist.html
*/

$(function(){

	//このclass名がクリックされたら動く
	$(".checklist-js").on('click', maker1);

	var el = document.querySelector('#checklist');
	var text = el.dataset.text;
	var file = el.dataset.file;

	// パラメータの値を取得し、処理を分岐
	var urlVars = getUrlVars();
	//console.log(urlVars);
	if (urlVars[0] !== window.location.href) {
	    for (var i = 0; i < urlVars.length; i++ ) {
	        $('input[id="' + parseInt(urlVars[i], 10) +'"]').prop('checked', true);//本当は10→36にしたい
	    }
	}

	// 一回だけ実行
	checked();
	maker1();

	function getUrlVars(){
	    return window.location.href.slice(window.location.href.indexOf('?') + 1).split(',');
	}

	$('.allCheck input,.allCheck label').on('click',function(){ //全選択・全解除をクリックしたとき
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
	        label.on('click',function() {
	            label.filter(".checked").removeClass("checked");
	            label.find(":checked").closest(label).addClass("checked");
	        });
	    });
	}

	function maker1(){
		// チェックボックスの値を取得する
		var $checked = $('#my-form label input:checked');
		var valList = $checked.map(function(index, el) { return $(this).val(); });
		var valListShare = $checked.map(function(index, el) { return parseInt($(this).val()).toString(10); }) .get().join(",");//本当は10→36にしたい

		// チェックボックスの数を取得する
		var checkLengthAll = $('#my-form label input').length;
		var checkLength = $('#my-form label input:checked').length;
		var checkRate = Math.floor(checkLength / checkLengthAll *100);

		$('#maker-kekka1').html('所有率<em>' + checkRate + '</em>％です。（' + checkLength + '/' + checkLengthAll + '）');
		$('#maker-kekka2').html('所有率<em>' + checkRate + '</em>％です。（' + checkLength + '/' + checkLengthAll + '）');

		if ( checkLength != 0) {// 1つ以上選択している
		$('#maker-twitter1').html('<a href="https://twitter.com/intent/tweet?data-related=rtwiki_net&related=rtwiki_net&text=' + text + checkRate + '%ef%bc%85%e3%81%a7%e3%81%99%20http://pad.rtwiki.net/tool/' + file + '?' + valListShare + '%20%23rtwiki_net%20%23pzdr" target="_blank">結果をツイート</a>');
		}else{// 1つも選択していない
		$('#maker-twitter1').html('<a href="https://twitter.com/intent/tweet?data-related=rtwiki_net&related=rtwiki_net&text=' + text + checkRate + '%ef%bc%85%e3%81%a7%e3%81%99%20http://pad.rtwiki.net/tool/' + file + valListShare + '%20%23rtwiki_net%20%23pzdr" target="_blank">結果をツイート</a>');
		}

		// アドレスバーのURLを書き換える
		if ( checkLength != 0) {// 1つ以上選択している
			history.replaceState('','', file + '?' + valListShare);
		}else{// 1つも選択していない
			history.replaceState('','', file);
		}
	}
});



