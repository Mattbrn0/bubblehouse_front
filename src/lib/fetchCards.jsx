import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

export default async function fetchCards(category) {
  const db = getFirestore();
  const q = query(collection(db, "cards"), where("category", "==", category));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
}
