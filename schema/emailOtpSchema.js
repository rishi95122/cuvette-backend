import mongoose from "mongoose";

const Schema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        otp: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        expiresAt: {
            type: Date,
            default: () => Date.now() + 2 * 60 * 1000
        } 
    }, { timestamps: true });

    Schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const otpSchema= mongoose.model("Otp",Schema);

export default otpSchema