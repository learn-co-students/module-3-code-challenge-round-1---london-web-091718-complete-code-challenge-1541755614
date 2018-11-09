const getImage = (imageURL) => {
    return fetch(imageURL)
        .then(resp => resp.json())
}