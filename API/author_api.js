const Router = require("express").Router();

const Book = require("../schema/book");
const Author = require("../schema/author");
const Publication = require("../schema/publication");

/* ------------------------ GET APIs -------------------------- */


// Route    - /author
// Des      - to get all authors
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none

Router.get("/",async (req,res)=>{
    const getAllAuthors = await Author.find();
    return res.json(getAllAuthors);
});

// Route    - /author/a/:authorname
// Des      - to get specific author based on author name
// Access   - Public
// Method   - GET
// Params   - author
// Body     - none

Router.get("/a/:authorname",async (req,res)=>{
    const getSpecificAuthor = await Author.findOne({name: req.params.authorname});

    if (!getSpecificAuthor) {
        return res.json({
            error: `No author found with the name ${req.params.authorname}`});
    }

    return res.json(getSpecificAuthor);  
});

// Route    - /author/:id
// Des      - to get specific author based on author id
// Access   - Public
// Method   - GET
// Params   - id
// Body     - none

Router.get("/:id", async (request, response) => {
    const getSpecificAuthor = await Author.findOne({id: parseInt(request.params.id)});

    if (!getSpecificAuthor) {
        return response.json({
            error: `No author found for the id of ${parseInt(request.params.id)}`
    });
    }

    return response.json(getSpecificAuthor);
});

// Route    - /author/b/:BookName
// Des      - to get specific author based on a book name(ISBN)
// Access   - Public
// Method   - GET
// Params   - BookName(isbn)
// Body     - none

Router.get("/b/:BookName",async(req,res)=>{
    const getSpecificAuthor = await Author.findOne({books: req.params.BookName});

    if (!getSpecificAuthor) {
        return res.json({
            error: `No author found with book name ${req.params.BookName}`});
    }

    return res.json(getSpecificAuthor); 
});

/* ------------------------ POST APIs -------------------------- */

// Route    - /author/new
// Des      - to add new author
// Access   - Public
// Method   - POST
// Params   - none
// Body     - { newAuthor: { details } }

Router.post("/new",async (req,res)=>{
    try{
        const {newAuthor} = req.body;
        await Author.create(newAuthor);
        return res.json({message: "new Author added to database!"});
    } catch(error){
        return res.json({error: error.message});
    }
});

/* ------------------------ PUT APIs -------------------------- */

// Route    - /author/updateName/:id
// Des      - update author's name
// Access   - Public
// Method   - PUT
// Params   - id
// Body     - { "updatedAuthorName": { newName } }

Router.put("/updateName/:id",async (req,res)=>{
    const {updatedAuthorName} = req.body;
    const updatedAuthor = await Author.findOneAndUpdate(
        { id: parseInt(req.params.id) },
        { name: updatedAuthorName },
        { new: true }
    );

    return res.json(updatedAuthor);
});

/* ------------------------ DELETE APIs -------------------------- */

// Route    - /author/delete/:id
// Des      - delete an author
// Access   - Public
// Method   - DELETE
// Params   - authorID
// Body     - none

Router.delete("/delete/:id",async (req, res) => {
    const {ids} = req.params;

    const updatedAuthor = await Author.findOneAndDelete({
        id: ids,
    });

    return res.json({author: updatedAuthor, message:`author ${ids} is deleted from database`});
});

module.exports = Router;