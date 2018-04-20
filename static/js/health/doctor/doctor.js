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
                	} ],
                	district:[{
                		CCde: "110000",
                		CCnm: "北京市",
                		list: [{
                			CCde: "110100",
                			CCnm: "北京市",
                			list: []
                		}, {
                			CCde: "110200",
                			CCnm: "县",
                			list: []
                		}]
                	}, {
                		CCde: "120000",
                		CCnm: "天津市",
                		list: [{
                			CCde: "120100",
                			CCnm: "市辖区",
                			list: []
                		}, {
                			CCde: "120200",
                			CCnm: "县",
                			list: []
                		}]
                	}, {
                		CCde: "130000",
                		CCnm: "河北省",
                		list: [{
                			CCde: "130100",
                			CCnm: "石家庄市",
                			list: []
                		}, {
                			CCde: "130200",
                			CCnm: "唐山市",
                			list: []
                		}, {
                			CCde: "130300",
                			CCnm: "秦皇岛市",
                			list: []
                		}, {
                			CCde: "130400",
                			CCnm: "邯郸市",
                			list: []
                		}, {
                			CCde: "130500",
                			CCnm: "邢台市",
                			list: []
                		}, {
                			CCde: "130600",
                			CCnm: "保定市",
                			list: []
                		}, {
                			CCde: "130700",
                			CCnm: "张家口市",
                			list: []
                		}, {
                			CCde: "130800",
                			CCnm: "承德市",
                			list: []
                		}, {
                			CCde: "130900",
                			CCnm: "沧州市",
                			list: []
                		}, {
                			CCde: "131000",
                			CCnm: "廊坊市",
                			list: []
                		}, {
                			CCde: "131100",
                			CCnm: "衡水市",
                			list: []
                		}]
                	}, {
                		CCde: "140000",
                		CCnm: "山西省",
                		list: [{
                			CCde: "140100",
                			CCnm: "太原市",
                			list: []
                		}, {
                			CCde: "140200",
                			CCnm: "大同市",
                			list: []
                		}, {
                			CCde: "140300",
                			CCnm: "阳泉市",
                			list: []
                		}, {
                			CCde: "140400",
                			CCnm: "长治市",
                			list: []
                		}, {
                			CCde: "140500",
                			CCnm: "晋城市",
                			list: []
                		}, {
                			CCde: "140600",
                			CCnm: "朔州市",
                			list: []
                		}, {
                			CCde: "140700",
                			CCnm: "晋中市",
                			list: []
                		}, {
                			CCde: "140800",
                			CCnm: "运城市",
                			list: []
                		}, {
                			CCde: "140900",
                			CCnm: "忻州市",
                			list: []
                		}, {
                			CCde: "141000",
                			CCnm: "临汾市",
                			list: []
                		}, {
                			CCde: "141100",
                			CCnm: "吕梁市",
                			list: []
                		}]
                	}, {
                		CCde: "150000",
                		CCnm: "内蒙古",
                		list: [{
                			CCde: "150100",
                			CCnm: "呼和浩特市",
                			list: []
                		}, {
                			CCde: "150200",
                			CCnm: "包头市",
                			list: []
                		}, {
                			CCde: "150300",
                			CCnm: "乌海市",
                			list: []
                		}, {
                			CCde: "150400",
                			CCnm: "赤峰市",
                			list: []
                		}, {
                			CCde: "150500",
                			CCnm: "通辽市",
                			list: []
                		}, {
                			CCde: "150600",
                			CCnm: "鄂尔多斯市",
                			list: []
                		}, {
                			CCde: "150700",
                			CCnm: "呼伦贝尔市",
                			list: []
                		}, {
                			CCde: "150800",
                			CCnm: "巴彦淖尔市",
                			list: []
                		}, {
                			CCde: "150900",
                			CCnm: "乌兰察布市",
                			list: []
                		}, {
                			CCde: "152200",
                			CCnm: "兴安盟",
                			list: []
                		}, {
                			CCde: "152500",
                			CCnm: "锡林郭勒盟",
                			list: []
                		}, {
                			CCde: "152900",
                			CCnm: "阿拉善盟",
                			list: []
                		}]
                	}, {
                		CCde: "210000",
                		CCnm: "辽宁省",
                		list: [{
                			CCde: "210100",
                			CCnm: "沈阳市",
                			list: []
                		}, {
                			CCde: "210200",
                			CCnm: "大连市",
                			list: []
                		}, {
                			CCde: "210300",
                			CCnm: "鞍山市",
                			list: []
                		}, {
                			CCde: "210400",
                			CCnm: "抚顺市",
                			list: []
                		}, {
                			CCde: "210500",
                			CCnm: "本溪市",
                			list: []
                		}, {
                			CCde: "210600",
                			CCnm: "丹东市",
                			list: []
                		}, {
                			CCde: "210700",
                			CCnm: "锦州市",
                			list: []
                		}, {
                			CCde: "210800",
                			CCnm: "营口市",
                			list: []
                		}, {
                			CCde: "210900",
                			CCnm: "阜新市",
                			list: []
                		}, {
                			CCde: "211000",
                			CCnm: "辽阳市",
                			list: []
                		}, {
                			CCde: "211100",
                			CCnm: "盘锦市",
                			list: []
                		}, {
                			CCde: "211200",
                			CCnm: "铁岭市",
                			list: []
                		}, {
                			CCde: "211300",
                			CCnm: "朝阳市",
                			list: []
                		}, {
                			CCde: "211400",
                			CCnm: "葫芦岛市",
                			list: []
                		}]
                	}, {
                		CCde: "220000",
                		CCnm: "吉林省",
                		list: [{
                			CCde: "220100",
                			CCnm: "长春市",
                			list: []
                		}, {
                			CCde: "220200",
                			CCnm: "吉林市",
                			list: []
                		}, {
                			CCde: "220300",
                			CCnm: "四平市",
                			list: []
                		}, {
                			CCde: "220400",
                			CCnm: "辽源市",
                			list: []
                		}, {
                			CCde: "220500",
                			CCnm: "通化市",
                			list: []
                		}, {
                			CCde: "220600",
                			CCnm: "白山市",
                			list: []
                		}, {
                			CCde: "220700",
                			CCnm: "松原市",
                			list: []
                		}, {
                			CCde: "220800",
                			CCnm: "白城市",
                			list: []
                		}, {
                			CCde: "222400",
                			CCnm: "延边朝鲜族自治州",
                			list: []
                		}]
                	}, {
                		CCde: "230000",
                		CCnm: "黑龙江",
                		list: [{
                			CCde: "230100",
                			CCnm: "哈尔滨市",
                			list: []
                		}, {
                			CCde: "230200",
                			CCnm: "齐齐哈尔市",
                			list: []
                		}, {
                			CCde: "230300",
                			CCnm: "鸡西市",
                			list: []
                		}, {
                			CCde: "230400",
                			CCnm: "鹤岗市",
                			list: []
                		}, {
                			CCde: "230500",
                			CCnm: "双鸭山市",
                			list: []
                		}, {
                			CCde: "230600",
                			CCnm: "大庆市",
                			list: []
                		}, {
                			CCde: "230700",
                			CCnm: "伊春市",
                			list: []
                		}, {
                			CCde: "230800",
                			CCnm: "佳木斯市",
                			list: []
                		}, {
                			CCde: "230900",
                			CCnm: "七台河市",
                			list: []
                		}, {
                			CCde: "231000",
                			CCnm: "牡丹江市",
                			list: []
                		}, {
                			CCde: "231100",
                			CCnm: "黑河市",
                			list: []
                		}, {
                			CCde: "231200",
                			CCnm: "绥化市",
                			list: []
                		}, {
                			CCde: "232700",
                			CCnm: "大兴安岭地区",
                			list: []
                		}]
                	}, {
                		CCde: "310000",
                		CCnm: "上海市",
                		list: [{
                			CCde: "310100",
                			CCnm: "市辖区",
                			list: []
                		}, {
                			CCde: "310200",
                			CCnm: "县",
                			list: []
                		}]
                	}, {
                		CCde: "320000",
                		CCnm: "江苏省",
                		list: [{
                			CCde: "320100",
                			CCnm: "南京市",
                			list: []
                		}, {
                			CCde: "320200",
                			CCnm: "无锡市",
                			list: []
                		}, {
                			CCde: "320300",
                			CCnm: "徐州市",
                			list: []
                		}, {
                			CCde: "320400",
                			CCnm: "常州市",
                			list: []
                		}, {
                			CCde: "320500",
                			CCnm: "苏州市",
                			list: []
                		}, {
                			CCde: "320600",
                			CCnm: "南通市",
                			list: []
                		}, {
                			CCde: "320700",
                			CCnm: "连云港市",
                			list: []
                		}, {
                			CCde: "320800",
                			CCnm: "淮安市",
                			list: []
                		}, {
                			CCde: "320900",
                			CCnm: "盐城市",
                			list: []
                		}, {
                			CCde: "321000",
                			CCnm: "扬州市",
                			list: []
                		}, {
                			CCde: "321100",
                			CCnm: "镇江市",
                			list: []
                		}, {
                			CCde: "321200",
                			CCnm: "泰州市",
                			list: []
                		}, {
                			CCde: "321300",
                			CCnm: "宿迁市",
                			list: []
                		}]
                	}, {
                		CCde: "330000",
                		CCnm: "浙江省",
                		list: [{
                			CCde: "330100",
                			CCnm: "杭州市",
                			list: []
                		}, {
                			CCde: "330200",
                			CCnm: "宁波市",
                			list: []
                		}, {
                			CCde: "330300",
                			CCnm: "温州市",
                			list: []
                		}, {
                			CCde: "330400",
                			CCnm: "嘉兴市",
                			list: []
                		}, {
                			CCde: "330500",
                			CCnm: "湖州市",
                			list: []
                		}, {
                			CCde: "330600",
                			CCnm: "绍兴市",
                			list: []
                		}, {
                			CCde: "330700",
                			CCnm: "金华市",
                			list: []
                		}, {
                			CCde: "330800",
                			CCnm: "衢州市",
                			list: []
                		}, {
                			CCde: "330900",
                			CCnm: "舟山市",
                			list: []
                		}, {
                			CCde: "331000",
                			CCnm: "台州市",
                			list: []
                		}, {
                			CCde: "331100",
                			CCnm: "丽水市",
                			list: []
                		}]
                	}, {
                		CCde: "340000",
                		CCnm: "安徽省",
                		list: [{
                			CCde: "340100",
                			CCnm: "合肥市",
                			list: []
                		}, {
                			CCde: "340200",
                			CCnm: "芜湖市",
                			list: []
                		}, {
                			CCde: "340300",
                			CCnm: "蚌埠市",
                			list: []
                		}, {
                			CCde: "340400",
                			CCnm: "淮南市",
                			list: []
                		}, {
                			CCde: "340500",
                			CCnm: "马鞍山市",
                			list: []
                		}, {
                			CCde: "340600",
                			CCnm: "淮北市",
                			list: []
                		}, {
                			CCde: "340700",
                			CCnm: "铜陵市",
                			list: []
                		}, {
                			CCde: "340800",
                			CCnm: "安庆市",
                			list: []
                		}, {
                			CCde: "341000",
                			CCnm: "黄山市",
                			list: []
                		}, {
                			CCde: "341100",
                			CCnm: "滁州市",
                			list: []
                		}, {
                			CCde: "341200",
                			CCnm: "阜阳市",
                			list: []
                		}, {
                			CCde: "341300",
                			CCnm: "宿州市",
                			list: []
                		}, {
                			CCde: "341500",
                			CCnm: "六安市",
                			list: []
                		}, {
                			CCde: "341600",
                			CCnm: "亳州市",
                			list: []
                		}, {
                			CCde: "341700",
                			CCnm: "池州市",
                			list: []
                		}, {
                			CCde: "341800",
                			CCnm: "宣城市",
                			list: []
                		}]
                	}, {
                		CCde: "350000",
                		CCnm: "福建省",
                		list: [{
                			CCde: "350100",
                			CCnm: "福州市",
                			list: []
                		}, {
                			CCde: "350200",
                			CCnm: "厦门市",
                			list: []
                		}, {
                			CCde: "350300",
                			CCnm: "莆田市",
                			list: []
                		}, {
                			CCde: "350400",
                			CCnm: "三明市",
                			list: []
                		}, {
                			CCde: "350500",
                			CCnm: "泉州市",
                			list: []
                		}, {
                			CCde: "350600",
                			CCnm: "漳州市",
                			list: []
                		}, {
                			CCde: "350700",
                			CCnm: "南平市",
                			list: []
                		}, {
                			CCde: "350800",
                			CCnm: "龙岩市",
                			list: []
                		}, {
                			CCde: "350900",
                			CCnm: "宁德市",
                			list: []
                		}]
                	}, {
                		CCde: "360000",
                		CCnm: "江西省",
                		list: [{
                			CCde: "360100",
                			CCnm: "南昌市",
                			list: []
                		}, {
                			CCde: "360200",
                			CCnm: "景德镇市",
                			list: []
                		}, {
                			CCde: "360300",
                			CCnm: "萍乡市",
                			list: []
                		}, {
                			CCde: "360400",
                			CCnm: "九江市",
                			list: []
                		}, {
                			CCde: "360500",
                			CCnm: "新余市",
                			list: []
                		}, {
                			CCde: "360600",
                			CCnm: "鹰潭市",
                			list: []
                		}, {
                			CCde: "360700",
                			CCnm: "赣州市",
                			list: []
                		}, {
                			CCde: "360800",
                			CCnm: "吉安市",
                			list: []
                		}, {
                			CCde: "360900",
                			CCnm: "宜春市",
                			list: []
                		}, {
                			CCde: "361000",
                			CCnm: "抚州市",
                			list: []
                		}, {
                			CCde: "361100",
                			CCnm: "上饶市",
                			list: []
                		}]
                	}, {
                		CCde: "370000",
                		CCnm: "山东省",
                		list: [{
                			CCde: "370100",
                			CCnm: "济南市",
                			list: []
                		}, {
                			CCde: "370200",
                			CCnm: "青岛市",
                			list: []
                		}, {
                			CCde: "370300",
                			CCnm: "淄博市",
                			list: []
                		}, {
                			CCde: "370400",
                			CCnm: "枣庄市",
                			list: []
                		}, {
                			CCde: "370500",
                			CCnm: "东营市",
                			list: []
                		}, {
                			CCde: "370600",
                			CCnm: "烟台市",
                			list: []
                		}, {
                			CCde: "370700",
                			CCnm: "潍坊市",
                			list: []
                		}, {
                			CCde: "370800",
                			CCnm: "济宁市",
                			list: []
                		}, {
                			CCde: "370900",
                			CCnm: "泰安市",
                			list: []
                		}, {
                			CCde: "371000",
                			CCnm: "威海市",
                			list: []
                		}, {
                			CCde: "371100",
                			CCnm: "日照市",
                			list: []
                		}, {
                			CCde: "371200",
                			CCnm: "莱芜市",
                			list: []
                		}, {
                			CCde: "371300",
                			CCnm: "临沂市",
                			list: []
                		}, {
                			CCde: "371400",
                			CCnm: "德州市",
                			list: []
                		}, {
                			CCde: "371500",
                			CCnm: "聊城市",
                			list: []
                		}, {
                			CCde: "371600",
                			CCnm: "滨州市",
                			list: []
                		}, {
                			CCde: "371700",
                			CCnm: "菏泽市",
                			list: []
                		}]
                	}, {
                		CCde: "410000",
                		CCnm: "河南省",
                		list: [{
                			CCde: "410100",
                			CCnm: "郑州市",
                			list: []
                		}, {
                			CCde: "410200",
                			CCnm: "开封市",
                			list: []
                		}, {
                			CCde: "410300",
                			CCnm: "洛阳市",
                			list: []
                		}, {
                			CCde: "410400",
                			CCnm: "平顶山市",
                			list: []
                		}, {
                			CCde: "410500",
                			CCnm: "安阳市",
                			list: []
                		}, {
                			CCde: "410600",
                			CCnm: "鹤壁市",
                			list: []
                		}, {
                			CCde: "410700",
                			CCnm: "新乡市",
                			list: []
                		}, {
                			CCde: "410800",
                			CCnm: "焦作市",
                			list: []
                		}, {
                			CCde: "410900",
                			CCnm: "濮阳市",
                			list: []
                		}, {
                			CCde: "411000",
                			CCnm: "许昌市",
                			list: []
                		}, {
                			CCde: "411100",
                			CCnm: "漯河市",
                			list: []
                		}, {
                			CCde: "411200",
                			CCnm: "三门峡市",
                			list: []
                		}, {
                			CCde: "411300",
                			CCnm: "南阳市",
                			list: []
                		}, {
                			CCde: "411400",
                			CCnm: "商丘市",
                			list: []
                		}, {
                			CCde: "411500",
                			CCnm: "信阳市",
                			list: []
                		}, {
                			CCde: "411600",
                			CCnm: "周口市",
                			list: []
                		}, {
                			CCde: "411700",
                			CCnm: "驻马店市",
                			list: []
                		}]
                	}, {
                		CCde: "420000",
                		CCnm: "湖北省",
                		list: [{
                			CCde: "420100",
                			CCnm: "武汉市",
                			list: []
                		}, {
                			CCde: "420200",
                			CCnm: "黄石市",
                			list: []
                		}, {
                			CCde: "420300",
                			CCnm: "十堰市",
                			list: []
                		}, {
                			CCde: "420500",
                			CCnm: "宜昌市",
                			list: []
                		}, {
                			CCde: "420600",
                			CCnm: "襄樊市",
                			list: []
                		}, {
                			CCde: "420700",
                			CCnm: "鄂州市",
                			list: []
                		}, {
                			CCde: "420800",
                			CCnm: "荆门市",
                			list: []
                		}, {
                			CCde: "420900",
                			CCnm: "孝感市",
                			list: []
                		}, {
                			CCde: "421000",
                			CCnm: "荆州市",
                			list: []
                		}, {
                			CCde: "421100",
                			CCnm: "黄冈市",
                			list: []
                		}, {
                			CCde: "421200",
                			CCnm: "咸宁市",
                			list: []
                		}, {
                			CCde: "421300",
                			CCnm: "随州市",
                			list: []
                		}, {
                			CCde: "422800",
                			CCnm: "恩施土家族苗族自治州",
                			list: []
                		}, {
                			CCde: "429000",
                			CCnm: "省直辖行政单位",
                			list: []
                		}]
                	}, {
                		CCde: "430000",
                		CCnm: "湖南省",
                		list: [{
                			CCde: "430100",
                			CCnm: "长沙市",
                			list: []
                		}, {
                			CCde: "430200",
                			CCnm: "株洲市",
                			list: []
                		}, {
                			CCde: "430300",
                			CCnm: "湘潭市",
                			list: []
                		}, {
                			CCde: "430400",
                			CCnm: "衡阳市",
                			list: []
                		}, {
                			CCde: "430500",
                			CCnm: "邵阳市",
                			list: []
                		}, {
                			CCde: "430600",
                			CCnm: "岳阳市",
                			list: []
                		}, {
                			CCde: "430700",
                			CCnm: "常德市",
                			list: []
                		}, {
                			CCde: "430800",
                			CCnm: "张家界市",
                			list: []
                		}, {
                			CCde: "430900",
                			CCnm: "益阳市",
                			list: []
                		}, {
                			CCde: "431000",
                			CCnm: "郴州市",
                			list: []
                		}, {
                			CCde: "431100",
                			CCnm: "永州市",
                			list: []
                		}, {
                			CCde: "431200",
                			CCnm: "怀化市",
                			list: []
                		}, {
                			CCde: "431300",
                			CCnm: "娄底市",
                			list: []
                		}, {
                			CCde: "433100",
                			CCnm: "湘西土家族苗族自治州",
                			list: []
                		}]
                	}, {
                		CCde: "440000",
                		CCnm: "广东省",
                		list: [{
                			CCde: "440100",
                			CCnm: "广州市",
                			list: []
                		}, {
                			CCde: "440200",
                			CCnm: "韶关市",
                			list: []
                		}, {
                			CCde: "440300",
                			CCnm: "深圳市",
                			list: []
                		}, {
                			CCde: "440400",
                			CCnm: "珠海市",
                			list: []
                		}, {
                			CCde: "440500",
                			CCnm: "汕头市",
                			list: []
                		}, {
                			CCde: "440600",
                			CCnm: "佛山市",
                			list: []
                		}, {
                			CCde: "440700",
                			CCnm: "江门市",
                			list: []
                		}, {
                			CCde: "440800",
                			CCnm: "湛江市",
                			list: []
                		}, {
                			CCde: "440900",
                			CCnm: "茂名市",
                			list: []
                		}, {
                			CCde: "441200",
                			CCnm: "肇庆市",
                			list: []
                		}, {
                			CCde: "441300",
                			CCnm: "惠州市",
                			list: []
                		}, {
                			CCde: "441400",
                			CCnm: "梅州市",
                			list: []
                		}, {
                			CCde: "441500",
                			CCnm: "汕尾市",
                			list: []
                		}, {
                			CCde: "441600",
                			CCnm: "河源市",
                			list: []
                		}, {
                			CCde: "441700",
                			CCnm: "阳江市",
                			list: []
                		}, {
                			CCde: "441800",
                			CCnm: "清远市",
                			list: []
                		}, {
                			CCde: "441900",
                			CCnm: "东莞市",
                			list: []
                		}, {
                			CCde: "442000",
                			CCnm: "中山市",
                			list: []
                		}, {
                			CCde: "445100",
                			CCnm: "潮州市",
                			list: []
                		}, {
                			CCde: "445200",
                			CCnm: "揭阳市",
                			list: []
                		}, {
                			CCde: "445300",
                			CCnm: "云浮市",
                			list: []
                		}]
                	}, {
                		CCde: "450000",
                		CCnm: "广西省",
                		list: [{
                			CCde: "450100",
                			CCnm: "南宁市",
                			list: []
                		}, {
                			CCde: "450200",
                			CCnm: "柳州市",
                			list: []
                		}, {
                			CCde: "450300",
                			CCnm: "桂林市",
                			list: []
                		}, {
                			CCde: "450400",
                			CCnm: "梧州市",
                			list: []
                		}, {
                			CCde: "450500",
                			CCnm: "北海市",
                			list: []
                		}, {
                			CCde: "450600",
                			CCnm: "防城港市",
                			list: []
                		}, {
                			CCde: "450700",
                			CCnm: "钦州市",
                			list: []
                		}, {
                			CCde: "450800",
                			CCnm: "贵港市",
                			list: []
                		}, {
                			CCde: "450900",
                			CCnm: "玉林市",
                			list: []
                		}, {
                			CCde: "451000",
                			CCnm: "百色市",
                			list: []
                		}, {
                			CCde: "451100",
                			CCnm: "贺州市",
                			list: []
                		}, {
                			CCde: "451200",
                			CCnm: "河池市",
                			list: []
                		}, {
                			CCde: "451300",
                			CCnm: "来宾市",
                			list: []
                		}, {
                			CCde: "451400",
                			CCnm: "崇左市",
                			list: []
                		}]
                	}, {
                		CCde: "460000",
                		CCnm: "海南省",
                		list: [{
                			CCde: "460100",
                			CCnm: "海口市",
                			list: []
                		}, {
                			CCde: "460200",
                			CCnm: "三亚市",
                			list: []
                		}, {
                			CCde: "469000",
                			CCnm: "省直辖县级行政单位",
                			list: []
                		}]
                	}, {
                		CCde: "500000",
                		CCnm: "重庆市",
                		list: [{
                			CCde: "500100",
                			CCnm: "市辖区",
                			list: []
                		}, {
                			CCde: "500200",
                			CCnm: "县",
                			list: []
                		}, {
                			CCde: "500300",
                			CCnm: "市",
                			list: []
                		}]
                	}, {
                		CCde: "510000",
                		CCnm: "四川省",
                		list: [{
                			CCde: "510100",
                			CCnm: "成都市",
                			list: []
                		}, {
                			CCde: "510300",
                			CCnm: "自贡市",
                			list: []
                		}, {
                			CCde: "510400",
                			CCnm: "攀枝花市",
                			list: []
                		}, {
                			CCde: "510500",
                			CCnm: "泸州市",
                			list: []
                		}, {
                			CCde: "510600",
                			CCnm: "德阳市",
                			list: []
                		}, {
                			CCde: "510700",
                			CCnm: "绵阳市",
                			list: []
                		}, {
                			CCde: "510800",
                			CCnm: "广元市",
                			list: []
                		}, {
                			CCde: "510900",
                			CCnm: "遂宁市",
                			list: []
                		}, {
                			CCde: "511000",
                			CCnm: "内江市",
                			list: []
                		}, {
                			CCde: "511100",
                			CCnm: "乐山市",
                			list: []
                		}, {
                			CCde: "511300",
                			CCnm: "南充市",
                			list: []
                		}, {
                			CCde: "511400",
                			CCnm: "眉山市",
                			list: []
                		}, {
                			CCde: "511500",
                			CCnm: "宜宾市",
                			list: []
                		}, {
                			CCde: "511600",
                			CCnm: "广安市",
                			list: []
                		}, {
                			CCde: "511700",
                			CCnm: "达州市",
                			list: []
                		}, {
                			CCde: "511800",
                			CCnm: "雅安市",
                			list: []
                		}, {
                			CCde: "511900",
                			CCnm: "巴中市",
                			list: []
                		}, {
                			CCde: "512000",
                			CCnm: "资阳市",
                			list: []
                		}, {
                			CCde: "513200",
                			CCnm: "阿坝藏族羌族自治州",
                			list: []
                		}, {
                			CCde: "513300",
                			CCnm: "甘孜藏族自治州",
                			list: []
                		}, {
                			CCde: "513400",
                			CCnm: "凉山彝族自治州",
                			list: []
                		}]
                	}, {
                		CCde: "520000",
                		CCnm: "贵州省",
                		list: [{
                			CCde: "520100",
                			CCnm: "贵阳市",
                			list: []
                		}, {
                			CCde: "520200",
                			CCnm: "六盘水市",
                			list: []
                		}, {
                			CCde: "520300",
                			CCnm: "遵义市",
                			list: []
                		}, {
                			CCde: "520400",
                			CCnm: "安顺市",
                			list: []
                		}, {
                			CCde: "522200",
                			CCnm: "铜仁地区",
                			list: []
                		}, {
                			CCde: "522300",
                			CCnm: "黔西南布依族苗族自治州",
                			list: []
                		}, {
                			CCde: "522400",
                			CCnm: "毕节地区",
                			list: []
                		}, {
                			CCde: "522600",
                			CCnm: "黔东南苗族侗族自治州",
                			list: []
                		}, {
                			CCde: "522700",
                			CCnm: "黔南布依族苗族自治州",
                			list: []
                		}]
                	}, {
                		CCde: "530000",
                		CCnm: "云南省",
                		list: [{
                			CCde: "530100",
                			CCnm: "昆明市",
                			list: []
                		}, {
                			CCde: "530300",
                			CCnm: "曲靖市",
                			list: []
                		}, {
                			CCde: "530400",
                			CCnm: "玉溪市",
                			list: []
                		}, {
                			CCde: "530500",
                			CCnm: "保山市",
                			list: []
                		}, {
                			CCde: "530600",
                			CCnm: "昭通市",
                			list: []
                		}, {
                			CCde: "530700",
                			CCnm: "丽江市",
                			list: []
                		}, {
                			CCde: "530800",
                			CCnm: "思茅市",
                			list: []
                		}, {
                			CCde: "530900",
                			CCnm: "临沧市",
                			list: []
                		}, {
                			CCde: "532300",
                			CCnm: "楚雄彝族自治州",
                			list: []
                		}, {
                			CCde: "532500",
                			CCnm: "红河哈尼族彝族自治州",
                			list: []
                		}, {
                			CCde: "532600",
                			CCnm: "文山壮族苗族自治州",
                			list: []
                		}, {
                			CCde: "532800",
                			CCnm: "西双版纳傣族自治州",
                			list: []
                		}, {
                			CCde: "532900",
                			CCnm: "大理白族自治州",
                			list: []
                		}, {
                			CCde: "533100",
                			CCnm: "德宏傣族景颇族自治州",
                			list: []
                		}, {
                			CCde: "533300",
                			CCnm: "怒江傈僳族自治州",
                			list: []
                		}, {
                			CCde: "533400",
                			CCnm: "迪庆藏族自治州",
                			list: []
                		}]
                	}, {
                		CCde: "540000",
                		CCnm: "西　藏",
                		list: [{
                			CCde: "540100",
                			CCnm: "拉萨市",
                			list: []
                		}, {
                			CCde: "542100",
                			CCnm: "昌都地区",
                			list: []
                		}, {
                			CCde: "542200",
                			CCnm: "山南地区",
                			list: []
                		}, {
                			CCde: "542300",
                			CCnm: "日喀则地区",
                			list: []
                		}, {
                			CCde: "542400",
                			CCnm: "那曲地区",
                			list: []
                		}, {
                			CCde: "542500",
                			CCnm: "阿里地区",
                			list: []
                		}, {
                			CCde: "542600",
                			CCnm: "林芝地区",
                			list: []
                		}]
                	}, {
                		CCde: "610000",
                		CCnm: "陕西省",
                		list: [{
                			CCde: "610100",
                			CCnm: "西安市",
                			list: []
                		}, {
                			CCde: "610200",
                			CCnm: "铜川市",
                			list: []
                		}, {
                			CCde: "610300",
                			CCnm: "宝鸡市",
                			list: []
                		}, {
                			CCde: "610400",
                			CCnm: "咸阳市",
                			list: []
                		}, {
                			CCde: "610500",
                			CCnm: "渭南市",
                			list: []
                		}, {
                			CCde: "610600",
                			CCnm: "延安市",
                			list: []
                		}, {
                			CCde: "610700",
                			CCnm: "汉中市",
                			list: []
                		}, {
                			CCde: "610800",
                			CCnm: "榆林市",
                			list: []
                		}, {
                			CCde: "610900",
                			CCnm: "安康市",
                			list: []
                		}, {
                			CCde: "611000",
                			CCnm: "商洛市",
                			list: []
                		}]
                	}, {
                		CCde: "620000",
                		CCnm: "甘肃省",
                		list: [{
                			CCde: "620100",
                			CCnm: "兰州市",
                			list: []
                		}, {
                			CCde: "620200",
                			CCnm: "嘉峪关市",
                			list: []
                		}, {
                			CCde: "620300",
                			CCnm: "金昌市",
                			list: []
                		}, {
                			CCde: "620400",
                			CCnm: "白银市",
                			list: []
                		}, {
                			CCde: "620500",
                			CCnm: "天水市",
                			list: []
                		}, {
                			CCde: "620600",
                			CCnm: "武威市",
                			list: []
                		}, {
                			CCde: "620700",
                			CCnm: "张掖市",
                			list: []
                		}, {
                			CCde: "620800",
                			CCnm: "平凉市",
                			list: []
                		}, {
                			CCde: "620900",
                			CCnm: "酒泉市",
                			list: []
                		}, {
                			CCde: "621000",
                			CCnm: "庆阳市",
                			list: []
                		}, {
                			CCde: "621100",
                			CCnm: "定西市",
                			list: []
                		}, {
                			CCde: "621200",
                			CCnm: "陇南市",
                			list: []
                		}, {
                			CCde: "622900",
                			CCnm: "临夏回族自治州",
                			list: []
                		}, {
                			CCde: "623000",
                			CCnm: "甘南藏族自治州",
                			list: []
                		}]
                	}, {
                		CCde: "630000",
                		CCnm: "青海省",
                		list: [{
                			CCde: "630100",
                			CCnm: "西宁市",
                			list: []
                		}, {
                			CCde: "632100",
                			CCnm: "海东地区",
                			list: []
                		}, {
                			CCde: "632200",
                			CCnm: "海北藏族自治州",
                			list: []
                		}, {
                			CCde: "632300",
                			CCnm: "黄南藏族自治州",
                			list: []
                		}, {
                			CCde: "632500",
                			CCnm: "海南藏族自治州",
                			list: []
                		}, {
                			CCde: "632600",
                			CCnm: "果洛藏族自治州",
                			list: []
                		}, {
                			CCde: "632700",
                			CCnm: "玉树藏族自治州",
                			list: []
                		}, {
                			CCde: "632800",
                			CCnm: "海西蒙古族藏族自治州",
                			list: []
                		}]
                	}, {
                		CCde: "640000",
                		CCnm: "宁　夏",
                		list: [{
                			CCde: "640100",
                			CCnm: "银川市",
                			list: []
                		}, {
                			CCde: "640200",
                			CCnm: "石嘴山市",
                			list: []
                		}, {
                			CCde: "640300",
                			CCnm: "吴忠市",
                			list: []
                		}, {
                			CCde: "640400",
                			CCnm: "固原市",
                			list: []
                		}, {
                			CCde: "640500",
                			CCnm: "中卫市",
                			list: []
                		}]
                	}, {
                		CCde: "650000",
                		CCnm: "新　疆",
                		list: [{
                			CCde: "650100",
                			CCnm: "乌鲁木齐市",
                			list: []
                		}, {
                			CCde: "650200",
                			CCnm: "克拉玛依市",
                			list: []
                		}, {
                			CCde: "652100",
                			CCnm: "吐鲁番地区",
                			list: []
                		}, {
                			CCde: "652200",
                			CCnm: "哈密地区",
                			list: []
                		}, {
                			CCde: "652300",
                			CCnm: "昌吉回族自治州",
                			list: []
                		}, {
                			CCde: "652700",
                			CCnm: "博尔塔拉蒙古自治州",
                			list: []
                		}, {
                			CCde: "652800",
                			CCnm: "巴音郭楞蒙古自治州",
                			list: []
                		}, {
                			CCde: "652900",
                			CCnm: "阿克苏地区",
                			list: []
                		}, {
                			CCde: "653000",
                			CCnm: "克孜勒苏柯尔克孜自治州",
                			list: []
                		}, {
                			CCde: "653100",
                			CCnm: "喀什地区",
                			list: []
                		}, {
                			CCde: "653200",
                			CCnm: "和田地区",
                			list: []
                		}, {
                			CCde: "654000",
                			CCnm: "伊犁哈萨克自治州",
                			list: []
                		}, {
                			CCde: "654200",
                			CCnm: "塔城地区",
                			list: []
                		}, {
                			CCde: "654300",
                			CCnm: "阿勒泰地区",
                			list: []
                		}, {
                			CCde: "659000",
                			CCnm: "省直辖行政单位",
                			list: []
                		}]
                	}, {
                		CCde: "710000",
                		CCnm: "台湾省",
                		list: [{
                			CCde: "710001",
                			CCnm: "台北市",
                			list: []
                		}, {
                			CCde: "710003",
                			CCnm: "基隆市",
                			list: []
                		}]
                	}, {
                		CCde: "810000",
                		CCnm: "香　港",
                		list: [{
                			CCde: "810001",
                			CCnm: "香港",
                			list: []
                		}]
                	}, {
                		CCde: "820000",
                		CCnm: "澳　门",
                		list: [{
                			CCde: "820001",
                			CCnm: "澳门",
                			list: []
                		}]
                	}]
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
	            			method: "doctorMgrAction.list",
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
    							title: "新增医生信息",
    							area: ["800px", "500px"],
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
    									method: "doctorMgrAction.add",
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
    										vm.list();
    									}
    								} );
    							},
    							end: function() {
    								update();
    							}
    						} );
    					} );
    				},
    				uploadIcon: function(obj, e) {
    					issapi.upload({
							filters: {
								mime_types : [ //只允许上传图片文件
									{ title : "Image files", extensions : issapi.imageExtention }
								],								
								max_file_size : '500kb', //最大只能上传500kb的文件
								prevent_duplicates : true, //不允许选取重复文件
								multi_selection: true // 允许多选文件
							},
							max_number: 10, // 最大允许的上传数量
							files: obj.files, // 己有的文件
							save_path:"doctor"
						}, function(files, newlist, dellist) {
							// 上传成功的文件数组，可以用作下载时的参数：issapi.download(key)
							// files所有图片数组，newlist新上传图片数组，dellist删除的图片数组
							obj.$emit("changeval", files, e);
						});
    				},
    				see: function(idx,doctorId) {
    					issapi.post( {
	            			method: "doctorMgrAction.see",
	            			data : {"doctorId":doctorId},
	        				onSuccess: function(jqXHR, textStatus, response) {
	        					vm.rowsData[idx] = response.data;
	        					vm.$refs.vList.seeData( idx, function(rowsData, callback) {
	        						layer.open( {
	            						type: 1,
	            						title: "查看医生信息",
	            						area: ["800px", "500px"],
	            						content: $(vm.$el).find(".dialog"),
	            						btn: [ "关闭" ],
	            						btn1: function(index, layero) {
	            							layer.close( index );
	            						},
	            						end: function() {
	            							callback();
	            						}
	            					 } );
	        						layer.photos({
	        	        				photos: $(vm.$refs.vList.$el).find(".dialog"),
	        	        				anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
	        	        			}); 
	        					} );
	        				}
	            		} );
    				},
    				update: function(idx,doctorId) {
    					issapi.post( {
	            			method: "doctorMgrAction.see",
	            			data : {"doctorId":doctorId},
	        				onSuccess: function(jqXHR, textStatus, response) {
	        					vm.rowsData[idx] = response.data;
	        					vm.rowsData[idx].CStatus = "1";
	        					vm.$refs.vList.updData( idx, function(rowsData, callback) {
	        						layer.open( {
	            						type: 1,
	            						title: "修改医生信息",
	            						area: ["800px", "500px"],
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
	        									method: "doctorMgrAction.update",
	        									data: rowsData,
	        									onSuccess: function(jqXHR, textStatus, response) {
	        										if(response.message=="保存失败,客户编号不存在"){    											
	        											layer.error( response.message );
	        										}else{
	            										layer.ok( response.message );
	            										layer.close( index );
	            										vm.list();
	        										}
	        									}
	        								} );
	            						},
	            						end: function() {
	            							callback();
	            						}
	            					 } );
	        					} );
	        					
	        				}
	            		} );
    				},
    				updateStatus: function(idx,status) {
    					issapi.post( {
	            			method: "doctorMgrAction.updateStatus",
	            			data : {"doctorId":idx,"status":status},
	        				onSuccess: function(jqXHR, textStatus, response) {
	        					layer.closeAll();
								layer.ok( response.message );
								vm.list();
	        				}
	            		} );
    				},
    				remove: function(idx,doctorId) {
    					vm.$refs.vList.delData( idx, function() {
    						issapi.post( {
		            			method: "doctorMgrAction.remove",
		        				data: {"doctorId":doctorId},
		        				onSuccess: function(jqXHR, textStatus, response) {
		        					layer.ok( response.message );
		        				}
		            		} );
    					});
    				}
    			}
            } );
		}
	};
	
} );