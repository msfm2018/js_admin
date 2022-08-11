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
	console.log('1111111111111111111');
	  return new Promise((resolve, reject) =>
	   {
		console.log('postData', url, param);
		axios.post(serverUrl+"/" + url + "/" + param.length, param)
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
	console.log(paramstr);
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



//第一部分----请求企业详情
function QueryCorpDetail_Action()
{

QueryDetailCorp('c1',1)
.then(function(response)
{ 
	console.log('企业详情response='+response); 
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
   console.log('企业详情err='+err); 
});

}




//1 详情--获取企业信息
function QueryDetailCorp(keyword,pagecurrent) {
	//默认参数值
    var corp_tnstr=keyword;

	var initParam = {
		corp_tn: corp_tnstr,
		// page_size: globelParam.page_size,
		// page_current:pagecurrent,
	};
	var paramstr = keyword;//JSON.stringify(initParam);
	 // console.log('企业详情paramstr='+paramstr); 
    return new Promise((resolve, reject) => 
     {

 	   PostData('CorpDetail',paramstr)
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

//
//第2部分----请求产品详情
function QueryDetailProduct_Action()
{

//QueryCorpPageList('',pagecurrent)
QueryItemNews('c1',1)
.then(function(response)
{ 
	 console.log('产品详情response='+response); 
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
   console.log('产品详情err='+err); 
});

}

//添加重要新闻
function  addNew(title,content){
	var initParam = {title: title,content:content};

	var paramstr =encodeURIComponent( JSON.stringify(initParam));
	console.log('更新重要内容:::::::::::'+paramstr);
	return new Promise((resolve, reject) => {
		PostData('api_news_important_add',paramstr)
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

//批量删除
function batchDelItemNewsApi(ids){
	var initParam = {id: ids};
	var paramstr = JSON.stringify(initParam);
	console.log('批量删除:::::::::::'+paramstr);
	return new Promise((resolve, reject) => {
		PostData('api_news_important_batchdel',paramstr)
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
//删除重要新闻
function delItemNewsApi(id){
	var initParam = {id: id};
	var paramstr = JSON.stringify(initParam);
	console.log('更新重要内容:::::::::::'+paramstr);
	return new Promise((resolve, reject) => {
		PostData('api_news_important_del',paramstr)
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
//更新重要内容 decodeURIComponent
function updateDetailNew(id,title,content){
	var initParam = {id: id,title:title,content:   content};
	var paramstr =encodeURIComponent( JSON.stringify(initParam));
	console.log('更新重要内容:::::::::::'+paramstr);
	return new Promise((resolve, reject) => {
		PostData('api_news_important_update',paramstr)
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

//重要新闻明细
function queryDetailNew(id){
	var initParam = {id: id};
	var paramstr = JSON.stringify(initParam);
	console.log('重要新闻明细'+paramstr);
	return new Promise((resolve, reject) => {
		PostData('api_news_important_detail',paramstr)
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
// 模糊查询
function QueryUnItemNews_api(title) {
	var initParam= {title:title};


	var paramstr =encodeURIComponent( JSON.stringify(initParam));
	console.log('查询参数：：：'+paramstr);
	return new Promise((resolve, reject) =>
	{
		PostData('api_unnews_important',paramstr)
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
//2 详情--获取重要news列表详情信息
function QueryItemNews(pagecurrent) {
	console.log('准备查询数据'+pagecurrent.toString());
	var initParam;
	
	if (pagecurrent==1)
	{		
		initParam = {start_id:0,max: 10};
	}
	else{		
		initParam = {start_id: 10*(pagecurrent-1),max: 10	};
	}	

	var paramstr = JSON.stringify(initParam);
	console.log('查询参数：：：'+paramstr);
    return new Promise((resolve, reject) => 
     {
 	   PostData('api_news_important',paramstr)
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



//第3部分----需求详情
function QueryDetailRQInfo_Action()
{


QueryDetailRQInfo('c1',1)
.then(function(response)
{ 
	console.log('需求详情response='+response); 
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
   console.log('需求详情err='+err); 
});

}

//3 详情--获取需求信息
function QueryDetailRQInfo(keyword,pagecurrent) {
	//默认参数值
    var corp_or_pers_numstr=keyword;
	// console.log('需求信息response='+corp_or_pers_numstr); 
	var initParam = {
		tb_code: '8888',
		type_code: '002',
		kind_code: '001',
		be_code: '01',
		corp_or_pers_num: corp_or_pers_numstr,
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

//第4部分--- 用工信息
function QueryDetailHuman_Action()
{


QueryDetailHuman('c1',1)
.then(function(response)
{ 
	// console.log('用工详情response='+response); 
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
   console.log('用工详情err='+err); 
});

}

//4 详情--获取用工信息
function QueryDetailHuman(keyword,pagecurrent) {
	//默认参数值
    var corp_or_pers_numstr=keyword;
    // console.log('corp_or_pers_numstr'+corp_or_pers_numstr);
	var initParam = {
		tb_code: '8888',
		type_code: '003',
		kind_code: '001',
		be_code: '01',
		corp_or_pers_num: corp_or_pers_numstr,
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

//第5部分--- 企业博客
function QueryDetailBlog_Action()
{


QueryDetailBlog('c1',1)
.then(function(response)
{ 
	// console.log('企业博客response='+response); 
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
   console.log('企业博客err='+err); 
});

}

//5 详情--获取博客
function QueryDetailBlog(keyword,pagecurrent) {
	//默认参数值
    var corp_or_pers_numstr=keyword;
     
	var initParam = {
		tb_code: '16',
		type_code: '001',
		be_code: '01',
		corp_or_pers_num: corp_or_pers_numstr,
		page_size: globelParam.page_size,//10
	    page_current:pagecurrent,//page_current1,
	};
	var paramstr = JSON.stringify(initParam);
	// console.log('企业博客='+paramstr); 
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

//图片
//第5部分--- 企业图片
function QueryDetailPics_Action()
{

QueryDetailPics('c1',1)
.then(function(response)
{ 
	console.log('企业图片response='+response); 
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
   console.log('企业图片err='+err); 
});

}


function QueryDetailPics(keyword,pagecurrent) {
	//默认参数值
    var corp_or_pers_numstr=keyword;
    var file_becodestr='01.'+corp_or_pers_numstr;
	var initParam = {
		tb_code: '8888',
		type_code: '000',
		kind_code: '001',
		be_code: '01',
		file_becode:file_becodestr,
		corp_or_pers_num: corp_or_pers_numstr,
		page_size: globelParam.page_size,//10
	    page_current:pagecurrent,//page_current1,
	};
	var paramstr = JSON.stringify(initParam);
	//console.log('企业图片='+paramstr); 
    return new Promise((resolve, reject) => 
     {

 	   PostData('filelist',paramstr)
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

//企业推荐
function QueryEnterpriseCommList_Action()
{

	QueryEnterpriseCommList('')
	.then(function(response)
	{ 
		
		if (response != null) 
		{   var json = JSON.parse(response);

			 console.log('json:'+json);

			if (json.State == false)
			{ alert(decodeMessage(json.Message));}
			else
			{
				

				var htmlstr='';
				var boxhdlisthtml='';
				// console.log('json.Data:'+json.Data);

				for (var item of json.Data) 
				{
					var Base_codestr='';
					var Base_namestr='';
					var base_nvar100_1str='';
					var base_nvar100_6str='';
					
					if(typeof(item.base_nvar100_6)!="undefined")
					{
						base_nvar100_6str=item.base_nvar100_6;
					}

					if(typeof(item.base_code)!="undefined")
					{
						Base_codestr=item.base_code;
					}

					if(typeof(item.base_name)!="undefined")
					{
						Base_namestr=item.base_name;
					}

					if(typeof(item.base_nvar100_1)!="undefined")
					{
						base_nvar100_1str=item.base_nvar100_1;
					}

  				//console.log('Base_codestr:'+Base_codestr);

				htmlstr='<div class="entityindexbox">'
				+'<a href="EnterpriseDetail.html?corpCode='+Base_codestr+'" class="enterprise-flex">'
				+'<div class="enterprise-flex-img">'
				+'<img src="'+base_nvar100_1str+'" alt="" class="entityleftimg"></div>'
				+'<div class="enterprise-flex-box">'
				+'<ul><li>'
				+'<span class="enterprise-content-left">'+Base_namestr+'</span>'
				+'</li><li>'
				+'<span class="enterprise-content-left">'+base_nvar100_6str+'</span>'	
				+'</li></ul>'
				+'</div>'
				+'</a>'
				+'</div>'

 					//console.log('base_nvar100_1str:'+base_nvar100_1str);
				   // console.log('Base_codestr:'+Base_codestr);
				    //console.log('Base_namestr:'+Base_namestr);

			 		boxhdlisthtml+=htmlstr;
				}
				 $(".entityindex").html(boxhdlisthtml);
				console.log(boxhdlisthtml);

			}
		}
	}
	)
	.catch(function(err)
	{
	   console.log('企业推荐err='+err); 
	});

}

//2 详情--获取产品详情信息
function QueryEnterpriseCommList(keyword) {
	//默认参数值
    var corp_or_pers_numstr=keyword;
 
	var initParam = {
		tb_code: '100000',
		type_code: '001',
		kind_code: '001'
	};
	var paramstr = JSON.stringify(initParam);
    return new Promise((resolve, reject) => 
     {

 	   PostData('BaseSelect',paramstr)
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

//企业推荐
function QueryEnterpriseDetail_Action()
{

	 var corpCode=getQueryVariable('corpCode');
	 if (!corpCode)
	  {
	    corpCode = 'c1';
	 }

//'0e1c8d8f-1bdd-433f-804c-3302cf1d6505'
	QueryEnterpriseDetail(corpCode)
	.then(function(response)
	{ 
		//console.log('response:'+response);
		if (response != null) 
		{   var json = JSON.parse(response);

			// console.log('json:'+json);

			if (json.State == false)
			{ alert(decodeMessage(json.Message));}
			else
			{

				var htmlstr='';
				var boxhdlisthtml='';
				var item=json.Data;
				// console.log('json.Data:'+item.base_nvar100_1);

				
				var base_nvar100_2str='';
				var base_nvar100_3str='';
				var base_nvar100_4str='';

		        var base_nvar100_1str='';
				if(typeof(item.base_nvar100_1)!="undefined")
				{
					base_nvar100_1str=item.base_nvar100_1;
	
				}
                var pagecount=0;
				if(typeof(item.base_nvar100_2)!="undefined")
				{
					base_nvar100_2str=item.base_nvar100_2;
 			        /*console.log('base_nvar100_2str:'+base_nvar100_2str);*/
					htmlstr+='<li  style="float: left; width: 980px;">'
					+'<a href="#"><img src="'+''+base_nvar100_2str.trim()+'"/></a>'
		            +'</li>'
		            pagecount=pagecount+1;
				}

				if(typeof(item.base_nvar100_3)!="undefined")
				{
					base_nvar100_3str=item.base_nvar100_3;
					console.log('base_nvar100_3str:'+base_nvar100_3str);
					htmlstr+='<li  style="float: left; width: 980px;">'
					+'<a href="#"><img src="'+base_nvar100_3str.trim()+'"/></a>'
		            +'</li>'
		            pagecount=pagecount+1;
				}

				if(typeof(item.base_nvar100_4)!="undefined")
				{
					base_nvar100_4str=item.base_nvar100_4;
					console.log('base_nvar100_4str:'+base_nvar100_4str);
					htmlstr+='<li  style="float: left; width: 980px;">'
					+'<a href="#"><img src="'+base_nvar100_4str.trim()+'"/></a>'
		            +'</li>'
		            pagecount=pagecount+1;
				}

				if(pagecount==1)
				{
					htmlstr+='<li  style="float: left; width: 980px;">'
					+'<a href="#"><img src="'+''+base_nvar100_2str.trim()+'"/></a>'
		            +'</li>'
		            htmlstr+='<li  style="float: left; width: 980px;">'
					+'<a href="#"><img src="'+''+base_nvar100_2str.trim()+'"/></a>'
		            +'</li>'
				}
				else if(pagecount==2)
				{
					htmlstr+='<li  style="float: left; width: 980px;">'
					+'<a href="#"><img src="'+''+base_nvar100_2str.trim()+'"/></a>'
		            +'</li>'
	
				}
               
				/*console.log('html='+htmlstr);*/
			    $(".imgul").html(htmlstr);

				/*console.log('base_nvar100_1str:'+base_nvar100_1str);*/
			   // console.log('base_nvar100_2str:'+base_nvar100_2str);
			    //console.log('base_nvar100_3str:'+base_nvar100_3str);
			   // console.log('base_nvar100_4str:'+base_nvar100_4str);

		 		//boxhdlisthtml+=htmlstr;
		 	   //$(".imgul").append(htmlstr); //2、往bd里面插入数据	
		 		/* 设置第一张图片 */
				$(".slider .bd li").first().before($(".slider .bd li").last());
				
				/* 鼠标悬停箭头按钮显示 */
				$(".slider").hover(function(){
					$(this).find(".arrow").stop(true,true).fadeIn(300)
				},function(){
					$(this).find(".arrow").fadeOut(300)
				});
				
				/* 滚动切换 */
				$(".slider").slide({
					titCell:".hd ul", 
					mainCell:".bd ul", 
					effect:"leftLoop",
					autoPlay:true, 
					vis:3,
					autoPage:true, 
					trigger:"click"
				});

				

			}
		}
	}
	)
	.catch(function(err)
	{
	   //console.log('企业推荐err='+err); 
	});

}

//3 详情--获取产品详情信息
function QueryEnterpriseDetail(Base_code) {
	//默认参数值
    var Base_codestr=Base_code;
    // console.log('Base_code='+Base_codestr); 

	var initParam = {
		base_code: Base_codestr,
	};
	var paramstr =JSON.stringify(initParam);
	//console.log("paramstr:"+paramstr);

    return new Promise((resolve, reject) => 
     {

 	   PostData('BaseDetailNew',paramstr)
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

// function Post(url, param, successfun) {
// 	var xhr = new plus.net.XMLHttpRequest();
// 	xhr.onreadystatechange = function() {
// 		console.log("onreadystatechange: " + xhr.readyState);
// 	}
// 	xhr.onload = function(e) {
// 		console.log(xhr.responseText)
// 		// xhr请求成功事件处理
// 		var returnJsonStr = GetResponseData(xhr.responseText);
// 		var json = JSON.parse(decodeURIComponent(Base64.decode(returnJsonStr)));
// 		successfun(json);
// 	};
// 	xhr.onerror = function(e) {
// 		var str = "lengthComputable=" + e.lengthComputable + "loaded=" + e.loaded + ";total=" + e.total;
// 		console.log("onerror: " + str);
// 	}
// 	var base64str = Base64.encode(encodeURIComponent(JSON.stringify(param)));
// 	xhr.open("POST", "http://218.246.23.195:1889" + "/" + url + "/" + base64str.length);
// 	xhr.setRequestHeader('Content-Type', 'text/html');
// 	// 发送HTTP请求
// 	console.log(base64str)
// 	console.log(base64str.length)
// 	xhr.send(base64str);
// }




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



//获取查询参数
function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return (false);
}

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
