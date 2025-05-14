import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebaseconfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getErrorMessage } from "../lib/util";
import type { FieldValues } from "react-hook-form";
import type { User } from "../lib/types";

type LoginSuccess = {
  success: true;
  user: User;
};
type LoginError = {
  success: false;
  message: string;
};
type LoginResult = LoginSuccess | LoginError;

export const LoginUser = async (
  email: string,
  password: string
): Promise<LoginResult> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;
    const docRef = doc(db, "users", uid);
    const userDoc = await getDoc(docRef);
    if (!userDoc.exists()) throw new Error("User data not found");
    const userData = userDoc.data();
    const user: User = {
      uid,
      name:userData.name,
      email: userData.email,
      role: userData.role,
    };

    return { success: true, user };
  } catch (error: unknown) {
    const msg = getErrorMessage(error);

    return { success: false, message: msg };
  }
};

export const SignupUser = async (data: FieldValues): Promise<string> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const user = userCredential.user;
    const usersRef = collection(db, "users");
    const regQuery = query(usersRef, where("regNumber", "==", data.regNumber));
    const querySnapshot = await getDocs(regQuery);
    if (!querySnapshot.empty) {
      await deleteUser(user);
      throw new Error("Registration number already in use.");
    }
    const [sessionStr, department] = data.regNumber.split("-");
    const session = Number(sessionStr);
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, {
      name: data.name,
      email: data.email,
      regNumber: data.regNumber,
      session: session,
      department: department,
      role: "student",
    });
    return "Account successfully created";
  } catch (error: unknown) {
    return getErrorMessage(error);
  }
};
