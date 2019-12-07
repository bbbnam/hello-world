var fs = require('fs');
var express = require('express');
var app = express();
//var path ="/mnt/c/Users/JRhome/Documents/hello-world/node/myapp";   //for WSL
var path ="C:/Users/JRhome/Documents/hello-world/node"; //for Windows
app.use(express.json());
app.use(express.urlencoded({extended : false}));
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
       
        // for (var i in data){
        //     data[i] =data[i]+"<br>";
        // }
        //res.send('hello world'+`${returnStr}`);
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