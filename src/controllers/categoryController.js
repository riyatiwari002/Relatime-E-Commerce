import CategoriesModel from "../models/Category.js";

const addCategories=async(req,res)=>{
 try{
    const {name}=req.body;
    const createNewCategory=await CategoriesModel({
        name,
    })
    await createNewCategory.save();
    return res.status(201).json({
        status:201,
        message:"category created successfully",
    })
 }catch(error)
 {
   return res.status(500).json({
        status:500,
        message:error.message
    })
 }
}
const getAllCategories=async(req,res)=>{
    try {
    
        const exisitingCategory=await CategoriesModel.find();
        if(!exisitingCategory)
        {
           return res.status(404).json({
                message:"category not found"
            })

        }
        return res.status(200).json({
            status:200,
            message:"fetched all categroy",
            categories:exisitingCategory,
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}
const deleteCategory=async(req,res)=>{
 try {
     const id=req.params.id;
    //  const findCategory=await CategoriesModel.findById(id);
     const dltCategory=await CategoriesModel.findByIdAndDelete(id);
     console.log(dltCategory);
     
     if(!dltCategory)
     {
       return res.status(404).json({
                  status:404,
                  message:"category not found"   
        })
     }
      res.status(200).json({
        status:200,
        message:"category deleted successfully",
        dltCategory:dltCategory
     })
 } catch (error) {
    res.status(500).json({
        status:500,
        message:error.message
    })
 }
}
export {addCategories,getAllCategories,deleteCategory};