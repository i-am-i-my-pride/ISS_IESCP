;"use strict";

define( function(require, exports, module) {
	
	module.exports = {
		init : function() {
			var vm = new Vue( {
                el: "#pageDiv",
                data: {
                	filter: {
                		COutProdName: "",CCardNo: "",CChlName: "",TCrtTm: ""
                	},
                	rowsData: [ {
                		COutProdName: "", 
                		CCardNo: "", 
                		CChlName: "", 
                		TCrtTm: "", 
                		TBgnTime: "", 
                		TEndTime: "", 
                		CCheckCde: "", 
                		CStatus: ""
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
	            			method: "cardMgrAction.list",
	            			data: vm.filter,
	        				pageno: vm.$refs.vList.pageno=(pageno || 1),
	        				pagesize: vm.$refs.vList.pagesize,
	        				onSuccess: function(jqXHR, textStatus, response) {
	        					vm.rowsData = response.data; 
	        					vm.$refs.vList.total = response.total;
	        				}
	            		} );
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
	    						method: "cardMgrAction.importData",
	    						cols: "COutProdName,CCardNo,CChlName,TCrtTm,TBgnTime,TEndTime,CCheckCde,CStatus",
	            				titles: "产品名称,卡券编号,渠道名称,创建时间,有效起期,有效止期,验证码,状态"
	    					},
	    					template: "template-teeth-card.xls", // 指定模板名称供下载
	    					completeMsg: "洁牙服务卡导入完成" // 导入完成后的提示文本
						}, function(files) { // 导入成功的文件数组[ {name:""} ]
							if (files.length) {
								// 可以调用查询方法刷新界面数据
								vm.list();
							}
						});
    				},
    				exportData: function() {
    					issapi.exportData( {
	            			method: "cardMgrAction.list",
	            			data: $.extend({ // titles用作导出excel的标题，cols用作从数据表中读取数据
		            				cols: ["COutProdName", "CCardNo", "CChlName", "TCrtTm", "TBgnTime",
		            					"TEndTime","CCheckCde","CStatus"],
		            				titles: ["产品名称","卡券编号","渠道名称","创建时间","有效起期","有效止期","验证码","状态"]
		            			}, 
		            			vm.filter // 用作数据查询的条件
	            			),
	        				pageno: 1,//vm.$refs.cardmsg.pageno, // 从第几页开始导出
	        				pagesize: 10000,//vm.$refs.cardmsg.pagesize // 导出记录条数
	            		} );
    				}
    			}
            } );
		}
	};
	
} );