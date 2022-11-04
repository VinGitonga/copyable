/*eslint-disable*/

import {
  Flex,
  Link,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

export default function Footer() {
  const textColor = useColorModeValue('gray.400', 'white')
  const linkColor = useColorModeValue('brand.500', 'white')
  return (
    <Flex
      zIndex="3"
      flexDirection={{
        base: 'column',
        xl: 'row',
      }}
      alignItems={{
        base: 'center',
        xl: 'start',
      }}
      justifyContent="space-between"
      px={{ base: '30px', md: '50px' }}
      pb="30px"
    >
      <Text
        color={textColor}
        textAlign={{
          base: 'center',
          xl: 'start',
        }}
        mb={{ base: '20px', xl: '0px' }}
      >
        {' '}
        &copy; {new Date().getFullYear()}
        &nbsp; Copyable. All Rights Reserved. Made with love by
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
      <List display="flex">
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link
            fontWeight="500"
            color={textColor}
            href="mailto:xtealer00@gmail.com"
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
            color={textColor}
            href="https://github.com/VinGitonga/copyable"
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
            color={textColor}
            href="/static/documents/terms.pdf"
          >
            Terms of Use
          </Link>
        </ListItem>
        <ListItem>
          <Link
            fontWeight="500"
            color={textColor}
            href="https://devpost.com/software/singlestore-migration-tool"
          >
            Blog
          </Link>
        </ListItem>
      </List>
    </Flex>
  )
}
