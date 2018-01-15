/*
checklist.js Copyright © nemusg. License is MIT.
http://nemusg.com/checklist.html
*/

$(function(){
   // 「結果を共有」のページ内リンク用
   $('a[href^=#]').click(function() {
      var speed = 200;
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
      $('body,html').animate({scrollTop:position}, speed, 'swing');
      return false;
   });
});

$(function(){

	//このclass名がクリックされたら動く
	$(".checklist-js").on('click', maker1);

	var el = document.querySelector('#checklist');
	var puretext = el.dataset.text; //data-textそのまま
	var text = encodeURI(el.dataset.text); //data-textをエンコード
	var file = el.dataset.file; //data-file
	var purehashtag = el.dataset.hashtag; //data-hashtagそのまま
	var hashtag = encodeURI(el.dataset.hashtag); //data-hashtagをエンコード

	// パラメータの値を取得し、処理を分岐
	var urlVars = getUrlVars();
	if (urlVars) {
		for (var i = 0; i < urlVars.length; i++ ) {
			$('input[id="' + parseInt(urlVars[i], 10) +'"]').prop('checked', true);
		}
	}

	// 一回だけ実行
	checked();
	maker1();


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
		// var valList = $checked.map(function(index, el) { return $(this).val(); });
		var valList = $checked.map(function(index, el) { return Number($(this).val()); });
		// var valListShare = $checked.map(function(index, el) { return parseInt($(this).val()).toString(10); }) .get().join(",");
		valList.sort(function(a, b) {
			return (parseInt(a) > parseInt(b)) ? 1 : -1;
		});

		var compressIdList = compressList(valList);

		// チェックボックスの数を取得する
		var checkLengthAll = $('#my-form label input').length;
		var checkLength = $('#my-form label input:checked').length;
		var checkRate = Math.floor(checkLength / checkLengthAll *100);

		$('#maker-kekka1').html('<em>' + checkRate + '</em>％（' + checkLength + '/' + checkLengthAll + '）');
		$('#maker-kekka2').html('<em>' + checkRate + '</em>％（' + checkLength + '/' + checkLengthAll + '）');

		if ( checkLength != 0) {// 1つ以上選択している

			$('textarea[id="sharetext"]').val(puretext + checkRate + '％（所有数' + checkLength + '）http://pad.rtwiki.net/tool/' + file + '?' + compressIdList + ' #rtwiki_net #' + purehashtag);
			$('#shareTW a').attr('href', 'https://twitter.com/intent/tweet?data-related=pkg_rtwiki&related=pkg_rtwiki&text=' + text + checkRate + '%EF%BC%85%EF%BC%88%E6%89%80%E6%9C%89%E6%95%B0' + checkLength + '%EF%BC%89+http://pad.rtwiki.net/tool/' + file + '?' + compressIdList + '%20%23rtwiki_net%20%23' + hashtag);
			$('#shareLI a').attr('href', 'line://msg/text/' + text + checkRate + '%EF%BC%85%EF%BC%88%E6%89%80%E6%9C%89%E6%95%B0' + checkLength + '%EF%BC%89 http://pad.rtwiki.net/tool/' + file + '?' + compressIdList);

		}

		// アドレスバーのURLを書き換える
		if ( checkLength != 0) {// 1つ以上選択している
			history.replaceState('','', file + '?' + compressIdList.join(","));
		}else{// 1つも選択していない
			history.replaceState('','', file);
		}
	}

	function getUrlVars() {
		var locationSearch = window.location.search;
		if (locationSearch) {
			return expandList(locationSearch.split("?")[1].split(","));
		}
	}

  function compressList(li) {
    var res = [];
    var result = [];

    for (var i = 0; i < li.length; i++) {
      res.push(li[i]);
      if (i < li.length - 1) {
        if (li[i+1] - li[i] > 1) {
          res.length > 1 ? result.push(String(res[0])+"-"+String(res[res.length-1])): result.push(String(res[0]));
          res = [];
        }
      } else {
        if (res.length > 1) {
          result.push(String(res[0])+"-"+String(res[res.length-1]));
        } else {
          result.push(String(res[0]));
        }
      }
    }

    return result;
  }

  function expandList(li) {
    var result = [];

    for (var i = 0; i < li.length; i++) {
      if (li[i].includes("-")) {
        var nums = li[i].split("-");
        var s = Number(nums[0]);
        var e = Number(nums[1]);
        result.push(s);
        while (s !== e) {
          s++;
          result.push(s);
        }
      } else {
        result.push(Number(li[i]));
      }
    }

    return result;
  }
});