const User = require('../models/User');
const path = require('path');

const storeUserController =  (req, res)=>{
    User.create(req.body, (error, user)=>{   
        if (error){
            return res.redirect('/auth/register')
        }
        res.redirect('/')
    })  
}

module.exports = storeUserController;