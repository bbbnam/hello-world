var fs = require('fs');

// Sync
console.log(1);
var data = fs.readFileSync('data.txt',{encoding:'utf8'} ); //동기식 파일 읽기
console.log(data);

// Async
console.log(2);

fs.readFile('data.txt',{encoding:'utf8'}, function(err,data){
    console.log(data);
});
console.log(3);