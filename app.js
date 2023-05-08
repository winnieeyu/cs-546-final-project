import express from 'express';
import {engine} from 'express-handlebars';
import configRoutesFunction from './routes/index.js';
import session from 'express-session';

import {fileURLToPath} from 'url';
import {dirname} from 'path';

//set up how to serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const staticDir = __dirname + "/public";
app.use(express.static(staticDir));
app.use('/individual-movie', express.static(staticDir))
app.use('/audience-review', express.static(staticDir))
//set up express sessions
app.use(
  session({
    name: 'AuthCookie',
    secret: "This is a secret.. shhh don't tell anyone",
    saveUninitialized: false,
    resave: true,
    //cookie: {maxAge: default}
  })
);


//set up handle bars
app.set("view engine","handlebars");

//configure handlebars
app.engine("handlebars",engine({extname : ".handlebars",defaultLayout:"layouts/main",layoutsDir:"views"}));

//middlewares

// if authenticated user visits /register route redirect /main-page else allow user pass through
 app.get('/register', (req, res,next) => {
        if(req.session.isAuthenticated == true) return res.redirect('/main-page');
     next();
  });

  app.get('/login-form', (req, res,next) => {
    if(req.session.isAuthenticated == true) return res.redirect('/main-page');
 next();
});



app.get('/audience-review/:id', (req, res,next) => {
  if(req.session.isAuthenticated == undefined) return res.redirect('/login-form');
next();
});
  

  //if non-authenticated user visits /user-profile redirect them to /main-page route else let user through
app.get('/user-profile', (req, res,next) => {
      if(req.session.isAuthenticated == undefined) return res.redirect('/login-form');
    next();
  });

  //if non-authenticated user visits /logout route redirect to /main-page route else let user pass through
  app.get('/logout', (req, res,next) => {
      if(req.session.isAuthenticated == undefined) return res.redirect('/main-page');
    next();
  });

  //middleware to log out details for every request made
const  loggingMiddleware = (req, res, next)=>{
    console.log(" ");
    console.log(`Current Timestamp: ${new Date().toUTCString()}`);
    console.log(`Request Method: ${req.method} : ${req.originalUrl}`);
    console.log(`User loggon status: ${(req.session.isAuthenticated == undefined)? "Non-Authenticated User":"Authenticated User"}`);
    next();
}

app.use(loggingMiddleware);

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  // If the user posts to the server with a property called _method, rewrite the request's method
  // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
  // rewritten in this middleware to a PUT route
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }
    // let the next middleware run:
    next();
  };

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(rewriteUnsupportedBrowserMethods);

configRoutesFunction(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});