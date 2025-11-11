import mongoose from "mongoose";

const ProductSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,

    },
    price:{
        type:Number,
        required:true,

    },
    stock:{
        type:Number,

    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categories",
        required:true,
    },
    image:{
        type:String,
        required:true,
    },


},{timestamps:true})

const ProductModel=mongoose.model("products",ProductSchema);
export default ProductModel;