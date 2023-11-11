import { getRequest, login, setToken, userId, userName } from "./modules/api.js"


export function renderLoginPage () {
    let appElement = document.getElementById("app")

   let loginPageHTML = `
   <div class="container">
   <div class="add-form">
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
     <div class="add-form-row">value
       <button class="add-form-button" id="loginButton">Войти</button>
     </div>
   </div>
 </div>
   `
   appElement.innerHTML = loginPageHTML

   const inputLoginElement = document.getElementById("inputLogin")
    const inputPasswordElement = document.getElementById("inputPassword")
    const loginButtonElement = document.getElementById("loginButton")
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