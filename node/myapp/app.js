var express = require('express');
var app = express();
app.locals.pretty = true;
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('../public'));

app.get('/topic', function(req, res){
  var topicArray = ['javaScript', 'nodeJs', 'app'];
  res.send(topicArray[req.query.id]);
  
  //console.log(req.query.id);

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