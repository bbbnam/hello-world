var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.locals.pretty = true; // 코드를예쁘게해준다.
app.use(bodyParser.urlencoded({ extended : false})); //라우팅 되기 전에 바디파서부터 거치게 된다. 디스패쳐 서블릿 같은 느낌 
app.set('view engine', 'pug'); //pug 사용시1
app.set('views', './views');   //pug 사용시2
app.use(express.static('../public')); //이미지 파일등 기본 정적파일 루트 지정
app.get('/form', function(req,res){
  res.render('form');
});
app.get('/form_receiver', function(req,res){
  var title = req.query.title;
  var desc = req.query.desc;
  res.send(title+","+desc);
});
app.post('/form_receiver', function(req,res){
  var title = req.body.title;
  var desc = req.body.desc;
  res.send('Hello post '+title+','+desc);
});


app.get('/topic', function(req, res){
  var topicArray = ['javaScript', 'nodeJs', 'app'];
  var links = `
    <a href = "/topic?id=0">javaScript</a><br>
    <a href = "/topic?id=1">nodeJs</a><br>
    <a href = "/topic?id=2">app</a><br>
    ${topicArray[req.query.id]}
  `
  res.send(links);
  //console.log(req.query.id);
});

app.get('/topic2/:id/:mode', function(req, res){
  var output = `${req.params.id} , ${req.params.mode}`
  res.send(output)
});

app.get('/template', function(req, res){

  res.render('temp',{time : Date()});
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/dynamic', function(req, res){
  var lis = '';
  for (var i=0; i<5; i++){
      lis = lis + '<li>coding</li>';
  }
  var time = Date();
  var output = `
  <!DOCTYPE html>
  <html>
      <head>
          <meta charset="utf-8">
          <title></title>
      </head>
      <body>
          Hello, Dynamic!
          <ul>
            ${lis}
          </ul>
          ${time}
      </body>
  </html>`;
  res.send(output);
});

app.get('/route', function(req,res){
  res.send('Hello <img src="/good.jpg">');
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
