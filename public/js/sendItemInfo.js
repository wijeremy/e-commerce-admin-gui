const sendItemId = async (event) => {
    event.preventDefault();
    console.log('hello') 
}

document
.querySelector('#add-to-cart')
  .addEventListener('click', sendItemId);