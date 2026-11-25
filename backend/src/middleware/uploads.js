import fs from "node:fs";
import path from "node:path";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

export const uploads = path.resolve("uploads");
fs.mkdirSync(uploads, { recursive: true });
cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET });
const storage = multer.diskStorage({ destination: uploads, filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_")) });
export const imageUpload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024, files: 12 }, fileFilter: (req, file, cb) => cb(null, /^image\/(jpeg|png|webp)$/.test(file.mimetype)) });
