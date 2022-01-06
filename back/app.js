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
db.sequelize.sync();
const Sequelize = require ('mysql');
const sequelize = new Sequelize("groupomania", "groupomania", "Pra123ha*", {
    dialect: "mysql",
    host: "localhost"
});
try {
    sequelize.authenticate();
    console.log('Connecté à la base de données MySQL!');
    sequelize.query("CREATE DATABASE `groupomania`;").then(([results, metadata]) => {
        console.log('Base de données créée !');
      })
  } catch (error) {
    console.error('Impossible de se connecter, erreur suivante :', error);
  }

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