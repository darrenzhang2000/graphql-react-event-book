const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdEvents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event' // set up a relation between two models
        }
    ]
})

module.exports = mongoose.model('User', userSchema)