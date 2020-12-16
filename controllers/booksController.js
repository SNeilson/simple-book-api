function booksController(Book) {
  // POST Create New Book
  function createNewBook(req, res) {
    const book = new Book(req.body)
    if (!req.body.title) {
      res.status(400)
      return res.send('Title is required')
    }

    book.save()
    res.status(201)
    return res.json(book)
  }

  // GET Get all Books
  function getAllBooks(req, res) {
    const query = {}
    const sortby = { title: 'asc' }

    // Query results
    if (req.query.genre) {
      query.genre = req.query.genre
    } else if (req.query.author) {
      query.author = req.query.author
    } else if (req.query.read) {
      query.read = req.query.read
    }

    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err)
      }
      const returnBooks = books.map((book) => {
        const newBook = book.toJSON()
        newBook.links = {}
        newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`
        const genre = book.genre.replace(new RegExp(' ', 'gi'), '%20')
        newBook.links.FilterByThisGenre = `http://${req.headers.host}/api/books/?genre=${genre}`
        const author = book.author.replace(new RegExp(' ', 'gi'), '%20')
        newBook.links.FilterByThisAuthor = `http://${req.headers.host}/api/books/?author=${author}`
        return newBook
      })
      return res.json(returnBooks)
    }).sort(sortby)
  }

  // GET Get Book by ID
  function getBookById(req, res, next) {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err)
      }
      if (book) {
        req.book = book
        return next()
      }
      return res.sendStatus(404)
    })
  }

  // GET Add the book filter links
  function addBookFilterLinks(req, res) {
    const returnBook = req.book.toJSON()

    returnBook.links = {}
    const genre = req.book.genre.replace(new RegExp(' ', 'gi'), '%20')
    returnBook.links.FilterByThisGenre = `http://${req.headers.host}/api/books/?genre=${genre}`
    const author = req.book.author.replace(new RegExp(' ', 'gi'), '%20')
    returnBook.links.FilterByThisAuthor = `http://${req.headers.host}/api/books/?author=${author}`
    res.json(returnBook)
  }

  // PUT Replace book data
  function replaceBook(req, res) {
    const { book } = req

    book.title = req.body.title
    book.genre = req.body.genre
    book.author = req.body.author
    book.read = req.body.read

    req.book.save((err) => {
      if (err) {
        return res.send(err)
      }
      return res.json(book)
    })
  }

  // PATCH Update a book
  function updateBook(req, res) {
    const { book } = req

    if (req.body._id) {
      delete req.body._id
    }

    Object.entries(req.body).forEach((item) => {
      const key = item[0]
      const value = item[1]
      book[key] = value
    })

    req.book.save((err) => {
      if (err) {
        return res.send(err)
      }
      return res.json(book)
    })
  }

  // DELETE delete a book
  function deleteBook(req, res) {
    req.book.remove((err) => {
      if (err) {
        return res.send(err)
      }
      return res.sendStatus(204)
    })
  }

  return {
    createNewBook,
    getAllBooks,
    getBookById,
    addBookFilterLinks,
    replaceBook,
    updateBook,
    deleteBook,
  }
}

module.exports = booksController
