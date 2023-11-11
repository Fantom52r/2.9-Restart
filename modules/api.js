// import { renderComments } from "./render.js";
import { currentDate } from "./helpers.js";
import { renderCommentsPage } from "../renderCommentsPage.js";



const loaderElement = document.querySelector(".Loader");

const formElement = document.querySelector(".add-form");
const commentsLoaderElement = document.querySelector(".comments-loader");

const userUrl = "https://wedev-api.sky.pro/api/v2/dmitrii-zhukov/comments/";



export let id 
export  let token ;
export let name
export const setToken = (newToken) => {
  token = newToken;
};
export const userName = (newName) => {
  name = newName
}

export const userId = (newid) => {
  id = newid
}
export let comments = [
    // {
    //   name: "Глеб Фокин",
    //   date: "12.02.22 12:18",
    //   comment: "Это будет первый комментарий на этой странице",
    //   likeButton: 3,
    //   isLike: false,
    // },
    // {
    //   name: " варвара.Н",
    //   date: "13.02.22 19:22",
    //   comment: "Мне нравится как оформлена эта страница ! ❤",
    //   likeButton: 75,
    //   isLike: false,
    // },
  ];

export function getRequest() {

    return fetch(userUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },

    })
      .then((response) => {
        return response.json();
      })
      .then((responseLoader) => {
        return responseLoader;
      })
      .then((responseData) => {
        const arrComments = responseData.comments.map((item) => {
          return {
            name: item.author.name,
            date: currentDate(new Date(item.date)),
            text: item.text,
            likes: item.likes,
            isLiked: false,
            id: item.id,
          };
        });
  
        comments = arrComments;
        renderCommentsPage();
      });
  }

  export function getPostRequest() {

    const inputNameElement = document.getElementById("inputName");
    const inputCommentElement = document.getElementById("inputComment");
    
    return fetch(userUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text: inputCommentElement.value,
        name: inputNameElement.value,
        forceError: true,
      }),
    })
      .then((response) => {
        return response;
      })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 400) {
          throw new Error("Неверный ввод");
        } else if (response.status === 500) {
          throw new Error("Сервер сломался");
        } else {
          throw new Error("Не работает интернет");
        }
      })
      .then(() => {
        
        inputNameElement.value = "";
        inputCommentElement.value = "";
      })
      .then(() => {
        return getRequest();
      })

      .catch((error) => {
  
        if (error.message === "Неверный ввод") {
          alert("Имя и комментарий должны быть не короче 3 символов");
        } else if (error.message === "Сервер сломался") {
          alert("Сервер сломался");
        } else {
          alert("Интернет отключен, попробуйте позже");
        }
      });
  }

  export function login({login, password}) {
    return fetch("https://wedev-api.sky.pro/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
      }),
    }).then((response) => {
      return response.json();
    });
  }