var add=document.getElementById("addNode");//增加节点按钮
var remove=document.getElementById("removeNode");//删除节点按钮
var oTraverseBf=document.getElementById("traverseBf");//广度优先遍历按钮
var oPreOrder=document.getElementById("preOrder");//深度优先遍历按钮
var oPreOrderSearch=document.getElementById("preOrderSearch");//深度优先查询
var oTraverseBfSearch=document.getElementById("traverseBfSearch");//广度优先查询
var root=document.getElementById("root");//根节点
var arr=[];//存储遍历结果的数组
var index=0;//树的深度
var timer=null;//定时器
var targetNode=null;//被选中的节点

//深度优先遍历
function preOrder(root){
	if(root){
		arr.push(root);
		for(var i=0;i<root.children.length;i++){
			preOrder(root.children[i]);
		}
	}
}

//广度优先遍历
function traverseBf(root){
	if(root){
		arr.push(root);
		traverseBf(root.nextElementSibling);
		root=arr[index++];
		traverseBf(root.firstElementChild);
	}
}

//动画显示部分
function show(){
	var i=0;
	var value=document.getElementById("searchBox").value;
	var flag=false;//默认没找到
	arr[i].style.color="pink";
	arr[i].style.border="1px solid pink";
	if(value!=""&&arr[i].firstChild.nodeValue.indexOf(value)!=-1){
		arr[i].style.color="#fff";
		arr[i].style.background="pink";
	}
	timer=setInterval(function(){
		i++;
		if(i<arr.length){
			arr[i].style.color="pink";
			arr[i].style.border="1px solid pink";
			arr[i-1].style.color="#000";
			arr[i-1].style.border="1px solid #3366ff";
			if(value!=""&&arr[i].firstChild.nodeValue.indexOf(value)!=-1){
				arr[i].style.color="#fff";
				arr[i].style.background="pink";
				flag=true;
			}
		}else{
			clearInterval(timer);
			arr[i-1].style.color="#000";
			arr[i-1].style.border="1px solid #3366ff";
			if(flag==true){
				alert("查询到对应元素!")
			}
		}
	},500);
}

//重置部分
function reset(){
	clearInterval(timer);
	arr=[];
	index=0;
	var divs=document.getElementsByTagName("div");
	for(var i=1;i<divs.length-1;i++){
		divs[i].style.color="#000";
		divs[i].style.border="1px solid #3366ff";
		divs[i].style.background="#fff";
	}
}

//为每个节点绑定点击事件
function addClickEvent(){
	reset();//重置
	preOrder(root);
	//为每一个node添加onclick事件
	arr.forEach(function(node){//如果使用for则会出现js闭包的错误,下标i永远是arr.length-1
		node.onclick=function(event){//用onclick替代addEventListener
			reset();
			if(!targetNode){
				targetNode = this;
				this.style.backgroundColor = "orange";
				arr.forEach(function(n){
					if (n != node){//没选中的背景颜色为白色
						n.style.backgroundColor = "#fff";
					}
				});
			}else{//双击不选中,背景颜色恢复为白色
				targetNode.style.backgroundColor = "#fff";
				targetNode = null;
			}
			event.stopPropagation();//防止事件冒泡
		}
	});
}

//增加节点			
function addNode(){
	if(targetNode){
		var value=document.getElementById("inputBox").value;//获取文本输入框的值
		if(value!==""){
			var newDiv=document.createElement("div");//创建一个div,内容为用户输入的值
			if(targetNode.children[0]){//如果选中的节点存在子节点
				newDiv.className=targetNode.children[0].className;
			}else{
				newDiv.className="newElement";
			}
			newDiv.innerHTML=value;
			targetNode.appendChild(newDiv);
			addClickEvent();//重新为每个节点绑定点击事件
		}else{//若文本框的值为空
			alert("请输入要插入节点的内容")
		}
	}else{
		alert("请先选中元素");
	}
}

//删除选中节点
function removeNode(){
	if(targetNode){
		targetNode.parentNode.removeChild(targetNode);
		targetNode=null;
		addClickEvent();//重新为每个节点绑定点击事件
	}else{
		alert("请先选中元素");
	}
}


//执行为每个节点绑定点击事件的函数
addClickEvent();

//为深度优先遍历按钮绑定点击事件			
oPreOrder.addEventListener("click",function(){
	reset();
	document.getElementById("searchBox").value="";//文本框清空,否则会误认为是搜索
	preOrder(root);
	show();
});

//为广度优先遍历按钮绑定点击事件
oTraverseBf.addEventListener("click",function(){
	reset();
	document.getElementById("searchBox").value="";//文本框清空,否则会误认为是搜索
	traverseBf(root);
	show();
});

//为深度查询按钮绑定点击事件
oPreOrderSearch.addEventListener("click",function(){
	var value=document.getElementById("searchBox").value;
	reset();
	traverseBf(root);
	if(value!=""){
		show();
	}else{
		alert("请输入查询内容");
	}
});

//为广度查询按钮绑定点击事件
oTraverseBfSearch.addEventListener("click",function(){
	var value=document.getElementById("searchBox").value;
	reset();
	traverseBf(root);
	if(value!==""){
		show();
	}else{
		alert("请输入查询内容");
	}
});

//为增加节点按钮绑定点击事件
add.addEventListener("click",function(){
	addNode();
});

//为删除节点按钮绑定点击事件
remove.addEventListener("click",function(){
	removeNode();
});