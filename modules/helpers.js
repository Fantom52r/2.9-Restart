import { comments } from "./api.js";
import { renderCommentsPage } from "../renderCommentsPage.js";


export const sanitizeHtml = (htmlString) => {
  return htmlString.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
};

export function initLike() {
  const likeButtonsElements = document.querySelectorAll(".like-button");
  for (const likeButtonsElement of likeButtonsElements) {
    const index = likeButtonsElement.dataset.index;
    likeButtonsElement.addEventListener("click", (event) => {
      event.stopPropagation();
      console.log(1);
      if (comments[index].isLiked) {
        comments[index].likes -= 1;
        comments[index].isLiked = false;
      } else {
        comments[index].likes += 1;
        comments[index].isLiked = true;
      }
      // renderComments();
      renderCommentsPage();
    });
  }
}
// export const currentDate = (data) => {
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
export function initReply() {
  const commentElement = document.querySelectorAll(".comment");
  for (const commentElements of commentElement) {
    commentElements.addEventListener("click", (event) => {
      const inputCommentElement = document.getElementById("inputComment");

      console.log(commentElements);
      event.stopPropagation();
      let index = commentElements.dataset.id;
      inputCommentElement.value = `${
        comments[index].text + ", " + comments[index].name
      }`;
    });
  }
}
