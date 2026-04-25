// // admin/src/services/firebaseStorageService.ts

// import { ref, uploadBytes, uploadString, getDownloadURL } from "firebase/storage";
// import { storage } from "../services/firebaseConfig";
// export const uploadImage = async (fileOrBase64: File | string) => {
//   const fileName = `products/${Date.now()}`;
//   const fileRef = ref(storage, fileName);

//   if (typeof fileOrBase64 === "string") {
//     // base64 upload
//     await uploadString(fileRef, fileOrBase64, "data_url");
//   } else {
//     // file upload
//     await uploadBytes(fileRef, fileOrBase64);
//   }

//   return await getDownloadURL(fileRef);
// };
// admin/src/services/firebaseStorageService.ts
import { ref, uploadBytes, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../services/firebaseConfig";

/**
 * Upload a single image (File or Base64 string) to Firebase Storage under a specific productId folder
 * @param productId - Firestore product document ID
 * @param fileOrBase64 - File object or Base64 string
 * @returns download URL
 */
export const uploadProductImage = async (productId: string, fileOrBase64: File | string): Promise<string> => {
  try {
    const timestamp = Date.now();
    const fileName = typeof fileOrBase64 === "string" 
      ? `${timestamp}.png`   // base64 image default name
      : fileOrBase64.name;

    // File path in storage: products/{productId}/{fileName}
    const fileRef = ref(storage, `products/${productId}/${fileName}`);

    if (typeof fileOrBase64 === "string") {
      await uploadString(fileRef, fileOrBase64, "data_url");
    } else {
      await uploadBytes(fileRef, fileOrBase64);
    }

    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.error("❌ Error uploading image:", error);
    throw error;
  }
};

/**
 * Upload multiple images at once and return all download URLs
 * @param productId - Firestore product document ID
 * @param files - Array of File objects
 * @param onProgress - Optional progress callback (0-100)
 * @returns Array of download URLs
 */
export const uploadProductImages = async (
  productId: string,
  files: File[],
  onProgress?: (progress: number) => void
): Promise<string[]> => {
  const urls: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const url = await uploadProductImage(productId, files[i]);
    urls.push(url);

    // Update progress if callback is provided
    if (onProgress) {
      onProgress(Math.round(((i + 1) / files.length) * 100));
    }
  }

  return urls;
};