import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import {FiBell, FiChevronDown, FiCompass, FiHome, FiMenu, FiSettings,} from 'react-icons/fi'
import {MdOutlineAddCircleOutline} from 'react-icons/md'
import {signOut, useSession} from 'next-auth/react'
import {useRouter} from 'next/router'

export default function Layout({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data: session } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut({
      redirect: false,
      callbackUrl: '/',
    })
    await router.push('/')
  }
  console.log(session)

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav
        onOpen={onOpen}
        handleSignout={handleSignOut}
        user={session?.user}
      />
      <Box ml={{ base: 0, md: 60 }} p="4" maxW={'6xl'}>
        {children}
      </Box>
    </Box>
  )
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Copyable
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <NavItem icon={FiHome}>Home</NavItem>
      <NavItem icon={FiCompass} hrefPath={'/mongo/mongo-wizard'}>
        Migrate From MongoDB
      </NavItem>
      <NavItem icon={FiSettings}>Settings</NavItem>
    </Box>
  )
}

const NavItem = ({ icon, hrefPath = '/dashboard', children, ...rest }) => {
  const router = useRouter()

  return (
    <Link
      onClick={() => router.push(`${hrefPath}`)}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      cursor={'pointer'}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}

const MobileNav = ({ onOpen, user, handleSignout, ...rest }) => {
  const router = useRouter()
  const username = user?.name || ''
  let lowerUserName = ''
  if (username) {
    lowerUserName = String(username).toLowerCase().replaceAll(' ', '')
  }
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Copyable
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Button
          colorScheme={'teal'}
          leftIcon={<MdOutlineAddCircleOutline width={10} height={10} />}
          variant={'outline'}
          onClick={() => router.push('/add-singlestoredb')}
        >
          Add SingleStore DB
        </Button>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  size={'sm'}
                  name={'user'}
                  src={`https://avatars.dicebear.com/api/adventurer/${lowerUserName}.svg`}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user?.name || 'Justina Clark'}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user?.email || 'justina.clark@gmail.com'}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleSignout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}