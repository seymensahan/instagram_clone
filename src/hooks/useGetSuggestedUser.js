import  { useEffect, useState } from 'react'
import useAuthStore from '../store/authStore'
import useshowToast from './useShowToast'
import { firestore } from '../firebase/firebase'
import { collection, limit, orderBy, query, where } from 'firebase/firestore'
import { getDocs } from 'firebase/firestore/lite'

const useGetSuggestedUser = () => {

    const [isLoaging, setIsLoading] = useState(true)
    const [suggestedUsers, setSuggestedUser] = useState([])
    const authUser = useAuthStore((state) => state.user)
    const showToast = useshowToast()

    useEffect(() => {
        const getSuggestedUsers = async () => {
            setIsLoading(true)

            try {
                const usersRef = collection(firestore, "users")
                const q = query(
                    usersRef,
                    where("uid", "not-in", [authUser.uid, ...authUser.following]),
                    orderBy("uid"),
                    limit(3)
                )

                const querySnapshot = await getDocs(q)
                const users = [];
                querySnapshot.forEach(doc => {
                    users.push({ ...doc.data(), id: doc.id })
                })

                setSuggestedUser(users)

            } catch (error) {
                showToast("Error", error.mrssage, "error")
            } finally {
                setIsLoading(false)
            }
        }

        if (authUser) getSuggestedUsers()
    },[authUser,showToast])
    
    return {isLoaging, suggestedUsers}
}

export default useGetSuggestedUser
