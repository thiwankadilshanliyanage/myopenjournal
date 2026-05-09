import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

console.log("Cloudinary API Key Loaded:", process.env.CLOUDINARY_API_KEY ? "YES" : "NO");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadBufferToCloudinary = (buffer, folder = "sakura-note/avatars") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    stream.end(buffer);
  });
};