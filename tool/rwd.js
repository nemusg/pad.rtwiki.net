/* http://blog.lqd.jp/webdesign/000982.html */

$(function() {
    //スマホ判定
    if(navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0){
        //スマホなら
        if($.cookie("rwd")){
            mode = $.cookie("rwd"); //cookieがあれば取得
        }else{
            mode = "sp"; //なければスマホ表示
        }
        if(mode == "pc"){
            //pc表示ならviewportを変更
            $('meta[name="viewport"]').attr('content', 'width=950, initial-scale=1.0');
        }
        //表示切り替えクリック
        $(".rwd_pc").click(function(){
            $.cookie("rwd","pc",{expires:1,path:'/'}); //cookie保存
            url = location.href;
            location.href = url;
            return false;
        });
        $(".rwd_sp").click(function(){
            $.cookie("rwd","sp",{expires:1,path:'/'}); //cookie保存
            url = location.href;
            location.href = url;
            return false;
        });
    }else{
        //PCなら表示切り替えリンク表示しない
        $(".rwd").hide();
    }
});
