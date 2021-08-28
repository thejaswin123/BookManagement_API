/*
Requirements


-Book
    - ISBN        - string
    - Title       - String
    - Author id   - [Number]
    - Language    - String
    - No.of pages - number
    - Publications- number
    - category    - [string]


-Author
    - id        - number
    - name      - String
    - books     - [string]


-Publications
    - id        - number
    - name      - String
    - books     - [string]


    ---------------API'S-----------------

Book
    -GET
        to get all books
        to get specific books
        to get lists of books on category
        to get lists of books based on author

    -POST
        to add new book

    -PUT
        to update details of book
        to update/add new author

    -DELETE
        delete book
        delete author from book


Author
    -GET
        to get all authors
        to get specific author
        to get list of author based on books

    -POST
        to add new author
        to update/add new book

    -PUT
        to update author details

    -DELETE
        delete author


publications
-GET
    to get all publications
    to get specific publication
    to get publication based on book

-POST
    add new publication

-PUT
    update publication details
    to add/update new book

-DELETE
    delete a book from publication
    delete publication

*/
/*
Routes Needed in producation
/author/                                 getting all authors
/author/:id                              get specific author details based on id
/author/a/:authorname                    get specific author based on a book's authorname
/author/b/:BookName                      get specific author based on a book name
/author/new                              add new author
/author/updateName/:id                   update name of author
/author/delete/:id                       delete a auhtor
/book/                                   get all books
/book/:bookID                            get specific book based on ISBN
/book/a/:author                          get specific book based on author
/book/c/:category                        get specific books based on a category
/book/new                                add new books
/book/update/:isbn                       update title of a book
/book/updateAuthor/:isbn                 update/add new author
/book/updateTitle/:isbn                  update/add new Title
/book/delete/:isbn                       delete a book
/book/delete/author/:isbn/:id            delete a author from a book
/publication/                            get all publications
/publication/:id                         get specific publication details based on id
/publication/p/:PublicationName          get specific publication details based on publication name
/publication/b/:BookName                 get specific publication details based on book name
/publication/new                         add new publication
/publication/updateBook/:id              update/add new book to a publication
/publication/updateName/:id              update publication name
/publication/delete/:id                  delete publication
/publication/deleteBook/:id/:isbn        delete a book from publication
*/