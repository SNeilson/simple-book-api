const express = require('express')
const booksController = require('../controllers/booksController')

function routes(Book) {
  const bookRouter = express.Router()
  const controller = booksController(Book)

  bookRouter
    .route('/')
    .post(controller.createNewBook)
    .get(controller.getAllBooks)

  bookRouter
    .route('/:bookId')
    .get(controller.getBookById)
    .get(controller.addBookFilterLinks)
    .put(controller.replaceBook)
    .patch(controller.updateBook)
    .delete(controller.deleteBook)

  return bookRouter
}

module.exports = routes
