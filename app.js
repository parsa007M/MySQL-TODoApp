// ! Preperation Part:

// 1- Create your database
// 2- Create your table
// 3- 


// ! ------------------------------------------------------------

// 1- Create variables and define the modules:
// 2- Connect the database:
// 3- Define express object, use bodyParser and set the hbs view engine:
// 4- GET request- get data from server to page:
// 5- POST Request - sent data from page to server:
// 6- GET request - Delete the task:
// 7- Listen the Port:

// !--------------------------------------------------------------

// !  1- Create variables and define the modules:

var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

// ! 2- Connect the database:

var connection = mysql.createConnection({
    host:'localhost',
    user:'alper',
    password:'654321',
    database:'21072020'
});

// ! 3- Define express object, use bodyParser and set the hbs view engine:

// 3.1 Express Object
var app = express();

// 3.2 BodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// 3.3 Set Your View Engine:
app.set('view engine','hbs');

// ! 4- GET request- get data from server to page:


app.get ('/', function(request, response){
        connection.query('SELECT * FROM tasks', null , function(error,results,fileds){

            response.render('index',{list : results})

           // console.log(results);
            // results are an array to store tasks! and it is equal to list!
            // so list is an array. We will define it in HBS as a list.
            // That's why, we will use 
        });

});

// ! 5- POST Request - sent data from page to server:

app.post('/insert', function(request,response){

    let newtask = {
        id: request.body.id,
        task: request.body.task,
        date : request.body.date
    }

    if(newtask){
        connection.query('Insert into tasks (id,task,date) values (?,?,?)',[newtask.id, newtask.task, newtask.date], function(error, results, fields){
            if(error) throw error;
            response.redirect('/');
        });
    } else {
        response.send('Please enter new TASK!');
        response.end();
    }
});

// ! 6- GET request - Delete the task:

app.get('/delete', function(request,response){


    var id = request.query.id // This is not body. Because we want to choose the id in DB. Therefore, it is "query"

     //console.log(id);
    
    if(id){
        connection.query('delete from tasks where id=?',[id], function(error, results, fields){
            if(error) throw error;
    
            response.redirect('/');
        });
    } else{
         response.send('Please enter ID');
         response.end();
    }

});

// ! 7- Listen the Port:

app.listen(4000);















