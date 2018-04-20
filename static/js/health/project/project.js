;"use strict";

define( function(require, exports, module) {
	/*require("service-dpt")
	 var a=1;*/
	module.exports = {
		init : function() {
			var vm = new Vue( {
				el: "#pageDiv",
				data: {
					updateStatus:true,
					filter: {
						CProjectName: "",
						TBgnTime:"",
						XZdalei1:"",
						XZdalei2:"",
						XZdalei3:"",
						XZdalei4:""
					},
					haha:"",
					ops:[{"CCde": "", "CCnm": "不限"},
						{"CCde": "1", "CCnm": "意健险"},
						{"CCde": "2", "CCnm": "车险"}],
					opss:[{"CCde": "", "CCnm": "请选择"},
						{"CCde": "11", "CCnm": "团体意外伤害险"},
						{"CCde": "12", "CCnm": "个人意外伤害险"}],
					opsss:[{"CCde": "", "CCnm": "请选择"},
						{"CCde": "21", "CCnm": "车强险"},
						{"CCde": "22", "CCnm": "客车乘客险"}],
					opsCB:[{"CCde": "", "CCnm": "全部"},
						{"CCde": "1", "CCnm": "黄冈中支营业一部"},
						{"CCde": "2", "CCnm": "黄冈中支营业二部"}],
					dptFilter: {
						COrganName: ""
					},
					outFilter: {
						CKindNo: ""
					},
					organ:[],//供应商列表
					dataswitch:['1'],
					updateOrgan:[{CCde:'',CCnm:''}],
					loss:['1'],
					XZdalei:"",
					rowsData: [ {    //json对象
						CProCode: "", //保单号
						CProjectName: "", //被保险人
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
						COrganCode: "", // 供应商
						CBorganize:"",  //承保机构
						XZname:"",
						BDstate:"",
					} ],
				},
				mounted: function() { // 页面加载后,vue挂载完成开始查询数据
					this.$nextTick( function () {  //$nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM，
						this.list();
						$(document).on('mouseover','.iss-list tr',function(){
							$('.iss-list .iss-input').css('cursor','pointer');
						});
						$(document).on('click','.iss-list tr',function(){
							if($(this).children(0).hasClass('selected')){
								$(this).children(0).eq(0).removeClass('selected');
							}else{
								$(this).children(0).eq(0).addClass('selected');
							}
						});
					} );
				},
				methods: {
					abc:function(idx){
						window.transferIdxs=idx;
//    					console.log(idx)
					},
					list: function(pageno,pagesize) {
						/*var vlist = vm.$refs.vFilter.validate();
						if(vlist.length > 0){
							layer.warn("您的输入非法,请重新输入");
							return false;
						}*/
//						console.log(vm.filter.CProjectName)
						issapi.post( {
							url: "/static/js/project-list.js",
//	            			method: "projectMgrAction.list",
							data: vm.filter,
							pageno: vm.$refs.vList.pageno=(pageno || 1), //默认显示第一页
							pagesize: vm.$refs.vList.pagesize=(pagesize || 5), //每页显示5条
							onSuccess: function(jqXHR, textStatus, response) {
								vm.rowsData = response.data;
								vm.$refs.vList.total = response.total;
//	        					console.log(response)
							}
						} );

					},
					change:function(){
						console.log(12144)
					},

					see: function(idx) {
						window.transferIdx=idx;
						issapi.open('page/nvhlclaim/report/report_list_son.html','录入报案信息');
					},
				}
			} );
		}
	};

} );