
const { Product, Cart } = require( "../models/products.js" ); 
const express = require("express"); 
const { requireAuth } = require("./middlewire.js"); 
const { User } = require("../models/auth.js");


const CreateProduct = async ( req, res, next ) => {  
    console.log(req.body);
    const { name, price, availability } = req.body;
    try { 
        
        const product = await Product.create({ name, price, availability, owner: req.user_id });
        // console.log("here"); 
        // console.log(product); 
        res.status(200).json( product ); 
    } catch (error) { 
        res.status(400).json( { error: error.message} ); 
    } finally { 
        next(); 
    }
}


const fetchProduct = async ( req, res, next ) => {
    console.log("fetch product");
    try {
        const products = await Product.find({owner : req.user_id});
        const restaurants = await User.find({});
        res.status(200).json( {products, restaurants} );
    } catch (error) {
        res.status(400).json( { error: error.message } );
    } finally {
        next();
    }
}

const deleteProduct = async ( req, res, next ) => {
    
    const {_id} = req.body;

    console.log(_id);
    
    try {
        const ret = await Product.deleteOne({ _id });
        res.status(200).json(ret);
    } catch (error) {
        res.status(400).json( { error: error.message } );
        console.log(error.message);
    }

    next();
}

const productRouter = express.Router();
productRouter.use(requireAuth);
productRouter.get( "/fetch", fetchProduct );
productRouter.post( "/create", CreateProduct );
productRouter.post( "/delete", deleteProduct);

module.exports = { productRouter };
