var loginStatus = 0;
var users =[];
var user= {};
var userRealName = ""


if (localStorage.getItem("users") != null) {
    users = JSON.parse(localStorage.getItem("users"))
}


var nameRegex = /^\w{2,25}$/
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
var passRegex = /^\w{8,12}$/

var error = ""
var display = document.getElementById('display');
var loginFormEmail
var loginButton 
var logoutButton
var switchToCreateAccountFormBtn
var userRealName
var email
var pass
var createAccountBtn = document.getElementById('createaccountbtn');
var switchToLoginFormBtn = document.getElementById('btntologinform');
var errorBox = document.getElementById('errorbox');


// If user is not logged in, show login form
if(loginStatus == 0){
    showLoginForm();
}else if(loginStatus == 1){
    // If user is logged in, welcome him

}

function showHomepage(){
    displayErrors()
    display.innerHTML = `<h1>Welcome ${userRealName}</h1>
    <p>You've logged in successfully</p>
    <button id="logout">Log Out</button>`
    logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', logOut)
}


function showLoginForm(){
    displayErrors();
    display.innerHTML = `<h1>Login to your account</h1>
    <label for="loginemail">Email</label>
    <input class="form-control" id="loginemail" type="email" required>
    <label for="loginpass">Password</label>
    <input class="form-control" id="loginpass" type="password" required>
    <div>
    <button class="btn btn-primary" id="loginbutton">Log in</button>
    <p>Don't have an account?</p><button class="btn btn-success" id="btntocreateaccountform">Create New Account</button></div>
    `
    loginFormEmail = document.getElementById('loginemail');
    loginFormPass = document.getElementById('loginpass'); 
    loginButton = document.getElementById('loginbutton');
    switchToCreateAccountFormBtn = document.getElementById('btntocreateaccountform');
    
    loginButton.addEventListener('click', logIn)
    switchToCreateAccountFormBtn.addEventListener('click', showCreateAccountForm) 
}
function showCreateAccountForm(){
    displayErrors();
    display.innerHTML =`
    <h1>Create New Account</h1>
        <label for="name">Your Name</label>
        <input id="name" type="text" class="form-control">
        <label for="email">Email</label>
        <input type="email" id="email"class="form-control">
        <label for="pass">Email</label>
        <input type="password" id="pass"class="form-control">
        <button class="btn btn-primary" id="createaccountbtn">Create Account</button>
        <div><p>Already have an account?</p><button id="btntologinform" class="btn btn-success">Log In</button></div>
        `
        createAccountBtn = document.getElementById('createaccountbtn');
        switchToLoginFormBtn = document.getElementById('btntologinform');

        createAccountBtn.addEventListener('click', createAccount)
        switchToLoginFormBtn.addEventListener('click', showLoginForm)
}

function logIn(){
    loginFormEmail = document.getElementById('loginemail').value;
    loginFormPass = document.getElementById('loginpass').value; 
    
        if(emailRegex.test(loginFormEmail)){
            if(passRegex.test(loginFormPass)){
                for (i=0; i<users.length; i++){
                    if(users[i].email == loginFormEmail){
                        if(users[i].password == loginFormPass){
                            loginStatus = 1
                            userRealName = users[i].name;
                            showHomepage();
                            clearErrors();
                        } else {
                            error += `Invalid Password`
                            displayErrors();
                        }
                    }
                }
                if(loginStatus == 0){
                    console.log(i)
                    error += `Email Not Registered, Please Create a new Account`
                }
                displayErrors();

            }else{
                error += `Not a Valid Password`
                displayErrors();
            }
        }else{ error += `Not a Valid Email`
        displayErrors();}
    
}
function createAccount(){
    var userRealName = document.getElementById('name').value
    var email = document.getElementById('email').value;
    var pass = document.getElementById('pass').value;
    
    if(nameRegex.test(userRealName)){
        if(emailRegex.test(email)){
            if(passRegex.test(pass)){
                for (i=0; i<users.length; i++){
                    if(users[i].email == email){
                        error += "email already exists, please log in"
                    }
                }
                if (error !== ""){
                    displayErrors();
                }else{
                    user = {
                        name: userRealName, email: email, password: pass
                    }
                    users.push(user);

                    localStorage.setItem("users", JSON.stringify(users));

                    console.log(users);
                    showLoginForm()
                }
            }else{
                error += `Not a Valid Password`
                displayErrors();
            }
        }else{
        error += `Not a Valid Email`
        displayErrors();}
    }else{
        error += `Not a Valid Name`
        displayErrors();
    }

}
function logOut(){
    clearErrors();
    loginStatus = 0
    userRealName = ""
    showLoginForm()
}


function validateNotEmpty(){
   
    if (loginFormEmail.value == ""){
        error += `Email Cannot Be Empty`;
        console.log("no email")
    }
    if(loginFormPass.value == ""){
        error += `Password cannot be Empty`;
        console.log("no pass")
    }
    
    if (error == ""){
        return true;
    }else{
        return false
    }
}

function displayErrors(){
    errorBox.innerHTML = error;
    clearErrors();
}
function clearErrors(){
    error = "";
}