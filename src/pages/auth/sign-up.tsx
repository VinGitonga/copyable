import { useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { HSeparator } from 'components/separator/Separator'
import DefaultAuthLayout from 'layouts/auth/Default'
import { NextPageWithLayout } from 'types/Layout'
import { createUser } from 'services/user'
import { useRouter } from 'next/router'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { yupResolver } from '@hookform/resolvers/yup'
import { boolean, object, ref, string } from 'yup'
import { RiEyeCloseLine } from 'react-icons/ri'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'

const formSchema = object({
  terms: boolean().oneOf([true], 'You must agree to continue.'),
  name: string().required('Required.'),
  email: string().required('Required.'),
  password: string().required('Required.'),
  passwordConfirm: string()
    .required('Required.')
    .min(4, 'Password length should be at least 4 characters')
    .max(12, 'Password cannot exceed more than 12 characters')
    .oneOf([ref('password')], 'Passwords do not match'),
})

interface FormValues {
  name: string
  email: string
  password: string
  passwordConfirm: string
  terms: boolean
}

const SignUpPage: NextPageWithLayout = () => {
  const formMethods = useForm<FormValues>({ resolver: yupResolver(formSchema) })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = formMethods

  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const toast = useToast()

  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white')
  const textColorSecondary = 'gray.400'
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600')
  const textColorBrand = useColorModeValue('brand.500', 'white')
  const brandStars = useColorModeValue('brand.500', 'brand.400')
  const googleBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.200')
  const googleText = useColorModeValue('navy.700', 'white')
  const googleHover = useColorModeValue(
    { bg: 'gray.200' },
    { bg: 'whiteAlpha.300' }
  )
  const googleActive = useColorModeValue(
    { bg: 'secondaryGray.300' },
    { bg: 'whiteAlpha.200' }
  )
  const [show, setShow] = useState(false)

  const handleClick = () => setShow(!show)

  const onSubmit = async ({
    name,
    email,
    password,
    passwordConfirm,
    terms,
  }: FormValues) => {
    let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

    if (!email || !password) {
      toast({
        title: 'Error',
        status: 'error',
        duration: 5000,
        isClosable: true,
        description: 'Please fill all the inputs.',
      })
      return
    }
    if (!emailRegex.test(email)) {
      toast({
        title: 'Error',
        status: 'error',
        duration: 5000,
        isClosable: true,
        description: 'Please input a valid email address',
      })
      return
    }
    if (password.length < 8) {
      toast({
        title: 'Error',
        status: 'error',
        duration: 5000,
        isClosable: true,
        description: 'Passwords must be at least 8 characters',
      })
      return
    }
    if (password !== passwordConfirm) {
      toast({
        title: 'Error',
        status: 'error',
        duration: 5000,
        isClosable: true,
        description: 'Passwords dont match',
      })
      return
    }

    setLoading(true)
    let userInfo = {
      name: name,
      email: email,
      password: password,
    }

    try {
      const response = await createUser(userInfo)
      if (response.status === 200) {
        toast({
          title: 'Success',
          status: 'success',
          duration: 5000,
          isClosable: true,
          description: 'Account created successfully',
        })
        console.log(response?.data)
        router.push('/login')
        reset()
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error',
        status: 'error',
        duration: 5000,
        isClosable: true,
        description: 'Something not okay',
      })
    }

    setLoading(false)
  }

  return (
    <Flex
      maxW={{ base: '100%', md: 'max-content' }}
      w="100%"
      mx={{ base: 'auto', lg: '0px' }}
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
          Sign Up
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          color={textColorSecondary}
          fontWeight="400"
          fontSize="md"
        >
          Get Started with Copyable!
        </Text>
      </Box>
      <Flex
        zIndex="2"
        direction="column"
        w={{ base: '100%', md: '420px' }}
        maxW="100%"
        background="transparent"
        borderRadius="15px"
        mx={{ base: 'auto', lg: 'unset' }}
        me="auto"
        mb={{ base: '20px', md: 'auto' }}
      >
        <Button
          shadow="md"
          border="solid"
          borderColor="brand.500"
          fontSize="sm"
          me="0px"
          mb="26px"
          py="15px"
          h="50px"
          borderRadius="16px"
          bgColor={googleBg}
          color={googleText}
          fontWeight="500"
          _hover={googleHover}
          _active={googleActive}
          _focus={googleActive}
        >
          <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
          Signup with Google
        </Button>
        <Flex align="center" mb="25px">
          <HSeparator />
          <Text color="gray.400" mx="14px">
            or
          </Text>
          <HSeparator />
        </Flex>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.name} mb="24px">
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
            >
              Name<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              {...register('name')}
              variant="auth"
              required
              fontSize="sm"
              placeholder="Jack Ryan"
              fontWeight="500"
              size="lg"
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.email} mb="24px">
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
            >
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              {...register('email')}
              variant="auth"
              fontSize="sm"
              required
              type="email"
              placeholder="mail@copyable.com"
              fontWeight="500"
              size="lg"
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password} mb="24px">
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                fontSize="sm"
                placeholder="Min. 8 characters"
                size="lg"
                type={show ? 'text' : 'password'}
                variant="auth"
                required
                {...register('password')}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: 'pointer' }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.passwordConfirm} mb="24px">
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Password Confirmation<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                required
                fontSize="sm"
                placeholder="Min. 8 characters"
                size="lg"
                type={show ? 'text' : 'password'}
                variant="auth"
                {...register('passwordConfirm')}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: 'pointer' }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.passwordConfirm && errors.passwordConfirm.message}
            </FormErrorMessage>
          </FormControl>
          <Flex justifyContent="space-evenly" align="center" mb="24px">
            <FormControl
              display="flex"
              flexDirection="column"
              alignItems="center"
              w="full"
              isInvalid={!!errors?.terms}
            >
              <Flex w="full">
                <Checkbox
                  colorScheme="brandScheme"
                  me="10px"
                  {...register('terms')}
                />
                <FormLabel
                  htmlFor="service-terms"
                  mb="0"
                  fontWeight="normal"
                  color={textColor}
                  fontSize="sm"
                  flex="1"
                  flexDirection="row"
                  display="flex"
                  gap="1"
                >
                  <span>I accept the application</span>
                  <Link
                    href="/static/documents/terms.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Text
                      color={textColorBrand}
                      fontSize="sm"
                      minW="max"
                      fontWeight="500"
                    >
                      Terms and Conditions.
                    </Text>
                  </Link>
                </FormLabel>
              </Flex>
              <FormErrorMessage>
                {errors.terms && errors.terms.message}
              </FormErrorMessage>
            </FormControl>
          </Flex>
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
            loadingText={'Creating...'}
          >
            Signup
          </Button>
        </form>

        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="start"
          maxW="100%"
          mt="0px"
        >
          <Text color={textColorDetails} fontWeight="400" fontSize="14px">
            Already registered?
            <Link href="/auth/sign-in" passHref>
              <a>
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Sign In
                </Text>
              </a>
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

SignUpPage.getLayout = (page) => {
  return (
    <DefaultAuthLayout illustrationBackground={'/static/img/auth/auth.png'}>
      {page}
    </DefaultAuthLayout>
  )
}

export default SignUpPage
