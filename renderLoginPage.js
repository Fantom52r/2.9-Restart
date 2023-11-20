import { getRequest, login, setToken, userId, userName } from "./modules/api.js"

let isLoginMode = false

export function renderLoginPage () {
    let appElement = document.getElementById("app")


   let loginPageHTML = `
   <div class="container">
   <div class="add-form">
   <div class="input-wrapper">
   ${
    !isLoginMode ? `
    <input id="inputName" value=""
       type="text"
       class="add-form-name"
       placeholder="Введите Имя"
     />` : ""
   }
     <input id="inputLogin" value=""
       type="text"
       class="add-form-name"
       placeholder="Введите Логин"
     />
     <input id="inputPassword" value=""
     type="text"
     class="add-form-name"
     placeholder="Введите пароль"
   />
   </div>

     <div class="add-form-row footer-form">

     <button class="add-form-button" id="loginButton">${isLoginMode ? "Войти": "Зарегестрироваться"}</button>

     <a class="link" id="linkToReg">${isLoginMode ? "Зарегестрироваться": "Войти"}</a>

     </div>
   </div>
 </div>
   `
   appElement.innerHTML = loginPageHTML
   const linkElement = document.getElementById("linkToReg")
   const inputLoginElement = document.getElementById("inputLogin")
    const inputPasswordElement = document.getElementById("inputPassword")
    const loginButtonElement = document.getElementById("loginButton")
    linkElement.addEventListener("click",() => {
      isLoginMode = !isLoginMode
      renderLoginPage();
    })
    loginButtonElement.addEventListener("click",() => {
        login({
            login:inputLoginElement.value,
            password:inputPasswordElement.value
        }).then((responseData) => {
            console.log(responseData);
            setToken(responseData.user.token)
            userName(responseData.user.name)
            userId(responseData.user.id)
        }

        ).then(() => {
            getRequest()
        })
    })
}