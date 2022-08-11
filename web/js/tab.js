jQuery(document).ready(function($) {
  $(".indexNews li").hover(function(){
    $(this).find("p").stop().animate({"marginLeft":"5px"})
  },function(){
    $(this).find("p").stop().animate({"marginLeft":"0"})
  });
});

jQuery(document).ready(function($) {
  $(".m4_1_3").hover(function(){
    $(".m4_1_q0").stop().animate({"marginTop":"-238px"})
  },function(){
    $(".m4_1_q0").stop().animate({"marginTop":"0"})
  })

  $(".m4_1_4").hover(function(){
    $(".m4_1_w0").stop().animate({"marginTop":"-238px"})
  },function(){
    $(".m4_1_w0").stop().animate({"marginTop":"0"})
  })

});


$(document).ready(function() {

  $("#menu2 li").children("a.vic1").wrapInner('<span class="out"></span>');
  $("#menu2 li").children("a.vic1").each(function() {
    $('<span class="over">' + $(this).text() + '</span>').appendTo(this);
  });

  $("#menu2 li").hover(function() {
    $(".out", this).stop().animate({
      'top': '60px'
    }, 300); // move down - hide
    $(".over", this).stop().animate({
      'top': '0px'
    }, 300); // move down - show

  }, function() {
    $(".out", this).stop().animate({
      'top': '0px'
    }, 300); // move up - show
    $(".over", this).stop().animate({
      'top': '-60px'
    }, 300); // move up - hide
  });

})

$(document).ready(function() {
  $(".menu ul li").hover(function(){
    $(this).find(".hide1").stop().slideToggle(500);
  })
})

$(document).ready(function() {
  $(".bot_ko").click(function(){
    var victor=$(".main3").offset().top - $(window).scrollTop();
    var kop=victor-70
    $('html,body').animate({
        'scrollTop': kop
    },600);
  });
})

$(document).ready(function() {
	/*
	var columnUrl= window.location.href;
	$(".ny_2 ul li a").each(function(index, element) {
		var navUrl=$(this).attr("href");
	
		if(columnUrl.indexOf(navUrl)>=0){
			$(this).parent("li").addClass("victor").siblings().removeClass("victor");
		}
	});
  $(".cx_hide dl dd a").each(function(index, element) {
    var navUrl=$(this).attr("href");
    if(columnUrl.indexOf(navUrl)>=0){
      $(this).parent().parent().parent().parent("li").addClass("victor").siblings().removeClass("victor");
    }
  });
  */
})

// jQuery(document).ready(function($) {
// var ddf=$(".ny_text").height();
// var kl=ddf - 550;
//   $(".ny_4").css("min-height",kl);
// });

jQuery(document).ready(function($) {
  $(".news_ul ul li").hover(function(){
    $(this).find(".leftnews").stop().animate({"marginLeft":"20px"},800)
  },function(){
    $(this).find(".leftnews").stop().animate({"marginLeft":0},800)
  })
});

jQuery(document).ready(function($) {
  $(".ny_dh a").eq(1).attr("href","javascript:void(0)");
});

jQuery(document).ready(function($) {
  $(".cy_ul ul li").hover(function(){
    $(this).find(".jtcy_2").stop().animate({"top":"-50px"},600)
  },function(){
    $(this).find(".jtcy_2").stop().animate({"top":"255px"},600)
  })
});

jQuery(document).ready(function($) {
  $(".bjcx ul li").hover(function(){
    $(this).find(".bjcx_2").stop().animate({"top":"0","line-height":"237px"},300)
  },function(){
    $(this).find(".bjcx_2").stop().animate({"top":"193px","line-height":"30px"},300)
  })
});

jQuery(document).ready(function($) {
  $(".news_cen_1").find("p").each(function() {
    var sl=$(this).attr("style");
    if (sl == "text-align:center;") {
      $(this).remove();
    }
  });
});

jQuery(document).ready(function($) {
  $(".kpo_top").click(function(){
      $('html,body').animate({
          'scrollTop': 0
      });
  });
});
/*833px*/
/*106px*/
jQuery(document).ready(function($) {
  var currentLi = $(".indexTypes ul li");
  $(currentLi.eq(3)).stop().animate({
    "width": "802px"
  }, 600);
  $(currentLi.eq(0)).children(".con").animate({
    "left": "75px"
  }, 600);
  $(currentLi).hover(function(e) {
    $(this).siblings("li").stop().animate({
      "width": "75px"
    }, 600);
    $(this).siblings("li").removeClass("current");
    $(this).addClass("current");
    $(this).stop().animate({
      "width": "802px"
    }, 600);
  });
});

jQuery(document).ready(function($) {
  $(".jj_hhp").click(function(){
    $(".jj_hide").stop().slideToggle();
  })
});

jQuery(document).ready(function($) {
  $(".show_hide").click(function(){
    $(this).find(".cx_hide").slideToggle();
  })
  $(".show_hide").click(function(){
    $(this).addClass("victor").siblings().removeClass("victor");
  })
});
