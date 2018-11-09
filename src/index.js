// document.addEventListener('DOMContentLoaded', () => {
//   console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

const imageURL = `https://randopic.herokuapp.com/images/`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

const imageEL = document.querySelector('#image');
const imageNameEL = document.querySelector('#name');
const imageLikesEL = document.querySelector('#likes');
const imageCommentsEL = document.querySelector('#comments');
const imageLikeBTN = document.querySelector('#like_button');
const form = document.querySelector('#comment_form');

let imageId = '1383' //Enter the id from the fetched image here
let localImage = '';
let newComment = {
  content: '',
  "image_id": 1383
};


//GET remote
const getImage = (imageURL) => {
  return fetch(`https://randopic.herokuapp.com/images/${imageId}`) //cound't get url with variable to work???
    .then(response => response.json())
}

//POST LIKE remote
const updateLikeCount = (imageId) => {
  return fetch(likeURL, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ image_id: imageId })
  })
    .then(response => response.json())
}

//POST COMMENT remote
const updateComment = (imageId, content) => {
  return fetch(commentsURL, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ image_id: imageId, content: content })
  })
    .then(response => response.json())
}


getImage()
  .then(data => {
    localImage = data
    renderImage(localImage)
  })

const renderImage = (localImage) => {
  console.log(localImage.url);
  imageEL.src = localImage.url;
  imageNameEL.innerText = localImage.name;
  imageLikesEL.innerText = localImage.like_count;

  localImage.comments.forEach(comment => {
    renderComment(comment);
  });

}

const renderComment = (comment) => {
  let commentTAG = document.createElement('li');
  commentTAG.innerText = comment.content;
  imageCommentsEL.appendChild(commentTAG);
}


imageLikeBTN.addEventListener('click', () => {
  localImage.like_count = localImage.like_count + 1;
  imageLikesEL.innerText = localImage.like_count;

  updateLikeCount(imageId);
})

form.addEventListener('submit', (event) => {
  event.preventDefault();
  // console.log('fomr')

  newComment.content = form.querySelector("input[name='comment']").value;
  // console.log(newComment.content);
  localImage.comments.push(newComment);
  renderComment(newComment);
  updateComment(imageId, newComment.content)
  newComment.content = '';
  form.reset();
});



// })
