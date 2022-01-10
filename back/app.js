//app.js
const express = require('express');    
const bodyParser = require('body-parser');  
const path = require('path'); 
const { sequelize } = require('./models') 

//security - OWASP
const helmet = require("helmet"); //anti add to header
const dotenv = require ('dotenv');
const resul = dotenv.config();
 
/*/import routes
const routesSauce = require('./routes/sauce');   
const routesUsers = require('./routes/users');   
*/

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

//path images
app.use('/images', express.static(path.join(__dirname, 'images')));  

app.post('/users', async (req, res) => {
    const { name, email } = req.body
  
    try {
      const user = await User.create({ name, email })
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  })
  
  app.get('/users', async (req, res) => {
    try {
      const users = await User.findAll()
  
      return res.json(users)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  app.get('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    try {
      const user = await User.findOne({
        where: { uuid },
        include: 'posts',
      })
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  app.delete('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    try {
      const user = await User.findOne({ where: { uuid } })
  
      await user.destroy()
  
      return res.json({ message: 'User deleted!' })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  app.put('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    const { name, email } = req.body
    try {
      const user = await User.findOne({ where: { uuid } })
  
      user.name = name
      user.email = email
      
  
      await user.save()
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  //app.post('/posts', async (req, res) => {
  //  const { userUuid, body } = req.body
  
/*/ request routes to API
app.use('/api/sauces', routesSauce);   
app.use('/api/auth', routesUsers); 
*/
module.exports = app 