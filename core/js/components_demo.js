;"use strict";

define( function(require, exports, module) {
	module.exports = {
		init : function() {			
			var vm = new Vue( {
                el: "#pageDiv",
                data: {
                	filter:{
                		DStatus:"",
                    	CStatus:""
                	},
                	abc:"",
                	dataSourceDemo: [
                        {"CCde": "111", "CCnm": "天河区"},
                        {"CCde": "112", "CCnm": "白云区"},
                        {"CCde": "113", "CCnm": "黄埔区"},
                        {"CCde": "114", "CCnm": "越秀区"}
                    ],
                    dataSourceDemo1: [
                        {
                            "CCde": "11",
                            "CCnm": "广州市",
                            "list": [
                                {"CCde": "111", "CCnm": "天河区","list":[{"CCde": "1111", "CCnm": "高普路"}]},
                                {"CCde": "112", "CCnm": "白云区"},
                                {"CCde": "113", "CCnm": "黄埔区"},
                                {"CCde": "114", "CCnm": "越秀区"}
                            ]
                        },
                        {
                            "CCde": "12",
                            "CCnm": "深圳市",
                            "list": [
                                {"CCde": "121", "CCnm": "南山区"},
                                {"CCde": "122", "CCnm": "福田区"},
                                {"CCde": "123", "CCnm": "罗湖区"},
                                {"CCde": "124", "CCnm": "龙岗区"}
                            ]
                        }
                    ],
                    rowsDatas: [ 
                        {id:1, pId:0, name:"董事长", open:true},
                        {id:101, pId:1, name:"副董1"},
                        {id:102, pId:1, name:"副董2"},
                        {id:103, pId:1, name:"副董3"},
                        {id:10101, pId:101, name:"行政部"},
                        {id:10102, pId:101, name:"财务部"},            
                        {id:10103, pId:101, name:"业务部"},
                        {id:10104, pId:101, name:"生产部"},
                        {id:10201, pId:102, name:"后勤部"},
                        {id:10202, pId:102, name:"人事部"},
                        {id:10203, pId:102, name:"技术部"}
                    ],
                    rowsData: [ {
                		CProCode: "", //项目编码
                		CProjectName: "", //项目名称
                		CIcon: "", //图标
                		CUrl: "", //URL
                		CDeductionWay: "", //扣减方式(01-次数，02-金额)
                		NNum: "", //次数
                		NAmt: "", //金额
                		TBgnTime: "", //有效起期
                		TEngTime: "", //有效止期
                		NPrice: "", //售价
                		CSex: "", //适用性别
                		NMinAge: "", //适用最小年龄
                		NMaxAge: "", //适用最大年龄 
                		CSynopsis: "", //简介
                		NCostPrice: "", //成本价
                		CEnabledState: null, //启用标志(0禁用，1启用)
                		CIssueStatus: null, //启用标志(0未发布，1已发布)
                		CCrtCde: "", //创建人员
                		TCrtTm: "", //创建时间
                		CUpdCde: "", //修改人员
                		TUpdTm: "", //修改时间
                		CType: "", // 类型
                		COrganCode: "" // 供应商
                	} ],
                	BBcheckbox:["张三丰","刘德华","陈奕迅","王健林","马云"],
                	BBcheckbox1:"",
                	fromData: [ //穿梭表模拟源数据
                        {
                            text1: "源列表",
                            text2: "目的列表",
                            type: [{
                                id: "1",
                                text: "数据1"
                            }, {
                                id: "2",
                                text: "数据2"
                            }, {
                                id: "3",
                                text: "数据3"
                            }, {
                                id: "4",
                                text: "数据4"
                            }, {
                                id: "5",
                                text: "数据5"
                            }, {
                                id: "6",
                                text: "数据6"
                            }, {
                                id: "7",
                                text: "数据7"
                            }, {
                                id: "8",
                                text: "数据8"
                            }, {
                                id: "9",
                                text: "数据9"
                            }, {
                                id: "10",
                                text: "数据10"
                            }, {
                                id: "11",
                                text: "数据11"
                            }, {
                                id: "12",
                                text: "数据12"
                            }, {
                                id: "13",
                                text: "数据13"
                            }]
                        }
                    ],
                    toData: [], //穿梭表模拟目的数据
                },
                mounted:function(){
                	this.$nextTick( function () {
                        this.list();
                    } );              	
                },
    			methods: {
    				list: function(pageno,pagesize) {
                        issapi.post( {
                            method: "projectMgrAction.list",
                            data: vm.filter,
                            pageno: vm.$refs.dpt.pageno=(pageno || 1),
                            pagesize: vm.$refs.dpt.pagesize=(pagesize || 10),
                            onSuccess: function(jqXHR, textStatus, response) {
                                vm.rowsData = response.data; 
                                vm.$refs.dpt.total = response.total;
                            }
                        } );
                     },
                     getBBren: function() { 
     					layer.open( {
 							type: 1,
 							title: "我是一个弹窗标题",
 							area: ["700px", "440px"],
 							content: $("#BBren"),
 							shadeClose: false,
 							scrollbar: false,
 							btn: [ "确定", "取消" ],
 							btn1: function(index,layero) {
 								layer.close(index);
 							},
 							end: function() {
 								layer.msg('完成操作', {icon: 1});  // 不是必需
 							}
 						} );
     				},
    				uploadIcon: function(obj, e) {
//    					layer.warn("您的输入非法,请重新输入");    				
    					issapi.upload({
							filters: {
								mime_types : [ //只允许上传图片文件
									{ title : "Image files", extensions : issapi.imageExtention }//图片后缀
									//{ title : "All files", extensions : "*" }//所有文件，不过滤
								],
								max_file_size : '1024kb', //最大只能上传500kb的文件
								prevent_duplicates : true //不允许选取重复文件
							},
							multi_selection: true, // 允许多选文件
							max_number: 1, // 最大允许的上传数量
							files: obj.files, // 己有的文件
							save_path:"project/CIcon" //上传路径
						}, function(files, newlist, dellist) {
							// 上传成功的文件数组，可以用作下载时的参数：issapi.download(key)
							// files所有图片数组，newlist新上传图片数组，dellist删除的图片数组
							obj.$emit("changeval", files, e);
						}, function(files, dellist) { // 图片删除成功后的回调
							layer.alert('剩余图片：' + JSON.stringify(files));
							layer.alert('已删除图片：' + JSON.stringify(dellist));
							return true; // return true 表示需要从服务器删除此图片，否则不删除
						});
    				}
    			}
            } );
			var setting = {
					data: {
						simpleData: {
							enable: true, //表示使用简单数据模式
						}
					},
					callback: { //返回函数; 根据需求选择合适的监听事件
						onClick: function (treeId, treeNode) { // onClick展开树
							var zTree = $.fn.zTree.getZTreeObj("tree");
						}
					}
				};
				$.fn.zTree.init($("#treeDemo"), setting, vm.rowsDatas);
		}
	};
	
} );