const jwt = require('jsonwebtoken');
const db = require('../config/db.config');
const config = require('../config/auth.config')
const bcrypt = require('bcryptjs');
const env = require('../config/env')

const User = db.users;

//fetch all users
exports.findAll = (req, res) => {
    User.findAll()
    .then(users => {
        //send all user to client
        res.send(users)
    });
};

//find a user by id
exports.findByPk = (req, res) => {
    User.findByPk(req.params.userId)
    .then( user => {
        res.send(user);
    });
};

//update user
exports.update = (req, res) => {
    const id = req.params.userId;
    User.update({ name: req.body.name, email: req.body.email}, 
        { where: {id: req.params.userId} }
        ).then( () => {
            res.status(200).send({ message: 'updated successfully a user with id = ' + id });
        });
};

//delete user by id
exports.delete = (req, res) => {
    const id = req.params.userId;
    User.destroy({
        where: {id: id}
    }).then( () => {
        res.status(200).send({ message: 'deleted successfully a user with id = ' + id });
    });
};

exports.signup = (req, res) => {
    //Check Email
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then( user => {
        if(user)
        {
            res.status(400).send({message: "Failed! Email is already in use!"});
        }
        else{
            //create user
            User.create({
                name : req.body.name,
                email: req.body.email,
                password : bcrypt.hashSync(req.body.password, 8)
            }).then( user => {
                res.status(200).send({res:user, message: "User was registered successfully!" });
            })
            .catch( err => {
                res.status(500).send({ message: err.message })
            });
        }
    });
}

exports.signin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then( user => {
        if(!user)
        {
            res.status(404).send({ message: "Invalid Email." });
        }
        else
        {
            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if(!passwordIsValid)    
            {
                return res.status(401).send({accessToken: null, message: "Invalid Password!"})
            }

            let token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 86400 //24 hours * 3600 seconds 
            });

            res.status(200).send({
                id : user.id,
                name : user.name,
                email : user.email,
                accessToken : token,

                message:'WELCOME'
            })
         
        }
    })
    .catch( err => {
        res.status(500).send({ error:true,message: err });
    })
}