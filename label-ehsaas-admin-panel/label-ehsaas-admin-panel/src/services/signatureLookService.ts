import { db } from "@/services/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const COLLECTION_NAME = "signatureLooks";

// 🔹 GET ALL
export const getAllSignatureLooks = async () => {
  const snap = await getDocs(collection(db, COLLECTION_NAME));

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// 🔹 ADD
export const addSignatureLook = async (data: any) => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), data);
  return { id: docRef.id, ...data };
};

// 🔹 UPDATE
export const updateSignatureLook = async (id: string, data: any) => {
  await updateDoc(doc(db, COLLECTION_NAME, id), data);
};

// 🔹 DELETE
export const deleteSignatureLook = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
};