
//init
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
  if(!pageNo){
     pageNo = 1;

  }
  if(tb_code=='00101')
	{
		 var  totalRecordsstr='构件技术 '+totalRecords;
		  $(".tabspan1").html(totalRecordsstr);

		// console.log('1tb_code分页->'+tb_code); 
		//  console.log('2totalPage->'+totalPage); 
		kkpager1.generPageHtml({
		    pno : pageNo,
			pagerid: 'kkpager1',
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
  else if(tb_code=='00102')
	{ 
		 var  totalRecordsstr='流程引擎 '+totalRecords;
		  $(".tabspan2").html(totalRecordsstr);

		kkpager2.generPageHtml({
		    pno : pageNo,
			pagerid: 'kkpager2',
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
  else if(tb_code=='00103')
	{
		  var  totalRecordsstr='数据库操作系统 '+totalRecords;
		  $(".tabspan3").html(totalRecordsstr);

		kkpager3.generPageHtml({
		    pno : pageNo,
			pagerid: 'kkpager3',
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
  else if(tb_code=='00104')
	{
		  var  totalRecordsstr='行业资讯 '+totalRecords;
		  $(".tabspan4").html(totalRecordsstr);
		kkpager4.generPageHtml({
		    pno : pageNo,

		    total : totalPage,
			pagerid: 'kkpager4',
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
  else if(tb_code=='00105')
	{
		  var  totalRecordsstr='关于家源树 '+totalRecords;
		  $(".tabspan5").html(totalRecordsstr);

		kkpager5.generPageHtml({
		    pno : pageNo,
			pagerid: 'kkpager5',
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
	else
	{
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

//console.log('查询'+tb_code);

//QueryArticlePageList_Code('001',pagecurrent)
//var pagecurrent=1;
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
    if(tb_code=='00101')
	{
	   $(".contenthdlist1").html(boxhdlisthtml);
	}
	else  if(tb_code=='00102')
	{
		$(".contenthdlist2").html(boxhdlisthtml);
	}
	else  if(tb_code=='00103')
	{
		$(".contenthdlist3").html(boxhdlisthtml);
	}
	else  if(tb_code=='00104')
	{
		$(".contenthdlist4").html(boxhdlisthtml);
	}
	else  if(tb_code=='00105')
	{
		$(".contenthdlist5").html(boxhdlisthtml);
	}
	else
	{
         $(".contenthdlist").html(boxhdlisthtml);
    }
 // console.log(TotalPages);
 // console.log(TotalCapacity);
   pagebyindexByCode(TotalPages,TotalCapacity,tb_code);


}
}
})
.catch(function(err)
{
console.log(err) 
});
}
