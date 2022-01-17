
async function mainAdmin()
{
    let response = await fetch('http://localhost:3001/listBooks')
    let books = await response.json()

    books.forEach(renderBook)

}

async function updateQty(elementId,bookId,bookTitle){
    console.log('Book Title: ' + bookTitle);
    let textBoxItem = document.querySelector(`#${elementId}`)
    let newQty = textBoxItem.value;
    console.log('New Qty: ' + newQty);

    if(newQty === null || newQty.length <= 0 || isNaN(newQty))
    {
        alert("Please put a valid value in as the quantity!");
    }
    else    
    {
        let jsonText = JSON.stringify(
            {
                id: parseInt(bookId) 
                ,quantity: parseInt(newQty)
            });
        console.log('JSON Text: ' + jsonText);
        let response = await fetch('http://localhost:3001/updateBook',{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: jsonText,
        });
        let updateBook = await response.json();
        console.log(updateBook);
    }
}

async function renderBook(book) {
    let bookContainer = document.querySelector('#book-container')
    bookContainer.innerHTML += `
        <li class="col-sm-3">
            <span class="card-title">${book.title}</span>
            <br/>
            <input type="textbox" id="book_id_${book.id}"></input> 
            <br/>
            <input type="submit" onclick='updateQty("book_id_${book.id}","${book.id}","${book.title}")'></input>         
        </li>
    `
}

mainAdmin();
