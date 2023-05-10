
import { reviews } from '../config/mongoCollections.js';
import helperFunctions from '../helpers.js';
import { ObjectId } from 'mongodb';
const commentsDataFunctions = {

    async createComment(movie_id,username,comment,movieRating,commentTag){
  
        try{

            //check if all fields are provide
            const allValidate  = helperFunctions.checkComments(username,comment,movieRating,commentTag);
            if(allValidate !== true) throw allValidate;

            //validate movie id
            const idValidation = helperFunctions.validateObjectId(movie_id, "movie_id");
            if(idValidation !== true) throw idValidation;

            //validate movie_rating
            const ratingValidation = helperFunctions.validateRating(movieRating);
            if(ratingValidation !== true) throw ratingValidation

            //validate username
            const usernameValidation = helperFunctions.validateString(username,"username");
            if(usernameValidation !== true) throw usernameValidation;

            //validate commentTag
            const castValidation = helperFunctions.validateArray(commentTag,"commentTag");
            if(castValidation !== true) throw castValidation;

            const reviewsCollection = await reviews();

            movieRating = parseFloat(movieRating);

            const userComment =  { 
                "_id": new ObjectId(),
                "username": username,
                "comment": comment,
                "movieRating": movieRating,
                "commentTags": commentTag
              };

            const newInsertInfo = await reviewsCollection.updateOne({ movie_id : movie_id},
            { $push: { "comments" : userComment } });

            return newInsertInfo

        }catch(err){
            throw err;
        }
    },
};

export default commentsDataFunctions;
