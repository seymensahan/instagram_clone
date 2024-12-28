import React from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom'; // Ensure this is installed and imported
import { auth } from '../firebase/firebase';
import useAuthStore from '../store/authStore';
import useshowToast from './useShowToast';

const useLogout = () => {
    const [signOut, isloadingOut, error] = useSignOut(auth);
    const showToast = useshowToast(); // Correct invocation of the custom toast hook
    const logoutUser = useAuthStore((state) => state.logout);
    const navigate = useNavigate(); // Used to redirect after logout

    const handleLogout = async () => {
        try {
            await signOut();
            localStorage.removeItem('user-info');
            logoutUser();
            navigate('/auth'); // Redirect to the authentication page
        } catch (error) {
            showToast('Error', error.message, 'error');
        }
    };

    return { handleLogout, isloadingOut, error };
};

export default useLogout;
