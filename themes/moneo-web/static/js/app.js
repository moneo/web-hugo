function isMobileDevice(){return!1}jQuery(document).ready(function(o){var s=o(window),i=o("body"),e=o("header"),t=o(document),a=0,c=o("header").css("height"),r=o(".hero").attr("id");if(s.scroll(function(){var e=s.scrollTop();90<=e?("home"===r&&o(".hero").css({"margin-top":c}),i.addClass("fixed-header")):e<10&&(i.removeClass("fixed-header"),"home"===r&&o(".hero").css({"margin-top":"0"}));var t=[1,3,5],n=t[Math.floor(Math.random()*t.length)];if(a<e)var l="-="+n+"px";else l="+="+n+"px";a=e,o(".dot").each(function(){o(this).css({top:l})})}).trigger("scroll"),t.on("click",".tab .tab-header li",function(e){var t=o(this),n=t.closest(".tab");o([document.documentElement,document.body]).animate({scrollTop:o("#tab-content").offset().top},500),o(".tab-content .active, .tab-header .active",n).removeClass(),t.addClass("active"),o(".tab-content article",n).eq(t.index()).addClass("active")}),o.ajax({method:"GET",url:"https://api.kodilan.com/companies/moneo/posts"}).done(function(e){for(var t in o("#open-positions").html(""),e.data){var n=e.data[t];l=n.position,s=n.location,i=n.post_url,a=void 0,a='<a href="'+i+'" target="_blank">',a+='<p class="title">'+l+"</p>",a+='<p class="location">'+s+"</p></a>",o("#open-positions").append(a)}var l,s,i,a}),1===o("section.event").length){var n=o(".event-list"),l=o("section.event .container-root"),d=o("section.event .list-navigation");n.owlCarousel({mergeFit:!1,responsive:{0:{items:1,margin:15},768:{items:2,margin:15},1400:{items:3,margin:30},1920:{items:4,margin:30}},onInitialized:function(){2<this.settings.items&&o(".owl-item.active:eq("+(this.settings.items-1)+")",this.element).addClass("active-last"),1<this.settings.items&&o(".owl-stage",this.element).css("transform","translate3d("+l.offset().left+"px, 0px, 0px)")},onTranslate:function(e){o(".owl-item",this.element).removeClass("active-last"),0===e.item.index?(o(".owl-stage",this.element).css("left",l.offset().left+"px"),o(".prev",d).addClass("disabled")):e.page.index+1===e.page.count?o(".next",d).addClass("disabled"):o(".prev, .next",d).removeClass("disabled"),0<e.item.index&&o(".owl-stage",this.element).css("left","")},onTranslated:function(e){2<this.settings.items&&0===e.item.index&&o(".owl-item.active:eq("+(this.settings.items-1)+")",this.element).addClass("active-last")},onResized:function(e){1<this.settings.items&&0===e.item.index&&o(".owl-stage",this.element).css("left",l.offset().left+"px")}}),o("section.event .list-navigation .prev, section.event .list-navigation .next").click(function(e){e.preventDefault();var t=o(this);t.hasClass("disabled")||(t.hasClass("prev")&&n.trigger("prev.owl.carousel"),t.hasClass("next")&&n.trigger("next.owl.carousel"))})}var u=o(".hero .dots");0<u.length&&o(".dot",u).each(function(e){var t=o(this),n=Math.random()*(1e3-100*e)+100*e;t.css("transition-delay",n+"ms"),setTimeout(function(){t.css("transition-delay","")},n+50)}).css("opacity",1),o(".nav-button").click(function(){o("nav.mobile-nav",e).toggleClass("mobile-open"),o(".logo").toggleClass("white-logo"),o(this).toggleClass("opened-nav-button")}),o("nav.mobile-nav .has-submenu",e).click(function(){s.width()<970&&o(this).toggleClass("open")});var m=["We build for everyone.","We build for everywhere.","We build for the future."],h=["You choose the audience, we build the app and make sure it grows happily ever after.","You ideate, validate and prototype. Let us build, measure and publish it on fluffly clouds.","Todays tech, tomorrows mindset, yesterdays problems. Challenge accepted!"],v=document.querySelector("h1.slogan"),f=document.querySelector("p.slogan-desc");v.innerHTML=m[0],f.innerHTML=h[0],function e(t){void 0===m[t]&&setTimeout(function(){f.innerHTML=h[0],e(0)},1e4),t<m.length&&function e(t,n,l){n<t.length?(document.querySelector("h1.slogan").innerHTML=t.substring(0,n+1)+'<span aria-hidden="true"></span>',setTimeout(function(){e(t,n+1,l)},100)):"function"==typeof l&&setTimeout(l,2e3)}(m[t],0,function(){t!=m.length-1&&(f.innerHTML=h[t+1]),e(t+1)})}(0)}),window.onload=function(){crear_select()};var li=new Array;function crear_select(){for(var e=document.querySelectorAll("[data-mate-select='active']"),t="",n=0;n<e.length;n++){e[n].setAttribute("data-indx-select",n),e[n].setAttribute("data-selec-open","false");var l=document.querySelectorAll("[data-indx-select='"+n+"'] > .cont_list_select_mate > ul");t=document.querySelectorAll("[data-indx-select='"+n+"'] >select")[0],isMobileDevice()&&t.addEventListener("change",function(){_select_option(t.selectedIndex,n)});var s=t.options;document.querySelectorAll("[data-indx-select='"+n+"']  > .styled-select-text ")[0].setAttribute("data-n-select",n),document.querySelectorAll("[data-indx-select='"+n+"']  > .icon_select_mate ")[0].setAttribute("data-n-select",n);for(var i=0;i<s.length;i++)li[i]=document.createElement("li"),1!=s[i].selected&&t.value!=s[i].innerHTML||(li[i].className="active",document.querySelector("[data-indx-select='"+n+"']  > .styled-select-text ").innerHTML=s[i].innerHTML),li[i].setAttribute("data-index",i),li[i].setAttribute("data-selec-index",n),li[i].addEventListener("click",function(){_select_option(this.getAttribute("data-index"),this.getAttribute("data-selec-index"))}),li[i].innerHTML=s[i].innerHTML,l[0].appendChild(li[i])}}var cont_slc=0;function open_select(e){var t=e.getAttribute("data-n-select"),n=document.querySelectorAll("[data-indx-select='"+t+"'] .cont_select_int > li"),l=0,s=document.querySelectorAll("[data-indx-select='"+t+"']")[0].getAttribute("data-selec-open"),i=document.querySelectorAll("[data-indx-select='"+t+"'] select")[0];if(isMobileDevice())if(window.document.createEvent){var a=window.document.createEvent("MouseEvents");a.initMouseEvent("mousedown",!1,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),i.dispatchEvent(a)}else i.fireEvent?i.fireEvent("onmousedown"):i.click();else{for(var o=0;o<n.length;o++)l+=n[o].offsetHeight;"false"==s?(document.querySelectorAll("[data-indx-select='"+t+"']")[0].setAttribute("data-selec-open","true"),document.querySelectorAll("[data-indx-select='"+t+"'] > .cont_list_select_mate > ul")[0].style.height=l+"px",document.querySelectorAll("[data-indx-select='"+t+"'] > .icon_select_mate")[0].style.transform="rotate(180deg)"):(document.querySelectorAll("[data-indx-select='"+t+"']")[0].setAttribute("data-selec-open","false"),document.querySelectorAll("[data-indx-select='"+t+"'] > .icon_select_mate")[0].style.transform="rotate(0deg)",document.querySelectorAll("[data-indx-select='"+t+"'] > .cont_list_select_mate > ul")[0].style.height="0px")}}function salir_select(e){document.querySelectorAll("[data-indx-select='"+e+"'] > select")[0];document.querySelectorAll("[data-indx-select='"+e+"'] > .cont_list_select_mate > ul")[0].style.height="0px",document.querySelector("[data-indx-select='"+e+"'] > .icon_select_mate").style.transform="rotate(0deg)",document.querySelectorAll("[data-indx-select='"+e+"']")[0].setAttribute("data-selec-open","false")}function _select_option(e,t){isMobileDevice()&&(t-=1);for(var n=document.querySelectorAll("[data-indx-select='"+t+"'] > select")[0],l=document.querySelectorAll("[data-indx-select='"+t+"'] .cont_select_int > li"),s=(document.querySelectorAll("[data-indx-select='"+t+"'] > .styled-select-text")[0].innerHTML=l[e].innerHTML,document.querySelectorAll("[data-indx-select='"+t+"'] > select > option")),i=0;i<l.length;i++)"active"==l[i].className&&(l[i].className=""),l[e].className="active";s[e].selected=!0,n.selectedIndex=e,n.onchange(),salir_select(t)}