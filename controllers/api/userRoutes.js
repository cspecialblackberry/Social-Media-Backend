const router = require('express').Router
const { User } = require('../../models')

//get all users
router.get('/', (req, res) => {
    try{

    }catch(err){
        console.error(err)
        res.status(400).json(err)
    }
})

//get one user by id
router.get('/:id', (req, res) => {
    try{

    }catch(err){
        console.error(err)
        res.status(400).json(err)
    }
})

//create a new user
router.post('/', (req, res) => {
    try{

    }catch(err){
        console.error(err)
        res.status(400).json(err)
    }
})

//edit a user by id
router.put('/:id', (req, res) => {
    try{

    }catch(err){
        console.error(err)
        res.status(400).json(err)
    }
})

//delete a user by id
router.delete('/:id', (req, res) => {
    try{

    }catch(err){
        console.error(err)
        res.status(400).json(err)
    }
})


module.exports = router