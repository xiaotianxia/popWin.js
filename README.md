# popWin.js
简单的弹窗插件

demo链接:http://xiaotianxia.github.io/popWin.js

#使用
```js
popWin({
            "title":"温馨提示",//标题
            "infoType":"",//提示的类型:warning/error/success/question
            "bAllowDrag":true,//是否允许拖拽
            "content":"这是提示内容。",//提示的主内容
            "bIsConfirmBtn":true,//是否有“取消”按钮
            "bAllowOutsideClick":false,//是否点击外面关闭
            "bAllowEscClose":true,//是否Esc关闭
            "confirmCallback":function(){console.log("====确定了====");},//确定后回调函数
            "cancelCallback":function(){ console.log("====取消了====");},//取消后回调函数
            "jsonp":true,//是否使用jsonp
            "url":"jsonpDataLoad.js"//jsonp远程url
        });