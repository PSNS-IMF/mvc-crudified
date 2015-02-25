YUI.add("gallery-sm-menu",function(f,e){var a=f.config.doc,c=f.ClassNameManager.getClassName;var b="itemClick";var d=f.Base.create("menu",f.Menu.Base,[f.View],{classNames:{canHaveChildren:c("menu-can-have-children"),children:c("menu-children"),disabled:c("menu-disabled"),hasChildren:c("menu-has-children"),heading:c("menu-heading"),hidden:c("menu-hidden"),horizontal:c("menu-horizontal"),item:c("menu-item"),label:c("menu-label"),menu:c("menu"),noTouch:c("menu-notouch"),open:c("menu-open"),selected:c("menu-selected"),separator:c("menu-separator"),touch:c("menu-touch"),vertical:c("menu-vertical")},rendered:false,sourceSelectors:{item:"> li",label:"> a, > span",subtree:"> ul, > ol"},initializer:function(g){this._openMenus={};this._published={};this._timeouts={};if(g&&g.sourceNode){g.nodes=(g.nodes||[]).concat(this.parseHTML(g.sourceNode));f.one(g.sourceNode).remove(true)}this._attachMenuEvents()},destructor:function(){this._detachMenuEvents();delete this._openMenus;delete this._published;f.Object.each(this._timeouts,function(g){clearTimeout(g)},this);delete this._timeouts},getHTMLNode:function(g){if(!g._htmlNode){g._htmlNode=this.get("container").one("#"+g.id)}return g._htmlNode},hide:function(){this.set("visible",false);return this},parseHTML:function(k){k=f.one(k);var g=this.classNames,h=[],i=this.sourceSelectors,j=this;k.all(i.item).each(function(q){var o={},p=q._node,r=q.one(i.label),t=q.one(i.subtree);if(q.hasClass(g.heading)){o.type="heading"}else{if(q.hasClass(g.separator)){o.type="separator"}}if(q.hasClass(g.disabled)){o.state||(o.state={});o.state.disabled=true}if(q.hasClass(g.hidden)){o.state||(o.state={});o.state.hidden=true}if(r){var m=r.getAttribute("href"),u=r.getAttribute("title");o.label=r.getHTML();if(m&&m!=="#"){o.url=m}if(u!==""){o.title=u}else{delete o.title}}else{var l;for(var n=0,s=p.childNodes.length;n<s;n++){l=p.childNodes[n];if(l.nodeType===a.TEXT_NODE){o.label=f.Escape.html(l.nodeValue);break}}}if(t){o.children=j.parseHTML(t)}h.push(o)});return h},render:function(){var g=this.classNames,h=this.get("container");h.addClass(g.menu);h.addClass(g[this.get("orientation")]);if("ontouchstart" in f.config.win){h.addClass(g.touch)}else{h.addClass(g.noTouch)}this._childrenNode=this.renderChildren(this.rootNode,{container:h});if(!h.inDoc()){f.one("body").append(h)}this.rendered=true;return this},renderChildren:function(m,l){l||(l={});var h=l.container,g=h&&h.one("."+this.classNames.children);if(!g){g=f.Node.create(d.Templates.children({classNames:this.classNames,menu:this,item:m}))}if(m.isRoot()){g.set("tabIndex",0);g.set("role","menu")}if(m.hasChildren()){g.set("aria-expanded",m.isOpen())}for(var j=0,k=m.children.length;j<k;j++){this.renderNode(m.children[j],{container:g,renderChildren:true})}if(h){h.append(g)}return g},renderNode:function(j,m){m||(m={});var g=this.classNames,h=j._htmlNode,i=j.isHidden();if(!h){h=j._htmlNode=f.Node.create(d.Templates.item({classNames:g,item:j,menu:this}))}h.set("aria-hidden",i);h.toggleClass(g.hidden,i);switch(j.type){case"separator":h.set("role","separator");break;case"item":case"heading":var l=h.one("."+g.label),k=l.get("id");l.setHTML(j.label);if(!k){k=f.guid();l.set("id",k)}if(j.title){h.set("title",j.title)}h.set("aria-labelledby",k);if(j.type==="heading"){h.set("role","heading")}else{h.set("role","menuitem");h.toggleClass(g.disabled,j.isDisabled());if(j.canHaveChildren){h.addClass(g.canHaveChildren);h.toggleClass(g.open,j.isOpen());if(j.hasChildren()){h.addClass(g.hasChildren);if(m.renderChildren){this.renderChildren(j,{container:h})}}}}break}if(m.container){m.container.append(h)}return h},reposition:function(g){var i=this.get("container"),h,j;if(f.Lang.isArray(g)){h={bottom:g[1],left:g[0],right:g[0],top:g[1]}}else{if(g._node){h=g.get("region")}else{h=g}}j=this._getSortedAnchorRegions(this.get("alignments"),i.get("region"),h)[0].region;i.setXY([j.left,j.top]);return this},show:function(g){if(g&&g.anchorPoint){this.reposition(g.anchorPoint)}this.set("visible",true);return this},toggleVisible:function(g){return this[this.get("visible")?"hide":"show"](g)},_attachMenuEvents:function(){this._menuEvents||(this._menuEvents=[]);var g=this.classNames,h=this.get("container");this._menuEvents.push(this.after({add:this._afterAdd,clear:this._afterClear,close:this._afterClose,disable:this._afterDisable,enable:this._afterEnable,hide:this._afterHide,open:this._afterOpen,orientationChange:this._afterOrientationChange,remove:this._afterRemove,show:this._afterShow,visibleChange:this._afterVisibleChange}),h.on("hover",this._onMenuMouseEnter,this._onMenuMouseLeave,this),h.delegate("click",this._onItemClick,"."+g.item+">."+g.label,this),h.delegate("hover",this._onItemMouseEnter,this._onItemMouseLeave,"."+g.canHaveChildren,this),f.one("doc").after("mousedown",this._afterDocMouseDown,this))},_detachMenuEvents:function(){(new f.EventHandle(this._menuEvents)).detach()},_getAncestorTestFn:function(){var g=this.get("container");return function(h){return h===g}},_getAnchorRegion:function(g,h,i){var j={};g.replace(/^([bt])([lr])-([bt])([lr])/i,function(l,m,n,o,p){var k={b:"bottom",l:"left",r:"right",t:"top"};j[k[m]]=i[k[o]];j[k[n]]=i[k[p]]});"bottom" in j||(j.bottom=j.top+h.height);"left" in j||(j.left=j.right-h.width);"right" in j||(j.right=j.left+h.width);"top" in j||(j.top=j.bottom-h.height);return j},_getSortedAnchorRegions:function(o,l,m,h){h||(h=f.DOM.viewportRegion());var g=[],j,k,n,p;for(j=0,k=o.length;j<k;j++){n=o[j];if(n.point){n=n.point}p=this._getAnchorRegion(n,l,m);g.push({point:n,region:p,score:this._inRegion(p,h)})}g.sort(function(i,q){if(i.score===q.score){return 0}else{if(i.score===true){return -1}else{if(q.score===true){return 1}else{return q.score-i.score}}}});return g},_hideMenu:function(i,h){h||(h=this.getHTMLNode(i));var g=h.one("."+this.classNames.children);g.setXY([-10000,-10000]);delete i.data.menuAnchor},_inRegion:function(g,h){if(g.bottom<=h.bottom&&g.left>=h.left&&g.right<=h.right&&g.top>=h.top){return true}return(Math.min(h.bottom-g.bottom,0)+Math.min(g.left-h.left,0)+Math.min(h.right-g.right,0)+Math.min(g.top-h.top,0))},_positionMenu:function(l,k){k||(k=this.getHTMLNode(l));var j=k.one("."+this.classNames.children),m=this.get("orientation"),g,i;if(l.parent.isRoot()&&m==="horizontal"){g=this.get("alignments")}else{g=(l.parent&&l.parent.data.menuAnchors)||this.get("subMenuAlignments")}i=this._getSortedAnchorRegions(g,j.get("region"),k.get("region"));if(m==="vertical"||!l.parent.isRoot()){l.data.menuAnchors=i}var h=i[0].region;j.setXY([h.left,h.top])},_afterAdd:function(g){if(!this.rendered){return}var j=g.parent,h,i;if(j===this.rootNode){h=this._childrenNode}else{i=this.getHTMLNode(j);h=i&&i.one("."+this.classNames.children);if(!h){i||(i=this.renderNode(j));this.renderChildren(j,{container:i});return}}h.insert(this.renderNode(g.node,{renderChildren:true}),g.index)},_afterClear:function(){this._openMenus={};if(!this.rendered){return}delete this._childrenNode;this.rendered=false;this.get("container").empty();this.render()},_afterDocMouseDown:function(g){if(!this.get("visible")){return}if(!g.target.ancestor(this._getAncestorTestFn(),true)){this.closeSubMenus();if(this.get("hideOnOutsideClick")){this.hide()}}},_afterClose:function(g){var k=g.node,h=this.getHTMLNode(k);for(var j=0,l=k.children.length;j<l;j++){k.children[j].close()}k.close();delete this._openMenus[k.id];if(h){this._hideMenu(k,h);h.removeClass(this.classNames.open)}},_afterDisable:function(g){var h=this.getHTMLNode(g.item);if(h){h.addClass(this.classNames.disabled)}},_afterEnable:function(g){var h=this.getHTMLNode(g.item);if(h){h.removeClass(this.classNames.disabled)}},_afterHide:function(g){var h=this.getHTMLNode(g.item);if(h){h.addClass(this.classNames.hidden);h.set("aria-hidden",true)}},_afterOpen:function(h){var l=h.node,j=this.getHTMLNode(l),n=l.parent,g;if(n){if(n.isOpen()){for(var k=0,m=n.children.length;k<m;k++){g=n.children[k];if(g!==l){g.close()}}}else{n.open()}}this._openMenus[l.id]=l;if(j){this._positionMenu(l,j);j.addClass(this.classNames.open)}},_afterOrientationChange:function(g){if(this.rendered){this.get("container").removeClass(this.classNames.horizontal).removeClass(this.classNames.vertical).addClass(this.classNames[g.newVal])}},_afterRemove:function(g){delete this._openMenus[g.node.id];if(!this.rendered){return}var h=this.getHTMLNode(g.node);if(h){h.remove(true);delete g.node._htmlNode}},_afterShow:function(g){var h=this.getHTMLNode(g.item);if(h){h.removeClass(this.classNames.hidden);h.set("aria-hidden",false)}},_afterVisibleChange:function(h){var g=this.get("container");g.toggleClass(this.classNames.open,h.newVal);if(!h.newVal){g.removeAttribute("style")}},_onItemClick:function(g){var j=this.getNodeById(g.currentTarget.getData("item-id")),h=b+"#"+j.id,i=j.isDisabled()||j.isHidden();if(i||j.url==="#"){g.preventDefault()}if(i){return}if(!this._published[h]){this._published[h]=this.publish(h,{defaultFn:this._defSpecificItemClickFn})}if(!this._published[b]){this._published[b]=this.publish(b,{defaultFn:this._defItemClickFn})}this.fire(h,{originEvent:g,item:j})},_onItemMouseEnter:function(g){var h=this.getNodeById(g.currentTarget.get("id"));clearTimeout(this._timeouts.item);if(h.isOpen()||h.isDisabled()){return}this._timeouts.item=setTimeout(function(){h.open()},200)},_onItemMouseLeave:function(g){var h=this.getNodeById(g.currentTarget.get("id"));clearTimeout(this._timeouts.item);if(!h.isOpen()){return}this._timeouts.item=setTimeout(function(){h.close()},300)},_onMenuMouseEnter:function(){clearTimeout(this._timeouts.menu)},_onMenuMouseLeave:function(){var g=this;clearTimeout(this._timeouts.menu);this._timeouts.menu=setTimeout(function(){g.closeSubMenus();if(g.get("hideOnMouseLeave")){g.hide()}},500)},_defItemClickFn:function(g){var h=g.item;if(h.canHaveChildren){clearTimeout(this._timeouts.item);clearTimeout(this._timeouts.menu);g.item.toggleOpen()}else{if(this.get("hideOnClick")){this.closeSubMenus();this.hide()}}},_defSpecificItemClickFn:function(g){this.fire(b,{originEvent:g.originEvent,item:g.item})}},{ATTRS:{alignments:{valueFn:function(){return["tl-bl","tr-br","bl-tl","br-tr"]}},hideOnClick:{value:true},hideOnMouseLeave:{value:false},hideOnOutsideClick:{value:true},orientation:{value:"vertical"},subMenuAlignments:{valueFn:function(){return["tl-tr","bl-br","tr-tl","br-bl"]}},visible:{value:false}}});f.Menu=f.mix(d,f.Menu)},"gallery-2013.03.27-22-06",{requires:["classnamemanager","escape","event-hover","gallery-sm-menu-base","gallery-sm-menu-templates","node-screen","view"],skinnable:true});