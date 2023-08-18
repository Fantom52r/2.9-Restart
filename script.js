// получаем элемент кнопки добавления

const addButtonElement = document.getElementById('addButton')

// получаем элемент списка

const listElement = document.getElementById('list')

// получаем элемент инпута имени

const inputNameElement = document.getElementById('inputName')

// получаем элемент инпута коментария

const inputCommentElement = document.getElementById('inputComment')

// для работы с текущей датой создаем переменную и затем обращаемся к ней в разметке

let currentDate = new Date();

// тут начинается 2.1
// 1. 


// 2. создаем массив с объектами

const comments = [
  {
    name : 'Глеб Фокин',
    date : '12.02.22 12:18',
    comment : 'Это будет первый комментарий на этой странице',
    likeButton : 3,
    isLike : false,
  },
  {
    name : ' варвара.Н', 
    date : '13.02.22 19:22',
    comment : 'Мне нравится как оформлена эта страница ! ❤',
    likeButton : 75,
    isLike : false,
  }
]
function initLike() {
  const likeButtonsElements = document.querySelectorAll('.like-button')
    for (const likeButtonsElement of likeButtonsElements) {
    const index = likeButtonsElement.dataset.index
    likeButtonsElement.addEventListener('click', (event) => {
      event.stopPropagation();
      console.log(1);
      if (comments[index].isLike) {
        comments[index].likeButton -= 1;
        comments[index].isLike = false;
      } else {
        comments[index].likeButton += 1;
        comments[index].isLike = true;
      }
      renderComments();
    })


    }
  }
  // Для ответа на комментарий создаем функицю initReply (2.11)

function initReply() {
  const commentElement = document.querySelectorAll('#comment')
for (const commentElements of commentElement) {
  commentElements.addEventListener('click', (event) => {
    event.stopPropagation();
 let index = commentElements.dataset.id
 inputCommentElement.value = `${comments[index].comment + comments[index].name}`
  })
}
  }

const renderComments = () => {
  const commentsHtml = comments.map((comment, index) =>{
    return ` <li class="comment" id="comment" data-id="${index}">
    <div class="comment-header">
      <div>${comment.name}</div>
      <div>${comment.date}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
    ${comment.comment}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${comment.likeButton}</span>
        <button class="like-button ${comment.isLike ? '-active-like' : ''}"data-index="${index}"></button>
      </div>
    </div>
  </li>`
  }).join("")
  listElement.innerHTML = commentsHtml;
initLike();
initReply();
};
renderComments();

// Создаем функцию лайков 


// навешиваем обработчик события на кнопку

addButtonElement.addEventListener('click', () => {
    inputNameElement.classList.remove("error")
    inputCommentElement.classList.remove("error")

    if (inputNameElement.value === '' || inputCommentElement.value === '') {
        inputNameElement.classList.add("error")
        inputCommentElement.classList.add("error")
        return
    }
    const time = new Date().toLocaleDateString().slice(0, 6) + new Date().toLocaleDateString().slice(8, 10) + ' ' + new Date().toLocaleTimeString().slice(0, -3)

/* тут ниже хранится разметка которая перерисовывает разметку Html. через innerHTML и обращение к элементам 
с помощью шаблонной строки.*/

   comments.push({
    name : inputNameElement.value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;"),
    date : time,
    comment : inputCommentElement.value
    .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
    likeButton : 0,
    isLike : false,
   })
renderComments();
inputNameElement.value = '';
inputCommentElement.value = '';
})




// 1. найти элемент для ввода комментария




