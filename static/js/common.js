$(document).ready(function(){
    var header=$('header');
    var headerHeight=header.outerHeight();
    var subHieght;
    var gnb=header.find(".gnb>li");
    var nav=$('header .gnb');
    var trigger=$('.trigger');
    var  winWidth;
    var lang=$('.right_menu .lang');
    var fam=$('.right_menu .fam');
    var subMenu=$('header .sub_con');


function activate(Elem){
    gnb.removeClass('active');
    Elem.addClass('active');
}
function inactivate(Elem){
    Elem.removeClass('active');
}
/* header */
/* pc 일때 메뉴 */
nav.on('mouseenter focusin',function(){
    if(winWidth>1221){
    subHieght=$(".gnb .sub_con").outerHeight();
    var total=headerHeight+subHieght;
    header.stop().animate({height:total+'px'},200)
    }
})
.on('mouseleave focusout', function(){
    if(winWidth>1221){
        header.stop().animate({height:headerHeight+'px'},200)
    }
})
gnb.on('mouseenter focusin',function(){
    if(winWidth>1221){
        activate($('header'));
        fam.add(lang).addClass('over');
        // subMenu.hide();
        $(this).find(".sub_con").show();
       }

})
.on('mouseleave focousout',function(){
    if(winWidth>1221){
        inactivate(header)
        fam.add(lang).removeClass('over');
        subMenu.hide();
    }
})
fam.add(lang).on('focusin',function(){
    inactivate(header)
        fam.add(lang).removeClass('over');
        subMenu.hide();;
   
})


/* 모바일 버전 메뉴 */
$('.gnb>li>a').click(function(){
    if(winWidth<1220){
            if($(this).hasClass('on')){
                subMenu.stop().slideUp(function(){
                    $('.gnb>li>a').removeClass('on');
                });
            }else{
                $('.gnb>li>a').removeClass('on');
                $(this).addClass('on');
                subMenu.stop().slideUp();
                $(this).parent('li').find('.sub_con').stop().slideDown();
            }
        

    }
    
})
$('.right_menu h2').click(function(e){
    e.preventDefault();
    $(this).parent().toggleClass('active');
    $(this).parent().find('.list').stop().slideToggle();
})
fam.add(lang).on('mouseleave',function(){
    $(this).removeClass('active');
    $(this).find('.list').stop().slideUp();
})



trigger.click(function(){
   if(winWidth<=1220){
    $(this).add(nav).add('.right_menu').toggleClass('on');  
    if(!$(this).hasClass('on')){
        subMenu.stop().slideUp(100)
        $('.gnb>li>a').removeClass('on');
        $('body').removeClass("hidden");
    }else{
        $('body').addClass("hidden");
    }
   }else{
       //pc
       $(this).toggleClass('on');  
       if((nav).add('.right_menu').hasClass("on")){
        (nav).add('.right_menu').removeClass("on");
       }
       if(!$(this).hasClass('on')){
        $('body').removeClass("hidden");
       }else{
        $('body').addClass("hidden");
       }
       if(!$('.pc_trigger_menu').hasClass("open")){
        $('.pc_trigger_menu').addClass('open').removeClass('close');
       }else{
        $('.pc_trigger_menu').addClass('close').removeClass('open');
       }
  
   
   }

})


  $(".goTopBtn").click(function(){
    $("html, body").stop().animate({scrollTop:0})
})
})//end