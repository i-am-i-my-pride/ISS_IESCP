;"use strict";

define( function(require, exports, module) {
	
	module.exports = {
		init : function() {
			var vm = new Vue( {
                el: "#pageDiv",
                data: {
                	filter: {
                		CHosNme: ""
                	},
                	rowsData: [ {
                		CHosNme: "", 
                		CHosAddr: "", 
                		CHosLvl: "", 
                		CCity: ""
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
	            			method: "hospitalMgrAction.list",
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
    					vm.$refs.vList.addData( idx, function(newData, update) {
    						layer.open( {
    							type: 1,
    							title: "新增医院",
    							area: ["800px", "360px"],
    							content: $(vm.$el).find(".dialog"),
    							shadeClose: false,
    							scrollbar: false,
    							btn: [ "提交", "取消" ],
    							btn1: function(index, layero) {
    								issapi.post( {
    									method: "hospitalMgrAction.add",
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
    					vm.$refs.vList.updData( idx, function(modData, update) {
    						layer.open( {
        						type: 1,
        						title: "修改医院",
        						area: ["800px", "360px"],
        						content: $(vm.$el).find(".dialog"),
        						shadeClose: false,
        						scrollbar: false,
        						btn: [ "提交", "取消" ],
        						btn1: function(index, layero) {
        							issapi.post( {
        		            			method: "hospitalMgrAction.update",
        		        				data: modData,
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
		            			method: "hospitalMgrAction.remove",
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
	    						method: "hospitalMgrAction.importData",
	    						cols: "CHosNme,CHosAddr,CHosLvl,CCity",
	            				titles: "医院名称,医院地址,医院等级,城市"
	    					},
	    					template: "template-hospital.xls", // 指定模板名称供下载
	    					completeMsg: "医院清单导入完成" // 导入完成后的提示文本
						}, function(files) { // 导入成功的文件数组[ {name:""} ]
							if (files.length) {
								// 可以调用查询方法刷新界面数据
								vm.list();
							}
						});
    				},
    				exportData: function() {
    					issapi.exportData( {
	            			method: "hospitalMgrAction.list",
	            			data: $.extend({ // titles用作导出excel的标题，cols用作从数据表中读取数据
		            				cols: ["CHosNme", "CHosAddr", "CHosLvl", "CCity"],
		            				titles: ["医院名称","医院地址","医院等级","城市"]
		            			}, 
		            			vm.filter // 用作数据查询的条件
	            			),
	        				pageno: 1,//vm.$refs.hospital.pageno, // 从第几页开始导出
	        				pagesize: 10000,//vm.$refs.hospital.pagesize // 导出记录条数
	            		} );
    				}
    			}
            } );
		}
	};
	
} );