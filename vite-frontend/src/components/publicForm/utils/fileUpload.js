import { compressImage, uploadToCloudinary } from '../../services/imageService';

export const handleFileUploads = async (formData, uploadPath) => {
  const fileFields = Object.entries(formData)
    .filter(([key, value]) => value instanceof File)
    .map(([key, value]) => ({ key, value }));

  if (fileFields.length > 0) {
    for (const { key, value } of fileFields) {
      const compressedFile = await compressImage(value);
      const uploadedUrl = await uploadToCloudinary(compressedFile, uploadPath);
      formData[key] = uploadedUrl;
    }
  }
};