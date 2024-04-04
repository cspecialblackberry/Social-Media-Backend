const router = require('express').Router()
const { User } = require('../../models')

//get all users
router.get('/', async (req, res) => {
    try{
        const response = await User.find({}).lean()
        res.send(response)
    }catch(err){
        console.error(err)
        res.status(400).json(err)
    }
})

//get one user by id
router.get('/:id', async (req, res) => {
    try{

    }catch(err){
        console.error(err)
        res.status(400).json(err)
    }
})

//create a new user
router.post('/', async (req, res) => {
    try{
        const newUser = await User.create(req.body)
        res.send(newUser)
    }catch(err){
        console.error(err)
        res.status(400).json(err)
    }
})

//edit a user by id
router.put('/:id', async (req, res) => {
    try{

    }catch(err){
        console.error(err)
        res.status(400).json(err)
    }
})

//delete a user by id
router.delete('/:id', async (req, res) => {
    try{

    }catch(err){
        console.error(err)
        res.status(400).json(err)
    }
})


module.exports = router