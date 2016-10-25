var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var mysql = require('mysql');
var dbOption = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'ehehgks!!123',
  database: 'whitespace',
  connectionLimit: 10
}
var pool = mysql.createPool(dbOption);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// 암호화 관련
var hasher = require('pbkdf2-password')();
// var sha512 = require('sha512')

app.use(express.static(__dirname + '/public'))
   .use(require('body-parser').urlencoded({extended: true}))
   .use(cookieParser('underline@charm@cchae@maousw%star*&^coolersome'))
   .use(session({
     secret: 'underline@charm@cchae@maousw%star*&^coolersome',
     resave: false,
     saveUninitialized: false,
     store: new MySQLStore(dbOption)
   }))
   .use(passport.initialize())
   .use(passport.session());

app.engine('handlebars', handlebars.engine)
   .set('view engine', 'handlebars')
   .set('port', process.env.PORT || 4002);

/***************라우팅*******************/

app.get('/test1', function(req, res){
  res.render('login');
});
app.get('/test2', function(req, res){
  res.render('main_pg_1');
});

app.get('/', function(req, res){
  res.render('board1');
});


/***************핸들링*******************/

// app.use = 미들웨어 추가 메서드, 라우트와 일치하지 않는 모든 것을 처리
// 매개변수 수를 통해 404와 500 핸들러 구분
// 404와 500은 상태 코드를 명시적으로 지정해야 한다
// 모든 라우트 다음에 쓴다

// 404 폴백 핸들러
app.use(function(req, res){
 //res.writeHead 대용
 res.status(404);
 res.render('404', {layout: 'none'});
});

// 500 에러 페이지
app.use(function(err, req, res, next){
 console.error(err.stack);
 res.status(500);
 res.render('500', {layout: 'none'});
});

/***************************************/

app.listen(app.get('port'), function(){
  console.log('Server is running at 4002 port');
});
