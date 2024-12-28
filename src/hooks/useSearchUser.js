import  { useState } from 'react'
import useshowToast from './useShowToast'
import { collection, doc, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'

const useSearchUser = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(null)
    const showToast = useshowToast();

    const getUserProfile = async (username) => {
        setIsLoading(true);
        setUser(null);
        try {
            const q = query(collection(firestore, "users"), where("username", "==", username))
            
            const querySnapshot= await getDocs(q)
            if (querySnapshot.empty) return showToast("Error", "User not Found", "error")
            
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            })
            
        } catch (error) {
            showToast("Error", error.message, "error")
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }
    return{isLoading,user,getUserProfile,setUser}
}

export default useSearchUser
