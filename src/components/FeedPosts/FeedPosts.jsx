import { Box, Container, Skeleton, SkeletonCircle, Text, VStack } from '@chakra-ui/react'
import FeedPost from './FeedPost'
import useGetFeedPosts from '../../hooks/useGetFeedPosts'

const FeedPosts = () => {
    const {isloading, posts} = useGetFeedPosts();

  return (
      <Container maxW={"Container.sm"} py={10} px={2}>
          {isloading && [0, 1, 2].map((_, idx) => (
              <VStack key={idx} gap={4} alignItems={"flex-starrt"} mb={10}>
                  <flex gap="2">
                      <SkeletonCircle size='10' /> 
                      <VStack gap={2} alignItems={'flex-start'}>
                          <Skeleton height='10px' w={"200px"} />
                          <Skeleton height='10px' w={"200px"}/>
                      </VStack>
                  </flex>
                  <Skeleton w={"full"}>
                      <Box h={"400px"}>Contents wrapped</Box>
                  </Skeleton>
              </VStack>
          ))}

          {!isloading && posts.length > 0 && posts.map((post) => <FeedPost key={post.id} post={post} />)}
          {!isloading && posts.length === 0 && (
              <>
              <Text  fontSize={"md"} color={"red.400"}>
            Looks like you don't have any friends
                  </Text>
                  <Text  fontSize={"md"} color={"red.400"}>
                  try to follow more people in oder to enjoy our app
              </Text>
              </>
          )}
    </Container>
  )
}

export default FeedPosts
