;"use strict";

define( function(require, exports, module) {
	
	module.exports = {
		init : function() {
			var vm = new Vue( {
                el: "#pageDiv",
                data: {
                	updateStatus:true,
                	filter: {
                		CUserName: "",CHospitalName: "",CMobile: "",CDeptName: "",COrderStatus: ""
                	},
                	rowsData: [ {
                		CUserName: "", 
                		CMobile: "", 
                		CCertfCls: "", 
                		CCertfCde: "", 
                		CHospitalName: "", 
                		CDeptName: "", 
                		CWard: "",
                		TUsedTm: "", 
                		TCancelDate: "", 
                		COrderStatus: "", 
                		CDesc: "", 
                		CCancelReason: ""
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
	            			method: "cusStrickenGpMgrAction.list",
	            			data: vm.filter,
	        				pageno: vm.$refs.vList.pageno=(pageno || 1),
	        				pagesize: vm.$refs.vList.pagesize,
	        				onSuccess: function(jqXHR, textStatus, response) {
	        					vm.rowsData = response.data; 
	        					vm.$refs.vList.total = response.total;
	        				}
	            		} );
    				},
    				add: function(idx, e) {
    					vm.updateStatus = false;
    					vm.$refs.vList.addData( idx, function(newData, update) {
    						layer.open( {
    							type: 1,
    							title: "新增住院手术安排记录",
    							area: ["800px", "360px"],
    							content: $(vm.$el).find(".dialog"),
    							shadeClose: false,
    							scrollbar: false,
    							btn: [ "提交", "取消" ],
    							btn1: function(index, layero) {
    								var vlist = vm.$refs.vList.validate();
    								if(vlist.length > 0){
    									layer.warn("请检查输入项");
    									return false;
    								}
    								issapi.post( {
    									method: "cusStrickenGpMgrAction.add",
    									data: newData,
    									onSuccess: function(jqXHR, textStatus, response) {
    										if(response.message=="保存失败,客户编号不存在"){    											
    											layer.error( response.message );
    										}else{
    											newData.CPkId=response.data.CPkId;
        										update(true);
        										layer.ok( response.message );
        										layer.close( index );
    										}
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
    					vm.updateStatus=true;
    					vm.$refs.vList.updData( idx, function(modData, update) {
    						layer.open( {
        						type: 1,
        						title: "修改住院手术安排记录",
        						area: ["800px", "360px"],
        						content: $(vm.$el).find(".dialog"),
        						shadeClose: false,
        						scrollbar: false,
        						btn: [ "提交", "取消" ],
        						btn1: function(index, layero) {
        							var vlist = vm.$refs.vList.validate();
    								if(vlist.length > 0){
    									layer.warn("请检查输入项");
    									return false;
    								}
        							issapi.post( {
        		            			method: "cusStrickenGpMgrAction.update",
        		        				data: modData,
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
    				remove: function(idx, e) {
    					vm.$refs.vList.delData( idx, function() {
    						var delList = vm.$refs.vList.getDelList();
    						issapi.post( {
		            			method: "cusStrickenGpMgrAction.remove",
		        				data: delList,
		        				onSuccess: function(jqXHR, textStatus, response) {
		        					layer.ok( response.message );
		        				}
		            		} );
    					});
    				},
    				importData: function() {
    					issapi.importData({
							filters: {
								mime_types : [ //只允许上传excel文件
									{ title : "Excel files", extensions : "xls,xlsx" }
								],
								max_file_size : '10240kb', //最大只能上传10240kb的文件
								prevent_duplicates : true //不允许选取重复文件
							},
							multi_selection: true, // 允许多选文件
	    					multipart_params: { // 附加参数
	    						method: "cusStrickenGpMgrAction.importData"
	    					},
	    					template: "template-cus-stricken.xls", // 指定模板名称供下载
	    					completeMsg: "住院手术安排记录导入完成" // 导入完成后的提示文本
						}, function(files) { // 导入成功的文件数组[ {name:""} ]
							if (files.length) {
								// 可以调用查询方法刷新界面数据
								vm.list();
							}
						});
    				},
    				exportData: function() {
    					issapi.exportData( {
	            			method: "cusStrickenGpMgrAction.list",
	            			data: $.extend({ // titles用作导出excel的标题，cols用作从数据表中读取数据
		            				cols: ["CUserName", "CMobile", "CCertfCls", "CCertfCde", "TApptDate", "CHospitalName", "CDeptName",
		            					"TUsedTm", "TCancelDate", "COrderStatus","CDesc","CCancelReason"],
		            				titles: ["就诊人姓名", "手机号", "证件类型", "证件号码", "预约住院时间", "医院名称", "科室名称", "使用时间", "取消时间", "预约类型","备注","取消原因"]
		            			}, 
		            			vm.filter // 用作数据查询的条件
	            			),
	        				pageno: 1,//vm.$refs.cusStricken.pageno, // 从第几页开始导出
	        				pagesize: 10000,//vm.$refs.cusStricken.pagesize // 导出记录条数
	            		} );
    				}
    			}
            } );
		}
	};
	
} );