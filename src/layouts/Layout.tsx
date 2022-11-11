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
  Select,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import {
  FiBell,
  FiChevronDown,
  FiCompass,
  FiDatabase,
  FiHome,
  FiMenu,
  FiSettings,
} from 'react-icons/fi'
import { MdOutlineAdd, MdOutlineAddCircleOutline } from 'react-icons/md'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import Footer from 'components/footer/FooterAdmin'
import { IoMdMoon, IoMdSunny } from 'react-icons/io'
import AppLogo from 'components/icons/AppLogo'
import { useDatabaseMigrationStore } from '../contexts/useDatabaseMigrationStore'
import { useEffect } from 'react'
import { fetchMySingleStoreDatabases } from '../services/save-db-to-profile'

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

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display="none" />
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
          <SidebarContent onClose={onClose} onClick={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav
        onOpen={onOpen}
        handleSignout={handleSignOut}
        user={session?.user}
      />
      <Box ml={{ base: 0 }} p="4">
        {children}
      </Box>
      <Box>
        <Footer />
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
      w={{ base: 'full' }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Flex display={{ base: 'flex' }} h="100%" align="center">
          <AppLogo responsive={false} />
        </Flex>
        <CloseButton onClick={onClose} />
      </Flex>
      <NavItem icon={FiHome} hrefPath="/dashboard">
        Dashboard
      </NavItem>
      <NavItem icon={FiCompass} hrefPath={'/mongo/mongo-wizard'}>
        Migrate From MongoDB
      </NavItem>
      <NavItem icon={FiDatabase} hrefPath={'/mysql/mysql-wizard'}>
        Migrate From MySQL
      </NavItem>
      <NavItem icon={FiSettings} hrefPath="/preferences">
        Settings
      </NavItem>
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
          bg: 'brand.400',
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
  const navbarIcon = useColorModeValue('brand.500', 'white')
  const { colorMode, toggleColorMode } = useColorMode()
  const router = useRouter()
  const username = user?.name || ''
  let lowerUserName = ''
  if (username) {
    lowerUserName = String(username).toLowerCase().replaceAll(' ', '')
  }

  const { singlestoreDatabases, setSinglestoreDatabases } =
    useDatabaseMigrationStore()

  useEffect(() => {
    fetchMySingleStoreDatabases().then(setSinglestoreDatabases)
  }, [])
  let singleStoreItem

  if (singlestoreDatabases && singlestoreDatabases.length > 0) {
    singleStoreItem = (
      <>
        <Select title={'My SingleStore Databases'}>
          {singlestoreDatabases.map((dbs: any) => (
            <option key={dbs.dbName} value={dbs.dbName}>
              {dbs.dbName}
            </option>
          ))}
        </Select>
        <Button
          colorScheme={'brand'}
          variant={'outline'}
          p={0}
          onClick={() => router.push('/add-singlestoredb')}
        >
          <MdOutlineAdd size={25} />
        </Button>
      </>
    )
  } else {
    singleStoreItem = (
      <Button
        colorScheme={'brand'}
        leftIcon={<MdOutlineAddCircleOutline width={10} height={10} />}
        variant={'outline'}
        minWidth={'min'}
        onClick={() => router.push('/add-singlestoredb')}
      >
        <Text display={{ base: 'none', md: 'flex' }}>Add SingleStore DB</Text>
      </Button>
    )
  }
  return (
    <Flex
      ml={{ base: 0 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between' }}
      {...rest}
    >
      <Flex gap={{ base: 2, md: 4 }} align="center" mr="4" h="100%">
        <IconButton
          display={{ base: 'flex' }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
        <Link href="/dashboard" style={{ height: 40 }}>
          <AppLogo />
        </Link>
      </Flex>

      <HStack spacing={{ base: '2', md: '6' }}>
        {singleStoreItem}
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Button
          variant="no-hover"
          bg="transparent"
          p="0px"
          minW="unset"
          minH="unset"
          h="18px"
          w="max-content"
          onClick={toggleColorMode}
          display={{ base: 'none', md: 'unset' }}
        >
          <Icon
            me="10px"
            h="18px"
            w="18px"
            color={navbarIcon}
            as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
          />
        </Button>
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
                  <Text fontSize="sm">{user?.name || ''}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user?.email || ''}
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
              <MenuItem
                icon={
                  <Flex h="full">
                    <Icon
                      me="10px"
                      h="18px"
                      w="18px"
                      color={navbarIcon}
                      as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
                    />
                  </Flex>
                }
                onClick={toggleColorMode}
              >
                Theme
              </MenuItem>

              <NextLink href="/profile">
                <MenuItem>Profile</MenuItem>
              </NextLink>
              <NextLink href="/preferences">
                <MenuItem>Settings</MenuItem>
              </NextLink>
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
