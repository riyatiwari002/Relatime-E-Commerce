import userModel from "../models/User.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/tokenHelper.js";

const Register = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    const createNewUser = new userModel({
      name,
      email,
      password,
      address,
    });
    await createNewUser.save();
    return res.status(201).json({
      status: 201,
      message: "Registered Successfully",
      data:createNewUser
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: 400,
            message: "all fields are required",
        });
    }
    const existingUser = await userModel.findOne({ email });

    if(!existingUser)
    {
        return res.status(400).json({
            status:404,
            message:"user not found"
        })
    }
 
    const isMatch=await bcrypt.compare(password,existingUser.password);
    if (!isMatch) {
      return res.status(400).json({
        status: 401,
        message: "Incorrect Password",
      });
    }
       
      const token=generateToken(existingUser);
     res.status(200).json({
      status: 200,
      message: "Login successfully",
      token:token,
      user:{
        name:existingUser.name,
        email:existingUser.email,
        address:existingUser.address,
        role:existingUser.role,
        status:existingUser.status,
      },
      
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};




export { Register, Login };
