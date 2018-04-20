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
                	userFilter: {
                		CName: "",CMobile: ""
                	},
                	rowsData: [ {
                		CPatiNme: "", 
                		CMobile: "", 
                		CCertfCls: "", 
                		CCertfCde: "", 
                		CHosNme: "", 
                		CDeptNme: "", 
                		TVisitTm: "", 
                		TCancelTm: "", 
                		COrderStatus: "", 
                		CDesc: "", 
                		CCancelRsn: ""
                	} ],
                	userData: [ {
                		CUserId:"",
                		CName: "",//用户姓名
                		CMobile: "", // 电话号码
            			CCertfCls:"",
            			CCertfCde: ""
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
	            			method: "cusConsultMgrAction.list",
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
    					vm.updateStatus=false;
    					vm.$refs.vList.addData( idx, function(newData, update) {
    						layer.open( {
    							type: 1,
    							title: "新增远程会诊记录",
    							area: ["800px", "360px"],
    							content: $(vm.$refs.vList.$el).find(".dialog"),
    							shadeClose: false,
    							scrollbar: false,
    							btn: [ "提交", "取消" ],
    							btn1: function(index, layero) {
    								var name = newData.CPatiNme;
    								if(name ==""){
    									layer.warn("请先选择用户");
    									return false;
    								}
    								var vlist = vm.$refs.vList.validate();
    								if(vlist.length > 0){
    									layer.warn("请检查输入项");
    									return false;
    								}
    								issapi.post( {
    									method: "cusConsultMgrAction.add",
    									data: newData,
    									onSuccess: function(jqXHR, textStatus, response) {
    										newData.CPkId=response.data.CPkId;
    										update(true);
    										layer.ok( response.message );
    										layer.close( index );
    									}
    								} );
    							},
    							end: function() {
    								vm.$refs.vList.total--;
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
        						title: "修改远程会诊记录",
        						area: ["800px", "360px"],
        						content: $(vm.$refs.vList.$el).find(".dialog"),
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
        		            			method: "cusConsultMgrAction.update",
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
		            			method: "cusConsultMgrAction.remove",
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
	    						method: "cusConsultMgrAction.importData",
	    						cols: "CPatiNme,CMobile,CCertfCls,CCertfCde,CHosNme,CDeptNme,TVisitTm,TCancelTm,COrderStatus,CDesc,CCancelRsn",
	            				titles: "就诊人姓名,就诊人手机号,证件类型,证件号码,医院名称,科室名称,就诊时间,取消时间,预约类型,备注,取消原因"
	    					},
	    					template: "template-cus-consult.xls", // 指定模板名称供下载
	    					completeMsg: "远程会诊记录导入完成" // 导入完成后的提示文本
						}, function(files) { // 导入成功的文件数组[ {name:""} ]
							if (files.length) {
								// 可以调用查询方法刷新界面数据
								vm.list();
							}
						});
    				},
    				exportData: function() {
    					issapi.exportData( {
	            			method: "cusConsultMgrAction.list",
	            			data: $.extend({ // titles用作导出excel的标题，cols用作从数据表中读取数据
		            				cols: ["CPatiNme", "CMobile", "CCertfCls", "CCertfCde", "CHosNme", "CDeptNme",
		            					"TVisitTm", "TCancelTm","COrderStatus", "CDesc","CCancelRsn"],
		            				titles: ["就诊人姓名", "就诊人手机号", "证件类型", "证件号码",  "医院名称", "科室名称", "就诊时间", "取消时间", "预约类型","备注","取消原因"]
		            			}, 
		            			vm.filter // 用作数据查询的条件
	            			),
	        				pageno: 1,//vm.$refs.cusConsult.pageno, // 从第几页开始导出
	        				pagesize: 10000,//vm.$refs.cusConsult.pagesize // 导出记录条数
	            		} );
    				},
					listUser: function(pageno) {
    					issapi.post( {
	            			method: "cusSerMgrAction.listUser",
	            			data: vm.userFilter,
	        				pageno: vm.$refs.user.pageno=(pageno || 1),
	        				pagesize: vm.$refs.user.pagesize,
	        				onSuccess: function(jqXHR, textStatus, response) {
	        					vm.userData = response.data; 
	        					vm.$refs.user.total = response.total;
	        				}
	            		} );
    				},
					chooseUser: function(tar){
						this.listUser();
						layer.open( {
							type: 1,
							title: "选择用户：  ",
							area: ["900px", "600px"],
							content: $("#userDiv"),
							btn: ["提交","关闭" ],
							btn1: function(index, layero){
		    					var selList = vm.$refs.user.getSelList();
		    					if(selList.length != 1){
									layer.warn("请选择一条记录");
									return;
								}
		    					tar.CPatiNme = selList[0].CName;
		    					tar.CMobile = selList[0].CMobile;
		    					tar.CCertfCls = selList[0].CCertfCls;
		    					tar.CCertfCde = selList[0].CCertfCde;
		    					tar.CUserId = selList[0].CUserId;
		    					layer.close(index);
		    				},
							end: function() {
							}
						} );
					}
    			}
            } );
		}
	};
	
} );