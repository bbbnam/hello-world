var fs = require('fs');

//파일에 데이터를 씁니다.
fs.writeFile('./output.txt', 'Hello World!!', function(err){
    if(err) throw err;

    console.log('파일 쓰기 완료-!');
});