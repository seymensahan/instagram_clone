import { Flex,Image,Text } from "@chakra-ui/react"
import { useSignInWithGoogle } from "react-firebase-hooks/auth"
import useshowToast from "../../hooks/useShowToast"
import useAuthStore from "../../store/authStore"
// import { auth,firestore } from '../firebase/firebase'
import { setDoc,doc, getDoc } from "firebase/firestore"
import { auth,firestore } from "../../firebase/firebase"

const GoogleAuth = ({ prefix }) => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)
  const showToast = useshowToast();
  const loginUser = useAuthStore((state) => state.login);

  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle()
      if (!newUser && error) {
        showToast("Error", error.message, "error")
        return
      }

      const userRef = doc(firestore, "user", newUser.user.uid)
      const userSnap = await getDoc(userRef)

      //Jayjo@gmail.com
      if (userSnap) {
        //login
        const userDoc = userSnap.data();
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      } else {
        //signup
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          username: newUser.user.email.split("@")[0],//jayjo
          fullName: newUser.user.displayName,
          bio: "",
          profilePicURL: newUser.user.photoURL,
          followers: [],
          following: [],
          posts: [],
          createdAt:Date.now()
      }
      await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
      localStorage.setItem("user-info",JSON.stringify(userDoc))
      loginUser(userDoc)
    
      }
    } catch (error) {
      showToast("Error", error.message, "error")
    }
  };


  return (
    <Flex
    alignItems={"Center"}
    justifyconent={"center"}
      cursor={"pointer"}
      onClick={handleGoogleAuth}
  >
    <Image src="/google.png" w={5} alt="google logo" />
    <Text mx="2" color={"blue.500"}>
    {prefix} with Google
    </Text>
  </Flex>
  )
}

export default GoogleAuth
