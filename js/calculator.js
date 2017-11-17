/*
	1.数字显示,数字拼接
	2.点击操作符
	3.点击数字
	4.获取结果
	5.不能连续输入
*/

//点击按钮执行操作
var resultDom = document.getElementById("result");	//var 是定义变量
var operate = true;									//定义一个变量,防止运算符的连续操作
var xop = true;										//定义一个变量,防止小数点可以连续输出
function command(num){
	if (needclear==1)
	{
		needclear=0;
		resultDom.value="";
	}
	var str=resultDom.value;//获取当前文本框的值
	str=(str=="0"?"":str);//若为0则str为空字符,若不为零,则str为当前文本框的值
	resultDom.value=str+num;//字符串拼接
	operate=true;
	xop=true;
}

//清空
function clearzero(){
	resultDom.value=0;
}

//退格 
function del(){
	var str=resultDom.value;//获取当前文本框的值
	if(str.length==1){
		resultDom.value="0";
	}else{
		resultDom.value=str.substr(0,str.length-1);
	}
}

//计算等号
var needclear=0;
function equal(){
	var result=resultDom.value.toString();
	var r=eval(result);//计算 JavaScript 字符串
	resultDom.value=r;
}

//小数点
function dot(){
	if (xop){//对变量进行判断输出
		var num=resultDom.value.toString();
		num+=".";
		resultDom.value=num;
		xop=false;//防止运算符的连续操作
	}
}

//点击操作符
function tools(op){
	if(operate){//对运算符进行判断输出
		var num=resultDom.value;
		num=(num=="0"?"":num);
		resultDom.value=num+op;
		operate=false;//防止运算符的连续操作
	}
}