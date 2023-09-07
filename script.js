// получаем элемент кнопки добавления

const addButtonElement = document.getElementById("addButton");

// получаем элемент списка

const listElement = document.getElementById("list");

// получаем элемент инпута имени

const inputNameElement = document.getElementById("inputName");

// получаем элемент инпута коментария

const inputCommentElement = document.getElementById("inputComment");

// для работы с текущей датой создаем переменную и затем обращаемся к ней в разметке

let currentDate = new Date();
function getDate() {
  return (time =
    new Date().toLocaleDateString().slice(0, 6) +
    new Date().toLocaleDateString().slice(8, 10) +
    " " +
    new Date().toLocaleTimeString().slice(0, -3));
}
console.log(getDate());
// тут начинается 2.1
// 1.

// 2. создаем массив с объектами

let comments = [
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

const userUrl = "https://wedev-api.sky.pro/api/v1/dmitrii-zhukov/comments";

function getRequest() {
  return fetch(userUrl, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      const arrComments = responseData.comments.map((item) => {
        return {
          name: item.author.name,
          date: getDate(item.date),
          text: item.text,
          likes: item.likes,
          isLiked: false,
        };
      });
      comments = arrComments;
      renderComments();
    });
}

function getPostRequest() {
  return fetch(userUrl, {
    method: "POST",
    body: JSON.stringify({
      text: inputCommentElement.value,
      name: inputNameElement.value,
    }),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((responseData) => {
      return getRequest();
    });
}

function initLike() {
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
      renderComments();
    });
  }
}
// Для ответа на комментарий создаем функицю initReply (2.11)

function initReply() {
  const commentElement = document.querySelectorAll("#comment");
  for (const commentElements of commentElement) {
    commentElements.addEventListener("click", (event) => {
      event.stopPropagation();
      let index = commentElements.dataset.id;
      inputCommentElement.value = `${
        comments[index].text + ", " + comments[index].name
      }`;
    });
  }
}

const renderComments = () => {
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
getRequest();
renderComments();

// Создаем функцию лайков

// навешиваем обработчик события на кнопку

addButtonElement.addEventListener("click", () => {
  inputNameElement.classList.remove("error");
  inputCommentElement.classList.remove("error");

  if (inputNameElement.value === "" || inputCommentElement.value === "") {
    inputNameElement.classList.add("error");
    inputCommentElement.classList.add("error");
    return;
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
  inputNameElement.value = "";
  inputCommentElement.value = "";
});

// 1. найти элемент для ввода комментария
