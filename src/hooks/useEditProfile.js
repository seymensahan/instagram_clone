import  { useState } from 'react'
import useshowToast from './useShowToast'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { firestore, storage } from '../firebase/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import useUserProfileStore from '../store/userProfileStore'
import EditProfile from '../components/Profile/EditProfile'
import useAuthStore from '../store/authStore'
 
const useEditProfile = () => {
    const [isUpdating, setIsUpdating] = useState(false)

    const authUser = useAuthStore((state) => state.user)
    const setAuthUser = useAuthStore((state) => state.setUser)
    const setUserProfile = useUserProfileStore((state) => state.setUserProfile)

    const showToast = useshowToast()

    const editProfile = async (inputs, selectedFile) => {
        if (isUpdating || !authUser) return
        setIsUpdating(true)

        const storageRef = ref(storage,`profilePics/${authUser.uid}`)
        const userDocRef = doc(firestore, "users",authUser.uid)
         
        let URL = authUser.profilePicURL || ""; // Retain existing URL if no new file
        try {
            // if (selectedFile) {
            //     await uploadString(storageRef, "users", authUser.uid)
            //     URL=await getDownloadURL(ref(storage,`profilePics/${authUser.uid}`))
            // }
            if (selectedFile) {
                await uploadString(storageRef, selectedFile, 'data_url');
                URL = await getDownloadURL(storageRef);
            }
            

            const updatedUser = {
                ...authUser,
                fullName: inputs.fullName || authUser.fullName,
                username: inputs.username || authUser.username,
                bio: inputs.bio || authUser.bio,
                profilePicURL: URL || authUser.profilePicURL
            }

            

            await updateDoc(userDocRef, {
                fullName: updatedUser.fullName,
                username: updatedUser.username,
                bio: updatedUser.bio,
                profilePicURL: updatedUser.profilePicURL,
            });

            localStorage.setItem("user-info", JSON.stringify(updatedUser));
            setAuthUser(updatedUser);
            setUserProfile(updatedUser);
            showToast("Success", "Profile updated successfully", "success");
        } catch (error) {
            showToast("Error",error.message,"error")
        }
    }

    return {editProfile, isUpdating}
}

export default useEditProfile
