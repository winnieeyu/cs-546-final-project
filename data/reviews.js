
import { reviews } from '../config/mongoCollections.js';
import helperFunctions from '../helpers.js';
import { ObjectId } from 'mongodb';
const reviewsDataFunctions = {

    async createReview(movie_id,movieName,movieDescription,language,genre,cast,release_date,trailer_link,tiket_link){
        try{
            
        //check if all fields are provide
        const allValidate  = helperFunctions.checkMovieReview(movieName,movieDescription,genre,cast,release_date);
        if(allValidate !== true) throw allValidate;

        //validate movie Name
        const movieNameValidation = helperFunctions.validateString(movieName,"movie name");
        if(movieNameValidation !== true) throw movieNameValidation;
        
        //validate movie Description
        const decriptionValidation = helperFunctions.validateString(movieDescription,"Movie Description");
        if(decriptionValidation !== true) throw decriptionValidation;
                
        //validate movie Description
        const languageValidation = helperFunctions.validateString(language,"Movie language");
        if(languageValidation !== true) throw languageValidation;

        //validate genre
        const genreValidation = helperFunctions.validateArray(genre,"genre");
        if(genreValidation !== true) throw genreValidation;

        //validate cast
        const castValidation = helperFunctions.validateArray(cast,"cast");
        if(castValidation !== true) throw castValidation;

        //validate release date
        const dateValidation = helperFunctions.validateDate(release_date);
        if(dateValidation !== true) throw dateValidation;

        const Review = {
            "movie_id":movie_id,
            "movieName": movieName,
            "movieDescription": movieDescription,
            "language":language,
            "genre": genre,
            "cast": cast,
            "releaseDate":release_date,
            "trailer_link":trailer_link,
            "tiket_link":tiket_link,
            "comments": []
          }

        //console.log(Review);

        //insert into database
        const addReview = await reviews();
        return await addReview.insertOne(Review);

        }catch(err){
            throw err;
        }
    },
    async getSingleReview(id){
        try {            
        //validate id
        const idValidation = helperFunctions.validateObjectId(id);
        if(idValidation !== true) throw idValidation;

            //get review collection
            const reviewCollection = await reviews();
            const reviewObj= await reviewCollection.find({"movie_id": id}).toArray();

            console.log(reviewObj);

            if (!reviewObj) throw 'No Reviews';
            return reviewObj;
  
      } catch (error) {
        throw error
      }
    },

    async getReviewForSingleUser(username){

      try {            
            const reviewCollection = await reviews();
            const reviewObj= await reviewCollection.find({ "comments.username":username}).toArray();

            console.log(reviewObj);

            if (!reviewObj) throw 'No Reviews';
            return reviewObj;
  
      } catch (error) {
        throw error
      }

    },
};

export default reviewsDataFunctions;