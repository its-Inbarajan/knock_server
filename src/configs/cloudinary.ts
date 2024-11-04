import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dmh7fwdzf",
  api_key: process.env.CLOUDINARY_API_KEY || "182269578423818",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "-gv1NSmapZ73Mi7yXI2rZ5sPS8A",
});

export default cloudinary;
