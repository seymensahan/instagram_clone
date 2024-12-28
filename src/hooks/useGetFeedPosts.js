import { useEffect, useState } from "react"
import usePostStore from "../store/postStore";
import useAuthStore from "../store/authStore";
import useshowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, doc, getDoc, getDocs, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetFeedPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { posts, setPosts } = usePostStore()
    const authUser = useAuthStore();
    const showToast = useshowToast();
    const { setUserProfile } = useUserProfileStore()
    
    useEffect(() => {
        const getFeedPosts = async () => {
            setIsLoading(true);
            if  (!authUser.following || authUser.following.length === 0){
                setIsLoading(false)
                setPosts([])
                return
            }
            const q = query(collection(firestore,"post"),where("createdBy","in",authUser.following))
            try {
                const querySnapshot = await getDocs(q)
                const feedPosts = [];

                querySnapshot.forEach(doc => {
                    feedPosts.push({id:doc.id,...doc.data()})
                })

                feedPosts.sort((a, b) => b.createdAt - a.createdAt)
                setPosts(feedPosts)

            } catch (error) {
                showToast("Error", error.mrssage, "error")
            } finally {
                setIsLoading(false)
            }
        }
        if (authUser) getFeedPosts();
    },[authUser,showToast,setPosts,setUserProfile])

    return { isLoading, posts };
}

export default useGetFeedPosts
