var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
//var path ="/mnt/c/Users/JRhome/Documents/hello-world/node/myapp";   //for WSL
var path ="C:/Users/JRhome/Documents/hello-world/node"; //for Windows
var writePath ="C:/Users/JRhome/Documents/hello-world/node/workFolder"; //for Windows
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'pug');


app.listen(3000,function(){
    console.log('connected 3000port!!');
});

app.get('/',function(req,res){
    fs.readdir(path,function(err,data){
        var returnStr = "";
        if(err){
            console.log('에러');
            return;
        }
      
        res.render('worksend', {con1 : data, filePath : path}); 
        // json 키 값은 html의 아이디나 네임, 클래스명이 아니다
        // 그냥 pug에서 = 이후로 쓰는 값이 키가 된다.
    });
});
    
app.get('/readFile/:fileName',function(req,res){
    var fileName = req.params.fileName;
    var data = "";
    fs.readFile(path+'/'+fileName, "utf8", function(err, fData){ //중간에 utf8을 꼭 넣어줘야 버퍼로 리턴하지 않고 문자열로 리턴해줌
        res.json({fileData : fData});
    });

});

var getToday = function(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd
    } 
    if(mm<10) {
        mm='0'+mm
    } 
    return today = yyyy+''+mm+''+dd;
}

app.post('/sendMsg',function(req,res){
    var contents = req.body.conts;
    var data = "";
    try { //동기식 폴더 확인
        fs.statSync(writePath);
        console.log('file or directory exists');
    }
    catch (err) {
      if (err.code === 'ENOENT') {
        console.log('file or directory does not exist');
        fs.mkdirSync(writePath);
      }
    }

    fs.writeFile(writePath+'/'+getToday()+'.txt', contents, 'utf8', function(err){
        if(err){
            res.status(500).send('Internal Server Error');
        }
        res.send('success');
    });
    // 기능추가필요 ->폴더 클릭시 해당 폴더 목록 읽기
    // 기능추가필요 ->현재날짜로 파일 저장되는데 동일 파일명 존재할 시 덮어씌울 지 물어보게하기
    
});