import { ObjectId } from "mongodb";

const helperFunctions = {

    validateName(str,fieldName){
        if (typeof str !== 'string') return  ` Enter valid ${fieldName}`;
        if(str.length === 0) return `${fieldName} cannot be an empty string or just spaces`;
        //if( /\d/.test(str)) return  `${fieldName} should not contain numbers`;
        if ((/\s/).test(str) === true) return  `${fieldName} should not have spaces`;
        if(str.length < 2 || str.length > 25) return  `${fieldName} should have at least 2 characters long with a max of 25 characters`;
        return true;
      }, 

      validateEmail(email){
        if (typeof email !== 'string') return  ` Enter valid  a email`;
        if(email.trim().length === 0) return `Email cannot be an empty string or just spaces`;
        if ((/\s/).test(email) === true) return  `Email should not have spaces`;
        if(!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))return `Invalid email`;
        return true;
      },

    validatePassword(password,fieldName){
        if (typeof password !== 'string') return  ` Enter valid  a password`;
        if(password.length === 0) return `${fieldName} cannot be an empty string or just spaces`;
        if ((/\s/).test(password) === true) return  `${fieldName} should not have spaces`;
        if (password.length < 3) return  `${fieldName} should have atleast 3 characters`;
       // var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
       // if(!password.match(decimal)) return  `${fieldName} should needs at least one uppercase character, one number and at least one special character`;
        return true;
      },

    validateObjectId(id,fieldName){
        id = id.trim();
        if (!id) return {error : `You must provide ID for the ${fieldName}`};
        if (typeof id !== 'string') return {error : `${fieldName} ID must be a string`};
        id = id.trim();
        if (id.length === 0) return {error : `${fieldName} ID cannot be an empty string or just spaces`};
        if (!ObjectId.isValid(id)) return {error : `Invalid ${fieldName} ID`};
        return true;
        },

      checkComments(username,comment,movieRating,commentTag){
          if(!username && !comment && !movieRating && !commentTag) return "All fields are required";
          return true;
        }, 

      checkMovieReview(movieName,movieDescription,genre,cast,release_date){
        if(movieName.trim().length == 0 && movieDescription.trim().length == 0 && genre.trim().length == 0 && cast.length == 0
        && release_date.trim().length == 0 ) return "All fields are required";
       return true;
      },

      checkUserFields(firstName,lastName,username,emailAddress,gender,city,state,age,password,comments,favoredtags){
        if(firstName.trim().length == 0 && lastName.trim().length == 0 && username.trim().length == 0 && emailAddress.trim().length == 0
           && gender.trim().length == 0 && city.trim().length == 0 && state.trim().length == 0 && age.length == 0
            && password.length == 0 &&comments.trim().length == 0 && favoredtags.length == 0) return "All fields are required";
          return true;
      },

      checkMoviesFields(title,release_date,genre,director, cast,movie_poster_url,movie_rating,review_count){

        if (!title || !release_date || !genre || !director || !cast || !movie_poster_url || !movie_rating || !review_count)return `All fields are required`;
    
         return true;
       },

       validateArray(array,fieldName){
        if (!Array.isArray(array)) return `${fieldName} Must be a valid Array`;
        if (array.length === 0) return `${fieldName} Array  be empty`;
        for (var i = 0; i < array.length; i++) {
            if(typeof array[i] !== 'string')return `${fieldName} Array Items Must be a valid string`;
        }
        for (var i = 0; i < array.length; i++) {
            if(array[i].trim().length === 0) return `${fieldName} Array Items cannot be an empty string or just spaces`;
        }
        return true;
    },

    validateRating(rating){
          // check if the passed value is a number
      if(typeof rating != 'number' && isNaN(rating)) return `rating must be a number`;
      if(rating < 0 || rating > 5) return `rating must be within 1 - 5`;
        return true;
      },

      validateNumber(number,fieldName){
        if(!Number.isInteger(number)) return fieldName+' must be a valid integer';
        return true;
      },

      validateReviewCount(reviewCount){
        if(!Number.isInteger(reviewCount)) return 'Review count must be a valid integer';
        if(reviewCount < 0)return 'Review count must greater than 0';
        return true;
      },

      validateString (str,fieldName){
        if (typeof str !== 'string')
            return `${fieldName}  Must be a valid string`;
        
       if(str.trim().length === 0)
          return `${fieldName} cannot be an empty string or just spaces`;

      return true;
    },

    validateObjectId(id,fieldName){
      id = id.trim();
      if (!id) return {error : `You must provide ID for the ${fieldName}`};
      if (typeof id !== 'string') return {error : `${fieldName} ID must be a string`};
      id = id.trim();
      if (id.length === 0) return {error : `${fieldName} ID cannot be an empty string or just spaces`};
      if (!ObjectId.isValid(id)) return {error : `Invalid ${fieldName} ID`};
  
      return true;
      },

      validateDate(date){
          if( (new Date(date) === "Invalid Date") || isNaN(new Date(date))) return `date is invalid. Enter date as month/day/year`;
          return true;
      }
      
   }
   
 export default helperFunctions;