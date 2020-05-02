//功能:服务器程序
//1:引入四个模块
const express = require("express"); //web服务器模块
const mysql = require("mysql");//mysql模块
const session = require("express-session");//session模块
const cors = require("cors");//跨域
//2:创建连接池
var pool = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"cookbook",
    port:3306,
    connectionLimit:15
})
//3:创建web服务器
var server = express();
//4:配置跨域模块
//4.1:允许程序列表 脚手架
//4.2:每次请求验证
server.use(cors({
    origin:["http://127.0.0.1:8080","http://localhost:8080"],
    credentials:true 
}))
//5:指定静态资源目录 public
server.use(express.static("public"));
//6:配置session对象
server.use(session({
    secret:"128位安全字符串",//加密条件
    resave:true,//每次请求更新数据
    saveUninitialized:true,//保存初始化数据
}));
//7:为服务器绑定监听端口 4000
server.listen(4000);
console.log("服务器起动.......");

//功能一:用户登录验证
server.get("/login",(req,res)=>{
  //1:获取脚手架传递用户名和密码
  var u = req.query.uname;
  var p = req.query.upwd;
  //2:创建sql语法并且将用户名和密码加入
  var sql = "SELECT id FROM xz_login WHERE uname=? AND upwd=md5(?)";
  //3:执行sql语法并且获取返回结果
  pool.query(sql,[u,p],(err,result)=>{
     //3.1:如果出现严重错误抛出  
     if(err)throw err;
     //3.2:如果result.length长度为0,表示登录失败
     if(result.length==0){
         res.send({code:-1,msg:"用户名或密码有误"});
     }else{
         //登录成功
         //如果用户登录成功:创建session对象并且将登录凭证uid
         //保存对象中    result=[{id:1}]
         //将当前登录用户id保存session对象中作业:登录凭证
         req.session.uid = result[0].id;
         res.send({code:1,msg:"登录成功"})
     }
  });
})

  



