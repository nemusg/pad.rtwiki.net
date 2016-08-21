/*
<script src="skin/snsCount.js" id="snsCount" data-url=<?php if ($vars["page"] == "FrontPage") { ?>"http://pad.rtwiki.net/"<?php } else { ?>"<?php echo $script . '?' ?><?php echo rawurlencode($_page) ?>"<?php } ?>></script>
*/

var el = document.querySelector('#snsCount');
var url = el.dataset.url;

/* tweetCount */
/*
$.ajax({
	url:"http://urls.api.twitter.com/1/urls/count.json?url=" + encodeURIComponent(url),
	dataType:"jsonp",
	timeout: 3000, //If the time to get it takes error
	success:function(obj){
		$('#tweetCount').html(obj.count);
	},
	error:function(){
		$('#tweetCount').html('?');
	},
	complete:function(){
		return false;
	}
});
*/
/* fbCount */
$.ajax({
	url:"http://graph.facebook.com/?id=" + encodeURIComponent(url),
	dataType:"jsonp",
	timeout: 3000, //If the time to get it takes error
	success:function(obj){
		if(typeof(obj.shares) == 'undefined'){// shares or comments
			count = 0;
		}else{
			count = obj.shares;// shares or comments
		}
		$("#fbCount").html(count);
	},
	error:function(){
		$('#fbCount').html('?');
	},
	complete:function(){
		return false;
	}
});

/* htnCount */
$.ajax({
	url:"http://api.b.st-hatena.com/entry.count?url=" + encodeURIComponent(url),
	dataType:"jsonp",
	timeout: 3000, //If the time to get it takes error
	success:function(count){
		if(typeof(count) == 'undefined'){
			count = 0;
		}
		$("#htnCount").html(count);
	},
	error:function(){
		$("#htnCount").html('?');
	},
	complete:function(){
		return false;
	}
});
