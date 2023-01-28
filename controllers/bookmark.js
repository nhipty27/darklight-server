const asyncHandler = require('express-async-handler')
const Bookmark = require("../models/Bookmark")

// Get bookmark
const getBookmark = asyncHandler(async (req, res) => {
    const {id, type} = req.query
    let bookmarks = []
    if(type === 'all')
        bookmarks = await Bookmark.find({idUser: id}).sort({'updatedAt':-1})
    else bookmarks = await Bookmark.find({idUser: id, type: type}).sort({'updatedAt':-1})
    
    if (bookmarks) {
      res.status(200).json(bookmarks)
    } else {
      res.status(400)
      throw new Error("Bookmarks Not Found")
    }
})

// Add bookmark
const createBookmark = asyncHandler(async (req, res) => 
{
    const {idUser, idMovie, type, image, name} = req.body
    
    if( !idUser || !idMovie || !type || !image || !name )
    {
        res.status(400);
        throw new Error("Please fill in all fields");
    }
  
    try{
        const bookmark = await Bookmark.create(
            {
                idUser, 
                idMovie,
                type,
                imageMovie: image,
                name
            })
            res.status(201).json(bookmark)
    }
    catch(err) {
        res.status(400)
        throw new Error(err)
    }
})


// Delete bookmark
const deleteBookmark = asyncHandler(async (req, res) => 
{
    const {idUser, idMovie, type} = req.body
    
    const bookmark = await Bookmark.findOne({idUser, idMovie, type: type})

    if (!bookmark) {
        res.status(404);
        throw new Error("Bookmark not found");
    }
  
    try{
        await bookmark.remove();
        res.status(200).json({ message: "Product deleted." })
    }
    catch(err) {
        res.status(400)
        throw new Error(err)
    }
})


// get 1 bookmark
const getSimpleBookmark = asyncHandler(async (req, res) => 
{
    const {idUser, idMovie, type} = req.body
    
    try{
        const bookmark = await Bookmark.findOne({idUser, idMovie, type: type})
        const rs = bookmark ? true : false
        
        res.status(200).json({ bookmark: rs })
    }
    catch(err) {
        res.status(400)
        throw new Error(err)
    }
})

module.exports = {
    getBookmark,
    createBookmark,
    deleteBookmark,
    getSimpleBookmark
}