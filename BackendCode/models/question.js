const mongoose = require('mongoose');
const questionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    option_a: {
        type: String,
    },
    option_b: {
        type: String,
    },
    option_c: {
        type: String,
    },
    answer: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('question', questionSchema);