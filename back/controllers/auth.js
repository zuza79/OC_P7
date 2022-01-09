// controllers - auth.ctrl
//controller - user singup, user save, login

//security, user, password and hash information

// singup
const db = require ('../models'); //db=database
const Users = db.user;
const Op = db.Sequelize.Op;

// security
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  //jwt = jsonwebtoken
const hash = require('hash.js');
const passwordValidator = require('password-validator');


//////////////singup 

exports.signup = (req, res, next) => {
  console.log(req.body);
     bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = {
          firstname: req.body.firstname,
          lastname:req.body.lastname,
          pseudo:req.body.pseudo,
          email: req.body.email,
          status : status,
          password: hash
        };
        Users.create(user)
        .then(user => {
          res.send({user,
            message : "Vous avez été bien enregistrer."
          
          });
          
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Une erreur s'est produite lors de la création de votre compte. Veuillez nous contacter administror@groupomania.com"
          });
        });
      })
      .catch(error => res.status(500).json({ error }));
   
  };

/////////// user - login + logout
  exports.login = (req, res, next) => {
    Users.findOne({
      where: { email: req.body.email }
    })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error });
        } else {
          bcrypt.compare(req.body.password, user.password)
            .then(valid => {
              if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
              } else {
                res.status(201).json({
                  userId: user.id,
                  token: jwt.sign(
                    { userId: user.id },
                    'RANDOM_TOKEN_SECRET', //place dans 
                    { expiresIn: "24h"}),
                });
              }
            })
            .catch(error => res.status(500).json({ error }));
        }
  
      })
      .catch(error => res.status(500).json({ error }));
      ////////logout  ///deplace dans le front
      module.exports.logout = (req, res) => {
        res.cookie('jwt', '');
        res.redirect('/');
    };
    };

  ///////// user modify
  exports.modifyUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
    const id = req.params.id;
    const newProfile = req.body ? {
      firstname: req.body.firstname,
      lastname : req.body.lastname,
      pseudo:req.body.pseudo,
      email : req.body.email,
      password : hash,
   } : {
    firstname: req.body.firstname,
    lastname : req.body.lastname,
    pseudo: req.body.pseudo,
    email : req.body.email,
    password : hash,
      } 
    Users.update(newProfile, {
      where: { user_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Votre profil a été bien modifier."
          });
        } else {
          res.send({
            message: `Impossible de modifier votre profil avec l'id=${id}!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "erreur lors de la mise à jour id=" + id
        });
      });
    })
  };
  
  ////// delete user //vraimant supprimer
  exports.deleteUser = (req, res, next) => {
    const id = req.params.id;
    Users.destroy({
      where: { user_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Utilisateur supprimé!"
          });
        } else {
          res.send({
            message: `Impossible de supprimer id=${id}. `
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Users with id=" + id
        });
      });
  };

  ///// get one user
  exports.getOneUser = (req, res, next) => {
    const id = req.params.id;
  
    Users.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  }
  /////////// get all user
  exports.getAllUser = (req, res, next) => {
   Users.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

  
  