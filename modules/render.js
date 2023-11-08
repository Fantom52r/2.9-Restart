import { initLike, initReply } from "./helpers.js";
import { comments } from "./api.js";

const listElement = document.getElementById("list");


export const renderComments = () => {
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
    listElement.innerHTML = commentsHtml;
    initLike();
    initReply();
  };

  