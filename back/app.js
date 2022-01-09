//app.js
const express = require ('express');    
const bodyParser = require('body-parser');  
const path = require('path');  
//const sequelize = require ('mysql');
//connexion automatique???

//security - OWASP
const helmet = require("helmet"); //anti add to header
const dotenv = require ('dotenv');
const resul = dotenv.config();

//sequelize
const db = require("./models");
//db.sequelize.sync();

const { sequelize } = require('./models')

/*app.listen({ port: 5000 }, async () => {
  console.log('Server up on http://localhost:5000')
  await sequelize.authenticate()
  console.log('Database Connected!')
})
*/
//import routes
//const routesSauce = require('./routes/sauce');   



// creating API
const app = express(); 

//access to API
app.use((req, res, next) => {    
    res.setHeader('Access-Control-Allow-Origin', '*');   
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');  
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');  
    next();
  });

//security helmet
app.use(helmet());  

//transform JSON 
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended:true}));

/*/path images
app.use('/images', express.static(path.join(__dirname, 'images'))); */ 

/*/ request routes to API
app.use('/api/sauces', routesSauce);   
app.use('/api/auth', routesUsers);*/ 

module.exports = app 