import { Box, Flex, Link, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { Link  as RouterLink} from 'react-router-dom'
import { NotificationsLogo } from '../../assets/constnants'

const Notifications = () => {
  return (
    <Tooltip
    hasArrow
    label={"Notifications"}
    placement="right"
    ml={1}
    openDelay={500}
    display={{ base: "block", md: "none" }}
  >
    <Flex
    //  display={"flex"}
    //  to={"/"}
    //  as={RouterFlex}
      alignItems={"center"}
      gap={4}
      _hover={{ bg: "whiteAlpha.400" }}
      borderRadius={6}
      p={2}
      w={{ base: 10, md: "full" }}
      justifyContent={{ base: "center", md: "flex-start" }}
    >
      <NotificationsLogo/>
      <Box display={{ base: "none", md: "block" }}>Notification</Box>
    </Flex>
  </Tooltip>
  )
}

export default Notifications

