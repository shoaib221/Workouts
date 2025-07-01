
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({

    // unique - name & owner
    sender: {
        type: String,
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },
    content: {
        type: String
    }
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = { Message };
