import { renderComments } from "./render.js";
import { getRequest, getPostRequest } from "./api.js";
import { isValidForm } from "./helpers.js";


const inputNameElement = document.getElementById("inputName");
const inputCommentElement = document.getElementById("inputComment");
const addButtonElement = document.getElementById("addButton");

// получаем элемент списка

const listElement = document.getElementById("list");

// получаем элемент инпута имени


// получаем элемент инпута коментария


const formElement = document.querySelector(".add-form");



// для работы с текущей датой создаем переменную и затем обращаемся к ней в разметке

// const currentDate = (data) => {
//   const months = [
//     "01",
//     "02",
//     "03",
//     "04",
//     "05",
//     "06",
//     "07",
//     "08",
//     "09",
//     "10",
//     "11",
//     "12",
//   ];
//   let day = data.getDate();
//   let month = months[data.getMonth()];
//   let year = data.getFullYear();
//   let hour = data.getHours() < 10 ? "0" + data.getHours() : data.getHours();
//   let minuts =
//     data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes();
//   let conclusion = `${day}.${month}.${year} ${hour}:${minuts}`;
//   return conclusion;
// };

// let currentDate = new Date();
// function getDate() {
//   return (time =
//     new Date().toLocaleDateString().slice(0, 6) +
//     new Date().toLocaleDateString().slice(8, 10) +
//     " " +
//     new Date().toLocaleTimeString().slice(0, -3));
// }
// console.log(getDate());
// тут начинается 2.1
// 1.

// 2. создаем массив с объектами




// function getRequest() {
//   return fetch(userUrl, {
//     method: "GET",
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((responseLoader) => {
//       commentsLoaderElement.style.display = "none";
//       return responseLoader;
//     })
//     .then((responseData) => {
//       const arrComments = responseData.comments.map((item) => {
//         return {
//           name: item.author.name,
//           date: currentDate(new Date(item.date)),
//           text: item.text,
//           likes: item.likes,
//           isLiked: false,
//         };
//       });

//       comments = arrComments;
//       renderComments();
//     });
// }

// function getPostRequest() {
//   loaderElement.style.display = "block";
//   formElement.style.display = "none";
//   return fetch(userUrl, {
//     method: "POST",
//     body: JSON.stringify({
//       text: inputCommentElement.value,
//       name: inputNameElement.value,
//       forceError: true,
//     }),
//   })
//     .then((response) => {
//       return response;
//     })
//     .then((response) => {
//       if (response.status === 201) {
//         return response.json();
//       } else if (response.status === 400) {
//         throw new Error("Неверный ввод");
//       } else if (response.status === 500) {
//         throw new Error("Сервер сломался");
//       } else {
//         throw new Error("Не работает интернет");
//       }
//       console.log(response);
//       return response.json();
//     })
//     .then(() => {
//       formElement.style.display = "none";
//       loaderElement.style.display = "flex";
//       inputNameElement.value = "";
//       inputCommentElement.value = "";
//     })
//     .then(() => {
//       return getRequest();
//     })
//     .then(() => {
//       loaderElement.style.display = "none";
//       formElement.style.display = "flex";
//     })
//     .catch((error) => {
//       loaderElement.style.display = "none";
//       formElement.style.display = "flex";

//       if (error.message === "Неверный ввод") {
//         alert("Имя и комментарий должны быть не короче 3 символов");
//       } else if (error.message === "Сервер сломался") {
//         alert("Сервер сломался");
//       } else {
//         alert("Интернет отключен, попробуйте позже");
//       }
//     });
// }

// function initLike() {
//   const likeButtonsElements = document.querySelectorAll(".like-button");
//   for (const likeButtonsElement of likeButtonsElements) {
//     const index = likeButtonsElement.dataset.index;
//     likeButtonsElement.addEventListener("click", (event) => {
//       event.stopPropagation();
//       console.log(1);
//       if (comments[index].isLiked) {
//         comments[index].likes -= 1;
//         comments[index].isLiked = false;
//       } else {
//         comments[index].likes += 1;
//         comments[index].isLiked = true;
//       }
//       renderComments();
//     });
//   }
// }
// Для ответа на комментарий создаем функицю initReply (2.11)

// function initReply() {
//   const commentElement = document.querySelectorAll("#comment");
//   for (const commentElements of commentElement) {
//     commentElements.addEventListener("click", (event) => {
//       event.stopPropagation();
//       let index = commentElements.dataset.id;
//       inputCommentElement.value = `${
//         comments[index].text + ", " + comments[index].name
//       }`;
//     });
//   }
// }

// function isValidForm () {
//   if (inputNameElement.value.length <= 2) {
//  return false
//   }
//   else if (inputCommentElement.value.length <= 2) {
// return false
//   }
//   else {
//     return true
//   }
// }

// const renderComments = () => {
//   const commentsHtml = comments
//     .map((comment, index) => {
//       return ` <li class="comment" id="comment" data-id="${index}">
//     <div class="comment-header">
//       <div>${comment.name}</div>
//       <div>${comment.date}</div>
//     </div>
//     <div class="comment-body">
//       <div class="comment-text">
//     ${comment.text}
//       </div>
//     </div>
//     <div class="comment-footer">
//       <div class="likes">
//         <span class="likes-counter">${comment.likes}</span>
//         <button class="like-button ${
//           comment.isLiked ? "-active-like" : ""
//         }"data-index="${index}"></button>
//       </div>
//     </div>
//   </li>`;
//     })
//     .join("");
//   listElement.innerHTML = commentsHtml;
//   initLike();
//   initReply();
// };
getRequest();
renderComments();

// Создаем функцию лайков

// навешиваем обработчик события на кнопку

addButtonElement.addEventListener("click", () => {
  if (inputNameElement.value  === '' && inputCommentElement.value === '' ) {
    inputNameElement.classList.add("error");
    inputCommentElement.classList.add("error");

  
  }
  if (inputNameElement.value  !== '' && inputCommentElement.value !== '') {
    inputNameElement.classList.remove("error");
    inputCommentElement.classList.remove("error");
  }
  /* тут ниже хранится разметка которая перерисовывает разметку Html. через innerHTML и обращение к элементам 
с помощью шаблонной строки.*/

  //  comments.push({
  //   name : inputNameElement.value
  //   .replaceAll("&", "&amp;")
  //   .replaceAll("<", "&lt;")
  //   .replaceAll(">", "&gt;")
  //   .replaceAll('"', "&quot;"),
  //   date : time,
  //   comment : inputCommentElement.value
  //   .replaceAll("&", "&amp;")
  //       .replaceAll("<", "&lt;")
  //       .replaceAll(">", "&gt;")
  //       .replaceAll('"', "&quot;"),
  //   likeButton : 0,
  //   isLike : false,
  //  })
  getPostRequest();
  renderComments();
});

// 1. найти элемент для ввода комментария
