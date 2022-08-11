var globelObject = {
	WorkLocation: '',
	UserInfo: {},
	MachineCode: 'eqweqwe',
	RandomCode: '',
	LoginType: '4'
};

//---新闻相关的
var globelParam = {
	corp_tn: 'c1',
	tb_code:'8888',
	type_code: '999',
	page_size: 10,
};


var serverUrl='http://127.0.0.1:9011'

var lastsearchkeyword='';

var needinitconfig=0;

axios.defaults.baseURL = serverUrl;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// `transformRequest` 允许在向服务器发送前，修改请求数据
// 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
// 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
axios.defaults.transformRequest = function(data, headers) {
	// 对 data 进行任意转换处理
	return data;
};
// `paramsSerializer` 是一个负责 `params` 序列化的函数
// (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
axios.defaults.paramsSerializer = function(params) {
	return Qs.stringify(params, {
		arrayFormat: 'brackets'
	})
};
// `transformResponse` 在传递给 then/catch 前，允许修改响应数据
axios.defaults.transformResponse = function(data) {
	// 对 data 进行任意转换处理
	return data;
};

//统一的请求
function PostData(url, param)
{
	console.log('2222222222222222222222222'+serverUrl+"/" + url );
	  return new Promise((resolve, reject) =>
	   {
		axios.post(serverUrl+"/" + url , param)
		.then(function(response) 
		{
			
			// resolve(response.data);
			 
			var returnJsonStr = GetResponseData(response.data);
			if(response.data)
			{
				resolve(returnJsonStr);

			}
			else
			{
			   resolve(response.data);
			}

		})
		.catch(function(err){
			//失败回调
			reject(err);
	
		});
    });

}

function validate_required(field,alerttxt)
{
with (field)
  {
  if (alerttxt==null||alerttxt=="")
    {alert(alerttxt);return false}
  else {return true}
  }
}

function isnull(val) 
{
 
    if(val == undefined || val == null)
    {
    	return true;
    }
    else
    {
		var str = val.replace(/(^\s*)|(\s*$)/g, '');//去除空格;
	 
	    if (str == '' || str == undefined || str == null) {
	            return true;
	            
	     } else {
	            return false;
	            
		 }
	 }
}

//格式化日期
function dateFormat(thisDate, fmt) {
    var o = {
        "M+": thisDate.getMonth() + 1,
        "d+": thisDate.getDate(),
        "h+": thisDate.getHours(),
        "m+": thisDate.getMinutes(),
        "s+": thisDate.getSeconds(),
        "q+": Math.floor((thisDate.getMonth() + 3) / 3),
        "S": thisDate.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (thisDate.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function getdatastr()
{
   var Datest=new Date();
   return dateFormat(Datest, "yyyy-MM-dd hh:mm:ss");
}

function gettimestamp()
{
	return new Date().getTime();
}

function checkPhone(v) 
{
        if (!(/^1(3|4|5|6|7|8)\d{9}$/.test(v))) {
             return true;
        } else {
             return false;
        }
}

function checkMail(v) 
{
        var reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/; //正则表达式
        if (!reg.test(v)) { //正则验证不通过，格式不对
             return true;
        } else {
             return false;
        }
}

function clearmsginfo()
{
	//$("#imgtalk").attr("value","值");
	$("#edit-submitted-company-name").attr("value","");
	$("#edit-submitted-name").attr("value","");
	$("#edit-submitted-email").attr("value","");
	$("#edit-submitted-telphone").attr("value","");
    $("#edit-submitted-question").attr("value","");
}

//------搜索----
//博文详情
function QueryBlogDetail_Action()
{

QueryBlogDetail('8088d3ef-3fe6-4c1b-b1c6-77f8b28c54ca')
.then(function(response)
{ 
	console.log('博文response='+response); 
	if (response != null) 
	{   var json = JSON.parse(response);
		if (json.State == false)
		{ alert(decodeMessage(json.Message));}
		else
		{
		TotalPages=json.TotalPages;

		}
	}
}
)
.catch(function(err)
{
   console.log('博文err='+err); 
});

}


function QueryBlogDetail(artid) {
	
	var paramstr = artid;//JSON.stringify(initParam);
	
    return new Promise((resolve, reject) => 
     {

 	   PostData('ArticleDetailNew',paramstr)
 	   .then(function(response)
 	   { 
 		resolve(response)
 	   })
 	   .catch(function(err)
 	   {
 		reject(err)
 	   })
 	});
}


//第六部分----博文接口--有分页
function QueryBasePageListBlog_Action()
{

QueryBasePageListBlog('',1)
.then(function(response)
{ 
	console.log('博文response='+response); 
	if (response != null) 
	{   var json = JSON.parse(response);
		if (json.State == false)
		{ alert(decodeMessage(json.Message));}
		else
		{
		TotalPages=json.TotalPages;

		}
	}
}
)
.catch(function(err)
{
   console.log('博文err='+err); 
});

}


function QueryBasePageListBlog(keyword,pagecurrent) {
	

    var art_titlestr=encodeMessage(keyword);
    var art_subtitlestr='';
    var base_nvarmax_1str='';
    var art_summarystr='';
    var art_contentstr='';
	var initParam = {
		tb_code: '16',
		type_code: '001',

		art_title: art_titlestr,
	    art_subtitle: art_subtitlestr,
	    art_summary: art_summarystr,
	    art_subtitle: art_subtitlestr,
	    art_content: art_contentstr,
		page_size: globelParam.page_size,//10
	    page_current:pagecurrent,//page_current1,
	};
	var paramstr = JSON.stringify(initParam);
	//console.log(paramstr);
    return new Promise((resolve, reject) => 
     {

 	   PostData('ArticlePageListNew',paramstr)
 	   .then(function(response)
 	   { 
 		resolve(response)
 	   })
 	   .catch(function(err)
 	   {
 		reject(err)
 	   })
 	});
}

//第五部分----产品服务接口--有分页
function QueryBasePageListProduct_Action()
{

QueryBasePageListProduct('',1)
.then(function(response)
{ 
	console.log('产品服务response='+response); 
	if (response != null) 
	{   var json = JSON.parse(response);
		if (json.State == false)
		{ alert(decodeMessage(json.Message));}
		else
		{
		TotalPages=json.TotalPages;

		}
	}
}
)
.catch(function(err)
{
   console.log('产品服务err='+err); 
});

}

function QueryBasePageListProduct(keyword,pagecurrent) {
	

    var base_namestr=encodeMessage(keyword);
    var base_nvar100_2str='';//encodeMessage('JAVA');
    var base_nvarmax_1str='';//encodeMessage('日本进口');

	var initParam = {
		tb_code: '8888',
		type_code: '001',
		kind_code: '001',

		base_name: base_namestr,
		base_nvar100_2: base_nvar100_2str,
	    base_nvarmax_1: base_nvarmax_1str,
		page_size: globelParam.page_size,//10
	    page_current:pagecurrent,//page_current1,
	};
	var paramstr = JSON.stringify(initParam);
	//console.log('产品服务参数='+paramstr); 
    return new Promise((resolve, reject) => 
     {

 	   PostData('BasePageList',paramstr)
 	   .then(function(response)
 	   { 
 		resolve(response)
 	   })
 	   .catch(function(err)
 	   {
 		reject(err)
 	   })
 	});
}

//第四部分----需求信息接口--有分页
function QueryBasePageListRqInfo_Action()
{

QueryBasePageListRqInfo('',1)
.then(function(response)
{ 
	console.log('需求信息response='+response); 
	if (response != null) 
	{   var json = JSON.parse(response);
		if (json.State == false)
		{ alert(decodeMessage(json.Message));}
		else
		{
		TotalPages=json.TotalPages;

		}
	}
}
)
.catch(function(err)
{
   console.log('需求信息err='+err); 
});

}

function QueryBasePageListRqInfo(keyword,pagecurrent) {
	

    var base_namestr=encodeMessage(keyword);
    var base_nvar100_1str='';
    var base_nvarmax_1str='';

	var initParam = {
		tb_code: '8888',
		type_code: '002',
		kind_code: '001',

		base_name: base_namestr,
		base_nvar100_1: base_nvar100_1str,
	    base_nvarmax_1: base_nvarmax_1str,
		page_size:globelParam.page_size,//10
	    page_current:pagecurrent,//page_current1,
	};
	var paramstr = JSON.stringify(initParam);
	//console.log('需求信息参数='+paramstr); 
    return new Promise((resolve, reject) => 
     {

 	   PostData('BasePageList',paramstr)
 	   .then(function(response)
 	   { 
 		resolve(response)
 	   })
 	   .catch(function(err)
 	   {
 		reject(err)
 	   })
 	});
}


//第三部分----求职信息接口--有分页
function QueryBasePageListHR_Action()
{

QueryBasePageListJob('',1)
.then(function(response)
{ 
	console.log('求职信息response='+response); 
	if (response != null) 
	{   var json = JSON.parse(response);
		if (json.State == false)
		{ alert(decodeMessage(json.Message));}
		else
		{
		TotalPages=json.TotalPages;

		}
	}
}
)
.catch(function(err)
{
   console.log('求职信息err='+err); 
});

}

function QueryBasePageListJob(keyword,pagecurrent) {


    var base_nvar100_4str=encodeMessage(keyword);
    var base_nvar100_5str='';//encodeMessage('JAVA');
    var base_nvar100_6str='';//encodeMessage('北京');
    var base_nvar100_1str='';//encodeMessage('男');
	var initParam = {
		be_code: '02',
		tb_code: '8888',
		type_code: '003',
		kind_code: '001',

		base_nvar100_4: base_nvar100_4str,
		base_nvar100_5: base_nvar100_5str,
	    base_nvar100_6: base_nvar100_6str,
		base_nvar100_1: base_nvar100_1str,
		page_size: globelParam.page_size,//10
	    page_current:pagecurrent,//page_current1,
	};
	var paramstr = JSON.stringify(initParam);
    return new Promise((resolve, reject) => 
     {

 	   PostData('BasePageList',paramstr)
 	   .then(function(response)
 	   { 
 		resolve(response)
 	   })
 	   .catch(function(err)
 	   {
 		reject(err)
 	   })
 	});
}

//第二部分----请求用工需求接口--有分页
function QueryBasePageList_Action()
{

QueryBasePageList('',1)
.then(function(response)
{ 
	console.log('用工需求response='+response); 
	if (response != null) 
	{   var json = JSON.parse(response);
		if (json.State == false)
		{ alert(decodeMessage(json.Message));}
		else
		{
     console.log('用工需求Message='+json.Message); 
		//TotalPages=json.TotalPages;

		}
	}
}
)
.catch(function(err)
{
   console.log('用工需求err='+err); 
});

}

function QueryBasePageList(keyword,pagecurrent) {
	
    var base_namestr=encodeMessage(keyword);
    var base_nvar100_20str='';//encodeMessage('家源树');
    var base_nvar100_1str='';//encodeMessage('北京');
    var base_nvar100_2str='';//encodeMessage('15000');
	var initParam = {
		be_code: '01',
		tb_code: '8888',
		type_code: '003',
		kind_code: '001',

		base_name: base_namestr,
		base_nvar100_20: base_nvar100_20str,
	    base_nvar100_1: base_nvar100_1str,
		base_nvar100_2: base_nvar100_2str,
		page_size:globelParam.page_size,//10
	    page_current:pagecurrent,//page_current1,
	};
	var paramstr = JSON.stringify(initParam);
    return new Promise((resolve, reject) => 
     {

 	   PostData('BasePageList',paramstr)
 	   .then(function(response)
 	   { 
 		resolve(response)
 	   })
 	   .catch(function(err)
 	   {
 		reject(err)
 	   })
 	});
}

//第一部分----请求企业列表接口--有分页
function QueryCorpPageList_Action()
{

//QueryCorpPageList('',pagecurrent)
QueryCorpPageList('00101',1)
.then(function(response)
{ 
	console.log('企业列表response='+response); 
	if (response != null) 
	{   var json = JSON.parse(response);
		if (json.State == false)
		{ alert(decodeMessage(json.Message));}
		else
		{
		TotalPages=json.TotalPages;

		}
	}
}
)
.catch(function(err)
{
   console.log('企业列表err='+err); 
});

}
function QueryCorpPageList(kindcode,pagecurrent) {
	//默认参数值
    var corp_namestr=encodeMessage('家源树');
    var corp_businessstr='';//encodeMessage('软件定制');
    var corp_regn_namestr='';//encodeMessage('IT');
	var initParam = {
		corp_name: corp_namestr,
		corp_business: corp_businessstr,
		corp_regn_name: corp_regn_namestr,
		page_size: globelParam.page_size,//10
		page_current:pagecurrent,//page_current1,
	};
	var paramstr = JSON.stringify(initParam);
    return new Promise((resolve, reject) => 
     {

 	   PostData('CorpPageList',paramstr)
 	   .then(function(response)
 	   { 
 		resolve(response)
 	   })
 	   .catch(function(err)
 	   {
 		reject(err)
 	   })
 	});
}



//请求获取新闻类型
function QueryArticleKind() {
	//默认参数值
	var initParam = {
		corp_tn: globelParam.corp_tn,
		tb_code: globelParam.tb_code,
		type_code: globelParam.type_code,
	};
	var paramstr = JSON.stringify(initParam);
    return new Promise((resolve, reject) => 
     {

 	   PostData('ArticleKind',paramstr)
 	   .then(function(response)
 	   { 
 		   resolve(response)
 	   })
 	   .catch(function(err)
 	   {
 		reject(err)
 	   })
 	});
}


//请求获取新闻列表类型--没有分页
function QueryArticleList() {
	//默认参数值

	var initParam = {
		code:'list'
	};
	var paramstr = JSON.stringify(initParam);
    return new Promise((resolve, reject) => 
     {

 	   PostData('api_news_splide',paramstr)
 	   .then(function(response)
 	   { 
 		resolve(response)
 	   })
 	   .catch(function(err)
 	   {
 		reject(err)
 	   })
 	});
}


//请求获取新闻列表类型--有分页
function QueryArticlePageList(kindcode,pagecurrent) {
	//默认参数值

	var initParam = {
		corp_tn: globelParam.corp_tn,
		tb_code: globelParam.tb_code,
		type_code: globelParam.type_code,
		kind_code: kindcode,//'00101',
		page_size: globelParam.page_size,//10
		page_current:pagecurrent,//page_current1,
	};
	var paramstr = JSON.stringify(initParam);
    return new Promise((resolve, reject) => 
     {

 	   PostData('ArticlePageList',paramstr)
 	   .then(function(response)
 	   { 
 		resolve(response)
 	   })
 	   .catch(function(err)
 	   {
 		reject(err)
 	   })
 	});
}

//查询企业
function QueryCorpPageListByCode(keyword,pagecurrent) {
	//默认参数值
    // console.log('keyword'+keyword);
	var corp_namestr=encodeMessage(keyword);//encodeMessage('家源树');
	//console.log('corp_namestr'+corp_namestr);
    var corp_businessstr='';//encodeMessage('软件定制');
    var corp_regn_namestr='';//encodeMessage('IT');
	var initParam = {
		corp_name: corp_namestr,
		corp_business: corp_businessstr,
		corp_regn_name: corp_regn_namestr,
		page_size: globelParam.page_size,//10
		page_current:pagecurrent,//page_current1,
	};
	var paramstr = JSON.stringify(initParam);
    return new Promise((resolve, reject) => 
     {

 	   PostData('CorpPageList',paramstr)
 	   .then(function(response)
 	   { 
 		resolve(response)
 	   })
 	   .catch(function(err)
 	   {
 		reject(err)
 	   })
 	});
}


function QueryArticlePageList_Code(kindcode,pagecurrent) {
	//默认参数值

	var initParam = {
		corp_tn: globelParam.corp_tn,
		tb_code: globelParam.tb_code,
		type_code: globelParam.type_code,
		kind_code: kindcode,//'00101',
		page_size: globelParam.page_size,//10
		page_current:pagecurrent,//page_current1,
	};
	var paramstr = JSON.stringify(initParam);
    return new Promise((resolve, reject) => 
     {

 	   PostData('ArticlePageList_RightLikeByKind',paramstr)
 	   .then(function(response)
 	   { 
 		resolve(response)
 	   })
 	   .catch(function(err)
 	   {
 		reject(err)
 	   })
 	});
}



//请求获取新闻详情
function QueryArticleDetail(artid) {
	//默认参数值

	var initParam = {
		corp_tn: globelParam.corp_tn,
		art_id: artid,

	};
	var paramstr = JSON.stringify(initParam);
    return new Promise((resolve, reject) => 
     {

 	   PostData('ArticleDetail',paramstr)
 	   .then(function(response)
 	   { 
 		resolve(response)
 	   })
 	   .catch(function(err)
 	   {
 		reject(err)
 	   })
 	});
}





function GetResponseData(responseText) {
	var returnJsonStr = responseText
		.replace("<string xmlns=\"http://schemas.microsoft.com/2003/10/Serialization/\">", "")
		.replace("</string>", "");
	return returnJsonStr;
}


String.prototype.replaceAll = function(FindText, RepText) {
	regExp = new RegExp(FindText, "g");
	return this.replace(regExp, RepText);
}

function Post(url, param, successfun) {
	var xhr = new plus.net.XMLHttpRequest();
	xhr.onreadystatechange = function() {
		console.log("onreadystatechange: " + xhr.readyState);
	}
	xhr.onload = function(e) {
		console.log(xhr.responseText)
		// xhr请求成功事件处理
		var returnJsonStr = GetResponseData(xhr.responseText);
		var json = JSON.parse(decodeURIComponent(Base64.decode(returnJsonStr)));
		successfun(json);
	};
	xhr.onerror = function(e) {
		var str = "lengthComputable=" + e.lengthComputable + "loaded=" + e.loaded + ";total=" + e.total;
		console.log("onerror: " + str);
	}
	var base64str = Base64.encode(encodeURIComponent(JSON.stringify(param)));
	xhr.open("POST", "http://218.246.23.195:1889" + "/" + url + "/" + base64str.length);
	xhr.setRequestHeader('Content-Type', 'text/html');
	// 发送HTTP请求
	console.log(base64str)
	console.log(base64str.length)
	xhr.send(base64str);
}




//打开新页面
function OpenPage(url) {
	try {
		plus.webview.open(url);
	} catch {
		window.location.href = url;
	}
}

//post请求
function axiosPost(url, param, successfun) {
	//默认参数值
	var initParam = {
		MachineCode: globelObject.MachineCode,
		RandomCode: globelObject.RandomCode,
		LoginType: '4',
		outStr: "r_result,r_error,r_cursor",
		inJson: {

		}
	};
	initParam.procName = param.procName;
	for (var item in param) {
		if (item != "inJson") {
			initParam[item] = param[item];
		}
	}
	for (var item in param.inJson) {
		if (typeof(param[item]) != "number" && typeof(param[item]) != "boolean") {
			initParam.inJson[item] = Base64.encode(encodeURIComponent(param.inJson[item]));
		}
	}

	var base64str = Base64.encode(encodeURIComponent(JSON.stringify(initParam)));
	console.log(base64str);
	axios.post("/" + url + "/" + base64str.length, base64str)
		.then(function(response) {
			if (response.data != null) {
				var returnJsonStr = GetResponseData(response.data);
				var json = JSON.parse(decodeURIComponent(Base64.decode(returnJsonStr)));
				successfun(json);
			}
		});
}

function decodeObject(obje) //对实体字段解码
{
	for (var item in obje) {
		try {
			if (typeof(obje[item]) != "number" && typeof(obje[item]) != "boolean") {
				obje[item] = decodeMessage(obje[item]);
			}
		} catch {

		}
	}

	return obje;
}


function decodeMessage(message) {
	return decodeURIComponent(Base64.decode(message)).replaceAll("\\+", "")
}

function encodeMessage(message) {
	return Base64.encode(encodeURIComponent(message)).replaceAll("\\+", "")
}



// //获取查询参数
// function getQueryVariable(variable) {
// 	var query = window.location.search.substring(1);
// 	var vars = query.split("&");
// 	for (var i = 0; i < vars.length; i++) {
// 		var pair = vars[i].split("=");
// 		if (pair[0] == variable) {
// 			return pair[1];
// 		}
// 	}
// 	return (false);
// }

function getParentQueryVariable(variable) {
	var query = parent.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return (false);
}


function GetGuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}


function getCurrentUrl()
{
	var url = "";  
        try {  
            url = window.top.document.referrer  
        } catch(M) {  
            if (window.parent) {  
                try {  
                    url = window.parent.document.referrer  
                } catch(L) {  
                    url = ""  
                }  
            }  
        }  
        if (url === "") {  
            url = document.referrer  
        }  
        return url
}
//时间中的天2012-11-12->12
function gettimedayinfo(val) 
{

let time = val;
let timearr = time.replace(" ", ":").replace(/\:/g, "-").split("-");//["2012", "12", "12", "00", "00", "00"]
let timestr = timearr[2];// 2012-12-12
return timestr;
}

//获取当前时间
function getCurrentDateTime() {
	var day = new Date();
	return day.format("yyyy-MM-dd hh:mm:ss");
}

/**
 *对Date的扩展，将 Date 转化为指定格式的String
 *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *例子：
 *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[
			k]).substr(("" + o[k]).length)));
	return fmt;
}
