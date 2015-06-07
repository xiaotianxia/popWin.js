function dataLoad(data){
    var contentCont=document.querySelector(".contentCont");
    var contentHTML=data.content;
    contentCont.innerHTML=contentHTML;
}   
function createScript(url){
      var oScript = document.createElement('script');
      oScript.setAttribute('src', url);
      var oHead=document.getElementsByTagName("head")[0];
      oHead.appendChild(oScript);
    }