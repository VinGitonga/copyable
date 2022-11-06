/* eslint-disable */

import {
  Flex,
  Link,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

export default function Footer(props: { [x: string]: any }) {
  let textColor = useColorModeValue('gray.400', 'white')
  let linkColor = useColorModeValue('brand.500', 'white')
  return (
    <Flex
      zIndex="3"
      flexDirection={{
        base: 'column',
        lg: 'row',
      }}
      alignItems={{
        base: 'center',
        xl: 'start',
      }}
      justifyContent="space-between"
      px={{ base: '30px', md: '0px' }}
      pb="30px"
      {...props}
    >
      <Text
        color={textColor}
        mb={{ base: '20px', lg: '0px' }}
        w={{ base: '100%', lg: '50%' }}
        textAlign={{
          base: 'center',
          xl: 'start',
        }}
      >
        {' '}
        &copy; {new Date().getFullYear()}
        <Text as="span" fontWeight="500" ms="4px" textAlign="center">
          &nbsp;Copyable. All Rights Reserved.
        </Text>
        <br />
        <Text as="span" fontWeight="500" ms="4px" textAlign="center">
          Made with love by
          <Link
            mx="3px"
            _hover={{ color: 'brand.700' }}
            color={linkColor}
            href="https://github.com/VinGitonga/copyable"
            target="_blank"
            fontWeight="700"
          >
            Copyable!
          </Link>
        </Text>
      </Text>
      <List display="flex" flexWrap="wrap">
        {/* <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link
            fontWeight="500"
            color={linkColor}
            href="mailto:hello@simmmple.com"
          >
            Support
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link
            fontWeight="500"
            color={linkColor}
            href="https://www.simmmple.com/licenses"
          >
            License
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link
            fontWeight="500"
            color={linkColor}
            href="https://simmmple.com/terms-of-service"
          >
            Terms of Use
          </Link>
        </ListItem>
        <ListItem>
          <Link
            fontWeight="500"
            color={linkColor}
            href="https://www.blog.simmmple.com/"
          >
            Blog
          </Link>
        </ListItem> */}
      </List>
    </Flex>
  )
}
