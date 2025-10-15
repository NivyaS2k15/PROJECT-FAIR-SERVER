const mongoose = require('mongoose')

const connectionString = process.env.DBCONNECTIONSTRING
mongoose.connect(connectionString).then(res=>{
    console.log('mongodb atlas connection successfully with pf server');
    
}).catch(err=>{
    console.log("mongodb atlas connectin failed");
    
    console.log(err);
    
})