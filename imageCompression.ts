
/**
 * Compresses an image file to a target maximum dimension and quality.
 * Returns a Base64 Data URL.
 */
export const compressImage = (
  file: File, 
  maxWidth: number = 1280, 
  quality: number = 0.7
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
        reject(new Error('File is not an image.'));
        return;
    }

    const reader = new FileReader();
    
    // Timeout safety
    const timeoutId = setTimeout(() => reject(new Error('Image processing timed out')), 5000);

    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        clearTimeout(timeoutId);
        try {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            // Calculate new dimensions maintaining aspect ratio
            if (width > maxWidth || height > maxWidth) {
                if (width > height) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                } else {
                    width = Math.round((width * maxWidth) / height);
                    height = maxWidth;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                reject(new Error('Could not get canvas context'));
                return;
            }
            
            // Fill white background for transparency (optional, but safer for JPEGs)
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, width, height);
            
            ctx.drawImage(img, 0, 0, width, height);
            
            // Export as JPEG for better compression than PNG for photos/maps
            resolve(canvas.toDataURL('image/jpeg', quality));
        } catch (e) {
            reject(e);
        }
      };
      img.onerror = (err) => {
          clearTimeout(timeoutId);
          reject(err);
      };
    };
    reader.onerror = (err) => {
        clearTimeout(timeoutId);
        reject(err);
    };
  });
};
