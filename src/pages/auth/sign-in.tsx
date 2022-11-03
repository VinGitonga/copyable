import React, { useState } from 'react'
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
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
// Custom components
import { HSeparator } from 'components/separator/Separator'
import DefaultAuthLayout from 'layouts/auth/Default'
// Assets
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { RiEyeCloseLine } from 'react-icons/ri'
import { signIn } from 'next-auth/react'
import { NextPageWithLayout } from 'types/Layout'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'
import { useForm } from 'react-hook-form'

const formSchema = object({
  email: string(),
  password: string(),
})

interface FormValues {
  email?: string
  password?: string
}

const SignInPage: NextPageWithLayout = () => {
  const formMethods = useForm<FormValues>({ resolver: yupResolver(formSchema) })
  const { register, handleSubmit } = formMethods

  const toast = useToast()
  const [loading, setLoading] = useState(false)

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
  const [show, setShow] = React.useState(false)

  const handleClick = () => setShow(!show)

  const onSubmit = async ({ email, password }: FormValues) => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (!email || !password) {
      toast({
        title: 'Error',
        status: 'error',
        duration: 5000,
        isClosable: true,
        description: 'Please fill all the inputs.',
      })
      return
    } else if (!emailRegex.test(email)) {
      toast({
        title: 'Error',
        status: 'error',
        duration: 5000,
        isClosable: true,
        description: 'Please input a valid email address',
      })
      return
    } else if (password.length < 8) {
      toast({
        title: 'Error',
        status: 'error',
        duration: 5000,
        isClosable: true,
        description: 'Passwords must be at least 8 characters',
      })
      return
    } else {
      setLoading(true)

      await signIn('credentials', {
        redirect: false,
        email,
        password,
      }).then(({ ok, error }) => {
        setLoading(false)
        if (!ok) {
          toast({
            title: 'Error',
            status: 'error',
            duration: 5000,
            isClosable: true,
            description: error,
          })
        }
      })
    }
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
          Sign In
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          color={textColorSecondary}
          fontWeight="400"
          fontSize="md"
        >
          Enter your email and password to sign in!
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
          Sign in with Google
        </Button>
        <Flex align="center" mb="25px">
          <HSeparator />
          <Text color="gray.400" mx="14px">
            or
          </Text>
          <HSeparator />
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              {...register('email')}
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: '0px', md: '0px' }}
              type="email"
              placeholder="mail@copyable.com"
              mb="24px"
              fontWeight="500"
              size="lg"
            />
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
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={show ? 'text' : 'password'}
                variant="auth"
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
            <Flex justifyContent="space-between" align="center" mb="24px">
              <FormControl display="flex" alignItems="center">
                <Checkbox
                  id="remember-login"
                  colorScheme="brandScheme"
                  me="10px"
                />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  fontWeight="normal"
                  color={textColor}
                  fontSize="sm"
                >
                  Keep me logged in
                </FormLabel>
              </FormControl>
              <Link href="/auth/forgot-password">
                <a>
                  <Text
                    color={textColorBrand}
                    fontSize="sm"
                    w="124px"
                    fontWeight="500"
                  >
                    Forgot password?
                  </Text>
                </a>
              </Link>
            </Flex>
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              type="submit"
              isLoading={loading}
              loadingText={'Authenticating ...'}
            >
              Sign In
            </Button>
          </FormControl>
        </form>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="start"
          maxW="100%"
          mt="0px"
        >
          <Text color={textColorDetails} fontWeight="400" fontSize="14px">
            Not registered yet?
            <Link href="/auth/sign-up">
              <a>
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Create an Account
                </Text>
              </a>
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

SignInPage.getLayout = (page) => {
  return (
    <DefaultAuthLayout illustrationBackground={'/static/img/auth/auth.png'}>
      {page}
    </DefaultAuthLayout>
  )
}

export default SignInPage
