import { Avatar, Flex,Box,Text, SkeletonCircle, Skeleton, Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import useFollowUser from '../../hooks/useFollowUser'
import { timeAgo } from '../../utils/timeAgo'

const PostHeader = ({ post, creatorProfile }) => {
  const {isUpdating,isFollowing,handleFollowUser} = useFollowUser(post.createdBy)
  
  return <Flex my={2 } justifyContent={"space-between"} alignItems={"center"} w={"full"}>
    
    <Flex alignItems={"center"} gap={2}>
      {creatorProfile ? (
            <Link to={`/$(createProfile.username)`}>
            <Avatar src={creatorProfile.profilePicURL} alt="user profile pic" size={"sm"} />
            </Link>
      ) : (
         < SkeletonCircle size='10'/>
      )}

      <Flex fontSize={12} fontWeight={"bold"} gap="2">
        {creatorProfile ? (
              <Link to={`/$(createProfile.username)`}>
              {creatorProfile.username}
              </Link>
        ): (
          <Skeleton w={"100px"} h={"10px"} />
        )}
            <Box color={"gray.500"}>
              {timeAgo(post.createdAt)}
            </Box>
      </Flex> 
    </Flex>
    <Box cursor={"pointer"}>
      <Button
        size={"xs"}
        bg={"transparent"}
        fontSize={12}
        color={"blue.500"}
        fontWeight={"bold"}
        _hover={{
          color: "white",
        }}
        transition={"0.2s ease-in-out"}
        onClick={ handleFollowUser }
        isLoading={ isUpdating }
      >{isFollowing ? " Unfollow" : "Follow" }</Button>
    </Box>
  </Flex>

}

export default PostHeader