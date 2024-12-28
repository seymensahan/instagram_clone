import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";
import useshowToast from "./useShowToast";

const useLogin = () => {
  const showToast = useshowToast();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);

  const login = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      return showToast("Error", "Please fill all the fields", "error");
    }
    try {
      const userCred = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (userCred && userCred.user) {
        const docRef = doc(firestore, "users", userCred.user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
          loginUser(docSnap.data());
        } else {
          showToast("Error", "User not found in Firestore", "error");
        }
      }
    } catch (err) {
      showToast("Error", err.message, "error");
    }
  };

  return { loading, error, login };
};

export default useLogin;
