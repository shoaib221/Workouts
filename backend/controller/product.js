const { Product } = require( "../models/products.js" );
const express = require("express");
const { requireAuth } = require("./middlewire.js")



const CreateProduct = async ( req, res, next ) => { 
    const { name, price, validity, made_in } = req.body; 
    
    
    try {
        const product = await Product.create({ name, price, validity, made_in, owner: req.user_id });
        console.log(product)
        res.status(200).json( product );
    } catch (error) {
        res.status(400).json( { error: error.message} );
    } finally {
        next();
    }
}


const fetchProduct = async ( req, res, next ) => {

    try {
        const products = await Product.find({owner : req.user_id});
        res.status(200).json( products );
    } catch (error) {
        res.status(400).json( { error: error.message } );
    } finally {
        next();
    }
}

const productRouter = express.Router();
productRouter.use(requireAuth);
productRouter.get( "/fetch", fetchProduct );
productRouter.post( "/create", CreateProduct );

module.exports = { productRouter }