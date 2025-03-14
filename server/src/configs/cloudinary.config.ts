import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_SPI_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const Cloudinary = cloudinary
