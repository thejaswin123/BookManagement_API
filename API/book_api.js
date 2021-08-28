const Router = require("express").Router();

const Book = require("../schema/book");
const Author = require("../schema/author");
const Publication = require("../schema/publication");

/* ------------------------ GET APIs -------------------------- */

// Route    - /book
// Des      - to get all books
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none

Router.get("/",async (req,res)=>{
    const getAllBooks = await Book.find();
    return res.json(getAllBooks);
});

// Route    - /book/:BookID
// Des      - to get specific book
// Access   - Public
// Method   - GET
// Params   - bookID
// Body     - none

Router.get("/:bookID",async (req,res)=>{
    const getSpecificBook = await Book.findOne({ISBN:req.params.bookID});
    
    if(!getSpecificBook){
        return res.json({
            error: `No Book found for the ISBN ${req.params.bookID}`,
        });
    }

     return res.json({book: getSpecificBook});   
});

// Route    - /book/c/:category
// Des      - to get a list of books based on category
// Access   - Public
// Method   - GET
// Params   - category
// Body     - none

Router.get("/c/:category",async (req,res)=>{
    const getSpecificBooks =  await Book.find({category: req.params.category});
    if(!getSpecificBooks){
        return res.json({error : `Sorry, no specific book found in category ${req.params.category}`});
    }
    return res.json(getSpecificBooks);
});

// Route    - /book/a/:author
// Des      - to get a list of books based on author
// Access   - Public
// Method   - GET
// Params   - author
// Body     - none

Router.get("/a/:author",async (req,res)=>{
    const getSpecificBook = await Book.findOne({
        authors: parseInt(req.params.author)
    });
    if(!getSpecificBook) {
        return res.json({error : `No book found for ${req.params.author}`});
    }
    return res.json({book : getSpecificBook});
});

/* ------------------------ POST APIs -------------------------- */

// Route    - /book/new
// Des      - to add new books
// Access   - Public
// Method   - POST
// Params   - none
// Body     - { newBook : { details } }

Router.post("/new",async (req,res)=>{
     
    try{
        const {newBook} = req.body;
        await Book.create(newBook);
        return res.json({message: "Book added to the database"});
    } catch(error){
        return res.json({error: error.message});
    }
});

/* ------------------------ PUT APIs -------------------------- */

// Route    - /book/updateTitle/:isbn
// Des      - update book title
// Access   - Public
// Method   - PUT
// Params   - isbn
// Body     - { Title: newTtile }

Router.put("/updateTitle/:isbn",async (req,res)=>{
    const {Title} = req.body;
    const updateBook = await Book.findOneAndUpdate(
    {
        ISBN: req.params.isbn,
    },
    {
        title: Title,
    },
    {
        new: true,
    });

    return res.json({book: updateBook});
});

// Route    - /book/updateAuthour/:isbn
// Des      - to update/add new author
// Access   - Public
// Method   - PUT
// Params   - isbn
// Body     - { "newAuthor": id }

Router.put("/updateAuthor/:isbn",async (req,res)=>{
    const {newAuthor} = req.body;
    const {isbn} = req.params;
   
    const updatedBook = await Book.findOneAndUpdate({
        ISBN: isbn,
    },
    {
        $addToSet:{
            authors: newAuthor
        },
    },
    {
        new: true,
    });
    
    const updatedAuthor = await  Author.findOneAndUpdate({
        id:newAuthor,
    },
    {
        $addToSet:{
            books:isbn
        },
    },
    {
        new:true,
    });

    return res.json({books: updatedBook, authors: updatedAuthor,message: "new Author is added to database"});
});

/* ------------------------ DELETE APIs -------------------------- */

// Route    - /book/delete/:isbn
// Des      - to get specific book
// Access   - Public
// Method   - DELETE
// Params   - ISBN
// Body     - none

Router.delete("/delete/:isbn", async (req, res) => {
    const { isbn } = req.params;

    const updateBookDatabase = await Book.findOneAndDelete({
        ISBN: isbn,
    });

    return res.json({ books: updateBookDatabase,message: `Book ${isbn} is deleted` });
});

// Route    - /book/delete/author/:isbn/:id
// Des      - delete an author from the book
// Access   - Public
// Method   - DELETE
// Params   - bookID, authorID
// Body     - none

Router.delete("/delete/author/:isbn/:id", async (req, res) => {
    const { isbn, id } = req.params;

    //updating book database object
    const updatedBook = await Book.findOneAndUpdate(
        {
            ISBN: isbn,
        },
        {
            $pull: {
                authors: parseInt(id),
            },
        },
        {
            new: true,
        }
    );

    const updatedAuthor = await Author.findOneAndUpdate(
        {
            id: parseInt(id),
        },
        {
            $pull: {
                books: isbn,
            },
        },
        {
            new: true,
        }
    );

    return res.json({
        message: "Author was deleted",
        book: updatedBook,
        author: updatedAuthor,
    });
});

module.exports = Router;