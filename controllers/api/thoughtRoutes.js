const router = require('express').Router()
const { Thought, User } = require('../../models')
const { ObjectId } = require('mongodb')

//get all thoughts
router.get('/', async (req, res) => {
    try {
        const response = await Thought.find({}).lean({ virtuals: true })
        res.send(response)
    } catch (err) {
        console.error(err)
        res.status(400).json(err)
    }
})

//get one thought by id
router.get('/:id', async (req, res) => {
    try {
        const response = await Thought.findById(req.params.id).lean({ virtuals: true })
        res.send(response)
    } catch (err) {
        console.error(err)
        res.status(400).json(err)
    }
})

//create a new thought
router.post('/', async (req, res) => {
    try {
        const response = await Thought.create(req.body)
        const update = await User.findOneAndUpdate(
            { username: req.body.username },
            { $push: { thoughts: response } },
            { new: true }
        )
        res.send(response)
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

//post a reaction to a specific thought
router.post('/:id/reactions', async (req, res) => {
    console.log(req.body)
    try {
        const response = await Thought.findById(req.params.id).lean()
        if (response) {
            response.reactions.push(req.body)
            console.log(response)
            const update = await Thought.updateOne({
                _id: new ObjectId(req.params.id)
            }, response)
            res.status(200).send(update)
        } else {
            res.send('invalid thought id')
        }
    } catch (err) {
        console.error(err)
        res.status(400).json(err)
    }
})

//delete a reaction
router.delete('/:id/reactions/:reactionId', async (req, res) => {
    try {
        const response = await Thought.findById(req.params.id).lean()
        const reactionIndex = response.reactions.indexOf(response.reactions.find((obj) => obj._id === req.params.reactionId))
        response.reactions.splice(reactionIndex, 1)
        const update = await Thought.updateOne({
            _id: new ObjectId(req.params.id)
        }, response)
        res.send(update)
    } catch (err) {
        console.error(err)
        res.status(400).json(err)
    }
})


module.exports = router