import { Flex,Box, Spinner } from "@chakra-ui/react"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useLocation } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../firebase/firebase"
import Navbar from "../../components/Navbar/Navbar"


//instead of adding the sidebar component  to every page,wecan add it 
//only once tot he pagelayout component and wrap the children with itthis way we can have a sidebar on evry page except on the auth  page


const PageLayout = ({ children }) => {
    const { pathname } = useLocation()
    const [user, loading, error] = useAuthState(auth)
    const canRenderSidebar = pathname !== "/auth" && user;
    const canRenderNavabr = !user && !loading && pathname !== "/auth";
    const checkingUserIsAuth = !user && loading

    if (checkingUserIsAuth) return <PageLayoutSpinner />

    return (
        <Flex flexDir={canRenderNavabr ? "column" : "row"}>
            {/*sidebare on the left  */}
            {canRenderSidebar ? (
                <Box w={{ base: "70px", md: "240px" }}>
                    <Sidebar />
                </Box>
            ) : null}
            {/* Navbar */}
            {canRenderNavabr ? <Navbar /> : null}
            {/* the page contnent on the right */}
            <Box flex={1} mx={"auto"}>
                {children}
            </Box>
        </Flex>
    );
};

export default PageLayout;

 const PageLayoutSpinner = () => {
    return (
            <Flex flexDir='column' h='100vh' alignItems='center' justifycotnent='center'>
            <Spinner  size='xl' />
            </Flex>
);
};