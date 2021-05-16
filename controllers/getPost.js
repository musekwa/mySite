const BlogPost = require('../models/BlogPost');

const getPostController = async (req, res)=>{
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {blogpost});
}

module.exports = getPostController;