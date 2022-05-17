
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
//const indexRouter = require('./router/router.js');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());
const db = require('./config/db.config')
const User = db.users
db.sequelize.sync({alter:true})
.then( () => {
    console.log('Force and Resync Db')
})
//api simple routes
app.get('/', (req, res) => {
    res.json({message:'WELCOME'})
})
//routes

require('./routes/user.route')(app)
const server = app.listen(3000, () => {
    let port = server.address().port;
    console.log('Example Listenong on Port: ', port);
})