function Drag(cls){
	var _this=this;
	this.disX=0;
	this.disY=0;
	this.oTarget=document.querySelector(cls);	
	this.oTarget.onmousedown=function (ev){
		_this.fnDown(ev);		
		return false;
	};
}
Drag.prototype.fnDown=function (ev){
	var _this=this;
	var oEvent=ev||event;
	this.disX=oEvent.clientX-this.oTarget.parentNode.parentNode.offsetLeft-200;
	this.disY=oEvent.clientY-this.oTarget.parentNode.parentNode.offsetTop-115;		
	document.onmousemove=function (ev){
		_this.fnMove(ev);
	};	
	document.onmouseup=function (){
		_this.fnUp();
	};
};
Drag.prototype.fnMove=function (ev){
	var oEvent=ev||event;	
	this.oTarget.parentNode.parentNode.style.left=oEvent.clientX-this.disX+'px';
	this.oTarget.parentNode.parentNode.style.top=oEvent.clientY-this.disY+'px';
};
Drag.prototype.fnUp=function (){
	document.onmousemove=null;
	document.onmouseup=null;
};
