//Here you will import route files and export the constructor method as shown in lecture code and worked in previous labs.
import router from './routes.js';
const constructorMethod = (app) => {
    
    app.use('/', router);
    app.use('*',(req,res)=>{
        res.status(404).render("error",{pageTitle:"Error 404 Not found"});
    });
};

export default constructorMethod;