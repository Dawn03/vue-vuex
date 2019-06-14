//app.js文件
//1.引入express模块
const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-Parser");
const cookieParser = require("cookie-Parser");
//这一句是连接上数据库
var db = mongoose.connect('mongodb://localhost:27017/myDbs');
//这里的myDbs是数据库名字，不是表的名字

const app = express();

const hero = require('./router/hero')
const movie = require('./router/movie')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', hero)
app.use('/api', movie)
// 定义简单路由
// app.use('/',(req,res)=>{
// 	res.send('Yo!')
// })
//定义服务器端口
app.listen(3000, () => {
	console.log('app listening on port 3000.')
})