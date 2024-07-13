import express,{Response, Request} from "express"
import User from "../models/user"
import jwt from "jsonwebtoken"
import {check, validationResult} from "express-validator"
import verifyToken from "../middleware/auth";

// Creating a router instance from the Express Router
const router = express.Router();

//get the current user
router.get("/me", verifyToken, async (req:Request, res: Response)=>{
    const userId = req.userId

    try {
        //user without password
        const user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({message: "User not found"})
        }

        res.json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json({messsage: "Something went wrong"})
    }
})

// Creating a POST route for user registration & the middleware
// /api/users/register
router.post("/register", [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "password with 6 or more character required").isLength({min: 6})
], async (req: Request, res: Response) => {
    
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()})
    }

    try {
        // Finding a user in the database by their email address
        let user = await User.findOne({
            email: req.body.email // Accessing the email from the request body
        });
        
        // Checking if a user with the provided email already exists
        if (user) {
            // Returning a 400 status code with a JSON response if the user exists
            return res.status(400).json({ message: "User already exists" });
        }

        // Creating a new User instance with the data from the request body
        user = new User(req.body);
        // Saving the new user to the database
        await user.save();

        //JSON web token
        const token = jwt.sign(
            {userId: user.id}, 
            process.env.JWT_SECRET_KEY as string, 
            {expiresIn:"1d"}
        )
        
        // and then set it as an HTTP-only cookie in the response
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        })
        return res.status(200).json({message: "User Registered OK"})
        
    } catch (error) {
        console.log(error)
        // Catching any errors that occur during the registration process
        res.status(500).json({ message: "Something went wrong" });
    }
});

export default router;




