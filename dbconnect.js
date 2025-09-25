const express = require('express')
const mysql = require('mysql2')
const PORT = 8000;
const app = express();

// DATABASE Connection 
const DB = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: 'K@lpesh02',
    database : 'userDB'
});

DB.connect((err)=>{
   if(err){
     console.log('Database not connected',err);
   }
   else{
        console.log("Database is connected Successfully..!");
   }
});

// Routes
app.get('/welcome',(req,res)=>{
    res.send("Welcome to SERVER")
});

app.get('/dbusers',(req,res)=>{
     DB.query("select * from userdata",(err,result)=>{
          if(err){
            res.status(500).send("database error")
            return
            
          }
          res.json(result);
     });
});
app.listen(PORT,(req,res)=> console.log(`Server is running on PORT :${PORT}`));




