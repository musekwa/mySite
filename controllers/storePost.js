const BlogPost = require('../models/BlogPost');
const path = require('path');

const storePostController = async (req, res)=>{
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '../public/assets/img', image.name), async(erro)=>{
        await BlogPost.create({
            ...req.body,
            image: '/assets/img/' + image.name
        })
        res.redirect('/')
    })
}

module.exports = storePostController;