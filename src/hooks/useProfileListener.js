import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { firestore } from "../../firebase/firebase";
import useUserProfileStore from "../../store/userProfileStore";

const useProfileListener = (userId) => {
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

  useEffect(() => {
    if (!userId) return;

    const userRef = doc(firestore, "users", userId);
    const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setUserProfile(docSnapshot.data());
      }
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, [userId]);
};

export default useProfileListener;
