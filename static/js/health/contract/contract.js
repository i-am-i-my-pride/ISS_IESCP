;"use strict";

define( function(require, exports, module) {
	
	module.exports = {
		init : function() {
			var vm = new Vue( {
                el: "#pageDiv",
                data: {
                	updateStatus:true,
                	filter: {
                		COrganName: "",CContractName:"",CContractType:"",TBgnTime:""
                	},
                	dpts:[],//机构合约
                	rowsData: [ {
                		CContractCode: "", 
                		CContractName: "", 
                		CContractType: "", 
                		CConObjName: "", 
                		TSignedDate: "", 
                		CEarlyDays: "", 
                		CTermTyp: "",
                		TBgnTime: "", 
                		TEngTime: "", 
                		CDesc: ""
                	} ]
                },
                props: [],
                mounted: function() { // 页面加载后,vue挂载完成开始查询数据
                	this.$nextTick( function () {
	    				this.list();
	    				this.queryOrgan();
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
	            			method: "contractMgrAction.list",
	            			data: vm.filter,
	        				pageno: vm.$refs.vList.pageno=(pageno || 1),
	        				pagesize: vm.$refs.vList.pagesize,
	        				onSuccess: function(jqXHR, textStatus, response) {
	        					vm.rowsData = response.data; 
	        					vm.$refs.vList.total = response.total;
	        				}
	            		} );
    				},
    				queryOrgan:function(){
    					issapi.post( {
	            			method: "contractMgrAction.getOrgan",
	            			data: '',
	        				onSuccess: function(jqXHR, textStatus, response) {
	        					vm.dpts = response.data; 
	        				}
	            		} );
    				},
    				add: function(idx, e) {
    					vm.updateStatus=false;
    					vm.$refs.vList.addData( idx, function(newData, update) {
    						layer.open( {
    							type: 1,
    							title: "新增合约",
    							area: ["800px", "360px"],
    							content: $(vm.$el).find(".dialog"),
    							shadeClose: false,
    							scrollbar: false,
    							btn: [ "合约附件" ,"提交", "取消" ],
    							btn1: function() {
    								issapi.upload({
    									filters: {
    										mime_types : [ //只允许上传图片文件
    											{ title : "Image files", extensions : "jpg,gif,png,pdf" }, 
//    										    { title : "All files", extensions : "*" }
    										],
    										max_file_size : '1024kb', //最大只能上传500kb的文件
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
    							btn2: function(index, layero) {
    								var vlist = vm.$refs.vList.validate();
    								if(vlist.length > 0){
    									layer.warn("请检查输入项");
    									return false;	
    								}
    								issapi.post( {
    									method: "contractMgrAction.add",
    									data: newData,
    									onSuccess: function(jqXHR, textStatus, response) {
    										newData.CContractCode = response.data.CContractCode;
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
    					vm.updateStatus=true;
    					vm.$refs.vList.updData( idx, function(modData, update) {
    						layer.open( {
        						type: 1,
        						title: "修改合约",
        						area: ["800px", "360px"],
        						content: $(vm.$el).find(".dialog"),
        						shadeClose: false,
        						scrollbar: false,
        						btn: [ "合约附件","提交", "取消" ],
        						btn1: function() {
    								issapi.upload({
    									filters: {
    										mime_types : [ //只允许上传图片文件
    											{ title : "Image files", extensions : "jpg,gif,png,pdf" }, 
//    										    { title : "All files", extensions : "*" }
    										],
    										max_file_size : '1024kb', //最大只能上传500kb的文件
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
        						btn2: function(index, layero) {
        							var vlist = vm.$refs.vList.validate();
    								if(vlist.length > 0){
    									layer.warn("请检查输入项");
    									return false;
    								}
        							issapi.post( {
        		            			method: "contractMgrAction.update",
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
		            			method: "contractMgrAction.remove",
		        				data: delList,
		        				onSuccess: function(jqXHR, textStatus, response) {
		        					layer.ok( response.message );
		        				}
		            		} );
    					});
    				},
    				uploadReport: function() {
    					/*var selList = vm.$refs.vList.getSelList();
    					if(selList.length != 1){
							layer.warn("请选择一条记录进行上传操作");
							return;
						}*/
//    					layer.warn(selList[0].CPeopleName);
						issapi.upload({
							filters: {
								mime_types : [ //只允许上传图片文件
									{ title : "Image files", extensions : "jpg,gif,png" } 
//								    { title : "All files", extensions : "*" }
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
			            			method: "contractMgrAction.uploadReport",
			        				data: selList,
			        				onSuccess: function(jqXHR, textStatus, response) {
			        					layer.ok( response.message );
			        				}
			            		} );
							}
						});
					}
    			}
            } );
		}
	};
	
} );