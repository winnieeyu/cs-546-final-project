import express from 'express';
import { moviesData,usersData,commentsData,reviewsData } from '../data/index.js';
import helperFunctions from '../helpers.js';

const login = `<li><a href="#"  id="loginlink">Login</a></li><li><a class="new_customer" href="/register">New Audience</a></li>`;
const logout = `<li><a class="new_customer" href="/user-profile"><b>My Profile</b></a></li> <li><a class="new_customer" href="/logout"><b>Logout</b></a></li>`;

 const router = express();
 router.use(express.json());

router.route('/').get(async (req, res) => {
  try{

    const link =  (req.session.isAuthenticated == undefined) ? login : logout;

    const recentMovies = await moviesData.getRecentMovies();
    //Comedy
    const comedyMovies = await moviesData.getMoviesByGenre("Comedy",4);
    //Horror
    const horrorMovies = await moviesData.getMoviesByGenre("Horror",4);
    //Action
    const actionMovies = await moviesData.getMoviesByGenre("Action",4);

    return res.render("main-page",{pageTitle:"Home",link:link,recentMoviesList:recentMovies,action:actionMovies,horror:horrorMovies,comedy:comedyMovies});

  } catch (error) {
    res.render("error",{pageTitle:"Error"});
    console.log(error);
  }


 });

router
  .route('/register')
  .get(async (req, res) => {
    //const link =  (req.session.isAuthenticated == undefined) ? login : logout;
    res.render("register",{pageTitle:"Register"});
  })
  .post(async (req, res) => {
    //code here for POST

    //get inputs from form 
    const firstName = req.body.firstNameInput.trim();
    const lastName = req.body.lastNameInput.trim();
    const username = req.body.username.trim();
    const emailAddress = req.body.emailAddressInput.trim();
    const  gender = req.body.gender.trim();
    const  city = req.body.city.trim();
    const  state = req.body.state.trim();
    const  age = parseInt(req.body.age.trim());
    const  selfcomment = req.body.selfcomment.trim();
    const password = req.body.passwordInput.trim(); 
    const tag1 = req.body.tag1;
    const tag2 = req.body.tag2;
    const tag3 = req.body.tag3;
    const tag4 = req.body.tag4;
    const tag5 = req.body.tag5;

    let tag = [];
    if(tag1 !== undefined){
      tag.push(tag1.toString());
    }
    if(tag2 !== undefined){
      tag.push(tag2.toString());
    }  
    if(tag3 !== undefined){
      tag.push(tag3.toString());
    }  
    if(tag4 !== undefined){
      tag.push(tag4.toString());
    }  
    if(tag5 !== undefined){
      tag.push(tag5.toString());
    }  

    //console.log(tag);

  try {
 
  //insert into db
  const results = await usersData.createUser(firstName,lastName,username,emailAddress,gender,city,state,age,password,selfcomment,tag);
  
  //console.log(results);
  if(results.insertedUser === true) {
    return  res.redirect('/login-form');
  } else {  
      return res.status(500).render("register",{pageTitle:"Register",validationError:"Internal Server Error",firstName:firstName,lastName:lastName,username:username,emailAddress:emailAddress,city:city,state:state,age:age,selfcomment:selfcomment,password:password });
}

} catch (error) {
  return res.status(400).render("register",{pageTitle:"Register",
    validationError:error,firstName:firstName,lastName:lastName,username:username,emailAddress:emailAddress,city:city,state:state,age:age,selfcomment:selfcomment,password:password });
}

});



router.route('/main-page')
  .get(async (req, res) => {

    try {
  
    const link =  (req.session.isAuthenticated == undefined) ? login : logout;

    const recentMovies = await moviesData.getRecentMovies();
    //Comedy
    const comedyMovies = await moviesData.getMoviesByGenre("Comedy",4);
    //Horror
    const horrorMovies = await moviesData.getMoviesByGenre("Horror",4);
    //Action
    const actionMovies = await moviesData.getMoviesByGenre("Action",4);
  
    return res.render("main-page",{pageTitle:"Home",link:link,recentMoviesList:recentMovies,action:actionMovies,horror:horrorMovies,comedy:comedyMovies});

    } catch (error) {
      res.render("error",{pageTitle:"Error"});
      console.log(error);
    }

  });
  router.route('/login').post(async (req, res) => {

    const username = req.body.username.trim();
    const password = req.body.passwordInput.trim(); 

    try {

      //fetch data from db
      const results = await usersData.checkUser(username,password);

      req.session.user= {'firstName': results.fname, 'lastName': results.lname, 'emailAddress': results.emailAddress,'role': results.role}

      req.session.isAuthenticated = true;
      req.session.fname = results.fname;
      req.session.lname = results.lname;
      req.session.username = results.username;

      res.redirect('/user-profile');

  } catch (error) {
    
      return res.status(400).render("login",{pageTitle:"Login",usernameError:error});
  }

  });

router.route('/login-form').get(async (req, res) => {
  return res.render("login",{pageTitle:"Login Page"});
  });


router.route('/error').get(async (req, res) => {
  //code here for GET
  res.status(403).render("error",{pageTitle:"Error"});
});


router.route('/audience-review/:id').get(async (req, res) => {

 try{
  const data = await reviewsData.getSingleReview(req.params.id);
  return res.render("audience-review",{pageTitle:"Audience Review",singleMovie:data});

  } catch (error) {
    console.log(error);
    res.render("error",{pageTitle:"Home"});
  }

});

router.route('/individual-movie/:id').get(async (req, res) => {

  try {
    const link =  (req.session.isAuthenticated == undefined) ? login : logout;
    const data = await reviewsData.getSingleReview(req.params.id);

    return res.render("individual-movie",{pageTitle:"Individual movie",link :link,singleMovie:data});

    } catch (error) {
      console.log(error);
      res.render("error",{pageTitle:"Home"});
    
    }
});

router.route("/post-review").post(async (req, res) => {
  
  const username =  req.session.username; 
  const movieId = req.body.movie_id;
  const rating = parseFloat(req.body.rating);
  const tag1 =  req.body.tag1;
  const tag2 =  req.body.tag2;
  const tag3 =  req.body.tag3;
  const tag4 =  req.body.tag4;
   let tag = [];
  if(tag1 !== undefined){
    tag.push(tag1)
  }
  if(tag2 !== undefined){
    tag.push(tag2)
  }
  if(tag3 !== undefined){
    tag.push(tag3)
  }
  if(tag4 !== undefined){
    tag.push(tag4)
  }

  const comment = req.body.comments;
 
  try {

    //get all user reviews for this movie.

    const results = await reviewsData.getSingleReview(movieId);
    const comments = results[0].comments;

    let totalRating = 0 ;
    let arrLength = comments.length;
    let average;
    let totalReviews = arrLength + 1;
    //if length is zero then average rating is current rating
    if(arrLength > 0){

        for (let index = 0; index < arrLength; index++) {
          const crating = comments[index].movieRating;
            totalRating +=crating;
        }

        console.log("sub Total rating "+totalRating);
        totalRating +=rating; //add current rating from user
        arrLength +=1; //increase total rating by one to account user rating count

        console.log("Total rating "+totalRating);
        console.log("array length "+arrLength);
        average = totalRating/arrLength;
        console.log("Average rating "+average);

    }else{
      average = rating;
    }

    average = parseFloat(average).toFixed(1);

    console.log("Average rating "+average);

    const response = await commentsData.createComment(movieId,username,comment,rating,tag);
    //update overall movie rating
    await moviesData.updateMovieOverallRating(movieId,average,totalReviews);

    const data = await reviewsData.getSingleReview(movieId);
    return res.render("audience-review",{pageTitle:"Audience Review",sucess:"Comment addedd sucessfully",singleMovie:data});

  } catch (error) {
    console.log(error)
    const data = await reviewsData.getSingleReview(movieId);
    return res.render("audience-review",{pageTitle:"Audience Review",reviewCommentError:error,singleMovie:data});

  }
});

router.route("/movies-listing").get(async (req, res) => {

  try {
  
    const link =  (req.session.isAuthenticated == undefined) ? login : logout;

    const recentMovies = await moviesData.getRecentMovies();
    
    return res.render("movies-listing",{pageTitle:"Movie Listing",link:link,recentMoviesList:recentMovies});

    } catch (error) {
      res.render("error",{pageTitle:"Error"});
      console.log(error);
    }

});

router.route("/user-profile").get(async (req, res) => {
  try {

    const recentMovies = await moviesData.getRecentMovies();
// const recentMovies = await reviewsData.getReviewForSingleUser(req.session.username);
    //user details
    const userDetails = await usersData.getUser(req.session.username);

    return res.render("user-profile",{pageTitle:"My profile",recentMoviesList:recentMovies,userDetails:userDetails});

    } catch (error) {
      res.render("error",{pageTitle:"Error"});
      console.log(error);
    }
});

router.route('/logout').get(async (req, res) => {
  req.session.destroy();
  res.redirect("/main-page");
});

export default router;
