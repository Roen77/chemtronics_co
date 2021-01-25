$(document).ready(function(){
    var header=$('header');
    var headerHeight=header.outerHeight();
    var subHieght;
    var gnb=header.find(".gnb>li");
    var nav=$('header .gnb');
    var trigger=$('.trigger');
    var Timer;
    //pc일때 풀페이지 구현
    var sections=$('.main');
    var  winWidth;
    var wrap=$('.wrap');
    var section=$('.section');
    var lang=$('.right_menu .lang');
    var fam=$('.right_menu .fam');
    var subMenu=$('header .sub_con');
    function fullpage(){
            if(wrap.hasClass('pc')){
                var currentindex=0;
                var sectionLen=section.length;
        
                function setslide(){
                    var prevHeight=0;
                    var totalHeight=0;
                    var currentHeight=0;
                    var allHeight=0;
                    section.each(function(index){
                        currentHeight=$(this).outerHeight();
                        allHeight +=currentHeight;
                        prevHeight+=currentHeight;
                        totalHeight=currentHeight+prevHeight-currentHeight*2;
                        if(currentHeight != $(window).height()){
                            totalHeight=currentHeight+prevHeight-currentHeight*2-($(window).height()-currentHeight);
                          }
                          console.log(currentHeight);
                        $(this).attr('data-index',totalHeight);
                    })
                    sections.css({height:allHeight+'px'});
                 
                }//setslide
        
                function moveslide(index){
                    if($('body').hasClass('hidden')) return;
                    currentindex=index;
                    if(currentindex <0){
                        currentindex=0;
                        return
                    }
                    if(currentindex >=sectionLen){
                        currentindex=sectionLen-1;
                        return
                    }
                    var sectionTop=section.eq(currentindex).attr('data-index');
                    console.log(currentindex);
                    sections.css(
                        {transform:'translate3d(0,'+(-sectionTop)+'px'+',0)',
                             });
                }
        
                $('.nav-btn>li').click(function(){
                    var index=$(this).index();
                    moveslide(index);
                })
        
                var wheellstate=false;
                $('.section').on('mousewheel',function(e){
                    console.log('마우스확인');
                    var delta; 
                    if (e.originalEvent.detail) {
                        delta = e.originalEvent.detail;
                    }
                    else if (e.originalEvent.wheelDelta) {
                        delta = e.originalEvent.wheelDelta;
                    }
                    else {
                        delta = e.originalEvent.deltaY;
                        delta = -delta;
                    }
            
                    if (delta >= 0 && $('.pc').length>0) {
                        if(!wheellstate){
                        // if(currentindex<0) return;
                        moveslide(currentindex-1)
                        }
                        wheellstate=setTimeout(function(){
                            wheellstate=false;
                        },700)
                } else if (delta < 0 && $('.pc').length>0) {
                    if(!wheellstate){
                        // if(currentindex>sectionLen-1) return;
                    moveslide(currentindex+1)
                        }
                        wheellstate=setTimeout(function(){
                            wheellstate=false;
                        },700)           
                }
                })
            setslide();  
            moveslide(currentindex);      

        };
    }

    function init(){
        winWidth=$(window).width();
        var winHeight=$(window).height();
        if(winWidth<1240){
            console.log('모바일')
            wrap.removeClass('pc');
            sections.removeAttr("style");
            section.removeAttr("data-index");         
        }else{
            console.log('pc');
            wrap.addClass('pc');
            section.removeAttr("style");
            fullpage();
        }
    }

    function activate(Elem){
        gnb.removeClass('active');
        Elem.addClass('active');
    }
    function inactivate(Elem){
        Elem.removeClass('active');
    }
    /* header */
    gnb.on('mouseenter focusin',function(){
        if(winWidth>1221){
            clearTimeout(Timer);
            activate($('header'));
            fam.add(lang).addClass('over');
            subHieght=$(".gnb .sub_con").outerHeight();
            var total=headerHeight+subHieght;
            subMenu.hide();
            header.stop().animate({height:total+'px'},200)
            $(this).find(".sub_con").show();
           }

    })
    .on('mouseleave focusout',function(){
        if(winWidth>1221){
            inactivate(header)
            fam.add(lang).removeClass('over');
            header.stop().animate({height:headerHeight+'px'},200)
            Timer=setTimeout(function(){
                subMenu.hide();
            },200)
           }
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

    




    /*banner 슬라이드 */
    var loading=$('.banner .loading>li');
    var playBtn=$('.banner .play-btn>a');
    var swiper = new Swiper('.banner .swiper-container', {
        speed: 1300,
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
        slidesPerView:'1',
        loop:true,
        loopedSlides:1,
        pagination: {
          el: '.pager',
          type: 'fraction',
        },
        navigation: {
          nextEl: '.arrows .next',
          prevEl: '.arrows .prev',
        },
        on: {
            init: function () {
                loading.eq(0).addClass('active');
            },
        }
      })

      swiper.on('slideChange', function() {
          var index=swiper.realIndex;
          loading.removeClass('active');
          loading.eq(index).addClass('active');
      });
      
      

      loading.on('click focus',function(){
          var index=$(this).index();
          swiper.slideTo(index+1);
          console.log(swiper.realIndex);
          $(this).addClass('active').siblings('li').removeClass('active');
      })
      playBtn.on('click focus',function(){
        $(this).toggleClass('on');
        var icon=$(this).find('i');
        if($(this).hasClass('on')){
            swiper.autoplay.stop();
            icon.attr('class','fas fa-play');
        }else{
            console.log('시작');
            swiper.autoplay.start();
            icon.attr('class','fas fa-pause');
        }
      })
      //메뉴 리사이즈될때 메뉴 수정
      function MenuResize(){
        nav.removeClass('on');
        $('.gnb>li>a').removeClass('on');
        subMenu.hide();
        subMenu.removeAttr('style')
          if(winWidth<=1220){
            $('.pc_trigger_menu').removeClass('open');
            trigger.add(lang).add(fam).removeClass("on");
            $(this).add(nav).add('.right_menu').removeClass('on'); 
          }
      }
      function mobileHeight(){
             var sec=$('section');
             sec.css({height:$(window).height()+'px'});
             console.log('높이수정');
      }
    
   
      
    
    $(window).on('resize',function(){
        MenuResize();
        init();
    })

    init();
    
    if(winWidth<1240){
        mobileHeight();
    }


})//end
