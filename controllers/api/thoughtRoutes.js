const router = require('express').Router()
const { Thought } = require('../../models')

//get all thoughts
router.get('/', async (req, res) => {
    try {
        const response = await Thought.find({}).lean()
        res.send(response)
    } catch (err) {
        console.error(err)
        res.status(400).json(err)
    }
})

//get one thought by id
router.get('/:id', async (req, res) => {
    try {
        const response = await Thought.findById(req.params.id).lean()
        res.send(response)
    } catch (err) {
        console.error(err)
        res.status(400).json(err)
    }
})

//create a new thought
router.post('/', async (req, res) => {
    try {
        const newUser = await Thought.create(req.body)
        res.send(newUser)
    } catch (err) {
        console.error(err)
        res.status(400).json(err)
    }
})
//TODO PUSH THOUGHT TO ASSOCIATED USER

//edit a thought by id
router.put('/:id', async (req, res) => {
    try {
        const response = await Thought.updateOne({
            _id: new ObjectId(req.params.id)
        }, req.body)
        res.send(response)
    } catch (err) {
        console.error(err)
        res.status(400).json(err)
    }
})

//delete a thought by id
router.delete('/:id', async (req, res) => {
    try {
        const response = await Thought.deleteOne({
            _id: new ObjectId(req.params.id)
        })
        res.send(response)
    } catch (err) {
        console.error(err)
        res.status(400).json(err)
    }
})

module.exports = router