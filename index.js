const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const BlogPost = require('./models/BlogPost');
const fileUpload = require('express-fileupload');
const newPostController = require('./controllers/newPost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const validateMiddleWare = require('./middleware/validationMiddleware');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser')
const expressSession = require('express-session');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const logoutController = require('./controllers/logout');

const app = express();

mongoose.connect('mongodb://localhost/mysiteDB',{
    useNewUrlParser: true,
})

app.use(expressSession({
    secret: 'keyboard cat'
}))

global.loggedIn = null;
app.use('*', (req, res, next)=>{
    loggedIn = req.session.userid;
    next();
})
app.use(fileUpload())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs');
app.use(express.static('public'))


app.get('/', homePageController)
app.get('/posts/new', authMiddleware, newPostController)
app.post('/posts/store', authMiddleware, storePostController)
app.get('/post/:id', getPostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);
app.get('/auth/logout', logoutController)
app.use((req, res)=>res.render('notfound'))


app.listen(4000, 
    ()=>console.log("App running on port", 4000))