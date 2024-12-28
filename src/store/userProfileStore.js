import { create } from "zustand";

const useUserProfileStore = create((set) =>( {
    userProfile: null,
    setUserProfile: (userProfile) => set({ userProfile }),
    //this is used to update the number of post i the profile page
    addpost: (post) => set(state => ({
        userProfile: { ...state.userProfile, posts: [post.id, ...state.userProfile.post] }
    })),
    deletePost: (postId) => 
        set((state) => ({
            userProfile: {
                ...state.userProfile,
                posts: state.userProfile.posts.filter((id) => id !== postId),
            },
        }))
}))

export default useUserProfileStore