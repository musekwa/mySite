const User = require('../models/User');
const path = require('path');
const bcrypt = require('bcrypt');

const loginUserController = async (req, res)=>{
    const {username, password } = req.body;
    User.findOne({username: username}, (error, user)=>{
        if (user) {
            bcrypt.compare(password, user.password, (error, same)=>{
                if(same){
                    req.session.userid = user._id;
                    res.redirect('/');
                }
                else{
                    res.redirect('./auth/login');
                }
            })
        }
        else {
            res.redirect('/auth/register');
        }
    })
}

module.exports = loginUserController;