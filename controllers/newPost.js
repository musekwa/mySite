
const newPostController = (req, res)=>{
    if (req.session.userid){
        return res.render('create');
    }
    res.redirect('/auth/login');
}

module.exports = newPostController;