<?php
// PukiWiki - Yet another WikiWikiWeb clone.
// $Id: pukiwiki.skin.php,v 1.48 2006/03/07 14:03:02 henoheno Exp $
// Copyright (C)
//   2002-2006 PukiWiki Developers Team
//   2001-2002 Originally written by yu-ji
// License: GPL v2 or (at your option) any later version
//
// PukiWiki default skin

// ------------------------------------------------------------
// Settings (define before here, if you want)

// Set site identities
$_IMAGE['skin']['logo']     = 'pad/icon_088.png';
$_IMAGE['skin']['logotitle']     = '';
$wikiTopH1 = 'パズドラ攻略rtWiki';

// SKIN_DEFAULT_DISABLE_TOPICPATH
//   1 = Show reload URL
//   0 = Show topicpath
if (! defined('SKIN_DEFAULT_DISABLE_TOPICPATH'))
	define('SKIN_DEFAULT_DISABLE_TOPICPATH', 0); // 1, 0

// Show / Hide navigation bar UI at your choice
// NOTE: This is not stop their functionalities!
if (! defined('PKWK_SKIN_SHOW_NAVBAR'))
	define('PKWK_SKIN_SHOW_NAVBAR', 1); // 1, 0

// Show / Hide toolbar UI at your choice
// NOTE: This is not stop their functionalities!
if (! defined('PKWK_SKIN_SHOW_TOOLBAR'))
	define('PKWK_SKIN_SHOW_TOOLBAR', 1); // 1, 0

// ------------------------------------------------------------
// Code start

// Prohibit direct access
if (! defined('UI_LANG')) die('UI_LANG is not set');
if (! isset($_LANG)) die('$_LANG is not set');
if (! defined('PKWK_READONLY')) die('PKWK_READONLY is not set');

$lang  = & $_LANG['skin'];
$link  = & $_LINK;
$image = & $_IMAGE['skin'];
$rw    = ! PKWK_READONLY;

// Decide charset for CSS
$css_charset = 'UTF-8';
switch(UI_LANG){
	case 'ja': $css_charset = 'UTF-8'; break;
}

// ------------------------------------------------------------
// Output

// HTTP headers
pkwk_common_headers();
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // 過去の日付
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT"); // 常に修正されている
header('Pragma: no-cache');
header('Content-Type: text/html; charset=' . CONTENT_CHARSET);

?>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<?php if ($vars["page"] == "FrontPage") { ?><title><?php echo $page_title ?></title>
<?php } else { ?><title><?php echo $title ?> - <?php echo $page_title ?></title>
<?php } ?>
<?php if ($nofollow || ! $is_read)  { ?> <meta name="robots" content="NOINDEX,NOFOLLOW"><?php } ?>
<link rel="alternate" type="application/rss+xml" title="RSS" href="<?php echo $link['rss10'] ?>">
<link rel="stylesheet" type="text/css" media="all" href="skin/pukiwiki.css?151122">
<link rel="apple-touch-icon" href="image/pad/icon_088x2.png" />
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1,user-scalable=no">
	<?php if ($vars["page"] == "FrontPage") { ?><meta property="og:title" content="<?php echo $page_title ?>">
	<?php } else { ?><meta property="og:title" content="<?php echo $title ?> - <?php echo $page_title ?>">
	<?php } ?>
	<meta property="og:type" content="website">
	<meta property="og:image" content="http://pad.rtwiki.net/image/pad/ogimage.png">
<?php echo $head_tag ?>
<?php
include("htmlinsert/adPage.inc");
?>
</head>
<body class="smtSkin">

<div id="header">
<a href="<?php echo $modifierlink ?>" class="logo"><?php echo $page_title ?></a>

<?php if ($vars["page"] == "FrontPage") { ?><h1 class="topTitle"><?php echo $wikiTopH1 ?></h1><?php } else { ?><h1 class="title"><?php echo $page ?></h1><?php } ?>

<?php if ($is_page) { ?>
 <?php if(SKIN_DEFAULT_DISABLE_TOPICPATH) { ?>
   <a href="<?php echo $link['reload'] ?>"><span class="small"><?php echo $link['reload'] ?></span></a>
 <?php } else { ?>
   <span class="small topicpath">
   <?php require_once(PLUGIN_DIR . 'topicpath.inc.php'); echo plugin_topicpath_inline(); ?>
   </span>
 <?php } ?>
<?php } ?>

</div>

<div id="navigator" class="cfx">
<?php if(PKWK_SKIN_SHOW_NAVBAR) { ?>
<?php
function _navigator($key, $value = '', $javascript = ''){
	$lang = & $GLOBALS['_LANG']['skin'];
	$link = & $GLOBALS['_LINK'];
	if (! isset($lang[$key])) { echo 'LANG NOT FOUND'; return FALSE; }
	if (! isset($link[$key])) { echo 'LINK NOT FOUND'; return FALSE; }
	if (! PKWK_ALLOW_JAVASCRIPT) $javascript = '';

	echo '<a href="' . $link[$key] . '"' . $javascript . '>' .
		(($value === '') ? $lang[$key] : $value) .
		'</a>';

	return TRUE;
}
?>

<ul>
	<li><a href="<?php echo $modifierlink ?>">トップ</a></li>
	<li class="menubarbtn"><a href="index.php?MenuBar">メニュー</a></li>
	<li><a href="index.php?cmd=search">検索</a></li>
	<li class="setskin"><a href="setskin.php">PC版</a></li>
	<li><a href="#toolbar" title="最下部にスクロール">▼</a></li>
</ul>

<ul>
<!--	<li><?php _navigator('help')   ?></li>-->
</ul>

<?php if ($referer)   { ?>
<ul>
	<li><?php _navigator('refer') ?></li>
</ul>
<?php } ?>
<?php } // PKWK_SKIN_SHOW_NAVBAR ?>

</div>

<?php
include("htmlinsert/ad2.inc");
?>

<div class="oneColumn cfx">
  <div id="body"><section><?php echo $body ?></section></div>
</div>

<?php if ($notes != '') { ?>
<div id="note"><?php echo $notes ?></div>
<?php } ?>

<?php if ($attaches != '') { ?>
<div id="attach">
<?php echo $hr ?>
<?php echo $attaches ?>
</div>
<?php } ?>

<?php if ($vars["page"] == 'FrontPage') { ?>
	<div class="oneColumn cfx">
	  <div id="body"><section><?php echo do_plugin_convert('menu') ?></section></div>
	</div>
<?php } ?>

<?php if (arg_check('read') && exist_plugin_convert('menu')) { ?>
	<div class="socialBox cfx">
	<ul><!--
	--><li class="Facebook"><a href="https://www.facebook.com/sharer/sharer.php?u=http://<?php echo $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"] ?>" target="_blank" onclick="window.open(this.href, '_blank', 'location=yes,width=700,height=400');return false;">Facebook</a><span id="fbCount"></span></li><!--
	--><li class="Twitter"><a href="https://twitter.com/intent/tweet?original_referer=http://<?php echo $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"] ?>&amp;text=<?php echo $title ?>&amp;url=http://<?php echo $_SERVER["HTTP_HOST"] . urlencode($_SERVER["REQUEST_URI"]) ?>&via=rtwiki_net" target="_blank">Twitter</a><span id="tweetCount"></span></li><!--
	--><li class="Hatena"><a href="https://b.hatena.ne.jp/add?mode=confirm&amp;url=http://<?php echo $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"] ?>&amp;title=<?php echo $title ?>" target="_blank" onclick="window.open(this.href, '_blank', 'location=yes,width=700,height=400');return false;">Hatena</a><span id="htnCount"></span></li><!--
	--><li class="Google"><a href="https://plusone.google.com/_/+1/confirm?hl=ja&amp;url=http://<?php echo $_SERVER["HTTP_HOST"] . urlencode($_SERVER["REQUEST_URI"]) ?>" target="_blank" onclick="window.open(this.href, '_blank', 'location=yes,width=700,height=400');return false;">Google</a></li><!--
	--><li class="Line"><a href="line://msg/text/<?php echo $title ?>%20http://<?php echo $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"] ?>" target="_blank">LINE</a></li><!--
	--></ul>
	</div>
<?php } ?>

<?php include("htmlinsert/ad3.inc");?>

<?php if (PKWK_SKIN_SHOW_TOOLBAR) { ?>
<div id="toolbar" class="cfx">
<?php
function _toolbar($key, $value = '', $javascript = ''){
	$lang = & $GLOBALS['_LANG']['skin'];
	$link = & $GLOBALS['_LINK'];
	if (! isset($lang[$key])) { echo 'LANG NOT FOUND'; return FALSE; }
	if (! isset($link[$key])) { echo 'LINK NOT FOUND'; return FALSE; }
	if (! PKWK_ALLOW_JAVASCRIPT) $javascript = '';

	echo '<a href="' . $link[$key] . '"' . $javascript . '>' .
		(($value === '') ? $lang[$key] : $value) .
		'</a>';
	return TRUE;
}
?>

<ul>
	<li><a href="<?php echo $modifierlink ?>">トップ</a></li>
	<li class="menubarbtn"><a href="index.php?MenuBar">メニュー</a></li>
<?php if ($is_page) { ?>
<?php if ($rw) { ?>
	

    <?php if ($vars["page"] == 'FrontPage' or $vars["page"] == 'MenuBar') { ?>
    	<li class="adminOnly" id="editor"><?php _navigator('edit') ?></li>
	<?php } else { ?>
    	<li><?php _navigator('edit') ?></li>
		<?php if ($is_read && $function_freeze) { ?><li><?php (! $is_freeze) ? _navigator('freeze') : _navigator('unfreeze') ?></li><?php } ?>
	<?php } ?>
	
<?php } ?>
	<li><?php _toolbar('diff') ?></li>
<?php if ($do_backup) { ?>
	<li><?php _toolbar('backup') ?></li>
<?php } ?>
<?php if ($rw) { ?>
	<?php if ((bool)ini_get('file_uploads')) { ?>
		<!--<li><?php _toolbar('upload') ?></li>-->
	<?php } ?>
	<li><?php _toolbar('copy') ?></li>
	<li><?php _toolbar('rename') ?></li>
<?php } ?>
	<!--<li><?php _toolbar('reload') ?></li>-->
<?php } ?>
<?php if ($rw) { ?>
	<li><?php _toolbar('new') ?></li>
<?php } ?>
	<li><?php _toolbar('list')   ?></li>
	<?php if (! PKWK_SEARCH_DISENABLE) {?>
	<!--<li><?php _navigator('search') ?></li>-->
	<?php } ?>
	<li><?php _toolbar('recent') ?></li>
	<!--<li><?php _toolbar('help') ?></li>-->
	<li class="setskin"><a href="setskin.php">PC版</a></li>
	<li class="pagetop"><a href="#" title="<?php echo $title ?>の最上部にスクロール">▲</a></li>
</ul>

</div><!-- /#toolbar -->

<?php } // PKWK_SKIN_SHOW_TOOLBAR ?>

<?php if ($lastmodified != '') { ?>
<div id="lastmodified">最終更新: <?php echo $lastmodified;?></div>
<?php } ?>

<?php if ($related != '') { ?>
<div id="related">Link: <?php echo $related ?></div>
<?php } ?>

<div id="footer">

<p><?php if (exist_plugin_convert('menu2')) { ?><?php echo do_plugin_convert('menu2') ?><?php } ?></p>

<?php include("htmlinsert/adResponsive.inc");?>

<p>Puzzle and Dragons Wiki admin: <a href="https://twitter.com/rtwiki_net">@rtwiki_net</a> <a href="http://nemusg.com/contact.html">問い合わせ</a></p>
 <?php echo S_COPYRIGHT ?>.
 Powered by PHP <?php echo PHP_VERSION ?>. HTML convert time: <?php echo $taketime ?> sec.
 <?php echo bodycache_signature_gen() ?>
</div>

<div id="pagetop"><ul><li><a href="#"><?php echo $title ?>のトップへ</a></li></ul></div>

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>

<?php // x-scrollTable(Android 2.x only)
$uahantei = array(
  'Android 2',        // 2.x Android
);
$uapattern = '/'.implode('|', $uahantei).'/i';
if(preg_match($uapattern, $_SERVER['HTTP_USER_AGENT'])){//UA判定
	echo '<script src="skin/x-scrollTable.js" type="text/javascript"></script>';
}
?>

<script>

<?php if ($vars["page"] == "ツール") { ?>
	$(function(){
		if(localStorage.getItem('padrtwikinet')){
			$('#stamina').val(localStorage.getItem('padrtwikinet'));
		}
		if(localStorage.getItem('padrtwikinet2')){
			$('#stamina2').val(localStorage.getItem('padrtwikinet2'));
		}
		if(localStorage.getItem('padrtwikinet3')){
			$('#stamina3').val(localStorage.getItem('padrtwikinet3'));
		}
		if(localStorage.getItem('padrtwikinet4')){
			$('#teamhp').val(localStorage.getItem('padrtwikinet4'));
			$('#percent').val(localStorage.getItem('padrtwikinet5'));
		}
	});
<?php } ?>

/* Expand */
$(function() {
    $('.dvPCExpand .topLabel , .dvPCExpand .pageLabel').click(function() {
		if ($(this).parent().hasClass("exOpen")) {
			$(this).parent().addClass("exClose");
			$(this).parent().removeClass("exOpen");
		} else {
			$(this).parent().removeClass("exClose");
			$(this).parent().addClass("exOpen");
		}
	});
    $('.dvExpand .topLabel , .dvExpand .pageLabel').click(function() {
		if ($(this).parent().hasClass("exOpen")) {
			$(this).parent().addClass("exClose");
			$(this).parent().removeClass("exOpen");
		} else {
			$(this).parent().removeClass("exClose");
			$(this).parent().addClass("exOpen");
		}
	});
});
/* double post */
$(function () { $("div.pcomment form").submit(function () { $(this).find(':submit').attr('disabled', 'disabled'); }); }); 
/* changeDisabled */
function changeDisabled(){
    if(document.commentForm["agreecheck"].checked){
        document.commentForm["send"].disabled=false;
    }else{
        document.commentForm["send"].disabled=true;
    }
}
function changeDisabled2(){
    if(document.editForm["agreecheck"].checked){
        document.editForm["write"].disabled=false;
    }else{
        document.editForm["write"].disabled=true;
    }
}
/* pagetop */
$("#pagetop").hide();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('#pagetop').fadeIn();
		} else {
			$('#pagetop').fadeOut();
	}
});
$('#pagetop').click(function() {
	$('html, body').animate({scrollTop:0}, 'fast');
	return false;
});
/* enter送信防止 */
$(function(){
  $("input[type=text]").keydown(function(ev) {
    if ((ev.which && ev.which === 13) ||
        (ev.keyCode && ev.keyCode === 13)) {
      return false;
    } else {
      return true;
    }
  });
});

</script>

<?php if (arg_check('read') && exist_plugin_convert('menu')) { ?>
<script src="skin/snsCount.js?150804" id="snsCount" data-url=<?php if ($vars["page"] == "FrontPage") { ?>"http://pad.rtwiki.net/"<?php } else { ?>"<?php echo $script . '?' ?><?php echo rawurlencode($_page) ?>"<?php } ?>></script>
<?php } ?>

<script src="skin/jquery.tablesorter.min.js?151108"></script>
<script>
$(document).ready(function()
	{
		$(".style_table").tablesorter({
		sortInitialOrder: 'desc'
		});
	}
);
</script>

<script src="skin/jquery.filtertable.js"></script>
<script>
$(document).ready(function() {
	$('.enableFilter table').filterTable({
		label: 'フィルター',
		placeholder: 'キーワードを入力',
	<?php if ($vars["page"] == "入手方法") { ?>
		quickList: ['リット', '面', '番人', '友情ガチャ', 'レアガチャ']
	<?php } else if ($vars["page"] == "モンスター図鑑") { ?>
		quickList: ['ドラゴン', '神', '攻撃', '体力', 'バランス', '回復', '悪魔', 'マシン', '進化用']
	<?php } else if ($vars["page"] == "モンスター図鑑/最大値") { ?>
		quickList: ['ドラゴン', '神', '攻撃', '体力', 'バランス', '回復', '悪魔', '強化用', 'c20', 'c14', 'c12', 'c10', 'r6', 'r5', 'r4']
	<?php } else if ($vars["page"] == "スキル") { ?>
		quickList: ['固定', '％減少', '延期', 'バインド', 'タイプの攻撃力', '属性の攻撃力', 'ドロップの攻撃力', '敵の防御力', '受けるダメージ']
	<?php } else if ($vars["page"] == "リーダースキル") { ?>
		quickList: ['満タン', '％以上', '％以下', 'コンボ', '[ドラゴン', '[神', '[攻撃', '[体力', '[バランス', '[回復', '[悪魔', '[強化用']
	<?php } else if ($vars["page"] == "究極進化") { ?>
		quickList: ['宝玉', '黄金の番人', '古代の', 'エンジェリット', 'デビリット', 'レッドドラゴンフルーツ', 'ブルードラゴンフルーツ', 'グリーンドラゴンフルーツ']
	<?php } else if ($vars["page"] == "パズドラW/アバたま") { ?>
		quickList: ['ぼうし', 'アクセサリー', 'ようふく', '＋ドロップ', '火', '水', '木', '光', '闇', '天使', '回復']
	<?php } else { ?>
	<?php } ?>
	});
});
</script>
<script type="text/javascript" src="skin/jquery.tooltip.js"></script>
<script type="text/javascript" src="skin/jquery.lazyload.min.js"></script>
<script type="text/javascript">
$(function() {
	$(".lazyMons").lazyload({
		effect : "fadeIn"
	});
});
</script>

</body>
</html>
