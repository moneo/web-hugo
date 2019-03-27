jQuery(document).ready(function($){
  var $window = $(window);
  var $body = $('body');
  var $header = $('header');
  var $document = $(document);
  var lastScrollTop = 0;
  var headerHeight = $('header').css('height');
  var page = $('.hero').attr('id');

  // Watch window scroll for detect header need to be fixed.
  $window
    .scroll(function(){
      var $scrollTop = $window.scrollTop();
      if($scrollTop >= 90) {
        if ( page === 'home' )
          $('.hero').css({'margin-top': headerHeight});
        $body.addClass('fixed-header');
      } else if ($scrollTop < 10){
        $body.removeClass('fixed-header');
        if ( page === 'home' )
          $('.hero').css({'margin-top':'0'});
      }

      var items = [1,3,5];
      var item = items[Math.floor(Math.random()*items.length)];

      if ($scrollTop > lastScrollTop) { // down scroll
        var position = '-=' + item + 'px';
      } else { // up scroll
        var position = '+=' + item + 'px';
      }
      lastScrollTop = $scrollTop;

      $('.dot').each(function() {
        $(this).css({'top': position});
      });

    })
    .trigger('scroll')
  ;

  $document
    .on('click', '.tab .tab-header li', function (e) {
      var $this = $(this);
      var $tab = $this.closest('.tab');

      $([document.documentElement, document.body]).animate({
        scrollTop: $("#tab-content").offset().top
      }, 500);

      $('.tab-content .active, .tab-header .active', $tab).removeClass();

      $this.addClass('active');

      var $nextTab = $('.tab-content article', $tab).eq($this.index());
      $nextTab.addClass('active');
    //   $('.tab-content').css('height', $nextTab.height()+'px');
    })
  ;

  // Career load open positions
  function addPosition(positionName, location, url) {
      var positionDiv = '<a href="' + url + '" target="_blank">';
      positionDiv += '<p class="title">' + positionName + '</p>';
      positionDiv += '<p class="location">' + location + '</p></a>';
      $('#open-positions').append(positionDiv);
  }

  var request = $.ajax({ method: 'GET', url: 'https://api.kodilan.com/companies/moneo/posts' });
  request.done(function( response ) {
      $('#open-positions').html('');
      for (var i in response.data) {
          var post = response.data[i];
          addPosition(post.position, post.location, post.post_url);
      }
  });

  // Event slider
  if($('section.event').length === 1){
    var $eventCarousel = $('.event-list');
    var $eventContainer = $('section.event .container-root');
    var $listNavigation = $('section.event .list-navigation');

    $eventCarousel
      .owlCarousel({
        mergeFit: false,
        responsive : {
          // breakpoint from 0 up
          0 : {
            items: 1,
            margin: 15
          },
          // breakpoint from 1000 up
          768 : {
            items: 2,
            margin: 15
          },
          // breakpoint from 1000 up
          1400 : {
            items: 3,
            margin: 30
          },
          // breakpoint from 1920 up
          1920 : {
            items: 4,
            margin: 30
          }
        },
        onInitialized : function () {
          if(this.settings.items > 2){
            $('.owl-item.active:eq('+(this.settings.items-1)+')', this.element).addClass('active-last');
          }

          if(this.settings.items > 1){
            $('.owl-stage', this.element).css('transform', 'translate3d('+$eventContainer.offset().left+'px, 0px, 0px)');
          }
        },
        onTranslate : function (event) {
          $('.owl-item', this.element)
            .removeClass('active-last')
          ;

          if(event.item.index === 0){
            $('.owl-stage', this.element).css('left', $eventContainer.offset().left+'px');
            $('.prev', $listNavigation).addClass('disabled');
          } else if(event.page.index + 1 === event.page.count) {
            $('.next', $listNavigation).addClass('disabled');
          } else {
            $('.prev, .next', $listNavigation).removeClass('disabled');
          }

          if(event.item.index > 0){
            $('.owl-stage', this.element).css('left', '');
          }
        },
        onTranslated : function (event) {
          if(this.settings.items > 2 && event.item.index === 0){
            $('.owl-item.active:eq('+(this.settings.items-1)+')', this.element).addClass('active-last');
          }
        },
        onResized : function (event) {
          if(this.settings.items > 1 && event.item.index === 0){
            $('.owl-stage', this.element).css('left', $eventContainer.offset().left + 'px');
          }
        }
      })
    ;

    $('section.event .list-navigation .prev, section.event .list-navigation .next')
      .click(function (e) {
        e.preventDefault();

        var $btn = $(this);

        if($btn.hasClass('disabled')){
          return;
        }

        if($btn.hasClass('prev')){
          $eventCarousel.trigger('prev.owl.carousel');
        }

        if($btn.hasClass('next')){
          $eventCarousel.trigger('next.owl.carousel');
        }
      })
    ;
  }

  // Dot generator
  var $dotContainer = $('.hero .dots');
  if($dotContainer.length > 0){
    $('.dot',$dotContainer)
      .each(function (index) {
        var $this = $(this);
        var delay = Math.random() * (1000 - (index * 100)) + (index * 100);

        $this.css('transition-delay', delay + 'ms');

        setTimeout(
          function () {
            $this.css('transition-delay','');
          },
          delay + 50
        );
      })
      .css('opacity', 1)
    ;
  }

  // Watch nav-button click for mobile hamburger menu
  $('.nav-button').click(function(){
    $('nav.mobile-nav', $header).toggleClass('mobile-open');
    $('.logo').toggleClass('white-logo');
    $(this).toggleClass('opened-nav-button');
  });

  $('.mobile-link a').click(function(){
    window.location.href = $(this).attr('href');
  });

  // When on mobile submenu clicks will be toggle nav's open state
  $('nav.mobile-nav .has-submenu', $header).click(function(){
    if($window.width() < 970){
      $(this).toggleClass('open');
    }
  });

  if ( $('#centered-promo')[0] ) {
      document.getElementById("centered-promo").scrollIntoView();
      $('.promo').find('.boxes').css({ 'padding-right': '40px' });
  }

  var dataText = [
    "We build for everyone.",
    "We build for everywhere.",
    "We build for the future."
  ];

  var dataDesc = [
    "You choose the audience, we build the app and make sure it grows happily ever after.",
    "You ideate, validate and prototype. Let us build, measure and publish it on fluffly clouds.",
    "Today’s tech, tomorrow’s mindset, yesterday’s problems. Challenge accepted!"
  ];

  if ( $('h1.slogan')[0] ) {
      var slogan = document.querySelector('h1.slogan');
      var desc = document.querySelector('p.slogan-desc');
      slogan.innerHTML = dataText[0];
      desc.innerHTML = dataDesc[0];

      function typeWriter(text, i, fnCallback) {
        if (i < (text.length)) {
         document.querySelector("h1.slogan").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
          setTimeout(function() {
            typeWriter(text, i + 1, fnCallback)
          }, 100);
        }

        else if (typeof fnCallback == 'function') {
          setTimeout(fnCallback, 2000);
        }
      }

        function StartTextAnimation(i) {
            if (typeof dataText[i] == 'undefined'){
                setTimeout(function() {
                    desc.innerHTML = dataDesc[0];
                    StartTextAnimation(0);
                }, 10000);
            }

            if (i < dataText.length) {
                typeWriter(dataText[i], 0, function(){
                    if ( i != (dataText.length - 1))
                        desc.innerHTML = dataDesc[i + 1];
                    StartTextAnimation(i + 1);
                });
            }
        }
      // start the text animation
      StartTextAnimation(0);
  }
});

window.onload = function(){
  crear_select();
}

function isMobileDevice() {
    // return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    return false;
};

var li = new Array();
function crear_select() {
  var div_cont_select = document.querySelectorAll("[data-mate-select='active']");
  var select_ = '';
  for (var e = 0; e < div_cont_select.length; e++) {
    div_cont_select[e].setAttribute('data-indx-select',e);
    div_cont_select[e].setAttribute('data-selec-open','false');
    var ul_cont = document.querySelectorAll("[data-indx-select='"+e+"'] > .cont_list_select_mate > ul");
    select_ = document.querySelectorAll("[data-indx-select='"+e+"'] >select")[0];

    if (isMobileDevice()) {
      select_.addEventListener('change', function () {
        _select_option(select_.selectedIndex,e);
      });
    }

    var select_optiones = select_.options;
    document.querySelectorAll("[data-indx-select='"+e+"']  > .styled-select-text ")[0].setAttribute('data-n-select',e);
    document.querySelectorAll("[data-indx-select='"+e+"']  > .icon_select_mate ")[0].setAttribute('data-n-select',e);
    for (var i = 0; i < select_optiones.length; i++) {
      li[i] = document.createElement('li');
      if (select_optiones[i].selected == true || select_.value == select_optiones[i].innerHTML ) {
        li[i].className = 'active';
        document.querySelector("[data-indx-select='"+e+"']  > .styled-select-text ").innerHTML = select_optiones[i].innerHTML;
      };
      li[i].setAttribute('data-index',i);
      li[i].setAttribute('data-selec-index',e);
      li[i].addEventListener( 'click', function(){  _select_option(this.getAttribute('data-index'),this.getAttribute('data-selec-index')); });
      li[i].innerHTML = select_optiones[i].innerHTML;
      ul_cont[0].appendChild(li[i]);
    };
  };
}

var cont_slc = 0;
function open_select(idx) {
  var idx1 =  idx.getAttribute('data-n-select');
  var ul_cont_li = document.querySelectorAll("[data-indx-select='"+idx1+"'] .cont_select_int > li");
  var hg = 0;
  var slect_open = document.querySelectorAll("[data-indx-select='"+idx1+"']")[0].getAttribute('data-selec-open');
  var slect_element_open = document.querySelectorAll("[data-indx-select='"+idx1+"'] select")[0];

  if (isMobileDevice()) {
    if (window.document.createEvent) { // All
      var evt = window.document.createEvent("MouseEvents");
      evt.initMouseEvent("mousedown", false, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      slect_element_open.dispatchEvent(evt);
    } else if (slect_element_open.fireEvent) { // IE
      slect_element_open.fireEvent("onmousedown");
    } else {
      slect_element_open.click();
    }
  } else {


    for (var i = 0; i < ul_cont_li.length; i++) {
      hg += ul_cont_li[i].offsetHeight;
    };

    if (slect_open == 'false') {
      document.querySelectorAll("[data-indx-select='"+idx1+"']")[0].setAttribute('data-selec-open','true');
      document.querySelectorAll("[data-indx-select='"+idx1+"'] > .cont_list_select_mate > ul")[0].style.height = hg+"px";
      document.querySelectorAll("[data-indx-select='"+idx1+"'] > .icon_select_mate")[0].style.transform = 'rotate(180deg)';
    } else {
      document.querySelectorAll("[data-indx-select='"+idx1+"']")[0].setAttribute('data-selec-open','false');
      document.querySelectorAll("[data-indx-select='"+idx1+"'] > .icon_select_mate")[0].style.transform = 'rotate(0deg)';
      document.querySelectorAll("[data-indx-select='"+idx1+"'] > .cont_list_select_mate > ul")[0].style.height = "0px";
    }
  }
}

function salir_select(indx) {
  var select_ = document.querySelectorAll("[data-indx-select='"+indx+"'] > select")[0];
  document.querySelectorAll("[data-indx-select='"+indx+"'] > .cont_list_select_mate > ul")[0].style.height = "0px";
  document.querySelector("[data-indx-select='"+indx+"'] > .icon_select_mate").style.transform = 'rotate(0deg)';
  document.querySelectorAll("[data-indx-select='"+indx+"']")[0].setAttribute('data-selec-open','false');
}


function _select_option(indx,selc) {
  if (isMobileDevice()) {
    selc = selc -1;
  }

  var select_ = document.querySelectorAll("[data-indx-select='"+selc+"'] > select")[0];
  var li_s = document.querySelectorAll("[data-indx-select='"+selc+"'] .cont_select_int > li");
  var p_act = document.querySelectorAll("[data-indx-select='"+selc+"'] > .styled-select-text")[0].innerHTML = li_s[indx].innerHTML;
  var select_optiones = document.querySelectorAll("[data-indx-select='"+selc+"'] > select > option");
  for (var i = 0; i < li_s.length; i++) {
    if (li_s[i].className == 'active') {
      li_s[i].className = '';
    };
    li_s[indx].className = 'active';
  };

  select_optiones[indx].selected = true;
  select_.selectedIndex = indx;
  select_.onchange();
  salir_select(selc);
}
