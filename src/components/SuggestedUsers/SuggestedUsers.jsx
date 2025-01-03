import { Flex, Link, Text, VStack, Box } from "@chakra-ui/react";
import React from "react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";
import useGetSuggestedUser from "../../hooks/useGetSuggestedUser";

const SuggestedUsers = () => {
    const { isLoading, suggestedUsers } = useGetSuggestedUser();

    if (isLoading) {
        return (
            <Flex justifyContent="center" alignItems="center" py={8}>
                <Text>Loading suggestions...</Text>
            </Flex>
        );
    }

    return (
        <VStack py={8} px={6} gap={4}>
            <SuggestedHeader />

            {suggestedUsers.length !== 0 ? (
                <>
                    <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
                        <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
                            Suggested for you
                        </Text>
                        <Text
                            fontSize={12}
                            fontWeight={"bold"}
                            _hover={{ color: "gray.400" }}
                            cursor={"pointer"}
                        >
                            See all
                        </Text>
                    </Flex>
                    {suggestedUsers.map((user) => (
                        <SuggestedUser user={user} key={user.id} />
                    ))}
                </>
            ) : (
                <Text fontSize={12} color={"gray.500"}>
                    No suggestions available.
                </Text>
            )}

            <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
                @ 2023 Built By{" "}
                <Link
                    href="https://github.com/seymensahan"
                    target="_blank"
                    color="blue.500"
                    fontSize={14}
                >
                    Adrien
                </Link>
            </Box>
        </VStack>
    );
};

export default SuggestedUsers;
