import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { GrFormNextLink, GrHost } from 'react-icons/gr'
import { useCallback, useState } from 'react'
import { object, string } from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMySQLMigrationStore } from 'contexts/useMySQLMigrationStore'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { RiEyeCloseLine } from 'react-icons/ri'
import { testMySQLDB } from 'services/migrate-mysql'

const formSchema = object({
  dbUser: string().required('Required.'),
  dbPassword: string().required('Required.'),
  host: string().required('Required.'),
  dbName: string().required('Required.'),
})

interface FormValues {
  dbPassword: string
  dbUser: string
  host: string
  port: string
  dbName: string
}

// @todo: extend from Stepper.Step
export default function MySQLHostDBComponent({ handleNextStepClick }) {
  const { mySQLHost, setMySQLHost } = useMySQLMigrationStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: mySQLHost,
  })

  const brandStars = useColorModeValue('brand.500', 'brand.400')
  const textColor = useColorModeValue('navy.700', 'white')
  const textColorSecondary = 'gray.400'

  const [loadingTest, setLoadingTest] = useState(false)
  const [show, setShow] = useState(false)
  const toast = useToast()

  const handlePasswordInput = () => setShow(!show)

  const customToast = useCallback(
    ({ text, status = 'info' as any }) => {
      return toast({
        title: text,
        status,
        isClosable: true,
        position: 'bottom-left',
      })
    },
    [toast]
  )

  const onSubmit = useCallback(
    async (originHost: FormValues) => {
      const { host, dbName, dbPassword, dbUser } = originHost

      if (!host || !dbName || !dbPassword || !dbUser) {
        customToast({ text: 'Please fill all the inputs', status: 'warning' })
        return
      }

      setLoadingTest(true)

      const success = await testMySQLDB(originHost)

      if (success) {
        customToast({
          text: 'Connection to MySQL Database is Okay 👍',
          status: 'success',
        })
      } else {
        customToast({
          text: 'Connection to MySQL Database failed 😢, check your Host Credentials and try again!',
          status: 'warning',
        })
      }

      setLoadingTest(false)
    },
    [customToast]
  )

  return (
    <Stack px={5}>
      <Box me="auto">
        <Heading color={textColor} fontSize="36px" mb="10px">
          Origin MySQL DB Host
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          color={textColorSecondary}
          fontWeight="400"
          fontSize="md"
        >
          Origin MySQL DB Host instance to be used on migrations!
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
            />
            <FormHelperText>
              Paste the mysql host url from your cloud provider, eg, from AWS
              RDS
            </FormHelperText>
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
              Database Name<Text color={brandStars}>*</Text>
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
          <FormControl isInvalid={!!errors.dbUser} mb="24px">
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
            >
              Database User<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              {...register('dbUser')}
              variant="auth"
              fontSize="sm"
              placeholder="admin"
              fontWeight="500"
              size="lg"
              autoComplete="off"
            />
            <FormErrorMessage>
              {errors.dbUser && errors.dbUser.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.dbPassword} mb="24px">
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
            >
              Database Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Password"
                autoComplete="off"
                mb="24px"
                size="lg"
                type={show ? 'text' : 'password'}
                variant="auth"
                {...register('dbPassword')}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: 'pointer' }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handlePasswordInput}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.dbPassword && errors.dbPassword.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            fontSize="sm"
            variant="mysql"
            fontWeight="500"
            w="100%"
            h="50"
            mb="24px"
            mt="12px"
            type="submit"
            isLoading={loadingTest}
            loadingText={'Saving ...'}
            disabled={!mySQLHost}
            rightIcon={<GrFormNextLink />}
          >
            Next Step
          </Button>
        </form>
      </Flex>
    </Stack>
  )
}
function getDefaultData(): FormValues | (() => FormValues) {
  throw new Error('Function not implemented.')
}
