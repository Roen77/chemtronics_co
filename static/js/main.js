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
                        //   console.log(currentHeight);
                        $(this).attr('data-index',totalHeight);
                    })
                    sections.css({height:allHeight+'px'});
                 
                }//setslide

                //pc에서 마우스휠 사용할 때 애니메이션
                function pcOffset(){
                    section.each(function(i,v){
                        console.log(currentindex === i)
                        var aniElem= $(this).find(".animate");
                        if(currentindex === i){
                            if(!aniElem.hasClass('motion')){
                                aniElem.addClass("motion")
                            }
                        }
                    })
                }
                function sectionTab(){
                    section.each(function(){
                        $(this).on('focusin',function(){
                            var aniElem= $(this).find(".animate");
                            if(!aniElem.hasClass('motion')){
                                aniElem.addClass("motion")
                            }
                        })
                    })
                }
            
                

                function moveslide(index){
                    console.log('move')
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
                    sections.css(
                        {transform:'translate3d(0,'+(-sectionTop)+'px'+',0)',
                             });

                             $('.navi_btns>li').removeClass('active');
                             $('.navi_btns>li').eq(currentindex).addClass("active");
                    pcOffset();
                    numCount();
                }

        
                $('.navi_btns>li').click(function(){
                    var index=$(this).index();
                    moveslide(index);
                    $('.navi_btns>li').removeClass('active');
                    $(this).addClass("active");
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
            sectionTab();
            // moveslide(currentindex);      

        };
    }

    function init(){
        winWidth=$(window).width();
        if(winWidth<1240){
            console.log('모바일')
            wrap.removeClass('pc');
            sections.removeAttr("style");
            section.removeAttr("data-index");    
            if(winWidth<800){
                section.each(function(){
                    $(this).find(".animate").removeClass('animate');
                })
              }     
        }else{
            console.log('pc');
            wrap.addClass('pc');
            section.removeAttr("style");
            $('.navi_btns>li').eq(0).addClass("active");
                if($('.main_page').length>0){
                    fullpage();
                }
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
    /* pc 일때 메뉴 */
    nav.on('mouseenter focusin',function(){
        if(winWidth>1221){
        subHieght=$(".gnb .sub_con").outerHeight();
        var total=headerHeight+subHieght;
        header.animate({height:total+'px'},200)
        }
    })
    .on('mouseleave focusout', function(){
        if(winWidth>1221){
            header.stop().animate({height:headerHeight+'px'},200,function(){
                header.removeAttr('style')
            })}
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
                subMenu.hide();;
        }
    })
    fam.add(lang).on('focusin',function(){
        inactivate(header)
            fam.add(lang).removeClass('over');
                subMenu.hide();;       
    })


    /* 모바일 버전 메뉴 */
    $('.gnb>li>a').click(function(e){
        if(winWidth<1220){
            e.preventDefault();
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
    if($('.sub_pg').length>0){
        $('.sub_menu_list h3').on('click',function(e){
            e.preventDefault();
            e.stopPropagation();
            if($(this).hasClass("over")){
                $(this).removeClass("over").next('ul').stop().slideUp();
            }else{
                $(this).addClass("over").next('ul').stop().slideToggle();
                $(this).parent("div").siblings().find("h3").removeClass("over").next('ul').slideUp();
            }
        })
        $('.wrap').on('click',function(){
            $('.sub_menu_list h3').removeClass("over");
            $('.sub_menu_list h3').next('ul').slideUp(function(){
                excuted=false;
            });
            if(winWidth<1024){
                $(".sub_con_list>h3").removeClass("on").next('ul').hide();
                $(".sub_con_list>h3").next('ul').removeAttr("style")
            }
        })

        //서브페이지 1024px 이하 서브 메뉴 수정
            $(".sub_con_list>h3").click(function(e){
                e.preventDefault();
                e.stopPropagation();
                if($(this).hasClass("on")){
                    $(this).removeClass("on").next("ul").stop().slideUp(function(){
                        $(this).removeAttr('style')
                    });
                }else{
                    $(this).addClass("on").next("ul").stop().slideDown();
                }
            })
        //서브페이지 셀렉트 메뉴
        $( "#category" ).selectmenu();

    }//sub
    //서브페이지 스크롤시 헤더 고정
    function ElemFix(){
        if(winOffset > $('.sub_pg .content').offset().top){
            $(".header").addClass("fix");
        }else{
            $(".header").removeClass('fix');
        }

        if(winOffset>0){
            $(".sub_goTopBtn").addClass('fix');
        }else{
            $(".sub_goTopBtn").removeClass('fix');
        }
    }

  

    
    var pageUrl=window.location.href;
    var activeMenu;
    gnb.add($(".sub_gnb>li")).add($(".sub_con_list li")).add(".tabs>li").each(function(){
        var $this=$(this);
        var subUrl= $this.find('a').attr('href');
        var blankLink=pageUrl.indexOf('#'); 
        var activeUrl=pageUrl.indexOf(subUrl);
            if(activeUrl>-1 && blankLink == -1){
                activeMenu=$this;
                activeMenu.addClass('over')
            }  
    })   
    var topUrl=["COMPANY","BUSINESS","IR","PR","HR","MANAGE"];
    topUrl.forEach(function(v,i){
        if(pageUrl.indexOf(v)>-1){
            var gnbOver=gnb.eq(i);
            var subOver=$(".sub_gnb>li").eq(i);
           if(!gnbOver.hasClass("over")){
               gnbOver.addClass("over");
           }
           if(!subOver.hasClass("over")){
              subOver.addClass("over");
           }
        }
    
    })
 

        

    

    if($('.main_page').length>0){
         /*banner 슬라이드 */
    var loading=$('.banner .loading>li');
    var playBtn=$('.banner .play-btn>a');
    var swiper = new Swiper('.banner .swiper-container', {
        speed: 1000,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
          },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
        slidesPerView:'auto',
        loop:true,
        loopedSlides:'4',
        pagination: {
          el: '.pager',
          type: 'fraction',
        },
        navigation: {
          nextEl: '.banner .arrows .next',
          prevEl: '.banner .arrows .prev',
        },
        // breakpoints: {
        //     1240: {
        //       slidesPerView: 1,
        //       fadeEffect: {
        //         crossFade: true
        //       },
        //     },
        // },
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
      playBtn.on('click focus',function(e){
          e.preventDefault();
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
      //golbal 슬라이드
      var globalSwiper = new Swiper('.global_slide', {
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        slidesPerView:'1',
        loop:true,
        loopedSlides:4,
        
      });
      //public 슬라이드
      var publicBtn=$(".public .controls .play-btn");
      var publicSwiper = new Swiper('.swiper-container.news_slides', {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          slidesPerView:1.5,
          spaceBetween: 20,
        autoHeight:true,
        loop:true,
        pagination: {
            el: '.public .pager',
            type: 'fraction',
          },
          navigation: {
            nextEl: '.public .arrows .next',
            prevEl: '.public .arrows .prev',
          },
          breakpoints: {
            1330: {
                slidesPerView: 3.5,
                spaceBetween: 50,
            },
            1000: {
                slidesPerView:3,
                spaceBetween: 20,
            },
            800: {
                slidesPerView:2,
                spaceBetween: 20,
            },
            600: {
                slidesPerView:3,
                spaceBetween: 20,
            },
            480: {
                slidesPerView:1.5,
                spaceBetween: 20,
            },


          }
       
      });

      
      publicBtn.on('click focus',function(e){
        e.preventDefault();
      $(this).toggleClass('on');
      var publiIcon=$(this).find('i');
      if($(this).hasClass('on')){
          publicSwiper.autoplay.stop();
          publiIcon.attr('class','fas fa-play');
      }else{
          console.log('시작');
          publicSwiper.autoplay.start();
          publiIcon.attr('class','fas fa-pause');
      }
    })


    }//index
      //메뉴 리사이즈될때 메뉴 수정
      function MenuResize(){
        // nav.removeClass('on');
          if(winWidth>1220){
            $('.pc_trigger_menu').removeClass('open');
            trigger.add(lang).add(fam).removeClass("on");
            $(this).add(nav).add('.right_menu').removeClass('on'); 
            $('body').removeClass('hidden');
          }
          if(winWidth>1000){
            subMenu.hide();
            $('.gnb>li>a').removeClass('on');
            subMenu.removeAttr('style')
          }
          //800px 이하일때는 애니메이션 주지 않음
          if(winWidth<800){
            section.each(function(){
                $(this).find(".animate").removeClass('animate');
            })
          }
          
      }
      function mobileHeight(){
             var sec=$('.section.header');
             sec.css({height:$(window).height()+'px'});
             console.log('높이수정');
             console.log('aaaaaa')
      }

        //infrom  숫자 애니메이션
        var numCountState=false;
    function numCount(){
        var count=$('.animate.count');
        if($('.inform .animate').hasClass("motion")){
            if(!numCountState){
                count.each(function(){
                    var target=$(this);
                    var targetNum=target.attr('data-rate')
                    $({rate:0}).animate({rate:targetNum},{
                        duration:1200,
                        progress:function(){
                            var now=this.rate;
                            var nowText=Math.ceil(now);
                            if(target.hasClass('number')){
                                var numnowText=nowText.toLocaleString();
                                target.text(numnowText);
                            }else{
                                target.text(nowText);
                            }
                            
                        }
                    })
                })
            }
            numCountState=true;
            console.log('numCount')
        }

        }
    
      
      //모바일에서(800px 이상 1240px 이하) 스크롤될때 애니메이션
      var winOffset;
      var sectionOffset;
      var aniMotion;
      function mobileOffset(Elem){
          if(Elem.length>0){
            sectionOffset=Elem.offset().top-$(window).outerHeight()*0.6;
            aniMotion=Elem.find('.animate');
    
            if(sectionOffset<winOffset){
                if(!aniMotion.hasClass("motion")){
                    aniMotion.addClass("motion")
                }
            }
          }
 
      }

      function Motion(){
       if(winWidth>800){
            mobileOffset($('.global'))
            mobileOffset($('.inform'))
            mobileOffset($('.public'))
            mobileOffset($('.who'))
            numCount();
        }else{
            return
        }
      }
    
      $(".goTopBtn, .sub_goTopBtn").click(function(e){
          e.preventDefault();
          $("html, body").stop().animate({scrollTop:0})
      })
       
    
    $(window).on('resize',function(){
        MenuResize();
        init();
    
    })
    $(window).scroll(function(){
        winOffset=$(window).scrollTop();
        Motion();
        console.log($('.sub').length);
        if($('.sub_pg').length>0){
            ElemFix();
        }
    })
    
    init();

    if(winWidth<1240){
        mobileHeight();
    }





    

})//end
