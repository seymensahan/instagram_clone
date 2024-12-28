import { useEffect, useState } from 'react';
import useShowToast from './useShowToast';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import useUserProfileStore from '../store/userProfileStore';

const useGetUserProfileByUsername = (username) => {
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();
  const { userProfile, setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getUserProfile = async () => {
      setUserProfile(null); // Clear previous user profile
      setIsLoading(true);

      try {
        const q = query(
          collection(firestore, 'users'),
          where('username', '==', username)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setUserProfile(null);
          return;
        }

        // Assuming there is only one user with the given username
        const userDoc = querySnapshot.docs[0]?.data();
        setUserProfile(userDoc);
      } catch (error) {
        showToast('Error', error.message, 'error');
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      getUserProfile();
    } else {
      setIsLoading(false);
      setUserProfile(null);
    }
  }, [username, setUserProfile, showToast]);

  return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;
