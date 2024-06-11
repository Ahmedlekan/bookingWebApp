import express,{Request, Response} from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import userRoutes from "./routes/users"
import authRoutes from "./routes/auth"
import cookierParser from "cookie-parser"
import path = require("path")
import {v2 as cloudinary} from 'cloudinary';
import myHotelsRoutes from "./routes/my-hotels"
import hotelRoutes from "./routes/hotels"


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});
mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)


const app = express()
app.use(cookierParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Credentials"
    ]
}))

app.use(express.static(path.join(__dirname, "../../frontend/dist")))

// register endpoint setup
app.use("/api/users", userRoutes)
// login endpoint setup
app.use("/api/auth", authRoutes)
// add my-hotels endpoint setup
app.use("/api/my-hotels", myHotelsRoutes)
// list all my hotels from data base endpoint setup
app.use("/api/hotels", hotelRoutes)

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});  

app.listen(7000, ()=>{
    console.log("server running on localhost:7000")
})

