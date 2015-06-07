# popWin.js
简单的弹窗插件

demo链接:http://xiaotianxia.github.io/popWin.js

#使用
```js
popWin({
            "title":"温馨提示",//<span class="comment">标题</span>
            "infoType":"",//<span class="comment">提示的类型:warning/error/success/question</span>
            "bAllowDrag":true,//<span class="comment">是否允许拖拽</span>
            "content":"这是提示内容。",//<span class="comment">提示的主内容</span>
            "bIsConfirmBtn":true,//<span class="comment">是否有“取消”按钮</span>
            "bAllowOutsideClick":false,//<span class="comment">是否点击外面关闭</span>
            "bAllowEscClose":true,//<span class="comment">是否Esc关闭</span>
            "confirmCallback":function(){console.log("====确定了====");},//<span class="comment">确定后回调函数</span>
            "cancelCallback":function(){ console.log("====取消了====");},//<span class="comment">取消后回调函数</span>
            "jsonp":true,//<span class="comment">是否使用jsonp</span>
            "url":"jsonpDataLoad.js"//<span class="comment">jsonp远程url</span>
        });