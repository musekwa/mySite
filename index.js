const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const BlogPost = require('./models/BlogPost');
const fileUpload = require('express-fileupload');

const app = express();

mongoose.connect('mongodb://localhost/mysiteDB',{
    useNewUrlParser: true,
})

app.use(fileUpload())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs');
app.use(express.static('public'))

app.get('/', async (req, res)=>{
    const blogposts = await BlogPost.find({});
    res.render('index', {blogposts});
})

app.get('/about', (req, res)=>{
    res.render('about');
})

app.get('/contact', (req, res)=>{
    res.render('contact');
})

app.get('/post', (req, res)=>{
    res.render('post');
})

app.get('/posts/new', (req, res)=>{
    res.render('create');
})

app.post('/posts/store', async (req, res)=>{
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/assets/img', image.name), async(erro)=>{
        await BlogPost.create({
            ...req.body,
            image: '/assets/img/' + image.name
        })
        res.redirect('/')
    })
})

app.get('/post/:id', async (req, res)=>{
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {blogpost});
})


app.listen(4000, 
    ()=>console.log("App running on port", 4000))