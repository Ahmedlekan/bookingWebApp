import express,{Request, Response} from "express"
import multer from "multer"
import cloudinary from "cloudinary"
import { HotelType } from "../shared/types"
import Hotel from "../models/hotel"
import verifyToken from "../middleware/auth"
import { body } from "express-validator"

const router = express.Router()

// This storage engine stores the files in memory as buffers instead of writing them to disk. 
// It's suitable for handling small files or scenarios where you don't want to persist files to disk.
const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5 * 1024 * 1024, // 5MB
    }
})

//only the login user can access this endpoint. Add hotel
router.post("/",
    verifyToken,
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("city").notEmpty().withMessage("City is required"),
        body("country").notEmpty().withMessage("Country is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("type").notEmpty().withMessage("Hotel type is required"),
        body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required & must be number"),
        body("facilities").notEmpty().isArray().withMessage("Facilities are required"),
    ],
    upload.array("imageFiles", 6), // expect imageFiles which will be up to 6 images
    async (req:Request, res:Response)=>{
        try {
            // Get the array of uploaded image files from the request
            const imageFiles = req.files as Express.Multer.File[]
            const newHotel: HotelType = req.body

            // uploading the image to cloudinary
            const imageUrls = await uploadImages(imageFiles)
            
            //if the upload was successful add the imageUrls to the newHotel
            newHotel.imageUrls = imageUrls
            newHotel.lastUpdated = new Date()
            newHotel.userId = req.userId

            //save the new hotel in our data base
            const hotel = new Hotel(newHotel)
            await hotel.save()
            res.status(201).send(hotel)

        } catch (error) {
            console.log("Eror creating: ", error)
            res.status(500).json({message: "Something went wrong"})
        }
})

// For fetching the list of added hotel
router.get("/", verifyToken, async (req: Request, res: Response)=>{
    try {
        //fetch all the hotels with auserId
        const hotels = await Hotel.find({userId: req.userId})
        res.json(hotels)
    } catch (error) {
        res.status(500).json({message: "Error fetching hotels"})   
    }
})

// GET a single hotel from the list of added hotel
router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  
    const id = req.params.id.toString();
  
    try {
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

// For updating the hotel with its images
router.put("/:hotelId", verifyToken, upload.array("imageFiles"), async(req:Request, res:Response)=>{
    
    try {
        const updatedHotel: HotelType = req.body
        updatedHotel.lastUpdated = new Date()

        const hotel = await Hotel.findOneAndUpdate({
            _id: req.params.hotelId,
            userId: req.userId
        }, updatedHotel, {new:true})

        if (!hotel){
            return res.status(404).json({message:"Hotel not found "})
        }

        const files = req.files as Express.Multer.File[]
        const updatedImageUrls = await uploadImages(files)
        // update imageUrls and existing imageUrls
        hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || []) ]

        await hotel.save()
        res.status(201).json(hotel)

    } catch (error) {
        res.status(500).json({message: "Sometging went wrong"})
    }
})

const  uploadImages = async (imageFiles: Express.Multer.File[])=>{
    // Upload the images to Cloudinary
    const uploadPromises = imageFiles.map(async (image) => {
        // Convert the image buffer to a base64-encoded string
        const b64 = image.buffer.toString("base64")
        // Construct a data URI with the image's MIME type
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        // Upload the image to Cloudinary and await the response
        const res = await cloudinary.v2.uploader.upload(dataURI)
        // Return the URL of the uploaded image
        return res.url
    })
    // Wait for all image upload promises to resolve
    const imageUrls = await Promise.all(uploadPromises)

    return imageUrls
}

export default router



