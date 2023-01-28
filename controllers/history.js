const asyncHandler = require('express-async-handler')
const History = require("../models/History")

// Get History
const getHistory = asyncHandler(async (req, res) => {
    const {id, type} = req.query
    
    let histories = []
    if(type === 'all')
        histories = await History.find({idUser: id}).sort({'updatedAt':-1})
    else histories = await History.find({idUser: id, type: type}).sort({'updatedAt':-1})
    
    if (histories) {
      res.status(200).json(histories)
    } else {
      res.status(400)
      throw new Error("History Not Found")
    }
})

// Add History
const createHistory = asyncHandler(async (req, res) => 
{
    const {idUser, idMovie, type, image, name, season , ep } = req.body
    
    if( !idUser || !idMovie || !type || !image || !name )
    {
        res.status(400);
        throw new Error("Please fill in all fields");
    }
    const timeWatch = new Date().toLocaleString()
    let his = null
    if(season === '0')
        his = await History.findOne({idUser, idMovie, type})
    else his = await History.findOne({idUser, idMovie, type, season, ep})
    
    if(his) his.remove()
    try{
        const history = await History.create(
            {
                idUser, 
                idMovie,
                imageMovie: image,
                timeWatch,
                type,
                season,
                ep,
                name,
            })
            res.status(201).json(history)
    }
    catch(err) {
        res.status(400)
        throw new Error(err)
    }
})


// Delete History
const deleteHistory = asyncHandler(async (req, res) => 
{
    const {id} = req.body
    
    const history = await History.findById(id)

    if (!history) {
        res.status(404);
        throw new Error("History not found");
    }
  
    try{
        await history.remove();
        res.status(200).json({ message: "History deleted." })
    }
    catch(err) {
        res.status(400)
        throw new Error(err)
    }
})

// Delete All History
const deleteAllHistory = asyncHandler(async (req, res) => 
{
    const {id, type} = req.body
    console.log(id);
    
    const history = await History.find({idUser: id})

    if (!history) {
        res.status(404);
        throw new Error("History not found");
    }
  
    try{
        if(type === 'all')
            await History.deleteMany({idUser: id})
        else await History.deleteMany({idUser: id, type})
        res.status(200).json({ message: "All History deleted." })
    }
    catch(err) {
        res.status(400)
        throw new Error(err)
    }
})


module.exports = {
    getHistory,
    createHistory,
    deleteHistory,
    deleteAllHistory
}