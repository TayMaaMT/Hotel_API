const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require("./db/config");
const hotel = require('./routes/hotel');

const app = express();
app.use(cors({
    credentials: true
}))
const port = process.env.PORT||3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/hotel', hotel);
app.get('/',async (req,res)=>{
    
    res.json('wellcom to hotel api ...');
})

app.listen(port,()=>{
    console.log('server running on port '+port);
})