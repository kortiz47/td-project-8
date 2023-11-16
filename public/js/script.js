const booksPerPage = 10;
const bookList = document.querySelector('.book-entries');
const pageBtns = document.querySelector('.link-list');

//SHOW PAGE FUNCTION

function showPage(bookEntries, page){
    const startIndex = (page*booksPerPage) - booksPerPage;
    const endIndex = (page*booksPerPage);
}