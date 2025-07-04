
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({

    sender: {
        type: String,
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },
    text: {
        type: String
    },
    media: {
        type: String
    }
    
}, { timestamps: true } );

const Message = mongoose.model('Message', MessageSchema);

module.exports = { Message };
