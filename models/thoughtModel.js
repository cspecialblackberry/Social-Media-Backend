const mongoose = require('mongoose')
const { ObjectId } = require('mongoose')

const reactionSchema = new mongoose.Schema({
    reactionId: { default: new ObjectId },
    reactionBody: {
        type: String,
        required: true,
        max: [280, "Reaction must be less than 280 characters."]
    },
    username: { type: String, required: true },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        get: (createdAt) => createdAt.toLocaleDateString() || ''
     }
})

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        min: [1, "Thought must contain at least 1 character."],
        max: [280, "Thought must be less than 280 characters."]
    },
    createdAt: { 
        type: Date, 
        default: Date.now,
        //format date upon get request
        get: (createdAt) => createdAt.toLocaleDateString() || ''
    },
    username: { type: String, required: true },
    reactions: [reactionSchema]
}, {
    toJSON: {getters: true},
    toObject: {getters: true}
})

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})


const Thought = mongoose.model('Thought', thoughtSchema)

module.exports = { Thought, thoughtSchema }