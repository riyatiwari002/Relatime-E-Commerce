import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

CategoriesSchema.pre("save", async function (next) {
  try {
    if (!this.name) {
      const error = new Error("category name is required");
      return next(err);
    }
    const existingCategories = await mongoose.models.categories.findOne({
      name: this.name,
    });
    if (existingCategories) {
      const error = new Error("Categories already exisits");
     return next(error);
    }
    next();
  } catch (error) {
    return next(error);
  }
});

const CategoriesModel = mongoose.model("categories", CategoriesSchema);
export default CategoriesModel;
