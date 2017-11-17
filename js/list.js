//左侧插入
function insertFromLeft(){
	var text=document.getElementById("content").value;//获取文本框的值
	if(text==""){
		alert("请输入内容");
	}else{
		var oList=document.getElementById("list");//获取ul对象
		var oLi=document.createElement("li");//创建li元素
		oLi.innerHTML=text;
		oLi.setAttribute("class","thisNode");//为节点增加class属性
		if(oList.firstChild){
			oList.insertBefore(oLi,oList.firstChild);//插入到第一个li的前面
		}else{
			oList.appendChild(oLi);//将创建的li添加到ul尾部
		}
		document.getElementById("content").value="";//清空文本框的值
		var nodeNum=document.getElementsByClassName("thisNode");
		for(var i=0;i<nodeNum.length;i++){
				nodeNum[i].onclick=function(){
				this.parentNode.removeChild(this);
			};
		}
	}
}

//右侧插入
function insertFromRight(){
	var text=document.getElementById("content").value;//获取文本框的值
	if(text==""){
		alert("请输入内容");
	}else{
		var oList=document.getElementById("list");//获取ul对象
		var oLi=document.createElement("li");//创建li元素
		oLi.innerHTML=text;
		oLi.setAttribute("class","thisNode");//为节点增加class属性
		oList.appendChild(oLi);//将创建的li添加到ul尾部
		document.getElementById("content").value="";//清空文本框的值
		var nodeNum=document.getElementsByClassName("thisNode");
		for(var i=0;i<nodeNum.length;i++){
			nodeNum[i].onclick=function(){
				this.parentNode.removeChild(this);
			};
		}
	}
}

//左侧移除
function removeFromLeft(){
	var oList=document.getElementById("list");//获取ul对象
	var nodeNum=document.getElementsByClassName("thisNode");
	oList.removeChild(nodeNum[0]);//删除第一个子元素
}

//右侧移除
function removeFromRight(){
	var oList=document.getElementById("list");//获取ul对象
	var nodeNum=document.getElementsByClassName("thisNode");
	oList.removeChild(nodeNum[nodeNum.length-1]);//删除最后一个子元素
}

//点击队列中任何一个元素，则该元素会被从队列中删除
var nodeNum=document.getElementsByClassName("thisNode");
for(var i=0;i<nodeNum.length;i++){
		nodeNum[i].onclick=function(){
		this.parentNode.removeChild(this);
	};
}

//文本查询
function queryFun(){
	var key=document.getElementById("key").value;
	var reg=new RegExp(key,'gi');//全局搜索不区分大小写
	var oList=document.getElementById("list");
	var nodeNum=document.getElementsByClassName("thisNode");
	for(var i=0;i<nodeNum.length;i++){
		nodeNum[i].style.background="red";//下一项查询之前恢复初始背景色
		nodeNum[i].style.color="#fff";//下一项查询之前恢复初始背景色
		if(reg.test(nodeNum[i].innerHTML)){
			nodeNum[i].style.background="#fff";
			nodeNum[i].style.color="#f00";
			nodeNum[i].style.border="1px solid #f00";
		}
	}
}