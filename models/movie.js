//hero.js文件
//引入mongoose模块
const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
	{
		chineseName:String, //电影中文名称
		englishName:String, //电影英文名称
        movieType: [], //电影类型 动作、剧情  要求用elementui的下拉框 支持多选
        dType: '', //电影放映类型 2d 3d等 要求用elementui的下拉框  只选择一个
		playArea:String, // 播放地区
		movieTime:String,// 电影时长
		showTime:String,// 上映时间  要求用elementui的时间选择器
		users:Number,// 用户人数
		userScore:String,// 用户评分
		professors:Number,// 专业人员人数
		professorScore:String,// 专业人员评分
		totalBoxOffice:Number,// 总票房
		imgArr: [], // 图片地址
	},
	{
		collection:'movie'
	}
)

//导出model模块
const Movie = module.exports = mongoose.model('movie',movieSchema)