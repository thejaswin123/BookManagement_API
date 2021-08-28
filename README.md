# BookManagement-API

<------------------------ DataBase Details -------------------------->

Book

```
- ISBN          - String
- Title         - String
- Author        - [Numbers]
- Language      - String
- Publications  - Numbers
- NumOfPages    - Numbers
- Categories    - [String]
```

Author

```
- Id    - Number
- Name  - String
- Books - [Strings]
```

Publication

```
- Id    - Number
- Name  - String
- Books - [Strings]
```

<--------------------------- APIs ----------------------------->

Book

```
- GET
    - to get all books
    - to get specific book
    - to get a list of books based on category
    - to get a list of books based on author

- POST
    - to add new books

- PUT
    - update book details
    - to update/add new author

- DELETE
    - delete a book
    - delete an author from the book
```

Author

```
- GET
    - to get all authors
    - to get specific author
    - to get list of author based on a book

- POST
    - to add new author

- PUT
    - update author details

- DELETE
    - delete an author
```

Publication

```
- GET
    - to get all publication
    - to get specific publication
    - to get a list of publication based on a book.

- POST
    - Add a new publication

- PUT
    - update publication
    - to update/add new book

- DELETE
    - delete a publication
    - delete a book from publication
```

<--------------------------- APIs Details ----------------------------->

/_ ------------------------ GET APIs -------------------------- _/

Book

```
Route    - /book
Des      - to get all books
Access   - Public
Method   - GET
Params   - none
Body     - none

Route    - /book/:BookID
Des      - to get specific book
Access   - Public
Method   - GET
Params   - bookID
Body     - none

Route    - /book/c/:category
Des      - to get a list of books based on category
Access   - Public
Method   - GET
Params   - category
Body     - none

Route    - /book/a/:author
Des      - to get a list of books based on author
Access   - Public
Method   - GET
Params   - author
Body     - none
```

Author

```
Route    - /author
Des      - to get all authors
Access   - Public
Method   - GET
Params   - none
Body     - none

Route    - /author/a/:authorname
Des      - to get specific author based on author name
Access   - Public
Method   - GET
Params   - author
Body     - none

Route    - /author/:id
Des      - to get specific author based on author id
Access   - Public
Method   - GET
Params   - id
Body     - none

Route    - /author/b/:BookName
Des      - to get specific author based on a book name(ISBN)
Access   - Public
Method   - GET
Params   - BookName(isbn)
Body     - none
```

Publication

```
Route    - /publication
Des      - to get all publication
Access   - Public
Method   - GET
Params   - none
Body     - none

Route    - /publication/p/:PublicationName
Des      - to get a list of publication based on a publication name
Access   - Public
Method   - GET
Params   - PublicationName
Body     - none

Route    - /publication/b/:BookName
Des      - to get a list of publication based on a book name
Access   - Public
Method   - GET
Params   - BookName(ISBN)
Body     - none

Route    - /publication/:id
Des      - to get specific publication based on id
Access   - Public
Method   - GET
Params   - publication id
Body     - none
```

/_ ------------------------ POST APIs -------------------------- _/

Book

```
Route    - /book/new
Des      - to add new books
Access   - Public
Method   - POST
Params   - none
Body     - { newBook : { details } }
```

Author

```
Route    - /author/new
Des      - to add new author
Access   - Public
Method   - POST
Params   - none
Body     - { newAuthor: { details } }
```

Publication

```
Route    - /publication/new
Des      - to add new publication
Access   - Public
Method   - POST
Params   - none
Body     - { newPublication: { details } }
```

/_ ------------------------ PUT APIs -------------------------- _/

Book

```
Route    - /book/updateTitle/:isbn
Des      - update book title
Access   - Public
Method   - PUT
Params   - isbn
Body     - { Title: newTtile }

Route    - /book/updateAuthour/:isbn
Des      - to update/add new author
Access   - Public
Method   - PUT
Params   - isbn
Body     - { "newAuthor": id }
```

Author

```
Route    - /author/updateName/:id
Des      - update authors name
Access   - Public
Method   - PUT
Params   - id
Body     - { "updatedAuthorName": { newName } }
```

Publication

```
Route    - /publication/updateName/:id
Des      - update publication
Access   - Public
Method   - PUT
Params   - id
Body     - { "updatedPublicationName": { newName } }

Route    - /publication/updateBook/:id
Des      - to update/add new book
Access   - Public
Method   - PUT
Params   - id
Body     - { "newBook": ISBN }
```

/_ ------------------------ DELETE APIs -------------------------- _/

Book

```
Route    - /book/delete/:isbn
Des      - to get specific book
Access   - Public
Method   - DELETE
Params   - ISBN
Body     - none

Route    - /book/delete/author/:isbn/:id
Des      - delete an author from the book
Access   - Public
Method   - DELETE
Params   - bookID, authorID
Body     - none
```

Author

```
Route    - /author/delete/:id
Des      - delete an author
Access   - Public
Method   - DELETE
Params   - authorID
Body     - none
```

Publication

```
Route    - /publication/delete/:id
Des      - delete a publication
Access   - Public
Method   - DELETE
Params   - id (publicationID)
Body     - none

Route    - /publication/deleteBook/:id/:isbn
Des      - delete a book from publication
Access   - Public
Method   - DELETE
Params   - publicationID, bookID
Body     - none
```
