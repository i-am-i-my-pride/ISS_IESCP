;"use strict";

define( function(require, exports, module) {
	
	module.exports = {
		init : function() {
			var vm = new Vue( {
                el: "#pageDiv",
                data: {
                	updateStatus:true,
                	filter: {
                		CPeopleName: "",CResMc: "",CRelationPhone: "",CResPackage: "",CResWay: ""
                	},
                	userFilter: {
                		CName: "",CMobile: ""
                	},
                	rowsData: [ {
                		TApptDate: "", 
                		CPeopleName: "", 
                		CCertfCls: "", 
                		CCertfCde: "", 
                		CRelationPhone: "",
                		CResMc: "", 
                		CResPackage: "", 
                		TCancelDate: "", 
                		CResWay: "", 
                		CCancelReason: "", 
                		CDesc: ""
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
	            			method: "cusInspectMgrAction.list",
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
    							title: "新增客户体检记录",
    							area: ["800px", "360px"],
    							content: $(vm.$refs.vList.$el).find(".dialog"),
    							shadeClose: false,
    							scrollbar: false,
    							btn: [ "提交", "取消" ],
    							btn1: function(index, layero) {
    								var name = newData.CPeopleName;
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
    									method: "cusInspectMgrAction.add",
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
        						title: "修改客户体检记录",
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
        		            			method: "cusInspectMgrAction.update",
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
		            			method: "cusInspectMgrAction.remove",
		        				data: delList,
		        				onSuccess: function(jqXHR, textStatus, response) {
		        					layer.ok( response.message );
		        				}
		            		} );
    					});
    				},
    				uploadReport: function() {
    					var selList = vm.$refs.vList.getSelList();
    					if(selList.length != 1){
							layer.warn("请选择一条记录进行上传操作");
							return;
						}
//    					layer.warn(selList[0].CPeopleName);
						issapi.upload({
							filters: {
								mime_types : [ //只允许上传图片文件
									{ title : "Image files", extensions : "jpg,gif,png" }, 
								    { title : "All files", extensions : "*" }
								],
								max_file_size : '500kb', //最大只能上传500kb的文件
								prevent_duplicates : true, //不允许选取重复文件
								multi_selection: false // 允许多选文件
							},
							max_number: 1, // 最大允许的上传数量
							files: [] // 己有的文件
						}, function(files, newlist, dellist) {
							// 上传成功的文件数组，可以用作下载时的参数：issapi.download(key)
							// files所有图片数组，newlist新上传图片数组，dellist删除的图片数组
							if (files.length) {
								selList[0].CReport = files[0];
								issapi.post( {
			            			method: "cusInspectMgrAction.uploadReport",
			        				data: selList,
			        				onSuccess: function(jqXHR, textStatus, response) {
			        					layer.ok( response.message );
			        				}
			            		} );
							}
						});
					},
					downloadReport: function(){
						var selList = vm.$refs.vList.getSelList();
    					if(selList.length != 1){
							layer.warn("请选择一条要下载的记录");
							return;
						}
    					if(""==selList[0].CReport){
    						layer.warn("此记录无体检报告");
    					}else{
    						issapi.download(selList[0].CReport);
    					}
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
		    					tar.CPeopleName = selList[0].CName;
		    					tar.CRelationPhone = selList[0].CMobile;
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