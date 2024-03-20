const express=require("express");
const mysql =require("mysql2")
require("dotenv").config();
const app=express()

// const port=process.env.PORT

app.listen(process.env.PORT,()=>console.log("srver running in vs code"))


const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.USER_NAME, 
    password: process.env.PASSWORD, 
    database: process.env.DATABASE
  });



  connection.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL:',err);
      return;
    }
    console.log('Connected to MySQL');
  });

  app.get('/api/', (req, res) => {

    const {ticker,column,period}=req.query
    
    
    const year=parseInt(period.substring(0,period.length-1))
    const yearArr=[]
    for (let i=0;i<year;i++){
        const a=2024-i;
        yearArr.push(a.toString())

    }
    


    const [a,b]=column.split(',')
    // console.log(a,b)
    connection.query(`SELECT  ticker,${a},${b},date  FROM 3database1 
    WHERE ticker=? AND DATE_FORMAT(date,"%Y") IN (?)
    
    `,[ticker,yearArr], (err, results) => {
      if (err) {
        console.error('Error fetching users:', err);
        res.status(500);
        res.send('Error fetching users');
        return;
      }
      res.send(results);
    });
  });