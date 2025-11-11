import express from "express";
import { addCategories, deleteCategory, getAllCategories } from "../controllers/categoryController.js";

const categoriesRouter=express.Router();

categoriesRouter.route('/addcategories').post(addCategories);
categoriesRouter.route('/getAllCategories').get(getAllCategories);
categoriesRouter.route('/deleteCategories/:id').delete(deleteCategory);
export default categoriesRouter;