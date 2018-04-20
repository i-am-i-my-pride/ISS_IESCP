;"use strict";

define( function(require, exports, module) {
	
	module.exports = {
		init : function() {
			var vm = new Vue( {
                el: "#pageDiv",
                data: {
                	filter: {
                		CPeopleName: "",CMobile:"",CHospitalName:"",CDeptName:"",CDoctorName:"",CApptType:"", COrderStatus: ""
                	},
                	userFilter: {
                		CName: "",CMobile: ""
                	},
                	updateStatus:true, //更新状态
                	rowsData: [ {
                		CPeopleName:"",CMobile:"",CCertfCls:"",CCertfCde:"",CApptTime:"",CApptType:"",
                		CHospitalName:"",CDeptName:"",COutpatientTyp:"",TTreatment:"",TCancelDate:"",
                		CCancelReason:"",TCrtTm:"",CDesc:"",CDoctorName:"",COrderStatus:"",
                		CDoctorId:"",CHospitalId:"",CDeptId:"",CUserId:"",CMobiles:"",CCertfCdes:""
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
    				see: function(idx) {
    					vm.$refs.vList.seeData( idx, function(rowData, callback) {
    						layer.open( {
        						type: 1,
        						title: "查看服务项目",
        						area: ["800px", "400px"],
        						content: $(vm.$refs.vList.$el).find(".dialog"),
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
    				add: function(idx) {
    					vm.updateStatus=false;
    					vm.$refs.vList.addData( idx, function(rowData, update) {
    						layer.open( {
    							type: 1,
    							title: "新增二次诊断项目",
    							area: ["800px", "400px"],
    							content: $(vm.$refs.vList.$el).find(".dialog"),
    							shadeClose: false,
    							scrollbar: false,
    							btn: [ "提交", "取消" ],
    							btn1: function(index, layero) {
    								var name = rowData.CPeopleName;
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
    									method: "cusSecondMgrAction.add",
    									data: rowData,
    									onSuccess: function(jqXHR, textStatus, response) {
    										if(response.message=="保存失败,客户编号不存在"){    											
    											layer.error( response.message );
    										}else{
    											rowData.CPkId = response.data.CPkId;
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
    				remove: function(idx) {
    					vm.$refs.vList.delData( idx, function() {
    						var delList = vm.$refs.vList.getDelList();
    						issapi.post( {
		            			method: "cusSecondMgrAction.remove",
		        				data: delList,
		        				onSuccess: function(jqXHR, textStatus, response) {
		        					layer.ok( response.message );
		        				}
		            		} );
    					});
    				},
    				update: function(idx) {
    					vm.updateStatus=true;
    					vm.$refs.vList.updData( idx, function(rowData, update) {
    						layer.open( {
        						type: 1,
        						title: "修改二次诊断项目",
        						area: ["800px", "400px"],
        						content: $(vm.$refs.vList.$el).find(".dialog"),
        						btn: [ "提交", "取消" ],
        						btn1: function(index, layero) {
        							var vlist = vm.$refs.vList.validate();
    								if(vlist.length > 0){
    									layer.warn("请检查输入项");
    									return false;
    								}
        							issapi.post( {
        		            			method: "cusSecondMgrAction.update",
        		        				data: rowData,
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
    				list: function(pageno) {
    					var vlist = vm.$refs.vFilter.validate();
						if(vlist.length > 0){
							layer.warn("您的输入非法,请重新输入");
							return false;
						}
    					issapi.post( {
	            			method: "cusSecondMgrAction.list",
	            			data: vm.filter,
	        				pageno: vm.$refs.vList.pageno=(pageno || 1),
	        				pagesize: vm.$refs.vList.pagesize,
	        				onSuccess: function(jqXHR, textStatus, response) {
	        					vm.rowsData = response.data;
                                for(var i = 0; i < vm.rowsData.length;i++){
                                    vm.rowsData[i].CMobiles = vm.rowsData[i].CMobile;
                                    vm.rowsData[i].CCertfCdes = vm.rowsData[i].CCertfCde;
                                    vm.rowsData[i].CMobiles = vm.rowsData[i].CMobiles.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                                    vm.rowsData[i].CCertfCdes = vm.rowsData[i].CCertfCdes.replace(/(\d{1})\d{16}([0-9xX]{1})/, '$1****************$2');
                                }
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
	    						method: "cusSecondMgrAction.importData",
	    						cols: "CPeopleName,CMobile,CCertfCls,CCertfCde,CApptTime,COutpatientTyp,CHospitalName,CDeptName,TTreatment,TCancelDate,COrderStatus,CDesc,CCancelReason",
		    					titles: "客户姓名,手机号,证件类型,证件号码,预约时间,门诊类型,医院名称,科室名称,就诊时间,取消时间,预约类型,备注,取消原因"
	    					},
	    					template: "template-cus-second.xls", // 指定模板名称供下载
	    					completeMsg: "客户二次诊断导入完成" // 导入完成后的提示文本
						}, function(files) { // 导入成功的文件数组[ {name:""} ]
							if (files.length) {
								// 可以调用查询方法刷新界面数据
								vm.list();
							}
						});
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