var ShareToWx = window.ShareToWx || {};
(function(){
    ShareToWx = function(options){
        var options     = options || {};
        this.shareTitle = options.shareTitle || '';//设置分享标题,如果为空，微信会取页面title,document.title
        this.shareDesc  = options.shareDesc || '';//设置分享描述
        this.shareUrl   = options.shareUrl || '';//设置分享链接
        this.shareImg   = options.shareImg || ''; //设置分享图
        this.debug      = options.debug || false;//开启调试模式，调用接口会弹出提示
        this.shareCallBack   = options.shareCallBack || '';//统一的回调函数
        this.callbackFriend = options.callbackFriend || '';//分享给朋友回调
        this.callbackFriends = options.callbackFriends || '';//分享到朋友圈回调
        this.callbackQQ = options.callbackQQ || '';//分享到qq回调
        this.callbackWeibo = options.callbackWeibo || '';//分享到微博回调
        this.init();
    };
    ShareToWx.prototype = {
        init: function(){
            var that = this;
            var URL = location.href.split('#')[0];
            var shareTitle  = that.shareTitle;
            var shareDesc   = that.shareDesc;
            var shareUrl    = that.shareUrl;//分享用，可以使用其他地址。
            var shareImg    = that.shareImg;
            var debug       = that.debug;

            $.ajax({
                type:'post',
                url:'http://hd.ledo.com/weixin/jssdk/share',
                dataType:'jsonp',
                jsonp:false,//防止自动添加callback回调
                jsonpCallback:'shareCallBack',//设置回调函数名称
                cache:true,//防止自动添加时间戳
                data:({url:URL}),
                success:function(data){
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: 'wxdbd2d40d7aedf600', // 必填，公众号的唯一标识
                        timestamp: data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: data.nonceStr, // 必填，生成签名的随机串
                        signature: data.signature,// 必填，签名，见附录1
                        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    wx.ready(function(){

                        //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                        wx.onMenuShareTimeline({
                            title: shareDesc, // 分享标题
                            desc: shareTitle, // 分享描述
                            link: shareUrl, // 分享链接
                            imgUrl: shareImg, // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                if(that.shareCallBack && typeof(that.shareCallBack) == "function"){
                                    that.shareCallBack();
                                }
                                if(that.callbackFriends && typeof(that.callbackFriends) == "function"){
                                    that.callbackFriends();
                                }
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        //获取“分享给朋友”按钮点击状态及自定义分享内容接口
                        wx.onMenuShareAppMessage({
                            title: shareTitle, // 分享标题
                            desc: shareDesc, // 分享描述
                            link: shareUrl, // 分享链接
                            imgUrl: shareImg, // 分享图标
                            type: '', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                if(that.shareCallBack && typeof(that.shareCallBack) == "function"){
                                    that.shareCallBack();
                                }
                                if(that.callbackFriend && typeof(that.callbackFriend) == "function"){
                                    that.callbackFriend();
                                }
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        //获取“分享到QQ”按钮点击状态及自定义分享内容接口
                        wx.onMenuShareQQ({
                            title: shareTitle, // 分享标题
                            desc: shareDesc, // 分享描述
                            link: shareUrl, // 分享链接
                            imgUrl: shareImg, // 分享图标
                            success: function () {
                               // 用户确认分享后执行的回调函数
                               if(that.shareCallBack && typeof(that.shareCallBack) == "function"){
                                    that.shareCallBack();
                                }
                               if(that.callbackQQ && typeof(that.callbackQQ) == "function"){
                                    that.callbackQQ();
                                }
                            },
                            cancel: function () {
                               // 用户取消分享后执行的回调函数
                            }
                        });
                        //获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
                        wx.onMenuShareWeibo({
                            title: shareTitle, // 分享标题
                            desc: shareDesc, // 分享描述
                            link: shareUrl, // 分享链接
                            imgUrl: shareImg, // 分享图标
                            success: function () {
                               // 用户确认分享后执行的回调函数
                               if(that.shareCallBack && typeof(that.shareCallBack) == "function"){
                                    that.shareCallBack();
                                }
                               if(that.callbackWeibo && typeof(that.callbackWeibo) == "function"){
                                    that.callbackWeibo();
                                }
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });

                    });
                }
            });
        }
    };
})();