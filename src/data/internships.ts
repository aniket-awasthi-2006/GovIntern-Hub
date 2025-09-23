import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firestore.ts";

export interface Internship {
  id: string;
  title: string;
  ministry: string;
  department: string;
  duration: string;
  stipend: string;
  eligibility: string;
  skills: string[];
  location: string;
  mode: "Remote" | "Onsite" | "Hybrid";
  level: "Central" | "State";
  deadline: string;
  description: string;
  objectives: string[];
  benefits: string[];
  applicationProcess: string[];
  applicationLink: string;
  posted: string;
}

// 🔹 Instead of hardcoding, fetch from Firestore
export const fetchInternships = async (): Promise<Internship[]> => {
  const colRef = collection(db, "internships");
  const snapshot = await getDocs(colRef);

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Internship)
  );
};

// 🔹 Optional: default export for compatibility with your old code
//    This will return a Promise, so if your app expected `internships`
//    to be static, keep using `fetchInternships()` instead.
export default fetchInternships;
