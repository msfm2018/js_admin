function initpage() {
    $(document).ready(function () {

        $(".js-tab").each(function (index) {
            $(this).click(function () {
                $(".js-tab").removeClass("active"); //注意这里
                $(this).addClass("active"); //注意这里


                var tabname = $(this).attr('tab');
                var tabnamecss = "." + tabname;

                $(".js-search-container").each(function (index) {
                    var tabname2 = $(this).attr('tab');
                    if (tabname == tabname2) {
                        $(this).removeClass("hidden"); //注意这里


                    } else {
                        $(this).addClass("hidden"); //注意这里
                    }

                });

            });
        })
    });
}

//init
//搜索相关


//1 查询企业详情
function searchDetailCorp_Action() {
    var corpcn = getQueryVariable('corpcn');
    if (!corpcn) {
        corpcn = 'c1';
    }
    searchDetailCorp(1, corpcn);
}

function searchDetailCorp(pagecurrent, keyword) {
    var boxhdlisthtml = '';
    var TotalPages = 0;
    var TotalCapacity = 0;


    QueryDetailCorp(keyword, pagecurrent)
        .then(function (response) {
            if (response != null) {
                var json = JSON.parse(response);
                if (json.State == false) {
                    alert(decodeMessage(json.Message));
                } else {
                    TotalPages = json.TotalPages;
                    TotalCapacity = json.TotalCapacity;

                    /* console.log('json.Data------>',json.Data);*/
                    var htmlstr = '';
                    var data = json.Data;
                    var corp_addressstr = '';
                    var corp_businessstr = '';//decodeMessage(data.corp_business);
                    var corp_namestr = '';//data.corp_name;
                    var corp_creditcodestr = '';//data.corp_creditcode;
                    var corp_industrymainstr = '';//data.corp_industrymain;
                    var corp_regn_namestr = '';//data.corp_regn_name;
                    var corp_linkmanstr = '';//data.corp_linkman;
                    var corp_telstr = '';//data.corp_tel;
                    var corp_webstr = '';//data.corp_web;
                    var corp_tnstr = data.corp_tn;
                    var corp_ind_namestr = '';//data.corp_ind_name;
                    var corp_summarystr = '';//decodeMessage(data.corp_summary);
                    var corp_emailstr = '';//decodeMessage(data.corp_email);
                    var corp_headurlstr = '';
                    var corp_citystr = data.corp_city;
                    var corp_countrystr = '';//data.corp_country;
                    var corp_postcodestr = '';
                    var corp_regcapitalstr = '';
                    var corp_estabdatestr = '';
                    if (typeof (data.corp_estabdate) != "undefined") {
                        corp_estabdatestr = data.corp_estabdate;
                        corp_estabdatestr = corp_estabdatestr.replace(/\//g, "-")
                    }

                    if (typeof (data.corp_city) != "undefined") {
                        corp_citystr = data.corp_city;
                    }

                    if (typeof (data.corp_country) != "undefined") {
                        corp_countrystr = data.corp_country;
                    }
                    if (typeof (data.corp_postcode) != "undefined") {
                        corp_postcodestr = data.corp_postcode;
                    }

                    if (typeof (data.corp_regcapital) != "undefined") {
                        corp_regcapitalstr = data.corp_regcapital;
                        corp_regcapitalstr = corp_regcapitalstr + '万';
                    }

                    if (typeof (data.corp_address) != "undefined") {
                        corp_addressstr = data.corp_address;
                    }
                    if (typeof (data.corp_business) != "undefined") {
                        corp_businessstr = decodeMessage(data.corp_business);
                    }
                    if (typeof (data.corp_name) != "undefined") {
                        corp_namestr = data.corp_name;
                    }
                    if (typeof (data.corp_creditcode) != "undefined") {
                        corp_creditcodestr = data.corp_creditcode;
                    }
                    if (typeof (data.corp_industrymain) != "undefined") {
                        corp_industrymainstr = data.corp_industrymain;
                    }
                    if (typeof (data.corp_regn_name) != "undefined") {
                        corp_regn_namestr = data.corp_regn_name;
                    }
                    if (typeof (data.corp_linkman) != "undefined") {
                        corp_linkmanstr = data.corp_linkman;
                    }
                    if (typeof (data.corp_tel) != "undefined") {
                        corp_telstr = data.corp_tel;
                    }
                    if (typeof (data.corp_web) != "undefined") {
                        corp_webstr = decodeMessage(data.corp_web);
                    }
                    if (typeof (data.corp_ind_name) != "undefined") {
                        corp_ind_namestr = data.corp_ind_name;
                    }
                    if (typeof (data.corp_summary) != "undefined") {
                        corp_summarystr = decodeMessage(data.corp_summary);

                    }
                    if (typeof (data.corp_email) != "undefined") {
                        corp_emailstr = decodeMessage(data.corp_email);

                    }


                    //var intostr=corp_summarystr.substring(0,150);
                    if (typeof (data.corp_headurl) != "undefined") {
                        corp_headurlstr = decodeMessage(data.corp_headurl)
                    }
                    var corp_legalstr = data.corp_legal;
                    corp_summarystr = corp_summarystr.replace(/\n/g, "<br/>");
                    var corp_summaryarray = [];
                    var intostr = '';
                    corp_summaryarray = corp_summarystr.split("<br/>");
                    if (corp_summaryarray.length > 0) {
                        intostr = corp_summaryarray[0];
                    } else {
                        intostr = corp_summarystr.substring(0, 150);
                    }
                    // console.log('corptd_corp_postcode'+corp_summarystr);

                    $("#corptd_corp_contry").html(corp_countrystr);
                    $("#corptd_corp_place").html(corp_citystr);

                    $("#corptd_corp_addresss").html(corp_addressstr);
                    $("#corptd_corp_business").html(corp_businessstr);

                    $("#corptd_corp_creditcode").html(corp_creditcodestr);
                    $("#corptd_corp_cn").html(corp_tnstr);
                    $("#corptd_corp_ind_name").html(corp_ind_namestr);

                    $("#corptd_corp_linkman").html(corp_linkmanstr);
                    $("#corptd_corp_corp_tel").html(corp_telstr);
                    $("#corptd_corp_name").html(corp_namestr);
                    $('#corptd_corp_postcode').html(corp_postcodestr);
                    $('#corptd_corp_regcapital').html(corp_regcapitalstr);

                    $("#corptd_corp_summary").html(corp_summarystr);
                    $('#corptd_corp_makedata').html(corp_estabdatestr);
                    //上面的
                    $('#top_corp_place').html(corp_citystr);

                    $('#top_corp_legal').html(corp_legalstr);
                    $('#top_corp_tel').html(corp_telstr);
                    //$('#top_corp_mail').html(corp_emailstr);
                    $('#top_corp_web').html(corp_webstr);

                    $('#top_corp_address').html(corp_addressstr);
                    intostr = '<span>简介</span>：' + intostr;
                    $('#top_corp_intro').html(intostr);
                    var imgstr = '';
                    if (typeof (corp_headurlstr) == "undefined" || corp_headurlstr == '') {
                        imgstr = '<img src="./image/ad_001.jpg" alt="">'
                    } else {
                        imgstr = '<img src="' + corp_headurlstr + '" alt="">'
                    }
                    $("#top_corp_headImg").html(imgstr);


                }
            }
        })
        .catch(function (err) {
            console.log(err)
        });
}


function SearchCorpPagelistdatabyindex(pagecurrent, currenttotalPage, currenttotalRecords, keyword) {

    //console.log('Search请求keyword------>',keyword);

    var totalPage = currenttotalPage;//5;
    var totalRecords = currenttotalRecords;// 390;
    var pagehref = window.location.href;
    var pageNo = $("#curpage").val();
    //console.log('curpage pageNo '+pageNo);
    // var pageNo=getQueryVariable('pno');
    // if (!pageNo)
    //  {
    //    pageNo = 1;
    // }


    var totalRecordsstr = '' + totalRecords + '';
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
        click: function (n) {
            $("#curpage").val(n);
            this.selectPage(n);

            if (n == 1) {

                var keywordstr = $("#curkeyword").val();
                // console.log('keywordstr-->'+keywordstr);
                SearchCorpPagelistdata(n, keywordstr);

            } else {

                var keywordstr = $("#curkeyword").val();
                // console.log('keywordstr-->'+keywordstr);
                SearchCorpPagelistdata(n, keywordstr);

            }
            return false;

        }
    }, true);
}

//添加重要新闻
function addNews_Action() {
    var title = document.getElementById('id-title').value;
    console.log('   ' + title + '   ' + editor.getHtml());
    var content = editor.getHtml();
    addNew(title, content).then(function (response) {
        // alert('更新完成');
        // window.location.href = '../../web/index.html';
        window.history.back(-1);
    });
}

//模糊查询重要新闻
function queryUnNews_Action() {
    var title = document.getElementById('news_query').value;

    var boxhdlisthtml = '';
    var TotalPages = 0;
    var TotalCapacity = 0;

    QueryUnItemNews_api(title)
        .then(function (response) {

            if (response != null) {
                var json = JSON.parse(response);
                if (json.code == 0) {
                    TotalPages = json.totalPages;
                    TotalCapacity = json.totalCapacity;
                    var htmlstr = '';

                    var htmlHead = ''
                        + '<table class="table" cellspacing="0" cellpadding="0" width="100%" align="center" border="0">'
                        + '<tr>'
                        + '<th width="30"><input type="checkbox" id="all" onclick="javascript:selectOrClearAllCheckbox(this);" />'
                        + '</th>'
                        + '<th>编号</th>'
                        + '<th>标题</th>'

                        + '<th>类型</th>'
                        + '<th>更新时间</th>'
                        + '<th>操作</th>'
                        + '</tr>';

                    var htmlTail = ''
                        + '</table>';

                    for (var item of json.data) {

                        htmlstr = ''
                            + '<tr >'
                            + '<td ><input type="checkbox" name="IDCheck" value="' + item.id + '" class="acb" /></td>'
                            + '<td >' + item.id + '</td>'
                            + '<td >' + item.title + '</td>'

                            + '<td >时事</td>'
                            + '<td >' + item.dt + '</td>'
                            + '<td >'
                            + '<a href="./plug/editor/news_important.html?id=' + item.id + '" class="edit">编辑 </a>'
                            + '<a href="javascript:delItemNews_Action(' + item.id + ');">删除</a>'
                            + '</td>'
                            + '</tr>'


                        boxhdlisthtml += htmlstr;

                    }
                    if (TotalPages > 0) {

                        // $("#targetTable tr").last().after(boxhdlisthtml);



                        $(".ui_tb").html(htmlHead + boxhdlisthtml + htmlTail);

                        //设置全部页数
                        SearchDetailProductbyindex(TotalPages, TotalCapacity);
                    }

                }
            } else {
                alert(decodeMessage(json.Message));

            }
        })
        .catch(function (err) {
            console.log(err)
        });












}
//批量删除重要新闻
function batchDel_Action(ids) {
    console.log(ids);
    batchDelItemNewsApi(ids)
        .then(function (response) {
            if (response != null) {
                window.location.reload();
            }
        });

}


//删除 重要新闻
function delItemNews_Action(id) {
    if (confirm("您确定要删除吗？")) {
        delItemNews(parseInt(id));
    }
}
function delItemNews(id) {
    delItemNewsApi(id)
        .then(function (response) {
            if (response != null) {
                window.location.reload();
            }
        });

}
//更新重要新闻内容
function updateDetailNews_Action() {
    var title = document.getElementById('id-title').value;
    var hideid = document.getElementById('id-hide').value;
    console.log(hideid + '   ' + title + '   ' + editor.getHtml());
    var content = editor.getHtml();
    updateDetailNew(parseInt(hideid), title, content).then(function (response) {
        // alert('更新完成');
        // window.location.href = '../../web/index.html';
        window.history.back(-1);
    });
}


//2-------重要新闻明细
function searchDetailNews_Action() {
    console.log('--------------------------');
    var id = getQueryVariable('id');
    console.log(id);
    searchDetailNewData(parseInt(id))
    // console.log(id);
}

function searchDetailNewData(id) {
    var boxhdlisthtml = '';
    var title = '';
    queryDetailNew(id).then(function (response) {
        if (response != null) {
            var json = JSON.parse(response);
            var htmlstr = '';

            if (json.code == 0) {
                for (var item of json.data) {
                    htmlstr = item.content;
                    title = item.title;
                    boxhdlisthtml += htmlstr;
                }

                console.log(json);
                //保存 编码id
                $("#id-hide").val(id);
                $("#id-title").val(title);

                // if (editor.isDisabled()) editor.enable()
                // if (!editor.isFocused()) editor.focus()

                // editor.select([])
                // editor.deleteFragment()

                // E.SlateTransforms.setNodes(editor, { type: 'paragraph' }, { mode: 'highest' })
                // editor.dangerouslyInsertHtml(boxhdlisthtml);

                $(".contentdiv").append(boxhdlisthtml);
            }
        } else {
            alert(decodeMessage(json.Message));

        }

    })
}
function queryimgdata(){
    var boxhdhtml = '';
    QueryArticleList().then(function (response) {
        if (response != null) {
            var json = JSON.parse(response);
            if (json.State == false) { alert(decodeMessage(json.Message)); }
            else {
                console.log(json.data);
                for (var item of json.data) {
                    boxhdhtml += '<li style="position: absolute; width: 370px; left: 0px; top: 0px;display: none;">'
                        + '<div class="imgDiv"><a href="../news_important.html?id='+ item.id+ '">'
                        + '<img src="'+ item.img+ '" width="370px" height="282px"></a></div>'
                        + '<div class="box"><div class="name">'
                        + '<a href="../news_important.html?id=' + item.id + '">' + item.title + '</a></div>'
                        + '<div class="time">'  + item.dt.substring(0, 10) + '</div>'
                        + '</div>'
                        + '</li>';

                }
                $(".tabcontenthd").append(boxhdhtml)//往hd里面插入数据
                $(".indexNewsPic").slide({
                    titCell: ".btnDiv",
                    mainCell: "ul",
                    autoPage: true,
                    effect: "fold",
                    autoPlay: true
                });
                // console.log(json.Data);
                //app.HomeNewsList=json.Data;
            }
        }
    })
        .catch(function (err) {
            console.log(err)
        });
}

// function searchItemNews_Action_more(){
//     searchItemNewlistdata_(1);
// }

//1 查询新闻服务详情
function searchItemNews_Action() {
    console.log('-------------------------');
    searchItemNewlistdata(1);
}


//分页查询列表
function searchItemNewlistdata(pagecurrent) {
    var boxhdlisthtml = '';
    var TotalPages = 0;
    var TotalCapacity = 0;

    QueryItemNews(pagecurrent)
        .then(function (response) {

            if (response != null) {
                var json = JSON.parse(response);
                if (json.code == 0) {
                    TotalPages = json.totalPages;
                    TotalCapacity = json.totalCapacity;

                    for (var item of json.data) {
                        boxhdlisthtml += '<li>'
                            + '<a href="../news_important.html?id=' + item.id + '"><img src="./images/nimg22_1.png">'
                            // + '<a href="../plug/editor/11.html"><img src="./images/nimg22_1.png">'
                            + item.title
                            + '<span class="fr">'
                            + item.dt.substring(0, 10)
                            + '</span>'
                            + '</a>'
                            + '</li>';

                    }

                    boxhdlisthtml += '<li><span class="sy_more fr"><a href="newslist.html">MORE</a></span>'
                    boxhdlisthtml += '</li>'
                    $(".tabcontenthdlist").append(boxhdlisthtml);//往hd里面插入数据
                    // $(".contenthdlist_newslist_frame").append(boxhdlisthtml);//往hd里面插入数据

                    
                }
            } else {
                alert(decodeMessage(json.Message));

            }
        })
        .catch(function (err) {
            console.log(err)
        });
}


// //分页查询列表
// function searchItemNewlistdata_(pagecurrent) {
//     var boxhdlisthtml = '';
//     var TotalPages = 0;
//     var TotalCapacity = 0;

//     QueryItemNews(pagecurrent)
//         .then(function (response) {

//             if (response != null) {
//                 var json = JSON.parse(response);
//                 if (json.code == 0) {
//                     TotalPages = json.totalPages;
//                     TotalCapacity = json.totalCapacity;
//                     var htmlstr = '';




//                     for (var item of json.data) {
           


//                                          boxhdlisthtml += '<li><a href="'
//                   + 'news.html?art_id='
//                   + item.id
//                   + '" target="_blank">'
//                   + '<div class="leftnews fl">'
//                   + '<h3>' + item.title + '</h3>'
//                   + '<p>' + item.content.substring(0, 40) + '</p>'
//                   + '</div>'
//                   + '<div class="lrightnews fr">'
//                   + '<div class="newsTime" style="display: none;">'
//                   + item.dt
//                   + '</div>'
//                 //   + '<h3>' + gettimedayinfo(item.dt) + '</h3>'
//                   + '<p>' + item.dt.substring(0, 7)  + '</p>'
//                   + '</div>'
//                   + '<div class="clear"></div>'
//                   + '</a></li>';



//                     }

//                     // boxhdlisthtml += '<li><span class="sy_more fr"><a href="newslist.html">MORE</a></span>'
//                     // boxhdlisthtml += '</li>'
//                     $(".contenthdlist_newslist_frame").append(boxhdlisthtml);//往hd里面插入数据
//                     if (TotalPages > 0) {

//                         // $("#targetTable tr").last().after(boxhdlisthtml);

//                         /// $(".tabcontenthdlist").append(boxhdlisthtml);

//                         // $(".ui_tb").html(htmlHead + boxhdlisthtml + htmlTail);
// console.log(TotalPages);
// console.log(TotalCapacity);
//                         //设置全部页数
//                         pagebyindex_more(TotalPages, TotalCapacity);
//                     }

//                 }
//             } else {
//                 alert(decodeMessage(json.Message));

//             }
//         })
//         .catch(function (err) {
//             console.log(err)
//         });
// }
// function pagebyindex_more(currenttotalPage, currenttotalRecords) {
//       var totalPage = currenttotalPage;//5;
//       var totalRecords = currenttotalRecords;// 390;
//       console.log('totalPage111.............->' + currenttotalPage);
//       console.log('totalRecords->' + totalRecords);
//       var pageNo = getQueryVariable('pindex');
//       if (!pageNo) {
//         pageNo = 1;

//       }

//       kkpager.generPageHtml({
//         pno: pageNo,
//         pagerid: 'kkpager_more',
//         total: totalPage,

//         totalRecords: totalRecords,
//         mode: 'click',//默认值是link，可选link或者click
//         click: function (n) {
//           this.selectPage(n);

//           if (n == 1) {
//             console.log(n);
//             querynewspagelistdata(n);

//           } else {
//             console.log(n);
//             querynewspagelistdata(n);

//           }
//           return false;
//         }
//       });
//     }

function SearchDetailProductbyindex(currenttotalPage, currenttotalRecords) {

    var totalPage = currenttotalPage;//5;
    var totalRecords = currenttotalRecords;// 390;
    var pagehref = window.location.href;
    var pageNo = $("#curpage").val();

    var totalRecordsstr = '' + totalRecords + '';

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
        click: function (n) {
            $("#curpage").val(n);

            this.selectPage(n);

            if (n == 1) {

                searchItemNewlistdata(n);

            } else {
                searchItemNewlistdata(n);

            }
            return false;

        }
    }, true);


}


function searchDetailPics_Action() {
    var corpcn = getQueryVariable('corpcn');
    if (!corpcn) {
        corpcn = 'c1';
    }

    searchDetailPicslist(1, corpcn);
}

//分页查询列表
function searchDetailPicslist(pagecurrent, keyword) {
    var boxhdlisthtml = '';
    var TotalPages = 0;
    var TotalCapacity = 0;

    QueryDetailPics(keyword, pagecurrent)
        .then(function (response) {
            if (response != null) {
                var json = JSON.parse(response);
                if (json.State == false) {
                    alert(decodeMessage(json.Message));
                } else {
                    TotalPages = json.TotalPages;
                    TotalCapacity = json.TotalCapacity;
                    //console.log(TotalPages);
                    var htmlstr = '';

                    for (var item of json.Data) {

                        var file_linkstr = '';//标题
                        var file_orignamestr = '';//文件名
                        var file_server_mapstr = '';
                        var fullimgstr = '';//
                        var serverstr = 'http://218.246.23.195/NewUpload/'
                        if (typeof (item.file_origname) != "undefined") {
                            file_orignamestr = item.file_origname;
                        }
                        if (typeof (item.file_server_map) != "undefined") {
                            file_server_mapstr = item.file_server_map;
                        }
                        if (typeof (item.file_link) != "undefined") {
                            file_linkstr = item.file_link;
                        }
                        fullimgstr = serverstr + file_server_mapstr + '/' + file_linkstr;
                        //console.log(fullimgstr);


                        var htmlstr = ''
                            + '<div class="cover">'
                            + '<div class="covertop">'
                            + '<a href="' + fullimgstr + '">'
                            + '<img src="' + fullimgstr + '" alt="" class="detailcoverimg">'
                            + '</a></div>'
                            + '<div class="coverbottom">'
                            + '<span>' + file_orignamestr + '</span>'
                            + '</div></div>';

                        boxhdlisthtml += htmlstr;


                    }

                    if (boxhdlisthtml != "") {
                        console.log(boxhdlisthtml);
                        // $('.kkpage_inqinfo').attr('id','kkpager');
                        $(".contpic-box").html(boxhdlisthtml);
                        // $(".continfo-product").removeClass("hidden");

                        //searchDetailPicslistData(pagecurrent,TotalPages,TotalCapacity,keyword);
                    } else {
                        // $('.continfo-product').addClass("hidden");
                        // $('.tab-panel').addClass("hidden");

                    }

                }
            }
        })
        .catch(function (err) {
            console.log(err)
        });
}


function searchDetailPicslistData(pagecurrent, currenttotalPage, currenttotalRecords, keyword) {

    //console.log('Search请求keyword------>',keyword);

    var totalPage = currenttotalPage;//5;
    var totalRecords = currenttotalRecords;// 390;
    var pagehref = window.location.href;
    var pageNo = $("#curpage").val();


    var totalRecordsstr = '' + totalRecords + '';
    // $(".content-header-span1").html('当前生态圈共有');
    // $(".content-header-span").html(totalRecordsstr);
    // $(".content-header-span2").html('家企业');


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
        click: function (n) {
            $("#curpage").val(n);
            this.selectPage(n);

            if (n == 1) {

                var keywordstr = $("#curkeyword").val();
                // console.log('keywordstr-->'+keywordstr);
                searchDetailBloglist(n, keywordstr);

            } else {

                var keywordstr = $("#curkeyword").val();
                // console.log('keywordstr-->'+keywordstr);
                searchDetailBloglist(n, keywordstr);

            }
            return false;

        }
    }, true);


}

//3企业博客

function searchDetailBlog_Action() {
    var corpcn = getQueryVariable('corpcn');
    if (!corpcn) {
        corpcn = 'c1';
    }

    searchDetailBloglist(1, corpcn);
}

//分页查询列表
function searchDetailBloglist(pagecurrent, keyword) {
    var boxhdlisthtml = '';
    var TotalPages = 0;
    var TotalCapacity = 0;

    QueryDetailBlog(keyword, pagecurrent)
        .then(function (response) {
            if (response != null) {
                var json = JSON.parse(response);
                if (json.State == false) {
                    alert(decodeMessage(json.Message));
                } else {
                    TotalPages = json.TotalPages;
                    TotalCapacity = json.TotalCapacity;

                    var htmlstr = '';

                    for (var item of json.Data) {

                        //console.log(item);
                        var art_titlestr = '';//标题
                        var art_nvar100_20str = '';//公司名称
                        var art_lpicstr = '';
                        var art_summarystr = '';//
                        var art_idstr = '';
                        var art_idstr = '';
                        var corp_cnstr = '';

                        if (typeof (item.art_title) != "undefined") {
                            art_titlestr = item.art_title;
                        }
                        if (typeof (item.art_id) != "undefined") {
                            art_idstr = item.art_id;
                        }

                        if (typeof (item.art_nvar100_20) != "undefined") {
                            art_nvar100_20str = item.art_nvar100_20;
                        }

                        if (typeof (item.art_lpic) != "undefined") {
                            art_lpicstr = item.art_lpic;
                        }
                        if (typeof (item.corp_or_pers_num) != "undefined") {
                            corp_cnstr = item.corp_or_pers_num;
                        }


                        if (typeof (item.art_summary) != "undefined") {
                            //base_nvarmax_1str=item.base_nvarmax_1;
                            art_summarystr = decodeURIComponent(Base64.decode(item.art_summary));
                            art_summarystr = art_summarystr.substring(0, 100);
                        }
                        var arturlstr = 'news.html?art_id=' + art_idstr + '&corp_cn=' + corp_cnstr;
                        var htmlnoimgstr = '';
                        var htmlimgstr = '';
                        if (art_lpicstr != '') {
                            htmlstr = '<div class="aui-blog">'
                                + '<div class="content-blog-top"> '
                                + '<div class="aui-blog-top-left">'
                                + '<div class="aui-blog-top-left-img img_wrap">'
                                + '<img src="' + art_lpicstr + '" class="audi_blogimg"></img>'
                                + '</div></div>'
                                + '<div class="aui-blog-top-right">'
                                + '<div class="aui-blog-title"><a href="' + arturlstr + '" target="_blank">'
                                + art_titlestr
                                + '</a></div><div class="aui-blog-content">'
                                + art_summarystr
                                + '</div><div class="aui-blog-bottom">'
                                + art_nvar100_20str
                                + '</div></div></div></div>';
                            // console.log(htmlimgstr);
                        } else {
                            htmlstr = '<div class="aui-blog">'
                                + '<div class="content-blog-top">'
                                + '<div class="aui-blog-top-fullcontent">'
                                + '<div class="aui-blog-title">'
                                + art_titlestr
                                + '</div>'
                                + '<div class="aui-blog-content">'
                                + art_summarystr
                                + '</div>'
                                + '<div class="aui-blog-bottom">'
                                + art_nvar100_20str
                                + '</div></div>'
                                + '</div></div>'
                            // console.log(htmlstr2);
                        }
                        boxhdlisthtml += htmlstr;
                        //console.log(item);


                    }

                    if (TotalPages > 0) {
                        // $('.kkpage_inqinfo').attr('id','kkpager');
                        $(".contblog-box").html(boxhdlisthtml);
                        // $(".continfo-product").removeClass("hidden");

                        searchDetailBloglistData(pagecurrent, TotalPages, TotalCapacity, keyword);
                    } else {
                        // $('.continfo-product').addClass("hidden");
                        // $('.tab-panel').addClass("hidden");

                    }

                }
            }
        })
        .catch(function (err) {
            console.log(err)
        });
}


function searchDetailBloglistData(pagecurrent, currenttotalPage, currenttotalRecords, keyword) {

    //console.log('Search请求keyword------>',keyword);

    var totalPage = currenttotalPage;//5;
    var totalRecords = currenttotalRecords;// 390;
    var pagehref = window.location.href;
    var pageNo = $("#curpage").val();


    var totalRecordsstr = '' + totalRecords + '';
    // $(".content-header-span1").html('当前生态圈共有');
    // $(".content-header-span").html(totalRecordsstr);
    // $(".content-header-span2").html('家企业');


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
        click: function (n) {
            $("#curpage").val(n);
            this.selectPage(n);

            if (n == 1) {

                var keywordstr = $("#curkeyword").val();
                // console.log('keywordstr-->'+keywordstr);
                searchDetailBloglist(n, keywordstr);

            } else {

                var keywordstr = $("#curkeyword").val();
                // console.log('keywordstr-->'+keywordstr);
                searchDetailBloglist(n, keywordstr);

            }
            return false;

        }
    }, true);


}

//5招聘人员需求

function searchDetailHuman_Action() {
    var corpcn = getQueryVariable('corpcn');
    if (!corpcn) {
        corpcn = 'c1';
    }

    searchDetailHumanlist(1, corpcn);
}

//分页查询列表
function searchDetailHumanlist(pagecurrent, keyword) {
    var boxhdlisthtml = '';
    var TotalPages = 0;
    var TotalCapacity = 0;

    QueryDetailHuman(keyword, pagecurrent)
        .then(function (response) {
            if (response != null) {
                var json = JSON.parse(response);
                if (json.State == false) {
                    alert(decodeMessage(json.Message));
                } else {
                    TotalPages = json.TotalPages;
                    TotalCapacity = json.TotalCapacity;

                    var htmlstr = '';

                    for (var item of json.Data) {
                        var base_namestr = '';//职位名称
                        var base_nvar100_1str = '';//工作地点
                        var base_nvar100_2str = '';//薪资范围
                        var base_nvar100_3str = '';//学历要求

                        var base_nvar100_4str = '';//工作经验
                        var base_nvar100_19str = '';//联系人
                        var base_nvar100_18str = '';//联系电话
                        var base_nvar100_20str = '';//公司名称
                        var make_datestr = '';//发布日期
                        var base_date_1str = '';//截至日期
                        var base_nvarmax_1str = '';//职位说明(需要转码)
                        if (typeof (item.base_name) != "undefined") {
                            base_namestr = item.base_name;
                        }
                        if (typeof (item.base_nvar100_20) != "undefined") {
                            base_nvar100_20str = item.base_nvar100_20;
                        }

                        if (typeof (item.base_nvar100_1) != "undefined") {
                            base_nvar100_1str = item.base_nvar100_1;
                        }
                        if (typeof (item.base_nvar100_2) != "undefined") {
                            base_nvar100_2str = item.base_nvar100_2;
                        }
                        if (typeof (item.base_nvar100_3) != "undefined") {
                            base_nvar100_3str = item.base_nvar100_3;
                        }

                        if (typeof (item.base_nvar100_4) != "undefined") {
                            base_nvar100_4str = item.base_nvar100_4;
                        }
                        if (typeof (item.base_nvar100_19) != "undefined") {
                            base_nvar100_19str = item.base_nvar100_19;
                        }
                        if (typeof (item.base_nvar100_18) != "undefined") {
                            base_nvar100_18str = item.base_nvar100_18;
                        }

                        if (typeof (item.make_date) != "undefined") {
                            make_datestr = item.make_date;
                            var strs = new Array(); //定义一数组
                            strs = make_datestr.split(" "); //字符分割
                            make_datestr = strs[0];
                            make_datestr = make_datestr.replace(/\//g, "-")

                        }
                        if (typeof (item.base_date_1) != "undefined") {
                            base_date_1str = item.base_date_1;
                            // var strs= new Array(); //定义一数组
                            // strs=make_datestr.split(" "); //字符分割
                            //  make_datestr=strs[0];
                            base_date_1str = base_date_1str.replace(/\//g, "-")

                        }
                        if (typeof (item.base_nvarmax_1) != "undefined") {
                            //base_nvarmax_1str=item.base_nvarmax_1;
                            base_nvarmax_1str = decodeURIComponent(Base64.decode(item.base_nvarmax_1));
                        }


                        htmlstr = ''
                            + '<table class="content-table">'
                            + '<tr class="contenttr-top">'
                            + '<td class="lefttd1 righttdh bottomtdh">职位名称： </td>'
                            + '<td  class="lefttd2 righttdh bottomtdh">' + base_namestr + '</td>'
                            + '<td  class="lefttd1 righttdh bottomtdh">企业名称： </td>'
                            + '<td class="lefttd2 bottomtdh">' + base_nvar100_20str + '</td>'
                            + '</tr><tr class="contenttr-top">'
                            + '<td class="lefttd1 righttdh bottomtdh">工作地点： </td>'
                            + '<td  class="lefttd2 righttdh bottomtdh">' + base_nvar100_1str + '</td>'
                            + '<td  class="lefttd1 righttdh bottomtdh">薪资范围：</td>'
                            + '<td class="lefttd2 bottomtdh">' + base_nvar100_2str + '</td>'
                            + '</tr><tr class="contenttr-top">'
                            + '<td class="lefttd1 righttdh bottomtdh">学历要求：  </td>'
                            + '<td  class="lefttd2 righttdh bottomtdh">' + base_nvar100_3str + '</td>'
                            + '<td  class="lefttd1 righttdh bottomtdh">工作经验：  </td>'
                            + '<td class="lefttd2 bottomtdh">' + base_nvar100_4str + '</td>'
                            + '</tr>'
                            + '<tr class="contenttr">'
                            + '<td class="lefttd1A righttdh bottomtdh">职位要求： </td>'
                            + '<td  class="lefttd2A bottomtdh" colspan="3">' + base_nvarmax_1str + '</td>'
                            + '</tr><tr class="contenttr-top">'
                            + '<td class="lefttd1 righttdh bottomtdh">发布日期： </td>'
                            + '<td  class="lefttd2 righttdh bottomtdh">' + make_datestr + '</td>'
                            + '<td  class="lefttd1 righttdh bottomtdh">截止时间：        </td>'
                            + '<td class="lefttd2 bottomtdh">' + base_date_1str + '</td>'
                            + '</tr>'
                            + '<tr class="contenttr-top">'
                            + '<td class="lefttd1 righttdh ">联系人： </td>'
                            + '<td  class="lefttd2 righttdh ">' + base_nvar100_19str + '</td>'
                            + '<td  class="lefttd1 righttdh ">联系电话：  </td>'
                            + '<td class="lefttd2 ">' + base_nvar100_18str + '</td>'
                            + '</tr></table>';
                        // console.log(htmlstr);
                        boxhdlisthtml += htmlstr;

                    }

                    if (TotalPages > 0) {
                        // $('.kkpage_inqinfo').attr('id','kkpager');
                        $(".conthuman-box").html(boxhdlisthtml);
                        $(".continfo-human").removeClass("hidden");
                        //设置全部页数
                        searchDetailHumanlistData(pagecurrent, TotalPages, TotalCapacity, keyword);
                    } else {
                        $('.continfo-human').addClass("hidden");
                        // $('.tab-panel').addClass("hidden");

                    }

                }
            }
        })
        .catch(function (err) {
            console.log(err)
        });
}


function searchDetailHumanlistData(pagecurrent, currenttotalPage, currenttotalRecords, keyword) {

    //console.log('Search请求keyword------>',keyword);

    var totalPage = currenttotalPage;//5;
    var totalRecords = currenttotalRecords;// 390;
    var pagehref = window.location.href;
    var pageNo = $("#curpage").val();


    var totalRecordsstr = '' + totalRecords + '';
    // $(".content-header-span1").html('当前生态圈共有');
    // $(".content-header-span").html(totalRecordsstr);
    // $(".content-header-span2").html('家企业');


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
        click: function (n) {
            $("#curpage").val(n);
            this.selectPage(n);

            if (n == 1) {

                var keywordstr = $("#curkeyword").val();
                // console.log('keywordstr-->'+keywordstr);
                searchDetailHumanlist(n, keywordstr);

            } else {

                var keywordstr = $("#curkeyword").val();
                // console.log('keywordstr-->'+keywordstr);
                searchDetailHumanlist(n, keywordstr);

            }
            return false;

        }
    }, true);
}

function getDaysBetween(dateString1, dateString2) {
    var startDate = Date.parse(dateString1);
    var endDate = Date.parse(dateString2);
    var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
    // alert(days);
    return days;
}

//----6需求信息----
function searchDetailRqInfo_Action() {
    var corpcn = getQueryVariable('corpcn');
    if (!corpcn) {
        corpcn = 'c1';
    }
    searchDetailRqInfolistdata(1, corpcn);
}

//分页查询列表
function searchDetailRqInfolistdata(pagecurrent, keyword) {
    var boxhdlisthtml = '';
    var TotalPages = 0;
    var TotalCapacity = 0;

    QueryDetailRQInfo(keyword, pagecurrent)
        .then(function (response) {
            if (response != null) {
                var json = JSON.parse(response);
                if (json.State == false) {
                    alert(decodeMessage(json.Message));
                } else {
                    TotalPages = json.TotalPages;
                    TotalCapacity = json.TotalCapacity;

                    var htmlstr = '';
                    //console.log('1111'+json.Data);
                    for (var item of json.Data) {
                        // console.log(item);
                        var base_namestr = '';//名称
                        var base_nvar100_1str = '';//期望地区
                        var base_nvar100_20str = '';//发布企业
                        var base_nvar100_19str = '';//联系人
                        var base_nvar100_18str = '';//联系电话
                        var base_nvar100_17str = '';//位置
                        var make_datestr = '';//发布日期
                        var base_date_1str = '';//截至日期
                        var base_nvarmax_1str = '';//职位说明(需要转码)
                        var daybetweenstr = '';
                        if (typeof (item.base_name) != "undefined") {
                            base_namestr = item.base_name;
                        }
                        if (typeof (item.base_nvar100_1) != "undefined") {
                            base_nvar100_1str = item.base_nvar100_1;
                        }
                        if (typeof (item.base_nvar100_20) != "undefined") {
                            base_nvar100_20str = item.base_nvar100_20;
                        }

                        if (typeof (item.base_nvar100_19) != "undefined") {
                            base_nvar100_19str = item.base_nvar100_19;
                        }
                        if (typeof (item.base_nvar100_18) != "undefined") {
                            base_nvar100_18str = item.base_nvar100_18;
                        }
                        if (typeof (item.base_nvar100_17) != "undefined") {
                            base_nvar100_17str = item.base_nvar100_17;
                        }

                        if (typeof (item.make_date) != "undefined") {
                            make_datestr = item.make_date;
                            var strs = new Array(); //定义一数组
                            strs = make_datestr.split(" "); //字符分割
                            make_datestr = strs[0];
                            make_datestr = make_datestr.replace(/\//g, "-")

                        }
                        if (typeof (item.base_date_1) != "undefined") {
                            base_date_1str = item.base_date_1;
                        }
                        if (typeof (item.base_nvarmax_1) != "undefined") {
                            //base_nvarmax_1str=item.base_nvarmax_1;
                            base_nvarmax_1str = decodeURIComponent(Base64.decode(item.base_nvarmax_1));
                        }

                        daybetweenstr = getDaysBetween(make_datestr, base_date_1str);
                        //console.log(daybetweenstr+'->11');


                        var htmlstr = ''
                            + '<table class="content-table">'
                            + '<tr class="contenttr-top">'
                            + '<td class="lefttd1 righttdh bottomtdh">'
                            + '<img src="./image/icon_rqinfo1.png" class="tbleftimg"/>'
                            + '<span class="tbleftspan">需求标题：</span></td>'
                            + '<td  class="lefttd2 righttdh bottomtdh">' + base_namestr + '</td>'
                            + '<td  class="lefttd1 righttdh bottomtdh">'
                            + '<img src="./image/icon_rqplace.png" class="tbleftimg"/>'
                            + '<span class="tbleftspan">期望地区： </span> </td>'
                            + '<td class="lefttd2 bottomtdh">' + base_nvar100_1str + '</td></tr>'
                            + '<tr class="contenttr">'
                            + '<td class="lefttd1A righttdh bottomtdh">'
                            + '<img src="./image/icon_rqcommand.png" class="tbleftimg"/>'
                            + '<span class="tbleftspan">需求说明： </span> </td>'
                            + '<td  class="lefttd2A bottomtdh" colspan="3"> ' + base_nvarmax_1str + '</td></tr>'
                            + '<tr class="contenttr-top">'
                            + '<td class="lefttd1 righttdh bottomtdh">'
                            + '<img src="./image/icon_rqinfo1.png" class="tbleftimg"/>'
                            + '<span class="tbleftspan">发布日期：  </span> </td>'
                            + '<td  class="lefttd2 righttdh bottomtdh">' + make_datestr + '</td>'
                            + '<td  class="lefttd1 righttdh bottomtdh">'
                            + '<img src="./image/icon_rqinfo1.png" class="tbleftimg"/>'
                            + '<span class="tbleftspan">截止时间：    </span> </td>'
                            + '<td class="lefttd2 bottomtdh">' + base_date_1str + '</td></tr>'
                            + '<tr class="contenttr-top">'
                            + '<td class="lefttd1 righttdh ">'
                            + '<img src="./image/icon_rqtime.png" class="tbleftimg"/>'
                            + '<span class="tbleftspan">剩余天数：    </span> </td>'
                            + '<td  class="lefttd2 righttdh ">' + daybetweenstr + '</td>'
                            + '<td  class="lefttd1 righttdh ">'
                            + '<img src="./image/icon_rqplace.png" class="tbleftimg"/>'
                            + '<span class="tbleftspan">我的位置：  </span> </td>'
                            + '<td class="lefttd2 ">' + base_nvar100_17str + '</td>'
                            + '</tr></table>';


                        boxhdlisthtml += htmlstr;

                    }
                    //console.log('boxhdlisthtml='+boxhdlisthtml);
                    if (boxhdlisthtml != '') {
                        // $('.kkpage_inqinfo').attr('id','kkpager');
                        $(".continqinfo-box").html(boxhdlisthtml);
                        $(".continfo-rqinfo").removeClass("hidden");
                        //设置全部页数
                        SearchDetailRqInfobyindex(pagecurrent, TotalPages, TotalCapacity, keyword);
                    } else {
                        $(".continfo-rqinfo").addClass("hidden");
                        // $('.continfo-product').addClass("hidden");
                        // $('.tab-panel').addClass("hidden");

                    }

                }
            }
        })
        .catch(function (err) {
            console.log(err)
        });
}


function SearchDetailRqInfobyindex(pagecurrent, currenttotalPage, currenttotalRecords, keyword) {

    //console.log('Search请求keyword------>',keyword);

    var totalPage = currenttotalPage;//5;
    var totalRecords = currenttotalRecords;// 390;
    var pagehref = window.location.href;
    var pageNo = $("#curpage").val();


    var totalRecordsstr = '' + totalRecords + '';
    // $(".content-header-span1").html('当前生态圈共有');
    // $(".content-header-span").html(totalRecordsstr);
    // $(".content-header-span2").html('家企业');


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
        click: function (n) {
            $("#curpage").val(n);
            this.selectPage(n);

            if (n == 1) {

                var keywordstr = $("#curkeyword").val();
                // console.log('keywordstr-->'+keywordstr);
                searchItemNewlistdata(n, keywordstr);

            } else {

                var keywordstr = $("#curkeyword").val();
                // console.log('keywordstr-->'+keywordstr);
                searchItemNewlistdata(n, keywordstr);

            }
            return false;

        }
    }, true);


}

//----
function pagebyindex(currenttotalPage, currenttotalRecords) {
    var totalPage = currenttotalPage;//5;
    var totalRecords = currenttotalRecords;// 390;
    //console.log('totalPage->'+totalPage);
    console.log('totalRecords->' + totalRecords);
    var pageNo = getQueryVariable('pindex');
    //var pageNo = getParameter('pno');
    if (!pageNo) {
        pageNo = 1;

    }


    kkpager.generPageHtml({
        pno: pageNo,

        total: totalPage,

        totalRecords: totalRecords,
        mode: 'click',//默认值是link，可选link或者click
        click: function (n) {
            this.selectPage(n);

            if (n == 1) {
                console.log(n);
                querynewspagelistdata(n);

            } else {
                console.log(n);
                querynewspagelistdata(n);

            }
            return false;
        }
    });
}


//分页查询新闻列表
function querynewspagelistdata(pagecurrent) {
    var boxhdlisthtml = '';
    var TotalPages = 0;
    var TotalCapacity = 0;
    //var pagecurrent=1;
    QueryArticlePageList_Code('001', pagecurrent)
        .then(function (response) {
            if (response != null) {
                var json = JSON.parse(response);
                if (json.State == false) {
                    alert(decodeMessage(json.Message));
                } else {
                    TotalPages = json.TotalPages;
                    TotalCapacity = json.TotalCapacity;
                    console.log('PageCurrent' + json.PageCurrent);
                    console.log('TotalCapacity' + TotalCapacity);
                    //console.log(json.PageSize);
                    console.log('json.Data' + json.Data);
                    console.log(json.TotalPages);
                    var htmlstr = '';

                    for (var item of json.Data) {
                        //contentstr.substring(0,40)
                        var contentstr = '';
                        //decodeURIComponent(Base64.decode(item.art_content));
                        //var summarystr = decodeURIComponent(Base64.decode(item.art_summary));
                        //var summarystr='123';
                        if (typeof (item.art_summary) == "undefined") {
                            contentstr = decodeURIComponent(Base64.decode(item.art_content));
                        } else {
                            contentstr = decodeURIComponent(Base64.decode(item.art_summary));
                        }
                        //console.log('contentstr->'+contentstr);//base64解码正常
                        //console.log('summarystr原始->'+item.art_summary);//这里可以输出
                        //console.log('summarystr->'+summarystr);//base64解码出现问题
                        htmlstr = '<li><a href="'
                            + 'news.html?art_id='
                            + item.art_id
                            + '" target="_blank">'

                            + '<div class="leftimgnews fl">'
                            + '<img src="'
                            + item.art_lpic
                            + '" width="250px" height="120px"/></div>'

                            + '<div class="leftnews fl">'
                            + '<p>' + item.art_time.substring(0, 10) + '</p>'
                            + '<h3>' + item.art_title + '</h3>'
                            + '<p>' + contentstr.substring(0, 100) + '</p>'

                            //+'<p>'+item.kind_name+'</p>'
                            + '<div class="rightnews fr">'
                            + '<p class="news-tags-group"><a class="news-tag" href="#">'
                            + '<span class="spanname">' + item.kind_name + '</span></a></p>'
                            + '</div>'
                            + '</div>'
                            + '<div class="clear"></div>'
                            + '</a></li>';

                        console.log('htmlstr->' + htmlstr);
                        boxhdlisthtml += htmlstr;

                    }

                    //$(".contenthdlist").append(boxhdlisthtml);//往hd里面插入数据
                    $(".contenthdlist").html(boxhdlisthtml);
                    console.log(TotalPages);
                    console.log(TotalCapacity);
                    pagebyindex(TotalPages, TotalCapacity);
                }
            }
        })
        .catch(function (err) {
            console.log(err)
        });
}


function pagebyindexByCode(currenttotalPage, currenttotalRecords, tb_code) {
    var totalPage = currenttotalPage;//5;
    var totalRecords = currenttotalRecords;// 390;
    //console.log('totalPage->'+totalPage);
    console.log('总页数->' + totalRecords);
    var pageNo = getQueryVariable('pindex');
    //var pageNo = getParameter('pno');
    if (!pageNo) {
        pageNo = 1;

    }


    var totalRecordsstr = '全部文章 ' + totalRecords;
    $(".tabspan").html(totalRecordsstr);

    kkpager.generPageHtml({
        pno: pageNo,

        total: totalPage,

        totalRecords: totalRecords,
        mode: 'click',//默认值是link，可选link或者click
        click: function (n) {
            this.selectPage(n);

            if (n == 1) {
                console.log(n);
                querynewspagelistdataByCode(n, tb_code);

            } else {
                console.log(n);
                querynewspagelistdataByCode(n, tb_code);

            }
            return false;
        }
    });

}

function clickdataByCode(tb_code) {
    console.log('点击' + tb_code);
    if (tb_code == '00101') {
        $(".tabalist1").click();
    } else if (tb_code == '00102') {
        $(".tabalist2").click();
    } else if (tb_code == '00103') {
        $(".tabalist3").click();
    } else if (tb_code == '00104') {
        $(".tabalist4").click();
    } else if (tb_code == '00105') {
        $(".tabalist5").click();
    }

    //querynewspagelistdataByCode(1,tb_code);
}

//分页查询新闻列表
function querynewspagelistdataByCode(pagecurrent, tb_code) {
    var boxhdlisthtml = '';
    var TotalPages = 0;
    var TotalCapacity = 0;

    var queryVar = '001';

    QueryArticlePageList_Code(tb_code, pagecurrent)
        .then(function (response) {
            if (response != null) {
                var json = JSON.parse(response);
                if (json.State == false) {
                    alert(decodeMessage(json.Message));
                } else {
                    TotalPages = json.TotalPages;
                    TotalCapacity = json.TotalCapacity;
                    console.log('PageCurrent' + json.PageCurrent);
                    console.log('TotalCapacity' + TotalCapacity);
                    //console.log(json.PageSize);
                    //console.log('json.Data'+json.Data);
                    console.log(json.TotalPages);
                    var htmlstr = '';

                    for (var item of json.Data) {
                        //contentstr.substring(0,40)
                        var contentstr = '';
                        //decodeURIComponent(Base64.decode(item.art_content));
                        //var summarystr = decodeURIComponent(Base64.decode(item.art_summary));
                        //var summarystr='123';
                        if (typeof (item.art_summary) == "undefined") {
                            contentstr = decodeURIComponent(Base64.decode(item.art_content));
                        } else {
                            contentstr = decodeURIComponent(Base64.decode(item.art_summary));
                        }

                        htmlstr = '<li><a href="'
                            + 'news.html?art_id='
                            + item.art_id
                            + '" target="_blank">'

                            + '<div class="leftimgnews fl">'
                            + '<img src="'
                            + item.art_lpic
                            + '" width="250px" height="120px"/></div>'

                            + '<div class="leftnews fl">'
                            + '<p>' + item.art_time.substring(0, 10) + '</p>'
                            + '<h3>' + item.art_title + '</h3>'
                            + '<p>' + contentstr.substring(0, 100) + '</p>'

                            //+'<p>'+item.kind_name+'</p>'
                            + '<div class="rightnews fr">'
                            + '<p class="news-tags-group"><a class="news-tag" href="javascript:clickdataByCode(\''
                            + item.kind_code + '\')"'
                            + '><span class="spanname">' + item.kind_name + '</span></a></p>'
                            + '</div>'
                            + '</div>'
                            + '<div class="clear"></div>'
                            + '</a></li>';

                        //console.log('htmlstr->'+htmlstr);
                        boxhdlisthtml += htmlstr;

                    }

                    //$(".contenthdlist").append(boxhdlisthtml);//往hd里面插入数据
                    console.log('tb_code=' + tb_code);

                    $(".contenthdlist").html(boxhdlisthtml);

                    pagebyindexByCode(TotalPages, TotalCapacity, tb_code);


                }
            }
        })
        .catch(function (err) {
            console.log(err)
        });
}
