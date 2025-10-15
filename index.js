// steps  to define     express server
//  load 
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')

require('./database/dbConnection')
const pfserver = express() //server created


pfserver.use(cors())

// pfserver.use(cors({ origin: 'http://localhost:5173' }));

pfserver.use(express.json())
pfserver.use(router)
pfserver.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT

pfserver.listen(PORT,()=>{
    console.log(` PFSERVER IS RUINING ${PORT} AND WAITING for client request`);
    
})
pfserver.get('/',(req,res)=>{
    res.status(200).send('<h1>my nivyaaa   something</h1>')
})
pfserver.post('/',(req,res)=>{
 res.status(200).send("Post nivya Request")
})