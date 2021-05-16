const BlogPost = require('../models/BlogPost');

const homePageController = async (req, res)=>{
    const blogposts = await BlogPost.find({});
    res.render('index', {blogposts});
}

module.exports = homePageController;