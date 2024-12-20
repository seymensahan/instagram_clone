import React from 'react'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import { Image,Box } from '@chakra-ui/react'
import useGetUserProfileById from '../../hooks/useGetUserProfileById'

const FeedPost = ({ post }) => {
  const { useProfile } = useGetUserProfileById(post.createdBy);

  return <>
      <PostHeader post={post} creatorProfile={useProfile} />
      <Box my={2} borderRadius={4} overflow={"hidden"}>
          <Image  src={post.imageURL} alt={"FEED POST IMG "}/>
      </Box>
      <PostFooter post={post} creatorProfile={useProfile} />
    </>
}

export default FeedPost
