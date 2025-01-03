import { create } from "zustand";

const usePostStore = create((set) => ({
    posts: [],
    createPost: (post) => set(state => ({ posts: [post, ...state.posts] })),
    deletePost: (id) => set(state => ({ posts: state.posts.filter(post => post.id !== id) })),
    // setPosts:(posts) => set({posts}),
    setPosts: (newPosts) => set((state) => ({ posts: newPosts })),
    addComment: (postId, comment) =>
        set(state => ({
            posts: state.posts.map((post) => {
                if (post.id === postId) {
                    return {
                        ...post,
                        comments: [...post.comments, comment],
                    };
                }
                return post;
            }),
        })),
}));

export default usePostStore;

// import { create } from "zustand";

// const usePostStore = create((set) => ({
//     posts: [],
//     createPost: (post) =>
//         set((state) => ({
//             posts: [{ ...post, comments: post.comments || [] }, ...state.posts],
//         })),
//     deletePost: (id) =>
//         set((state) => ({
//             posts: state.posts.filter((post) => post.id !== id),
//         })),
//     setPosts: (newPosts) =>
//         set((state) => ({
//             posts: newPosts.map((post) => ({
//                 ...post,
//                 comments: post.comments || [], // Ensure comments is an array
//             })),
//         })),
//     addComment: (postId, comment) =>
//         set((state) => ({
//             posts: state.posts.map((post) =>
//                 post.id === postId
//                     ? {
//                           ...post,
//                           comments: [...post.comments, comment],
//                       }
//                     : post
//             ),
//         })),
// }));

// export default usePostStore;