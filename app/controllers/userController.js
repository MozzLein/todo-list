const bcrypt = require('bcrypt')
const Users = require('../models/userModel.js')
const {generateUUID} = require('../helper/generateId.js')
const jwt = require('jsonwebtoken')
require('dotenv').config()
// for user register
exports.userRegister = async (req, res) => {
    try {
        const {firstName, lastName, username, phoneNumber, password, confirmPassword} = req.body
        //check if username has been used
        const checkUsername = await Users.findOne({ where: { username } })
        if(checkUsername){
            res.status(400).send({
                message : "Username already Used"
            })
            return
        }
        //check if password doesn't match
        if(password !== confirmPassword){
            res.status(400).send({
                message : "Password doesn't match"
            })
            return
        }
        //create hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const id = generateUUID();
        //input data to db
        const newUser = await Users.create({ id, firstName, lastName, username, phoneNumber, password: hashedPassword });
        res.status(201).send({
            message : "New user added successfully",
            newUser
        })
    } catch (error) {
        res.status(500).send({
            error : error.message
        })
    }
}

//for user login
exports.userLogin = async (req, res) => {
    try {
        const {username, password} = req.body
        //check if the user exist
        const user = await Users.findOne({ where: { username } })
        if(!user){
            res.status(404).send({
                message : "User not found"
            })
            return
        }
        //check if inputed password match with password in db
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch){
            res.status(401).send({
                message : "Wrong username or password"
            })
            return
        }
        const token = jwt.sign({ user: { id: user.id, username: user.username } }, process.env.ACCESS_SECRET_KEY, { expiresIn: '1h' });
        res.status(200).send({
            message : "Login successfully",
            token
        })
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
}
