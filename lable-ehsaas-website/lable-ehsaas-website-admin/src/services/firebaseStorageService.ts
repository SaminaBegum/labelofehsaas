import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./firebaseConfig";

const storage = getStorage(app);

export const uploadImage = async (file: File) => {
  const fileRef = ref(storage, `products/${Date.now()}-${file.name}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return url;
};