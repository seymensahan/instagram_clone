import { Flex, Text, Avatar, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import useAuthStore from '../../store/authStore';

const SuggestedHeader = () => {
    const { handleLogout, isLoginOut } = useLogout();
    const authUser = useAuthStore((state) => state.user);

    // Fallback UI in case user is null or data is still loading
    if (!authUser) return null;
    // {
    //     return (
    //         <Flex justifyContent="center" alignItems="center" w="full">
    //             <Text>Loading...</Text>
    //         </Flex>
    //     );
    // }

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex alignItems={"center"} gap={2}>
                <Link to={`/${authUser.username}`}>
                    <Avatar size={"lg"} src='/profilepic.png' />
                </Link>
                <Link to={`/${authUser.username}`}>
                <Text fontSize={12} fontWeight={"bold"}>
                    {authUser.username}
                    </Text>
                    </Link>
            </Flex>
            <Button
                size={"xs"}
                background={"transparent"}
                _hover={{ background: "transparent" }}
                fontSize={14}
                fontWeight={"medium"}
                color={"blue.400"}
                onClick={handleLogout}
                isLoading={isLoginOut}
                cursor={"pointer"}
            >
                Log Out
            </Button>
        </Flex>
    );
};

export default SuggestedHeader;
