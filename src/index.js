let imageURL;
let likeURL;
let commentsURL;

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed! However I refuse to assign constants!', 'color: magenta')

  let imageId = 1379
  //Enter the id from the fetched image here

  imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  likeURL = `https://randopic.herokuapp.com/likes/`

  commentsURL = `https://randopic.herokuapp.com/comments/`

//document.addEventListener('DOMContentLoaded') fails to set variables as global, therefore I had to manually use the URL to fetch data below.

})


const commentText = document.querySelector(`[name='comment']`)
const imagePlacer = document.querySelector('#image')
const container = document.querySelector('.container')
const likeButton = document.querySelector('#like_button')
const commentForm = document.querySelector('#comment_form')
const imageCard = document.querySelector('#image_card')
const commentList = document.querySelector('#comments')




const getImage = () => fetch(`https://randopic.herokuapp.com/images/1379`).then(resp=>resp.json())


const addToPage = img => {
  imageEl = document.createElement('div')
  // appending image info to page
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
// appending comments and adding a remove button
  img.comments.forEach(comment => {
    commentLoadLi = document.createElement('li')  
    commentLoadLi.setAttribute('comment-id',comment.id)
    commentLoadLi.innerHTML = `${comment.content}
    <button class='delete_button' data-id='${comment.id}'>Remove me</button>`
    // data-id allows to track the comment elements
    commentList.appendChild(commentLoadLi)
  })


//remove button functionality

removeButtonArray = document.querySelectorAll('.delete_button')
removeButtonArray.forEach(button=>{
  button.addEventListener('click', ()=>{
    //back end removal:
    fetch(`https://randopic.herokuapp.com/comments/${button.dataset.id}`,{
      method: 'DELETE'
    }).then(res=>console.log(res))
    //front end removal:
    commentList.querySelector(`[comment-id='${button.dataset.id}']`).remove()
  })
})



// like button functionality
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

  //comment form:
  commentForm.addEventListener('submit', () => {
    event.preventDefault()
    // front end:
    commentLi = document.createElement('li')
    commentLi.innerText = commentText.value
    commentList.appendChild(commentLi)
    //back end:
   fetch('https://randopic.herokuapp.com/comments',{
      method: "POST",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: 1379, content: commentText.value}) 
    }).then(res=>console.log(res))

    //to make the button work I would first shove the comment into the database and then retrieve it back with an ID if I were to set the remove buttom immediately. There must be an easier way, though..
   
    commentForm.reset()
  //comment event listener end
  })


imageCard.appendChild(imageEl)
}




//run upon page load:
getImage().then(img=>addToPage(img))



 //DRY to be applied and functionality split into multiple files if enough time left