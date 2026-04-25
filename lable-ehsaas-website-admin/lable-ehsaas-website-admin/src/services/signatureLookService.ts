import { db } from "@/services/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const COLLECTION_NAME = "signatureLooks";

// ✅ GET ALL
export const getAllSignatureLooks = async () => {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
};

// ✅ ADD
export const addSignatureLook = async (data: any) => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), data);

  return {
    id: docRef.id,
    ...data,
  };
};

// ✅ UPDATE
export const updateSignatureLook = async (id: string, data: any) => {
  const ref = doc(db, COLLECTION_NAME, id);
  await updateDoc(ref, data);
};

// ✅ DELETE
export const deleteSignatureLook = async (id: string) => {
  const ref = doc(db, COLLECTION_NAME, id);
  await deleteDoc(ref);
};