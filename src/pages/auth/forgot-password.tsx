import { useState } from 'react'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'

import DefaultAuthLayout from 'layouts/auth/Default'
import { NextPageWithLayout } from 'types/Layout'

import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'

import { useForm } from 'react-hook-form'

const formSchema = object({
  email: string().email().required('Required.'),
})

interface FormValues {
  email: string
}

const ForgotPassword: NextPageWithLayout = () => {
  const formMethods = useForm<FormValues>({ resolver: yupResolver(formSchema) })
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = formMethods

  const [loading, setLoading] = useState(false)
  const toast = useToast()

  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white')
  const textColorSecondary = 'gray.400'
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600')
  const textColorBrand = useColorModeValue('brand.500', 'white')
  const brandStars = useColorModeValue('brand.500', 'brand.400')

  const onSubmit = async ({ email }: FormValues) => {
    let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

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

    setLoading(true)

    try {
      toast({
        title: 'Success',
        status: 'success',
        duration: 5000,
        isClosable: true,
        description: 'Account created successfully',
      })

      // TODO: forgot password logic.

      reset()
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
      flex="1"
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
          Forgot Password
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          color={textColorSecondary}
          fontWeight="400"
          fontSize="md"
        >
          Recover your Copyable Account!
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
            loadingText={'Authenticating ...'}
          >
            Recover
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
            <Link href="/auth/sign-in">
              <Text color={textColorBrand} as="span" ms="5px" fontWeight="500">
                Sign In
              </Text>
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

ForgotPassword.getLayout = (page) => {
  return (
    <DefaultAuthLayout illustrationBackground={'/static/img/auth/auth.png'}>
      {page}
    </DefaultAuthLayout>
  )
}

export default ForgotPassword
