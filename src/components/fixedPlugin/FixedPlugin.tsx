// Chakra Imports
import { Button, Icon, useColorMode } from '@chakra-ui/react'
// Custom Icons
import { IoMdMoon, IoMdSunny } from 'react-icons/io'
import React from 'react'

export default function FixedPlugin(props: { [x: string]: any }) {
  const { ...rest } = props
  const { colorMode, toggleColorMode } = useColorMode()

  let left = ''
  let right = '35px'

  return (
    <Button
      {...rest}
      h="60px"
      w="60px"
      bg="purple"
      zIndex="99"
      position="fixed"
      variant="no-effects"
      left={left}
      right={right}
      bottom="30px"
      border="1px solid"
      borderColor="purple"
      borderRadius="50px"
      onClick={toggleColorMode}
      display="flex"
      p="0px"
      alignItems="center"
      justifyContent="center"
    >
      <Icon
        h="24px"
        w="24px"
        color="white"
        as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
      />
    </Button>
  )
}
