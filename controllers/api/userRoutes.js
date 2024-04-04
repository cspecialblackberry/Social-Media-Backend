const router = require('express').Router()
const { User } = require('../../models')
const { ObjectId } = require('mongodb')

//get all users
router.get('/', async (req, res) => {
    try {
        const response = await User.find({}).lean()
        res.send(response)
    } catch (err) {
        console.error(err)
        res.status(400).json(err)
    }
})

//get one user by id
router.get('/:id', async (req, res) => {
    try {
        const response = await User.findById(req.params.id).lean()
        res.send(response)
    } catch (err) {
        console.error(err)
        res.status(400).json(err)
    }
})

//create a new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        res.send(newUser)
    } catch (err) {
        console.error(err)
        res.status(400).json(err)
    }
})

//edit a user by id
router.put('/:id', async (req, res) => {
    try {
        const response = await User.updateOne({
            _id: new ObjectId(req.params.id)
        }, req.body)
        res.send(response)
    } catch (err) {
        console.error(err)
        res.status(400).json(err)
    }
})

//delete a user by id
router.delete('/:id', async (req, res) => {
    try {
        const response = await User.deleteOne({
            _id: new ObjectId(req.params.id)
        })
        res.send(response)
    } catch (err) {
        console.error(err)
        res.status(400).json(err)
    }
})

//add users to another's friends list
router.post('/:id/friends/:friendId', async (req, res) => {
    try {
        const response = await User.findById(req.params.id).lean()
        if (response) {
            const friendResponse = await User.findById(req.params.friendId).lean()
            if (friendResponse) {
                response.friends.push(friendResponse._id)
                const update = await User.updateOne({
                    _id: new ObjectId(req.params.id)
                }, response)
                res.send(update)
            }else{
            res.send('invalid friend id')
            }
        }else{
        res.send('invalid user id')
        }
    } catch (err) {
        console.error(err)
        res.status(400).json(err)
    }
})

router.delete('/:id/friends/:friendId', async (req, res) => {
    try {
        const response = await User.findById(req.params.id).lean()
        response.friends.splice((response.friends.indexOf(req.params.friendId)), 1)
        res.send(response)
    } catch (err) {
        console.error(err)
        res.status(400).json(err)
    }
})


module.exports = router