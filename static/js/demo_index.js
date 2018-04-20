;"use strict";

define( function(require, exports, module) {
	
	module.exports = {
		init : function() {			
			var vm = new Vue( {
                el: "#pageDiv",
                data: {
                },
                mounted:function(){
                	$("#mmenu").css("display","none");
                	$(".top").css("display","none");
                	$("#path").css("display","none");
                	$("#cl-dashboard").css("display","none");   
                	$("#copyright").css("display","none");  
                	$(".main").css("background","#fff");    
                	
                	$(document).on("mouseover",".markdown-section",function(){
                		var menu=this.children[6].children[0].children[0];
                		menu.onclick=function(){
                			$("#mmenu").css("display","block");
                			$(".ccontain").css("display","none");
                			/*$(".cover").css("display","none");*/               			
                			$("#mmenu p").click(function(){
                				issapi.open(issapi.appCxtPath)
                			})
                		}               		
                	})
                },
    			methods: {
    			}
            } );
		}
	};
	
} );