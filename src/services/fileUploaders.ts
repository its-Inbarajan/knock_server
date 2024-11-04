import cloudinary from "../configs/cloudinary";

export const uploadFiles = async (files: Express.Multer.File[]) => {
  const uploadResults = await Promise.all(
    files.map(async (file) => {
      try {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "interview",
          resource_type: "image",
        });
        return result;
      } catch (error) {
        console.error(`Failed to upload file ${file.originalname}:`, error);
        return null;
      }
    })
  );

  return uploadResults.filter((result) => result !== null);
};

export const deleteFile = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`Deleted file with public ID ${publicId}`);
    return result;
  } catch (error) {
    console.error(`Failed to delete file with public ID ${publicId}:`, error);
    throw error;
  }
};

export const updateFile = async (publicId: string, newFilePath: string) => {
  try {
    // First, delete the old file
    await cloudinary.uploader.destroy(publicId);

    // Then, upload the new file
    const result = await cloudinary.uploader.upload(newFilePath, {
      folder: "your_folder_name",
      resource_type: "image",
    });
    console.log(`Updated file with new public ID ${result.public_id}`);
    return result;
  } catch (error) {
    console.error(`Failed to update file with public ID ${publicId}:`, error);
    throw error;
  }
};
