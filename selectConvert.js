/**
 * Select Converter
 * Copyright 2014, Impact Communications
 * @Version: 1.0
 * lots of this is taken from mary lou at codrops.
**/


;(function($) {
"use strict";

var useroptions;
var currentSettings = {
	target: null, 
};

var methods = {

	init: function(options){
		//console.log(options);
		return this.each(function(){
			// plugin settings.
			var $this = $(this);
			currentSettings.target = $this;
			
			$.extend(this.settings = {
				speed: 0.5,
				css3: true,
				type: "default", 		
				mobile: false,
				tag: "<li>",
				holder : "<ul>",
				eleclass : "sc-select",
				unique : "scdropdown1",
				defaultname : "All Categories"
			}, options);
			useroptions = this.settings;
			methods.addClone($this);
			methods.setup();
		});
	},

	setup : function(){
		// grab items from the select box before rewriting it.
		var target = currentSettings.target;
	},

	addClone : function(n){
		var children = n.children('option');
		

		n.before($(useroptions.holder,{
			class: useroptions.eleclass + " " + useroptions.unique,
			click : function(e){
				e.preventDefault();
				methods.setSelectValue(e,$(this));
				methods.setActive($(this));
			}
		}));

		children.each(function(index, ele){
			var $this = $(this);
			var data = $this.val();
			var name = $this.text();
			$(useroptions.tag).appendTo("." + useroptions.unique).html('<span>' + name + '</span>').data('value', data).addClass(data);
		});
		
		$("." + useroptions.unique).wrap("<div class='scoptions "+ useroptions.unique +"-options'>");

		$("." + useroptions.unique + "-options").wrap("<div class='"+useroptions.eleclass+"-holder "+ useroptions.unique +"-holder'>");
	
		$("." + useroptions.unique + "-options").before($('<span>',{
			class : 'scplaceholder' + ' ' + useroptions.unique + '-place',
			text : useroptions.defaultname,
			click : function(e){
				e.preventDefault();
				methods.setActive($(this).parent('div.sc-select-holder'));
			}
		}));
		n.hide();

	},

	setSelectValue : function(elem, item){
	
		//console.log(elem.target.parentNode.className + " " + elem.target.parentNode.textContent);
		var selClass = elem.target.parentNode.className;
		var selText = elem.target.parentNode.textContent;
		//$("." + useroptions.unique + "-place").text(selText);

		var paritem = item.parents('div.sc-select-holder');
		console.log(paritem);
		paritem.next('select').val(selClass).change();
		//currentSettings.target.val(selClass).change();
		methods.setActive(item.parents('div.sc-select-holder'));
	},
	setActive : function(n){
		var toggle = n;
		toggle.toggleClass('sc-active');
	//	console.log(useroptions.unique);
	//	$("." + useroptions.unique + "-holder").toggleClass('sc-active');
	}

};

$.fn.selectConvert = function( method ){
	if(methods[method]){
		return methods[method].apply(this, Array.prototype.slice.call( arguments, 1));
	}else if( typeof method === 'object' || !method){		
		return methods.init.apply( this, arguments );
	}else{
		$.error('Method' + method + 'does not exist');
	}
}

})(jQuery);

