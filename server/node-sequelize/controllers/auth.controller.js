
const users = require('../models').users
const Roles= require('../models').Roles
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../models')
const {secret} = require('../config/auth.config')
const Op = db.Sequelize.Op

module.exports ={
    signUp(req, res){
        return users.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username:req.body.username,
            password: bcrypt.hashSync(req.body.password, 8)
        }).then((user)=> res.status(200).send({
            message: "Account Created"
        })).catch((err)=> res.status(400).send({message: err.message}))
    },
    //sign in function 
// for users
    signIn (req, res){
        users.findOne({
                where:{
                    username: req.body.username
                }
            }).then(user=>{
                if(!user){
                    return res.status(404).send({
                        message: "User Not Found"
                    })
                }
                let passwordIsValid = bcrypt.compareSync(
                    req.body.password, user.password
                )
                if(!passwordIsValid){
                    return res.status(404).send({
                        accessToken: null,
                        message: "Password Invalid"
                    })
                }
                let token = jwt.sign({id: user.id}, secret,{
                    expiresIn: 86400 //expire in 24 hours
                })
                // var authorities = []
                // user.getRoles().then(roles=>{
                //     for( let i = 0; i<roles.length; i++){
                //         authorities.push("ROLE_" +roles[i].name.toUpperCase())
                //     }
                    res.status(200).send({
                        id: user.id,
                        username: user.username,
                        accessToken: token
                    })
            }).catch((err)=>{
                res.status(400).send({message: err.message})
            })

    }
}
