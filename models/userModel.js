const mongoose = require('mongoose')
const { thoughtSchema } = require('./thoughtModel')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true, trimmed: true},
    email: {
        type: String, 
        required: true, 
        unique: true,
        validate: {
            validator: function(email) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    friends: [mongoose.ObjectId],
    thoughts: [{thoughtSchema}]
}, {
    toJSON: {getters: true},
    toObject: {getters: true}
})

userSchema.virtual('friendCount').get(function() {
    return this.friends.length
})

const User = mongoose.model('User', userSchema)

module.exports = User