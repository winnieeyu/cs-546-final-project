const registrationForm = document.getElementById('registration-form');
const loginForm = document.getElementById('login-form');
const postReview  = document.getElementById("review-form");

// const textInput = document.getElementById('text_input');
// const displayResults = document.getElementById('results');

const validateName = (str,fieldName) => {
  if (typeof str !== 'string') return  ` Enter valid ${fieldName}`;
  if(str.length === 0) return `${fieldName} cannot be an empty string or just spaces`;
  if( /\d/.test(str)) return  `${fieldName} should not contain numbers`;
  if ((/\s/).test(str) === true) return  `${fieldName} should not have spaces`;
  if(str.length < 2 || str.length > 25) return  `${fieldName} should have at least 2 characters long with a max of 25 characters`;
  return true;
}

const validateEmail = (email) => {
  if (typeof email !== 'string') return  ` Enter valid  a email`;
  if(email.trim().length === 0) return `Email cannot be an empty string or just spaces`;
  if ((/\s/).test(email) === true) return  `Email should not have spaces`;
  if(!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))return `Invalid email`;
  return true;
};


const validateUsername = (username)=>{
  if (typeof username !== 'string') return  ` Enter valid  a username`;
  if(username.trim().length === 0) return `Username cannot be an empty string or just spaces`;
  return true;
};

const validatePassword = (password,fieldName) => {
  if (typeof password !== 'string') return  ` Enter valid  a password`;
  if(password.length === 0) return `${fieldName} cannot be an empty string or just spaces`;
  if ((/\s/).test(password) === true) return  `${fieldName} should not have spaces`;
  if (password.length < 3) return  `${fieldName} should have atleast 3 characters`;
  //var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
 // if(!password.match(decimal)) return  `${fieldName} should needs at least one uppercase character, one number and at least one special character`;
  return true;
};

if (registrationForm) {

  //add event listener for submit
  registrationForm.addEventListener('submit', (event) => {
    console.log('Form submission fired');

    //prevent form submission without valiadation
    event.preventDefault();

    let isValid = true;
    let isValidPassword = true;

    //get form data
    const firstNameInput = (document.getElementById('firstNameInput').value).trim();
    const lastNameInput = (document.getElementById('lastNameInput').value).trim();
    const username = (document.getElementById('username').value).trim();
    const emailAddressInput = (document.getElementById('emailAddressInput').value).trim();
    const gender = (document.getElementById('gender').value).trim();
    const city = (document.getElementById('city').value).trim();
    const state = (document.getElementById('state').value).trim();
    const age = (document.getElementById('age').value).trim();
    const selfcomment = (document.getElementById('selfcomment').value).trim();
    const tag1 = document.getElementById('tag1');
    const tag2 = document.getElementById('tag2');
    const tag3 = document.getElementById('tag3');
    const tag4 = document.getElementById('tag4');
    const tag5 = document.getElementById('tag5');


    let tag = [];
    if(tag1.checked){
      tag.push(tag1.value.toString());
    }
    if(tag2.checked){
      tag.push(tag2.value.toString());
    }  
    if(tag3.checked){
      tag.push(tag3.value.toString());
    }  
    if(tag4.checked){
      tag.push(tag4.value.toString());
    }  
    if(tag5.checked){
      tag.push(tag5.value.toString());
    }  



    const passwordInput = (document.getElementById('passwordInput').value).trim();
    const confirmPasswordInput = (document.getElementById('confirmPasswordInput').value).trim();

    //error elements
    //const err = document.getElementById('err');
    const firstNameError= document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const cityError = document.getElementById('cityError');
    const stateError = document.getElementById('stateError');
    const ageError = document.getElementById('ageError');
    const selfcommentError = document.getElementById('selfcommentError');
    const errorTag = document.getElementById('errorTag');
    const genderError = document.getElementById('genderError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const err = document.getElementById('err');

    if(firstNameInput.length == 0 && lastNameInput.length == 0  &&  emailAddressInput.length  &&  roleInput.length  &&  passwordInput.length == 0  &&  confirmPasswordInput.length == 0){
      err.innerHTML = "All fields are required";
      isValid = false;
    }else{
      err.innerHTML = "";
    }

    //validate firstNameInput
    const fnameValidation = validateName(firstNameInput,"First Name");
    if(fnameValidation !== true){
      firstNameError.innerHTML = fnameValidation;
      isValid = false;
    }else{
      firstNameError.innerHTML = "";
    }

  //validate lastNameInput
  const lnameValidation = validateName(lastNameInput,"Last Name");
  if(lnameValidation !== true){
    lastNameError.innerHTML = lnameValidation;
    isValid = false;
  }else{
    lastNameError.innerHTML =  "";
  }

  if(city.length === 0){
    cityError.innerHTML = "City is required";
        isValid = false;
      }else{
        cityError.innerHTML = "";
      }

        if(state.length === 0){
          stateError.innerHTML = "State is required";
        isValid = false;
        }else{
          stateError.innerHTML = "";
        }

        if(age.length === 0){
          ageError.innerHTML = "Age is required";
          isValid = false;
        }else{
          if(!parseInt(age)){
            ageError.innerHTML = "Age must be a number";
          }else{
            ageError.innerHTML = "";
          }
          
        }

        if(selfcomment.length === 0){
          selfcommentError.innerHTML = "Self introduction is required";
        isValid = false;
        }else{
          selfcommentError.innerHTML = "";
        }

      //validate username
      const validusername = validateUsername(username);
      if(validusername !== true){
        usernameError.innerHTML = validusername;
        isValid = false;
      }else{
        usernameError.innerHTML = "";
      }

  //validate emailAddressInput
  const validEmailAddressInput = validateEmail(emailAddressInput,"Email Address");
  if(validEmailAddressInput !== true){
    emailError.innerHTML = validEmailAddressInput;
    isValid = false;
  }else{
    emailError.innerHTML = "";
  }

  console.log(tag);

  if(tag.length === 0){
    errorTag.innerHTML = "Select atleast one Favorite movies"
    isValid = false;
  }else{
    errorTag.innerHTML = "";
  }

  //validate user role
  if(gender !== 'F' && gender !== 'M'){
    genderError.innerHTML = "Gender must be F or M";
    isValid = false;
  }else{
    genderError.innerHTML = "";
  }

  //validate password
  const validatePasswordInput = validatePassword(passwordInput,"Password")
  if(validatePasswordInput !== true){
    passwordError.innerHTML = validatePasswordInput;
    isValid = false;
    isValidPassword = false;
  }else{
    passwordError.innerHTML = "";
  }
    //validate confirm password
    const validateConfirmPasswordInput = validatePassword(confirmPasswordInput,"Confirm password")
    if(validateConfirmPasswordInput !== true){
      confirmPasswordError.innerHTML = validateConfirmPasswordInput;
      isValid = false;
      isValidPassword = false;
    }else{
      confirmPasswordError.innerHTML =  "";
    }

    if(isValidPassword){
      if(passwordInput !== confirmPasswordInput){
        console.log('does not match')
        passwordError.innerHTML = "The two password doesnt match";
        isValid = false;
      }else{
        console.log('match')
        passwordError.innerHTML = "";
      }
    }
    if(!isValid) alert("Form has error")

    //if(!isValid) event.preventDefault();
  
    //if form has no errors submit it
    if(isValid) registrationForm.submit(); 

  });
}


if (loginForm) {

  loginForm.addEventListener('submit', (event) => {

    console.log('Form submission fired');
    
    event.preventDefault();

    let isValid = true;

    //get form data
    const usernameInput = (document.getElementById('username').value).trim();
    const passwordInput = (document.getElementById('passwordInput').value).trim();

    //error elements
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    //validate username
    const validusername = validateUsername(usernameInput);
    if(validusername !== true){
      usernameError.innerHTML = validusername;
      isValid = false;
    }else{
      usernameError.innerHTML = "";
    }

    //validate password
    const validatePasswordInput = validatePassword(passwordInput,"Password")
    if(validatePasswordInput !== true){
      passwordError.innerHTML = validatePasswordInput;
      isValid = false;
    }else{
      passwordError.innerHTML = "";
    }

    //if form has no errors submit it
    if(isValid) loginForm.submit(); 

  });
}

if(postReview){
    postReview.addEventListener('submit', (event) => {
      event.preventDefault();

    let isValid = true;

    //get form data
    const rating = (document.getElementById('rating').value).trim();
    const tag1 = document.getElementById('tag1');
    const tag2 = document.getElementById('tag2');
    const tag3 = document.getElementById('tag3');
    const tag4 = document.getElementById('tag4');
    const comments = (document.getElementById('comments').value).trim();
    let tag = [];

   

if(tag1.checked){
  tag.push(tag1.value.toString());
}
if(tag2.checked){
  tag.push(tag2.value.toString());
}  
if(tag3.checked){
  tag.push(tag3.value.toString());
}  
if(tag4.checked){
  tag.push(tag4.value.toString());
}  
 
    //error elements
    const ratingError = document.getElementById('ratingError');
    const errorTag = document.getElementById('errorTag');
    const errorComents = document.getElementById('errorComents');

    //validate rating
    if(rating.length === 0){
      ratingError.innerHTML = "Rating is required";
      isValid = false;
    }else{
      ratingError.innerHTML = "";
    }
  
    if(tag.length === 0){
      errorTag.innerHTML = "Check atleast 1 comment tag";
      isValid = false;
    }else{
      errorTag.innerHTML = "";
    }

    if(comments.length === 0){
      errorComents.innerHTML = "Check atleast one comment tag";
      isValid = false;
    }else{
      errorComents.innerHTML = "";
    }

    //if form has no errors submit it
    if(isValid) postReview.submit(); 

  });
}


const loginBtn = document.getElementById('loginlink');


const blurr =  document.getElementById('blurred');
const loginformdiv = document.getElementById("loginform");
if(loginBtn !== null){
loginBtn.addEventListener('click', (event) => {

  if(loginformdiv.classList.contains("hidden")){
    loginformdiv.classList.replace('hidden','visible');
    blurr.classList.replace('hidden','visible');
    loginBtn.innerText = "Close Login Form";
  }else{
    loginformdiv.classList.replace('visible','hidden');
    blurr.classList.replace('visible','hidden');
    loginBtn.innerText = "Login";
  }
});

blurr.addEventListener('click', (event) => {
  if(loginformdiv.classList.contains("hidden")){
    loginformdiv.classList.replace('hidden','visible');
    event.target.classList.replace('hidden','visible');
    loginBtn.innerText = "Close Login Form";
  }else{
    loginformdiv.classList.replace('visible','hidden');
    event.target.classList.replace('visible','hidden');
    loginBtn.innerText = "Login";
  }
});
}
//tabs
function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
const element = document.getElementById("defaultOpen");
if(element !== null) element.click();