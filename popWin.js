//-----------------------------------------
//-------简单弹窗插件----------------------
//-------Created in 2015.6-----------------
//-------Created by DZ---------------------
//-----------------------------------------
(function(window,document){
// ---------------函数声明区------------------
  // -------------基础方法----------------------
    function hasClass(elem, className){
      return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
    }
    function addClass(elem, className){
      if (!hasClass(elem, className)){
        elem.className += ' ' + className;
      }
    }
    function removeClass(elem,cls){
        var aNewClass="";
        var aCls=cls.split(/\s+/);//防止空格不止一个
        if(!aCls.length){
          return elem;
        }
        else{  
            for(var i=0;i<aCls.length;i++){
                var sClass=elem.className;
                var aClass=sClass.split(/\s+/);
                var pos=aClass.indexOf(aCls[i]);
                if(pos!=-1){
                    aClass.splice(pos,1);
                    aNewClass=aClass.join(" ");
                    elem.className=aNewClass;                
                }              
            }
        }
        return elem;
    }
    function stopPropagation(e){
      if (typeof e.stopPropagation === 'function'){
        e.stopPropagation();
        e.preventDefault();
      } else if (window.event && window.event.hasOwnProperty('cancelBubble')){
        window.event.cancelBubble = true;
        window.event.returnValue == false;
      }
    }
    function getElement(eleCls){
        return document.querySelector(eleCls);
    }
    //--------------------生成弹窗----------------------
    function initHTML(options){
        var popWinHTML='<div class="mask"><div class="win"><div class="topCont"><div class="titleDiv"><p>'
                      +options.title
                      +'</p></div><div class="close">&times;</div></div><div class="contentCont"><div class="imageDiv '
                      +(options.infoType==""?"hidden":"")+'"><div class="'
                      +options.infoType
                      +'"></div></div><div class="content"><p>'
                      +options.content
                      +'</p></div></div><div class="btnCont">'
                      +(options.bIsConfirmBtn?'<button class="btn confirmBtn">确定</button>':'')
                      +'<button class="btn cancelBtn">取消</button></div></div></div>';
        var oWraper=document.createElement("div");
        oWraper.innerHTML=popWinHTML;
        document.body.insertBefore(oWraper, document.body.firstChild);//保证插入到script标签前面
    }
    //---------------垂直居中--------------------
    function topCentering(elem){
        var height = elem.clientHeight;
        var padding = parseInt(getComputedStyle(elem).getPropertyValue('padding'), 10);
        elem.style.marginTop=-parseInt(height / 2 + padding) + 'px';
    }
    //---------------淡入--------------------
    function fadeIn(elem, interval) {
      var timer=null;
      interval = interval || 16;
      elem.style.opacity = 0;
      elem.style.display = 'block';
      var last = +new Date();
      var tick = function() {
        elem.style.opacity = +elem.style.opacity + (new Date() - last) / 100;
        last = +new Date();
        if(+elem.style.opacity < 1) {
          timer=setTimeout(tick, interval);
        }
        if(+elem.style.opacity >= 1) {
          clearTimeout(timer);
          elem.style.opacity=1;
        }
      };
      tick();
    }
    //---------------淡出--------------------
    function fadeOut(elem, interval) {
      interval = interval || 16;
      elem.style.opacity = 1;
      var last = +new Date();
      var tick = function() {
        elem.style.opacity = +elem.style.opacity - (new Date() - last) / 100;
        last = +new Date();
        if(+elem.style.opacity > 0) {
          setTimeout(tick, interval);
        }else {
          elem.style.display = 'none';
          elem.style.opacity=0;
        }
      };
      tick();
    }
    //---------------生成表单--------------------
    function userInputHTML(input){
      if(input=="undefined"||input.length==0||!("title" in input[0])){//排除三种情况:""、"[]"、"[{}]"
        return;
      }
      var inputHTML='<div class="userInputCont">';
      for(var i=0,len=input.length;i<len;i++){
        inputHTML+='<label for="t'+i+'">'
                 +input[i].title
                 +': </label><input type="text" id="t'
                 +i+'" class="userInput input'+i+'"/><span class="tip">'
                 +input[i].tip
                 +'</span><br />';
      }
      inputHTML+="</div>";
      var content=getElement(".content");
      content.innerHTML=inputHTML;
    }
    //--------------表单验证--------------------
    function validateForm(formCont,fn){
      var oFormCont=document.querySelector("."+formCont); 
      if(oFormCont){//如果存在元素
      var aInput=oFormCont.getElementsByTagName("input");
      var aSpan=oFormCont.getElementsByTagName("span");
      var len=aInput.length;
      var flag=true;
        for(var i=0;i<len;i++){
          if(aInput[i].value==""){
            flag=false;
            aInput[i].style.borderBottom="1px solid #f00";
            aSpan[i].style.display="inline-block";
          }else{
            aInput[i].style.borderBottom="1px solid #aaa";
            aSpan[i].style.display="none";
          }
        }
        if(!flag){
            return;
        }
        if(flag){
            fn();
        }
      }else{
        fn();
      }  
    }
    //---------------显示窗口-------------------
    function openWin(elem,child){
        fadeIn(elem,20);
        addClass(child,"showWin");
        removeClass(child,"hideWin");
        topCentering(child);
    }
    //---------------关闭窗口--------------------
    function closeWin(elem,child){
        fadeOut(elem,20);
        addClass(child,"hideWin");
        removeClass(child,"showWin");
        setTimeout(function(){
          document.body.removeChild(elem.parentNode);//删除节点
        }, 1000);
    }
    //---------------jsonp测试-----------------------------
    // function createScript(url){//只有写在外文件才好使，不知道为什么
    //   var oScript = document.createElement('script');
    //   oScript.setAttribute('src', url);
    //   var oHead=document.getElementsByTagName("head")[0];
    //   oHead.appendChild(oScript);
    // }
    // function dataLoad(data){ //外文件包裹函数
    //   var contentCont=getElement(".contentCont");
    //   var contentHTML=data.content;
    //   contentCont.innerHTML=contentHTML;
    // }

//----------------------函数调用区 ----------------------
    window.popWin=function(option){
        option=option||{};
        var defaults={
            "title":"温馨提示",
            "infoType":"",//["error","success","question","warning"]
            "userInput":[{}],
            "bAllowDrag":true,
            "content":"这是提示的内容。",
            "bIsConfirmBtn":true,
            "bAllowOutsideClick":false,
            "bAllowEscClose":true,
            "confirmCallback":function(){console.log("====确定了====");},
            "cancelCallback":function(){console.log("====取消了====");},
            "jsonp":false,
            "url":""
        }
        var options=defaults.extend(option);
        console.log(options);
        initHTML(options);
        userInputHTML(options.userInput);
        options.jsonp&&createScript(options.url);

        var oMask=getElement(".mask");
        var oWin=getElement(".win");
        var oClose=getElement(".close");
        var oCancelBtn=getElement(".cancelBtn");
        var oConfirmBtn=getElement(".confirmBtn");
        openWin(oMask,oWin);       
        oWin.onclick=function(e){
          stopPropagation(e);
        }
        //-----------确定 取消 callback 校验--------------------
        oCancelBtn.onclick=function(e){
          options.cancelCallback();
          closeWin(oMask,oWin);
        }
        oClose.onclick=function(e){
          // options.cancelCallback();
          closeWin(oMask,oWin);
        }
        if(oConfirmBtn){
          oConfirmBtn.onclick=function(){
            validateForm("userInputCont",function(){
              options.confirmCallback();
              closeWin(oMask,oWin)
            });
          }          
        }
        //-----------Esc关闭--------------------
        window.onkeydown=function(e){
          var keyCode=e.keyCode;
          if(options.bAllowEscClose&&keyCode==27){
            closeWin(oMask,oWin);
          }
        }
        //-----------点外部关闭--------------------
        if(options.allowOutsideClick){
          oMask.onclick=function(){
            closeWin(oMask,oWin);
          }
        }
        //-------------------拖动---------------------      
       if(options.bAllowDrag){
         new Drag(".titleDiv");
       }
    }



})(window,document);

    Object.prototype.extend=function (opts){
        var option={};
        for(var i in this){
            if(typeof opts[i]=="boolean"){
              option[i]=opts[i];
            }
            else{
              option[i]=opts[i]||this[i];
            }
        }
        return option;
    }