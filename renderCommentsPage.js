import { comments, getPostRequest, token, name } from "./modules/api.js";
import { initLike, initReply } from "./modules/helpers.js";
import { renderLoginPage } from "./renderLoginPage.js";

export function renderCommentsPage() {
  let appElement = document.getElementById("app");
  console.log(comments);
  const commentsHtml = comments
    .map((comment, index) => {
      return ` <li class="comment" id="comment" data-id="${index}">
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
      ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button ${
            comment.isLiked ? "-active-like" : ""
          }"data-index="${index}"></button>
        </div>
      </div>
    </li>`;
    })
    .join("");

  let commentsPageHtml = `

<div class="container">
  <div class="comments-loader">
    Лента комментариев загружается !
  </div>
  <ul class="comments"  id="list"  >
  ${commentsHtml}
  </ul>
  <div class="Loader">
    Комментарий добавляется
  </div>
  ${
    token
      ? `<div class="add-form">
  <input id="inputName" value="${name}"
    type="text"
    class="add-form-name"
    placeholder="Введите ваше имя"
    readonly
  />
  <textarea id="inputComment" value=""
    type="textarea"
    class="add-form-text"
    placeholder="Введите ваш коментарий"
    rows="4"
  ></textarea>
  <div class="add-form-row">
    <button class="add-form-button" id="addButton">Написать</button>
  </div>
</div>`
      : `<a href="#" id="link">Чтобы добавить комментарий,Авторизуйтесь</a>`
  }
</div>
`;

  appElement.innerHTML = commentsPageHtml;
  let linkToLogin = document.getElementById("link");
  linkToLogin?.addEventListener("click", () => {
    renderLoginPage();
  });

  if (token) {
    initLike();
    initReply();
  }

  const addButtonElement = document.getElementById("addButton");

  addButtonElement?.addEventListener("click", () => {
    const inputNameElement = document.getElementById("inputName");
    const inputCommentElement = document.getElementById("inputComment");

    if (inputNameElement.value === "" && inputCommentElement.value === "") {
      inputNameElement.classList.add("error");
      inputCommentElement.classList.add("error");
    }
    if (inputNameElement.value !== "" && inputCommentElement.value !== "") {
      inputNameElement.classList.remove("error");
      inputCommentElement.classList.remove("error");
    }

    getPostRequest();
  });
}
