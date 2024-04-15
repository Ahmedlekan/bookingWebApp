import express,{Request, Response} from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import userRoutes from "./routes/users"
import authRoutes from "./routes/auth"

mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

// register endpoint setup
app.use("/api/users", userRoutes)
// login endpoint setup
app.use("/api/auth", authRoutes)

app.listen(7000, ()=>{
    console.log("server running on localhost:7000")
})
