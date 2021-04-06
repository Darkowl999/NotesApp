
//en este fichero usamos express y es donde estará toda nuestra
//configuracion de nuestra app web
const express= require('express');
const exphbs= require('express-handlebars');
const path= require('path');
const morgan= require('morgan');
const methodOverride =require('method-override');
const flash= require('connect-flash');
const session= require('express-session');
const passport= require('passport');

//Inicializaciones 
const app = express();
require('./config/passport');

//Settings 

app.set('port',process.env.PORT || 4000);
app.set('views',path.join(__dirname, 'views')); //esta funcion es para que identifique la carpeta view
                                                // __dirname nos da la direccion de donde está el archivo

app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs'
}));
app.set('view engine','.hbs');



//Middlewares ->funciones que se ejecutan a medida que se hacen las peticiones

app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true

}));
//esto es para inicializar passport (es decir el logueo como tal)
app.use(passport.initialize());
app.use(passport.session());


app.use(flash());






//Global Variables

app.use((req,res,next)=>{
   res.locals.success_msg= req.flash('success_msg');
   res.locals.error_msg= req.flash('error_msg');
   res.locals.error= req.flash('error');
   res.locals.user= req.user || null;
   
    next();

});


//Routes 

app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));



//Static Files 
//estos archivos son recursos de los que dispondrá el cliente
app.use(express.static(path.join(__dirname,'public'))); 



module.exports = app;