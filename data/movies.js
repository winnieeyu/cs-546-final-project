//import mongo collections, bcrypt and implement the following data functions
import { ObjectId } from 'mongodb';
import { movies, reviews } from '../config/mongoCollections.js';
import helperFunctions from '../helpers.js';

const moviesDataFunctions = {

    async createMovie(title,release_date,genre,director, cast,movie_poster_url,movie_rating,review_count) {
        try{
            //check if all fields are provide
        const allValidate  = helperFunctions.checkMoviesFields(title,release_date,genre,director,cast,movie_poster_url,movie_rating,review_count);
        if(allValidate !== true)
            throw allValidate;
        
        //validate title
        const titleValidation = helperFunctions.validateString(title,"title");
        if(titleValidation !== true)
            throw titleValidation;

        //validate release date
        const dateValidation = helperFunctions.validateDate(release_date);
        if(dateValidation !== true)
            throw dateValidation;

        //validate genre
        const genreValidation = helperFunctions.validateArray(genre,"genre");
        if(genreValidation !== true)
            throw genreValidation;

        //validate director
        const directorValidation = helperFunctions.validateString(director,"director");
        if(directorValidation !== true)
            throw directorValidation;

        //validate cast
        const castValidation = helperFunctions.validateArray(cast,"cast");
        if(castValidation !== true)
            throw castValidation;

        //validate movie_poster_url
        const posterURLValidation = helperFunctions.validateString(movie_poster_url,"movie_poster_url");
        if(posterURLValidation !== true)
            throw posterURLValidation;

        //validate movie_rating
        const ratingValidation = helperFunctions.validateRating(movie_rating);
        if(ratingValidation !== true)
            throw ratingValidation;

        //validate review_count
        const review_countValidation = helperFunctions.validateReviewCount(review_count);
        if(review_countValidation !== true)
            throw review_countValidation;

            const newMovie = {
                "Title": title,
                "Release_Date": release_date,
                "Genre": genre,
                "Director":director,
                "Cast": cast,
                "Movie_Poster_Url":movie_poster_url,
                "User_Rating":movie_rating,
                "Review_Count":review_count
              }
              

            //insert into database
            const addMovie = await movies();
            return await addMovie.insertOne(newMovie);

        } catch (error) {
            throw error;
    }

    },
    async getMovies(){
        try {

            //get move collection
            const moveCollection = await movies();
           // const movieObj= await moveCollection.find({}).project({ _id : 1, title : 1 }).toArray(); get id,
            const movieObj= await moveCollection.find({}).limit(4).toArray();
  
            //if no band found throw error
            if (!movieObj) throw 'No Movies';
            //return band details
            return movieObj;
  
      } catch (error) {
        throw error
      }
    },

    async getMoviesByGenre(genre,limit){
        try {

            //get move collection
            const moveCollection = await movies();
            const movieObj= await moveCollection.find({Genre: genre}).limit(limit).toArray();
            if (!movieObj) throw 'No Movies';
            //return band details
            return movieObj;
  
      } catch (error) {
        throw error
      }
    },

    async getRecentMovies(){
        try {

            //get move collection
            const moveCollection = await movies();
            const movieObj= await moveCollection.find({}).limit(8).toArray();

            if (!movieObj) throw 'No Movies';
            //return band details
            return movieObj;
  
      } catch (error) {
        throw error
      }
    },

    async updateMovieOverallRating(movie_id,new_rating,totalReviews){
        try {
     
            const moveCollection = await movies();
            const movieObj= moveCollection.updateOne({ _id: new ObjectId(movie_id)},{ $set:{User_Rating: new_rating,Review_Count:totalReviews} });

            return movieObj;
  
      } catch (error) {
        throw error
      }
    }
   
};

export default moviesDataFunctions;
