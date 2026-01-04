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
import bookingRoutes from "./routes/my-bookings"


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});
mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)

const PORT = process.env.PORT || 7000;

const app = express()
app.use(cookierParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:3000", "http://localhost:3000"],
    credentials: true,
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Credentials"
    ]
}))

const pathToDist = path.join(__dirname, "../../frontend/dist"); // Adjusted path

app.use(express.static(pathToDist));

// register endpoint setup
app.use("/api/users", userRoutes)
// login endpoint setup
app.use("/api/auth", authRoutes)
// add my-hotels endpoint setup
app.use("/api/my-hotels", myHotelsRoutes)
// list all my hotels from data base endpoint setup
app.use("/api/hotels", hotelRoutes)
app.use("/api/my-bookings", bookingRoutes)

app.get('/healthz', (req: Request, res: Response) => res.sendStatus(200));
app.get('/ready', (req: Request, res: Response) => res.sendStatus(200));
app.get('/started', (req: Request, res: Response) => res.sendStatus(200));


app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(pathToDist, "index.html"));
});

app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`)
})

