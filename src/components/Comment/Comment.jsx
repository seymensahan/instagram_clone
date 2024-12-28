import { Avatar, Flex, Link, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react';
import React from 'react';
import useGetUserProfileById from '../../hooks/useGetUserProfileById';
import { timeAgo } from '../../utils/timeAgo';

const Comment = ({ comment }) => {
    const { userProfile, isLoading } = useGetUserProfileById(comment?.createdBy);

    if (isLoading) return <CommentSkeleton />;

    if (!userProfile) {
        return (
            <Text color="red.500" fontSize="sm">
                Unable to load user profile.
            </Text>
        );
    }

    return (
        <Flex gap={4} align="start">
            <Link href={`/${userProfile.username}`} isExternal>
                <Avatar src={userProfile.profilePicURL || ''} size="sm" />
            </Link>
            <Flex direction="column" flex="1">
                <Flex gap={2} align="center">
                    <Link href={`/${userProfile.username}`} isExternal>
                        <Text fontWeight="bold" fontSize="sm">
                            {userProfile.username}
                        </Text>
                    </Link>
                    <Text fontSize="sm">{comment?.comment}</Text>
                </Flex>
                <Text fontSize="xs" color="gray.500">
                    {timeAgo(comment?.createdAt)}
                </Text>
            </Flex>
        </Flex>
    );
};

export default Comment;

const CommentSkeleton = () => (
    <Flex gap={4} w="full" alignItems="center">
        <SkeletonCircle size="10" />
        <Flex direction="column" gap={1} flex="1">
            <Skeleton height="12px" width="40%" />
            <Skeleton height="10px" width="60%" />
        </Flex>
    </Flex>
);
