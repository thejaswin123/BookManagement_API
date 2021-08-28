const Router = require("express").Router();

const Book = require("../schema/book");
const Author = require("../schema/author");
const Publication = require("../schema/publication");

/* ------------------------ GET APIs -------------------------- */

// Route    - /publication
// Des      - to get all publication
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none

Router.get("/",async (req,res)=>{
    const getAllPublications = await Publication.find();
    return res.json(getAllPublications);
});

// Route    - /publication/p/:PublicationName
// Des      - to get a list of publication based on a publication name
// Access   - Public
// Method   - GET
// Params   - PublicationName
// Body     - none

Router.get("/p/:PublicationName",async (req,res)=>{
    const getSpecificPublication =  await Publication.findOne({
        name: req.params.PublicationName,
    });
    if(!getSpecificPublication){
        return res.json({error: `No book found with publication name ${req.params.PublicationName}`});
    }
    return res.json({books:getSpecificPublication});
});

// Route    - /publication/b/:BookName
// Des      - to get a list of publication based on a book name
// Access   - Public
// Method   - GET
// Params   - BookName(ISBN)
// Body     - none

Router.get("/b/:BookName",async(req,res)=>{
    const getSpecificPublication = await Publication.findOne({books: req.params.BookName});

    if (!getSpecificPublication) {
        return res.json({
            error: `No publication found with the book name ${req.params.BookName}`
    });
    }

    return res.json(getSpecificPublication); 
});

// Route    - /publication/:id
// Des      - to get specific publication based on id
// Access   - Public
// Method   - GET
// Params   - publication id
// Body     - none

Router.get("/:id", async (req, res) => {
    const getSpecificPublication = await Publication.findOne({id: parseInt(req.params.id)});

    if (!getSpecificPublication) {
        return res.json({
            error: `No publication found for the id of ${parseInt(req.params.id)}`
    });
    }

    return res.json(getSpecificPublication);
});

/* ------------------------ POST APIs -------------------------- */

// Route    - /publication/new
// Des      - to add new publication
// Access   - Public
// Method   - POST
// Params   - none
// Body     - { newPublication: { details } }

Router.post("/new",(req,res)=>{
    try {
        const { newPublication } = req.body;

        Publication.create(newPublication);
        return res.json({ message: "New Publication added to the database" });
    }
    catch(error) {
        return res.json({ error: error.message });
    }
});

/* ------------------------ PUT APIs -------------------------- */

// Route    - /publication/updateName/:id
// Des      - update publication
// Access   - Public
// Method   - PUT
// Params   - id
// Body     - { "updatedPublicationName": { newName } }

Router.put("/updateName/:id",async (req,res)=>{
    const {updatedPublicationName} = req.body;
    
    const updatedPublication = await Publication.findOneAndUpdate(
        { id: parseInt(req.params.id) },
        { name: updatedPublicationName },
        { new: true }
    );

    return res.json(updatedPublication);
});

// Route    - /publication/updateBook/:id
// Des      - to update/add new book
// Access   - Public
// Method   - PUT
// Params   - id
// Body     - { "newBook": ISBN }

Router.put("/updateBook/:id", async (req, res) => {
    const {newBook} = req.body;
    const updatedPublication = await Publication.findOneAndUpdate(
        { id: parseInt(req.params.id) },
        { $addToSet: { books: newBook } },
        { new: true }
    );
    
    const updatedBook = await Book.findOneAndUpdate(
        { ISBN: newBook },
        { publication: parseInt(req.params.id) },
        { new: true }
    );

    return res.json({ publication: updatedPublication, book: updatedBook });
});

/* ------------------------ DELETE APIs -------------------------- */

// Route    - /publication/delete/:id
// Des      - delete a publication
// Access   - Public
// Method   - DELETE
// Params   - id (publicationID)
// Body     - none

Router.delete("/delete/:id", async (req, res) => {

    const updatedPublication = await Publication.findOneAndDelete({
        id:req.params.id,
    });

    return res.json({ publication: updatedPublication, message: `publication id ${req.params.id} is deleted from database` });
});

// Route    - /publication/deleteBook/:id/:isbn
// Des      - delete a book from publication
// Access   - Public
// Method   - DELETE
// Params   - publicationID, bookID
// Body     - none

Router.delete("/deleteBook/:id/:isbn", async (req, res) => {
    const id = parseInt(req.params.id);
    const isbn = req.params.isbn;

    const updatedPublication = await Publication.findOneAndUpdate(
        { id: id },
        { $pull: { books: isbn } },
        { new: true }
    );

    const updatedBook = await Book.findOneAndUpdate(
        { ISBN: isbn },
        { publication: -1 },
        { new: true }
    );

    return res.json({ publication: updatedPublication, book: updatedBook })
});

module.exports = Router;