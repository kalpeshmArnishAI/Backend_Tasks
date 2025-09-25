const express = require('express');
const User = require('./userdata.json')
const app = express();
const port = 8000;

const udata={
     "1" : "Kalpesh",
     "2" : "Laxmikant",
     "3" : "Pradyumna",
     "4" : "Mayur"
}

// Routes
app.get('/welcome',(req,res)=>{
    res.send('Welcome to the API');
});

app.get('/api/userdata',(req,res)=>{
    res.json(udata) 
});

app.get('/api/users',(req,res)=>{
    res.json(User);
});

app.listen(port,()=> console.log(`Server is running on port ${port}`));




// app.get('/users',(req,res)=>{
//     const html = `
//     <ul>
//     ${User.map((user)=> `<li>ID : ${user.id} <br> First_Name : ${user.first_name} <br> Last_Name : ${user.last_name}
//      <br>  Email : ${user.email} <br> Gender : ${user.gender}</li>`).join("")}
//     </ul>
//     `;
//     res.send(html);
// })