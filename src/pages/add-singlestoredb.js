import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import Head from 'next/head'
import {useState} from 'react'
import {GrHost, GrUserAdmin} from 'react-icons/gr'
import {FiEdit3, FiEye, FiEyeOff} from 'react-icons/fi'
import {RiDatabase2Fill} from 'react-icons/ri'
import {BiLock} from 'react-icons/bi'
import Layout from '../layouts/Layout'
import {useSession} from 'next-auth/react'
import {saveDbToProfile} from 'services/save-db-to-profile'
import {useRouter} from 'next/router'

export default function AddSingleStoreDB() {
  const [host, setHost] = useState('')
  const [dbUser, setDbUser] = useState('')
  const [dbPassword, setDbPassword] = useState('')
  const [dbName, setDbName] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const toast = useToast()
  const { data: session } = useSession()
  const router = useRouter()

  const handleShowPass = () => setShowPass(!showPass)

  const customToast = ({ text, status = 'info' }) => {
    return toast({
      title: text,
      status: status,
      isClosable: true,
      position: 'bottom-left',
    })
  }

  const resetForm = () => {
    setHost('')
    setDbName('')
    setDbUser('')
    setDbPassword('')
    setLoading(false)
  }

  const clickSubmit = async () => {
    if (!host || !dbUser || !dbPassword || !dbName) {
      customToast({ text: 'Fill all the inputs', status: 'warning' })
      return
    } else {
      // validate user is logged in
      if (!session.user) {
        customToast({
          text: 'Login first to create db to profile',
          status: 'error',
        })
        return
      } else {
        setLoading(true)
        let dbInfo = {
          dbName: dbName,
          dbHost: host,
          dbUser: dbUser,
          dbPassword: dbPassword,
          dbOwner: session.user?.id,
        }

        let { message, status } = await saveDbToProfile({ dbDetails: dbInfo })
        if (status) {
          resetForm()
          customToast({ text: message, status: 'success' })
          router.push('/dashboard')
        } else {
          setLoading(false)
          customToast({ text: message, status: 'error' })
        }
      }
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Head>
        <title>Copyable | Add Singlestore DB</title>
      </Head>
      <Stack spacing={8} mx={'auto'} w={'450px'}>
        <Stack align={'center'}>
          <Text fontSize={'lg'} color={'gray.600'}>
            Add Singlestore DB to Profile
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="host">
              <FormLabel>Host</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <Icon as={GrHost} w={4} h={4} />
                </InputLeftElement>
                <Input
                  variant={'flushed'}
                  color={'gray.500'}
                  value={host}
                  onChange={(e) => setHost(e.target.value)}
                  placeholder={'svc-46f<......>.svc.singlestore.com'}
                />
              </InputGroup>
            </FormControl>
            <FormControl id="dbUser">
              <FormLabel>Database User</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <Icon as={GrUserAdmin} w={4} h={4} />
                </InputLeftElement>
                <Input
                  variant={'flushed'}
                  color={'gray.500'}
                  value={dbUser}
                  onChange={(e) => setDbUser(e.target.value)}
                  placeholder={'admin'}
                />
              </InputGroup>
            </FormControl>
            <FormControl id="dbName">
              <FormLabel>Database Name</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <Icon as={RiDatabase2Fill} w={4} h={4} />
                </InputLeftElement>
                <Input
                  variant={'flushed'}
                  color={'gray.500'}
                  value={dbName}
                  onChange={(e) => setDbName(e.target.value)}
                  placeholder={'ecommerce'}
                />
              </InputGroup>
            </FormControl>
            <FormControl id="dbPassword">
              <FormLabel>Database Password</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <Icon as={BiLock} w={4} h={4} />
                </InputLeftElement>
                <Input
                  type={showPass ? 'text' : 'password'}
                  variant={'flushed'}
                  color={'gray.500'}
                  placeholder={'Password'}
                  value={dbPassword}
                  onChange={(e) => setDbPassword(e.target.value)}
                />
                <InputRightElement>
                  <IconButton
                    size={'sm'}
                    aria-label={'password'}
                    icon={showPass ? <FiEye /> : <FiEyeOff />}
                    isRound
                    onClick={handleShowPass}
                    bg={'gray.300'}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={'blue.400'}
                color={'white'}
                leftIcon={<FiEdit3 />}
                isLoading={loading}
                loadingText={'Saving ...'}
                onClick={clickSubmit}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Add
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

AddSingleStoreDB.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}