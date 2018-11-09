let imageURL;
let likeURL;
let commentsURL;

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1379
  //Enter the id from the fetched image here

  imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  likeURL = `https://randopic.herokuapp.com/likes/`

  commentsURL = `https://randopic.herokuapp.com/comments/`

})
const commentText = document.querySelector(`[name='comment']`)
const imagePlacer = document.querySelector('#image')
const container = document.querySelector('.container')
const likeButton = document.querySelector('#like_button')
const commentForm = document.querySelector('#comment_form')
const imageCard = document.querySelector('#image_card')
const commentList = document.querySelector('#comments')


//document.addEventListener('DOMContentLoaded') failed to load, therefore I had to manually use the URL to fetch data below.

const getImage = () => fetch(`https://randopic.herokuapp.com/images/1379`).then(resp=>resp.json())


const addToPage = img => {
  imageEl = document.createElement('div')
  imageEl.innerHTML = `
  <div class="row" id="image_content">
    <div class="card col-md-4"></div>
    <div id="image_card" class="card col-md-4">
      <img src="${img.url}" id="image" data-id="${img.id}"/>
      <h4 id="name">${img.name}</h4>
      <span>Likes:
        <span id="likes">${img.like_count}</span>
      </span>
    </div>
    <div class="card col-md-4"></div>
  </div>
  `

  let likesCounter = imageEl.querySelector('#likes')

  likeButton.addEventListener('click', () => {
    event.preventDefault()
    console.log('liked')
    //increase likes on the page
    likesCounter.innerText++
    //increase likes in DB
    fetch('https://randopic.herokuapp.com/likes',{
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: 1379, like_count: likesCounter.innerText}) 
    }).then(res=>console.log(res))



    
    //like event listener end
  })
  commentForm.addEventListener('submit', () => {
    event.preventDefault()
    commentLi = document.createElement('li')
    commentLi.innerText = commentText.value
    commentForm.reset()
  commentList.appendChild(commentLi)
  //comment event listener end
  })







imageCard.appendChild(imageEl)
}







//run:
getImage().then(img=>addToPage(img))