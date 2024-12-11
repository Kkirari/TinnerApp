import mongoose from "mongoose";
import { Cloudinary } from "../configs/cloudinary.config";
import { ImageHelper } from "../helpers/image.helper";
import { Photo } from "../models/photo.model";
import { photo } from "../types/photo.type";
import { User } from "../models/user.model";

export const PhotoService = {
    upload: async function (file: File, user_id: string): Promise<photo> {
        const buffer = await file.arrayBuffer()
        const isFileValid = ImageHelper.isImage(buffer)
        if (!isFileValid)
            throw new Error("Image must be .jpg or .png")
        const base64 = Buffer.from(buffer).toString('base64')
        const dataURL = `data:${file.type};base64,${base64}`
        const cloundPhoto = await Cloudinary.uploader.upload(dataURL, {
            folder: 'class-example-user-image',
            resource_type: "auto",
            transformation: [{
                width: 500,
                height: 500,
                crop: 'fill',
                gravity: 'face'
            }]
        })
        if (!cloundPhoto.public_id || !cloundPhoto.secure_url)
            throw new Error("Something went wrong")
        const uploadPhoto = new Photo({
            user: new mongoose.Types.ObjectId(user_id),
            url: cloundPhoto.secure_url,
            public_id: cloundPhoto.public_id
        })
        await uploadPhoto.save()
        await User.findByIdAndUpdate(
            user_id,
            { $push: { photos: uploadPhoto._id } }
        )
        return uploadPhoto.toPhoto()
    },
    get: async function (user_id: string): Promise<photo[]> {
        throw new Error("")
    }
    ,
    delete: async function (photo_id: string): Promise<boolean> {
        throw new Error("")
    },
    setAvatar: async function (photo_id: string, user_id: string): Promise<boolean> {
        throw new Error("")
    }

}