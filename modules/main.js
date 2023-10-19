import { renderComments } from "./render.js";
import { getRequest, getPostRequest } from "./api.js";


const inputNameElement = document.getElementById("inputName");
const inputCommentElement = document.getElementById("inputComment");
const addButtonElement = document.getElementById("addButton");


const listElement = document.getElementById("list");




const formElement = document.querySelector(".add-form");

getRequest();
renderComments();

addButtonElement.addEventListener("click", () => {
  if (inputNameElement.value  === '' && inputCommentElement.value === '' ) {
    inputNameElement.classList.add("error");
    inputCommentElement.classList.add("error");

  }
  if (inputNameElement.value  !== '' && inputCommentElement.value !== '') {
    inputNameElement.classList.remove("error");
    inputCommentElement.classList.remove("error");
  }

  getPostRequest();
  renderComments();
});

