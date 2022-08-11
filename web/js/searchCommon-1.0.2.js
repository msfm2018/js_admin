function initPageSel()
{

	var indexsel=getQueryVariable('indexsel');
	if (!indexsel)
	{
	   indexsel = '1';
	}
	console.log(indexsel);

	var nindex=parseInt(indexsel);
	nindex=nindex-1;
	console.log(nindex);
	initclickbyindex(nindex);

	if(indexsel=='1')
	{
	  searchByInput();
	}
	else if(indexsel=='2')
	{
	  searchHrByInput();
	}
	else if(indexsel=='3')
	{
	searchJobByInput();
	}
	else if(indexsel=='4')
	{
	searchRqInfoByInput();
	}
	else if(indexsel=='5')
	{
	searchProductInfoByInput();
	}
	else if(indexsel=='6')
	{
	searchBlogByInput();
	}
}
function initclickbyindex(selindex)
{
   $(".js-tab").each(function(index) 
   {
     
    
      if(index==selindex)
      {
       //  console.log('index='+index); 
        $(".js-tab").removeClass("active"); //注意这里
        $(this).addClass("active"); //注意这里
        var tabname=$(this).attr('tab');
        var tabnamecss="."+tabname;

        $(".js-search-container").each(function(index) 
        {  
          var tabname2=$(this).attr('tab');
          if(tabname==tabname2)
          {
          $(this).removeClass("hidden"); //注意这里
          }
          else
          {
          $(this).addClass("hidden"); //注意这里
          }

        });
      }
    });
}

function clickHeadByindex(indexsel)
{
	if(indexsel=='0')//企业信息
	{
	  searchByInput();
	}
	else if(indexsel=='1')//用工需求
	{
	  searchHrByInput();
	}
	else if(indexsel=='2')//求职信息
	{
	  searchJobByInput();
	}
	else if(indexsel=='3')//需求信息
	{
	searchRqInfoByInput();
	}
	else if(indexsel=='4')//产品服务
	{
	searchProductInfoByInput();
	}
	else if(indexsel=='5')//博客
	{
	searchBlogByInput();
	}
}

function initpage()
{
$(document).ready(function()
{

   $(".js-tab").each(function(index) {
                $(this).click(function() 
                {
                	//console.log("index="+index);
                	clickHeadByindex(index);
                    $(".js-tab").removeClass("active"); //注意这里
                    $(this).addClass("active"); //注意这里


                       var tabname=$(this).attr('tab');
                      var tabnamecss="."+tabname;

                         $(".js-search-container").each(function(index) 
                         {  
                           var tabname2=$(this).attr('tab');
                           if(tabname==tabname2)
                           {
                             $(this).removeClass("hidden"); //注意这里
                           
                            
                           }
                           else
                           {
                              $(this).addClass("hidden"); //注意这里
                           }

                         });

                });
            })
   });



}
//init
//搜索相关
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

//6查询Blog信息
function searchBlogByInput()
{
	var keyword=$('.search_blog_input').val();
	var keywordstr=keyword;
	if(isnull(keyword))
	{

		keywordstr=''
	}
	//alert(keywordstr);
	 $("#curkeyword").val(keywordstr);
	$("#curpage").val(1);
    SearchBlogPagelistdata(1,keywordstr);
}

//分页查询blog信息列表
function SearchBlogPagelistdata(pagecurrent,keyword)
{
var boxhdlisthtml='';
var  TotalPages=0;
var  TotalCapacity=0;
var  queryVar='001';
QueryBasePageListBlog(keyword,pagecurrent)
.then(function(response)
{ 
if (response != null) 
{   var json = JSON.parse(response);
if (json.State == false)
{ alert(decodeMessage(json.Message));}
else
{
	TotalPages=json.TotalPages;
	TotalCapacity=json.TotalCapacity;
   console.log(json.Data);

	var htmlstr='';
	for (var item of json.Data) 
	{
		var art_titlestr='';//标题
		var art_nvar100_20str='';//公司名称
	    var art_lpicstr='';
		var art_summarystr='';//
		var corp_tnstr='';
		var art_idstr='';
	    if(typeof(item.corp_tn)!="undefined")
		{
			corp_tnstr=item.corp_tn;
		}
	    if(typeof(item.art_id)!="undefined")
		{
			art_idstr=item.art_id;
		}

		
		if(typeof(item.art_title)!="undefined")
		{
			art_titlestr=item.art_title;
		}
		if(typeof(item.art_nvar100_20)!="undefined")
		{
			art_nvar100_20str=item.art_nvar100_20;
		}

		if(typeof(item.art_lpic)!="undefined")
		{
			art_lpicstr=item.art_lpic;
		}
		

		
		if(typeof(item.art_summary)!="undefined")
		{
			//base_nvarmax_1str=item.base_nvarmax_1;
			art_summarystr=decodeURIComponent(Base64.decode(item.art_summary));
			art_summarystr= art_summarystr.substring(0,100);
		}

		var htmlnoimgstr='';
		var htmlimgstr='';

	if(art_lpicstr!='')
		{
		var t=new Date().getTime();
		var tstr=t+'';

		htmlstr='<a href="detail.html?tabsel=4&t='+t+'&corpcn='+corp_tnstr
		+'" class="aui-flex-hr b-line">'
		+'<div class="aui-flex-box"> <div class="aui-blog"><div class="aui-blog-top">' 
		+'<div class="aui-blog-top-left"><div class="aui-blog-top-left-img img_wrap">'
		+'<img src="'+art_lpicstr+'" class="audi_blogimg"></img>'
		+'</div>'
		+'</div><div class="aui-blog-top-right">'
		+'<div class="aui-blog-title">'
		+art_titlestr
		+'</div><div class="aui-blog-content">'
		+art_summarystr
		+'</div><div class="aui-blog-bottom"><span class="aui-blog-bottomspan">'
		+art_nvar100_20str
		+'</span></div></div></div>'
		+'<div class="aui-hr-splide"></div></div></a>'
		}
		else
		{
		var t=new Date().getTime();
		var tstr=t+'';

		htmlstr='<a href="detail.html?t='+t+'&corpcn='+corp_tnstr

		+'" class="aui-flex-hr b-line"><div class="aui-flex-box">' 
		+'<div class="aui-blog"><div class="aui-blog-top"> ' 
		+'<div class="aui-blog-top-fullcontent"><div class="aui-blog-title">' 
		+art_titlestr
		+'</div><div class="aui-blog-content">'
		+art_summarystr
		+'</div><div class="aui-blog-bottom"><span class="aui-blog-bottomspan">'
		+art_nvar100_20str
		+'</span></div></div></div>'
		+'<div class="aui-hr-splide"></div></div>' 
		+'</a>' 


		}

	
		boxhdlisthtml+=htmlstr;


	}

   if(TotalPages>0)
	{
	     $('.tab-panel').removeClass("hidden");
		 $(".contentsearchdiv").html(boxhdlisthtml);
		 $('.tabemtpyinfo').addClass("hidden");
    //设置全部页数
   	    SearchBlogPagelistdatabyindex(pagecurrent,TotalPages,TotalCapacity,keyword);
	}
	else
	{
 		$('.tabemtpyinfo').removeClass("hidden");
		$('.tab-panel').addClass("hidden");
   	 
	}

}
}
})
.catch(function(err)
{
console.log(err) 
});
}


function SearchBlogPagelistdatabyindex(pagecurrent,currenttotalPage,currenttotalRecords,keyword)
{

	//console.log('Search请求keyword------>',keyword);

var totalPage = currenttotalPage;//5;
var totalRecords =currenttotalRecords;// 390;
var pagehref = window.location.href;
var pageNo =$("#curpage").val();

 var  totalRecordsstr=''+totalRecords+'';
 $(".content-header-span1").html('共搜索到');
 $(".content-header-span").html(totalRecordsstr);
 $(".content-header-span2").html('条记录');

//----分页部分 代码片段二 开始----
    kkpager.total = totalPage;
    kkpager.totalRecords = totalRecords;
    kkpager.generPageHtml({
        pno: pageNo,
        //总页码
        total: totalPage,
        //总数据条数
        totalRecords: totalRecords,
        mode: 'click',
        //链接前部
        hrefFormer: pagehref,
        //链接尾部
        hrefLatter: '',//hrefLatter: '.html'
        click: function (n) 
        {
           $("#curpage").val(n);
           this.selectPage(n);

	      if(n==1){
	       
	        var keywordstr=$("#curkeyword").val();
	        // console.log('keywordstr-->'+keywordstr);
	        SearchBlogPagelistdata(n,keywordstr);

	      }else{
	      
	          var keywordstr=$("#curkeyword").val();
	           // console.log('keywordstr-->'+keywordstr);
	        SearchBlogPagelistdata(n,keywordstr);

	      }
	      return false;

        }
    },true);


	
 
}


//5查询产品信息
function searchProductInfoByInput()
{
	var keyword=$('.search_product_input').val();
	var keywordstr=keyword;
	if(isnull(keyword))
	{

		keywordstr=''
	}
	//alert(keywordstr);
	 $("#curkeyword").val(keywordstr);
	$("#curpage").val(1);
    SearchProductInfoPagelistdata(1,keywordstr);
}

//5分页查询产品服务信息列表
function SearchProductInfoPagelistdata(pagecurrent,keyword)
{
var boxhdlisthtml='';
var  TotalPages=0;
var  TotalCapacity=0;
var  queryVar='001';
QueryBasePageListProduct(keyword,pagecurrent)
.then(function(response)
{ 
if (response != null) 
{   var json = JSON.parse(response);
if (json.State == false)
{ alert(decodeMessage(json.Message));}
else
{
	TotalPages=json.TotalPages;
	TotalCapacity=json.TotalCapacity;
   console.log(json.Data);

	var htmlstr='';
	for (var item of json.Data) 
	{

	var base_namestr='';//产品/服务名称
	var base_nvar100_1='';//规格型号/服务等级
	var base_nvar100_2='';//产品产地/服务区域
	var base_nvarmax_1='';//产品描述(转码)
	var base_nvar100_20='';//提供单位
	var base_nvar100_19='';//联系人
	var base_nvar100_18='';//联系电话
	var corp_tnstr='';
	    if(typeof(item.corp_or_pers_num)!="undefined")
		{
			corp_tnstr=item.corp_or_pers_num;
		}

     if(typeof(item.base_name)!="undefined")
		{
			base_namestr=item.base_name;
		}
		if(typeof(item.base_nvar100_1)!="undefined")
		{
			base_nvar100_1str=item.base_nvar100_1;
		}
		if(typeof(item.base_nvar100_2)!="undefined")
		{
			base_nvar100_2str=item.base_nvar100_2;
		}

		if(typeof(item.base_nvar100_20)!="undefined")
		{
			base_nvar100_20str=item.base_nvar100_20;
		}
		
		if(typeof(item.base_nvar100_19)!="undefined")
		{
			base_nvar100_19str=item.base_nvar100_19;
		}
		if(typeof(item.base_nvar100_18)!="undefined")
		{
			base_nvar100_18str=item.base_nvar100_18;
		}


		if(typeof(item.base_nvarmax_1)!="undefined")
		{
			//base_nvarmax_1str=item.base_nvarmax_1;
			base_nvarmax_1str=decodeURIComponent(Base64.decode(item.base_nvarmax_1));
		}  
	
		var t=new Date().getTime();
		var tstr=t+'';

		htmlstr='<a href="detail.html?tabsel=3&t='+t+'&corpcn='+corp_tnstr
		+'" class="aui-flex-hr b-line">'
		+'<div class="aui-flex-box"> <div class="aui-product"><div class="aui-product-top">' 
		+'<div class="aui-product-top-left"><div class="aui-product-top-left-img img_wrap">' 
		+'<img src="./image/icon_empty.png"></img>' 
		+'</div></div>' 
		+'<div class="aui-product-top-right"><table class="aui-product-top-table">' 
		+'<tr class="indextr-top">' 
		+'<td class="tdleft1 toptdh">产品(服务)名称：</td>' 
		+'<td  class="tdleft2 toptdh">'+base_namestr+'</td>' 
		+'<td  class="tdleft3 toptdh">提供单位：</td>' 
		+'<td class="tdleft4 toptdh">'+base_nvar100_20str+'</td>' 
		+'</tr><tr class="indextr">' 
		+'<td class="tdleft1">产品产地（服务区域）：</td>' 
		+'<td  class="tdleft2">'+base_nvar100_2str+'</td>' 
		+'<td  class="tdleft3">规格型号(服务等级)：</td>' 
		+'<td class="tdleft4">'+base_nvar100_1str+'</td>' 
		+'</tr><tr class="indextr">' 
		+'<td class="tdleft1">联系人：</td>' 
		+'<td  class="tdleft2">'+base_nvar100_19str+'</td>' 
		+'<td  class="tdleft3">联系电话：</td>' 
		+'<td class="tdleft4">'+base_nvar100_18str+'</td>' 
		+'</tr><tr class="indextr">' 
		+'<td class="tdleft1" >产品(服务)描述：</td>' 
		+'<td  class="tdleft2" colspan="3">'+base_nvarmax_1str+'</td>' 
		+'</tr></table></div></div>' 
		+'<div class="aui-hr-splide"></div></div>'   
		+'</a>' ;

		//console.log(item);
		boxhdlisthtml+=htmlstr;


	}

   if(TotalPages>0)
	{
	     $('.tab-panel').removeClass("hidden");
		 $(".contentsearchdiv").html(boxhdlisthtml);
		 $('.tabemtpyinfo').addClass("hidden");
    //设置全部页数
   	    SearchProductInfoPagelistdatabyindex(pagecurrent,TotalPages,TotalCapacity,keyword);
	}
	else
	{
 		$('.tabemtpyinfo').removeClass("hidden");
		$('.tab-panel').addClass("hidden");
   	 
	}

}
}
})
.catch(function(err)
{
console.log(err) 
});
}


function SearchProductInfoPagelistdatabyindex(pagecurrent,currenttotalPage,currenttotalRecords,keyword)
{

	//console.log('Search请求keyword------>',keyword);

var totalPage = currenttotalPage;//5;
var totalRecords =currenttotalRecords;// 390;
var pagehref = window.location.href;
var pageNo =$("#curpage").val();

 var  totalRecordsstr=''+totalRecords+'';
 $(".content-header-span1").html('共搜索到');
 $(".content-header-span").html(totalRecordsstr);
 $(".content-header-span2").html('条记录');


//----分页部分 代码片段二 开始----
    kkpager.total = totalPage;
    kkpager.totalRecords = totalRecords;
    kkpager.generPageHtml({
        pno: pageNo,
        //总页码
        total: totalPage,
        //总数据条数
        totalRecords: totalRecords,
        mode: 'click',
        //链接前部
        hrefFormer: pagehref,
        //链接尾部
        hrefLatter: '',//hrefLatter: '.html'
        click: function (n) 
        {
           $("#curpage").val(n);
           this.selectPage(n);

	      if(n==1){
	       
	        var keywordstr=$("#curkeyword").val();
	        // console.log('keywordstr-->'+keywordstr);
	        SearchProductInfoPagelistdata(n,keywordstr);

	      }else{
	      
	          var keywordstr=$("#curkeyword").val();
	           // console.log('keywordstr-->'+keywordstr);
	        SearchProductInfoPagelistdata(n,keywordstr);

	      }
	      return false;

        }
    },true);


	
 
}

//4查询需求信息
function searchRqInfoByInput()
{
	var keyword=$('.search_rqinfo_input').val();
	var keywordstr=keyword;
	if(isnull(keyword))
	{

		keywordstr=''
	}
	//alert(keywordstr);
	 $("#curkeyword").val(keywordstr);
	$("#curpage").val(1);
    SearchRqInfoPagelistdata(1,keywordstr);
}

//分页查询需求信息列表
function SearchRqInfoPagelistdata(pagecurrent,keyword)
{
var boxhdlisthtml='';
var  TotalPages=0;
var  TotalCapacity=0;
var  queryVar='001';
QueryBasePageListRqInfo(keyword,pagecurrent)
.then(function(response)
{ 
if (response != null) 
{   var json = JSON.parse(response);
if (json.State == false)
{ alert(decodeMessage(json.Message));}
else
{
	TotalPages=json.TotalPages;
	TotalCapacity=json.TotalCapacity;
   console.log(json.Data);

	var htmlstr='';
	for (var item of json.Data) 
	{
		var base_namestr='';//职位名称
		var base_nvar100_1str='';//期望地区
		var base_nvar100_20str='';//发布企业
		var base_nvar100_19str='';//联系人
		var base_nvar100_18str='';//联系电话

		var make_datestr='';//发布日期
		var base_date_1str='';//截至日期
		var base_nvarmax_1str='';//职位说明(需要转码)
		var corp_tnstr='';
	    if(typeof(item.corp_or_pers_num)!="undefined")
		{
			corp_tnstr=item.corp_or_pers_num;
		}

     if(typeof(item.base_name)!="undefined")
		{
			base_namestr=item.base_name;
		}
		if(typeof(item.base_nvar100_1)!="undefined")
		{
			base_nvar100_1str=item.base_nvar100_1;
		}
		if(typeof(item.base_nvar100_20)!="undefined")
		{
			base_nvar100_20str=item.base_nvar100_20;
		}
		
		if(typeof(item.base_nvar100_19)!="undefined")
		{
			base_nvar100_19str=item.base_nvar100_19;
		}
		if(typeof(item.base_nvar100_18)!="undefined")
		{
			base_nvar100_18str=item.base_nvar100_18;
		}

		if(typeof(item.make_date)!="undefined")
		{
			make_datestr=item.make_date;
		}
		if(typeof(item.base_date_1)!="undefined")
		{
			base_date_1str=item.base_date_1;
		}
		if(typeof(item.base_nvarmax_1)!="undefined")
		{
			//base_nvarmax_1str=item.base_nvarmax_1;
			base_nvarmax_1str=decodeURIComponent(Base64.decode(item.base_nvarmax_1));
		}  

		var t=new Date().getTime();
		var tstr=t+'';

		htmlstr='<a href="detail.html?tabsel=6&t='+t+'&corpcn='+corp_tnstr
		+'" class="aui-flex-hr b-line">'
		+'<div class="aui-flex-box"> <div class="aui-hr"><div class="aui-hr-top"> <div class="aui-rqinfoA">' 
		+'<span>'+base_namestr+'<span>'
		+'</div><div class="aui-rqinfoB">'
		+'<span>'+base_nvarmax_1str+'</span></div>'
		+'<div class="aui-rqinfoC"><span>'+base_nvar100_1str+' </span></div>'
		+'<div class="aui-rqinfoD">'
		+'<div class="aui-rqinfoD-top">'
		+'<span> '+base_nvar100_20str+' </span>'
		+'</div>'
		+'<div class="aui-rqinfoD-bottom">'
		+'<span>正在进行 </span>'
		+'</div></div></div>'
		+'<div class="aui-hr-bottom"> '
		+'<div class="aui-hr-post-left">'
		+'<div class="aui-hr-post">'
		+'<span>采购期限</span></div>'
		+'</div><div class="aui-hr-post-right">'
		+'<span>'+make_datestr
		+'</span>'
		+'</div>'
		+'<div class="aui-talk-right">'
		+'<img class="aui-talk1" src="./image/icon_talk.png">&nbsp;&nbsp;</img>'
		+'</div></div></div>'
		+'<div class="aui-hr-splide">'
		+'</div></div>  </a>'
		//console.log(item);
		boxhdlisthtml+=htmlstr;


	}

   if(TotalPages>0)
	{
	
	     $('.tab-panel').removeClass("hidden");
		 $(".contentsearchdiv").html(boxhdlisthtml);
		 $('.tabemtpyinfo').addClass("hidden");
    //设置全部页数
   	    SearchRqInfoPagelistdatabyindex(pagecurrent,TotalPages,TotalCapacity,keyword);
	}
	else
	{
 		$('.tabemtpyinfo').removeClass("hidden");
		$('.tab-panel').addClass("hidden");
   	 
	}

}
}
})
.catch(function(err)
{
console.log(err) 
});
}


function SearchRqInfoPagelistdatabyindex(pagecurrent,currenttotalPage,currenttotalRecords,keyword)
{

	//console.log('Search请求keyword------>',keyword);

var totalPage = currenttotalPage;//5;
var totalRecords =currenttotalRecords;// 390;
var pagehref = window.location.href;
var pageNo =$("#curpage").val();

 var  totalRecordsstr=''+totalRecords+'';
 $(".content-header-span1").html('共搜索到');
 $(".content-header-span").html(totalRecordsstr);
 $(".content-header-span2").html('条记录');


//----分页部分 代码片段二 开始----
    kkpager.total = totalPage;
    kkpager.totalRecords = totalRecords;
    kkpager.generPageHtml({
        pno: pageNo,
        //总页码
        total: totalPage,
        //总数据条数
        totalRecords: totalRecords,
        mode: 'click',
        //链接前部
        hrefFormer: pagehref,
        //链接尾部
        hrefLatter: '',//hrefLatter: '.html'
        click: function (n) 
        {
           $("#curpage").val(n);
           this.selectPage(n);

	      if(n==1){
	       
	        var keywordstr=$("#curkeyword").val();
	        // console.log('keywordstr-->'+keywordstr);
	        SearchRqInfoPagelistdata(n,keywordstr);

	      }else{
	      
	          var keywordstr=$("#curkeyword").val();
	           // console.log('keywordstr-->'+keywordstr);
	        SearchRqInfoPagelistdata(n,keywordstr);

	      }
	      return false;

        }
    },true);


	
 
}

//3查询求职信息
function searchJobByInput()
{
	var keyword=$('.search_job_input').val();
	var keywordstr=keyword;
	if(isnull(keyword))
	{

		keywordstr=''
	}
	//alert(keywordstr);
	 $("#curkeyword").val(keywordstr);
	$("#curpage").val(1);
    SearchJobPagelistdata(1,keywordstr);
}

//分页查询求职信息列表
function SearchJobPagelistdata(pagecurrent,keyword)
{
var boxhdlisthtml='';
var  TotalPages=0;
var  TotalCapacity=0;
var  queryVar='001';
QueryBasePageListJob(keyword,pagecurrent)
.then(function(response)
{ 
if (response != null) 
{   var json = JSON.parse(response);
if (json.State == false)
{ alert(decodeMessage(json.Message));}
else
{
	TotalPages=json.TotalPages;
	TotalCapacity=json.TotalCapacity;
   console.log(json.Data);

	var htmlstr='';
	for (var item of json.Data) 
	{
		var base_namestr='';//职位名称
		var base_nvar100_1str='';//性别
		var base_nvar100_2str='';//年龄
		var base_nvar100_3str='';//工龄

		var base_nvar100_4str='';//应聘岗位
		var base_nvar100_5str='';// 期待工作地点：
		var base_nvar100_6str='';// 期待薪资：
		var base_nvar100_7str='';// 联系电话：
		var base_nvar100_8str='';// 联系微信：
		var base_nvar100_9str='';// 联系Email：
		var base_nvarmax_1str='';//职业技能
		var base_nvarmax_2str='';// 个人简介：


		var make_datestr='';//发布日期
		var base_date_1str='';//截至日期
		var corp_tnstr='';
	    if(typeof(item.corp_tn)!="undefined")
		{
			corp_tnstr=item.corp_tn;
		}
		
		if(typeof(item.base_name)!="undefined")
		{
			base_namestr=item.base_name;
		}
		if(typeof(item.base_nvar100_1)!="undefined")
		{
			base_nvar100_1str=item.base_nvar100_1;
		}
		if(typeof(item.base_nvar100_2)!="undefined")
		{
			base_nvar100_2str=item.base_nvar100_2;
		}
		if(typeof(item.base_nvar100_3)!="undefined")
		{
			base_nvar100_3str=item.base_nvar100_3;
		}

		if(typeof(item.base_nvar100_4)!="undefined")
		{
			base_nvar100_4str=item.base_nvar100_4;
		}

		if(typeof(item.base_nvar100_5)!="undefined")
		{
			base_nvar100_5str=item.base_nvar100_5;
		}
		if(typeof(item.base_nvar100_6)!="undefined")
		{
			base_nvar100_6str=item.base_nvar100_6;
		}
		if(typeof(item.base_nvar100_7)!="undefined")
		{
			base_nvar100_7str=item.base_nvar100_7;
		}

		if(typeof(item.base_nvar100_8)!="undefined")
		{
			base_nvar100_8str=item.base_nvar100_8;
		}
		if(typeof(item.base_nvar100_9)!="undefined")
		{
			base_nvar100_9str=item.base_nvar100_9;
		}

		if(typeof(item.make_date)!="undefined")
		{
			make_datestr=item.make_date;
			var strs= new Array(); //定义一数组
			strs=make_datestr.split(" "); //字符分割
			 make_datestr=strs[0];
			 make_datestr=make_datestr.replace(/\//g,"-")

		}
		if(typeof(item.base_date_1)!="undefined")
		{
			base_date_1str=item.base_date_1;
			 base_date_1str=base_date_1str.replace(/\//g,"-")
		}
		if(typeof(item.base_nvarmax_1)!="undefined")
		{
			//base_nvarmax_1str=item.base_nvarmax_1;
			base_nvarmax_1str=decodeURIComponent(Base64.decode(item.base_nvarmax_1));
		}

		if(typeof(item.base_nvarmax_2)!="undefined")
		{
			//base_nvarmax_1str=item.base_nvarmax_1;
			base_nvarmax_2str=decodeURIComponent(Base64.decode(item.base_nvarmax_2));
		}

		htmlstr='<a href="javscript:void()" class="aui-flex-hr b-line">'
		+'<div class="aui-flex-box"><div class="aui-job">'
		+'<div class="aui-job-box"><table class="aui-product-top-table">'
		+'<tr class="indextr-top">'
		+'<td class="jobtdleft1 toptdh">姓名： </td>'
		+'<td  class="jobtdleft2 toptdh">'+base_namestr+'</td>'
		+'<td  class="jobtdleft3 toptdh">性别：</td>'
		+'<td class="jobtdleft4 toptdh">'+base_nvar100_1str+'</td>'
		+'<td  class="jobtdleft5 toptdh">年龄： </td>'
		+'<td class="jobtdleft6 toptdh">'+base_nvar100_2str+'</td>'
		+'</tr><tr class="indextr">'
		+'<td class="jobtdleft1 toptdh">职业技能：</td>'
		+'<td  class="jobtdleft2 toptdh" colspan="5">'+base_nvarmax_1str+'</td>'
		+'</tr><tr class="indextr">'
		+'<td class="jobtdleft1 toptdh">工龄：</td>'
		+'<td  class="jobtdleft2 toptdh">'+base_nvar100_3str+'</td>'
		+'<td  class="jobtdleft3 toptdh">应聘岗位： </td>'
		+'<td class="jobtdleft4 toptdh">'+base_nvar100_4str+'</td>'
		+'<td  class="jobtdleft5 toptdh">期待工作地点：  </td>'
		+'<td class="jobtdleft6 toptdh">'+base_nvar100_5str+'</td>'
		+'</tr><tr class="indextr">'
		+'<td class="jobtdleft1 toptdh">期待薪资：  </td>'
		+'<td  class="jobtdleft2 toptdh">'+base_nvar100_6str+'</td>'
		+'<td  class="jobtdleft3 toptdh">联系电话： </td>'
		+'<td class="jobtdleft4 toptdh">'+base_nvar100_7str+'</td>'
		+'<td  class="jobtdleft5 toptdh">联系微信：  </td>'
		+'<td class="jobtdleft6 toptdh">'+base_nvar100_8str+'</td>'
		+'</tr><tr class="indextr">'
		+'<td class="jobtdleft1 toptdh">联系Email：  </td>'
		+'<td  class="jobtdleft2 toptdh">'+base_nvar100_9str+'</td>'
		+'<td  class="jobtdleft3 toptdh">发布日期： </td>'
		+'<td class="jobtdleft4 toptdh">'+make_datestr+'</td>'
		+'<td  class="jobtdleft5 toptdh">截止日期： </td>'
		+'<td class="jobtdleft6 toptdh">'+base_date_1str+'</td>'
		+'</tr></table></div></div>'
		+'<div class="aui-hr-splide"></div></div> ' 
		+'</a>'

	
		boxhdlisthtml+=htmlstr;


	}

   if(TotalPages>0)
	{
	     $('.tab-panel').removeClass("hidden");
		 $(".contentsearchdiv").html(boxhdlisthtml);
		 $('.tabemtpyinfo').addClass("hidden");
    //设置全部页数
   	    SearchJobPagelistdatabyindex(pagecurrent,TotalPages,TotalCapacity,keyword);
	}
	else
	{
 		$('.tabemtpyinfo').removeClass("hidden");
		$('.tab-panel').addClass("hidden");
   	 
	}

}
}
})
.catch(function(err)
{
console.log(err) 
});
}


function SearchJobPagelistdatabyindex(pagecurrent,currenttotalPage,currenttotalRecords,keyword)
{

	//console.log('Search请求keyword------>',keyword);

var totalPage = currenttotalPage;//5;
var totalRecords =currenttotalRecords;// 390;
var pagehref = window.location.href;
var pageNo =$("#curpage").val();

 var  totalRecordsstr=''+totalRecords+'';
 $(".content-header-span1").html('共搜索到');
 $(".content-header-span").html(totalRecordsstr);
 $(".content-header-span2").html('条记录');

//----分页部分 代码片段二 开始----
    kkpager.total = totalPage;
    kkpager.totalRecords = totalRecords;
    kkpager.generPageHtml({
        pno: pageNo,
        //总页码
        total: totalPage,
        //总数据条数
        totalRecords: totalRecords,
        mode: 'click',
        //链接前部
        hrefFormer: pagehref,
        //链接尾部
        hrefLatter: '',//hrefLatter: '.html'
        click: function (n) 
        {
           $("#curpage").val(n);
           this.selectPage(n);

	      if(n==1){
	       
	        var keywordstr=$("#curkeyword").val();
	        // console.log('keywordstr-->'+keywordstr);
	        SearchJobPagelistdata(n,keywordstr);

	      }else{
	      
	          var keywordstr=$("#curkeyword").val();
	           // console.log('keywordstr-->'+keywordstr);
	        SearchJobPagelistdata(n,keywordstr);

	      }
	      return false;

        }
    },true);


	
 
}

//2查询用工需求
function searchHrByInput()
{
	var keyword=$('.search_hr_input').val();
	var keywordstr=keyword;
	if(isnull(keyword))
	{

		keywordstr=''
	}
	//alert(keywordstr);
	 $("#curkeyword").val(keywordstr);
	$("#curpage").val(1);
    SearchHRPagelistdata(1,keywordstr);
}

//分页查询用工需求列表
function SearchHRPagelistdata(pagecurrent,keyword)
{
var boxhdlisthtml='';
var  TotalPages=0;
var  TotalCapacity=0;
var  queryVar='001';
QueryBasePageList(keyword,pagecurrent)
.then(function(response)
{ 
if (response != null) 
{   var json = JSON.parse(response);
if (json.State == false)
{ alert(decodeMessage(json.Message));}
else
{
	TotalPages=json.TotalPages;
	TotalCapacity=json.TotalCapacity;
   console.log(json.Data);

	var htmlstr='';
	for (var item of json.Data) 
	{
		var base_namestr='';//职位名称
		var base_nvar100_1str='';//工作地点
		var base_nvar100_2str='';//薪资范围
		var base_nvar100_3str='';//学历要求

		var base_nvar100_4str='';//工作经验
		var base_nvar100_19str='';//联系人
		var base_nvar100_18str='';//联系电话

		var make_datestr='';//发布日期
		var base_date_1str='';//截至日期
		var base_nvarmax_1str='';//职位说明(需要转码)
		var corp_tnstr='';
	    if(typeof(item.corp_or_pers_num)!="undefined")
		{
			corp_tnstr=item.corp_or_pers_num;
		}

		if(typeof(item.base_name)!="undefined")
		{
			base_namestr=item.base_name;
		}
		if(typeof(item.base_nvar100_1)!="undefined")
		{
			base_nvar100_1str=item.base_nvar100_1;
		}
		if(typeof(item.base_nvar100_2)!="undefined")
		{
			base_nvar100_2str=item.base_nvar100_2;
		}
		if(typeof(item.base_nvar100_3)!="undefined")
		{
			base_nvar100_3str=item.base_nvar100_3;
		}

		if(typeof(item.base_nvar100_4)!="undefined")
		{
			base_nvar100_4str=item.base_nvar100_4;
		}
		if(typeof(item.base_nvar100_19)!="undefined")
		{
			base_nvar100_19str=item.base_nvar100_19;
		}
		if(typeof(item.base_nvar100_18)!="undefined")
		{
			base_nvar100_18str=item.base_nvar100_18;
		}

		if(typeof(item.make_date)!="undefined")
		{
			make_datestr=item.make_date;
		}
		if(typeof(item.base_date_1)!="undefined")
		{
			base_date_1str=item.base_date_1;
		}
		if(typeof(item.base_nvarmax_1)!="undefined")
		{
			//base_nvarmax_1str=item.base_nvarmax_1;
			base_nvarmax_1str=decodeURIComponent(Base64.decode(item.base_nvarmax_1));
		}
		var t=new Date().getTime();
		var tstr=t+'';
		//console.log(t+'');
		htmlstr='<a href="detail.html?tabsel=5&t='+tstr+'&corpcn='+corp_tnstr
		+'" class="aui-flex-hr b-line">'
		+'<div class="aui-flex-box"> '
		+'<div class="aui-hr"><div class="aui-hr-top"><div class="aui-hr-top-left">'
		+'<ul class="aui-hr-top-left-ul">'
		+'<li><span class="aui-hr-spanA">'+base_namestr+'</span>'
		+'<span  class="aui-hr-spanB">['+base_nvar100_1str+']</span></li>' 
		+'<li class="aui-hr-top-left-liC">'
		+'<span class="aui-hr-spanC">'+base_nvar100_2str+'</span>'
		+'<span class="aui-hr-spanD">'+base_nvar100_3str+'</span></li>'
		+'</ul></div>'
		+'<div class="aui-hr-top-right">'
		+'<ul class="aui-hr-top-right-ul">'
		+'<li class="aui-hr-top-left-liE"><span class="aui-hr-spanE">'+base_nvar100_19str+'</span></li>' 
		+'<li class="aui-hr-top-left-liF">'
		+'<span class="aui-hr-spanF">发布日期：'+make_datestr+'</span>'
		+'</li></ul></div></div>'
		+'<div class="aui-hr-bottom">' 
		+'<div class="aui-hr-post-left">'
		+'<div class="aui-hr-post">'
		+'<span>职位要求</span>'
		+'</div></div>'
		+'<div class="aui-hr-post-right">'
		+'<span>'+base_nvarmax_1str
		+'</span></div></div></div>'
		+'<div class="aui-hr-splide"></div></div>'  
		+'</a>'
		boxhdlisthtml+=htmlstr;


	}

   if(TotalPages>0)
	{
	     $('.tab-panel').removeClass("hidden");
		 $(".contentsearchdiv").html(boxhdlisthtml);
		 $('.tabemtpyinfo').addClass("hidden");
    //设置全部页数
   	    SearchHRPagelistdatabyindex(pagecurrent,TotalPages,TotalCapacity,keyword);
	}
	else
	{
 		$('.tabemtpyinfo').removeClass("hidden");
		$('.tab-panel').addClass("hidden");
   	 
	}

}
}
})
.catch(function(err)
{
console.log(err) 
});
}


function SearchHRPagelistdatabyindex(pagecurrent,currenttotalPage,currenttotalRecords,keyword)
{

	//console.log('Search请求keyword------>',keyword);

var totalPage = currenttotalPage;//5;
var totalRecords =currenttotalRecords;// 390;
var pagehref = window.location.href;
var pageNo =$("#curpage").val();

 var  totalRecordsstr=''+totalRecords+'';
 $(".content-header-span1").html('共搜索到');
 $(".content-header-span").html(totalRecordsstr);
 $(".content-header-span2").html('条记录');


//----分页部分 代码片段二 开始----
    kkpager.total = totalPage;
    kkpager.totalRecords = totalRecords;
    kkpager.generPageHtml({
        pno: pageNo,
        //总页码
        total: totalPage,
        //总数据条数
        totalRecords: totalRecords,
        mode: 'click',
        //链接前部
        hrefFormer: pagehref,
        //链接尾部
        hrefLatter: '',//hrefLatter: '.html'
        click: function (n) 
        {
           $("#curpage").val(n);
           this.selectPage(n);

	      if(n==1){
	       
	        var keywordstr=$("#curkeyword").val();
	        // console.log('keywordstr-->'+keywordstr);
	        SearchHRPagelistdata(n,keywordstr);

	      }else{
	      
	          var keywordstr=$("#curkeyword").val();
	           // console.log('keywordstr-->'+keywordstr);
	        SearchHRPagelistdata(n,keywordstr);

	      }
	      return false;

        }
    },true);


	
 
}

//----------------------

//1 查询企业
function searchByInput()
{
	var keyword=$('.search_corp_input').val();
	var keywordstr=keyword;
	if(isnull(keyword))
	{

		keywordstr=''
	}
	$("#curkeyword").val(keywordstr);
	$("#curpage").val(1);
    SearchCorpPagelistdata(1,keywordstr);
}
//分页查询列表
function SearchCorpPagelistdata(pagecurrent,keyword)
{
var boxhdlisthtml='';
var  TotalPages=0;
var  TotalCapacity=0;

var  queryVar='001';
QueryCorpPageListByCode(keyword,pagecurrent)
.then(function(response)
{ 
if (response != null) 
{   var json = JSON.parse(response);
if (json.State == false)
{ console.log(decodeMessage(json.Message));}
else
{
	TotalPages=json.TotalPages;
	TotalCapacity=json.TotalCapacity;
    //Blconsole.log(json.Data);

	var htmlstr='';
	for (var item of json.Data) 
	{
		var corp_namestr='';
		var corp_businessstr='';
		var corp_linkmanstr='';
		var corp_telstr='';
		var corp_addressstr='';
		var corp_emailstr='';
		var corp_headurlstr='';
		var corp_tnstr='';
		if(typeof(item.corp_name)!="undefined")
		{
			corp_namestr=item.corp_name;
		}
	   if(typeof(item.corp_tn)!="undefined")
		{
			corp_tnstr=item.corp_tn;
		}
		
		if(typeof(item.corp_linkman)!="undefined")
		{
			corp_linkmanstr=item.corp_linkman;
		}
	    if(typeof(item.corp_tel)!="undefined")
		{
			corp_telstr=item.corp_tel;
		}
		if(typeof(item.corp_address)!="undefined")
		{
			corp_addressstr=item.corp_address;
		}
		if(typeof(item.corp_email)!="undefined")
		{

			corp_emailstr=decodeURIComponent(Base64.decode(item.corp_email));
		}
		var imgsrc='<img src="./image/icon_corp.png" alt="" class="aui-flex-cor-img">'
		if(typeof(item.corp_headurl)!="undefined")
		{
			corp_headurlstr=decodeURIComponent(Base64.decode(item.corp_headurl));
			//corp_headurlstr=item.corp_headurl;
			imgsrc='<img src="'+corp_headurlstr+'" class="aui-flex-cor-img">'
		}

	
		if(typeof(item.corp_business)!="undefined")
		{
			corp_businessstr=decodeURIComponent(Base64.decode(item.corp_business));
		}
		var t=new Date().getTime();
		var tstr=t+'';

		htmlstr='<a href="detail.html?t='+t+'&corpcn='+corp_tnstr
		+'" class="aui-flex b-line">'
		+'<div class="aui-flex-img2">'
		+imgsrc
		+'</div>'
		+'<div class="aui-flex-box">'
		+'<ul> <li>'
		+'<span class="aui-flex-box-title-left">'+corp_namestr+ '</span>'
		+'<span class="aui-flex-box-title-right">&nbsp;</span>'
		+'</li> </ul>' 
		+'<div class="aui-flex-box-content">' 
		+'<p><span>联系人</span>：'+corp_linkmanstr+'&nbsp;&nbsp;'
		+'<span>联系电话</span>：'+corp_telstr+'&nbsp;&nbsp;'
		+'<span>企业邮箱</span>：'+corp_emailstr+'&nbsp;&nbsp;'+'</p>'
		+'<p><span>注册地址</span>：'+corp_addressstr+'</p>'
		+'<p><span>经营范围</span>：'+corp_businessstr+'</p>'+'</div>' 
		+'</div>'
		+'</a>'
 		boxhdlisthtml+=htmlstr;

	}

   if(TotalPages>0)
	{
	     $('.tab-panel').removeClass("hidden");
		 $(".contentsearchdiv").html(boxhdlisthtml);
		 $('.tabemtpyinfo').addClass("hidden");
    //设置全部页数
   	    SearchCorpPagelistdatabyindex(pagecurrent,TotalPages,TotalCapacity,keyword);
	}
	else
	{
 		$('.tabemtpyinfo').removeClass("hidden");
		$('.tab-panel').addClass("hidden");
   	 
	}

}
}
})
.catch(function(err)
{
console.log(err) 
});
}


function SearchCorpPagelistdatabyindex(pagecurrent,currenttotalPage,currenttotalRecords,keyword)
{

	//console.log('Search请求keyword------>',keyword);

  var totalPage = currenttotalPage;//5;
  var totalRecords =currenttotalRecords;// 390;
   var pagehref = window.location.href;
 var pageNo =$("#curpage").val();
 //console.log('curpage pageNo '+pageNo);
 // var pageNo=getQueryVariable('pno');
 // if (!pageNo)
 //  {
 //    pageNo = 1;
 // }
  
	
 var  totalRecordsstr=''+totalRecords+'';
 $(".content-header-span1").html('当前生态圈共有');
 $(".content-header-span").html(totalRecordsstr);
 $(".content-header-span2").html('家企业');


//----分页部分 代码片段二 开始----
    kkpager.total = totalPage;
    kkpager.totalRecords = totalRecords;
    kkpager.generPageHtml({
        pno: pageNo,
        //总页码
        total: totalPage,
        //总数据条数
        totalRecords: totalRecords,
        mode: 'click',
        //链接前部
        hrefFormer: pagehref,
        //链接尾部
        hrefLatter: '',//hrefLatter: '.html'
        click: function (n) 
        {
           $("#curpage").val(n);
           this.selectPage(n);

	      if(n==1){
	       
	        var keywordstr=$("#curkeyword").val();
	        // console.log('keywordstr-->'+keywordstr);
	        SearchCorpPagelistdata(n,keywordstr);

	      }else{
	      
	          var keywordstr=$("#curkeyword").val();
	           // console.log('keywordstr-->'+keywordstr);
	        SearchCorpPagelistdata(n,keywordstr);

	      }
	      return false;

        }
    },true);


	
 
}


//----
function pagebyindex(currenttotalPage,currenttotalRecords)
{
  var totalPage = currenttotalPage;//5;
  var totalRecords =currenttotalRecords;// 390;
  //console.log('totalPage->'+totalPage);
   console.log('totalRecords->'+totalRecords); 
    var pageNo =getQueryVariable('pindex');
  //var pageNo = getParameter('pno');
  if(!pageNo){
     pageNo = 1;

  }



  kkpager.generPageHtml({
    pno : pageNo,

    total : totalPage,

    totalRecords : totalRecords,
    mode : 'click',//默认值是link，可选link或者click
    click : function(n){
      this.selectPage(n);

      if(n==1){
        console.log(n);
        querynewspagelistdata(n);

      }else{
        console.log(n);
        querynewspagelistdata(n);

      }
      return false;
    }
  });
}


//分页查询新闻列表
function querynewspagelistdata(pagecurrent)
{
var boxhdlisthtml='';
var  TotalPages=0;
var  TotalCapacity=0;
//var pagecurrent=1;
QueryArticlePageList_Code('001',pagecurrent)
.then(function(response)
{ 
if (response != null) 
{   var json = JSON.parse(response);
if (json.State == false)
{ alert(decodeMessage(json.Message));}
else
{
TotalPages=json.TotalPages;
TotalCapacity=json.TotalCapacity;
console.log('PageCurrent'+json.PageCurrent);
console.log('TotalCapacity'+TotalCapacity); 
//console.log(json.PageSize);
console.log('json.Data'+json.Data); 
console.log(json.TotalPages);
var htmlstr='';

 for (var item of json.Data) 
{
//contentstr.substring(0,40)
var contentstr = '';
//decodeURIComponent(Base64.decode(item.art_content));
//var summarystr = decodeURIComponent(Base64.decode(item.art_summary));
//var summarystr='123';
if(typeof(item.art_summary)=="undefined")
{
	contentstr=decodeURIComponent(Base64.decode(item.art_content));
}
else
{
    contentstr=decodeURIComponent(Base64.decode(item.art_summary));
}
//console.log('contentstr->'+contentstr);//base64解码正常
//console.log('summarystr原始->'+item.art_summary);//这里可以输出
//console.log('summarystr->'+summarystr);//base64解码出现问题
htmlstr='<li><a href="'
+'news.html?art_id='
+item.art_id
+'" target="_blank">'

+'<div class="leftimgnews fl">'
+'<img src="'
+item.art_lpic
+'" width="250px" height="120px"/></div>'

+'<div class="leftnews fl">'
+'<p>'+item.art_time.substring(0,10)+'</p>'
+'<h3>'+item.art_title+'</h3>'
+'<p>'+contentstr.substring(0,100)+'</p>'

//+'<p>'+item.kind_name+'</p>'
+'<div class="rightnews fr">'
+'<p class="news-tags-group"><a class="news-tag" href="#">'
+'<span class="spanname">'+item.kind_name+'</span></a></p>'
+'</div>'
+'</div>'
+'<div class="clear"></div>'
+'</a></li>';

console.log('htmlstr->'+htmlstr);
 boxhdlisthtml+=htmlstr;

}

//$(".contenthdlist").append(boxhdlisthtml);//往hd里面插入数据
$(".contenthdlist").html(boxhdlisthtml);
  console.log(TotalPages);
  console.log(TotalCapacity);
   pagebyindex(TotalPages,TotalCapacity);
}
}
})
.catch(function(err)
{
console.log(err) 
});
}


function pagebyindexByCode(currenttotalPage,currenttotalRecords,tb_code)
{
  var totalPage = currenttotalPage;//5;
  var totalRecords =currenttotalRecords;// 390;
  //console.log('totalPage->'+totalPage);
   console.log('总页数->'+totalRecords); 
    var pageNo =getQueryVariable('pindex');
  //var pageNo = getParameter('pno');
  if(!pageNo)
  {
     pageNo = 1;

  }
  
	
		 var  totalRecordsstr='全部文章 '+totalRecords;
		  $(".tabspan").html(totalRecordsstr);

		  kkpager.generPageHtml({
		    pno : pageNo,

		    total : totalPage,

		    totalRecords : totalRecords,
		    mode : 'click',//默认值是link，可选link或者click
		    click : function(n){
		      this.selectPage(n);

		      if(n==1){
		        console.log(n);
		        querynewspagelistdataByCode(n,tb_code);

		      }else{
		        console.log(n);
		        querynewspagelistdataByCode(n,tb_code);

		      }
		      return false;
		    }
		  });
 
}

function clickdataByCode(tb_code)
{
  console.log('点击'+tb_code);
  if(tb_code=='00101')
{
   $(".tabalist1").click();
}
else if(tb_code=='00102')
{
   $(".tabalist2").click();
}
else if(tb_code=='00103')
{
   $(".tabalist3").click();
}
else if(tb_code=='00104')
{
   $(".tabalist4").click();
}
else if(tb_code=='00105')
{
   $(".tabalist5").click();
}

  //querynewspagelistdataByCode(1,tb_code);
}
//分页查询新闻列表
function querynewspagelistdataByCode(pagecurrent,tb_code)
{
var boxhdlisthtml='';
var  TotalPages=0;
var  TotalCapacity=0;

var  queryVar='001';

QueryArticlePageList_Code(tb_code,pagecurrent)
.then(function(response)
{ 
if (response != null) 
{   var json = JSON.parse(response);
if (json.State == false)
{ alert(decodeMessage(json.Message));}
else
{
TotalPages=json.TotalPages;
TotalCapacity=json.TotalCapacity;
console.log('PageCurrent'+json.PageCurrent);
console.log('TotalCapacity'+TotalCapacity); 
//console.log(json.PageSize);
//console.log('json.Data'+json.Data); 
console.log(json.TotalPages);
var htmlstr='';

 for (var item of json.Data) 
{
//contentstr.substring(0,40)
var contentstr = '';
//decodeURIComponent(Base64.decode(item.art_content));
//var summarystr = decodeURIComponent(Base64.decode(item.art_summary));
//var summarystr='123';
if(typeof(item.art_summary)=="undefined")
{
	contentstr=decodeURIComponent(Base64.decode(item.art_content));
}
else
{
    contentstr=decodeURIComponent(Base64.decode(item.art_summary));
}

htmlstr='<li><a href="'
+'news.html?art_id='
+item.art_id
+'" target="_blank">'

+'<div class="leftimgnews fl">'
+'<img src="'
+item.art_lpic
+'" width="250px" height="120px"/></div>'

+'<div class="leftnews fl">'
+'<p>'+item.art_time.substring(0,10)+'</p>'
+'<h3>'+item.art_title+'</h3>'
+'<p>'+contentstr.substring(0,100)+'</p>'

//+'<p>'+item.kind_name+'</p>'
+'<div class="rightnews fr">'
+'<p class="news-tags-group"><a class="news-tag" href="javascript:clickdataByCode(\''
+item.kind_code+'\')"'
+'><span class="spanname">'+item.kind_name+'</span></a></p>'
+'</div>'
+'</div>'
+'<div class="clear"></div>'
+'</a></li>';

//console.log('htmlstr->'+htmlstr);
 boxhdlisthtml+=htmlstr;

}

//$(".contenthdlist").append(boxhdlisthtml);//往hd里面插入数据
   console.log('tb_code='+tb_code);
    
     $(".contenthdlist").html(boxhdlisthtml);

   pagebyindexByCode(TotalPages,TotalCapacity,tb_code);


}
}
})
.catch(function(err)
{
console.log(err) 
});
}
