const BlogPost = require('../models/BlogPost');

const homeController = async (req, res)=>{
    const blogposts = await BlogPost.find({});
    res.render('index', {blogposts});
}

module.exports = homeController;