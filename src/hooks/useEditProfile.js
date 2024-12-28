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
    const setAuthUser = useAuthStore((state) => state.user)
    const setUserProfile = useUserProfileStore((state) => state.setUserProfile)

    const showToast = useshowToast()

    const editProfile = async (inputs, selectedFile) => {
        if (isUpdating || !authUser) return
        setIsUpdating(true)

        const storageRef = ref(storage,`profilePics/${authUser.uid}`)
        const userDocRef = doc(firestore, "users",authUser.uid)
         
        let URL =""
        try {
            if (selectedFile) {
                await uploadString(storageRef, "users", authUser.uid)
                URL=await getDownloadURL(ref(storage,`profilePics/${authUser.uid}`))
            }

            const updatedUser = {
                ...authUser,
                fullName: inputs.fullName || authUser.fullName,
                fullName: inputs.userame || authUser.username,
                bio: inputs.bio || authUser.bio,
                profilePicURL: URL || authUser.profilePicURL
            }

            await updateDoc(userDocRef, updatedUser)
            localStorage.setItem("user-info", JSON.stringify(updatedUser))
            setAuthUser(updatedUser)
            setUserProfile(updatedUser)
            showToast("Success","Profile updated succesfully","success")

        } catch (error) {
            showToast("Error",error.message,"error")
        }
    }

    return {editProfile, isUpdating}
}

export default useEditProfile
