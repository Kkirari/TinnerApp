import mongoose from "mongoose";
import { IUserDocument, IUserModel } from "../interfaces/user.interface";

const schema = new mongoose.Schema<IUserDocument, IUserModel>({
    username: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    display_name: { type: String },
    date_of_birth: { type: Date },
    last_active: { type: Date },
    introduction: { type: String },
    interest: { type: String },
    looking_for: { type: String },
    location: { type: String },

    // todo: implement photo feature
    // photos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }],
    // todo: implement like feature
    // followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    // following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})