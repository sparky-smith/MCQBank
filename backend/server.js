const express = require('express'); //third party module
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path'); //core module
const cors = require('cors')

const connectDb = require('./server/database/connection') // local module

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

dotenv.config({path:'config.env'});

const PORT = process.env.PORT || 8000;

// mongodb connection
connectDb();

app.use(express.json())
//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}));

// load routers
app.use('/', require('./server/routes/router'));

app.listen(PORT, ()=> {console.log(`Server is running on http://localhost:${PORT}`)});