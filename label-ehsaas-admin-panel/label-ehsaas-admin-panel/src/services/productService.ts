// // admin/src/services/productService.ts
// import {
//   addDoc,
//   collection,
//   getDocs,
//   getDoc,
//   doc,
//   updateDoc,
//   deleteDoc,
// } from "firebase/firestore";


// import { db } from "../services/firebaseConfig";
// const productsRef = collection(db, "products");

// // ✅ Add Product
// export const addProductToDB = async (product: any) => {
//   const docRef = await addDoc(productsRef, product);
//   return { id: docRef.id, ...product };
// };

// // ✅ Get All Products
// export const getAllProductsFromDB = async () => {
//   const snapshot = await getDocs(productsRef);
//   return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
// };

// // ✅ Get Single Product
// export const getProductFromDB = async (id: string) => {
//   const docRef = doc(db, "products", id);
//   const snapshot = await getDoc(docRef);
//   return snapshot.exists() ? { id, ...snapshot.data() } : null;
// };

// // ✅ Update Product
// export const updateProductInDB = async (id: string, product: any) => {
//   const docRef = doc(db, "products", id);
//   await updateDoc(docRef, product);
//   return true;
// };

// // ✅ Delete Product
// export const deleteProductFromDB = async (id: string) => {
//   const docRef = doc(db, "products", id);
//   await deleteDoc(docRef);
//   return true;
// };
// export const testFirestoreConnection = async () => {
//   try {
//     const testRef = doc(db, "testCollection", "testDoc");
//     await setDoc(testRef, { message: "Hello Firebase!" });

//     console.log("🔥 Firestore connection SUCCESS");
//     return true;
//   } catch (error) {
//     console.error("❌ Firestore connection FAILED", error);
//     return false;
//   }
// };
// admin/src/services/productService.ts
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../services/firebaseConfig";

const productsRef = collection(db, "products");

/* ------------------------------------------------------------------
 🔥 ADD PRODUCT
------------------------------------------------------------------ */
export const addProductToDB = async (product) => {
  try {
    const docRef = await addDoc(productsRef, {
      ...product,
      createdAt: serverTimestamp(), // better than new Date()
    });

    return { id: docRef.id, ...product };
  } catch (error) {
    console.error("❌ Add Product Error:", error);
    throw error;
  }
};

/* ------------------------------------------------------------------
 🔥 GET ALL PRODUCTS
------------------------------------------------------------------ */
export const getAllProductsFromDB = async () => {
  try {
    const snapshot = await getDocs(productsRef);

    return snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    }));
  } catch (error) {
    console.error("❌ Fetch Products Error:", error);
    throw error;
  }
};

/* ------------------------------------------------------------------
 🔥 GET SINGLE PRODUCT
------------------------------------------------------------------ */
export const getProductFromDB = async (id) => {
  try {
    const docRef = doc(db, "products", id);
    const snapshot = await getDoc(docRef);

    return snapshot.exists()
      ? { id, ...snapshot.data() }
      : null;
  } catch (error) {
    console.error("❌ Get Product Error:", error);
    throw error;
  }
};

/* ------------------------------------------------------------------
 🔥 UPDATE PRODUCT
------------------------------------------------------------------ */
export const updateProductInDB = async (id, product) => {
  try {
    const docRef = doc(db, "products", id);

    await updateDoc(docRef, {
      ...product,
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("❌ Update Product Error:", error);
    throw error;
  }
};

/* ------------------------------------------------------------------
 🔥 DELETE PRODUCT
------------------------------------------------------------------ */
export const deleteProductFromDB = async (id) => {
  try {
    const docRef = doc(db, "products", id);
    await deleteDoc(docRef);

    return true;
  } catch (error) {
    console.error("❌ Delete Product Error:", error);
    throw error;
  }
};

/* ------------------------------------------------------------------
 🔥 TEST FIRESTORE CONNECTION
------------------------------------------------------------------ */
export const testFirestoreConnection = async () => {
  try {
    const testRef = doc(db, "testCollection", "testDoc");

    await setDoc(testRef, {
      message: "Hello Firebase!",
      createdAt: serverTimestamp(),
    });

    console.log("🔥 Firestore connection SUCCESS");
    return true;
  } catch (error) {
    console.error("❌ Firestore connection FAILED", error);
    return false;
  }
};