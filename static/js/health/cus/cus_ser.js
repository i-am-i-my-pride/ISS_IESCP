;"use strict";

define( function(require, exports, module) {
	
	module.exports = {
		init : function() {
			var vm = new Vue( {
                el: "#pageDiv",
                data: {
                	filter: {
                		CSex:"",CName:"",CProName:"",CMobile:"",CCertfCde:""
                	},
                	rowsData: [ {
						CName:"",CMobile:"",CCertfCls:"",CCertfCde:"",CEmail:"",CSex:"",
						CProName:"",NValidNum:"",NInvalidNum:"",TBgnTime:"",
						TEngTime:"",CSource:"",
                        CMobiles:"",CCertfCdes:""
                	} ],
                	project:[],//服务项目列表
                },
                props: [],
                mounted: function() { // 页面加载后,vue挂载完成开始查询数据
                	this.$nextTick( function () {
	    				this.list();
	    				this.getProject();
                	} );
    			},
    			methods: {
    				getProject:function(){
    					issapi.post( {
	            			method: "cusSerMgrAction.getProject",
	            			data: vm.dptFilter,
	        				onSuccess: function(jqXHR, textStatus, response) {
	        					vm.project = response.data; 
	        				}
	            		} );
    				},
    				see: function(idx) {
    					vm.$refs.vList.seeData( idx, function(rowData, callback) {
    						layer.open( {
        						type: 1,
        						title: "查看服务项目",
        						area: ["700px", "400px"],
        						content: $(vm.$el).find(".dialog"),
        						btn: [ "关闭" ],
        						btn1: function(index, layero) {
        							layer.close( index );
        						},
        						end: function() {
        							callback();
        						}
        					 } );
    					} );
    				},
    				list: function(pageno) {
    					var vlist = vm.$refs.vFilter.validate();
						if(vlist.length > 0){
							layer.warn("您的输入非法,请重新输入");
							return false;
						}
    					issapi.post( {
	            			method: "cusSerMgrAction.list",
	            			data: vm.filter,
	        				pageno: vm.$refs.vList.pageno=(pageno || 1),
	        				pagesize: vm.$refs.vList.pagesize,
	        				onSuccess: function(jqXHR, textStatus, response) {
	        					vm.rowsData = response.data;
	        					for(var i = 0; i < vm.rowsData.length;i++){
	        						vm.rowsData[i].CMobiles = vm.rowsData[i].CMobile;
                                    vm.rowsData[i].CCertfCdes = vm.rowsData[i].CCertfCde;
                                   /* vm.rowsData[i].CMobiles = vm.rowsData[i].CMobiles.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                                    vm.rowsData[i].CCertfCdes = vm.rowsData[i].CCertfCdes.replace(/(\d{1})\d{16}([0-9xX]{1})/, '$1****************$2');*/
								}
	        					vm.$refs.vList.total = response.total;
	        				}
	            		} );
    				},
    				add: function(idx, e) {
    					vm.$refs.vList.addData( idx, function(rowData, update) {
    						layer.open( {
    							type: 1,
    							title: "新增服务项目",
    							area: ["800px", "360px"],
    							content: $(vm.$el).find(".dialog"),
    							shadeClose: false,
    							scrollbar: false,
    							btn: [ "提交", "取消" ],
    							btn1: function(index, layero) {
    								issapi.post( {
    									method: "cusSerMgrAction.add",
    									data: newData,
    									onSuccess: function(jqXHR, textStatus, response) {
    										update(true);
    										layer.ok( response.message );
    										layer.close( index );
    									}
    								} );
    							},
    							end: function() {
    								update();
    							}
    						} );
    					} );
    				},
    				update: function(idx, e) {
    					vm.$refs.vList.updData( idx, function(rowData, update) {
    						layer.open( {
        						type: 1,
        						title: "修改服务项目",
        						area: ["800px", "360px"],
        						content: $(vm.$el).find(".dialog"),
        						shadeClose: false,
        						scrollbar: false,
        						btn: [ "提交", "取消" ],
        						btn1: function(index, layero) {
        							issapi.post( {
        		            			method: "cusSerMgrAction.update",
        		        				data: rowData,
        		        				onSuccess: function(jqXHR, textStatus, response) {
        		        					layer.ok( response.message );
        		        					layer.close( index );
        		        				}
        		            		} );
        						},
        						end: function() {
        							update();
        						}
        					 } );
    					} );
    				},
    				remove: function(idx, e) {
    					vm.$refs.vList.delData( idx, function() {
    						var delList = vm.$refs.vList.getDelList();
    						issapi.post( {
		            			method: "cusSerMgrAction.remove",
		        				data: delList,
		        				onSuccess: function(jqXHR, textStatus, response) {
		        					layer.ok( response.message );
		        				}
		            		} );
    					});
    				},
    				exportData: function() {
    					issapi.exportData( {
	            			method: "cusSerMgrAction.list",
	            			data: $.extend({ // titles用作导出excel的标题，cols用作从数据表中读取数据
		            				cols: ["CName", "CMobile", "CCertfCls", "CCertfCde","CEmail", "CSex", "CProName", "CBizId","NValidNum",
		            					"NInvalidNum", "TBgnTime", "TEngTime","CSource"],
		            				titles: ["客户姓名", "手机号", "证件类型", "证件号码", "邮箱", "性别", "服务项目", "订单号/保单号", "服务总次数", "已用服务次数","开始时间","结束时间","来源"]
		            			}, 
		            			vm.filter // 用作数据查询的条件
	            			),
	        				pageno: 1,//vm.$refs.vList.pageno, // 从第几页开始导出
	        				pagesize: 10000,//vm.$refs.vList.pagesize // 导出记录条数
	            		} );
    				}
    			}
            } );
		}
	};
	
} );