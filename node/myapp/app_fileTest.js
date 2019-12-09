var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var app = express();
//var path ="/mnt/c/Users/JRhome/Documents/hello-world/node/myapp";   //for WSL
var path ="C:/Users/pax_it_dev/Documents/hello-world/node"; //for Windows
var writePath ="C:/Users/pax_it_dev/Documents/hello-world/node/workFolder"; //for Windows
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'pug');


app.listen(3000,function(){
    console.log('connected 3000port!!');
});

app.get('/',function(req,res){
    var returnList = [];
    fs.readdir(path,function(err,dataList){
        var returnStr = "";
        if(err){
            console.log('에러');
            return;
        }
        var index = 0;
        dataList.forEach(function(file){ 
            var gubun ='';
            try {
                var stats = fs.statSync(path+'/'+file); // for문 돌면서 순서대로 상태값 확인이 되어야 함.
                //console.log('stats>>'+stats.isFile());
                if (stats.isFile()){
                    gubun = 'File';
                }
                if (stats.isDirectory()){
                    gubun = 'Dir';
                }

            } catch (err) {
                console.log('error');
            }    
            // fs.stat(path+'/'+file,function(err, stats){ 
            //      if(err) throw err; 
            //     if (stats.isFile()){
            //         console.log('◎ fileName:'+stats.isFile());
            //     }
            //     if (stats.isDirectory()){
            //         console.log('● DirName:'+stats.isDirectory());
            //     }
            //      console.log('isFile : '+stats.isFile()+' , isDir : '+stats.isDirectory()); 
            //      returnList[index] = {fileName : file, isDir : stats.isDirectory()};
            // }); 
            returnList[index] = { fileName : file, gubun : gubun};
            index++;
        });
        res.render('worksend', {con1 : returnList, filePath : path}); 
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