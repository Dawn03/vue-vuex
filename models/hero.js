//hero.js文件
//引入mongoose模块
const mongoose = require("mongoose");

const heroSchema = mongoose.Schema(
	{
		heroName:String,
		age:Number,
		heroSex:String,
		address:String,
		heroPosition: [],
		imgArr:[],
		favourite:String,
		explain:String
	},
	{
		collection:'myhero'
	}
)

//导出model模块
const Hero = module.exports = mongoose.model('hero',heroSchema)