;"use strict";

define( function(require, exports, module) {
	
	module.exports = {
		init : function() {
			var vm = new Vue( {
                el: "#pageDiv",
                data: {
                	filter: {
                		CStatus: ""
                	},
                	rowsData: [ {
                		CUserName: "", 
                		CPhone: "", 
                		CClName: "", 
                		CDoctName: "", 
                		CClsName: "", 
                		COutProdName: "", 
                		CCardNo: "",
                		NTotalNum: "", 
                		NCurNum: "", 
                		TApptTime: "", 
                		TCancTime: "", 
                		CStatus: "", 
                		CRemark: ""
                	} ]
                },
                props: [],
                mounted: function() { // 页面加载后,vue挂载完成开始查询数据
                	this.$nextTick( function () {
	    				this.list();
                	} );
    			},
    			methods: {
    				list: function(pageno) {
    					var vlist = vm.$refs.vFilter.validate();
						if(vlist.length > 0){
							layer.warn("您的输入非法,请重新输入");
							return false;
						}
    					issapi.post( {
	            			method: "cusCardMgrAction.list",
	            			data: vm.filter,
	        				pageno: vm.$refs.vList.pageno=(pageno || 1),
	        				pagesize: vm.$refs.vList.pagesize,
	        				onSuccess: function(jqXHR, textStatus, response) {
	        					vm.rowsData = response.data;
	        					vm.$refs.vList.total = response.total;
	        				}
	            		} );
    				},
    				getPreOrderInfo: function(idx, e) {
						var selList = vm.$refs.vList.getSelList();
						if(selList.length != 1){
							layer.warn("请选择一条记录进行操作");
							return;
						}
						issapi.post( {
	            			method: "cusCardMgrAction.getPreOrderInfo",
	        				data: selList,
	        				onSuccess: function(jqXHR, textStatus, response) {
	        					layer.ok( response.message );
	        				}
	            		} );
    				},
    				getPinCardInfo: function(idx, e) {
						var selList = vm.$refs.vList.getSelList();
						if(selList.length != 1){
							layer.warn("请选择一条记录进行操作");
							return;
						}
						issapi.post( {
	            			method: "cusCardMgrAction.getPinCardInfo",
	        				data: selList,
	        				onSuccess: function(jqXHR, textStatus, response) {
	        					layer.ok( response.message );
	        				}
	            		} );
    				}
    			}
            } );
		}
	};
	
} );