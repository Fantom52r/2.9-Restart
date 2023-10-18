import { renderComments } from "./render.js";
import { currentDate } from "./helpers.js";

const loaderElement = document.querySelector(".Loader");
const inputNameElement = document.getElementById("inputName");
const inputCommentElement = document.getElementById("inputComment");
const formElement = document.querySelector(".add-form");
const commentsLoaderElement = document.querySelector(".comments-loader");

const userUrl = "https://wedev-api.sky.pro/api/v1/dmitrii-zhukov/comments";
commentsLoaderElement.style.display = "flex";

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
    })
      .then((response) => {
        return response.json();
      })
      .then((responseLoader) => {
        commentsLoaderElement.style.display = "none";
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
          };
        });
  
        comments = arrComments;
        renderComments();
      });
  }

  export function getPostRequest() {
    loaderElement.style.display = "block";
    formElement.style.display = "none";
    return fetch(userUrl, {
      method: "POST",
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
        console.log(response);
        return response.json();
      })
      .then(() => {
        formElement.style.display = "none";
        loaderElement.style.display = "flex";
        inputNameElement.value = "";
        inputCommentElement.value = "";
      })
      .then(() => {
        return getRequest();
      })
      .then(() => {
        loaderElement.style.display = "none";
        formElement.style.display = "flex";
      })
      .catch((error) => {
        loaderElement.style.display = "none";
        formElement.style.display = "flex";
  
        if (error.message === "Неверный ввод") {
          alert("Имя и комментарий должны быть не короче 3 символов");
        } else if (error.message === "Сервер сломался") {
          alert("Сервер сломался");
        } else {
          alert("Интернет отключен, попробуйте позже");
        }
      });
  }