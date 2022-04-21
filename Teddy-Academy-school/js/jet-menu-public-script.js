!function(e){"use strict";var t=function(t,n){return this.defaultSettings={enabled:!1,mouseLeaveDelay:500,openSubType:"click",ajaxLoad:!0,megaWidthType:"container",megaWidthSelector:"",mainMenuSelector:".jet-menu",menuItemSelector:".jet-menu-item",moreMenuContent:"&middot;&middot;&middot;"},this.settings=e.extend(this.defaultSettings,n),this.$window=e(window),this.$document=e(document),this.$element=e(t),this.$instance=e(this.settings.mainMenuSelector,this.$element).addClass("jet-responsive-menu"),this.$menuItems=e(">"+this.settings.menuItemSelector,this.$instance).addClass("jet-responsive-menu-item"),this.$moreItemsInstance=null,this.hiddenItemsArray=[],this.createMenuInstance(),this.$instance.trigger("jetMenuCreated"),this};t.prototype={constructor:t,self:this,createMenuInstance:function(){var t=this;this.subMenuRebuild(),this.subMegaMenuRebuild(),!n.isEmpty(this.settings.moreMenuContent)&&t.settings.enabled&&(t.$instance.append('<li class="jet-menu-item jet-menu-item-has-children jet-simple-menu-item jet-responsive-menu-available-items" hidden><a href="#" class="top-level-link"><div class="jet-menu-item-wrapper">'+this.settings.moreMenuContent+'</div></a><ul class="jet-sub-menu"></ul></li>'),t.$moreItemsInstance=e("> .jet-responsive-menu-available-items",this.$instance),t.$moreItemsInstance.attr({hidden:"hidden"})),this.rebuildItems(),this.$instance.trigger("rebuildItems"),this.subMenuHandler(),this.watch()},subMenuHandler:function(){var t,n,i=this;switch(this.settings.openSubType){case"hover":this.$instance.on("mouseenter",".jet-menu-item > a",{instance:this},(function(n){var i,s,o;t=e(n.target).parents(".jet-menu-item"),i=t.children(".jet-sub-menu, .jet-sub-mega-menu").first(),s=i.data("template-id")||!1,o=n.data.instance,e(".jet-menu-hover",this.$instance).removeClass("jet-menu-hover"),i[0]&&(t.addClass("jet-menu-hover"),s&&o.maybeTemplateLoad(s,i))})),this.$instance.on("mouseleave",".jet-menu-item > a",(function(e){}));break;case"click":this.$instance.on("click",".jet-menu-item > a",{instance:this},(function(t){var n,i,s,o,a,u,r=t.data.instance;t.preventDefault(),t.stopPropagation(),o=e(t.currentTarget),n=o.closest(".jet-menu-item"),i=n.siblings(".jet-menu-item.jet-menu-item-has-children"),s=e("> a",n),a=e(".jet-sub-menu:first, .jet-sub-mega-menu",n),u=a.data("template-id")||!1,i[0]&&(i.removeClass("jet-menu-hover"),e("jet-menu-item-has-children",i).removeClass("jet-menu-hover"));if(!e(".jet-sub-menu, .jet-sub-mega-menu",n)[0]||n.hasClass("jet-menu-hover")){let e=s.attr("href")||"#",t=s.attr("target")||"_self";return window.open(e,t),!1}a[0]&&(n.addClass("jet-menu-hover"),u&&r.maybeTemplateLoad(u,a))}))}this.$instance.on("mouseenter",".jet-sub-menu, .jet-sub-mega-menu",(function(e){clearTimeout(n)})),this.$instance.on("mouseenter",(function(e){clearTimeout(n)})),this.$instance.on("mouseleave",(function(t){n=setTimeout((function(){e(".jet-menu-hover",this.$instance).removeClass("jet-menu-hover")}),i.settings.mouseLeaveDelay)}));var s=e(window).width();i.$window.on("orientationchange resize",(function(t){e(window).width()!==s&&(s=e(window).width(),i.$instance.find(".jet-menu-item").removeClass("jet-menu-hover"))})),i.$document.on("touchend",(function(t){e(t.target).closest(".jet-menu-item").length||i.$instance.find(".jet-menu-item").removeClass("jet-menu-hover")}))},maybeTemplateLoad:function(t,n){this.settings.ajaxLoad&&(n.hasClass("template-loaded")||e.ajax({type:"GET",url:window.jetMenuPublicSettings.templateApiUrl,dataType:"json",data:{id:t,dev:window.jetMenuPublicSettings.devMode},beforeSend:function(e,t){e.setRequestHeader("X-WP-Nonce",window.jetMenuPublicSettings.restNonce)},success:function(e,t,i){var s=e.template_content,o=e.template_scripts,a=e.template_styles;for(var u in o)jetMenu.addedAssetsPromises.push(jetMenu.loadScriptAsync(u,o[u]));for(var r in a)jetMenu.addedAssetsPromises.push(jetMenu.loadStyle(r,a[r]));n.addClass("template-loaded"),jetMenu.elementorContentRender(n,s)}}))},watch:function(t){t=t||10;e(window).on("resize.jetResponsiveMenu orientationchange.jetResponsiveMenu load.jetResponsiveMenu",this.debounce(t,this.watcher.bind(this))),this.$instance.trigger("containerResize")},watcher:function(e){this.rebuildItems(),this.$instance.trigger("rebuildItems"),this.$instance.trigger("containerResize")},rebuildItems:function(){if(!this.settings.enabled)return!1;var t=this,i=(this.$instance.width(),this.$instance.width()-t.$moreItemsInstance.outerWidth(!0)),s=0,o=(this.getVisibleItemsWidth(),[]),a=[];t.$menuItems.each((function(){var t=e(this);(s+=t.outerWidth(!0))>i&&!n.inArray(this,a)?a.push(this):o.push(this)})),a.forEach((function(t){e(t).attr({hidden:"hidden"})})),o.forEach((function(t,n){e(t).removeAttr("hidden")})),e("> .jet-sub-menu",t.$moreItemsInstance).empty(),a.forEach((function(n){var i=e(n).clone();e(".jet-sub-mega-menu",i).remove(),i.addClass("jet-sub-menu-item"),i.removeAttr("hidden"),e("> .top-level-link",i).toggleClass("top-level-link sub-level-link"),e("> .jet-sub-menu",t.$moreItemsInstance).append(i)})),0==a.length?(t.$moreItemsInstance.attr({hidden:"hidden"}),t.$moreItemsInstance.addClass("jet-empty")):(t.$moreItemsInstance.removeAttr("hidden"),t.$moreItemsInstance.removeClass("jet-empty")),t.hiddenItemsArray=a},subMenuRebuild:function(){var t=this,n=!1;this.$instance.on("rebuildItems",(function(){var i=e(".jet-sub-menu",t.$instance),s=t.$window.outerWidth(!0),o=e("body").hasClass("rtl");i[0]&&(n&&(i.removeClass("inverse-side"),n=!1),i.each((function(){var t=e(this),i=t.offset().left,a=i+t.outerWidth(!0);o?i<0?(t.addClass("inverse-side"),t.find(".jet-sub-menu").addClass("inverse-side"),n=!0):a>=s&&(t.removeClass("inverse-side"),t.find(".jet-sub-menu").removeClass("inverse-side")):a>=s?(t.addClass("inverse-side"),t.find(".jet-sub-menu").addClass("inverse-side"),n=!0):i<0&&(t.removeClass("inverse-side"),t.find(".jet-sub-menu").removeClass("inverse-side"))})))}))},subMegaMenuRebuild:function(){var t=this;this.$instance.on("containerResize",(function(){var n=e(".jet-sub-mega-menu",t.$instance),i=e("body").outerWidth(!0);switch(t.settings.megaWidthType){case"items":var s=t.getVisibleItemsWidth(),o=e("> .jet-menu-item:first",t.$instance).position().left;n.css({width:s+"px",left:o});break;case"selector":var a=e(t.settings.megaWidthSelector),u=null,r=null;a[0]&&(u=t.$instance.offset().left,r=a.offset().left,n.css({width:a.outerWidth(),left:r-u+"px"}))}n[0]&&(n.css({maxWidth:""}),n.each((function(){var t=e(this),n=t.offset().left;n+t.outerWidth(!0)>=i&&t.css({maxWidth:i-n})})))}))},getVisibleItemsWidth:function(){var t=0;return this.$menuItems.each((function(){var n=e(this);n.hasAttr("hidden")||(t+=n.outerWidth(!0))})),t},mobileAndTabletcheck:function(){var e,t=!1;return e=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(t=!0),t},debounce:function(e,t){var n;return function(i){n&&clearTimeout(n),n=setTimeout((function(){t.call(this,i),n=null}),e)}}};var n={isEmpty:function(e){return!1===e||""===e||null==e},isEmptyObject:function(e){return!0===this.isEmpty(e)||0===e.length},isString:function(e){return"string"==typeof e||e instanceof String},isArray:function(t){return e.isArray(t)},inArray:function(t,n){return-1!==e.inArray(t,n)}};e.fn.hasAttr=function(e){return void 0!==this.attr(e)},e.fn.JetMenuPlugin=function(n){return this.each((function(){var i=e(this),s="object"==typeof n?n:{};i.data("JetMenuPlugin")||i.data("JetMenuPlugin",new t(this,s))}))}}(jQuery),function(e){"use strict";window.jetMenu={addedScripts:{},addedStyles:{},addedAssetsPromises:[],initedMobileMenuInstance:[],eventBus:new Vue,$body:e("body"),init:function(){this.initDesktopMenu(),this.mobileVueComponents(),this.initMobileMenu()},initDesktopMenu:function(){var t=!1,n=500,i="container",s="",o="hover",a=!1;window.jetMenuPublicSettings&&window.jetMenuPublicSettings.menuSettings&&(t="true"===jetMenuPublicSettings.menuSettings.jetMenuRollUp,n=jetMenuPublicSettings.menuSettings.jetMenuMouseleaveDelay||500,i=jetMenuPublicSettings.menuSettings.jetMenuMegaWidthType||"container",s=jetMenuPublicSettings.menuSettings.jetMenuMegaWidthSelector||"",o=jetMenuPublicSettings.menuSettings.jetMenuMegaOpenSubType||"hover",a="true"===jetMenuPublicSettings.menuSettings.jetMenuMegaAjax),e(".jet-menu-container").JetMenuPlugin({enabled:t,mouseLeaveDelay:+n,megaWidthType:i,megaWidthSelector:s,openSubType:o,ajaxLoad:a})},initMobileMenu:function(){let t=e(".jet-mobile-menu-single");if(!t[0])return!1;"true"===window.jetMenuPublicSettings.devMode&&(Vue.config.devtools=!0),t.each((function(){let t=e(this),n=t.attr("id"),i=t.data("menu-id")||!1,s=t.data("menu-options")||{};jetMenu.createMobileMenuInstance(n,i,s)}))},createMobileMenuInstance:function(e,t,n){if(jetMenu.initedMobileMenuInstance.includes(e))return;jetMenu.initedMobileMenuInstance.push(e);new Vue({el:"#"+e,data:{uniqId:e,menuOptions:n}})},mobileVueComponents:function(){Vue.component("mobile-menu-item",{template:"#mobile-menu-item-template",props:{itemDataObject:Object,depth:Number,menuOptions:Object},data:function(){return{ajaxRequest:null,templateLoadStatus:!1,subDropdownVisible:!1}},computed:{itemClasses:function(){let e=["jet-mobile-menu__item","jet-menu-item-"+this.itemDataObject.itemId,"jet-mobile-menu__item--sub-trigger-"+(this.menuOptions.subTrigger||"item")],t=this.itemDataObject.classes;return 0!==t.length&&(e=e.concat(t)),window.location.href===this.itemDataObject.url&&e.push("jet-mobile-menu__item--active"),e},itemLinkClasses:function(){return["mobile-link",0===this.depth?"mobile-top-level-link":"mobile-sub-level-link"]},"isСhildrenDefine":function(){return!!this.itemDataObject.children},isTemplateDefine:function(){return!1!==this.itemDataObject.elementorTemplateId},isSub:function(){return!(!this.isСhildrenDefine&&!this.isTemplateDefine)},isTopLevel:function(){return 0===this.depth},isDropdownLayout:function(){return this.isSub&&!this.isTemplateDefine&&"dropdown"===this.menuOptions.subOpenLayout},depthClass:function(){return 0===this.depth?"mobile-top-level-link":"mobile-sub-level-link"},dropdownIconHtml:function(){let e=""!==this.menuOptions.dropdownIcon?this.menuOptions.dropdownIcon:'<i class="fas fa-angle-right"></i>',t=""!==this.menuOptions.dropdownOpenedIcon?this.menuOptions.dropdownOpenedIcon:'<i class="fas fa-angle-down"></i>';return this.subDropdownVisible&&(e=t),e},itemIconHtml:function(){return this.itemDataObject.itemIcon},isIconVisible:function(){return!("false"===(this.menuOptions.itemIconVisible||"true")||""===this.itemDataObject.itemIcon||!this.itemDataObject.itemIcon)},isBadgeVisible:function(){return!("false"===(this.menuOptions.itemBadgeVisible||"true")||""===this.itemDataObject.badgeText||!this.itemDataObject.badgeText)},isDescVisible:function(){return!("false"===(this.menuOptions.itemDescVisible||"false")||""===this.itemDataObject.description||!this.itemDataObject.description)},loaderColor:function(){return this.menuOptions.loaderColor||"#3a3a3a"}},methods:{itemSubHandler:function(t){let n=t.target,i=e(n).closest(".mobile-link");"item"===this.menuOptions.subTrigger&&(this.isSub&&i&&t.preventDefault(),!this.isSub&&i&&this.menuOptions.closeAfterNavigate&&jetMenu.eventBus.$emit("closeMenu",{menuUniqId:this.menuOptions.menuUniqId}),this.switchToSub(t))},markerSubHandler:function(e){"submarker"===this.menuOptions.subTrigger&&this.switchToSub(e)},switchToSub:function(e){if(this.isSub)if(this.isTemplateDefine)this.itemDataObject.elementorContent?jetMenu.eventBus.$emit("showTemplateContent",{menuUniqId:this.menuOptions.menuUniqId,id:this.itemDataObject.id,name:this.itemDataObject.name,elementorContent:this.itemDataObject.elementorContent}):this.getElementorTemplate();else{if(this.isDropdownLayout)return void(this.subDropdownVisible=!this.subDropdownVisible);jetMenu.eventBus.$emit("itemsSubSwitch",{menuUniqId:this.menuOptions.menuUniqId,id:this.itemDataObject.id,name:this.itemDataObject.name,children:this.itemDataObject.children||!1})}},getElementorTemplate:function(){var t=this;t.ajaxRequest=e.ajax({type:"GET",url:window.jetMenuPublicSettings.templateApiUrl,dataType:"json",data:{id:t.itemDataObject.elementorTemplateId,dev:window.jetMenuPublicSettings.devMode},beforeSend:function(e,n){null!==t.ajaxRequest&&t.ajaxRequest.abort(),t.templateLoadStatus=!0,e.setRequestHeader("X-WP-Nonce",window.jetMenuPublicSettings.restNonce)},success:function(e,n,i){var s=e.template_content,o=e.template_scripts,a=e.template_styles;for(var u in o)jetMenu.addedAssetsPromises.push(jetMenu.loadScriptAsync(u,o[u]));for(var r in a)jetMenu.addedAssetsPromises.push(jetMenu.loadStyle(r,a[r]));t.templateLoadStatus=!1,t.itemDataObject.elementorContent=s,jetMenu.eventBus.$emit("showTemplateContent",{menuUniqId:t.menuOptions.menuUniqId,id:t.itemDataObject.id,name:t.itemDataObject.name,elementorContent:t.itemDataObject.elementorContent})}})}}}),Vue.component("mobile-menu-list",{template:"#mobile-menu-list-template",props:{depth:Number,childrenObject:Object,menuOptions:Object}}),Vue.component("mobile-menu",{template:"#mobile-menu-template",props:{menuOptions:{type:Object,default:{}}},data:function(){return{menuOpen:!1,children:!1,itemsRawData:{},trail:[],breadcrumbsData:[],animation:"items-next-animation",ajaxRequest:null,templateVisible:!1,instanceLoadStatus:!1,itemTemplateContent:!1,headerTemplate:this.menuOptions.headerTemplate||0,headerContent:!1,headerTemplateVisible:!1,beforeTemplate:this.menuOptions.beforeTemplate||0,beforeContent:!1,afterTemplate:this.menuOptions.afterTemplate||0,afterContent:!1,ajaxPromises:[]}},mounted:function(){let t=this;this.menuOpen&&(jetMenu.$body.addClass("jet-mobile-menu-visible"),"slide-out"===this.menuOptions.menuLayout&&jetMenu.$body.addClass("jet-menu-body-blocker")),this.ajaxPromises.push(new Promise((function(n,i){e.ajax({type:"GET",url:window.jetMenuPublicSettings.menuItemsApiUrl,dataType:"json",data:{menu_id:t.menuId,dev:window.jetMenuPublicSettings.devMode,lang:window.jetMenuPublicSettings.wpmlLanguageCode||!1},beforeSend:function(e,t){e.setRequestHeader("X-WP-Nonce",window.jetMenuPublicSettings.restNonce)},success:function(e,i,s){let o=e.data.items;t.itemsRawData=o,n()}})}))),0!=+this.headerTemplate&&this.ajaxPromises.push(new Promise((function(n,i){e.ajax({type:"GET",url:window.jetMenuPublicSettings.templateApiUrl,dataType:"json",data:{id:t.headerTemplate,dev:window.jetMenuPublicSettings.devMode},beforeSend:function(e,t){e.setRequestHeader("X-WP-Nonce",window.jetMenuPublicSettings.restNonce)},success:function(e,i,s){let o=e.template_content,a=e.template_scripts,u=e.template_styles;for(let e in a)jetMenu.addedAssetsPromises.push(jetMenu.loadScriptAsync(e,a[e]));for(let e in u)jetMenu.addedAssetsPromises.push(jetMenu.loadStyle(e,u[e]));t.headerContent=o,t.headerTemplateVisible=!0,n()}})}))),0!=+this.beforeTemplate&&this.ajaxPromises.push(new Promise((function(n,i){e.ajax({type:"GET",url:window.jetMenuPublicSettings.templateApiUrl,dataType:"json",data:{id:t.beforeTemplate,dev:window.jetMenuPublicSettings.devMode},beforeSend:function(e,t){e.setRequestHeader("X-WP-Nonce",window.jetMenuPublicSettings.restNonce)},success:function(e,i,s){let o=e.template_content,a=e.template_scripts,u=e.template_styles;for(let e in a)jetMenu.addedAssetsPromises.push(jetMenu.loadScriptAsync(e,a[e]));for(let e in u)jetMenu.addedAssetsPromises.push(jetMenu.loadStyle(e,u[e]));t.beforeContent=o,n()}})}))),0!=+this.afterTemplate&&this.ajaxPromises.push(new Promise((function(n,i){e.ajax({type:"GET",url:window.jetMenuPublicSettings.templateApiUrl,dataType:"json",data:{id:t.afterTemplate,dev:window.jetMenuPublicSettings.devMode},beforeSend:function(e,t){e.setRequestHeader("X-WP-Nonce",window.jetMenuPublicSettings.restNonce)},success:function(e,i,s){let o=e.template_content,a=e.template_scripts,u=e.template_styles;for(let e in a)jetMenu.addedAssetsPromises.push(jetMenu.loadScriptAsync(e,a[e]));for(let e in u)jetMenu.addedAssetsPromises.push(jetMenu.loadStyle(e,u[e]));t.afterContent=o,n()}})}))),this.instanceLoadStatus=!0,Promise.all(this.ajaxPromises).then((function(){t.instanceLoadStatus=!1}),(function(e){console.log("Script Loaded Error")})),jetMenu.eventBus.$on("itemsSubSwitch",(function(e){t.menuOptions.menuUniqId===e.menuUniqId&&(t.trail.push(e.children),t.children=e.children,t.breadcrumbsData.push(e.name),t.animation="items-next-animation")})),jetMenu.eventBus.$on("showTemplateContent",(function(e){t.menuOptions.menuUniqId===e.menuUniqId&&(t.itemTemplateContent=e.elementorContent,t.templateVisible=!0,t.breadcrumbsData.push(e.name),t.animation="items-next-animation",t.showTemplateContent())})),jetMenu.eventBus.$on("closeMenu",(function(e){t.menuOptions.menuUniqId===e.menuUniqId&&t.closeMenu()}))},watch:{menuOpen:function(e,t){e&&(jetMenu.$body.addClass("jet-mobile-menu-visible"),"slide-out"===this.menuOptions.menuLayout&&jetMenu.$body.addClass("jet-menu-body-blocker"),this.initTemplatesContent()),e||(jetMenu.$body.removeClass("jet-mobile-menu-visible"),"slide-out"===this.menuOptions.menuLayout&&jetMenu.$body.removeClass("jet-menu-body-blocker"),this.clearStates())}},computed:{instanceClass:function(){return["jet-mobile-menu__instance","jet-mobile-menu__instance--"+this.menuOptions.menuLayout+"-layout",this.menuOptions.menuPosition+"-container-position",(this.menuOptions.togglePosition||"default")+"-toggle-position"]},menuContainerVisible:function(){return this.menuOpen&&!this.instanceLoadStatus},menuId:function(){return this.menuOptions.mobileMenuId?this.menuOptions.mobileMenuId:this.menuOptions.menuId},coverVisible:function(){return["slide-out"].includes(this.menuOptions.menuLayout)},itemsList:function(){return this.children?this.children:this.itemsRawData},isClose:function(){return["slide-out"].includes(this.menuOptions.menuLayout)},isBack:function(){return!(!this.children&&!this.templateVisible)},isBreadcrumbs:function(){return!(!this.menuOptions.useBreadcrumb||0===this.breadcrumbsData.length)},depth:function(){return this.trail.length},containerPosition:function(){return this.menuOptions.menuPosition},showAnimation:function(){let e=!1;switch(this.menuOptions.menuLayout){case"slide-out":e="right"===this.containerPosition?"menu-container-left-animation":"menu-container-right-animation";break;case"dropdown":e="menu-container-dropdown-animation";break;case"push":e="menu-container-expand-animation"}return e},toggleClosedIcon:function(){return""!==this.menuOptions.toggleClosedIcon?this.menuOptions.toggleClosedIcon:'<i class="fas fa-bars"></i>'},toggleOpenedIcon:function(){return""!==this.menuOptions.toggleOpenedIcon?this.menuOptions.toggleOpenedIcon:'<i class="fas fa-times"></i>'},toggleText:function(){return""!==this.menuOptions.toggleText&&this.menuOptions.toggleText},closeIcon:function(){return""!==this.menuOptions.closeIcon?this.menuOptions.closeIcon:'<i class="fas fa-times"></i>'},backIcon:function(){return(""!==this.menuOptions.backIcon?this.menuOptions.backIcon:'<i class="fas fa-arrow-left"></i>')+(""!==this.menuOptions.backText?"<span>"+this.menuOptions.backText+"</span>":"")},backText:function(){return""!==this.menuOptions.backText&&this.menuOptions.backText},breadcrumbIcon:function(){return""!==this.menuOptions.breadcrumbIcon?this.menuOptions.breadcrumbIcon:'<i class="fas fa-angle-rightt"></i>'},loaderColor:function(){return this.menuOptions.loaderColor||"#3a3a3a"},toggleLoaderVisible:function(){return!!(this.menuOptions.toggleLoader&&this.instanceLoadStatus&&this.menuOpen)},beforeTemplateVisible:function(){return!!this.beforeContent},afterTemplateVisible:function(){return!!this.afterContent}},methods:{menuToggle:function(){this.menuOpen=!this.menuOpen},closeMenu:function(){this.menuOpen=!1},clearStates:function(){this.trail=[],this.children=!1,this.breadcrumbsData=[],this.templateVisible=!1},goBack:function(){this.animation="items-prev-animation",this.templateVisible?this.templateVisible=!1:(this.$delete(this.trail,this.trail.length-1),this.children=this.trail.slice(-1)[0]||!1),this.$delete(this.breadcrumbsData,this.breadcrumbsData.length-1)},escapeKeyHandler:function(){this.isBack?this.goBack():this.closeMenu()},showTemplateContent:function(){let t=this;this.$nextTick((function(){let n=e(t.$refs["template-content"]).find(".jet-mobile-menu__template-content");jetMenu.elementorContentRender(n)}))},initTemplatesContent:function(){let t=this;this.$nextTick((function(){if(t.headerContent){let n=e(t.$refs["header-template-content"]);jetMenu.elementorContentRender(n)}if(t.beforeContent){let n=e(t.$refs["before-template-content"]);jetMenu.elementorContentRender(n)}if(t.afterContent){let n=e(t.$refs["after-template-content"]);jetMenu.elementorContentRender(n)}}))},breadcrumbHandle:function(e){e!==this.breadcrumbsData.length&&(this.animation="items-prev-animation",this.trail=this.trail.slice(0,e),this.children=this.trail.slice(-1)[0]||!1,this.templateVisible=!1,this.breadcrumbsData=this.breadcrumbsData.slice(0,e))}}})},loadScriptAsync:function(e,t){return jetMenu.addedScripts.hasOwnProperty(e)?e:(jetMenu.addedScripts[e]=t,new Promise((function(n,i){var s=document.createElement("script");s.src=t,s.async=!0,s.onload=function(){n(e)},document.head.appendChild(s)})))},loadStyle:function(e,t){return jetMenu.addedStyles.hasOwnProperty(e)&&jetMenu.addedStyles[e]===t?e:(jetMenu.addedStyles[e]=t,new Promise((function(n,i){var s=document.createElement("link");s.id=e,s.rel="stylesheet",s.href=t,s.type="text/css",s.media="all",s.onload=function(){n(e)},document.head.appendChild(s)})))},elementorContentRender:function(e,t){Promise.all(jetMenu.addedAssetsPromises).then((function(n){t&&e.html(t),jetMenu.elementorFrontendInit(e)}),(function(e){console.log("Script Loaded Error")}))},elementorFrontendInit:function(t){t.find("div[data-element_type]").each((function(){var t=e(this),n=t.data("element_type");if(n)try{"widget"===n&&(n=t.data("widget_type"),window.elementorFrontend&&window.elementorFrontend.hooks&&window.elementorFrontend.hooks.doAction("frontend/element_ready/widget",t,e)),window.elementorFrontend&&window.elementorFrontend.hooks&&(window.elementorFrontend.hooks.doAction("frontend/element_ready/global",t,e),window.elementorFrontend.hooks.doAction("frontend/element_ready/"+n,t,e))}catch(e){return console.log(e),t.remove(),!1}}))}},jetMenu.init()}(jQuery);