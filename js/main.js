let userNameInput = document.querySelector("#name")
let userEMailInput = document.querySelector("#eMail")
let userPasswordInput = document.querySelector("#password")
let userLblMessageInput = document.querySelector("#lblMessage")

let btnSignupElement = document.querySelector("#btnSignup")
let btnLogInElement = document.querySelector("#btnLogin")

let usersList = []

if (btnSignupElement != null) {
    btnSignupElement.addEventListener("click", addUser)

}

if (btnLogInElement != null) {
    btnLogInElement.addEventListener("click",logIn)
}


if(userNameInput != null)
    {
        userNameInput.addEventListener("keydown", function (event) {

            if (event.key == "Enter") {
                signUpValidation();
        
            }
        
        })
    }

userEMailInput.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        signUpValidation();
    }
})
userPasswordInput.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        signUpValidation();
    }
})



function signUpValidation() {
    userNameValidation();
    if (userNameValidation() == true) {
        userEMailInputValidation();

        if (userEMailInputValidation() == true) {
            userPasswordInputValidation();
            if (userPasswordInputValidation() == true) {
                addUser();
            }
        }
    }

}


function addUser() {

    loadLocalStorage();
    let user = { name: userNameInput.value, email: userEMailInput.value, password: userPasswordInput.value }

    let userInArray = usersList.find(x => x.name == user.name && x.email == user.email)

    if (userInArray != null) {
        userLblMessageInput.innerText = `${user.name} already registered`;
        userLblMessageInput.style.background = "yellow"
        return false;
    }
    else {

        usersList.push(user);
        window.localStorage.setItem("usersKey", JSON.stringify(usersList))

        userLblMessageInput.innerText = `${user.name} You are registered 😀🎉🎈`;
        userLblMessageInput.style.background = "Green";

        window.location.href = '../index.html'
    }


}

function loadLocalStorage() {
    let localStorageUsers = window.localStorage.getItem("usersKey")
    if (localStorageUsers != null) {
        usersList = JSON.parse(localStorageUsers)

    }
}


function userNameValidation() {
    if (userNameInput.value == "") {
        inputAddIsInValid(userNameInput);
        userLblMessageInput.innerText = "enter your name"
        userLblMessageInput.style.color = "red"
        return false;
    }
    if (userNameInput.value.length < 3) {
        inputAddIsInValid(userNameInput);
        userLblMessageInput.innerText = "your name less than 3 characters"
        userLblMessageInput.style.color = "red"
        return false;
    }

    // is valid
    inputRemoveIsInValid(userNameInput);
    inputAddIsValid(userNameInput);
    userLblMessageInput.innerText = "";
    return true;

}



function userEMailInputValidation() {
    if (userEMailInput.value == "") {
        userEMailInput.classList.add("is-invalid");
        userLblMessageInput.innerText = "Enter your email";
        userLblMessageInput.style.color = "red"
        return false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let emailRegEx = new RegExp(emailPattern)
    if (emailRegEx.test(userEMailInput.value) == false) {
        userEMailInput.classList.add("is-invalid")
        userLblMessageInput.innerText = "Your email format is incorrect"
        userLblMessageInput.style.color = "fuchsia"
        return false;
    }

    userEMailInput.classList.remove("is-invalid")
    userEMailInput.classList.add("is-valid")
    userLblMessageInput.value = "";
    return true;

}


function userPasswordInputValidation() {
    if (userPasswordInput.value == "") {

        userPasswordInput.classList.add("is-invalid")
        userLblMessageInput.innerText = "Enter your Password"
        userLblMessageInput.style.color = "orange"
        return false;
    }
    if (userPasswordInput.value.length < 8) {
        userPasswordInput.classList.add("is-invalid")
        userLblMessageInput.innerText = "Your Password is less than 8 characters"

        userLblMessageInput.style.color = "Gray";
        return false;
    }
    userPasswordInput.classList.remove("is-invalid")
    userPasswordInput.classList.add("is-valid")
    userLblMessageInput.innerText = "";
    return true;

}
function inputAddIsValid(input) {

    input.classList.add("is-valid");


}
function inputAddIsInValid(input) {

    input.classList.add("is-invalid")


}

function inputRemoveIsValid(input) {
    input.classList.remove("is-vaild")
}
function inputRemoveIsInValid(input) {
    input.classList.remove("is-invalid")
}

function logIn() {
    loadLocalStorage();
    let userInArray = usersList.find(x=> x.email == userEMailInput.value && x.password == userPasswordInput.value)
    if(userInArray == null)
        {
            userLblMessageInput.innerText = "Your email or password is wrong 🤷‍♂️"
            userLblMessageInput.style.color = "red"
        }
        else
        {
            userLblMessageInput.innerText = `Welcome ${userInArray.name} 🎉🙌`
            userLblMessageInput.style.color = "lime"
        }
}
