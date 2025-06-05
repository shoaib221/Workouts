
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    validity : {
        type: Date,
        required: true
    },
    made_in: {
        type: String
    },
    owner: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = { Product };
