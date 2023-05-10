//import mongo collections, bcrypt and implement the following data functions
import { users } from '../config/mongoCollections.js';
import bcrypt from 'bcryptjs';
import helperFunctions from '../helpers.js';

const userDataFunction = {

 async createUser(firstName,lastName,username,emailAddress,gender,city,state,age,password,comments,favoredtags){
  
    try{
          firstName = firstName.trim();
          lastName = lastName.trim();
          emailAddress = emailAddress.trim();
          gender = gender.trim();
          city = city.trim();
          state = state.trim();
          password = password.trim();
          comments = comments.trim();
          username = username.trim();

          //check if all field has been supplied
          const inputsValidation  = helperFunctions.checkUserFields(firstName,lastName,username,emailAddress,gender,city,state,age,password,comments,favoredtags);
          if(inputsValidation !== true) throw inputsValidation;

          //validate firstNameInput
          const fnameValidation = helperFunctions.validateName(firstName,"First Name");
          if(fnameValidation !== true) throw fnameValidation;

          //validate lastNameInput
          const lnameValidation = helperFunctions.validateName(lastName,"Last Name");
          if(lnameValidation !== true)throw lnameValidation;

          //validate username
          const usernameValidation = helperFunctions.validateString(username,"User name");
          if(usernameValidation !== true)throw usernameValidation;

        //validate emailAddressInput
        const validEmailAddressInput = helperFunctions.validateEmail(emailAddress,"Email Address");
        if(validEmailAddressInput !== true) throw validEmailAddressInput;

        //validate gender
        if(gender.length === 0)throw "Gender is required";
        if(gender !== 'M' && gender !== 'F') throw "Gender can pnly be M or F";

        //validate city
        const cityValidation = helperFunctions.validateString(city,"city");
        if(cityValidation !== true) throw cityValidation;

        //validate state
        const stateValidation = helperFunctions.validateString(state,"state");
        if(stateValidation !== true) throw stateValidation;

        //validate age
        const ageValidation = helperFunctions.validateNumber(age,"Age");
        if(ageValidation !== true) throw ageValidation;

        //validate comments
        const commentsValidation = helperFunctions.validateString(comments,"comments");
        if(commentsValidation !== true) throw commentsValidation;

        //valiadte favored tags
        const favoredtagsValidation = helperFunctions.validateArray(favoredtags,"favoredtags");
        if(favoredtagsValidation !== true) throw favoredtagsValidation;

        //validate password
        const validatePasswordInput = helperFunctions.validatePassword(password,"Password")
        if(validatePasswordInput !== true) throw validatePasswordInput;

          //encript password
          const passwordHash =  await bcrypt.hash(password,10);
  
          //change email and username to lowercase 
          emailAddress = (emailAddress.trim()).toLowerCase();
          username = (username.trim()).toLowerCase();

          //insert data into mongo db
          let newUser = {
                      "firstname": firstName,
                      "lastname": lastName,
                      "username": username,
                      "emailAddress": emailAddress,
                      "Gender":gender,
                      "City":city,
                      "State":state,
                      "Age":age,
                      "hashedPassword":passwordHash,
                      "selfIntro":  [{
                                      "Comments": comments,
                                      "favoredtags": favoredtags
                                    }]
                    }

            const userCollection = await users();
  
            //check if username  supplied exist
            const userObj = await userCollection.find({ username :username}).toArray();
            if(userObj.length > 0) throw `There exist a user with username ${username}`;

            //check if there is user with same email
            const emailObj = await userCollection.find({ emailAddress :emailAddress}).toArray();
            if(emailObj.length > 0) throw `There exist a user with email ${emailAddress}`;
            
            //if no errors insert user details
            const newInsertInfo = await userCollection.insertOne(newUser);

            //if operation was sucess return true else false
            if(newInsertInfo.acknowledged === true) return {"insertedUser": true};
            else return {"insertedUser": false};
  
    } catch (error) {
  
        throw error;
    }
  
  },
   async checkUser(username, password){

      try {

          username = (username.trim()).toLowerCase();
          password = password.trim();

          //check if all field has been supplied
          if(username.length == 0 && password.length == 0) throw "All fields are required";

        //validate username
        const usernameValidation = helperFunctions.validateString(username,"User name");
        if(usernameValidation !== true)throw usernameValidation;

          //validate password
          const validatePasswordInput = helperFunctions.validatePassword(password,"Password")
          if(validatePasswordInput !== true) throw validatePasswordInput;

          //try to fetch data with email supplied
          const userObj = await this.getUser(username);

          //if no user found throw error
          if(userObj.length == 0) throw `Either the username  or password is invalid`;
 
          //check password validity
          const validPassword = await bcrypt.compare(password,userObj[0].hashedPassword);

          //if password matches return data else throw error
          if(validPassword){
            return {'fname':userObj[0].firstname,'lname':userObj[0].lastname, 'username':userObj[0].username};
          } else{
             throw "Either username or password is invalid";
          }

    } catch (error) {
        throw error
    }
  },

  async getUser(username){
    try {

     const userCollection = await users();
      const userObj = await userCollection.find({ username :username}).toArray();
      return userObj
    } catch (error) {
          throw error
    }
  }

}

export default userDataFunction;
