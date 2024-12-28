
export const compressImage = async (file, maxWidth = 500, maxHeight = 500, quality = 0.8) => {
    if (!file) {
      throw new Error('No file provided for compression');
    }
  
    try {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
  
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target.result;
  
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
  
            let { width, height } = calculateDimensions(img.width, img.height, maxWidth, maxHeight);
  
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
  
            canvas.toBlob(
              (blob) => blob ? resolve(blob) : reject(new Error('Image compression failed')),
              'image/jpeg',
              quality
            );
          };
  
          img.onerror = () => reject(new Error('Error loading image for compression'));
        };
  
        reader.onerror = () => reject(new Error('Error reading file'));
        reader.readAsDataURL(file);
      });
    } catch (error) {
      throw new Error(`Image compression failed: ${error.message}`);
    }
  };
  
  const calculateDimensions = (width, height, maxWidth, maxHeight) => {
    if (width > height) {
      if (width > maxWidth) {
        height = Math.round(height * (maxWidth / width));
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = Math.round(width * (maxHeight / height));
        height = maxHeight;
      }
    }
    return { width, height };
  };
  
  export const uploadToCloudinary = async (file, options = {}) => {
    if (!file) {
      throw new Error('No file provided for upload');
    }
  
    const {
      uploadPreset = 'spaces_upload_preset',
      folder = 'spaces/logos',
      cloudName = 'dl2hupy6v'
    } = options;
  
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('folder', folder);
  
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Upload failed');
      }
  
      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
  };