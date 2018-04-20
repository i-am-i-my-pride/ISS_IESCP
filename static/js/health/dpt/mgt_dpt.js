;"use strict";

define( function(require, exports, module) {
	
	module.exports = {
		init : function() {
			var zTreeObj, zSelectedNode, zNodes =[{ id:0, pId:0, name:"机构管理", open: true}];
			
			var vm = new Vue( {
                el: "#pageDiv",
                data: {
                	filter: {
                		CParentCode: "",
                		CParentName: "",
                		CAllChildren: "",
                		COrganName: ""
                	},
                	rowsData: [ {
                		COrganCode: "", //机构代码 
                		CParentCode: "", //上级代码
                		COrganName: "", //机构名称
                		COrganTyp: "", //机构类型
                		CAddress: "", //地址 
                		CRelationPerson: "", //联系人
                		CRelationPhone: "", //联系电话
                		CRelationEmail: "", //联系邮箱
                		TBgnTime: "", //营业起期
                		TEngTime: "", //营业止期
                		CDetailedAddress: "", //具体地址
                		CTrafficWay: "", //交通方式
                		CIsPark: "", //可否停车（1为可停，0为不可停）
                		CCooperationStatus: "", //合作状态（1正常、0关闭）
                		CCrtCde: "", //创建人员
                		TCrtTm: "", //创建时间
                		CUpdCde: "", //修改人员 
                		TUpdTm: "", //修改时间
                	} ]
                },
    			methods: {
    				list: function(pageno) {
    					var vlist = vm.$refs.vFilter.validate();
						if(vlist.length > 0){
							layer.warn("您的输入非法,请重新输入");
							return false;
						}
    					issapi.post( {
	            			method: "dptMgrAction.list",
	            			data: vm.filter,
	        				pageno: vm.$refs.vList.pageno=(pageno || 1),
	        				pagesize: vm.$refs.vList.pagesize,
	        				onSuccess: function(jqXHR, textStatus, response) {
	        					vm.rowsData = response.data; 
	        					vm.$refs.vList.total = response.total;
	        				}
	            		} );
    				},
    				add: function(idx) {
    					vm.$refs.vList.addData( idx, function(rowData, callback) {
    						layer.open( {
    							type: 1,
    							title: "新增服务机构",
    							area: ["700px", "400px"],
    							content: $(vm.$el).find(".dialog"),
    							shadeClose: false,
    							scrollbar: false,
    							btn: [ "提交", "取消" ],
    							btn1: function(index, layero) {
    								var rst = vm.$refs.dptform.validate();
    								if (rst.length > 0) {
    									layer.warn("请检查输入项");
    									return false;
    								}
									rowData.CParentCode = vm.filter.CParentCode;
    								issapi.post( {
    									method: "dptMgrAction.add",
    									data: rowData,
    									onSuccess: function(jqXHR, textStatus, response) {
    										vm.list();
    										callback(true);
    										layer.ok( response.message );
    										layer.close( index );
											if (zSelectedNode) {
												zTreeObj.addNodes(zSelectedNode, response.data);
											}											
    									}
    								} );
    							},
    							end: function() {
    								callback();
    							}
    						} );
    					} );
    				},
    				update: function(idx) {
    					vm.$refs.vList.updData( idx, function(rowData, callback) {
    						if(rowData.CCooperationStatus=='1'){
    							layer.warn("已启用的机构不能修改");
    							return;
    						}
    						layer.open( {
        						type: 1,
        						title: "修改服务机构",
        						area: ["700px", "400px"],
        						content: $(vm.$el).find(".dialog"),
        						shadeClose: false,
        						scrollbar: false,
        						btn: [ "提交", "取消" ],
        						btn1: function(index, layero) {
        							var rst = vm.$refs.dptform.validate();
    								if (rst.length > 0) {
    									layer.warn("请检查输入项");
    									return false;
    								}
        							issapi.post( {
        		            			method: "dptMgrAction.update",
        		        				data: rowData,
        		        				onSuccess: function(jqXHR, textStatus, response) {
        		        					callback(true);
        		        					layer.ok( response.message );
        		        					layer.close( index );
											var node = zTreeObj.getNodesByParam("id", rowData.COrganCode, zSelectedNode)[0];
											node.name = rowData.COrganName;
											zTreeObj.updateNode(node);
        		        				}
        		            		} );
        						},
        						end: function() {
        							callback();
        						}
        					 } );
    					} );
    				},
    				see: function(idx) {
    					vm.$refs.vList.seeData( idx, function(rowData, callback) {
    						layer.open( {
        						type: 1,
        						title: "查看服务机构",
        						area: ["700px", "400px"],
        						content: $(vm.$refs.vList.$el).find(".dialog"),
        						shadeClose: false,
        						scrollbar: false,
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
    				cooperationON:function(idx){
						var delList = vm.$refs.vList.getSelList();
						if(delList.length < 1){
							layer.warn("请选择需要启用的机构");
							return;
						}
						issapi.post( {
	            			method: "dptMgrAction.cooperationON",
	        				data: delList,
	        				onSuccess: function(jqXHR, textStatus, response) {
	        					layer.ok( response.message );	     
	        					for(var l in delList){
	        						delList[l].CCooperationStatus="1";
	        					}   					
	        				}
	            		} );
					},
					cooperationOFF:function(idx){
   						var delList = vm.$refs.vList.getSelList();
						if(delList.length < 1){
							layer.warn("请选择需要禁用的机构");
							return;
						}
						issapi.post( {
	            			method: "dptMgrAction.cooperationOFF",
	        				data: delList,
	        				onSuccess: function(jqXHR, textStatus, response) {
	        					layer.ok( response.message );
	        					for(var l in delList){
	        						delList[l].CCooperationStatus="0";
	        					}
	        				}
	            		} );
					},
    				remove: function(idx) {
    					if(idx != undefined && vm.rowsData[idx].CCooperationStatus=='1'){
    						layer.warn("已启用的机构不能删除");
							return;
    					}
    					var selList = vm.$refs.vList.getSelList();
						for(var i = 0;i<selList.length;i++){
							if(selList[i].CCooperationStatus=='1'){
								layer.warn("已启用的机构不能删除");
								return;
							}
						}
						var theData = selList;
						if(idx != undefined){
							theData = vm.rowsData[idx];
						}
						issapi.post( {
	            			method: "dptMgrAction.isHasRelatDpt",
	        				data: theData,
	        				onSuccess: function(jqXHR, textStatus, response) {
	        					if(response.message != "无关联"){
	        						layer.warn(response.message);
	        						return;
	        					}else{
	        						vm.$refs.vList.delData( idx, function() {
	            						var delList = vm.$refs.vList.getDelList();
	            						issapi.post( {
	        		            			method: "dptMgrAction.remove",
	        		        				data: delList,
	        		        				onSuccess: function(jqXHR, textStatus, response) {
	        	        						layer.ok( response.message );
	        	        						for (var i=0; i<delList.length; i++) {
	        	        							zTreeObj.removeNode(zTreeObj.getNodesByParam("id", delList[i].COrganCode, zSelectedNode)[0]);
	        	        						}									
	        		        				}
	        		            		} );
	            					});
	        					}
	        				}
	            		} );
    				}
    			}
            } );
			
			var setting = {
				data: {
					simpleData: {
						enable: true
					}
				},
				callback: {
					onClick: function(event, treeId, treeNode) {
						zSelectedNode = treeNode;
						vm.filter.CParentCode = String(treeNode.id);
						vm.filter.CParentName = treeNode.name;
						vm.$nextTick( function () {
							vm.list();
						} );
					}
				}
			};
		   
			issapi.post( {
				method: "dptMgrAction.getServiceDptTree",
				data: null,
				onSuccess: function(jqXHR, textStatus, response) {
					zNodes = zNodes.concat(response.data);
					zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
					var nodes = zTreeObj.getNodes();
					zTreeObj.selectNode(nodes[0]);
					zTreeObj.setting.callback.onClick(null, zTreeObj.setting.treeId, nodes[0]);
				}
			} );
		}
	};
	
} );