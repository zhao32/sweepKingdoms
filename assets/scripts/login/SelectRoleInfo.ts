//随机人物名字
var heroNames = [
	"河南",
	"河北",
	"北平",
	"天津",
	"山东",
	"山西",
	"吉林",
	"辽宁",
	"浙江",
	"江苏",
	"上海",
	"安徽",
	"江西",
	"湖南",
	"湖北",
	"新疆",
	"云南",
	"贵州",
	"福建",
	"台湾",
	"宁夏",
	//"西藏",
	"四川",
	"重庆",
	"内蒙",
	"海南",
	"青海",
	"甘肃",
	"湖北",
	"新疆",
	"陕西",
	"广东",
	"广西",
	"香港",
	"澳门",
	"东北",
	"西南",
	"西北",
	"南方",
	"北方",
	"大漠",
	"岛国",
	"城阳",
	"荆州",
	"勃海",
	"南阳",
	"沭阳",
	"荥阳",
	"赵郡",
	"临川",
	"临渝",
	"幽州",
	"信都",
	"济阴",
	"济南",
	"桂阳",
	"常山",
	"夏口",
	"柴桑",
	"逍遥",
	"徐州",
	"胶东",
	"高阳",
	"益州",
	"州郡",
	"凉州",
	"琅邪",
	"梓潼",
	"斜谷",
	"清河",
	"涿郡",
	"淮阳",
	"淮南",
	"渔阳",
	"涪陵",
	"梁国",
	"博陵",
	"博望",
	"葭荫",
	"街亭",
	"颖川",
	"鲁郡",
	"敦煌",
	"零陵",
	"蜀郡",
	"雍州",
	"鄱阳",
	"谯郡",
	"豫章",
	"冀州",
	"襄阳",
	"九江",
	"下邳",
	"上郡",
	"上党",
	"上庸",
	"山阳",
	"广陵",
	"小沛",
	"天水",
	"太原",
	"中山",
	"长沙",
	"乌林",
	"巴东",
	"巴郡",
	"平原",
	"东平",
	"东郡",
	"东莞",
	"东海",
	"北地",
	"代郡",
	"白马",
	"白帝",
	"汉中",
	"永昌",
	"弘农",
	"辽东",
	"辽西",
	"西河",
	"扬州",
	"夷陵",
	"华容",
	"延津",
	"合浦",
	"会稽",
	"交州",
	"齐郡",
	"并州",
	"江夏",
	"江州",
	"汝南",
	"安定",
	"祁山",
	"阳关",
	"阳平",
	"阴平",
	"麦城",
	"苍梧",
	"赤壁",
	"邺城",
	"东吴",
	"庐江",
	"庐陵",
	"沛国",
	"汶山",
	"陇西",
	"陈仓",
	"陈国",
	"陈留",
	"昭陵",
	"青州",
	"青溪",
	"武乡",
	"武昌",
	"武威",
	"武都",
	"武陵",
	"郁林",
	"昌邑",
	"昌黎",
	"金城",
	"京城",
	"兖州",
	"河内",
	"河东",
	"河间",
	"河南",
	"泸水",
	"官渡",
	"房陵",
	"建业",
	"建宁",
	"建安",
	"始兴",
	"始安",
	"桃城",
	"怀安",
	"顺平",
	"鹿泉",
	"沁水",
	"抚远",
	"汤原",
	"江源",
	"林口",
	"涟水",
	"桐乡",
	"丹徒",
	"丹阳",
	"淳安",
	"金湖",
	"温州",
	"兰溪",
	"上虞",
	"龙城",
	"开化",
	"新昌",
	"潜山",
	"来安",
	"定远",
	"相山",
	"连江",
	"太和",
	"无为",
	"含山",
	"思明",
	"杏林",
	"松溪",
	"延平",
	"建宁",
	"陇南",
	"金溪",
	"平邑",
	"兰山",
	"上饶",
	"黎川",
	"崇仁",
	"横川",
	"遂平",
	"泰山",
	"华山",
	"衡山",
	"恒山",
	"嵩山",
	"黄山",
	"峨眉",
	"崆峒",
	"少林",
	"灵隐",
	"虎跑",
	"雁荡",
	"楠溪",
	"武当",
	"普陀",
	"龙华",
	"天山",
	"佘山",
	"黄埔",
	"杨浦",
	"哥大",
	"复旦",
	"定西",
	"西湖",
	"热河",
	"云岩",
	"花溪",
	"平阳",
	"东阳",
];

var heroCities = [
	"孤独的",
	"狂傲的",
	"傲娇的",
	"自信的",
	"热血的",
	"谨慎的",
	"荒唐的",
	"粗心的",
	"仗义的",
	//"邪恶的",
	//"贪婪的",
	"大方的",
	"善良的",
	"固执的",
	"负心的",
	"忠诚的",
	//"阴险的",
	//"狡猾的",
	"坚强的",
	"正义的",
	"柔弱的",
	"愚蠢的",
	"强壮的",
	"瘦弱的",
	//"邪恶的",
	//"无耻的",
	"内向的",
	"阳光的",
	"可爱的",
	"机智的",
	"平凡的",
	"爽朗的",
	"肥胖的",
	"年老的",
	"年轻的",
	//"幼齿的",
	"腼腆的",
	"多嘴的",
	"爱笑的",
	"高大的",
	"矮小的",
	"精瘦的",
	//"美艳的",
	"木讷的",
	"无知的",
	"潇洒的",
	//"风流的",
	"不羁的",
	"坚毅的",
	"二次元",
	//"嗜血的",
	//"狂躁的",
	//"狂暴的",
	"无谓的",
	"冰冷的",
	//"冷血的",
	"热血的",
	"衰老的",
	"鲜嫩的",
	//"多汁的",
	//"长腿的",
	"黑面",
	"红面",
	"白面",
	"黝黑的",
	"冰雪的",
	//"耽美的",
	//"腐化的",
	//"贪婪的",
	"仁义的",
	"",
];

var heroGroups = [
	"道士",
	"和尚",
	"武士",
	"书生",
	"秀才",
	//"屠夫",
	"美人",
	"壮士",
	//"土匪",
	//"痴汉",
	//"抖S",
	//"抖M",
	"拳师",
	"剑士",
	"骑士",
	"地主",
	"长工",
	"射手",
	"寨主",
	"小贩",
	"狱卒",
	"衙役",
	"苦工",
	"贵族",
	"公子",
	//"小姐",
	"公主",
	"法师",
	"萨满",
	"盗贼",
	//"混混",
	"侠客",
	"剑客",
	"浪子",
	"游侠",
	"刀客",
	"长老",
	"住持",
	"判官",
	"仆人",
	"舞女",
	"歌女",
];

export function getRandHeroName() {
	var city = Math.floor((Math.random() * (heroCities.length))) ;
	var hero = Math.floor((Math.random() * (heroNames.length))) ; 
	var group = Math.floor((Math.random() * (heroGroups.length))) ; 
	var name = heroCities[city] + heroNames[hero] + heroGroups[group];
	cc.log(name);
	return name;
}

// module.exports = getRandHeroName;