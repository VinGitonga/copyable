import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'

import { useCallback, useState } from 'react'

import Layout from '../layouts/Layout'
import { useSession } from 'next-auth/react'
import { saveDbToProfile } from 'services/save-db-to-profile'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from 'types/Layout'

import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'

import { useForm } from 'react-hook-form'
import { CreateSinglestoreDBErrorCode } from 'types/Singlestore'
import { getFromLocalStorage, setInLocalStorage } from '../utils/local-storage'

const formSchema = object({
  host: string().required('Required.'),
  dbName: string().required('Required.'),
})

interface FormValues {
  host: string
  port: string
  dbName: string
}

const LOCAL_STORAGE_DEFAULT_VALUES_KEY = 'singleStoreConnection'
const getDefaultData = () => {
  try {
    return JSON.parse(
      getFromLocalStorage(LOCAL_STORAGE_DEFAULT_VALUES_KEY) || '{}'
    ) as FormValues
  } catch (err) {}
  return { dbName: '', dbPassword: '', dbUser: '', port: '', host: '' }
}

const setDefaultData = (defaultData: FormValues) => {
  try {
    setInLocalStorage(
      LOCAL_STORAGE_DEFAULT_VALUES_KEY,
      JSON.stringify(defaultData)
    )
  } catch (err) {}
}

const AddSingleStoreDBPage: NextPageWithLayout = () => {
  const [formData, setFormData] = useState<FormValues>(getDefaultData())
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: formData,
  })

  const textColor = useColorModeValue('navy.700', 'white')
  const textColorSecondary = 'gray.400'
  const brandStars = useColorModeValue('brand.500', 'brand.400')

  const [loading, setLoading] = useState(false)

  const toast = useToast()
  const { data: session } = useSession()
  const router = useRouter()

  const customToast = ({ text, status = 'info' }) => {
    return toast({
      title: text,
      status: status as any,
      isClosable: true,
      position: 'bottom-left',
    })
  }

  const onSubmit = useCallback(async ({ dbName, host, port }: FormValues) => {
    if (!session?.user?.email) {
      return
    }

    // @ts-ignore
    const userId = session?.user?.id
    if (!host || !dbName) {
      customToast({ text: 'Please fill all the inputs', status: 'warning' })
      return
    } else {
      setDefaultData({ dbName, host, port })
      // validate user is logged in
      if (!session.user) {
        customToast({
          text: 'Please login first to create a db to profile',
          status: 'error',
        })
        return
      } else {
        setLoading(true)
        let dbInfo = {
          dbName: dbName,
          dbHost: host,
          dbPort: port,
          dbOwner: userId,
        }
        let response: any = {}

        try {
          response = await saveDbToProfile({ dbDetails: dbInfo })
        } catch (err) {
          console.log('add-singlestore-db:onSbumit:error', err)
        }
        console.log(response)
        let { message = 'Something Failed.', success, code } = response
        if (success || code === CreateSinglestoreDBErrorCode.EXISTS) {
          customToast({ text: message, status: 'success' })
          router.push('/dashboard')
        } else {
          setLoading(false)
          customToast({ text: message, status: 'error' })
        }
      }
    }
  }, [])

  return (
    <Flex
      maxW={{ base: '100%', md: 'max-content' }}
      flex="1"
      w="100%"
      mx="auto"
      me="auto"
      h="100%"
      alignItems="start"
      justifyContent="center"
      mb={{ base: '30px', md: '60px' }}
      px={{ base: '25px', md: '0px' }}
      mt={{ base: '40px', md: '6.5vh' }}
      flexDirection="column"
    >
      <Box me="auto">
        <Heading color={textColor} fontSize="36px" mb="10px">
          Add Singlestore DB to Profile
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          color={textColorSecondary}
          fontWeight="400"
          fontSize="md"
        >
          New singlestore database instance to be used on migrations!
        </Text>
      </Box>
      <Flex
        zIndex="2"
        direction="column"
        w={{ base: '100%', md: '420px' }}
        maxW="100%"
        background="transparent"
        borderRadius="15px"
        mx={{ base: 'auto' }}
        me="auto"
        mb={{ base: '20px', md: 'auto' }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.host} mb="24px">
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
            >
              Host<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              {...register('host')}
              variant="auth"
              fontSize="sm"
              placeholder="svc-46f<......>.svc.singlestore.com"
              fontWeight="500"
              size="lg"
              // name={'host'}
              // value={formData.host || ''}
              // onChange={handleChangeFormField}
            />
            <FormErrorMessage>
              {errors.host && errors.host.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.port} mb="24px">
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
            >
              Port
            </FormLabel>
            <Input
              {...register('port')}
              variant="auth"
              fontSize="sm"
              placeholder="3306"
              fontWeight="500"
              size="lg"
            />
            <FormErrorMessage>
              {errors.port && errors.port.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.dbName} mb="24px">
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
            >
              New Database Name<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              {...register('dbName')}
              variant="auth"
              fontSize="sm"
              placeholder="ecommerce"
              fontWeight="500"
              size="lg"
            />
            <FormErrorMessage>
              {errors.dbName && errors.dbName.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            fontSize="sm"
            variant="brand"
            fontWeight="500"
            w="100%"
            h="50"
            mb="24px"
            mt="12px"
            type="submit"
            isLoading={loading}
            loadingText={'Saving ...'}
          >
            Save
          </Button>
        </form>
      </Flex>
    </Flex>
  )
}

AddSingleStoreDBPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default AddSingleStoreDBPage
