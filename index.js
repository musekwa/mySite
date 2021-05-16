const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const BlogPost = require('./models/BlogPost');
const fileUpload = require('express-fileupload');
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const validateMiddleWare = require('./middleware/validationMiddleware');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser')
const app = express();

mongoose.connect('mongodb://localhost/mysiteDB',{
    useNewUrlParser: true,
})

app.use(fileUpload())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs');
app.use(express.static('public'))

app.get('/', homeController)
app.get('/posts/new', newPostController)
app.post('/posts/store', validateMiddleWare, storePostController)
app.get('/post/:id', getPostController)
app.get('/auth/register', newUserController)
app.post('/users/register', storeUserController);

app.listen(4000, 
    ()=>console.log("App running on port", 4000))