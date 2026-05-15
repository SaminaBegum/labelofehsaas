import { db } from "./firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

export interface UserData {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export const saveUserData = (userId: string, data: UserData) =>
  setDoc(doc(db, "users", userId), data, { merge: true });

export const getUserData = async (userId: string): Promise<UserData | null> => {
  const snap = await getDoc(doc(db, "users", userId));
  return snap.exists() ? (snap.data() as UserData) : null;
};