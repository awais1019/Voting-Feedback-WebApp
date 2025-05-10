import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseconfig";
import { doc, getDoc } from "firebase/firestore";
import type { User } from "../components/login/Login";
import { FirebaseError } from "firebase/app";

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
      email: userCredential.user.email,
      role: userData.role,
    };

    return { success: true, user };
  } catch (error: unknown) {
    const msg = getErrorMessage(error);

    return { success: false, message: msg };
  }
};
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (error instanceof FirebaseError) {
     
      switch (error.code) {
        case "auth/user-not-found":
          return "No user found with this email.";
        case "auth/wrong-password":
          return "Incorrect password.";
        case "auth/invalid-email":
          return "Invalid email address.";
        case "auth/invalid-credential":
          return "Invalid credentials.";
        case "auth/too-many-requests":
          return "Too many attempts. Try again later.";
        case "auth/network-request-failed":
          return "Check your internet connection.";
        default:
          return error.message;
      }
    } else {
      return error.message;
    }
  } else {
    return "An unknown error occurred.";
  }
}
