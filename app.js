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
  database: 'salad',
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

passport.use(new LocalStrategy(
  function(username, password, done){
    pool.getConnection(function(err, connection){
        if(err) throw err;
        else{
          // TODO 입력 틀렸을 경우 페이지 만들기
          // 로그인 처리
          connection.query('SELECT mbr_Id, mbr_Pwd, mbr_Email, mbr_Name FROM member WHERE mbr_Id = ?', username, function(err, rows){
            if(err){
              console.log('Query Error: ' + err);
              return done(null, false);
            }
            else{
              // 아이디 불일치
              if(!rows.length){
                console.log('\n\nThere is no ID that you typed');
                return done(null, false);
              }
              else{
                  // 아이디, 비밀번호 일치
                  if(password == rows[0].mbr_Pwd){
                    // 회원 정보를 serializeUser(callback)에 보낸다.
                    console.log(rows[0]);
                    done(null, rows[0]);
                  }
                  // 비밀번호 불일치
                  else{
                    console.log('\n\nWrong password');
                    done(null, false);
                  }
              }
            }
          });
        }
        connection.release();
      });
  }
));
// done이 false가 아닐 경우 실행
// 사용자의 세션(닉네임)을 저장한다.
passport.serializeUser(function(user, done){
  console.log('serial user : ' + user.mbr_Name);
  done(null, user);
});
// 세션이 이미 저장되어 있을 경우 req에 user 객체를 추가한다.
passport.deserializeUser(function(user, done){
  // req의 객체 user에 저장. user객체는 passport가 새로 추가하는 객체.
  done(null, user);
})

app.get('/', function(req, res){
  if(req.user){
    res.render('main_pg_2', {user: req.user.mbr_Name});
  }
  else{
    res.render('main_pg_1');
  }
});

app.post('/filter/id', function(req, res){
  pool.getConnection(function(err, connection){
    if (err) throw err;
    else{
      connection.query('SELECT mbr_Id FROM member WHERE mbr_Id = ?', req.body.input_Id, function(err, rows){
        if (err) throw err;
        else{
          res.json({isThere: rows.length});
        }
        connection.release();
      });
    }
  });
});
app.post('/filter/email', function(req, res){
  pool.getConnection(function(err, connection){
    if(err) throw err;
    else{
      connection.query('SELECT mbr_Email FROM member WHERE mbr_Email = ?', req.body.input_Email, function(err, rows){
        if(err) throw err;
        else{
          res.json({isThere: rows.length});
        }
        connection.release();
      });
    }
  });
});
app.post('/signin', passport.authenticate('local', {successRedirect: '/',
                                                               failureRedirect: '/',
                                                               failureFlash: false})
);
app.get('/signout', function(req, res){
  req.logout();
  res.render('main_pg_1');
});
app.post('/signup', function(req, res){
  pool.getConnection(function(err, connection){
    if (err) throw err;
    connection.query('INSERT INTO member VALUES (?, ?, ?, ?)', [req.body.id, req.body.pwd, req.body.name, req.body.email], function(err, rows){
      if (err) throw err;
      res.redirect('/');
    });
    connection.release();
  });
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
