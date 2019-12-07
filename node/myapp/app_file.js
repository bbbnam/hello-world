var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
app.use(bodyParser.urlencoded({ extended : false}));
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'pug');
app.get('/topic/new', function(req,res){
 res.render('new');
});
app.post('/topic', function(req,res){
    var title = req.body.title;
    var desc = req.body.desc;
    fs.writeFile('data/'+title, desc, function(err){
        if (err){
            res.status(500).send('Internal Server Error');
        }
        res.send('Success!');
    });
});

app.listen(3000, function(){
    console.log('Connected 3000port')
});


